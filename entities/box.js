ig.module('plugins.box2d.entities.box')
.requires('plugins.box2d.entity')
.defines(function(){

    // Box shape is the defined by default.
    ig.b2Box = ig.Entity.extend({});

});