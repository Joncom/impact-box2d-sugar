ig.module(
	'plugins.box2d.b2static'
)
.requires(
	'impact.entity',
	'plugins.box2d.game'
)
.defines(function(){

    ig.Box2DStatic = ig.Entity.extend({
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
	    bodyDef.position.Set(
		(this.pos.x + this.size.x / 2) * b2.SCALE,
		(this.pos.y + this.size.y / 2) * b2.SCALE
	    );

	    bodyDef.type = b2.Body.b2_staticBody;

	    this.body = ig.world.CreateBody(bodyDef);

	    var shapeDef = new b2.PolygonShape();
	    shapeDef.SetAsBox(
		this.size.x / 2 * b2.SCALE,
		this.size.y / 2 * b2.SCALE
	    );

            // CreateFixture2( var shapedef, density )
	    this.body.CreateFixture2(shapeDef, 1.0);
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