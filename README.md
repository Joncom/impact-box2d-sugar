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
    `plugins.box2d.debug` // Optional, draws shapes over game.
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

### Restored Entity Functionality ###

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
if(this.pos.x > this.last.x) {
    console.log('Entity has moved rightward.');
}
if(this.pos.y < this.last.y) {
    console.log('Entity has moved upward.');
}
```
######[.maxVel](http://impactjs.com/documentation/class-reference/entity#maxvel-x-maxvel-y)######
######[.bounciness](http://impactjs.com/documentation/class-reference/entity#bounciness)######
######[.type](http://impactjs.com/documentation/class-reference/entity#type)######
######[.checkAgainst](http://impactjs.com/documentation/class-reference/entity#checkagainst)######
######[.check](http://impactjs.com/documentation/class-reference/entity#check)######
######[.collideWith](http://impactjs.com/documentation/class-reference/entity#collidewith)######

TODO: Document new added properties such as `Entity.isBullet` and `.isFixedRotation`.

### FAQ ###

**Q:** What version of Box2D is this?
**A:** Box2D 2.1a via Box2DWeb.

**Q:** Where is some good documentation on this version of Box2D?
**A:** [Here.](http://www.box2dflash.org/docs/2.1a/reference/)

**Q:** Why does my game freeze?
**A:** Did you pass a number where a `b2Vec2` was expected?
