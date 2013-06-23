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

            var radius = (this.size.x > this.size.y ? this.size.y / 2 : this.size.x / 2);
            var circleOffsetX = (this.size.x > this.size.y ? (this.size.x / 2 - radius) : 0);
            var circleOffsetY = (this.size.y > this.size.x ? (this.size.y / 2 - radius) : 0);

            var circleADef = new Box2D.Collision.Shapes.b2CircleShape(radius * Box2D.SCALE);
            circleADef.SetLocalPosition(new Box2D.Common.Math.b2Vec2(-circleOffsetX * Box2D.SCALE, -circleOffsetY * Box2D.SCALE));
            circleAFixture = this.body.CreateFixture2(circleADef, this.density);
            circleAFixture.SetRestitution(this.bounciness);
            circleAFixture.SetFriction(1);

            var circleBDef = new Box2D.Collision.Shapes.b2CircleShape(radius * Box2D.SCALE);
            circleBDef.SetLocalPosition(new Box2D.Common.Math.b2Vec2(circleOffsetX * Box2D.SCALE, circleOffsetY * Box2D.SCALE));
            circleBFixture = this.body.CreateFixture2(circleBDef, this.density);
            circleBFixture.SetRestitution(this.bounciness);
            circleBFixture.SetFriction(1);

            var boxDef = new Box2D.Collision.Shapes.b2PolygonShape();
            var boxWidth = (this.size.x > this.size.y ? this.size.y : this.size.x) / 2 * Box2D.SCALE;
            var boxHeight = (this.size.x > this.size.y ? this.size.y / 2 : (this.size.y / 2 - this.size.x / 2))  * Box2D.SCALE;
            boxDef.SetAsBox(boxWidth, boxHeight);
            boxFixture = this.body.CreateFixture2(boxDef, this.density);
            boxFixture.SetRestitution(this.bounciness);
            boxFixture.SetFriction(1);
        }

    });

});