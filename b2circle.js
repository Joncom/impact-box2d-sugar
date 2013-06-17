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
	
	init: function( x, y , settings ) {
	    this.parent( x, y, settings );
	    
	    // Only create a box2d body when we are not in Weltmeister
	    if( !ig.global.wm ) { 
		this.createBody();
	    }
	},
	
	createBody: function() {
	    // Create Body
	    var bodyDef = new b2.BodyDef();

	    // Set default position
	    bodyDef.position.Set(
		(this.pos.x + this.radius / 2) * b2.SCALE,
		(this.pos.y + this.radius / 2) * b2.SCALE
	    );
	    
	    // Define Body Attributes
	    bodyDef.type = b2.Body.b2_dynamicBody;
	    
	    // Add to World
	    this.body = ig.world.CreateBody(bodyDef);
	    
	    // Define Shape
	    var circleDef = new b2.CircleShape();
	    circleDef.SetRadius( this.radius * b2.SCALE );
	    
	    // Finally create the fixture
	    this.body.CreateFixture2(circleDef, 0.1);
	},
	
	// Helpful to handle generation of random spawn point when
	// object is out of canvas in next frame
	randomPos: function( body ) {
	    // Range of acceptable values is: 0.8 > x < 47.2 & 1.6 > y < 26.4
	    // generate random location
	    var randPos = {x: Math.random()*45 + 1, y: Math.random()*23 + 2};
	    
	    // Set random location
	    this.body.SetPosition(randPos);
	},
	
	
	randomVel: function ( body ) {
	    // Gen +/- for vector
	    var pOmX = Math.random() < 0.5 ? -1 : 1;
	    var pOmY = Math.random() < 0.5 ? -1 : 1;
	    
	    // gen and set new velocity
	    this.body.SetLinearVelocity( new b2.Vec2(pOmX*Math.random()*16, pOmY*Math.random()*16));		
	},	
	
	update: function() {		
	    var p = this.body.GetPosition();
	    this.pos = {
		x: (p.x / b2.SCALE - this.radius / 2),
		y: (p.y / b2.SCALE - this.radius / 2 )
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