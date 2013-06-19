ig.module('plugins.box2d.entities.ball')
.requires('plugins.box2d.entity')
.defines(function(){

    ig.b2Ball = ig.Box2DEntity.extend({

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            if(this.size.x !== this.size.y) {
                throw "Circles must have equal width and height.";
            }
        },

        createBody: function() {
            var bodyDef = new b2.BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.position.Set(
                (this.pos.x + this.size.x / 2) * b2.SCALE,
                (this.pos.y + this.size.y / 2) * b2.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            var radius = this.size.x / 2;
            var shapeDef = new b2.CircleShape();
            shapeDef.SetRadius(radius * b2.SCALE);

            var fixtureDef = new b2.FixtureDef();
            fixtureDef.shape = shapeDef;
            fixtureDef.density = this.density;
            fixtureDef.friction = 1;
            fixtureDef.restitution = this.bounciness;
            fixtureDef.isSensor = this.isSensor;

            this.body.SetFixedRotation(this.isFixedRotation);
            this.body.CreateFixture(fixtureDef);
        }

    });

});