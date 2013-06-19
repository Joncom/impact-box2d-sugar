ig.module('plugins.box2d.entities.ball')
.requires('plugins.box2d.entity')
.defines(function(){

    ig.b2Ball = ig.Box2DEntity.extend({

        radius: 8,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.size.x = this.size.y = (2 * this.radius);
        },

        createBody: function() {
            var bodyDef = new b2.BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.position.Set(
                (this.pos.x + this.radius) * b2.SCALE,
                (this.pos.y + this.radius) * b2.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            var shapeDef = new b2.CircleShape();
            shapeDef.SetRadius(this.radius * b2.SCALE);

            var fixtureDef = new b2.FixtureDef();
            fixtureDef.shape = shapeDef;
            fixtureDef.density = this.density;
            fixtureDef.friction = 1;
            fixtureDef.restitution = this.bounciness;

            this.body.CreateFixture(fixtureDef);
        }

    });

});