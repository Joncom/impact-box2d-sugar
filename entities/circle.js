ig.module('plugins.box2d.entities.circle')
.requires('plugins.box2d.entity')
.defines(function(){

    EntityCircle = ig.Entity.extend({

        radius: 8,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.size.x = this.size.y = (2 * this.radius);
        },

        createBody: function(friction) {
            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.position.Set(
                (this.pos.x + this.radius) * Box2D.SCALE,
                (this.pos.y + this.radius) * Box2D.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            var shapeDef = new Box2D.Collision.Shapes.b2CircleShape();
            shapeDef.SetRadius(this.radius * Box2D.SCALE);

            var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
            fixtureDef.shape = shapeDef;
            fixtureDef.density = this.density;
            fixtureDef.friction = friction;
            fixtureDef.restitution = this.bounciness;

            this.body.CreateFixture(fixtureDef);
        }

    });

});