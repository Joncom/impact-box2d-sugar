ig.module(
    'plugins.box2d.entity'
)
.requires(
    'impact.entity',
    'plugins.box2d.game'
)
.defines(function(){

    ig.Entity.inject({

        body: null,
        angle: 0,

        bodyType: b2.Body.b2_dynamicBody,
        shape: 0, // ig.Entity.SHAPE.BOX
        density: 1.0,
        vertices: [],
        isFixedRotation: false,
        isBullet: false,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            if(this.shape === ig.Entity.SHAPE.CIRCLE && this.size.x !== this.size.y) {
                throw "Circles must have equal width and height.";
            }

            // Only create a box2d body when we are not in Weltmeister
            if (!ig.global.wm) {
                this.createBody();
            }
        },

        createBody: function() {
            var bodyDef = new b2.BodyDef();
            bodyDef.type = this.bodyType;

            if(!this.shape || this.shape === ig.Entity.SHAPE.BOX) {
                bodyDef.position.Set(
                    (this.pos.x + this.size.x / 2) * b2.SCALE,
                    (this.pos.y + this.size.y / 2) * b2.SCALE
                );
                var shapeDef = new b2.PolygonShape();
                shapeDef.SetAsBox(
                    this.size.x / 2 * b2.SCALE,
                    this.size.y / 2 * b2.SCALE
                );
            } else if(this.shape === ig.Entity.SHAPE.CIRCLE) {
                var radius = this.size.x / 2;
                bodyDef.position.Set(
                    (this.pos.x + radius) * b2.SCALE,
                    (this.pos.y + radius) * b2.SCALE
                );
                var shapeDef = new b2.CircleShape();
                shapeDef.SetRadius(radius * b2.SCALE);
            } else if(this.shape === ig.Entity.SHAPE.POLYGON) {
                bodyDef.position.Set(
                    (this.pos.x + this.size.x / 2) * b2.SCALE,
                    (this.pos.y + this.size.y / 2) * b2.SCALE
                );
                var shapeDef = new b2.PolygonShape();
                shapeDef.SetAsArray(this.vertices, this.vertices.length);
            }

            var fixtureDef = new b2.FixtureDef();
            fixtureDef.shape = shapeDef;
            fixtureDef.density = this.density;
            fixtureDef.friction = 1;

            this.body = ig.world.CreateBody(bodyDef);
            this.body.SetFixedRotation(this.isFixedRotation);
            this.body.SetBullet(this.isBullet);
            this.body.CreateFixture(fixtureDef);
        },

        update: function() {
            var p = this.body.GetPosition();
            this.pos = {
                x: (p.x / b2.SCALE - this.size.x / 2),
                y: (p.y / b2.SCALE - this.size.y / 2)
            };
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.angle = this.body.GetAngle().round(2);

            this.updateStanding();

            if (this.currentAnim) {
                this.currentAnim.update();
                this.currentAnim.angle = this.angle;
            }
        },

        kill: function() {
            ig.world.DestroyBody(this.body);
            this.parent();
        },

        updateStanding: function() {
            this.standing = false;
            for( var edge = this.body.m_contactList; edge; edge = edge.next ) {
                var normal = edge.contact.m_manifold.m_localPlaneNormal;
                if( normal.y > 0 ) {
                    this.standing = true;
                    break;
                }
            }
        }

    });

    ig.Entity.SHAPE = {
        BOX: 0,
        CIRCLE: 1,
        POLYGON: 2
    };

});