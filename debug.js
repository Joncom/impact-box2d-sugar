ig.module(
    'plugins.box2d.debug'
)
.requires(
    'plugins.box2d.lib'
)
.defines(function(){

    ig.Box2DDebug = ig.Class.extend({

        drawer: null,
        world: null,
        alpha: 0.5,
        drawScale: null,
        canvas: null,

        init: function(world, alpha) {
            this.canvas = ig.system.canvas;
            this.alpha = (typeof alpha !== 'undefined' ? alpha : this.alpha);
            this.drawScale = 1 / b2.SCALE * ig.system.scale;
            this.drawer = new b2.DebugDraw();
            this.drawer.SetFlags(b2.DebugDraw.e_shapeBit | b2.DebugDraw.e_jointBit);
            this.drawer.SetSprite(this);
            this.world = world;
            this.world.SetDebugDraw(this.drawer);
        },

        draw: function() {
            ig.system.context.save();
            ig.system.context.translate(-ig.game.screen.x * ig.system.scale, -ig.game.screen.y * ig.system.scale);
            this.world.DrawDebugData();
            ig.system.context.restore();
        },

        clearRect: function() {},
        beginPath: function() {},
        closePath: function() {},
        fill: function() {},
        stroke: function() {},

        moveTo: function(x, y) {
            ig.system.context.beginPath();
            ig.system.context.moveTo(x, y);
        },

        lineTo: function(x, y) {
            ig.system.context.lineTo(x, y);
            ig.system.context.stroke();
        }

        /*
        clear: function() {},

        lineStyle: function(thickness, color, alpha) {
            ig.system.context.strokeStyle = 'rgb(' + color._r + ',' + color._g + ',' + color._b + ')';
            ig.system.context.lineWidth = thickness;
        },

        beginFill: function(color, alpha) {
            this.alpha = alpha;
            ig.system.context.fillStyle = 'rgb(' + color._r + ',' + color._g + ',' + color._b + ')';
            ig.system.context.beginPath();
        },

        endFill: function() {
            ig.system.context.globalAlpha = this.alpha;
            ig.system.context.fill();
            ig.system.context.globalAlpha = 1;
        },

        drawCircle: function(x, y, r) {
            ig.system.context.beginPath();
            ig.system.context.arc(x, y, r, 0, Math.PI * 2, true);
            ig.system.context.stroke();
        }
        */

    });

});