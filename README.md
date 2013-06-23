Impact Box2D Sugar
==========

#### Box2D Physics Plugin for the Impact Game Engine ####

The goal of this plugin is to make developing Box2D games in Impact as easy as possible.
It is based off the official Impact Box2D plugin using Box2D 2.1a.

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

**Q:** Where can I find information on function/class "blank"?
**A:** http://www.box2dflash.org/docs/2.1a/reference/

**Q:** How come my game freezes?
**A:** This usually means a number has become `NaN`, possibly caused by forgeting to use `b2Vec2`.