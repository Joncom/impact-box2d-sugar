Impact Box2D Sugar
==========

##### This plugin aims to make Box2D development with ImpactJS as easy as possible. #####

### Installation ###

Copy the contents of this repo into `lib/plugins/joncom/box2d/`.

###### Example Game ######
```
ig.module('game.main')
.requires(
    'plugins.joncom.box2d.game',
    'plugins.joncom.box2d.debug' // Optional, draws body shapes.
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
.requires('plugins.joncom.box2d.entity')
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

###### .mass ######
Mass of entity in kilograms. Calculated automatically during `init` if `null`. Default is `null`.

###### .density ######
Used to calculate mass during `init` if mass is not `null`. Mass is recalculated if this value changes. Default is `1`.

###### .maySleep ######
Allow or disallow the entity to sleep when inactive. When sleeping Box2D does not calculate physics for this entity, thus saving CPU. Default is `false`.


### Restored Entity Properties ###

######[.pos](http://impactjs.com/documentation/class-reference/entity#pos-x-pos-y)######
```
// Shift the entity to the right 100 pixels.
entity.pos.x += 100;
```

######[.vel](http://impactjs.com/documentation/class-reference/entity#pos-x-pos-y)######
```
// Make the entity jump upward.
entity.vel.x -= 300;
```

######[.standing](http://impactjs.com/documentation/class-reference/entity#standing)######
```
if(entity.standing) {
	entity.jump();
}
```

######[.touches](http://impactjs.com/documentation/class-reference/entity#touches)######
```
if(enemy.touches(player)) {
    player.kill();
}
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
/* your-entity.js */
update: function () {
    if(this.last.x !== this.pos.x) {
        console.log("Entity moved horizontally.");
    }

    // Make sure you get your this.last reading
    // before calling this.parent()...
    this.parent();
}
```

######[.friction](http://impactjs.com/documentation/class-reference/entity#friction-x-friction-y)######
```
// Box2D does not distinguish between X and Y
// frictions. Therefore set friction like this:
entity.friction.x = 3;
// or like this:
entity.friction.y = 3;
// They both do the exact same thing.
```

######[.maxVel](http://impactjs.com/documentation/class-reference/entity#maxvel-x-maxvel-y)######
```
// Cap the vertical speed of an entity.
entity.maxVel.y = 300;
```

######[.bounciness](http://impactjs.com/documentation/class-reference/entity#bounciness)######
```
EntityExample = ig.Entity.extend({
    bounciness: 1 // Full bounce.
}
// You can change the value at any time.
entity.bounciness = 0.5;
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

### FAQ ###

**Q:** What version of Box2D is this?
**A:** Box2D 2.1a via Box2DWeb.

**Q:** Are Weltmeister slope tiles supported?
**A:** Yes. (Thanks [Collin Hover](https://github.com/collinhover))

**Q:** Where is some good documentation on this version of Box2D?
**A:** [Here.](http://www.box2dflash.org/docs/2.1a/reference/)

