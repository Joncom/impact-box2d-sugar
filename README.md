Impact Box2D Sugar
==========

##### The goal of this plugin is to make developing Box2D games with Impact as simple as possible.#####

#### What's New? ####

The following `Entity` functionally now behaves how you would expect:
- [standing](http://impactjs.com/documentation/class-reference/entity#standing)
- [touches](http://impactjs.com/documentation/class-reference/entity#touches)
- [gravityFactor](http://impactjs.com/documentation/class-reference/entity#gravityfactor)
- [last](http://impactjs.com/documentation/class-reference/entity#last-x-last-y)
- [maxVel](http://impactjs.com/documentation/class-reference/entity#maxvel-x-maxvel-y)
- [bounciness](http://impactjs.com/documentation/class-reference/entity#bounciness)
- [type](http://impactjs.com/documentation/class-reference/entity#type)
- [checkAgainst](http://impactjs.com/documentation/class-reference/entity#checkagainst)
- [check](http://impactjs.com/documentation/class-reference/entity#check)
- [collideWith](http://impactjs.com/documentation/class-reference/entity#collidewith)

TODO: Document new added properties such as `Entity.isBullet` and `.isFixedRotation`.

### FAQ ###

**Q:** What version of Box2D is this?
**A:** Box2D 2.1a via Box2DWeb.

**Q:** Where is some good documentation on this version of Box2D?
**A:** http://www.box2dflash.org/docs/2.1a/reference/

**Q:** My game freezes. What do?
**A:** This usually means a number `NaN` because you passed the wrong argument.

### Usage ###

In `main.js` require `plugins.box2d.game` and create your game as usual.

```
MyGame = ig.Game.extend({
    // your game content here
});
```

