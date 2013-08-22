ig.module(
    'plugins.box2d.game'
)
.requires(
    'plugins.box2d.utilstile',
    'plugins.box2d.lib',
    'impact.game'

)
.defines(function(){

    ig.Game.inject({

        allowSleep: true,
        collisionRects: [],
        debugCollisionRects: false,

        defaultTileSegmentsDef: {},

        // This function is overloaded to do nothing,
        // because checking for "touching entities" is
        // now handled by Box2D.
        checkEntities: function() {},

        loadLevel: function(data) {
            // Find the collision layer and create the box2d world from it
            for (var i = 0; i < data.layer.length; i++) {
                var ld = data.layer[i];
                if (ld.name == 'collision') {
                    ig.world = this.createWorldFromMap(ld.data, ld.width, ld.height, ld.tilesize);
                    break;
                }
            }
            this.parent(data);
            this.setupContactListener();
        },

        update: function() {
            ig.world.Step(ig.system.tick, 5, 5);
            ig.world.ClearForces();
            this.parent();
        },

        draw: function() {
            this.parent();

            if (this.debugCollisionRects) {
                // Draw outlines of all collision rects
                var ts = this.collisionMap.tilesize;
                for (var i = 0; i < this.collisionRects.length; i++) {
                    var rect = this.collisionRects[i];
                    ig.system.context.strokeStyle = '#00ff00';
                    ig.system.context.strokeRect(
                        ig.system.getDrawPos(rect.x * ts - this.screen.x),
                        ig.system.getDrawPos(rect.y * ts - this.screen.y),
                        ig.system.getDrawPos(rect.width * ts),
                        ig.system.getDrawPos(rect.height * ts));
                }
            }
        },

        setupContactListener: function() {
            var callback = function(method, contact, argument) {
                var a = contact.GetFixtureA().GetBody().entity;
                var b = contact.GetFixtureB().GetBody().entity;
                if(a && b) {
                    a[method](b, contact, argument);
                    b[method](a, contact, argument);
                } else if(a && !b) {
                    a[method](null, contact, argument);
                } else if(b && !a) {
                    b[method](null, contact, argument);
                }
            };
            var listener = new Box2D.Dynamics.b2ContactListener();
            listener.BeginContact = function(contact) {
                callback('beginContact', contact);
            };
            listener.EndContact = function(contact) {
                callback('endContact', contact);
            };
            listener.PostSolve = function(contact, impulse) {
                callback('postSolve', contact, impulse);
            };
            listener.PreSolve = function(contact, oldManifold) {
                callback('preSolve', contact, oldManifold);
            };
            ig.world.SetContactListener(listener);
        },

        createWorldFromMap: function(origData, width, height, tilesize) {

            // Gravity is applied to entities individually.
            var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
            var world = new Box2D.Dynamics.b2World(gravity, this.allowSleep);

            // We need to delete those tiles that we already processed. The original
            // map data is copied, so we don't destroy the original.
            var data = ig.copy(origData);

            // Get all the Collision Rects from the map
            this.collisionRects = [];
            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    // If this tile is solid, find the rect of solid tiles starting
                    // with this one
                    if (data[y][x]) {
                        var r = this._extractRectFromMap(data, width, height, x, y);
                        this.collisionRects.push(r);
                    }
                }
            }

            // Go through all rects we gathered and create Box2D objects from them
            for (var i = 0; i < this.collisionRects.length; i++) {
                var rect = this.collisionRects[i];

                var bodyDef = new Box2D.Dynamics.b2BodyDef();
                bodyDef.position.Set(
                    rect.x * tilesize * Box2D.SCALE + rect.width * tilesize / 2 * Box2D.SCALE,
                    rect.y * tilesize * Box2D.SCALE + rect.height * tilesize / 2 * Box2D.SCALE);

                var body = world.CreateBody(bodyDef);
                var shape = new Box2D.Collision.Shapes.b2PolygonShape();
                shape.SetAsBox(
                    rect.width * tilesize / 2 * Box2D.SCALE,
                    rect.height * tilesize / 2 * Box2D.SCALE);
                body.CreateFixture2(shape);
            }

            return world;
        },

        _extractRectFromMap: function(data, width, height, x, y) {
            var rect = {
                x: x,
                y: y,
                width: 1,
                height: 1
            };

            // Find the width of this rect
            for (var wx = x + 1; wx < width && data[y][wx]; wx++) {
                rect.width++;
                data[y][wx] = 0; // unset tile
            }

            // Check if the next row with the same width is also completely solid
            for (var wy = y + 1; wy < height; wy++) {
                var rowWidth = 0;
                for (wx = x; wx < x + rect.width && data[wy][wx]; wx++) {
                    rowWidth++;
                }

                // Same width as the rect? -> All tiles are solid; increase height
                // of this rect
                if (rowWidth == rect.width) {
                    rect.height++;

                    // Unset tile row from the map
                    for (wx = x; wx < x + rect.width; wx++) {
                        data[wy][wx] = 0;
                    }
                } else {
                    return rect;
                }
            }
            return rect;
        },

        _shapesFromCollisionMap: function (map, options) {
            var shapes = {
                edges: []
            };
            if (map instanceof ig.CollisionMap) {
                options = options || {};
                // copy data so we can clear spots we've already visited and used
                // data is edited as we go so we don't extract duplicates
                var data = ig.copy(map.data);
                // extract each tile shape from map
                var tilesize = map.tilesize;
                var width = map.width;
                var height = map.height;
                var solids = [];
                var vertices, scaledVertices, segments, segment;
                var ix, iy, x, y;
                var i, il, tile, shape;
                for (iy = 0; iy < height; iy++) {
                    for (ix = 0; ix < width; ix++) {
                        shape = this._shapeFromTile(map, ix, iy);
                        tile = {
                            id: map.data[ iy ][ ix ],
                            ix: ix,
                            iy: iy,
                            x: ix * tilesize,
                            y: iy * tilesize,
                            width: tilesize,
                            height: tilesize,
                            shape: shape
                        };
                        // not empty
                        if (shape.vertices.length > 0) {
                            // copy, absolutely position, and scale vertices
                            scaledVertices = [];
                            vertices = shape.vertices;
                            segments = shape.segments;
                            for (i = 0, il = segments.length; i < il; i++) {
                                segment = segments[ i ];
                                var va = vertices[ segment.a ];
                                scaledVertices[ segment.a ] = { x: tile.x + va.x * tilesize, y: tile.y + va.y * tilesize };
                            }
                            shape.vertices = scaledVertices;
                            // add to list
                            solids.push(tile);
                        }
                        // store in copied data so other tiles can compare
                        data[ iy ][ ix ] = tile;
                    }
                }
                // solid tiles to shapes
                shapes.edges = shapes.edges.concat(ig.utilstile.shapedTilesToShapes(solids, data, {
                    retainBoundaryOuter: options.retainBoundaryOuter,
                    discardBoundaryInner: options.discardBoundaryInner,
                    discardEdgesInner: options.discardEdgesInner
                }));
            }
            return shapes;
        },

        _shapeFromTile: function (map, ix, iy) {
            var i, il;
            var tileId = map.data[ iy ][ ix ];
            var vertices = this._verticesFromTile(map, ix, iy);
            var segments;
            if (vertices) {
                // get or compute segments from tile
                if (this.defaultTileSegmentsDef[ tileId ]) {
                    segments = this.defaultTileSegmentsDef[ tileId ];
                }
                else {
                    this.defaultTileSegmentsDef[ tileId ] = segments = [];
                    for (i = 0, il = vertices.length; i < il; i++) {
                        var va = vertices[ i ];
                        var indexB = i === il - 1 ? 0 : i + 1;
                        var vb = vertices[ indexB ];
                        // store segment with pre-computed normal for later use
                        // normal should be facing out and normalized between 0 and 1
                        var dx = vb.x - va.x;
                        var dy = vb.y - va.y;
                        var l = Math.sqrt(dx * dx + dy * dy);
                        var nx = dy / l;
                        var ny = -dx / l;
                        segments.push({ a: i, b: indexB, normal: { x: nx, y: ny } });
                    }
                }
            }
            return {
                vertices: vertices,
                segments: segments || []
            };
        },

        _verticesFromTile: function (map, ix, iy) {
            var tileId = map.data[ iy ][ ix ];
            var vertices;
            // get or compute shape from tile
            if (ig.utilstile.defaultTileVerticesDef[ tileId ]) {
                vertices = ig.utilstile.defaultTileVerticesDef[ tileId ];
            }
            else {
                // solid square (1) or climbable (100/111)
                if (tileId === 1 || ig.utilstile.isTileClimbable(tileId)) {
                    vertices = [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 0, y: 1 }
                    ];
                }
                // solid sloped
                else {
                    vertices = [];
                    // find vertices
                    var def = map.tiledef[ tileId ];
                    if (def) {
                        var va = vertices[ 0 ] = { x: def[0], y: def[1] };
                        var vb = vertices[ 1 ] = { x: def[2], y: def[3] };
                        var ax = va.x;
                        var ay = va.y;
                        var bx = vb.x;
                        var by = vb.y;
                        var fx = bx - ax;
                        var fy = by - ay;
                        // we have two points and the slope's facing direction
                        // find remaining points
                        // corner
                        var vc = vertices[ 2 ] = { x: ( fy < 0 ? 1 : 0 ), y: ( fx > 0 ? 1 : 0 ) };
                        var cx = vc.x;
                        var cy = vc.y;
                        var vd, ve, dax, day, dbx, dby;
                        // check if 5 sided
                        var fiveSided = false;
                        if (Math.abs(fx) < 1 && Math.abs(fy) < 1) {
                            var quadrantA = _utv2.pointQuadrant(ax, ay, 0.5, 0.5);
                            var quadrantB = _utv2.pointQuadrant(bx, by, 0.5, 0.5);
                            var quadrantC = _utv2.pointQuadrant(cx, cy, 0.5, 0.5);
                            if (!( quadrantA & quadrantC ) && !( quadrantB & quadrantC )) {
                                fiveSided = true;
                            }
                        }
                        if (fiveSided === true) {
                            // generate vertices in both directions from corner
                            if (cx !== cy) {
                                dax = cx;
                                dby = cy;
                                if (cx == 1) {
                                    day = 1;
                                    dbx = 0;
                                }
                                else {
                                    day = 0;
                                    dbx = 1;
                                }
                            }
                            else {
                                day = cy;
                                dbx = cx;
                                if (cx == 1) {
                                    dax = 0;
                                    dby = 0;
                                }
                                else {
                                    dax = 1;
                                    dby = 1;
                                }
                            }
                            vd = vertices[ 3 ] = { x: dax, y: day };
                            ve = vertices[ 4 ] = { x: dbx, y: dby };
                        }
                        else {
                            // check from corner to connected points
                            // generate d vertices in both directions for testing against a and b
                            if (cx !== cy) {
                                dax = cx;
                                dby = cy;
                                if (cx == 1) {
                                    day = Math.max(ay, by);
                                    dbx = Math.min(ax, bx);
                                }
                                else {
                                    day = Math.min(ay, by);
                                    dbx = Math.max(ax, bx);
                                }
                            }
                            else {
                                day = cy;
                                dbx = cx;
                                if (cx == 1) {
                                    dax = Math.min(ax, bx);
                                    dby = Math.min(ay, by);
                                }
                                else {
                                    dax = Math.max(ax, bx);
                                    dby = Math.max(ay, by);
                                }
                            }
                            // da is duplicate of a
                            if (( dax === ax && day === ay ) || ( dax === bx && day === by )) {
                                // db is not duplicate of b
                                if (!( ( dbx === ax && dby === ay ) || ( dbx === bx && dby === by ) )) {
                                    vd = vertices[ 3 ] = { x: dbx, y: dby };
                                }
                            }
                            else {
                                vd = vertices[ 3 ] = { x: dax, y: day };
                            }
                        }
                        vertices = _utv2.pointsToConvexHull(vertices);
                    }
                    // store so we don't compute again
                    ig.utilstile.defaultTileVerticesDef[ tileId ] = vertices;
                }
            }
            return vertices;
        }

    });

    // Using Box2D.SCALE == 0.1, the maximum speed any body may
    // move will be approximately (max * 300) pixels per second.
    var max = 10; // default 2
    Box2D.Common.b2Settings.b2_maxTranslation = max;
    Box2D.Common.b2Settings.b2_maxTranslationSquared = max * max;

});

