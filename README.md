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
    `plugins.box2d.debug` // Optional, draws body shapes.
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

### Restored Entity Properties ###

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

TODO: Document new added properties such as `Entity.isBullet` and `.isFixedRotation`.

### FAQ ###

**Q:** What version of Box2D is this?
**A:** Box2D 2.1a via Box2DWeb.

**Q:** Where is some good documentation on this version of Box2D?
**A:** [Here.](http://www.box2dflash.org/docs/2.1a/reference/)

**Q:** Why does my game freeze?
**A:** Did you pass a number where a `b2Vec2` was expected?
