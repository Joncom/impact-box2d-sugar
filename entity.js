ig.module(
    'plugins.box2d.entity'
)
.requires(
    'impact.entity',
    'plugins.box2d.game'
)
.defines(function(){

    ig.Box2DEntity = ig.Entity.extend({

        maxVel: { x: 9999, y: 9999 },
        body: null,
        angle: 0,

        /* Box2D Setup Stuff */
        bodyType: b2.Body.b2_dynamicBody,
        shape: 0, // ig.Box2DEntity.SHAPE.BOX
        density: 1.0,
        vertices: [], // Only used if shape = ig.Box2DEntity.SHAPE.POLYGON
        isFixedRotation: false, // Prevents entity from rotating.
        isBullet: false, // Prevents tunneling at the cost of performance.
        allowSleep: true, // Better performance.
        /* END */

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            if(this.shape === ig.Box2DEntity.SHAPE.CIRCLE && this.size.x !== this.size.y) {
                throw "Circles must have equal width and height.";
            }

            // Only create a box2d body when we are not in Weltmeister
            if (!ig.global.wm) {
                this.createBody();
                this.body.entity = this;
                this.applyGravity(); // 1st step needs gravity too!
            }
        },

        createBody: function() {
            var bodyDef = new b2.BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.allowSleep = this.allowSleep;
            bodyDef.position.Set(
                (this.pos.x + this.size.x / 2) * b2.SCALE,
                (this.pos.y + this.size.y / 2) * b2.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            if(!this.shape || this.shape === ig.Box2DEntity.SHAPE.BOX) {
                var shapeDef = new b2.PolygonShape();
                shapeDef.SetAsBox(this.size.x / 2 * b2.SCALE, this.size.y / 2 * b2.SCALE);
            } else if(this.shape === ig.Box2DEntity.SHAPE.CIRCLE) {
                var radius = this.size.x / 2;
                var shapeDef = new b2.CircleShape();
                shapeDef.SetRadius(radius * b2.SCALE);
            } else if(this.shape === ig.Box2DEntity.SHAPE.POLYGON) {
                var shapeDef = new b2.PolygonShape();
                shapeDef.SetAsArray(this.vertices, this.vertices.length);
            } else if(this.shape === ig.Box2DEntity.SHAPE.PILL) {
                var radius = this.size.x / 2;
                var circleOffsetY = this.size.y / 2 - radius;

                var topCircleDef = new b2.CircleShape();
                topCircleDef.SetRadius(radius * b2.SCALE);
                topCircleDef.SetLocalPosition(0, -circleOffsetY * b2.SCALE);
                topCircleFixture = this.body.CreateFixture2(topCircleDef, this.density);
                topCircleFixture.SetRestitution(this.bounciness);
                topCircleFixture.SetFriction(1);

                var bottomCircleDef = new b2.CircleShape();
                bottomCircleDef.SetRadius(radius * b2.SCALE);
                bottomCircleDef.SetLocalPosition(0, circleOffsetY * b2.SCALE);
                bottomCircleFixture = this.body.CreateFixture2(bottomCircleDef, this.density);
                bottomCircleFixture.SetRestitution(this.bounciness);
                bottomCircleFixture.SetFriction(1);

                var boxDef = new b2.PolygonDef();
                var boxWidth = this.size.x / 2 * b2.SCALE;
                var boxHeight = (this.size.y / 2 - this.size.x / 2) * b2.SCALE;
                boxDef.SetAsBox(boxWidth, boxHeight);
                boxFixture = this.body.CreateFixture2(boxDef, this.density);
                boxFixture.SetRestitution(this.bounciness);
                boxFixture.SetFriction(1);

                this.body.SetFixedRotation(this.isFixedRotation);
                this.body.SetBullet(this.isBullet);
                this.body.CreateFixture(fixtureDef);
                return;
            }

            var fixtureDef = new b2.FixtureDef();
            fixtureDef.shape = shapeDef;
            fixtureDef.density = this.density;
            fixtureDef.friction = 1;
            fixtureDef.restitution = this.bounciness;

            this.body.SetFixedRotation(this.isFixedRotation);
            this.body.SetBullet(this.isBullet);
            this.body.CreateFixture(fixtureDef);
        },

        update: function() {
            if(this.body.IsAwake()) {
                this.applyGravity();
            }

            var p = this.body.GetPosition();
            this.pos = {
                x: (p.x / b2.SCALE - this.size.x / 2),
                y: (p.y / b2.SCALE - this.size.y / 2)
            };
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.angle = this.body.GetAngle().round(2);

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

        touches: function( other ) {
            for( var edge = this.body.m_contactList; edge; edge = edge.next ) {
                if(edge.other.entity === other) {
                    return true;
                }
            }
            return false;
        },

        // Entity collision handled by Box2D now.
        checkEntities: function() {},

        applyGravity: function() {
            var gravity = new b2.Vec2(0, ig.game.gravity * this.gravityFactor * this.body.GetMass() * b2.SCALE);
            this.body.ApplyForce( gravity, this.body.GetPosition() );
        },

        limitVelocity: function() {
            var velocity = this.body.GetLinearVelocity();
            var x = velocity.x / b2.SCALE;
            var y = velocity.y / b2.SCALE;
            if(x < -this.maxVel.x)     x = -this.maxVel.x;
            else if(x > this.maxVel.x) x = this.maxVel.x;
            if(y < -this.maxVel.y)     y = -this.maxVel.y;
            else if(y > this.maxVel.y) y = this.maxVel.y;
            velocity.x = x * b2.SCALE;
            velocity.y = y * b2.SCALE;
            this.body.SetLinearVelocity(velocity, this.body.GetPosition());
        },

        updateStanding: function() {
            this.standing = false;
            for( var edge = this.body.m_contactList; edge; edge = edge.next ) {
                var normal = edge.contact.m_manifold.m_localPlaneNormal;
                if( normal.y > 0 ) {
                    this.standing = true;
                    break;
                }
            }
        }

    });

    ig.Box2DEntity.SHAPE = {
        BOX: 0,
        CIRCLE: 1,
        POLYGON: 2
    };

});