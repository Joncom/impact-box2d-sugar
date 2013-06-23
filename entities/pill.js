ig.module('plugins.box2d.entities.pill')
.requires('plugins.box2d.entity')
.defines(function(){

    ig.b2Pill = ig.Entity.extend({

        createBody: function() {
            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.position.Set(
                (this.pos.x + this.size.x / 2) * Box2D.SCALE,
                (this.pos.y + this.size.y / 2) * Box2D.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            var radius = this.size.x / 2;
            var circleOffsetY = this.size.y / 2 - radius;

            var topCircleDef = new Box2D.Collision.Shapes.b2CircleShape(radius * Box2D.SCALE);
            topCircleDef.SetLocalPosition(new Box2D.Common.Math.b2Vec2(0, -circleOffsetY * Box2D.SCALE));
            topCircleFixture = this.body.CreateFixture2(topCircleDef, this.density);
            topCircleFixture.SetRestitution(this.bounciness);
            topCircleFixture.SetFriction(1);

            var bottomCircleDef = new Box2D.Collision.Shapes.b2CircleShape(radius * Box2D.SCALE);
            bottomCircleDef.SetLocalPosition(new Box2D.Common.Math.b2Vec2(0, circleOffsetY * Box2D.SCALE));
            bottomCircleFixture = this.body.CreateFixture2(bottomCircleDef, this.density);
            bottomCircleFixture.SetRestitution(this.bounciness);
            bottomCircleFixture.SetFriction(1);

            var boxDef = new Box2D.Collision.Shapes.b2PolygonShape();
            var boxWidth = this.size.x / 2 * Box2D.SCALE;
            var boxHeight = (this.size.y / 2 - this.size.x / 2) * Box2D.SCALE;
            boxDef.SetAsBox(boxWidth, boxHeight);
            boxFixture = this.body.CreateFixture2(boxDef, this.density);
            boxFixture.SetRestitution(this.bounciness);
            boxFixture.SetFriction(1);
        }

    });

});