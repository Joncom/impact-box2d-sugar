ig.module(
    'plugins.joncom.box2d.entity'
)
.requires(
    'impact.entity',
    'plugins.joncom.box2d.game'
)
.defines(function(){

    ig.Entity.inject({

        maxVel: { x: 9999, y: 9999 },
        friction: { x: 0.3, y: 0.3 },
        body: null,
        angle: 0,

        checkQueue: {},
        collideQueue: { x: {}, y: {} },
        entityContactCount: {},

        hasBody: true,
        bodyType: Box2D.Dynamics.b2Body.b2_dynamicBody,
        mass: null, // Calculated automatically if left null.
        density: 1.0, // Used to calculate mass; Ignored if mass specified.
        isFixedRotation: false,
        isBullet: false, // Prevents tunneling at the cost of performance.
        isSensor: false,
        maySleep: false, // Setting to true can improve performance.

        _vel: {}, // vel is mapped to _vel to allow manipulation
                  // of the whole object, not just vel.x/y
        _pos: {}, // pos is mapped to _pos to allow manipulation
                  // of the whole object, not just pos.x/y

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Only create a box2d body when we are not in Weltmeister
            if (!ig.global.wm && this.hasBody) {

                if(this.friction.x !== this.friction.y) {
                    throw 'Entity.friction.x/y must be equal.';
                }

                // Can use either friction.x or y,
                // because both should be identical.
                var friction = this.friction.x;

                this.createBody(friction);
                this.initBody();
                ig.world.Step(0, 5, 5); // Make contact edges available for .touches

                Object.defineProperty(this, 'isFixedRotation', {
                    get: this._getIsFixedRotation,
                    set: this._setIsFixedRotation
                });

                Object.defineProperty(this, 'mass', {
                    get: this._getMass,
                    set: this._setMass
                });

                Object.defineProperty(this, 'isSensor', {
                    get: this._getFirstFixtureIsSensor,
                    set: this._setFixturesIsSensor
                });

                Object.defineProperty(this, 'pos', {
                    get: this._getPos,
                    set: this._setPos
                });

                Object.defineProperty(this._pos, 'x', {
                    get: this._getPosX.bind(this),
                    set: this._setPosX.bind(this)
                });

                Object.defineProperty(this._pos, 'y', {
                    get: this._getPosY.bind(this),
                    set: this._setPosY.bind(this)
                });

                Object.defineProperty(this, 'vel', {
                    get: this._getVelocity,
                    set: this._setVelocity
                });

                Object.defineProperty(this._vel, 'x', {
                    get: this._getVelocityX.bind(this),
                    set: this._setVelocityX.bind(this)
                });

                Object.defineProperty(this._vel, 'y', {
                    get: this._getVelocityY.bind(this),
                    set: this._setVelocityY.bind(this)
                });

                Object.defineProperty(this, 'isBullet', {
                    get: this._getIsBullet,
                    set: this._setIsBullet
                });

                Object.defineProperty(this, 'angle', {
                    get: this._getAngle,
                    set: this._setAngle
                });

                Object.defineProperty(this, 'bounciness', {
                    get: this._getFirstFixtureBounciness,
                    set: this._setFixturesBounciness
                });

                Object.defineProperty(this.friction, 'x', {
                    get: this._getFirstFixtureFriction,
                    set: this._setFixturesFriction
                });

                Object.defineProperty(this.friction, 'y', {
                    get: this._getFirstFixtureFriction,
                    set: this._setFixturesFriction
                });

                Object.defineProperty(this, 'standing', {
                    get: this._isStanding
                });

                Object.defineProperty(this, 'bodyType', {
                    get: this._getBodyType,
                    set: this._setBodyType
                });

                Object.defineProperty(this, 'maySleep', {
                    get: this._getSleepingAllowed,
                    set: this._setSleepingAllowed
                });

                Object.defineProperty(this, 'density', {
                    get: this._getDensity,
                    set: this._setDensity
                });
            }
        },

        initBody: function() {
            this.body.entity = this;
            this.body.SetSleepingAllowed(this.maySleep);
            this.body.SetAngle(this.angle);
            this.body.SetBullet(this.isBullet);
            this.body.SetFixedRotation(this.isFixedRotation);
            this._setFixturesIsSensor(this.isSensor);
            if(this.mass !== null) this._setMass(this.mass);
        },

        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;

            this.processCollisionQueues();

            if (this.body.IsAwake()) {
                this.applyGravity();
            }

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

        createBody: function(friction) {
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
            fixtureDef.friction = friction;
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

        /* .isSensor logic */

        _getFirstFixtureIsSensor: function() {
            return this.body.GetFixtureList().IsSensor();
        },

        _setFixturesIsSensor: function(flag) {
            for (var fixture = this.body.GetFixtureList(); fixture; fixture = fixture.m_next) {
                fixture.SetSensor(flag);
            }
        },

        /* .standing logic */

        _isStanding: function() {
            for (var edge = this.body.m_contactList;
                    edge; edge = edge.next) {
                if (!edge.contact.IsTouching()) {
                    continue;
                }
                var normal = edge.contact.m_manifold.m_localPlaneNormal;
                if (edge.contact.GetFixtureA().GetBody().entity === this) {
                    if (normal.y > 0) {
                        return true;
                    }
                } else {
                    if (normal.y < 0) {
                        return true;
                    }
                }
            }
            return false;
        },

        /* .density logic */

        _getDensity: function() {
            return this.body.GetFixtureList().GetDensity();
        },

        _setDensity: function(density) {
            this._setFixturesDensity(density);
            this.body.ResetMassData();
        },

        _setFixturesDensity: function(density) {
            for (var fixture = this.body.GetFixtureList(); fixture; fixture = fixture.m_next) {
                fixture.SetDensity(density);
            }
        },

        /* .sleepingAllowed logic */

        _getSleepingAllowed: function() {
            return this.body.IsSleepingAllowed();
        },

        _setSleepingAllowed: function(flag) {
            this.body.SetSleepingAllowed(flag);
        },

        /* .bodyType logic */

        _getBodyType: function() {
            return this.body.GetType();
        },

        _setBodyType: function(value) {
            this.body.SetType(value);
        },

        /* .mass logic */

        _getMass: function() {
            return this.body.GetMass();
        },

        _setMass: function(mass) {
            var data = new Box2D.Collision.Shapes.b2MassData();
            data.center = new Box2D.Common.Math.b2Vec2(
                (this.size.x / 2) * Box2D.SCALE,
                (this.size.y / 2) * Box2D.SCALE
            );
            data.mass = mass;
            this.body.SetMassData(data);
        },

        /* .friction logic */

        _getFirstFixtureFriction: function() {
            var fixture = this.body.GetFixtureList();
            return fixture.GetFriction();
        },

        _setFixturesFriction: function(friction) {
            for (var fixture = this.body.GetFixtureList();
                    fixture; fixture = fixture.GetNext()) {
                fixture.SetFriction(friction);
            }
        },

        /* .bounciness logic */

        _getFirstFixtureBounciness: function() {
            var fixture = this.body.GetFixtureList();
            return fixture.GetRestitution();
        },

        _setFixturesBounciness: function(value) {
            for (var fixture = this.body.GetFixtureList();
                    fixture; fixture = fixture.GetNext()) {
                fixture.SetRestitution(value);
            }
        },

        /* .angle logic */

        _getAngle: function() {
            return this.body.GetAngle();
        },

        _setAngle: function(angle) {
            this.body.SetAngle(angle);
        },

        /* .isBullet logic */

        _getIsBullet: function() {
            return this.body.IsBullet();
        },

        _setIsBullet: function(flag) {
            this.body.SetBullet(flag);
        },


        /* .vel logic */

        _getVelocity: function() {
            return this._vel;
        },

        _setVelocity: function(object) {
            var x = object.x * Box2D.SCALE;
            var y = object.y * Box2D.SCALE;
            var vector = new Box2D.Common.Math.b2Vec2(x, y);
            this.body.SetLinearVelocity(vector);
        },

        _getVelocityX: function() {
            var b2Vel = this.body.GetLinearVelocity();
            return (b2Vel.x / Box2D.SCALE).round(2);
        },

        _setVelocityX: function(velocity) {
            velocity *= Box2D.SCALE;
            var oldVel = this.body.GetLinearVelocity();
            var newVel = new Box2D.Common.Math.b2Vec2(velocity, oldVel.y);
            this.body.SetLinearVelocity(newVel);
        },

        _getVelocityY: function() {
            var b2Vel = this.body.GetLinearVelocity();
            return (b2Vel.y / Box2D.SCALE).round(2);
        },

        _setVelocityY: function(velocity) {
            velocity *= Box2D.SCALE;
            var oldVel = this.body.GetLinearVelocity();
            var newVel = new Box2D.Common.Math.b2Vec2(oldVel.x, velocity);
            this.body.SetLinearVelocity(newVel);
        },


        /* .pos logic */

        _getPos: function() {
            return this._pos;
        },

        _setPos: function(object) {
            var x = (object.x + this.size.x / 2) * Box2D.SCALE;
            var y = (object.y + this.size.y / 2) * Box2D.SCALE;
            var vector = new Box2D.Common.Math.b2Vec2(x, y);
            this.body.SetPosition(vector);
        },

        _getPosX: function() {
            var b2Pos = this.body.GetPosition();
            return b2Pos.x / Box2D.SCALE - this.size.x / 2;
        },

        _setPosX: function(x) {
            x = (x + this.size.x / 2) * Box2D.SCALE;
            var oldPos = this.body.GetPosition();
            var newPos = new Box2D.Common.Math.b2Vec2(x, oldPos.y);
            this.body.SetPosition(newPos);
        },

        _getPosY: function() {
            var b2Pos = this.body.GetPosition();
            return b2Pos.y / Box2D.SCALE - this.size.y / 2;
        },

        _setPosY: function(y) {
            y = (y + this.size.y / 2) * Box2D.SCALE;
            var oldPos = this.body.GetPosition();
            var newPos = new Box2D.Common.Math.b2Vec2(oldPos.x, y);
            this.body.SetPosition(newPos);
        },


        /* .isFixedRotation logic */

        _getIsFixedRotation: function() {
            return this.body.IsFixedRotation();
        },

        _setIsFixedRotation: function(flag) {
            this.body.SetFixedRotation(flag);
        }

    });

});