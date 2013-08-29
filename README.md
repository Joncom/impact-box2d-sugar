Impact Box2D Sugar
==========

##### This plugin aims to make Box2D development with ImpactJS as easy as possible. #####

### Installation ###

Step 1: Copy the contents of this repo into `lib/plugins/box2d/`.

###### Example Game ######
```
ig.module('game.main')
.requires(
    'plugins.box2d.game',
    'plugins.box2d.debug' // Optional, draws body shapes.
)
.defines(function(){
    MyGame = ig.Game.extend({
        /* your game code here */
    });
    ig.main( '#canvas', MyGame, 60, 320, 240, 2 );
});
```

###### Example Entity ######
```
ig.module('game.entities.player')
.requires('plugins.box2d.entity')
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        /* your entity code here */
    });
});
```

### New Entity Properties ###

###### .isBullet ######
Setting `true` enables continuous collision. This prevents fast moving entities from "tunneling" through walls and other entities, but requires more CPU. Default is `false`.

###### .isFixedRotation ######
Setting `true` prevents body from rotating. Default is `false`.

###### .isSensor ######
Setting `true` prevents the entity from physically interacting with other entities or the world. [`.touches`](https://github.com/Joncom/impact-box2d-sugar#touches) still works. [`.check`](https://github.com/Joncom/impact-box2d-sugar#type-checkagainst-check-and-collidewith) and [`.collideWith`](https://github.com/Joncom/impact-box2d-sugar#type-checkagainst-check-and-collidewith) still fire. Default is `false`.

### Restored Entity Properties ###

######[.pos](http://impactjs.com/documentation/class-reference/entity#pos-x-pos-y).x/y######
Read and write the position like you would a non-Box2D game. All changes are passed automatically to the Box2D world.
```
// Move an entity 100px to the right.
entity.pos.x += 100;
// Get the y position of an entity in pixels.
console.log(entity.pos.y);
```

######[.standing](http://impactjs.com/documentation/class-reference/entity#standing)######
```
var player = ig.game.getEntitiesByType(EntityPlayer)[0];
if(player.standing) {
	console.log("Player is standing!");
}
```

######[.touches](http://impactjs.com/documentation/class-reference/entity#touches)######
```
var player = ig.game.getEntitiesByType(EntityPlayer)[0];
var enemies = ig.game.getEntitiesByType(EntityEnemy);
var count = 0;
for(var i=0; i<enemies.length; i++) {
	if(player.touches(enemies[i])) {
		count++;
	}
}
console.log("Player is touching " + count + " enemies.");
```

######[.gravityFactor](http://impactjs.com/documentation/class-reference/entity#gravityfactor)######
```
EntityPlayer = ig.Entity.extend({
    // Increases the effect gravity has on the individual entity.
    gravityFactor: 3,
});
```

######[.last](http://impactjs.com/documentation/class-reference/entity#last-x-last-y)######
```
if(entity.pos.x > entity.last.x) {
    console.log('Entity has moved rightward.');
}
if(entity.pos.y < entity.last.y) {
    console.log('Entity has moved upward.');
}
```

######[.maxVel](http://impactjs.com/documentation/class-reference/entity#maxvel-x-maxvel-y)######
```
// Cap the fall speed of an entity.
entity.maxVel.y = 300;
```

######[.bounciness](http://impactjs.com/documentation/class-reference/entity#bounciness)######
You must define `bounciness` before `init` is called. If you need to change bounciness after the entity has been spawned, you must change `restitution` for each fixture in `entity.body`.
```
EntityPlayer = ig.Entity.extend({
    bounciness: 1,
    init: function(x, y, settings) {
        // Bounciness is automatically applied.
        this.parent(x, y, settings);
    }
}
```

######[.type](http://impactjs.com/documentation/class-reference/entity#type), [.checkAgainst](http://impactjs.com/documentation/class-reference/entity#checkagainst), [.check](http://impactjs.com/documentation/class-reference/entity#check), and [.collideWith](http://impactjs.com/documentation/class-reference/entity#collidewith)######
```
EntityPlayer = ig.Entity.extend({
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    check: function(entity) {
        console.log('Player is touching ' + entity.name);
    },
    collideWidth: function(entity, axis) {
        console.log('Player just collided with ' +
            entity.name + ' on the ' + axis + ' axis.');
    }
});
```

TODO: Inform the user when no b2World was created do to no collision map, or fail gracefully.

### FAQ ###

**Q:** What version of Box2D is this?
**A:** Box2D 2.1a via Box2DWeb.

**Q:** Are Weltmeister slope tiles supported?
**A:** Yes. (Thanks [Collin Hover](https://github.com/collinhover))

**Q:** Where is some good documentation on this version of Box2D?
**A:** [Here.](http://www.box2dflash.org/docs/2.1a/reference/)

**Q:** Why does my game freeze?
**A:** Did you pass a number where a `b2Vec2` was expected?
