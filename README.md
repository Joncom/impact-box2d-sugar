This v2.1a Box2D plugin is an adaptation of the plugin found [here](https://github.com/clok/PiSpace/tree/3f2900026b58d5fb97a8ea5621dfabd573af96d1/lib/plugins/box2d).

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
- [handleMovementTrace](http://impactjs.com/documentation/class-reference/entity#handlemovementtrace)

TODO: Document new added properties such as `Entity.isBullet` and `.isFixedRotation`.

### FAQ ###

###### Q: How come my game freezes? ######
A: Box2D will not usually throw an errors if you pass it illegal data. Make sure you provide `b2.Vec2`'s where required.

###### Q: Where can I find information on function/class "blank"? ######
A: http://www.box2dflash.org/docs/2.1a/reference/