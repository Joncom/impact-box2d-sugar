ig.module(
    'plugins.box2d.entity'
)
.requires(
    'impact.entity',
    'plugins.box2d.game'
)
.defines(function(){

    ig.Entity.inject({

        maxVel: { x: 9999, y: 9999 },
        body: null,
        angle: 0,

        checkQueue: {},
        collideQueue: { x: {}, y: {} },
        entityContactCount: {},

        bodyType: Box2D.Dynamics.b2Body.b2_dynamicBody,
        density: 1.0,
        isFixedRotation: false,
        isBullet: false, // Prevents tunneling at the cost of performance.
        isSensor: false,
        allowSleep: true, // Better performance.

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Only create a box2d body when we are not in Weltmeister
            if (!ig.global.wm) {
                this.createBody();
                this.body.entity = this;
                this.body.SetSleepingAllowed(this.allowSleep);
                this.body.SetAngle(this.angle);
                this.body.SetBullet(this.isBullet);
                this.body.SetFixedRotation(this.isFixedRotation);
                this.setFixturesAsSensors(this.isSensor);
                this.applyGravity(); // 1st step needs gravity too!
                ig.world.Step(0, 5, 5); // Make contact edges available for .touches

                // Allow change of isFixedRotation through entity property.
                var entity = this;
                Object.defineProperty(this, 'isFixedRotation', {
                    get: function() { return entity.body.IsFixedRotation(); },
                    set: function(flag) { entity.body.SetFixedRotation(flag); }
                });

                // Position
                var position = {};
                Object.defineProperty(this, 'pos', {
                    get: function() {
                        return position;
                    },
                    set: function(object) {
                        position.x = object.x;
                        position.y = object.y;
                        var x = (object.x + entity.size.x / 2) * Box2D.SCALE;
                        var y = (object.x + entity.size.x / 2) * Box2D.SCALE;
                        var vector = new Box2D.Common.Math.b2Vec2(x, y);
                        entity.body.SetPosition(vector);
                    }
                });
                Object.defineProperty(position, 'x', {
                    get: function() {
                        var b2Pos = entity.body.GetPosition();
                        return b2Pos.x / Box2D.SCALE - entity.size.x / 2;
                    },
                    set: function(x) {
                        x = (x + entity.size.x / 2) * Box2D.SCALE;
                        var oldPos = entity.body.GetPosition();
                        var newPos = new Box2D.Common.Math.b2Vec2(x, oldPos.y);
                        entity.body.SetPosition(newPos);
                    }
                });
                Object.defineProperty(this.pos, 'y', {
                    get: function() {
                        var b2Pos = entity.body.GetPosition();
                        return b2Pos.y / Box2D.SCALE - entity.size.y / 2;
                    },
                    set: function(y) {
                        y = (y + entity.size.y / 2) * Box2D.SCALE;
                        var oldPos = entity.body.GetPosition();
                        var newPos = new Box2D.Common.Math.b2Vec2(oldPos.x, y);
                        entity.body.SetPosition(newPos);
                    }
                });

                Object.defineProperty(this, 'isBullet', {
                    get: function() {
                        return entity.body.IsBullet();
                    },
                    set: function(flag) {
                        entity.body.SetBullet(flag);
                    }
                });

                Object.defineProperty(this, 'angle', {
                    get: function() {
                        return entity.body.GetAngle();
                    },
                    set: function(angle) {
                        entity.body.SetAngle(angle);
                    }
                });

                Object.defineProperty(this, 'bounciness', {
                    get: function() {
                        var fixture = entity.body.GetFixtureList();
                        return fixture.GetRestitution();
                    },
                    set: function(value) {
                        for (var fixture = entity.body.GetFixtureList();
                                fixture; fixture = fixture.GetNext()) {
                            fixture.SetRestitution(value);
                        }
                    }
                });

                Object.defineProperty(this, 'bodyType', {
                    get: function() {
                        return entity.body.GetType();
                    },
                    set: function(value) {
                        entity.body.SetType(value);
                    }
                });

                Object.defineProperty(this, 'allowSleep', {
                    get: function() {
                        return entity.body.IsSleepingAllowed();
                    },
                    set: function(flag) {
                        entity.body.SetSleepingAllowed(flag);
                    }
                });
            }
        },

        update: function() {
            this.processCollisionQueues();

            if (this.body.IsAwake()) {
                this.applyGravity();
            }

            this.last.x = this.pos.x;
            this.last.y = this.pos.y;

            this.updateStanding();
            this.limitVelocity();

            if (this.currentAnim) {
                this.currentAnim.update();
                this.currentAnim.angle = this.angle;
            }
        },

        kill: function() {
            ig.world.DestroyBody(this.body);
            this.parent();
        },

        touches: function(other) {
            if(ig.global.wm) {
                return this.parent(other);
            } else {
                for (var edge = this.body.m_contactList; edge; edge = edge.next) {
                    if(!edge.contact.IsTouching()) {
                        continue;
                    }
                    if (edge.other.entity === other) {
                        return true;
                    }
                }
                return false;
            }
        },

        createBody: function() {
            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.position.Set(
                (this.pos.x + this.size.x / 2) * Box2D.SCALE,
                (this.pos.y + this.size.y / 2) * Box2D.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            var shapeDef = new Box2D.Collision.Shapes.b2PolygonShape();
            shapeDef.SetAsBox(this.size.x / 2 * Box2D.SCALE, this.size.y / 2 * Box2D.SCALE);

            var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
            fixtureDef.shape = shapeDef;
            fixtureDef.density = this.density;
            fixtureDef.friction = 1;
            fixtureDef.restitution = this.bounciness;

            this.body.CreateFixture(fixtureDef);
        },

        // Called when two fixtures begin to touch.
        beginContact: function(other, contact) {
            if(other) {
                if (this.checkAgainst & other.type) {
                    if(typeof this.entityContactCount[other.id] === 'undefined') {
                        this.entityContactCount[other.id] = 0;
                    }
                    this.entityContactCount[other.id]++;
                }
                var normal = contact.GetManifold().m_localPlaneNormal;
                var axis = (Math.abs(normal.y) > Math.abs(normal.x)) ? 'y' : 'x';
                this.collideQueue[axis][other.id] = other;
                this.checkQueue[other.id] = other;
            }
        },

        // Called when two fixtures cease to touch.
        endContact: function(other, contact) {
            if(other) {
                if (this.checkAgainst & other.type) {
                    if(typeof this.entityContactCount[other.id] === 'undefined') {
                        this.entityContactCount[other.id] = 0;
                    }
                    this.entityContactCount[other.id]--;
                }
            }
        },

        // This lets you inspect a contact after the solver is finished.
        postSolve: function(other, contact, impulse) {},

        // This is called after a contact is updated.
        preSolve: function(other, contact, oldManifold) {},

        processCollisionQueues: function() {
            // Preserve Impact's entity checks.
            for(var id in this.checkQueue) {
                var other = this.checkQueue[id];
                if(this.entityContactCount[id] > 0) {
                    this.check(other);
                } else {
                    delete this.checkQueue[id];
                }
            }
            // Preserve Impact's collideWith calls.
            for(var axis in this.collideQueue) {
                for(var id in this.collideQueue[axis]) {
                    var other = this.collideQueue[axis][id];
                    this.collideWith(other, axis);
                    delete this.collideQueue[axis][id];
                }
            }
        },

        applyGravity: function() {
            var gravity = new Box2D.Common.Math.b2Vec2(0, ig.game.gravity * this.gravityFactor * this.body.GetMass() * Box2D.SCALE);
            this.body.ApplyForce(gravity, this.body.GetPosition());
        },

        limitVelocity: function() {
            var velocity = this.body.GetLinearVelocity();
            var x = velocity.x / Box2D.SCALE;
            var y = velocity.y / Box2D.SCALE;
            if (x < -this.maxVel.x) x = -this.maxVel.x;
            else if (x > this.maxVel.x) x = this.maxVel.x;
            if (y < -this.maxVel.y) y = -this.maxVel.y;
            else if (y > this.maxVel.y) y = this.maxVel.y;
            velocity.x = x * Box2D.SCALE;
            velocity.y = y * Box2D.SCALE;
            this.body.SetLinearVelocity(velocity);
        },

        setFixturesAsSensors: function(flag) {
            for (var fixture = this.body.GetFixtureList(); fixture; fixture = fixture.m_next) {
                fixture.SetSensor(flag);
            }
        },

        getVelocity: function() {
            var velocity = this.body.GetLinearVelocity();
            var x = velocity.x / Box2D.SCALE;
            var y = velocity.y / Box2D.SCALE;
            return { x: x, y: y };
        },

        setVelocity: function(x, y) {
            var vector = new Box2D.Common.Math.b2Vec2(
                x * Box2D.SCALE,
                y * Box2D.SCALE
            );
            this.body.SetLinearVelocity(vector);
        },

        updateStanding: function() {
            this.standing = false;
            for (var edge = this.body.m_contactList; edge; edge = edge.next) {
                if (!edge.contact.IsTouching()) {
                    continue;
                }
                var normal = edge.contact.m_manifold.m_localPlaneNormal;
                if (normal.y < 0) {
                    this.standing = true;
                    break;
                }
            }
        }

    });

});