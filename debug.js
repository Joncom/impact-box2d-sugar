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
        alpha: 0.33,
        canvas: null,

        // These are set dynamically by Box2D.
        lineWidth: null,
        fillStyle: null,
        strokeSyle: null

        init: function(world, alpha) {
            this.world = world;
            this.canvas = ig.system.canvas;
            this.alpha = (typeof alpha !== 'undefined' ? alpha : this.alpha);
            this.drawer = new b2.DebugDraw();
            this.drawer.SetSprite(this);
            this.drawer.SetDrawScale(1 / b2.SCALE * ig.system.scale);
            this.drawer.SetAlpha(this.alpha);
            this.drawer.SetFillAlpha(this.alpha);
            this.drawer.SetFlags(b2.DebugDraw.e_shapeBit | b2.DebugDraw.e_jointBit);
            this.world.SetDebugDraw(this.drawer);
        },

        draw: function() {
            ig.system.context.save();
            ig.system.context.translate(
                -ig.game.screen.x * ig.system.scale,
                -ig.game.screen.y * ig.system.scale + ig.system.canvas.height
            );
            ig.system.context.scale( 1, -1 );
            this.world.DrawDebugData();
            ig.system.context.restore();
        },

        clearRect: function() {},

        beginPath: function() {
            ig.system.context.lineWidth = this.lineWidth;
            ig.system.context.fillStyle = this.fillStyle;
            ig.system.context.strokeStyle = this.strokeSyle;
            ig.system.context.beginPath();
        },

        closePath: function() {
            ig.system.context.closePath();
        },

        fill: function() {
            ig.system.context.fill();
        },

        stroke: function() {
            ig.system.context.stroke();
        },

        moveTo: function(x, y) {
            ig.system.context.beginPath();
            ig.system.context.moveTo(x, y);
        },

        lineTo: function(x, y) {
            ig.system.context.lineTo(x, y);
            ig.system.context.stroke();
        }

    });

});