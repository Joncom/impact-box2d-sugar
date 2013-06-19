ig.module('plugins.box2d.entities.pill')
.requires('plugins.box2d.entity')
.defines(function(){

    ig.b2Pill = ig.Box2DEntity.extend({

        createBody: function() {
            var bodyDef = new b2.BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.position.Set(
                (this.pos.x + this.size.x / 2) * b2.SCALE,
                (this.pos.y + this.size.y / 2) * b2.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            var radius = this.size.x / 2;
            var circleOffsetY = this.size.y / 2 - radius;

            var topCircleDef = new b2.CircleShape(radius * b2.SCALE);
            topCircleDef.SetLocalPosition(new b2.Vec2(0, -circleOffsetY * b2.SCALE));
            topCircleFixture = this.body.CreateFixture2(topCircleDef, this.density);
            topCircleFixture.SetRestitution(this.bounciness);
            topCircleFixture.SetFriction(1);
            topCircleFixture.isSensor = this.isSensor;

            var bottomCircleDef = new b2.CircleShape(radius * b2.SCALE);
            bottomCircleDef.SetLocalPosition(new b2.Vec2(0, circleOffsetY * b2.SCALE));
            bottomCircleFixture = this.body.CreateFixture2(bottomCircleDef, this.density);
            bottomCircleFixture.SetRestitution(this.bounciness);
            bottomCircleFixture.SetFriction(1);
            bottomCircleFixture.isSensor = this.isSensor;

            var boxDef = new b2.PolygonShape();
            var boxWidth = this.size.x / 2 * b2.SCALE;
            var boxHeight = (this.size.y / 2 - this.size.x / 2) * b2.SCALE;
            boxDef.SetAsBox(boxWidth, boxHeight);
            boxFixture = this.body.CreateFixture2(boxDef, this.density);
            boxFixture.SetRestitution(this.bounciness);
            boxFixture.SetFriction(1);
            boxFixture.isSensor = this.isSensor;
        }

    });

});