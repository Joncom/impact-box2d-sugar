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
        defaultTileVerticesDef: {},

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
                shapes.edges = shapes.edges.concat(this._shapedTilesToShapes(solids, data, {
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
            if (points.length < 3) {
                return points;
            }
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
            var pointsByAngle = [
                { x: pointMin.x, y: pointMin.y, index: indexMin }
            ];
            var pointFromMin;
            for (i = 0, il = points.length; i < il; i++) {
                if (i === indexMin) {
                    continue;
                }
                point = points[ i ];
                pointFromMin = { x: point.x, y: point.y };
                pointFromMin.angle = Math.atan(( point.y - pointMin.y ) / ( point.x - pointMin.x));
                if (pointFromMin.angle < 0) {
                    pointFromMin.angle += Math.PI;
                }
                pointFromMin.distance = ( point.x - pointMin.x ) * ( point.x - pointMin.x ) + ( point.y - pointMin.y ) * ( point.y - pointMin.y );
                pointFromMin.index = i;
                pointsByAngle.push(pointFromMin);
            }
            pointsByAngle.sort(function (a, b) {
                if (a.angle < b.angle) {
                    return -1;
                }
                else if (a.angle > b.angle) {
                    return 1;
                }
                else {
                    if (a.distance < b.distance) {
                        return -1;
                    }
                    else if (a.distance > b.distance) {
                        return 1;
                    }
                }
                return 0;
            });
            // search for convex hull
            // loc is location, and at end of search the final index
            var pointTemp;
            var loc = 1;
            for (i = 2, il = points.length; i < il; i++) {
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
                        contours = contours.concat(ig.utilstile.verticesToContours(vertices, options));
                    }
                }
                // general shapes that may or may not be concave
                else {
                    // keep non-duplicate edge vertices
                    for (i = 0, il = tiles.length; i < il; i++) {
                        vertices = vertices.concat(this._getNonDuplicateSegmentVertices(tiles[ i ], data, tiles));
                    }
                    // vertices to contours
                    contours = ig.utilstile.verticesToContours(vertices, options);
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
                            overlap = ig.utilstile.getSegmentOverlapWithTile(va, vb, normal, touchingTile);
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
        }

    });

    // Using Box2D.SCALE == 0.1, the maximum speed any body may
    // move will be approximately (max * 300) pixels per second.
    var max = 10; // default 2
    Box2D.Common.b2Settings.b2_maxTranslation = max;
    Box2D.Common.b2Settings.b2_maxTranslationSquared = max * max;

});

