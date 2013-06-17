ig.module(
    'plugins.box2d.b2poly'
)
.requires(
    'impact.entity',
    'plugins.box2d.game'
)
.defines(function(){

    ig.Box2DPoly = ig.Entity.extend({
    body: null,
    angle: 0,

    init: function( x, y , settings ) {
        this.parent( x, y, settings );

        // Only create a box2d body when we are not in Weltmeister
        if( !ig.global.wm ) {
        this.createBody();
        }
    },

    createBody: function() {
        var bodyDef = new b2.BodyDef();

        // Set default position
        bodyDef.position.Set(
        (this.pos.x + this.size.x / 2) * b2.SCALE,
        (this.pos.y + this.size.y / 2) * b2.SCALE
        );

        // Define Body Attributes
        bodyDef.type = b2.Body.b2_dynamicBody;

        // Add to World
        this.body = ig.world.CreateBody(bodyDef);

        var shapeDef = new b2.PolygonShape();
        shapeDef.SetAsArray(this.b2verts, this.b2verts.length);

        // CreateFixture2( var shapedef, density )
        this.body.CreateFixture2(shapeDef, 0.1);
    },

    update: function() {
        var p = this.body.GetPosition();
        this.pos = {
        x: (p.x / b2.SCALE - this.size.x / 2),
        y: (p.y / b2.SCALE - this.size.y / 2 )
        };
        this.angle = this.body.GetAngle().round(2);

        if( this.currentAnim ) {
        this.currentAnim.update();
        this.currentAnim.angle = this.angle;
        }
    },

    kill: function() {
        ig.world.DestroyBody( this.body );
        this.parent();
    }
    });

});