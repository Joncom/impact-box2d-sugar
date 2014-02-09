ig.module('plugins.joncom.box2d.entities.circle')
.requires('plugins.joncom.box2d.entity')
.defines(function(){

    EntityCircle = ig.Entity.extend({

        radius: 8,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.size.x = this.size.y = (2 * this.radius);

            if (!ig.global.wm && this.hasBody) {
                Object.defineProperty(this, 'radius', {
                    get: this._getRadius,
                    set: this._setRadius
                });
            }
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
        },

        /* .radius logic */

        _getRadius: function() {
            var b2Radius = this.body.GetFixtureList().GetShape().GetRadius();
            return (b2Radius / Box2D.SCALE).round(2);
        },

        _setRadius: function(radius) {
            this.size.x = this.size.y = (2 * radius);
            var b2Radius = radius * Box2D.SCALE;
            this.body.GetFixtureList().GetShape().SetRadius(b2Radius);
        }

    });

});