ig.module('plugins.box2d.entities.polygon')
.requires('plugins.box2d.entity')
.defines(function(){

    ig.b2Polygon = ig.Box2DEntity.extend({

        vertices: [],

        createBody: function() {
            var bodyDef = new b2.BodyDef();
            bodyDef.type = this.bodyType;
            bodyDef.position.Set(
                (this.pos.x + this.size.x / 2) * b2.SCALE,
                (this.pos.y + this.size.y / 2) * b2.SCALE
            );
            this.body = ig.world.CreateBody(bodyDef);

            var shapeDef = new b2.PolygonShape();
            shapeDef.SetAsArray(this.vertices, this.vertices.length);

            var fixtureDef = new b2.FixtureDef();
            fixtureDef.shape = shapeDef;
            fixtureDef.density = this.density;
            fixtureDef.friction = 1;
            fixtureDef.restitution = this.bounciness;
            fixtureDef.isSensor = this.isSensor;

            this.body.CreateFixture(fixtureDef);
        }

    });

});