ig.module(
    'plugins.box2d.b2circle'
)
.requires(
    'impact.entity',
    'plugins.box2d.game'
)
.defines(function(){

    ig.Box2DCircle = ig.Entity.extend({

        body: null,
        angle: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Only create a box2d body when we are not in Weltmeister
            if (!ig.global.wm) {
                this.createBody();
            }
        },

        createBody: function() {
            // Create Body
            var bodyDef = new b2.BodyDef();

            // Set default position
            bodyDef.position.Set(
            (this.pos.x + this.radius / 2) * b2.SCALE, (this.pos.y + this.radius / 2) * b2.SCALE);

            // Define Body Attributes
            bodyDef.type = b2.Body.b2_dynamicBody;

            // Add to World
            this.body = ig.world.CreateBody(bodyDef);

            // Define Shape
            var circleDef = new b2.CircleShape();
            circleDef.SetRadius(this.radius * b2.SCALE);

            // Finally create the fixture
            this.body.CreateFixture2(circleDef, 0.1);
        },

        update: function() {
            var p = this.body.GetPosition();
            this.pos = {
                x: (p.x / b2.SCALE - this.radius / 2),
                y: (p.y / b2.SCALE - this.radius / 2)
            };
            this.angle = this.body.GetAngle().round(2);

            if (this.currentAnim) {
                this.currentAnim.update();
                this.currentAnim.angle = this.angle;
            }
        },

        kill: function() {
            ig.world.DestroyBody(this.body);
            this.parent();
        }

    });

});