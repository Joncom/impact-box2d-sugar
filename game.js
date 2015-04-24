ig.module(
    'plugins.joncom.box2d.game'
)
.requires(
    'plugins.joncom.box2d.lib',
    'plugins.joncom.box2d.separator',
    'impact.game'
)
.defines(function(){

    var SEGMENT_A = 1;
    var SEGMENT_B = 2;

    ig.Game.inject({

        maySleep: true,
        debugCollisionRects: false,

        defaultTileSegmentsDef: {},
        defaultTileVerticesDef: {},

        // This function is overloaded to do nothing,
        // because checking for "touching entities" is
        // now handled by Box2D.
        checkEntities: function() {},

        update: function() {
            this.parent();
            if(ig.world) {
                ig.world.Step(ig.system.tick, 5, 5);
                ig.world.ClearForces();
            }
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

        loadLevel: function(data) {
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            for(var i=0; i<data.layer.length; i++) {
                var ld = data.layer[i];
                if(ld.name == 'collision') {
                    this.collisionMap =
                        new ig.CollisionMap(ld.tilesize, ld.data);
                }
            }
            ig.world = this.createWorldFromCollisionMap(this.collisionMap);
            this.setupContactListener();
            this.parent(data);
        },

        createWorldFromCollisionMap: function(collisionMap) {
            // Gravity is applied to entities individually.
            var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
            var world = new Box2D.Dynamics.b2World(gravity, this.maySleep);
            var shapes = this._shapesFromCollisionMap(
                this.collisionMap, {rectangles: true}).edges;
            for(var i=0; i<shapes.length; i++) {
                var shape = shapes[i];
                var width = shape.settings.size.x;
                var height = shape.settings.size.y;
                var vertices = shape.settings.vertices;
                // Scale vertices.
                for(var v=0; v<vertices.length; v++) {
                    vertices[v].x *= Box2D.SCALE;
                    vertices[v].y *= Box2D.SCALE;
                }
                var bodyDef = new Box2D.Dynamics.b2BodyDef();
                bodyDef.position.Set(
                    shape.x * Box2D.SCALE + (width / 2) * Box2D.SCALE,
                    shape.y * Box2D.SCALE + (height / 2) * Box2D.SCALE);
                var body = world.CreateBody(bodyDef);
                if(this._polygonIsConvex(vertices)) {
                    var shape = new Box2D.Collision.Shapes.b2PolygonShape();
                    shape.SetAsArray(vertices, vertices.length);
                    body.CreateFixture2(shape);
                }
                else {
                    // Break the concave shape up into smaller convex shapes.
                    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
                    Box2DSeparator.separate(body, fixtureDef, vertices, 1);
                }
            }
            return world;
        },

        _polygonIsConvex: function(vertices) {
            var hull = this._pointsToConvexHull(vertices);
            // -1 because the first and last point are the same.
            return vertices.length === hull.length - 1;
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
                // store original rectangles option
                var rectangles = options.rectangles;
                // solid tiles to shapes
                options.rectangles = typeof rectangles !== 'undefined' ? rectangles : !options.contourSolids;
                shapes.edges = shapes.edges.concat(this._shapedTilesToShapes(solids, data, options));
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
            if (this.defaultTileVerticesDef[ tileId ]) {
                vertices = this.defaultTileVerticesDef[ tileId ];
            }
            else {
                // solid square (1)
                if (tileId === 1) {
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
                        vertices = this._pointsToConvexHull(vertices);
                    }
                    // store so we don't compute again
                    this.defaultTileVerticesDef[ tileId ] = vertices;
                }
            }
            return vertices;
        },

        _pointsToConvexHull: function (points) {
            if (points.length < 3) return points;
            // find the point with the smallest y
            var i, il;
            var indexMin = 0, pointMin = points[ indexMin ], point;
            for (i = 1, il = points.length; i < il; i++) {
                point = points[ i ];
                if (point.y === pointMin.y) {

                    if (point.x < pointMin.x) {
                        indexMin = i;
                        pointMin = point;
                    }

                }
                else if (point.y < pointMin.y) {
                    indexMin = i;
                    pointMin = point;
                }
            }
            // sort points by angle from min
            var pointsByAngle = [];
            var pointFromMin;
            for (i = 0, il = points.length; i < il; i++) {
                if (i === indexMin) continue;
                point = points[ i ];
                pointFromMin = { x: point.x, y: point.y };
                pointFromMin.angle = Math.atan(( point.y - pointMin.y ) / ( point.x - pointMin.x));
                if (pointFromMin.angle < 0) pointFromMin.angle += Math.PI;
                pointFromMin.distance = ( point.x - pointMin.x ) * ( point.x - pointMin.x ) + ( point.y - pointMin.y ) * ( point.y - pointMin.y );
                pointFromMin.index = i;
                pointsByAngle.push(pointFromMin);
            }
            pointsByAngle.sort(function (a, b) {
                if (a.angle < b.angle) return -1;
                else if (a.angle > b.angle) return 1;
                else {
                    if (a.distance < b.distance) return -1;
                    else if (a.distance > b.distance) return 1;
                }
                return 0;
            });
            // add last point and min point to beginning
            pointsByAngle.unshift( pointsByAngle[ pointsByAngle.length - 1 ], { x: pointMin.x, y: pointMin.y, index: indexMin } );
            // search for convex hull
            // loc is location, and at end of search the final index
            var pointTemp;
            var loc = 2;
            for (i = 3, il = points.length; i <= il; i++) {
                // find next valid point
                while (this._pointsCW(pointsByAngle[ loc - 1 ], pointsByAngle[ loc ], pointsByAngle[ i ]) <= 0) {
                    loc--;
                }
                loc++;
                pointTemp = pointsByAngle[ i ];
                pointsByAngle[ i ] = pointsByAngle[ loc ];
                pointsByAngle[ loc ] = pointTemp;
            }
            var pointsSorted = [];
            for (i = 0; i <= loc; i++) {
                pointsSorted[ i ] = points[ pointsByAngle[ i ].index ];
            }
            return pointsSorted;
        },

        _pointsCW: function (p1, p2, p3) {
            return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
        },

        _shapedTilesToShapes: function (tiles, data, options) {
            options = options || {};
            var shapes = [];
            var vertices = [];
            var contours = [];
            var i, il, j, jl, index;
            // create tile groups from tiles
            if (options.groupByTileId) {
                // lets avoid infinite recursion!
                delete options.groupByTileId;
                // group by id
                var ids = [];
                var id;
                var groups = {};
                var group;
                for (i = 0, il = tiles.length; i < il; i++) {
                    var tile = tiles[ i ];
                    if (groups[ tile.id ]) {
                        groups[ tile.id ].push(tile);
                    }
                    else {
                        ids.push(tile.id);
                        groups[ tile.id ] = [ tile ];
                    }
                }
                // create shapes for each group
                for (i = 0, il = ids.length; i < il; i++) {
                    id = ids[ i ];
                    group = groups[ id ];
                    options.id = id;
                    shapes = shapes.concat(this._shapedTilesToShapes(group, data, options));
                }
            }
            else {
                // rectangle shapes that may or may not be concave
                if (options.rectangles) {
                    // step horizontal connected tiles
                    // add line if matches last, else create new rectangle
                    var tilePool = tiles.slice(0);
                    var rectangles = [];
                    var line, length, stepped, rectangle;
                    while (tilePool.length > 0) {
                        // get first horizontal line of tiles
                        line = this._findShapedTileLine(tilePool);
                        this._arrayCautiousRemoveMulti(tilePool, line);
                        length = line.length;
                        rectangle = line;
                        stepped = true;
                        // find as many matching length rows as possible
                        while (stepped) {
                            stepped = false;
                            var tileLast = line[ 0 ];
                            var tileFrom = data[ tileLast.iy ][ tileLast.ix + 1 ];
                            if (tileFrom) {
                                // get tile at start of next row and make sure it is part of tile pool
                                index = this._indexOfValue(tilePool, tileFrom);
                                if (index !== -1) {
                                    line = this._findShapedTileLine(tilePool, false, index, length);
                                    if (line.length === length) {
                                        this._arrayCautiousRemoveMulti(tilePool, line);
                                        rectangle = rectangle.concat(line);
                                        stepped = true;
                                    }
                                }
                            }
                        }
                        if (rectangle.length > 0) {
                            rectangles.push(rectangle);
                        }
                    }
                    for (j = 0, jl = rectangles.length; j < jl; j++) {
                        rectangle = rectangles[ j ];
                        // keep non-duplicate edge vertices
                        vertices = [];
                        for (i = 0, il = rectangle.length; i < il; i++) {
                            vertices = vertices.concat(this._getNonDuplicateSegmentVertices(rectangle[ i ], data, rectangle));
                        }
                        // vertices to contours
                        contours = contours.concat(this._verticesToContours(vertices, options));
                    }
                }
                // general shapes that may or may not be concave
                else {
                    // keep non-duplicate edge vertices
                    for (i = 0, il = tiles.length; i < il; i++) {
                        vertices = vertices.concat(this._getNonDuplicateSegmentVertices(tiles[ i ], data, tiles));
                    }
                    // vertices to contours
                    contours = this._verticesToContours(vertices, options);
                }
                // contours to shapes
                for (i = 0, il = contours.length; i < il; i++) {
                    var contour = contours[ i ];
                    shapes.push({
                       id: options.id,
                        x: contour.minX,
                        y: contour.minY,
                        settings: {
                            size: {
                                x: contour.width,
                                y: contour.height
                            },
                            vertices: contour.vertices
                        }
                    });
                }
            }
            return shapes;
        },

        _findShapedTileLine: function (tiles, horizontal, indexFrom, length) {
            indexFrom = indexFrom || 0;
            length = length || 0;
            var tileFrom = tiles[ indexFrom ];
            var line = [];
            var stepped = true;
            var i, il;
            while (stepped) {
                stepped = false;
                // add tile to line
                line.push(tileFrom);
                if (line.length === length) {
                    break;
                }
                // step to next in line
                var tileNext = horizontal ?
                    this._stepShapedTileHorizontally(tiles, tileFrom) :
                    this._stepShapedTileVertically(tiles, tileFrom);
                if (tileFrom !== tileNext) {
                    stepped = true;
                    tileFrom = tileNext;
                }
            }
            return line;
        },

        _stepShapedTileHorizontally: function (tiles, tileFrom) {
            for (var i = 0, il = tiles.length; i < il; i++) {
                var tileNext = tiles[ i ];
                if (tileFrom.iy === tileNext.iy && tileFrom.ix + 1 === tileNext.ix) {
                    return tileNext;
                }
            }
            return tileFrom;
        },

        _stepShapedTileVertically: function (tiles, tileFrom) {
            for (var i = 0, il = tiles.length; i < il; i++) {
                var tileNext = tiles[ i ];
                if (tileFrom.ix === tileNext.ix && tileFrom.iy + 1 === tileNext.iy) {
                    return tileNext;
                }
            }
            return tileFrom;
        },

        _arrayCautiousRemoveMulti: function (target, elements) {
            var element, index;
            elements = this._toArray(elements);
            // for each element
            for (var i = 0, il = elements.length; i < il; i++) {
                element = elements[ i ];
                if (element !== target) {
                    index = this._indexOfValue(target, element);
                    if (index !== -1) {
                        target.splice(index, 1);
                    }
                }
            }
            return target;
        },

        _toArray: function (target) {
            return target ? ( this._isArray(target) !== true ? [ target ] : target ) : [];
        },

        _isArray: function (target) {
            return Object.prototype.toString.call(target) === '[object Array]';
        },

        _indexOfValue: function (array, value) {
            for (var i = 0, il = array.length; i < il; i++) {
                if (value === array[ i ]) {
                    return i;
                }
            }
            return -1;
        },

        _getNonDuplicateSegmentVertices: function (tile, tileData, tilesAllowed) {
            var ix = tile.ix;
            var iy = tile.iy;
            var shape = tile.shape;
            var vertices = shape.vertices;
            var segments = shape.segments;
            var nonDuplicates = [];
            // add segment vertices in clockwise order while checking for duplicates
            var i, il;
            var j, jl;
            for (i = 0, il = segments.length; i < il; i++) {
                var segment = segments[ i ];
                var va = vertices[ segment.a ];
                var vb = vertices[ segment.b ];
                var normal = segment.normal;
                var overlap = false;
                // if normal is axis aligned to x/y
                // compare segment to touching tiles from normal direction
                if (( normal.x === 0 && normal.y !== 0 ) || ( normal.x !== 0 && normal.y === 0 )) {
                    var touchingTiles = this._getTouchingTilesByDirection(tile, normal, tileData, tilesAllowed);
                    // check each touching for overlap
                    for (j = 0, jl = touchingTiles.length; j < jl; j++) {
                        var touchingTile = touchingTiles[ j ];
                        if (touchingTile.shape.vertices.length > 0) {
                            overlap = this._getSegmentOverlapWithTile(va, vb, normal, touchingTile);
                            if (overlap) break;
                        }
                    }
                }
                // no overlap at all
                if (overlap === false) {
                    nonDuplicates.push(va, vb);
                }
                // partial overlap found, use returned non-overlapping segment
                else if (overlap.segmentA) {
                    nonDuplicates.push(overlap.segmentA.va, overlap.segmentA.vb);
                }
            }
            return nonDuplicates;
        },

        _getTouchingTilesByDirection: function (tile, direction, tileData, tilesAllowed) {
            var ix = tile.ix;
            var iy = tile.iy;
            var nx = direction.x;
            var ny = direction.y;
            var touchingTiles = [];
            var touchingTile;
            var row;
            if (nx !== 0) {
                row = tileData[ iy ];
                if (nx > 0) {
                    if (ix < row.length - 1) {
                        touchingTile = row[ ix + 1 ];
                        if (!tilesAllowed || this._indexOfValue(tilesAllowed, touchingTile) !== -1) {
                            touchingTiles.push(touchingTile);
                        }
                    }
                }
                else {
                    if (ix > 0) {
                        touchingTile = row[ ix - 1 ];
                        if (!tilesAllowed || this._indexOfValue(tilesAllowed, touchingTile) !== -1) {
                            touchingTiles.push(touchingTile);
                        }
                    }
                }
            }
            if (ny !== 0) {
                if (ny > 0) {
                    if (iy < tileData.length - 1) {
                        touchingTile = tileData[ iy + 1 ][ ix ];
                        if (!tilesAllowed || this._indexOfValue(tilesAllowed, touchingTile) !== -1) {
                            touchingTiles.push(touchingTile);
                        }
                    }
                }
                else {
                    if (iy > 0) {
                        touchingTile = tileData[ iy - 1 ][ ix ];
                        if (!tilesAllowed || this._indexOfValue(tilesAllowed, touchingTile) !== -1) {
                            touchingTiles.push(touchingTile);
                        }
                    }
                }
            }
            return touchingTiles;
        },

        _getSegmentOverlapWithTile: function (vaA, vbA, normalCompare, tile) {
            var overlap = false;
            var shape = tile.shape;
            var vertices = shape.vertices;
            var segments = shape.segments;
            var i, il;
            var segmentPotential, normal, segment;
            // find overlapping segment, assuming no more than 1 overlap can occur in a tile
            for (i = 0, il = segments.length; i < il; i++) {
                segmentPotential = segments[ i ];
                normal = segmentPotential.normal;
                // for any overlap to occur, normals must be pointing in opposite directions
                if (normalCompare.x === -normal.x && normalCompare.y === -normal.y) {
                    segment = segmentPotential;
                    break;
                }
            }
            if (segment) {
                var vaB = vertices[ segment.a ];
                var vbB = vertices[ segment.b ];
                var xaA = vaA.x;
                var yaA = vaA.y;
                var xbA = vbA.x;
                var ybA = vbA.y;
                var xaB = vaB.x;
                var yaB = vaB.y;
                var xbB = vbB.x;
                var ybB = vbB.y;
                var xlA = xbA - xaA;
                var ylA = ybA - yaA;
                var lenA = Math.sqrt(xlA * xlA + ylA * ylA);
                var xnA = xlA / lenA;
                var ynA = ylA / lenA;
                var xlB = xaB - xbB;
                var ylB = yaB - ybB;
                var lenB = Math.sqrt(xlB * xlB + ylB * ylB);
                var xnB = xlB / lenB;
                var ynB = ylB / lenB;
                var cross = xnA * ynB - ynA * xnB;
                // if cross product = 0, lines are parallel
                // no need to check for collinearity
                if (cross === 0) {
                    var saebMin, saebMax, easbMin, easbMax, normal;
                    var minCompare, maxCompare, property;
                    // horizontal lines
                    if (xnA !== 0) {
                        saebMin = Math.min(xaA, xbB);
                        saebMax = Math.max(xaA, xbB);
                        easbMin = Math.min(xbA, xaB);
                        easbMax = Math.max(xbA, xaB);
                        normal = xnA;
                        minCompare = xaA;
                        maxCompare = xbA;
                        property = 'x';
                    }
                    // vertical lines
                    else {
                        saebMin = Math.min(yaA, ybB);
                        saebMax = Math.max(yaA, ybB);
                        easbMin = Math.min(ybA, yaB);
                        easbMax = Math.max(ybA, yaB);
                        normal = ynA;
                        minCompare = yaA;
                        maxCompare = ybA;
                        property = 'y';
                    }
                    // fully overlapping
                    if (saebMin === saebMax && easbMin === easbMax) {
                        overlap = true;
                    }
                    // partial or no overlap
                    else {
                        var overlappingBy = normal < 0 ? saebMin - easbMax : easbMin - saebMax;
                        // find edges outside partial overlap
                        if (overlappingBy > 0) {
                            // duplicate will be new edges instead of boolean
                            overlap = {
                                segmentA: { va: { x: vaA.x, y: vaA.y }, vb: { x: vbA.x, y: vbA.y } },
                                segmentB: { va: { x: vaB.x, y: vaB.y }, vb: { x: vbB.x, y: vbB.y } }
                            };
                            var min, max;
                            var wipeout = true;
                            if (normal < 0) {
                                min = saebMin === saebMax ? 0 : ( saebMin === minCompare ? SEGMENT_B : SEGMENT_A );
                                max = easbMin === easbMax ? 0 : ( easbMax === maxCompare ? SEGMENT_B : SEGMENT_A );
                                if (min === SEGMENT_A) {
                                    overlap.segmentA.vb[ property ] += overlappingBy;
                                    wipeout = false;
                                }
                                else if (min === SEGMENT_B) {
                                    overlap.segmentB.va[ property ] += overlappingBy;
                                }
                                if (max === SEGMENT_A) {
                                    overlap.segmentA.va[ property ] -= overlappingBy;
                                    wipeout = false;
                                }
                                else if (max === SEGMENT_B) {
                                    overlap.segmentB.vb[ property ] -= overlappingBy;
                                }
                                // other edge may be bigger and fully overlapping this one
                                if (wipeout === true) {
                                    overlap = true;
                                }
                            }
                            else {
                                min = saebMin === saebMax ? 0 : ( saebMin === minCompare ? SEGMENT_A : SEGMENT_B );
                                max = easbMin === easbMax ? 0 : ( easbMax === maxCompare ? SEGMENT_A : SEGMENT_B );
                                if (min === SEGMENT_A) {
                                    overlap.segmentA.vb[ property ] -= overlappingBy;
                                    wipeout = false;
                                }
                                else if (min === SEGMENT_B) {
                                    overlap.segmentB.va[ property ] -= overlappingBy;
                                }
                                if (max === SEGMENT_A) {
                                    overlap.segmentA.va[ property ] += overlappingBy;
                                    wipeout = false;
                                }
                                else if (max === SEGMENT_B) {
                                    overlap.segmentB.vb[ property ] += overlappingBy;
                                }
                                // other edge may be bigger and fully overlapping this one
                                if (wipeout === true) {
                                    overlap = true;
                                }
                            }
                        }
                    }
                }
            }
            return overlap;
        },

        _verticesToContours: function (vertices, options) {
            var contours = [];
            if (vertices.length > 1) {
                options = options || {};
                // find each contour within vertices
                var vertexPool = vertices.slice(0);
                var contour = {
                    vertices: [],
                    minX: Number.MAX_VALUE,
                    minY: Number.MAX_VALUE,
                    maxX: -Number.MAX_VALUE,
                    maxY: -Number.MAX_VALUE
                };
                var contourVertices = contour.vertices;
                var vb = vertexPool.pop();
                var va = vertexPool.pop();
                var pva, pvb;
                var sva, svb;
                var i, il, j, jl;
                // length > -2 because we need 1 extra loop for final segment/contour
                while (vertexPool.length > -2) {
                    var stepped = false;
                    // if we haven't looped around, try to step to next
                    sva = contourVertices[ 0 ];
                    svb = contourVertices[ 1 ];
                    if (contourVertices.length <= 2 || vb.x !== sva.x || vb.y !== sva.y) {
                        for (i = 0, il = vertexPool.length; i < il; i += 2) {
                            pva = vertexPool[ i ];
                            pvb = vertexPool[ i + 1 ];
                            if (vb.x === pva.x && vb.y === pva.y) {
                                stepped = true;
                                break;
                            }
                        }
                    }
                    // only add the second vector of each pair
                    contourVertices.push(vb);
                    // update contour min/max
                    if (vb.x < contour.minX) contour.minX = vb.x;
                    if (vb.x > contour.maxX) contour.maxX = vb.x;
                    if (vb.y < contour.minY) contour.minY = vb.y;
                    if (vb.y > contour.maxY) contour.maxY = vb.y;
                    if (stepped === true) {
                        vertexPool.splice(i, 2);
                        va = pva;
                        vb = pvb;
                    }
                    else {
                        if (contour.vertices.length >= 3) {
                            contours.push(contour);
                        }
                        if (vertexPool.length > 0) {
                            contour = {
                                vertices: []
                            };
                            contour.minX = contour.minY = Number.MAX_VALUE;
                            contour.maxX = contour.maxY = -Number.MAX_VALUE;
                            contourVertices = contour.vertices;

                            vb = vertexPool.pop();
                            va = vertexPool.pop();
                        }
                        else {
                            break;
                        }
                    }
                }
                // set contour size
                for (i = 0, il = contours.length; i < il; i++) {
                    contour = contours[ i ];
                    contour.width = contour.maxX - contour.minX;
                    contour.height = contour.maxY - contour.minY;
                }
                // sort contours by largest up
                contours.sort(function (a, b) {
                    return ( b.width * b.width + b.height * b.height ) - ( a.width * a.width + a.height * a.height );
                });
                // test each contour to find containing contours
                // if shape's AABB is fully contained by another shape, make chain ordered from smallest to largest
                var contourPool = contours.slice(0);
                var containerChains = [];
                var containerChain = [];
                var containingContour, contained;
                contour = contourPool.pop();
                while (contourPool.length > -1) {
                    contained = false;
                    if (contour) {
                        // search contours instead of contour pool so we can find all containers
                        for (i = contours.length - 1; i > -1; i--) {
                            containingContour = contours[ i ];
                            if (contour !== containingContour && this._AABBContains(contour.minX, contour.minY, contour.maxX, contour.maxY, containingContour.minX, containingContour.minY, containingContour.maxX, containingContour.maxY)) {
                                contained = true;
                                break;
                            }
                        }
                        containerChain.push(contour);
                    }
                    if (contained) {
                        contourPool.erase(containingContour);
                        contour = containingContour;
                    }
                    else {
                        if (containerChain.length > 1) {
                            containerChains.push(containerChain);
                        }
                        if (contourPool.length > 0) {
                            containerChain = [];
                            contour = contourPool.pop();
                        }
                        else {
                            break;
                        }
                    }
                }
                // check each container chain
                var contoursReversed = [];
                var contoursRemoved = [];
                for (i = 0, il = containerChains.length; i < il; i++) {
                    containerChain = containerChains[ i ];
                    var outerBoundary = containerChain[ containerChain.length - 1 ];
                    var innerBoundary = containerChain[ containerChain.length - 2 ];
                    // reverse vertices of every other contour to avoid creating ccw contours
                    // this happens because converting tiles to vertices cannot control the direction of the segments
                    // even length chain, start with first
                    if (containerChain.length % 2 === 0) {
                        j = 0;
                    }
                    // odd length chain, start with second
                    else {
                        j = 1;
                    }
                    for (jl = containerChain.length; j < jl; j += 2) {
                        contour = containerChain[ j ];
                        if (this._indexOfValue(contoursReversed, contour) === -1) {
                            contour.vertices.reverse();
                            contoursReversed.push(contour);
                        }
                    }
                    // discard outer boundary contour
                    // generally, we know that the tiles have edges on both sides
                    // so there should always be a container at the end of the chain that wraps the outside
                    // we don't need these edges/vertices as it is unlikely the player will ever walk outside the map
                    if (!options.retainBoundaryOuter && this._indexOfValue(contoursRemoved, outerBoundary) === -1) {
                        contoursRemoved.push(outerBoundary);
                        this._arrayCautiousRemove(contours, outerBoundary);
                    }
                    // discard inner boundary contour
                    if (options.discardBoundaryInner && this._indexOfValue(contoursRemoved, innerBoundary) === -1) {
                        contoursRemoved.push(innerBoundary);
                        this._arrayCautiousRemove(contours, innerBoundary);
                    }
                    // discard anything beyond inner boundary contour
                    if (options.discardEdgesInner && containerChain.length > 2) {
                        var otherContours = containerChain.slice(2);
                        contoursRemoved = contoursRemoved.concat(otherContours);
                        this._arrayCautiousRemoveMulti(contours, otherContours);
                    }
                }
                // finalize contours
                for (i = 0, il = contours.length; i < il; i++) {
                    contour = contours[ i ];
                    contourVertices = contour.vertices;
                    // optimization (default): find and remove all intermediary collinear vertices
                    if (!options.discardCollinear) {
                        sva = contourVertices[ 0 ];
                        for (j = contourVertices.length - 1; j > 0; j--) {
                            va = contourVertices[ j ];
                            vb = contourVertices[ j - 1 ];
                            if (this._pointsCW(sva, va, vb) === 0) {
                                contourVertices.splice(j, 1);
                            }
                            else {
                                sva = va;
                            }
                            va = vb;
                        }
                        // do one extra collinear check with first vertex as target for removal
                        if (this._pointsCW(contourVertices[ j + 1 ], contourVertices[ j ], contourVertices[ contourVertices.length - 1 ]) === 0) {
                            contourVertices.splice(0, 1);
                        }
                    }
                    // if vertices should be in reverse order
                    if (options.reverse) {
                        contourVertices.reverse();
                    }
                    // make vertices relative
                    var minX = contour.minX;
                    var minY = contour.minY;
                    var width = contour.width;
                    var height = contour.height;
                    for (j = 0, jl = contourVertices.length; j < jl; j++) {
                        va = contourVertices[ j ];
                        va.x -= minX + width * 0.5;
                        va.y -= minY + height * 0.5;
                    }
                }
            }
            return contours;
        },

        _AABBContains: function (aminX, aminY, amaxX, amaxY, bminX, bminY, bmaxX, bmaxY) {
            if (aminX >= bminX
                && amaxX <= bmaxX
                && aminY >= bminY
                && amaxY <= bmaxY) {
                return true;
            }
            return false;
        },

        _arrayCautiousRemove: function (target, element) {
            var index = this._indexOfValue(target, element);
            if (index !== -1) {
                target.splice(index, 1);
            }
            return target;
        }

    });

    // Using Box2D.SCALE == 0.1, the maximum speed any body may
    // move will be approximately (max * 300) pixels per second.
    var max = 10; // default 2
    Box2D.Common.b2Settings.b2_maxTranslation = max;
    Box2D.Common.b2Settings.b2_maxTranslationSquared = max * max;

});

