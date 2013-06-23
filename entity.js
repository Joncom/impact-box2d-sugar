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

        checkQueue: {},
        collideWithQueue: [],

        /* Box2D Setup Stuff */
        bodyType: Box2D.Dynamics.b2Body.b2_dynamicBody,
        density: 1.0,
        isFixedRotation: false,
        isBullet: false, // Prevents tunneling at the cost of performance.
        isSensor: false,
        allowSleep: true, // Better performance.
        /* END */

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Only create a box2d body when we are not in Weltmeister
            if (!ig.global.wm) {
                this.createBody();
                this.body.entity = this;
                this.body.SetSleepingAllowed(this.allowSleep);
                this.body.SetBullet(this.isBullet);
                this.body.SetFixedRotation(this.isFixedRotation);
                this.setFixturesToSensorMode(this.isSensor);
                this.applyGravity(); // 1st step needs gravity too!
                ig.world.Step(0, 5, 5); // Make contact edges available for .touches
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

        update: function() {
            if (this.body.IsAwake()) {
                this.applyGravity();
            }

            var p = this.body.GetPosition();
            this.pos = {
                x: (p.x / Box2D.SCALE - this.size.x / 2),
                y: (p.y / Box2D.SCALE - this.size.y / 2)
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

        // Override if you wish to use the res object.
        handleMovementTrace: function(res) {},

        touches: function(other) {
            for (var edge = this.body.m_contactList; edge; edge = edge.next) {
                if(!edge.contact.IsTouching()) {
                    continue;
                }
                if (edge.other.entity === other) {
                    return true;
                }
            }
            return false;
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
            this.body.SetLinearVelocity(velocity, this.body.GetPosition());
        },

        setFixturesToSensorMode: function(isSensor) {
            for (var fixture = this.body.GetFixtureList(); fixture; fixture = fixture.m_next) {
                fixture.SetSensor(isSensor);
            }
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