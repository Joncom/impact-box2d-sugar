/*
 * Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented;
 you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 *
 * Ported to to javascript by Jonas Wagner, 2010
 *
 * Some modifications for Impact by Dominic Szablewski, 2011
 *
 */

// based on https://github.com/HBehrens/box2d.js

ig.module('plugins.box2d.lib').defines(function(){


    b2 = {
    SCALE: 0.1
    };


    function extend(a,b){
    for(var c in b)a[c]=b[c]}function isInstanceOf(a,b){
        for(;
        typeof a==="object";
           ){
        if(a.constructor===b)return!0;
        a=a._super}return!1}b2.BoundValues=function(){
            this.__varz();
            this.__constructor.apply(this,arguments)
        };
    b2.BoundValues.prototype.__constructor=function(){
    this.lowerValues=[];
    this.lowerValues[0]=0;
    this.lowerValues[1]=0;
    this.upperValues=[];
    this.upperValues[0]=0;
    this.upperValues[1]=0
    };
    b2.BoundValues.prototype.__varz=function(){

    };
    b2.BoundValues.prototype.lowerValues=null;

    b2.BoundValues.prototype.upperValues=null;
    b2.PairManager=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.PairManager.prototype.__constructor=function(){
    this.m_pairs=[];
    this.m_pairBuffer=[];
    this.m_pairBufferCount=this.m_pairCount=0;
    this.m_freePair=null
    };
    b2.PairManager.prototype.__varz=function(){

    };

    b2.PairManager.prototype.AddPair=function(a,b){
    var c=a.pairs[b];
    if(c!=null)return c;
    if(this.m_freePair==null)this.m_freePair=new b2.Pair,this.m_pairs.push(this.m_freePair);
    c=this.m_freePair;
    this.m_freePair=c.next;
    c.proxy1=a;
    c.proxy2=b;
    c.status=0;
    c.userData=null;
    c.next=null;
    a.pairs[b]=c;
    b.pairs[a]=c;
    ++this.m_pairCount;
    return c
    };

    b2.PairManager.prototype.RemovePair=function(a,b){
    var c=a.pairs[b];
    if(c==null)return null;
    var d=c.userData;
    delete a.pairs[b];
    delete b.pairs[a];
    c.next=this.m_freePair;
    c.proxy1=null;
    c.proxy2=null;
    c.userData=null;
    c.status=0;
    this.m_freePair=c;
    --this.m_pairCount;
    return d
    };
    b2.PairManager.prototype.Find=function(a,b){
    return a.pairs[b]
    };
    b2.PairManager.prototype.ValidateBuffer=function(){

    };
    b2.PairManager.prototype.ValidateTable=function(){

    };

    b2.PairManager.prototype.Initialize=function(a){
    this.m_broadPhase=a
    };
    b2.PairManager.prototype.AddBufferedPair=function(a,b){
    var c=this.AddPair(a,b);
    c.IsBuffered()==!1&&(c.SetBuffered(),this.m_pairBuffer[this.m_pairBufferCount]=c,++this.m_pairBufferCount);
    c.ClearRemoved();
    b2.BroadPhase.s_validate&&this.ValidateBuffer()
    };

    b2.PairManager.prototype.RemoveBufferedPair=function(a,b){
    var c=this.Find(a,b);
    c!=null&&(c.IsBuffered()==!1&&(c.SetBuffered(),this.m_pairBuffer[this.m_pairBufferCount]=c,++this.m_pairBufferCount),c.SetRemoved(),b2.BroadPhase.s_validate&&this.ValidateBuffer())
    };

    b2.PairManager.prototype.Commit=function(a){
    for(var b=0,b=0;
        b<this.m_pairBufferCount;
        ++b){
        var c=this.m_pairBuffer[b];
        c.ClearBuffered();
        var d=c.proxy1,e=c.proxy2;
        c.IsRemoved()||c.IsFinal()==!1&&a(d.userData,e.userData)}this.m_pairBufferCount=0;
    b2.BroadPhase.s_validate&&this.ValidateTable()
    };
    b2.PairManager.prototype.m_broadPhase=null;
    b2.PairManager.prototype.m_pairs=null;
    b2.PairManager.prototype.m_freePair=null;
    b2.PairManager.prototype.m_pairCount=0;
    b2.PairManager.prototype.m_pairBuffer=null;

    b2.PairManager.prototype.m_pairBufferCount=0;
    b2.TimeStep=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TimeStep.prototype.__constructor=function(){

    };
    b2.TimeStep.prototype.__varz=function(){

    };
    b2.TimeStep.prototype.Set=function(a){
    this.dt=a.dt;
    this.inv_dt=a.inv_dt;
    this.positionIterations=a.positionIterations;
    this.velocityIterations=a.velocityIterations;
    this.warmStarting=a.warmStarting
    };
    b2.TimeStep.prototype.dt=null;
    b2.TimeStep.prototype.inv_dt=null;

    b2.TimeStep.prototype.dtRatio=null;
    b2.TimeStep.prototype.velocityIterations=0;
    b2.TimeStep.prototype.positionIterations=0;
    b2.TimeStep.prototype.warmStarting=null;
    b2.Controller=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Controller.prototype.__constructor=function(){

    };
    b2.Controller.prototype.__varz=function(){

    };
    b2.Controller.prototype.Step=function(){

    };
    b2.Controller.prototype.Draw=function(){

    };

    b2.Controller.prototype.AddBody=function(a){
    var b=new b2.ControllerEdge;
    b.controller=this;
    b.body=a;
    b.nextBody=m_bodyList;
    b.prevBody=null;
    m_bodyList=b;
    if(b.nextBody)b.nextBody.prevBody=b;
    m_bodyCount++;
    b.nextController=a.m_controllerList;
    b.prevController=null;
    a.m_controllerList=b;
    if(b.nextController)b.nextController.prevController=b;
    a.m_controllerCount++
    };

    b2.Controller.prototype.RemoveBody=function(a){
    for(var b=a.m_controllerList;
        b&&b.controller!=this;
       )b=b.nextController;
    if(b.prevBody)b.prevBody.nextBody=b.nextBody;
    if(b.nextBody)b.nextBody.prevBody=b.prevBody;
    if(b.nextController)b.nextController.prevController=b.prevController;
    if(b.prevController)b.prevController.nextController=b.nextController;
    if(m_bodyList==b)m_bodyList=b.nextBody;
    if(a.m_controllerList==b)a.m_controllerList=b.nextController;
    a.m_controllerCount--;
    m_bodyCount--
    };

    b2.Controller.prototype.Clear=function(){
    for(;
        m_bodyList;
       )this.RemoveBody(m_bodyList.body)
    };
    b2.Controller.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Controller.prototype.GetWorld=function(){
    return this.m_world
    };
    b2.Controller.prototype.GetBodyList=function(){
    return m_bodyList
    };
    b2.Controller.prototype.m_next=null;
    b2.Controller.prototype.m_prev=null;
    b2.Controller.prototype.m_world=null;

    b2.GravityController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GravityController.prototype,b2.Controller.prototype);
    b2.GravityController.prototype._super=b2.Controller.prototype;
    b2.GravityController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.GravityController.prototype.__varz=function(){

    };

    b2.GravityController.prototype.Step=function(){
    var a=null,b=null,c=null,d=0,e=null,h=null,g=null,f=0,i=0,j=0,f=null;
    if(this.invSqr)for(a=m_bodyList;
               a;
               a=a.nextBody){
        b=a.body;
        c=b.GetWorldCenter();
        d=b.GetMass();
        for(e=m_bodyList;
        e!=a;
        e=e.nextBody)h=e.body,g=h.GetWorldCenter(),f=g.x-c.x,i=g.y-c.y,j=f*f+i*i,j<Number.MIN_VALUE||(f=new b2.Vec2(f,i),f.Multiply(this.G/j/Math.sqrt(j)*d*h.GetMass()),b.IsAwake()&&b.ApplyForce(f,c),f.Multiply(-1),h.IsAwake()&&h.ApplyForce(f,g))}else for(a=m_bodyList;
                                                                                                                                    a;
                                                                                                                                    a=a.nextBody){
            b=
            a.body;
            c=b.GetWorldCenter();
            d=b.GetMass();
            for(e=m_bodyList;
            e!=a;
            e=e.nextBody)h=e.body,g=h.GetWorldCenter(),f=g.x-c.x,i=g.y-c.y,j=f*f+i*i,j<Number.MIN_VALUE||(f=new b2.Vec2(f,i),f.Multiply(this.G/j*d*h.GetMass()),b.IsAwake()&&b.ApplyForce(f,c),f.Multiply(-1),h.IsAwake()&&h.ApplyForce(f,g))}
    };
    b2.GravityController.prototype.G=1;
    b2.GravityController.prototype.invSqr=!0;
    b2.DestructionListener=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.DestructionListener.prototype.__constructor=function(){

    };
    b2.DestructionListener.prototype.__varz=function(){

    };
    b2.DestructionListener.prototype.SayGoodbyeJoint=function(){

    };
    b2.DestructionListener.prototype.SayGoodbyeFixture=function(){

    };
    b2.ContactEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactEdge.prototype.__constructor=function(){

    };
    b2.ContactEdge.prototype.__varz=function(){

    };
    b2.ContactEdge.prototype.other=null;
    b2.ContactEdge.prototype.contact=null;

    b2.ContactEdge.prototype.prev=null;
    b2.ContactEdge.prototype.next=null;
    b2.EdgeChainDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.EdgeChainDef.prototype.__constructor=function(){
    this.vertexCount=0;
    this.isALoop=!0;
    this.vertices=[]
    };
    b2.EdgeChainDef.prototype.__varz=function(){

    };
    b2.EdgeChainDef.prototype.vertices=null;
    b2.EdgeChainDef.prototype.vertexCount=null;
    b2.EdgeChainDef.prototype.isALoop=null;
    b2.Vec2=function(a,b){
    if(arguments.length==2)this.x=a,this.y=b
    };

    b2.Vec2.Make=function(a,b){
    return new b2.Vec2(a,b)
    };
    b2.Vec2.prototype.SetZero=function(){
    this.y=this.x=0
    };
    b2.Vec2.prototype.Set=function(a,b){
    this.x=a;
    this.y=b
    };
    b2.Vec2.prototype.SetV=function(a){
    this.x=a.x;
    this.y=a.y
    };
    b2.Vec2.prototype.GetNegative=function(){
    return new b2.Vec2(-this.x,-this.y)
    };
    b2.Vec2.prototype.NegativeSelf=function(){
    this.x=-this.x;
    this.y=-this.y
    };
    b2.Vec2.prototype.Copy=function(){
    return new b2.Vec2(this.x,this.y)
    };
    b2.Vec2.prototype.Add=function(a){
    this.x+=a.x;
    this.y+=a.y
    };

    b2.Vec2.prototype.Subtract=function(a){
    this.x-=a.x;
    this.y-=a.y
    };
    b2.Vec2.prototype.Multiply=function(a){
    this.x*=a;
    this.y*=a
    };
    b2.Vec2.prototype.MulM=function(a){
    var b=this.x;
    this.x=a.col1.x*b+a.col2.x*this.y;
    this.y=a.col1.y*b+a.col2.y*this.y
    };
    b2.Vec2.prototype.MulTM=function(a){
    var b=b2.Math.Dot(this,a.col1);
    this.y=b2.Math.Dot(this,a.col2);
    this.x=b
    };
    b2.Vec2.prototype.CrossVF=function(a){
    var b=this.x;
    this.x=a*this.y;
    this.y=-a*b
    };

    b2.Vec2.prototype.CrossFV=function(a){
    var b=this.x;
    this.x=-a*this.y;
    this.y=a*b
    };
    b2.Vec2.prototype.MinV=function(a){
    this.x=this.x<a.x?this.x:a.x;
    this.y=this.y<a.y?this.y:a.y
    };
    b2.Vec2.prototype.MaxV=function(a){
    this.x=this.x>a.x?this.x:a.x;
    this.y=this.y>a.y?this.y:a.y
    };
    b2.Vec2.prototype.Abs=function(){
    if(this.x<0)this.x=-this.x;
    if(this.y<0)this.y=-this.y
    };
    b2.Vec2.prototype.Length=function(){
    return Math.sqrt(this.x*this.x+this.y*this.y)
    };

    b2.Vec2.prototype.LengthSquared=function(){
    return this.x*this.x+this.y*this.y
    };
    b2.Vec2.prototype.Normalize=function(){
    var a=Math.sqrt(this.x*this.x+this.y*this.y);
    if(a<Number.MIN_VALUE)return 0;
    var b=1/a;
    this.x*=b;
    this.y*=b;
    return a
    };
    b2.Vec2.prototype.IsValid=function(){
    return b2.Math.IsValid(this.x)&&b2.Math.IsValid(this.y)
    };
    b2.Vec2.prototype.x=0;
    b2.Vec2.prototype.y=0;
    b2.Vec3=function(a,b,c){
    if(arguments.length==3)this.x=a,this.y=b,this.z=c
    };

    b2.Vec3.prototype.SetZero=function(){
    this.x=this.y=this.z=0
    };
    b2.Vec3.prototype.Set=function(a,b,c){
    this.x=a;
    this.y=b;
    this.z=c
    };
    b2.Vec3.prototype.SetV=function(a){
    this.x=a.x;
    this.y=a.y;
    this.z=a.z
    };
    b2.Vec3.prototype.GetNegative=function(){
    return new b2.Vec3(-this.x,-this.y,-this.z)
    };
    b2.Vec3.prototype.NegativeSelf=function(){
    this.x=-this.x;
    this.y=-this.y;
    this.z=-this.z
    };
    b2.Vec3.prototype.Copy=function(){
    return new b2.Vec3(this.x,this.y,this.z)
    };

    b2.Vec3.prototype.Add=function(a){
    this.x+=a.x;
    this.y+=a.y;
    this.z+=a.z
    };
    b2.Vec3.prototype.Subtract=function(a){
    this.x-=a.x;
    this.y-=a.y;
    this.z-=a.z
    };
    b2.Vec3.prototype.Multiply=function(a){
    this.x*=a;
    this.y*=a;
    this.z*=a
    };
    b2.Vec3.prototype.x=0;
    b2.Vec3.prototype.y=0;
    b2.Vec3.prototype.z=0;
    b2.DistanceProxy=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DistanceProxy.prototype.__constructor=function(){

    };
    b2.DistanceProxy.prototype.__varz=function(){

    };

    b2.DistanceProxy.prototype.Set=function(a){
    switch(a.GetType()){
    case b2.Shape.e_circleShape:this.m_vertices=Array(1);
        this.m_vertices[0]=a.m_p;
        this.m_count=1;
        this.m_radius=a.m_radius;
        break;
    case b2.Shape.e_polygonShape:this.m_vertices=a.m_vertices;
        this.m_count=a.m_vertexCount;
        this.m_radius=a.m_radius;
        break;
    default:b2.Settings.b2Assert(!1)}
    };

    b2.DistanceProxy.prototype.GetSupport=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_count;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return b
    };
    b2.DistanceProxy.prototype.GetSupportVertex=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_count;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return this.m_vertices[b]
    };

    b2.DistanceProxy.prototype.GetVertexCount=function(){
    return this.m_count
    };
    b2.DistanceProxy.prototype.GetVertex=function(a){
    b2.Settings.b2Assert(0<=a&&a<this.m_count);
    return this.m_vertices[a]
    };
    b2.DistanceProxy.prototype.m_vertices=null;
    b2.DistanceProxy.prototype.m_count=0;
    b2.DistanceProxy.prototype.m_radius=null;
    b2.ContactFactory=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactFactory.prototype.__constructor=function(){

    };
    b2.ContactFactory.prototype.__varz=function(){
    this.InitializeRegisters()
    };

    b2.ContactFactory.prototype.AddType=function(a,b,c,d){
    this.m_registers[c][d].createFcn=a;
    this.m_registers[c][d].destroyFcn=b;
    this.m_registers[c][d].primary=!0;
    if(c!=d)this.m_registers[d][c].createFcn=a,this.m_registers[d][c].destroyFcn=b,this.m_registers[d][c].primary=!1
    };

    b2.ContactFactory.prototype.InitializeRegisters=function(){
    this.m_registers=Array(b2.Shape.e_shapeTypeCount);
    for(var a=0;
        a<b2.Shape.e_shapeTypeCount;
        a++){
        this.m_registers[a]=Array(b2.Shape.e_shapeTypeCount);
        for(var b=0;
        b<b2.Shape.e_shapeTypeCount;
        b++)this.m_registers[a][b]=new b2.ContactRegister}this.AddType(b2.CircleContact.Create,b2.CircleContact.Destroy,b2.Shape.e_circleShape,b2.Shape.e_circleShape);
    this.AddType(b2.PolyAndCircleContact.Create,b2.PolyAndCircleContact.Destroy,b2.Shape.e_polygonShape,
             b2.Shape.e_circleShape);
    this.AddType(b2.PolygonContact.Create,b2.PolygonContact.Destroy,b2.Shape.e_polygonShape,b2.Shape.e_polygonShape);
    this.AddType(b2.EdgeAndCircleContact.Create,b2.EdgeAndCircleContact.Destroy,b2.Shape.e_edgeShape,b2.Shape.e_circleShape);
    this.AddType(b2.PolyAndEdgeContact.Create,b2.PolyAndEdgeContact.Destroy,b2.Shape.e_polygonShape,b2.Shape.e_edgeShape)
    };

    b2.ContactFactory.prototype.Create=function(a,b){
    var c=a.GetType(),d=b.GetType(),c=this.m_registers[c][d];
    if(c.pool)return d=c.pool,c.pool=d.m_next,c.poolCount--,d.Reset(a,b),d;
    d=c.createFcn;
    return d!=null?(c.primary?(d=d(this.m_allocator),d.Reset(a,b)):(d=d(this.m_allocator),d.Reset(b,a)),d):null
    };

    b2.ContactFactory.prototype.Destroy=function(a){
    a.m_manifold.m_pointCount>0&&(a.m_fixtureA.m_body.SetAwake(!0),a.m_fixtureB.m_body.SetAwake(!0));
    var b=a.m_fixtureA.GetType(),c=a.m_fixtureB.GetType(),b=this.m_registers[b][c];
    b.poolCount++;
    a.m_next=b.pool;
    b.pool=a;
    b=b.destroyFcn;
    b(a,this.m_allocator)
    };
    b2.ContactFactory.prototype.m_registers=null;
    b2.ContactFactory.prototype.m_allocator=null;

    b2.ConstantAccelController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.ConstantAccelController.prototype,b2.Controller.prototype);
    b2.ConstantAccelController.prototype._super=b2.Controller.prototype;
    b2.ConstantAccelController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.ConstantAccelController.prototype.__varz=function(){
    this.A=new b2.Vec2(0,0)
    };

    b2.ConstantAccelController.prototype.Step=function(a){
    for(var a=new b2.Vec2(this.A.x*a.dt,this.A.y*a.dt),b=m_bodyList;
        b;
        b=b.nextBody){
        var c=b.body;
        c.IsAwake()&&c.SetLinearVelocity(new b2.Vec2(c.GetLinearVelocity().x+a.x,c.GetLinearVelocity().y+a.y))}
    };
    b2.ConstantAccelController.prototype.A=new b2.Vec2(0,0);
    b2.SeparationFunction=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SeparationFunction.prototype.__constructor=function(){

    };

    b2.SeparationFunction.prototype.__varz=function(){
    this.m_localPoint=new b2.Vec2;
    this.m_axis=new b2.Vec2
    };
    b2.SeparationFunction.e_points=1;
    b2.SeparationFunction.e_faceA=2;
    b2.SeparationFunction.e_faceB=4;

    b2.SeparationFunction.prototype.Initialize=function(a,b,c,d,e){
    this.m_proxyA=b;
    this.m_proxyB=d;
    b=a.count;
    b2.Settings.b2Assert(0<b&&b<3);
    var h,g,f,i;
    if(b==1)this.m_type=b2.SeparationFunction.e_points,h=this.m_proxyA.GetVertex(a.indexA[0]),g=this.m_proxyB.GetVertex(a.indexB[0]),i=h,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=g,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),this.m_axis.x=g-h,this.m_axis.y=
        e-c,this.m_axis.Normalize();
    else{
        if(a.indexB[0]==a.indexB[1])this.m_type=b2.SeparationFunction.e_faceA,b=this.m_proxyA.GetVertex(a.indexA[0]),d=this.m_proxyA.GetVertex(a.indexA[1]),g=this.m_proxyB.GetVertex(a.indexB[0]),this.m_localPoint.x=0.5*(b.x+d.x),this.m_localPoint.y=0.5*(b.y+d.y),this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(d,b),1),this.m_axis.Normalize(),i=this.m_axis,f=c.R,b=f.col1.x*i.x+f.col2.x*i.y,d=f.col1.y*i.x+f.col2.y*i.y,i=this.m_localPoint,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*
                                                                                                                                                                                                                                        i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=g,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),a=(g-h)*b+(e-c)*d;
        else if(a.indexA[0]==a.indexA[0])this.m_type=b2.SeparationFunction.e_faceB,f=this.m_proxyB.GetVertex(a.indexB[0]),i=this.m_proxyB.GetVertex(a.indexB[1]),h=this.m_proxyA.GetVertex(a.indexA[0]),this.m_localPoint.x=0.5*(f.x+i.x),this.m_localPoint.y=0.5*(f.y+i.y),this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(i,f),1),this.m_axis.Normalize(),
        i=this.m_axis,f=e.R,b=f.col1.x*i.x+f.col2.x*i.y,d=f.col1.y*i.x+f.col2.y*i.y,i=this.m_localPoint,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=h,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),a=(h-g)*b+(c-e)*d;
        else{
        b=this.m_proxyA.GetVertex(a.indexA[0]);
        d=this.m_proxyA.GetVertex(a.indexA[1]);
        f=this.m_proxyB.GetVertex(a.indexB[0]);
        i=this.m_proxyB.GetVertex(a.indexB[1]);
        b2.Math.MulX(c,h);
        h=b2.Math.MulMV(c.R,
                b2.Math.SubtractVV(d,b));
        b2.Math.MulX(e,g);
        a=b2.Math.MulMV(e.R,b2.Math.SubtractVV(i,f));
        e=h.x*h.x+h.y*h.y;
        g=a.x*a.x+a.y*a.y;
        var j=b2.Math.SubtractVV(a,h),c=h.x*j.x+h.y*j.y,j=a.x*j.x+a.y*j.y;
        h=h.x*a.x+h.y*a.y;
        var k=e*g-h*h,a=0;
        k!=0&&(a=b2.Math.Clamp((h*j-c*g)/k,0,1));
        (h*a+j)/g<0&&(a=b2.Math.Clamp((h-c)/e,0,1));
        h=new b2.Vec2;
        h.x=b.x+a*(d.x-b.x);
        h.y=b.y+a*(d.y-b.y);
        g=new b2.Vec2;
        g.x=f.x+a*(i.x-f.x);
        g.y=f.y+a*(i.y-f.y);
        a==0||a==1?(this.m_type=b2.SeparationFunction.e_faceB,this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(i,
                                                             f),1),this.m_axis.Normalize(),this.m_localPoint=g):(this.m_type=b2.SeparationFunction.e_faceA,this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(d,b),1),this.m_localPoint=h)}a<0&&this.m_axis.NegativeSelf()}
    };

    b2.SeparationFunction.prototype.Evaluate=function(a,b){
    var c,d,e;
    switch(this.m_type){
    case b2.SeparationFunction.e_points:return c=b2.Math.MulTMV(a.R,this.m_axis),d=b2.Math.MulTMV(b.R,this.m_axis.GetNegative()),c=this.m_proxyA.GetSupportVertex(c),d=this.m_proxyB.GetSupportVertex(d),c=b2.Math.MulX(a,c),d=b2.Math.MulX(b,d),e=(d.x-c.x)*this.m_axis.x+(d.y-c.y)*this.m_axis.y;
    case b2.SeparationFunction.e_faceA:return e=b2.Math.MulMV(a.R,this.m_axis),c=b2.Math.MulX(a,this.m_localPoint),d=b2.Math.MulTMV(b.R,
                                                                    e.GetNegative()),d=this.m_proxyB.GetSupportVertex(d),d=b2.Math.MulX(b,d),e=(d.x-c.x)*e.x+(d.y-c.y)*e.y;
    case b2.SeparationFunction.e_faceB:return e=b2.Math.MulMV(b.R,this.m_axis),d=b2.Math.MulX(b,this.m_localPoint),c=b2.Math.MulTMV(a.R,e.GetNegative()),c=this.m_proxyA.GetSupportVertex(c),c=b2.Math.MulX(a,c),e=(c.x-d.x)*e.x+(c.y-d.y)*e.y;
    default:return b2.Settings.b2Assert(!1),0}
    };
    b2.SeparationFunction.prototype.m_proxyA=null;
    b2.SeparationFunction.prototype.m_proxyB=null;

    b2.SeparationFunction.prototype.m_type=0;
    b2.SeparationFunction.prototype.m_localPoint=new b2.Vec2;
    b2.SeparationFunction.prototype.m_axis=new b2.Vec2;
    b2.DynamicTreePair=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreePair.prototype.__constructor=function(){

    };
    b2.DynamicTreePair.prototype.__varz=function(){

    };
    b2.DynamicTreePair.prototype.proxyA=null;
    b2.DynamicTreePair.prototype.proxyB=null;

    b2.ContactConstraintPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactConstraintPoint.prototype.__constructor=function(){

    };
    b2.ContactConstraintPoint.prototype.__varz=function(){
    this.localPoint=new b2.Vec2;
    this.rA=new b2.Vec2;
    this.rB=new b2.Vec2
    };
    b2.ContactConstraintPoint.prototype.localPoint=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.rA=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.rB=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.normalImpulse=null;

    b2.ContactConstraintPoint.prototype.tangentImpulse=null;
    b2.ContactConstraintPoint.prototype.normalMass=null;
    b2.ContactConstraintPoint.prototype.tangentMass=null;
    b2.ContactConstraintPoint.prototype.equalizedMass=null;
    b2.ContactConstraintPoint.prototype.velocityBias=null;
    b2.ControllerEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ControllerEdge.prototype.__constructor=function(){

    };
    b2.ControllerEdge.prototype.__varz=function(){

    };
    b2.ControllerEdge.prototype.controller=null;

    b2.ControllerEdge.prototype.body=null;
    b2.ControllerEdge.prototype.prevBody=null;
    b2.ControllerEdge.prototype.nextBody=null;
    b2.ControllerEdge.prototype.prevController=null;
    b2.ControllerEdge.prototype.nextController=null;
    b2.DistanceInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DistanceInput.prototype.__constructor=function(){

    };
    b2.DistanceInput.prototype.__varz=function(){

    };
    b2.DistanceInput.prototype.proxyA=null;
    b2.DistanceInput.prototype.proxyB=null;

    b2.DistanceInput.prototype.transformA=null;
    b2.DistanceInput.prototype.transformB=null;
    b2.DistanceInput.prototype.useRadii=null;
    b2.Settings=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Settings.prototype.__constructor=function(){

    };
    b2.Settings.prototype.__varz=function(){

    };
    b2.Settings.b2MixFriction=function(a,b){
    return Math.sqrt(a*b)
    };
    b2.Settings.b2MixRestitution=function(a,b){
    return a>b?a:b
    };
    b2.Settings.b2Assert=function(a){
    if(!a)throw"Assertion Failed";

    };

    b2.Settings.VERSION="2.1alpha";
    b2.Settings.USHRT_MAX=65535;
    b2.Settings.b2_pi=Math.PI;
    b2.Settings.b2_maxManifoldPoints=2;
    b2.Settings.b2_aabbExtension=0.1;
    b2.Settings.b2_aabbMultiplier=2;
    b2.Settings.b2_polygonRadius=2*b2.Settings.b2_linearSlop;
    b2.Settings.b2_linearSlop=0.005;
    b2.Settings.b2_angularSlop=2/180*b2.Settings.b2_pi;
    b2.Settings.b2_toiSlop=8*b2.Settings.b2_linearSlop;
    b2.Settings.b2_maxTOIContactsPerIsland=32;
    b2.Settings.b2_maxTOIJointsPerIsland=32;
    b2.Settings.b2_velocityThreshold=1;

    b2.Settings.b2_maxLinearCorrection=0.2;
    b2.Settings.b2_maxAngularCorrection=8/180*b2.Settings.b2_pi;
    b2.Settings.b2_maxTranslation=2;
    b2.Settings.b2_maxTranslationSquared=b2.Settings.b2_maxTranslation*b2.Settings.b2_maxTranslation;
    b2.Settings.b2_maxRotation=0.5*b2.Settings.b2_pi;
    b2.Settings.b2_maxRotationSquared=b2.Settings.b2_maxRotation*b2.Settings.b2_maxRotation;
    b2.Settings.b2_contactBaumgarte=0.2;
    b2.Settings.b2_timeToSleep=0.5;
    b2.Settings.b2_linearSleepTolerance=0.01;

    b2.Settings.b2_angularSleepTolerance=2/180*b2.Settings.b2_pi;
    b2.Proxy=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Proxy.prototype.__constructor=function(){

    };
    b2.Proxy.prototype.__varz=function(){
    this.lowerBounds=Array(2);
    this.upperBounds=Array(2);
    this.pairs={
    }
    };
    b2.Proxy.prototype.IsValid=function(){
    return this.overlapCount!=b2.BroadPhase.b2_invalid
    };
    b2.Proxy.prototype.lowerBounds=Array(2);
    b2.Proxy.prototype.upperBounds=Array(2);
    b2.Proxy.prototype.overlapCount=0;

    b2.Proxy.prototype.timeStamp=0;
    b2.Proxy.prototype.pairs={

    };
    b2.Proxy.prototype.next=null;
    b2.Proxy.prototype.userData=null;
    b2.Point=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Point.prototype.__constructor=function(){

    };
    b2.Point.prototype.__varz=function(){
    this.p=new b2.Vec2
    };
    b2.Point.prototype.Support=function(){
    return this.p
    };
    b2.Point.prototype.GetFirstVertex=function(){
    return this.p
    };
    b2.Point.prototype.p=new b2.Vec2;

    b2.WorldManifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.WorldManifold.prototype.__constructor=function(){
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.Vec2
    };
    b2.WorldManifold.prototype.__varz=function(){
    this.m_normal=new b2.Vec2
    };

    b2.WorldManifold.prototype.Initialize=function(a,b,c,d,e){
    if(a.m_pointCount!=0){
        var h=0,g,f,i,j,k,l,n;
        switch(a.m_type){
        case b2.Manifold.e_circles:f=b.R;
        g=a.m_localPoint;
        h=b.position.x+f.col1.x*g.x+f.col2.x*g.y;
        b=b.position.y+f.col1.y*g.x+f.col2.y*g.y;
        f=d.R;
        g=a.m_points[0].m_localPoint;
        a=d.position.x+f.col1.x*g.x+f.col2.x*g.y;
        d=d.position.y+f.col1.y*g.x+f.col2.y*g.y;
        g=a-h;
        f=d-b;
        i=g*g+f*f;
        i>Number.MIN_VALUE*Number.MIN_VALUE?(i=Math.sqrt(i),this.m_normal.x=g/i,this.m_normal.y=f/i):(this.m_normal.x=1,
                                                          this.m_normal.y=0);
        g=b+c*this.m_normal.y;
        d-=e*this.m_normal.y;
        this.m_points[0].x=0.5*(h+c*this.m_normal.x+(a-e*this.m_normal.x));
        this.m_points[0].y=0.5*(g+d);
        break;
        case b2.Manifold.e_faceA:f=b.R;
        g=a.m_localPlaneNormal;
        i=f.col1.x*g.x+f.col2.x*g.y;
        j=f.col1.y*g.x+f.col2.y*g.y;
        f=b.R;
        g=a.m_localPoint;
        k=b.position.x+f.col1.x*g.x+f.col2.x*g.y;
        l=b.position.y+f.col1.y*g.x+f.col2.y*g.y;
        this.m_normal.x=i;
        this.m_normal.y=j;
        for(h=0;
            h<a.m_pointCount;
            h++)f=d.R,g=a.m_points[h].m_localPoint,n=d.position.x+f.col1.x*
            g.x+f.col2.x*g.y,g=d.position.y+f.col1.y*g.x+f.col2.y*g.y,this.m_points[h].x=n+0.5*(c-(n-k)*i-(g-l)*j-e)*i,this.m_points[h].y=g+0.5*(c-(n-k)*i-(g-l)*j-e)*j;
        break;
        case b2.Manifold.e_faceB:f=d.R;
        g=a.m_localPlaneNormal;
        i=f.col1.x*g.x+f.col2.x*g.y;
        j=f.col1.y*g.x+f.col2.y*g.y;
        f=d.R;
        g=a.m_localPoint;
        k=d.position.x+f.col1.x*g.x+f.col2.x*g.y;
        l=d.position.y+f.col1.y*g.x+f.col2.y*g.y;
        this.m_normal.x=-i;
        this.m_normal.y=-j;
        for(h=0;
            h<a.m_pointCount;
            h++)f=b.R,g=a.m_points[h].m_localPoint,n=b.position.x+f.col1.x*
            g.x+f.col2.x*g.y,g=b.position.y+f.col1.y*g.x+f.col2.y*g.y,this.m_points[h].x=n+0.5*(e-(n-k)*i-(g-l)*j-c)*i,this.m_points[h].y=g+0.5*(e-(n-k)*i-(g-l)*j-c)*j}}
    };
    b2.WorldManifold.prototype.m_normal=new b2.Vec2;
    b2.WorldManifold.prototype.m_points=null;
    b2.RayCastOutput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.RayCastOutput.prototype.__constructor=function(){

    };
    b2.RayCastOutput.prototype.__varz=function(){
    this.normal=new b2.Vec2
    };
    b2.RayCastOutput.prototype.normal=new b2.Vec2;

    b2.RayCastOutput.prototype.fraction=null;
    b2.ConstantForceController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.ConstantForceController.prototype,b2.Controller.prototype);
    b2.ConstantForceController.prototype._super=b2.Controller.prototype;
    b2.ConstantForceController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.ConstantForceController.prototype.__varz=function(){
    this.F=new b2.Vec2(0,0)
    };
    b2.ConstantForceController.prototype.Step=function(){
    for(var a=m_bodyList;
        a;
        a=a.nextBody){
        var b=a.body;
        b.IsAwake()&&b.ApplyForce(this.F,b.GetWorldCenter())}
    };
    b2.ConstantForceController.prototype.F=new b2.Vec2(0,0);
    b2.MassData=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.MassData.prototype.__constructor=function(){

    };
    b2.MassData.prototype.__varz=function(){
    this.center=new b2.Vec2(0,0)
    };

    b2.MassData.prototype.mass=0;
    b2.MassData.prototype.center=new b2.Vec2(0,0);
    b2.MassData.prototype.I=0;
    b2.DynamicTree=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTree.prototype.__constructor=function(){
    this.m_freeList=this.m_root=null;
    this.m_insertionCount=this.m_path=0
    };
    b2.DynamicTree.prototype.__varz=function(){

    };

    b2.DynamicTree.prototype.AllocateNode=function(){
    if(this.m_freeList){
        var a=this.m_freeList;
        this.m_freeList=a.parent;
        a.parent=null;
        a.child1=null;
        a.child2=null;
        return a}return new b2.DynamicTreeNode
    };
    b2.DynamicTree.prototype.FreeNode=function(a){
    a.parent=this.m_freeList;
    this.m_freeList=a
    };

    b2.DynamicTree.prototype.InsertLeaf=function(a){
    ++this.m_insertionCount;
    if(this.m_root==null)this.m_root=a,this.m_root.parent=null;
    else{
        var b=a.aabb.GetCenter(),c=this.m_root;
        if(c.IsLeaf()==!1){
        do var d=c.child1,c=c.child2,c=Math.abs((d.aabb.lowerBound.x+d.aabb.upperBound.x)/2-b.x)+Math.abs((d.aabb.lowerBound.y+d.aabb.upperBound.y)/2-b.y)<Math.abs((c.aabb.lowerBound.x+c.aabb.upperBound.x)/2-b.x)+Math.abs((c.aabb.lowerBound.y+c.aabb.upperBound.y)/2-b.y)?d:c;
        while(c.IsLeaf()==!1)}b=c.parent;
        d=this.AllocateNode();

        d.parent=b;
        d.userData=null;
        d.aabb.Combine(a.aabb,c.aabb);
        if(b){
        c.parent.child1==c?b.child1=d:b.child2=d;
        d.child1=c;
        d.child2=a;
        c.parent=d;
        a.parent=d;
        do{
            if(b.aabb.Contains(d.aabb))break;
            b.aabb.Combine(b.child1.aabb,b.child2.aabb);
            d=b;
            b=b.parent}while(b)}else d.child1=c,d.child2=a,c.parent=d,this.m_root=a.parent=d}
    };

    b2.DynamicTree.prototype.RemoveLeaf=function(a){
    if(a==this.m_root)this.m_root=null;
    else{
        var b=a.parent,c=b.parent,a=b.child1==a?b.child2:b.child1;
        if(c){
        c.child1==b?c.child1=a:c.child2=a;
        a.parent=c;
        for(this.FreeNode(b);
            c;
           ){
            b=c.aabb;
            c.aabb=b2.AABB.Combine(c.child1.aabb,c.child2.aabb);
            if(b.Contains(c.aabb))break;
            c=c.parent}}else this.m_root=a,a.parent=null,this.FreeNode(b)}
    };

    b2.DynamicTree.prototype.CreateProxy=function(a,b){
    var c=this.AllocateNode(),d=b2.Settings.b2_aabbExtension,e=b2.Settings.b2_aabbExtension;
    c.aabb.lowerBound.x=a.lowerBound.x-d;
    c.aabb.lowerBound.y=a.lowerBound.y-e;
    c.aabb.upperBound.x=a.upperBound.x+d;
    c.aabb.upperBound.y=a.upperBound.y+e;
    c.userData=b;
    this.InsertLeaf(c);
    return c
    };
    b2.DynamicTree.prototype.DestroyProxy=function(a){
    this.RemoveLeaf(a);
    this.FreeNode(a)
    };

    b2.DynamicTree.prototype.MoveProxy=function(a,b,c){
    b2.Settings.b2Assert(a.IsLeaf());
    if(a.aabb.Contains(b))return!1;
    this.RemoveLeaf(a);
    var d=b2.Settings.b2_aabbExtension+b2.Settings.b2_aabbMultiplier*(c.x>0?c.x:-c.x),c=b2.Settings.b2_aabbExtension+b2.Settings.b2_aabbMultiplier*(c.y>0?c.y:-c.y);
    a.aabb.lowerBound.x=b.lowerBound.x-d;
    a.aabb.lowerBound.y=b.lowerBound.y-c;
    a.aabb.upperBound.x=b.upperBound.x+d;
    a.aabb.upperBound.y=b.upperBound.y+c;
    this.InsertLeaf(a);
    return!0
    };

    b2.DynamicTree.prototype.Rebalance=function(a){
    if(this.m_root!=null)for(var b=0;
                 b<a;
                 b++){
        for(var c=this.m_root,d=0;
        c.IsLeaf()==!1;
           )c=this.m_path>>d&1?c.child2:c.child1,d=d+1&31;
        ++this.m_path;
        this.RemoveLeaf(c);
        this.InsertLeaf(c)}
    };
    b2.DynamicTree.prototype.GetFatAABB=function(a){
    return a.aabb
    };
    b2.DynamicTree.prototype.GetUserData=function(a){
    return a.userData
    };

    b2.DynamicTree.prototype.Query=function(a,b){
    if(this.m_root!=null){
        var c=[],d=0;
        for(c[d++]=this.m_root;
        d>0;
           ){
        var e=c[--d];
        if(e.aabb.TestOverlap(b))if(e.IsLeaf()){
            if(!a(e))break}else c[d++]=e.child1,c[d++]=e.child2}}
    };

    b2.DynamicTree.prototype.RayCast=function(a,b){
    if(this.m_root!=null){
        var c=b.p1,d=b.p2,e=b2.Math.SubtractVV(c,d);
        e.Normalize();
        var e=b2.Math.CrossFV(1,e),h=b2.Math.AbsV(e),g=b.maxFraction,f=new b2.AABB,i;
        i=c.x+g*(d.x-c.x);
        g=c.y+g*(d.y-c.y);
        f.lowerBound.x=Math.min(c.x,i);
        f.lowerBound.y=Math.min(c.y,g);
        f.upperBound.x=Math.max(c.x,i);
        f.upperBound.y=Math.max(c.y,g);
        var j=[],k=0;
        for(j[k++]=this.m_root;
        k>0;
           )if(i=j[--k],i.aabb.TestOverlap(f)!=!1){
           var g=i.aabb.GetCenter(),l=i.aabb.GetExtents();
           if(!(Math.abs(e.x*
                 (c.x-g.x)+e.y*(c.y-g.y))-h.x*l.x-h.y*l.y>0))if(i.IsLeaf()){
                     g=new b2.RayCastInput;
                     g.p1=b.p1;
                     g.p2=b.p2;
                     g.maxFraction=b.maxFraction;
                     g=a(g,i);
                     if(g==0)break;
                     i=c.x+g*(d.x-c.x);
                     g=c.y+g*(d.y-c.y);
                     f.lowerBound.x=Math.min(c.x,i);
                     f.lowerBound.y=Math.min(c.y,g);
                     f.upperBound.x=Math.max(c.x,i);
                     f.upperBound.y=Math.max(c.y,g)}else j[k++]=i.child1,j[k++]=i.child2}}
    };
    b2.DynamicTree.prototype.m_root=null;
    b2.DynamicTree.prototype.m_freeList=null;
    b2.DynamicTree.prototype.m_path=0;

    b2.DynamicTree.prototype.m_insertionCount=0;
    b2.JointEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.JointEdge.prototype.__constructor=function(){

    };
    b2.JointEdge.prototype.__varz=function(){

    };
    b2.JointEdge.prototype.other=null;
    b2.JointEdge.prototype.joint=null;
    b2.JointEdge.prototype.prev=null;
    b2.JointEdge.prototype.next=null;
    b2.RayCastInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.RayCastInput.prototype.__constructor=function(){

    };

    b2.RayCastInput.prototype.__varz=function(){
    this.p1=new b2.Vec2;
    this.p2=new b2.Vec2
    };
    b2.RayCastInput.prototype.p1=new b2.Vec2;
    b2.RayCastInput.prototype.p2=new b2.Vec2;
    b2.RayCastInput.prototype.maxFraction=null;
    var Features=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    Features.prototype.__constructor=function(){

    };
    Features.prototype.__varz=function(){

    };
    Features.prototype.__defineGetter__("referenceEdge",function(){
    return this._referenceEdge});

    Features.prototype.__defineSetter__("referenceEdge",function(a){
    this._referenceEdge=a;
    this._m_id._key=this._m_id._key&4294967040|this._referenceEdge&255});
    Features.prototype.__defineGetter__("incidentEdge",function(){
    return this._incidentEdge});
    Features.prototype.__defineSetter__("incidentEdge",function(a){
    this._incidentEdge=a;
    this._m_id._key=this._m_id._key&4294902015|this._incidentEdge<<8&65280});
    Features.prototype.__defineGetter__("incidentVertex",function(){
    return this._incidentVertex});

    Features.prototype.__defineSetter__("incidentVertex",function(a){
    this._incidentVertex=a;
    this._m_id._key=this._m_id._key&4278255615|this._incidentVertex<<16&16711680});
    Features.prototype.__defineGetter__("flip",function(){
    return this._flip});
    Features.prototype.__defineSetter__("flip",function(a){
    this._flip=a;
    this._m_id._key=this._m_id._key&16777215|this._flip<<24&4278190080});
    Features.prototype._referenceEdge=0;
    Features.prototype._incidentEdge=0;
    Features.prototype._incidentVertex=0;

    Features.prototype._flip=0;
    Features.prototype._m_id=null;
    b2.FilterData=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.FilterData.prototype.__constructor=function(){

    };
    b2.FilterData.prototype.__varz=function(){
    this.categoryBits=1;
    this.maskBits=65535
    };
    b2.FilterData.prototype.Copy=function(){
    var a=new b2.FilterData;
    a.categoryBits=this.categoryBits;
    a.maskBits=this.maskBits;
    a.groupIndex=this.groupIndex;
    return a
    };
    b2.FilterData.prototype.categoryBits=1;

    b2.FilterData.prototype.maskBits=65535;
    b2.FilterData.prototype.groupIndex=0;
    b2.AABB=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.AABB.prototype.__constructor=function(){

    };
    b2.AABB.prototype.__varz=function(){
    this.lowerBound=new b2.Vec2;
    this.upperBound=new b2.Vec2
    };
    b2.AABB.Combine=function(a,b){
    var c=new b2.AABB;
    c.Combine(a,b);
    return c
    };

    b2.AABB.prototype.IsValid=function(){
    var a=this.upperBound.y-this.lowerBound.y;
    return a=(a=this.upperBound.x-this.lowerBound.x>=0&&a>=0)&&this.lowerBound.IsValid()&&this.upperBound.IsValid()
    };
    b2.AABB.prototype.GetCenter=function(){
    return new b2.Vec2((this.lowerBound.x+this.upperBound.x)/2,(this.lowerBound.y+this.upperBound.y)/2)
    };
    b2.AABB.prototype.GetExtents=function(){
    return new b2.Vec2((this.upperBound.x-this.lowerBound.x)/2,(this.upperBound.y-this.lowerBound.y)/2)
    };

    b2.AABB.prototype.Contains=function(a){
    return this.lowerBound.x<=a.lowerBound.x&&this.lowerBound.y<=a.lowerBound.y&&a.upperBound.x<=this.upperBound.x&&a.upperBound.y<=this.upperBound.y
    };

    b2.AABB.prototype.RayCast=function(a,b){
    var c=-Number.MAX_VALUE,d=Number.MAX_VALUE,e=b.p1.x,h=b.p1.y,g=b.p2.x-b.p1.x,f=b.p2.y-b.p1.y,i=Math.abs(f),j=a.normal,k;
    if(Math.abs(g)<Number.MIN_VALUE){
        if(e<this.lowerBound.x||this.upperBound.x<e)return!1}else{
        k=1/g;
        g=(this.lowerBound.x-e)*k;
        e=(this.upperBound.x-e)*k;
        k=-1;
        g>e&&(k=g,g=e,e=k,k=1);
        if(g>c)j.x=k,j.y=0,c=g;
        d=Math.min(d,e);
        if(c>d)return!1}if(i<Number.MIN_VALUE){
            if(h<this.lowerBound.y||this.upperBound.y<h)return!1}else{
            k=1/f;
            g=(this.lowerBound.y-h)*
                k;
            e=(this.upperBound.y-h)*k;
            k=-1;
            g>e&&(k=g,g=e,e=k,k=1);
            if(g>c)j.y=k,j.x=0,c=g;
            d=Math.min(d,e);
            if(c>d)return!1}a.fraction=c;
    return!0
    };
    b2.AABB.prototype.TestOverlap=function(a){
    var b=a.lowerBound.y-this.upperBound.y,c=this.lowerBound.y-a.upperBound.y;
    if(a.lowerBound.x-this.upperBound.x>0||b>0)return!1;
    if(this.lowerBound.x-a.upperBound.x>0||c>0)return!1;
    return!0
    };

    b2.AABB.prototype.Combine=function(a,b){
    this.lowerBound.x=Math.min(a.lowerBound.x,b.lowerBound.x);
    this.lowerBound.y=Math.min(a.lowerBound.y,b.lowerBound.y);
    this.upperBound.x=Math.max(a.upperBound.x,b.upperBound.x);
    this.upperBound.y=Math.max(a.upperBound.y,b.upperBound.y)
    };
    b2.AABB.prototype.lowerBound=new b2.Vec2;
    b2.AABB.prototype.upperBound=new b2.Vec2;
    b2.Jacobian=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Jacobian.prototype.__constructor=function(){

    };

    b2.Jacobian.prototype.__varz=function(){
    this.linearA=new b2.Vec2;
    this.linearB=new b2.Vec2
    };
    b2.Jacobian.prototype.SetZero=function(){
    this.linearA.SetZero();
    this.angularA=0;
    this.linearB.SetZero();
    this.angularB=0
    };
    b2.Jacobian.prototype.Set=function(a,b,c,d){
    this.linearA.SetV(a);
    this.angularA=b;
    this.linearB.SetV(c);
    this.angularB=d
    };
    b2.Jacobian.prototype.Compute=function(a,b,c,d){
    return this.linearA.x*a.x+this.linearA.y*a.y+this.angularA*b+(this.linearB.x*c.x+this.linearB.y*c.y)+this.angularB*d
    };

    b2.Jacobian.prototype.linearA=new b2.Vec2;
    b2.Jacobian.prototype.angularA=null;
    b2.Jacobian.prototype.linearB=new b2.Vec2;
    b2.Jacobian.prototype.angularB=null;
    b2.Bound=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Bound.prototype.__constructor=function(){

    };
    b2.Bound.prototype.__varz=function(){

    };
    b2.Bound.prototype.IsLower=function(){
    return(this.value&1)==0
    };
    b2.Bound.prototype.IsUpper=function(){
    return(this.value&1)==1
    };

    b2.Bound.prototype.Swap=function(a){
    var b=this.value,c=this.proxy,d=this.stabbingCount;
    this.value=a.value;
    this.proxy=a.proxy;
    this.stabbingCount=a.stabbingCount;
    a.value=b;
    a.proxy=c;
    a.stabbingCount=d
    };
    b2.Bound.prototype.value=0;
    b2.Bound.prototype.proxy=null;
    b2.Bound.prototype.stabbingCount=0;
    b2.SimplexVertex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SimplexVertex.prototype.__constructor=function(){

    };
    b2.SimplexVertex.prototype.__varz=function(){

    };

    b2.SimplexVertex.prototype.Set=function(a){
    this.wA.SetV(a.wA);
    this.wB.SetV(a.wB);
    this.w.SetV(a.w);
    this.a=a.a;
    this.indexA=a.indexA;
    this.indexB=a.indexB
    };
    b2.SimplexVertex.prototype.wA=null;
    b2.SimplexVertex.prototype.wB=null;
    b2.SimplexVertex.prototype.w=null;
    b2.SimplexVertex.prototype.a=null;
    b2.SimplexVertex.prototype.indexA=0;
    b2.SimplexVertex.prototype.indexB=0;
    b2.Mat22=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Mat22.prototype.__constructor=function(){
    this.col1.x=this.col2.y=1
    };
    b2.Mat22.prototype.__varz=function(){
    this.col1=new b2.Vec2;
    this.col2=new b2.Vec2
    };
    b2.Mat22.FromAngle=function(a){
    var b=new b2.Mat22;
    b.Set(a);
    return b
    };
    b2.Mat22.FromVV=function(a,b){
    var c=new b2.Mat22;
    c.SetVV(a,b);
    return c
    };
    b2.Mat22.prototype.Set=function(a){
    var b=Math.cos(a),a=Math.sin(a);
    this.col1.x=b;
    this.col2.x=-a;
    this.col1.y=a;
    this.col2.y=b
    };
    b2.Mat22.prototype.SetVV=function(a,b){
    this.col1.SetV(a);
    this.col2.SetV(b)
    };

    b2.Mat22.prototype.Copy=function(){
    var a=new b2.Mat22;
    a.SetM(this);
    return a
    };
    b2.Mat22.prototype.SetM=function(a){
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2)
    };
    b2.Mat22.prototype.AddM=function(a){
    this.col1.x+=a.col1.x;
    this.col1.y+=a.col1.y;
    this.col2.x+=a.col2.x;
    this.col2.y+=a.col2.y
    };
    b2.Mat22.prototype.SetIdentity=function(){
    this.col1.x=1;
    this.col2.x=0;
    this.col1.y=0;
    this.col2.y=1
    };
    b2.Mat22.prototype.SetZero=function(){
    this.col1.x=0;
    this.col2.x=0;
    this.col1.y=0;
    this.col2.y=0
    };

    b2.Mat22.prototype.GetAngle=function(){
    return Math.atan2(this.col1.y,this.col1.x)
    };
    b2.Mat22.prototype.GetInverse=function(a){
    var b=this.col1.x,c=this.col2.x,d=this.col1.y,e=this.col2.y,h=b*e-c*d;
    h!=0&&(h=1/h);
    a.col1.x=h*e;
    a.col2.x=-h*c;
    a.col1.y=-h*d;
    a.col2.y=h*b;
    return a
    };
    b2.Mat22.prototype.Solve=function(a,b,c){
    var d=this.col1.x,e=this.col2.x,h=this.col1.y,g=this.col2.y,f=d*g-e*h;
    f!=0&&(f=1/f);
    a.x=f*(g*b-e*c);
    a.y=f*(d*c-h*b);
    return a
    };
    b2.Mat22.prototype.Abs=function(){
    this.col1.Abs();
    this.col2.Abs()
    };

    b2.Mat22.prototype.col1=new b2.Vec2;
    b2.Mat22.prototype.col2=new b2.Vec2;
    b2.SimplexCache=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SimplexCache.prototype.__constructor=function(){

    };
    b2.SimplexCache.prototype.__varz=function(){
    this.indexA=Array(3);
    this.indexB=Array(3)
    };
    b2.SimplexCache.prototype.metric=null;
    b2.SimplexCache.prototype.count=0;
    b2.SimplexCache.prototype.indexA=Array(3);
    b2.SimplexCache.prototype.indexB=Array(3);

    b2.Shape=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Shape.prototype.__constructor=function(){
    this.m_type=b2.Shape.e_unknownShape;
    this.m_radius=b2.Settings.b2_linearSlop
    };
    b2.Shape.prototype.__varz=function(){

    };

    b2.Shape.TestOverlap=function(a,b,c,d){
    var e=new b2.DistanceInput;
    e.proxyA=new b2.DistanceProxy;
    e.proxyA.Set(a);
    e.proxyB=new b2.DistanceProxy;
    e.proxyB.Set(c);
    e.transformA=b;
    e.transformB=d;
    e.useRadii=!0;
    a=new b2.SimplexCache;
    a.count=0;
    b=new b2.DistanceOutput;
    b2.Distance.Distance(b,a,e);
    return b.distance<10*Number.MIN_VALUE
    };
    b2.Shape.e_hitCollide=1;
    b2.Shape.e_missCollide=0;
    b2.Shape.e_startsInsideCollide=-1;
    b2.Shape.e_unknownShape=-1;
    b2.Shape.e_circleShape=0;
    b2.Shape.e_polygonShape=1;

    b2.Shape.e_edgeShape=2;
    b2.Shape.e_shapeTypeCount=3;
    b2.Shape.prototype.Copy=function(){
    return null
    };
    b2.Shape.prototype.Set=function(a){
    this.m_radius=a.m_radius
    };
    b2.Shape.prototype.GetType=function(){
    return this.m_type
    };
    b2.Shape.prototype.TestPoint=function(){
    return!1
    };
    b2.Shape.prototype.RayCast=function(){
    return!1
    };
    b2.Shape.prototype.ComputeAABB=function(){

    };
    b2.Shape.prototype.ComputeMass=function(){

    };
    b2.Shape.prototype.ComputeSubmergedArea=function(){
    return 0
    };
    b2.Shape.prototype.m_type=0;

    b2.Shape.prototype.m_radius=null;
    b2.Segment=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Segment.prototype.__constructor=function(){

    };
    b2.Segment.prototype.__varz=function(){
    this.p1=new b2.Vec2;
    this.p2=new b2.Vec2
    };

    b2.Segment.prototype.TestSegment=function(a,b,c,d){
    var e=c.p1,h=c.p2.x-e.x,g=c.p2.y-e.y,c=this.p2.y-this.p1.y,f=-(this.p2.x-this.p1.x),i=100*Number.MIN_VALUE,j=-(h*c+g*f);
    if(j>i){
        var k=e.x-this.p1.x,l=e.y-this.p1.y,e=k*c+l*f;
        if(0<=e&&e<=d*j&&(d=-h*l+g*k,-i*j<=d&&d<=j*(1+i)))return e/=j,d=Math.sqrt(c*c+f*f),c/=d,f/=d,a[0]=e,b.Set(c,f),!0}return!1
    };
    b2.Segment.prototype.Extend=function(a){
    this.ExtendForward(a);
    this.ExtendBackward(a)
    };

    b2.Segment.prototype.ExtendForward=function(a){
    var b=this.p2.x-this.p1.x,c=this.p2.y-this.p1.y,a=Math.min(b>0?(a.upperBound.x-this.p1.x)/b:b<0?(a.lowerBound.x-this.p1.x)/b:Number.POSITIVE_INFINITY,c>0?(a.upperBound.y-this.p1.y)/c:c<0?(a.lowerBound.y-this.p1.y)/c:Number.POSITIVE_INFINITY);
    this.p2.x=this.p1.x+b*a;
    this.p2.y=this.p1.y+c*a
    };

    b2.Segment.prototype.ExtendBackward=function(a){
    var b=-this.p2.x+this.p1.x,c=-this.p2.y+this.p1.y,a=Math.min(b>0?(a.upperBound.x-this.p2.x)/b:b<0?(a.lowerBound.x-this.p2.x)/b:Number.POSITIVE_INFINITY,c>0?(a.upperBound.y-this.p2.y)/c:c<0?(a.lowerBound.y-this.p2.y)/c:Number.POSITIVE_INFINITY);
    this.p1.x=this.p2.x+b*a;
    this.p1.y=this.p2.y+c*a
    };
    b2.Segment.prototype.p1=new b2.Vec2;
    b2.Segment.prototype.p2=new b2.Vec2;
    b2.ContactRegister=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.ContactRegister.prototype.__constructor=function(){

    };
    b2.ContactRegister.prototype.__varz=function(){

    };
    b2.ContactRegister.prototype.createFcn=null;
    b2.ContactRegister.prototype.destroyFcn=null;
    b2.ContactRegister.prototype.primary=null;
    b2.ContactRegister.prototype.pool=null;
    b2.ContactRegister.prototype.poolCount=0;
    b2.DebugDraw=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DebugDraw.prototype.__constructor=function(){
    this.m_drawFlags=0
    };
    b2.DebugDraw.prototype.__varz=function(){

    };

    b2.DebugDraw.e_shapeBit=1;
    b2.DebugDraw.e_jointBit=2;
    b2.DebugDraw.e_aabbBit=4;
    b2.DebugDraw.e_pairBit=8;
    b2.DebugDraw.e_centerOfMassBit=16;
    b2.DebugDraw.e_controllerBit=32;
    b2.DebugDraw.prototype.SetFlags=function(a){
    this.m_drawFlags=a
    };
    b2.DebugDraw.prototype.GetFlags=function(){
    return this.m_drawFlags
    };
    b2.DebugDraw.prototype.AppendFlags=function(a){
    this.m_drawFlags|=a
    };
    b2.DebugDraw.prototype.ClearFlags=function(a){
    this.m_drawFlags&=~a
    };
    b2.DebugDraw.prototype.SetSprite=function(a){
    this.m_sprite=a
    };

    b2.DebugDraw.prototype.GetSprite=function(){
    return this.m_sprite
    };
    b2.DebugDraw.prototype.SetDrawScale=function(a){
    this.m_drawScale=a
    };
    b2.DebugDraw.prototype.GetDrawScale=function(){
    return this.m_drawScale
    };
    b2.DebugDraw.prototype.SetLineThickness=function(a){
    this.m_lineThickness=a
    };
    b2.DebugDraw.prototype.GetLineThickness=function(){
    return this.m_lineThickness
    };
    b2.DebugDraw.prototype.SetAlpha=function(a){
    this.m_alpha=a
    };
    b2.DebugDraw.prototype.GetAlpha=function(){
    return this.m_alpha
    };

    b2.DebugDraw.prototype.SetFillAlpha=function(a){
    this.m_fillAlpha=a
    };
    b2.DebugDraw.prototype.GetFillAlpha=function(){
    return this.m_fillAlpha
    };
    b2.DebugDraw.prototype.SetXFormScale=function(a){
    this.m_xformScale=a
    };
    b2.DebugDraw.prototype.GetXFormScale=function(){
    return this.m_xformScale
    };
    b2.DebugDraw.prototype.Clear=function(){
    this.m_sprite.clearRect(0,0,this.m_sprite.canvas.width,this.m_sprite.canvas.height)
    };
    b2.DebugDraw.prototype.Y=function(a){
    return this.m_sprite.canvas.height-a
    };

    b2.DebugDraw.prototype.ToWorldPoint=function(a){
    return new b2.Vec2(a.x/this.m_drawScale,this.Y(a.y)/this.m_drawScale)
    };
    b2.DebugDraw.prototype.ColorStyle=function(a,b){
    return"rgba("+a.r+", "+a.g+", "+a.b+", "+b+")"
    };

    b2.DebugDraw.prototype.DrawPolygon=function(a,b,c){
    this.m_sprite.graphics.lineStyle(this.m_lineThickness,c.color,this.m_alpha);
    this.m_sprite.graphics.moveTo(a[0].x*this.m_drawScale,a[0].y*this.m_drawScale);
    for(c=1;
        c<b;
        c++)this.m_sprite.graphics.lineTo(a[c].x*this.m_drawScale,a[c].y*this.m_drawScale);
    this.m_sprite.graphics.lineTo(a[0].x*this.m_drawScale,a[0].y*this.m_drawScale)
    };

    b2.DebugDraw.prototype.DrawSolidPolygon=function(a,b,c){
    this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.fillStyle=this.ColorStyle(c,this.m_fillAlpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a[0].x*this.m_drawScale,this.Y(a[0].y*this.m_drawScale));
    for(c=1;
        c<b;
        c++)this.m_sprite.lineTo(a[c].x*this.m_drawScale,this.Y(a[c].y*this.m_drawScale));
    this.m_sprite.lineTo(a[0].x*this.m_drawScale,this.Y(a[0].y*this.m_drawScale));
    this.m_sprite.fill();

    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };
    b2.DebugDraw.prototype.DrawCircle=function(a,b,c){
    this.m_sprite.graphics.lineStyle(this.m_lineThickness,c.color,this.m_alpha);
    this.m_sprite.graphics.drawCircle(a.x*this.m_drawScale,a.y*this.m_drawScale,b*this.m_drawScale)
    };

    b2.DebugDraw.prototype.DrawSolidCircle=function(a,b,c,d){
    this.m_sprite.strokeSyle=this.ColorStyle(d,this.m_alpha);
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.fillStyle=this.ColorStyle(d,this.m_fillAlpha);
    this.m_sprite.beginPath();
    this.m_sprite.arc(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale),b*this.m_drawScale,0,Math.PI*2,!0);
    this.m_sprite.fill();
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };

    b2.DebugDraw.prototype.DrawSegment=function(a,b,c){
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale));
    this.m_sprite.lineTo(b.x*this.m_drawScale,this.Y(b.y*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };

    b2.DebugDraw.prototype.DrawTransform=function(a){
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.strokeSyle=this.ColorStyle(new b2.Color(255,0,0),this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.position.x*this.m_drawScale,this.Y(a.position.y*this.m_drawScale));
    this.m_sprite.lineTo((a.position.x+this.m_xformScale*a.R.col1.x)*this.m_drawScale,this.Y((a.position.y+this.m_xformScale*a.R.col1.y)*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath();
    this.m_sprite.strokeSyle=
        this.ColorStyle(new b2.Color(0,255,0),this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.position.x*this.m_drawScale,this.Y(a.position.y*this.m_drawScale));
    this.m_sprite.lineTo((a.position.x+this.m_xformScale*a.R.col2.x)*this.m_drawScale,this.Y((a.position.y+this.m_xformScale*a.R.col2.y)*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };
    b2.DebugDraw.prototype.m_drawFlags=0;
    b2.DebugDraw.prototype.m_sprite=null;
    b2.DebugDraw.prototype.m_drawScale=1;

    b2.DebugDraw.prototype.m_lineThickness=1;
    b2.DebugDraw.prototype.m_alpha=1;
    b2.DebugDraw.prototype.m_fillAlpha=1;
    b2.DebugDraw.prototype.m_xformScale=1;
    b2.Sweep=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Sweep.prototype.__constructor=function(){

    };
    b2.Sweep.prototype.__varz=function(){
    this.localCenter=new b2.Vec2;
    this.c0=new b2.Vec2;
    this.c=new b2.Vec2
    };

    b2.Sweep.prototype.Set=function(a){
    this.localCenter.SetV(a.localCenter);
    this.c0.SetV(a.c0);
    this.c.SetV(a.c);
    this.a0=a.a0;
    this.a=a.a;
    this.t0=a.t0
    };
    b2.Sweep.prototype.Copy=function(){
    var a=new b2.Sweep;
    a.localCenter.SetV(this.localCenter);
    a.c0.SetV(this.c0);
    a.c.SetV(this.c);
    a.a0=this.a0;
    a.a=this.a;
    a.t0=this.t0;
    return a
    };

    b2.Sweep.prototype.GetTransform=function(a,b){
    a.position.x=(1-b)*this.c0.x+b*this.c.x;
    a.position.y=(1-b)*this.c0.y+b*this.c.y;
    a.R.Set((1-b)*this.a0+b*this.a);
    var c=a.R;
    a.position.x-=c.col1.x*this.localCenter.x+c.col2.x*this.localCenter.y;
    a.position.y-=c.col1.y*this.localCenter.x+c.col2.y*this.localCenter.y
    };

    b2.Sweep.prototype.Advance=function(a){
    if(this.t0<a&&1-this.t0>Number.MIN_VALUE){
        var b=(a-this.t0)/(1-this.t0);
        this.c0.x=(1-b)*this.c0.x+b*this.c.x;
        this.c0.y=(1-b)*this.c0.y+b*this.c.y;
        this.a0=(1-b)*this.a0+b*this.a;
        this.t0=a}
    };
    b2.Sweep.prototype.localCenter=new b2.Vec2;
    b2.Sweep.prototype.c0=new b2.Vec2;
    b2.Sweep.prototype.c=new b2.Vec2;
    b2.Sweep.prototype.a0=null;
    b2.Sweep.prototype.a=null;
    b2.Sweep.prototype.t0=null;
    b2.DistanceOutput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.DistanceOutput.prototype.__constructor=function(){

    };
    b2.DistanceOutput.prototype.__varz=function(){
    this.pointA=new b2.Vec2;
    this.pointB=new b2.Vec2
    };
    b2.DistanceOutput.prototype.pointA=new b2.Vec2;
    b2.DistanceOutput.prototype.pointB=new b2.Vec2;
    b2.DistanceOutput.prototype.distance=null;
    b2.DistanceOutput.prototype.iterations=0;
    b2.Mat33=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Mat33.prototype.__constructor=function(a,b,c){
    !a&&!b&&!c?(this.col1.SetZero(),this.col2.SetZero(),this.col3.SetZero()):(this.col1.SetV(a),this.col2.SetV(b),this.col3.SetV(c))
    };
    b2.Mat33.prototype.__varz=function(){
    this.col1=new b2.Vec3;
    this.col2=new b2.Vec3;
    this.col3=new b2.Vec3
    };
    b2.Mat33.prototype.SetVVV=function(a,b,c){
    this.col1.SetV(a);
    this.col2.SetV(b);
    this.col3.SetV(c)
    };
    b2.Mat33.prototype.Copy=function(){
    return new b2.Mat33(this.col1,this.col2,this.col3)
    };

    b2.Mat33.prototype.SetM=function(a){
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2);
    this.col3.SetV(a.col3)
    };
    b2.Mat33.prototype.AddM=function(a){
    this.col1.x+=a.col1.x;
    this.col1.y+=a.col1.y;
    this.col1.z+=a.col1.z;
    this.col2.x+=a.col2.x;
    this.col2.y+=a.col2.y;
    this.col2.z+=a.col2.z;
    this.col3.x+=a.col3.x;
    this.col3.y+=a.col3.y;
    this.col3.z+=a.col3.z
    };

    b2.Mat33.prototype.SetIdentity=function(){
    this.col1.x=1;
    this.col2.x=0;
    this.col3.x=0;
    this.col1.y=0;
    this.col2.y=1;
    this.col3.y=0;
    this.col1.z=0;
    this.col2.z=0;
    this.col3.z=1
    };
    b2.Mat33.prototype.SetZero=function(){
    this.col1.x=0;
    this.col2.x=0;
    this.col3.x=0;
    this.col1.y=0;
    this.col2.y=0;
    this.col3.y=0;
    this.col1.z=0;
    this.col2.z=0;
    this.col3.z=0
    };
    b2.Mat33.prototype.Solve22=function(a,b,c){
    var d=this.col1.x,e=this.col2.x,h=this.col1.y,g=this.col2.y,f=d*g-e*h;
    f!=0&&(f=1/f);
    a.x=f*(g*b-e*c);
    a.y=f*(d*c-h*b);
    return a
    };

    b2.Mat33.prototype.Solve33=function(a,b,c,d){
    var e=this.col1.x,h=this.col1.y,g=this.col1.z,f=this.col2.x,i=this.col2.y,j=this.col2.z,k=this.col3.x,l=this.col3.y,n=this.col3.z,m=e*(i*n-j*l)+h*(j*k-f*n)+g*(f*l-i*k);
    m!=0&&(m=1/m);
    a.x=m*(b*(i*n-j*l)+c*(j*k-f*n)+d*(f*l-i*k));
    a.y=m*(e*(c*n-d*l)+h*(d*k-b*n)+g*(b*l-c*k));
    a.z=m*(e*(i*d-j*c)+h*(j*b-f*d)+g*(f*c-i*b));
    return a
    };
    b2.Mat33.prototype.col1=new b2.Vec3;
    b2.Mat33.prototype.col2=new b2.Vec3;
    b2.Mat33.prototype.col3=new b2.Vec3;

    b2.PositionSolverManifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.PositionSolverManifold.prototype.__constructor=function(){
    this.m_normal=new b2.Vec2;
    this.m_separations=Array(b2.Settings.b2_maxManifoldPoints);
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.Vec2
    };
    b2.PositionSolverManifold.prototype.__varz=function(){

    };
    b2.PositionSolverManifold.circlePointA=new b2.Vec2;

    b2.PositionSolverManifold.circlePointB=new b2.Vec2;

    b2.PositionSolverManifold.prototype.Initialize=function(a){
    b2.Settings.b2Assert(a.pointCount>0);
    var b=0,c,d,e,h,g;
    switch(a.type){
    case b2.Manifold.e_circles:e=a.bodyA.m_xf.R;
        d=a.localPoint;
        b=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        c=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        e=a.bodyB.m_xf.R;
        d=a.points[0].localPoint;
        h=a.bodyB.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        e=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        d=h-b;
        g=e-c;
        var f=d*d+g*g;
        f>Number.MIN_VALUE*Number.MIN_VALUE?
        (f=Math.sqrt(f),this.m_normal.x=d/f,this.m_normal.y=g/f):(this.m_normal.x=1,this.m_normal.y=0);
        this.m_points[0].x=0.5*(b+h);
        this.m_points[0].y=0.5*(c+e);
        this.m_separations[0]=d*this.m_normal.x+g*this.m_normal.y-a.radius;
        break;
    case b2.Manifold.e_faceA:e=a.bodyA.m_xf.R;
        d=a.localPlaneNormal;
        this.m_normal.x=e.col1.x*d.x+e.col2.x*d.y;
        this.m_normal.y=e.col1.y*d.x+e.col2.y*d.y;
        e=a.bodyA.m_xf.R;
        d=a.localPoint;
        h=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        g=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*
                       d.y);
        e=a.bodyB.m_xf.R;
        for(b=0;
        b<a.pointCount;
        ++b)d=a.points[b].localPoint,c=a.bodyB.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y),d=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y),this.m_separations[b]=(c-h)*this.m_normal.x+(d-g)*this.m_normal.y-a.radius,this.m_points[b].x=c,this.m_points[b].y=d;
        break;
    case b2.Manifold.e_faceB:e=a.bodyB.m_xf.R;
        d=a.localPlaneNormal;
        this.m_normal.x=e.col1.x*d.x+e.col2.x*d.y;
        this.m_normal.y=e.col1.y*d.x+e.col2.y*d.y;
        e=a.bodyB.m_xf.R;
        d=a.localPoint;
        h=a.bodyB.m_xf.position.x+
        (e.col1.x*d.x+e.col2.x*d.y);
        g=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        e=a.bodyA.m_xf.R;
        for(b=0;
        b<a.pointCount;
        ++b)d=a.points[b].localPoint,c=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y),d=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y),this.m_separations[b]=(c-h)*this.m_normal.x+(d-g)*this.m_normal.y-a.radius,this.m_points[b].Set(c,d);
        this.m_normal.x*=-1;
        this.m_normal.y*=-1}
    };
    b2.PositionSolverManifold.prototype.m_normal=null;
    b2.PositionSolverManifold.prototype.m_points=null;

    b2.PositionSolverManifold.prototype.m_separations=null;
    b2.OBB=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.OBB.prototype.__constructor=function(){

    };
    b2.OBB.prototype.__varz=function(){
    this.R=new b2.Mat22;
    this.center=new b2.Vec2;
    this.extents=new b2.Vec2
    };
    b2.OBB.prototype.R=new b2.Mat22;
    b2.OBB.prototype.center=new b2.Vec2;
    b2.OBB.prototype.extents=new b2.Vec2;
    b2.Pair=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Pair.prototype.__constructor=function(){

    };

    b2.Pair.prototype.__varz=function(){

    };
    b2.Pair.b2_nullProxy=b2.Settings.USHRT_MAX;
    b2.Pair.e_pairBuffered=1;
    b2.Pair.e_pairRemoved=2;
    b2.Pair.e_pairFinal=4;
    b2.Pair.prototype.SetBuffered=function(){
    this.status|=b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.ClearBuffered=function(){
    this.status&=~b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.IsBuffered=function(){
    return(this.status&b2.Pair.e_pairBuffered)==b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.SetRemoved=function(){
    this.status|=b2.Pair.e_pairRemoved
    };

    b2.Pair.prototype.ClearRemoved=function(){
    this.status&=~b2.Pair.e_pairRemoved
    };
    b2.Pair.prototype.IsRemoved=function(){
    return(this.status&b2.Pair.e_pairRemoved)==b2.Pair.e_pairRemoved
    };
    b2.Pair.prototype.SetFinal=function(){
    this.status|=b2.Pair.e_pairFinal
    };
    b2.Pair.prototype.IsFinal=function(){
    return(this.status&b2.Pair.e_pairFinal)==b2.Pair.e_pairFinal
    };
    b2.Pair.prototype.userData=null;
    b2.Pair.prototype.proxy1=null;
    b2.Pair.prototype.proxy2=null;
    b2.Pair.prototype.next=null;
    b2.Pair.prototype.status=0;

    b2.FixtureDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.FixtureDef.prototype.__constructor=function(){
    this.userData=this.shape=null;
    this.friction=0.2;
    this.density=this.restitution=0;
    this.filter.categoryBits=1;
    this.filter.maskBits=65535;
    this.filter.groupIndex=0;
    this.isSensor=!1
    };
    b2.FixtureDef.prototype.__varz=function(){
    this.filter=new b2.FilterData
    };
    b2.FixtureDef.prototype.shape=null;
    b2.FixtureDef.prototype.userData=null;
    b2.FixtureDef.prototype.friction=null;

    b2.FixtureDef.prototype.restitution=null;
    b2.FixtureDef.prototype.density=null;
    b2.FixtureDef.prototype.isSensor=null;
    b2.FixtureDef.prototype.filter=new b2.FilterData;
    b2.ContactID=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactID.prototype.__constructor=function(){
    this.features._m_id=this
    };
    b2.ContactID.prototype.__varz=function(){
    this.features=new Features
    };
    b2.ContactID.prototype.Set=function(a){
    key=a._key
    };

    b2.ContactID.prototype.Copy=function(){
    var a=new b2.ContactID;
    a.key=key;
    return a
    };
    b2.ContactID.prototype.__defineSetter__("key",function(){
    return this._key});
    b2.ContactID.prototype.__defineSetter__("key",function(a){
    this._key=a;
    this.features._referenceEdge=this._key&255;
    this.features._incidentEdge=(this._key&65280)>>8&255;
    this.features._incidentVertex=(this._key&16711680)>>16&255;
    this.features._flip=(this._key&4278190080)>>24&255});
    b2.ContactID.prototype._key=0;
    b2.ContactID.prototype.features=new Features;

    b2.Transform=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Transform.prototype.__constructor=function(a,b){
    a&&(this.position.SetV(a),this.R.SetM(b))
    };
    b2.Transform.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.R=new b2.Mat22
    };
    b2.Transform.prototype.Initialize=function(a,b){
    this.position.SetV(a);
    this.R.SetM(b)
    };
    b2.Transform.prototype.SetIdentity=function(){
    this.position.SetZero();
    this.R.SetIdentity()
    };

    b2.Transform.prototype.Set=function(a){
    this.position.SetV(a.position);
    this.R.SetM(a.R)
    };
    b2.Transform.prototype.GetAngle=function(){
    return Math.atan2(this.R.col1.y,this.R.col1.x)
    };
    b2.Transform.prototype.position=new b2.Vec2;
    b2.Transform.prototype.R=new b2.Mat22;
    b2.EdgeShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.EdgeShape.prototype,b2.Shape.prototype);
    b2.EdgeShape.prototype._super=b2.Shape.prototype;

    b2.EdgeShape.prototype.__constructor=function(a,b){
    this._super.__constructor.apply(this,[]);
    this.m_type=b2.Shape.e_edgeShape;
    this.m_nextEdge=this.m_prevEdge=null;
    this.m_v1=a;
    this.m_v2=b;
    this.m_direction.Set(this.m_v2.x-this.m_v1.x,this.m_v2.y-this.m_v1.y);
    this.m_length=this.m_direction.Normalize();
    this.m_normal.Set(this.m_direction.y,-this.m_direction.x);
    this.m_coreV1.Set(-b2.Settings.b2_toiSlop*(this.m_normal.x-this.m_direction.x)+this.m_v1.x,-b2.Settings.b2_toiSlop*(this.m_normal.y-this.m_direction.y)+
              this.m_v1.y);
    this.m_coreV2.Set(-b2.Settings.b2_toiSlop*(this.m_normal.x+this.m_direction.x)+this.m_v2.x,-b2.Settings.b2_toiSlop*(this.m_normal.y+this.m_direction.y)+this.m_v2.y);
    this.m_cornerDir1=this.m_normal;
    this.m_cornerDir2.Set(-this.m_normal.x,-this.m_normal.y)
    };

    b2.EdgeShape.prototype.__varz=function(){
    this.s_supportVec=new b2.Vec2;
    this.m_v1=new b2.Vec2;
    this.m_v2=new b2.Vec2;
    this.m_coreV1=new b2.Vec2;
    this.m_coreV2=new b2.Vec2;
    this.m_normal=new b2.Vec2;
    this.m_direction=new b2.Vec2;
    this.m_cornerDir1=new b2.Vec2;
    this.m_cornerDir2=new b2.Vec2
    };
    b2.EdgeShape.prototype.SetPrevEdge=function(a,b,c,d){
    this.m_prevEdge=a;
    this.m_coreV1=b;
    this.m_cornerDir1=c;
    this.m_cornerConvex1=d
    };

    b2.EdgeShape.prototype.SetNextEdge=function(a,b,c,d){
    this.m_nextEdge=a;
    this.m_coreV2=b;
    this.m_cornerDir2=c;
    this.m_cornerConvex2=d
    };
    b2.EdgeShape.prototype.TestPoint=function(){
    return!1
    };

    b2.EdgeShape.prototype.RayCast=function(a,b,c){
    var d,e=b.p2.x-b.p1.x,h=b.p2.y-b.p1.y;
    d=c.R;
    var g=c.position.x+(d.col1.x*this.m_v1.x+d.col2.x*this.m_v1.y),f=c.position.y+(d.col1.y*this.m_v1.x+d.col2.y*this.m_v1.y),i=c.position.y+(d.col1.y*this.m_v2.x+d.col2.y*this.m_v2.y)-f,c=-(c.position.x+(d.col1.x*this.m_v2.x+d.col2.x*this.m_v2.y)-g);
    d=100*Number.MIN_VALUE;
    var j=-(e*i+h*c);
    if(j>d){
        var g=b.p1.x-g,k=b.p1.y-f,f=g*i+k*c;
        if(0<=f&&f<=b.maxFraction*j&&(b=-e*k+h*g,-d*j<=b&&b<=j*(1+d)))return f/=j,a.fraction=
        f,b=Math.sqrt(i*i+c*c),a.normal.x=i/b,a.normal.y=c/b,!0}return!1
    };

    b2.EdgeShape.prototype.ComputeAABB=function(a,b){
    var c=b.R,d=b.position.x+(c.col1.x*this.m_v1.x+c.col2.x*this.m_v1.y),e=b.position.y+(c.col1.y*this.m_v1.x+c.col2.y*this.m_v1.y),h=b.position.x+(c.col1.x*this.m_v2.x+c.col2.x*this.m_v2.y),c=b.position.y+(c.col1.y*this.m_v2.x+c.col2.y*this.m_v2.y);
    d<h?(a.lowerBound.x=d,a.upperBound.x=h):(a.lowerBound.x=h,a.upperBound.x=d);
    e<c?(a.lowerBound.y=e,a.upperBound.y=c):(a.lowerBound.y=c,a.upperBound.y=e)
    };

    b2.EdgeShape.prototype.ComputeMass=function(a){
    a.mass=0;
    a.center.SetV(this.m_v1);
    a.I=0
    };

    b2.EdgeShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    var e=new b2.Vec2(a.x*b,a.y*b),h=b2.Math.MulX(c,this.m_v1),c=b2.Math.MulX(c,this.m_v2),g=b2.Math.Dot(a,h)-b,a=b2.Math.Dot(a,c)-b;
    if(g>0)if(a>0)return 0;
    else h.x=-a/(g-a)*h.x+g/(g-a)*c.x,h.y=-a/(g-a)*h.y+g/(g-a)*c.y;
    else if(a>0)c.x=-a/(g-a)*h.x+g/(g-a)*c.x,c.y=-a/(g-a)*h.y+g/(g-a)*c.y;
    d.x=(e.x+h.x+c.x)/3;
    d.y=(e.y+h.y+c.y)/3;
    return 0.5*((h.x-e.x)*(c.y-e.y)-(h.y-e.y)*(c.x-e.x))
    };
    b2.EdgeShape.prototype.GetLength=function(){
    return this.m_length
    };

    b2.EdgeShape.prototype.GetVertex1=function(){
    return this.m_v1
    };
    b2.EdgeShape.prototype.GetVertex2=function(){
    return this.m_v2
    };
    b2.EdgeShape.prototype.GetCoreVertex1=function(){
    return this.m_coreV1
    };
    b2.EdgeShape.prototype.GetCoreVertex2=function(){
    return this.m_coreV2
    };
    b2.EdgeShape.prototype.GetNormalVector=function(){
    return this.m_normal
    };
    b2.EdgeShape.prototype.GetDirectionVector=function(){
    return this.m_direction
    };
    b2.EdgeShape.prototype.GetCorner1Vector=function(){
    return this.m_cornerDir1
    };

    b2.EdgeShape.prototype.GetCorner2Vector=function(){
    return this.m_cornerDir2
    };
    b2.EdgeShape.prototype.Corner1IsConvex=function(){
    return this.m_cornerConvex1
    };
    b2.EdgeShape.prototype.Corner2IsConvex=function(){
    return this.m_cornerConvex2
    };
    b2.EdgeShape.prototype.GetFirstVertex=function(a){
    var b=a.R;
    return new b2.Vec2(a.position.x+(b.col1.x*this.m_coreV1.x+b.col2.x*this.m_coreV1.y),a.position.y+(b.col1.y*this.m_coreV1.x+b.col2.y*this.m_coreV1.y))
    };
    b2.EdgeShape.prototype.GetNextEdge=function(){
    return this.m_nextEdge
    };

    b2.EdgeShape.prototype.GetPrevEdge=function(){
    return this.m_prevEdge
    };

    b2.EdgeShape.prototype.Support=function(a,b,c){
    var d=a.R,e=a.position.x+(d.col1.x*this.m_coreV1.x+d.col2.x*this.m_coreV1.y),h=a.position.y+(d.col1.y*this.m_coreV1.x+d.col2.y*this.m_coreV1.y),g=a.position.x+(d.col1.x*this.m_coreV2.x+d.col2.x*this.m_coreV2.y),a=a.position.y+(d.col1.y*this.m_coreV2.x+d.col2.y*this.m_coreV2.y);
    e*b+h*c>g*b+a*c?(this.s_supportVec.x=e,this.s_supportVec.y=h):(this.s_supportVec.x=g,this.s_supportVec.y=a);
    return this.s_supportVec
    };
    b2.EdgeShape.prototype.s_supportVec=new b2.Vec2;

    b2.EdgeShape.prototype.m_v1=new b2.Vec2;
    b2.EdgeShape.prototype.m_v2=new b2.Vec2;
    b2.EdgeShape.prototype.m_coreV1=new b2.Vec2;
    b2.EdgeShape.prototype.m_coreV2=new b2.Vec2;
    b2.EdgeShape.prototype.m_length=null;
    b2.EdgeShape.prototype.m_normal=new b2.Vec2;
    b2.EdgeShape.prototype.m_direction=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerDir1=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerDir2=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerConvex1=null;
    b2.EdgeShape.prototype.m_cornerConvex2=null;

    b2.EdgeShape.prototype.m_nextEdge=null;
    b2.EdgeShape.prototype.m_prevEdge=null;
    b2.BuoyancyController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.BuoyancyController.prototype,b2.Controller.prototype);
    b2.BuoyancyController.prototype._super=b2.Controller.prototype;
    b2.BuoyancyController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.BuoyancyController.prototype.__varz=function(){
    this.normal=new b2.Vec2(0,-1);
    this.velocity=new b2.Vec2(0,0)
    };

    b2.BuoyancyController.prototype.Step=function(){
    if(m_bodyList){
        if(this.useWorldGravity)this.gravity=this.GetWorld().GetGravity().Copy();
        for(var a=m_bodyList;
        a;
        a=a.nextBody){
        var b=a.body;
        if(b.IsAwake()!=!1){
            for(var c=new b2.Vec2,d=new b2.Vec2,e=0,h=0,g=b.GetFixtureList();
            g;
            g=g.GetNext()){
            var f=new b2.Vec2,i=g.GetShape().ComputeSubmergedArea(this.normal,this.offset,b.GetTransform(),f);
            e+=i;
            c.x+=i*f.x;
            c.y+=i*f.y;
            h+=i*1;
            d.x+=i*f.x*1;
            d.y+=i*f.y*1}c.x/=e;
            c.y/=e;
            d.x/=h;
            d.y/=h;
            e<Number.MIN_VALUE||(h=this.gravity.GetNegative(),
                     h.Multiply(this.density*e),b.ApplyForce(h,d),d=b.GetLinearVelocityFromWorldPoint(c),d.Subtract(this.velocity),d.Multiply(-this.linearDrag*e),b.ApplyForce(d,c),b.ApplyTorque(-b.GetInertia()/b.GetMass()*e*b.GetAngularVelocity()*this.angularDrag))}}}
    };

    b2.BuoyancyController.prototype.Draw=function(a){
    var b=new b2.Vec2,c=new b2.Vec2;
    b.x=this.normal.x*this.offset+this.normal.y*1E3;
    b.y=this.normal.y*this.offset-this.normal.x*1E3;
    c.x=this.normal.x*this.offset-this.normal.y*1E3;
    c.y=this.normal.y*this.offset+this.normal.x*1E3;
    var d=new b2.Color(0,0,1);
    a.DrawSegment(b,c,d)
    };
    b2.BuoyancyController.prototype.normal=new b2.Vec2(0,-1);
    b2.BuoyancyController.prototype.offset=0;
    b2.BuoyancyController.prototype.density=0;

    b2.BuoyancyController.prototype.velocity=new b2.Vec2(0,0);
    b2.BuoyancyController.prototype.linearDrag=2;
    b2.BuoyancyController.prototype.angularDrag=1;
    b2.BuoyancyController.prototype.useDensity=!1;
    b2.BuoyancyController.prototype.useWorldGravity=!0;
    b2.BuoyancyController.prototype.gravity=null;
    b2.Body=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Body.prototype.__constructor=function(a,b){
    this.m_flags=0;
    a.bullet&&(this.m_flags|=b2.Body.e_bulletFlag);
    a.fixedRotation&&(this.m_flags|=b2.Body.e_fixedRotationFlag);
    a.allowSleep&&(this.m_flags|=b2.Body.e_allowSleepFlag);
    a.awake&&(this.m_flags|=b2.Body.e_awakeFlag);
    a.active&&(this.m_flags|=b2.Body.e_activeFlag);
    this.m_world=b;
    this.m_xf.position.SetV(a.position);
    this.m_xf.R.Set(a.angle);
    this.m_sweep.localCenter.SetZero();
    this.m_sweep.t0=1;
    this.m_sweep.a0=this.m_sweep.a=a.angle;
    var c=this.m_xf.R,
    d=this.m_sweep.localCenter;
    this.m_sweep.c.x=c.col1.x*d.x+c.col2.x*d.y;
    this.m_sweep.c.y=c.col1.y*d.x+c.col2.y*d.y;
    this.m_sweep.c.x+=this.m_xf.position.x;
    this.m_sweep.c.y+=this.m_xf.position.y;
    this.m_sweep.c0.SetV(this.m_sweep.c);
    this.m_contactList=this.m_controllerList=this.m_jointList=null;
    this.m_controllerCount=0;
    this.m_next=this.m_prev=null;
    this.m_linearVelocity.SetV(a.linearVelocity);
    this.m_angularVelocity=a.angularVelocity;
    this.m_linearDamping=a.linearDamping;
    this.m_angularDamping=a.angularDamping;

    this.m_force.Set(0,0);
    this.m_sleepTime=this.m_torque=0;
    this.m_type=a.type;
    this.m_invMass=this.m_type==b2.Body.b2_dynamicBody?this.m_mass=1:this.m_mass=0;
    this.m_invI=this.m_I=0;
    this.m_inertiaScale=a.inertiaScale;
    this.m_userData=a.userData;
    this.m_fixtureList=null;
    this.m_fixtureCount=0
    };
    b2.Body.prototype.__varz=function(){
    this.m_xf=new b2.Transform;
    this.m_sweep=new b2.Sweep;
    this.m_linearVelocity=new b2.Vec2;
    this.m_force=new b2.Vec2
    };
    b2.Body.b2_staticBody=0;
    b2.Body.b2_kinematicBody=1;

    b2.Body.b2_dynamicBody=2;
    b2.Body.s_xf1=new b2.Transform;
    b2.Body.e_islandFlag=1;
    b2.Body.e_awakeFlag=2;
    b2.Body.e_allowSleepFlag=4;
    b2.Body.e_bulletFlag=8;
    b2.Body.e_fixedRotationFlag=16;
    b2.Body.e_activeFlag=32;

    b2.Body.prototype.connectEdges=function(a,b,c){
    var d=Math.atan2(b.GetDirectionVector().y,b.GetDirectionVector().x),c=b2.Math.MulFV(Math.tan((d-c)*0.5),b.GetDirectionVector()),c=b2.Math.SubtractVV(c,b.GetNormalVector()),c=b2.Math.MulFV(b2.Settings.b2_toiSlop,c),c=b2.Math.AddVV(c,b.GetVertex1()),e=b2.Math.AddVV(a.GetDirectionVector(),b.GetDirectionVector());
    e.Normalize();
    var h=b2.Math.Dot(a.GetDirectionVector(),b.GetNormalVector())>0;
    a.SetNextEdge(b,c,e,h);
    b.SetPrevEdge(a,c,e,h);
    return d
    };

    b2.Body.prototype.SynchronizeFixtures=function(){
    var a=b2.Body.s_xf1;
    a.R.Set(this.m_sweep.a0);
    var b=a.R,c=this.m_sweep.localCenter;
    a.position.x=this.m_sweep.c0.x-(b.col1.x*c.x+b.col2.x*c.y);
    a.position.y=this.m_sweep.c0.y-(b.col1.y*c.x+b.col2.y*c.y);
    c=this.m_world.m_contactManager.m_broadPhase;
    for(b=this.m_fixtureList;
        b;
        b=b.m_next)b.Synchronize(c,a,this.m_xf)
    };

    b2.Body.prototype.SynchronizeTransform=function(){
    this.m_xf.R.Set(this.m_sweep.a);
    var a=this.m_xf.R,b=this.m_sweep.localCenter;
    this.m_xf.position.x=this.m_sweep.c.x-(a.col1.x*b.x+a.col2.x*b.y);
    this.m_xf.position.y=this.m_sweep.c.y-(a.col1.y*b.x+a.col2.y*b.y)
    };
    b2.Body.prototype.ShouldCollide=function(a){
    if(this.m_type!=b2.Body.b2_dynamicBody&&a.m_type!=b2.Body.b2_dynamicBody)return!1;
    for(var b=this.m_jointList;
        b;
        b=b.next)if(b.other==a&&b.joint.m_collideConnected==!1)return!1;
    return!0
    };

    b2.Body.prototype.Advance=function(a){
    this.m_sweep.Advance(a);
    this.m_sweep.c.SetV(this.m_sweep.c0);
    this.m_sweep.a=this.m_sweep.a0;
    this.SynchronizeTransform()
    };

    b2.Body.prototype.CreateFixture=function(a){
    if(this.m_world.IsLocked()==!0)return null;
    var b=new b2.Fixture;
    b.Create(this,this.m_xf,a);
    this.m_flags&b2.Body.e_activeFlag&&b.CreateProxy(this.m_world.m_contactManager.m_broadPhase,this.m_xf);
    b.m_next=this.m_fixtureList;
    this.m_fixtureList=b;
    ++this.m_fixtureCount;
    b.m_body=this;
    b.m_density>0&&this.ResetMassData();
    this.m_world.m_flags|=b2.World.e_newFixture;
    return b
    };

    b2.Body.prototype.CreateFixture2=function(a,b){
    var c=new b2.FixtureDef;
    c.shape=a;
    c.density=b;
    return this.CreateFixture(c)
    };

    b2.Body.prototype.DestroyFixture=function(a){
    if(this.m_world.IsLocked()!=!0){
        for(var b=this.m_fixtureList,c=null;
        b!=null;
           ){
        if(b==a){
            c?c.m_next=a.m_next:this.m_fixtureList=a.m_next;
            break}c=b;
        b=b.m_next}for(b=this.m_contactList;
                   b;
                  ){
            var c=b.contact,b=b.next,d=c.GetFixtureA(),e=c.GetFixtureB();
            (a==d||a==e)&&this.m_world.m_contactManager.Destroy(c)}this.m_flags&b2.Body.e_activeFlag&&a.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
        a.Destroy();
        a.m_body=null;
        a.m_next=null;
        --this.m_fixtureCount;

        this.ResetMassData()}
    };

    b2.Body.prototype.SetPositionAndAngle=function(a,b){
    var c;
    if(this.m_world.IsLocked()!=!0){
        this.m_xf.R.Set(b);
        this.m_xf.position.SetV(a);
        c=this.m_xf.R;
        var d=this.m_sweep.localCenter;
        this.m_sweep.c.x=c.col1.x*d.x+c.col2.x*d.y;
        this.m_sweep.c.y=c.col1.y*d.x+c.col2.y*d.y;
        this.m_sweep.c.x+=this.m_xf.position.x;
        this.m_sweep.c.y+=this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_sweep.a0=this.m_sweep.a=b;
        d=this.m_world.m_contactManager.m_broadPhase;
        for(c=this.m_fixtureList;
        c;
        c=c.m_next)c.Synchronize(d,
                     this.m_xf,this.m_xf);
        this.m_world.m_contactManager.FindNewContacts()}
    };
    b2.Body.prototype.SetTransform=function(a){
    this.SetPositionAndAngle(a.position,a.GetAngle())
    };
    b2.Body.prototype.GetTransform=function(){
    return this.m_xf
    };
    b2.Body.prototype.GetPosition=function(){
    return this.m_xf.position
    };
    b2.Body.prototype.SetPosition=function(a){
    this.SetPositionAndAngle(a,this.GetAngle())
    };
    b2.Body.prototype.GetAngle=function(){
    return this.m_sweep.a
    };

    b2.Body.prototype.SetAngle=function(a){
    this.SetPositionAndAngle(this.GetPosition(),a)
    };
    b2.Body.prototype.GetWorldCenter=function(){
    return this.m_sweep.c
    };
    b2.Body.prototype.GetLocalCenter=function(){
    return this.m_sweep.localCenter
    };
    b2.Body.prototype.SetLinearVelocity=function(a){
    this.m_type!=b2.Body.b2_staticBody&&this.m_linearVelocity.SetV(a)
    };
    b2.Body.prototype.GetLinearVelocity=function(){
    return this.m_linearVelocity
    };

    b2.Body.prototype.SetAngularVelocity=function(a){
    if(this.m_type!=b2.Body.b2_staticBody)this.m_angularVelocity=a
    };
    b2.Body.prototype.GetAngularVelocity=function(){
    return this.m_angularVelocity
    };

    b2.Body.prototype.GetDefinition=function(){
    var a=new b2.BodyDef;
    a.type=this.GetType();
    a.allowSleep=(this.m_flags&b2.Body.e_allowSleepFlag)==b2.Body.e_allowSleepFlag;
    a.angle=this.GetAngle();
    a.angularDamping=this.m_angularDamping;
    a.angularVelocity=this.m_angularVelocity;
    a.fixedRotation=(this.m_flags&b2.Body.e_fixedRotationFlag)==b2.Body.e_fixedRotationFlag;
    a.bullet=(this.m_flags&b2.Body.e_bulletFlag)==b2.Body.e_bulletFlag;
    a.awake=(this.m_flags&b2.Body.e_awakeFlag)==b2.Body.e_awakeFlag;
    a.linearDamping=
        this.m_linearDamping;
    a.linearVelocity.SetV(this.GetLinearVelocity());
    a.position=this.GetPosition();
    a.userData=this.GetUserData();
    return a
    };
    b2.Body.prototype.ApplyForce=function(a,b){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_force.x+=a.x,this.m_force.y+=a.y,this.m_torque+=(b.x-this.m_sweep.c.x)*a.y-(b.y-this.m_sweep.c.y)*a.x)
    };

    b2.Body.prototype.ApplyTorque=function(a){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_torque+=a)
    };
    b2.Body.prototype.ApplyImpulse=function(a,b){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_linearVelocity.x+=this.m_invMass*a.x,this.m_linearVelocity.y+=this.m_invMass*a.y,this.m_angularVelocity+=this.m_invI*((b.x-this.m_sweep.c.x)*a.y-(b.y-this.m_sweep.c.y)*a.x))
    };

    b2.Body.prototype.Split=function(a){
    for(var b=this.GetLinearVelocity().Copy(),c=this.GetAngularVelocity(),d=this.GetWorldCenter(),e=this.m_world.CreateBody(this.GetDefinition()),h,g=this.m_fixtureList;
        g;
       )if(a(g)){
           var f=g.m_next;
           h?h.m_next=f:this.m_fixtureList=f;
           this.m_fixtureCount--;
           g.m_next=e.m_fixtureList;
           e.m_fixtureList=g;
           e.m_fixtureCount++;
           g.m_body=e;
           g=f}else h=g,g=g.m_next;
    this.ResetMassData();
    e.ResetMassData();
    h=this.GetWorldCenter();
    a=e.GetWorldCenter();
    h=b2.Math.AddVV(b,b2.Math.CrossFV(c,
                      b2.Math.SubtractVV(h,d)));
    b=b2.Math.AddVV(b,b2.Math.CrossFV(c,b2.Math.SubtractVV(a,d)));
    this.SetLinearVelocity(h);
    e.SetLinearVelocity(b);
    this.SetAngularVelocity(c);
    e.SetAngularVelocity(c);
    this.SynchronizeFixtures();
    e.SynchronizeFixtures();
    return e
    };

    b2.Body.prototype.Merge=function(a){
    var b;
    for(b=a.m_fixtureList;
        b;
       ){
        var c=b.m_next;
        a.m_fixtureCount--;
        b.m_next=this.m_fixtureList;
        this.m_fixtureList=b;
        this.m_fixtureCount++;
        b.m_body=e;
        b=c}d.m_fixtureCount=0;
    var d=this,e=a;
    d.GetWorldCenter();
    e.GetWorldCenter();
    d.GetLinearVelocity().Copy();
    e.GetLinearVelocity().Copy();
    d.GetAngularVelocity();
    e.GetAngularVelocity();
    d.ResetMassData();
    this.SynchronizeFixtures()
    };
    b2.Body.prototype.GetMass=function(){
    return this.m_mass
    };
    b2.Body.prototype.GetInertia=function(){
    return this.m_I
    };

    b2.Body.prototype.GetMassData=function(a){
    a.mass=this.m_mass;
    a.I=this.m_I;
    a.center.SetV(this.m_sweep.localCenter)
    };

    b2.Body.prototype.SetMassData=function(a){
    b2.Settings.b2Assert(this.m_world.IsLocked()==!1);
    if(this.m_world.IsLocked()!=!0&&this.m_type==b2.Body.b2_dynamicBody){
        this.m_invI=this.m_I=this.m_invMass=0;
        this.m_mass=a.mass;
        if(this.m_mass<=0)this.m_mass=1;
        this.m_invMass=1/this.m_mass;
        if(a.I>0&&(this.m_flags&b2.Body.e_fixedRotationFlag)==0)this.m_I=a.I-this.m_mass*(a.center.x*a.center.x+a.center.y*a.center.y),this.m_invI=1/this.m_I;
        var b=this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(a.center);
        this.m_sweep.c0.SetV(b2.Math.MulX(this.m_xf,
                          this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x+=this.m_angularVelocity*-(this.m_sweep.c.y-b.y);
        this.m_linearVelocity.y+=this.m_angularVelocity*+(this.m_sweep.c.x-b.x)}
    };

    b2.Body.prototype.ResetMassData=function(){
    this.m_invI=this.m_I=this.m_invMass=this.m_mass=0;
    this.m_sweep.localCenter.SetZero();
    if(!(this.m_type==b2.Body.b2_staticBody||this.m_type==b2.Body.b2_kinematicBody)){
        for(var a=b2.Vec2.Make(0,0),b=this.m_fixtureList;
        b;
        b=b.m_next)if(b.m_density!=0){
            var c=b.GetMassData();
            this.m_mass+=c.mass;
            a.x+=c.center.x*c.mass;
            a.y+=c.center.y*c.mass;
            this.m_I+=c.I}this.m_mass>0?(this.m_invMass=1/this.m_mass,a.x*=this.m_invMass,a.y*=this.m_invMass):this.m_invMass=this.m_mass=
        1;
        this.m_I>0&&(this.m_flags&b2.Body.e_fixedRotationFlag)==0?(this.m_I-=this.m_mass*(a.x*a.x+a.y*a.y),this.m_I*=this.m_inertiaScale,b2.Settings.b2Assert(this.m_I>0),this.m_invI=1/this.m_I):this.m_invI=this.m_I=0;
        b=this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(a);
        this.m_sweep.c0.SetV(b2.Math.MulX(this.m_xf,this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x+=this.m_angularVelocity*-(this.m_sweep.c.y-b.y);
        this.m_linearVelocity.y+=this.m_angularVelocity*+(this.m_sweep.c.x-
                                  b.x)}
    };
    b2.Body.prototype.GetWorldPoint=function(a){
    var b=this.m_xf.R,a=new b2.Vec2(b.col1.x*a.x+b.col2.x*a.y,b.col1.y*a.x+b.col2.y*a.y);
    a.x+=this.m_xf.position.x;
    a.y+=this.m_xf.position.y;
    return a
    };
    b2.Body.prototype.GetWorldVector=function(a){
    return b2.Math.MulMV(this.m_xf.R,a)
    };
    b2.Body.prototype.GetLocalPoint=function(a){
    return b2.Math.MulXT(this.m_xf,a)
    };
    b2.Body.prototype.GetLocalVector=function(a){
    return b2.Math.MulTMV(this.m_xf.R,a)
    };

    b2.Body.prototype.GetLinearVelocityFromWorldPoint=function(a){
    return new b2.Vec2(this.m_linearVelocity.x-this.m_angularVelocity*(a.y-this.m_sweep.c.y),this.m_linearVelocity.y+this.m_angularVelocity*(a.x-this.m_sweep.c.x))
    };

    b2.Body.prototype.GetLinearVelocityFromLocalPoint=function(a){
    var b=this.m_xf.R,a=new b2.Vec2(b.col1.x*a.x+b.col2.x*a.y,b.col1.y*a.x+b.col2.y*a.y);
    a.x+=this.m_xf.position.x;
    a.y+=this.m_xf.position.y;
    return new b2.Vec2(this.m_linearVelocity.x-this.m_angularVelocity*(a.y-this.m_sweep.c.y),this.m_linearVelocity.y+this.m_angularVelocity*(a.x-this.m_sweep.c.x))
    };
    b2.Body.prototype.GetLinearDamping=function(){
    return this.m_linearDamping
    };

    b2.Body.prototype.SetLinearDamping=function(a){
    this.m_linearDamping=a
    };
    b2.Body.prototype.GetAngularDamping=function(){
    return this.m_angularDamping
    };
    b2.Body.prototype.SetAngularDamping=function(a){
    this.m_angularDamping=a
    };
    b2.Body.prototype.SetType=function(a){
    if(this.m_type!=a){
        this.m_type=a;
        this.ResetMassData();
        if(this.m_type==b2.Body.b2_staticBody)this.m_linearVelocity.SetZero(),this.m_angularVelocity=0;
        this.SetAwake(!0);
        this.m_force.SetZero();
        this.m_torque=0;
        for(a=this.m_contactList;
        a;
        a=a.next)a.contact.FlagForFiltering()}
    };

    b2.Body.prototype.GetType=function(){
    return this.m_type
    };
    b2.Body.prototype.SetBullet=function(a){
    a?this.m_flags|=b2.Body.e_bulletFlag:this.m_flags&=~b2.Body.e_bulletFlag
    };
    b2.Body.prototype.IsBullet=function(){
    return(this.m_flags&b2.Body.e_bulletFlag)==b2.Body.e_bulletFlag
    };
    b2.Body.prototype.SetSleepingAllowed=function(a){
    a?this.m_flags|=b2.Body.e_allowSleepFlag:(this.m_flags&=~b2.Body.e_allowSleepFlag,this.SetAwake(!0))
    };

    b2.Body.prototype.SetAwake=function(a){
    a?(this.m_flags|=b2.Body.e_awakeFlag,this.m_sleepTime=0):(this.m_flags&=~b2.Body.e_awakeFlag,this.m_sleepTime=0,this.m_linearVelocity.SetZero(),this.m_angularVelocity=0,this.m_force.SetZero(),this.m_torque=0)
    };
    b2.Body.prototype.IsAwake=function(){
    return(this.m_flags&b2.Body.e_awakeFlag)==b2.Body.e_awakeFlag
    };
    b2.Body.prototype.SetFixedRotation=function(a){
    a?this.m_flags|=b2.Body.e_fixedRotationFlag:this.m_flags&=~b2.Body.e_fixedRotationFlag;
    this.ResetMassData()
    };

    b2.Body.prototype.IsFixedRotation=function(){
    return(this.m_flags&b2.Body.e_fixedRotationFlag)==b2.Body.e_fixedRotationFlag
    };

    b2.Body.prototype.SetActive=function(a){
    if(a!=this.IsActive()){
        var b;
        if(a){
        this.m_flags|=b2.Body.e_activeFlag;
        a=this.m_world.m_contactManager.m_broadPhase;
        for(b=this.m_fixtureList;
            b;
            b=b.m_next)b.CreateProxy(a,this.m_xf)}else{
            this.m_flags&=~b2.Body.e_activeFlag;
            a=this.m_world.m_contactManager.m_broadPhase;
            for(b=this.m_fixtureList;
                b;
                b=b.m_next)b.DestroyProxy(a);
            for(a=this.m_contactList;
                a;
               )b=a,a=a.next,this.m_world.m_contactManager.Destroy(b.contact);
            this.m_contactList=null}}
    };

    b2.Body.prototype.IsActive=function(){
    return(this.m_flags&b2.Body.e_activeFlag)==b2.Body.e_activeFlag
    };
    b2.Body.prototype.IsSleepingAllowed=function(){
    return(this.m_flags&b2.Body.e_allowSleepFlag)==b2.Body.e_allowSleepFlag
    };
    b2.Body.prototype.GetFixtureList=function(){
    return this.m_fixtureList
    };
    b2.Body.prototype.GetJointList=function(){
    return this.m_jointList
    };
    b2.Body.prototype.GetControllerList=function(){
    return this.m_controllerList
    };
    b2.Body.prototype.GetContactList=function(){
    return this.m_contactList
    };

    b2.Body.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Body.prototype.GetUserData=function(){
    return this.m_userData
    };
    b2.Body.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Body.prototype.GetWorld=function(){
    return this.m_world
    };
    b2.Body.prototype.m_flags=0;
    b2.Body.prototype.m_type=0;
    b2.Body.prototype.m_islandIndex=0;
    b2.Body.prototype.m_xf=new b2.Transform;
    b2.Body.prototype.m_sweep=new b2.Sweep;
    b2.Body.prototype.m_linearVelocity=new b2.Vec2;
    b2.Body.prototype.m_angularVelocity=null;

    b2.Body.prototype.m_force=new b2.Vec2;
    b2.Body.prototype.m_torque=null;
    b2.Body.prototype.m_world=null;
    b2.Body.prototype.m_prev=null;
    b2.Body.prototype.m_next=null;
    b2.Body.prototype.m_fixtureList=null;
    b2.Body.prototype.m_fixtureCount=0;
    b2.Body.prototype.m_controllerList=null;
    b2.Body.prototype.m_controllerCount=0;
    b2.Body.prototype.m_jointList=null;
    b2.Body.prototype.m_contactList=null;
    b2.Body.prototype.m_mass=null;
    b2.Body.prototype.m_invMass=null;
    b2.Body.prototype.m_I=null;
    b2.Body.prototype.m_invI=null;

    b2.Body.prototype.m_inertiaScale=null;
    b2.Body.prototype.m_linearDamping=null;
    b2.Body.prototype.m_angularDamping=null;
    b2.Body.prototype.m_sleepTime=null;
    b2.Body.prototype.m_userData=null;
    b2.ContactImpulse=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactImpulse.prototype.__constructor=function(){

    };
    b2.ContactImpulse.prototype.__varz=function(){
    this.normalImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    this.tangentImpulses=Array(b2.Settings.b2_maxManifoldPoints)
    };

    b2.ContactImpulse.prototype.normalImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    b2.ContactImpulse.prototype.tangentImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    b2.TensorDampingController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.TensorDampingController.prototype,b2.Controller.prototype);
    b2.TensorDampingController.prototype._super=b2.Controller.prototype;

    b2.TensorDampingController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.TensorDampingController.prototype.__varz=function(){
    this.T=new b2.Mat22
    };
    b2.TensorDampingController.prototype.SetAxisAligned=function(a,b){
    this.T.col1.x=-a;
    this.T.col1.y=0;
    this.T.col2.x=0;
    this.T.col2.y=-b;
    this.maxTimestep=a>0||b>0?1/Math.max(a,b):0
    };

    b2.TensorDampingController.prototype.Step=function(a){
    a=a.dt;
    if(!(a<=Number.MIN_VALUE)){
        if(a>this.maxTimestep&&this.maxTimestep>0)a=this.maxTimestep;
        for(var b=m_bodyList;
        b;
        b=b.nextBody){
        var c=b.body;
        if(c.IsAwake()){
            var d=c.GetWorldVector(b2.Math.MulMV(this.T,c.GetLocalVector(c.GetLinearVelocity())));
            c.SetLinearVelocity(new b2.Vec2(c.GetLinearVelocity().x+d.x*a,c.GetLinearVelocity().y+d.y*a))}}}
    };
    b2.TensorDampingController.prototype.T=new b2.Mat22;
    b2.TensorDampingController.prototype.maxTimestep=0;

    b2.ManifoldPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ManifoldPoint.prototype.__constructor=function(){
    this.Reset()
    };
    b2.ManifoldPoint.prototype.__varz=function(){
    this.m_localPoint=new b2.Vec2;
    this.m_id=new b2.ContactID
    };
    b2.ManifoldPoint.prototype.Reset=function(){
    this.m_localPoint.SetZero();
    this.m_tangentImpulse=this.m_normalImpulse=0;
    this.m_id.key=0
    };

    b2.ManifoldPoint.prototype.Set=function(a){
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_normalImpulse=a.m_normalImpulse;
    this.m_tangentImpulse=a.m_tangentImpulse;
    this.m_id.Set(a.m_id)
    };
    b2.ManifoldPoint.prototype.m_localPoint=new b2.Vec2;
    b2.ManifoldPoint.prototype.m_normalImpulse=null;
    b2.ManifoldPoint.prototype.m_tangentImpulse=null;
    b2.ManifoldPoint.prototype.m_id=new b2.ContactID;
    b2.PolygonShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.PolygonShape.prototype,b2.Shape.prototype);
    b2.PolygonShape.prototype._super=b2.Shape.prototype;
    b2.PolygonShape.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.m_type=b2.Shape.e_polygonShape;
    this.m_centroid=new b2.Vec2;
    this.m_vertices=[];
    this.m_normals=[]
    };
    b2.PolygonShape.prototype.__varz=function(){

    };
    b2.PolygonShape.AsArray=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsArray(a,b);
    return c
    };

    b2.PolygonShape.AsVector=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsVector(a,b);
    return c
    };
    b2.PolygonShape.AsBox=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsBox(a,b);
    return c
    };
    b2.PolygonShape.AsOrientedBox=function(a,b,c,d){
    var e=new b2.PolygonShape;
    e.SetAsOrientedBox(a,b,c,d);
    return e
    };
    b2.PolygonShape.AsEdge=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsEdge(a,b);
    return c
    };

    b2.PolygonShape.ComputeCentroid=function(a,b){
    for(var c=new b2.Vec2,d=0,e=1/3,h=0;
        h<b;
        ++h){
        var g=a[h],f=h+1<b?a[parseInt(h+1)]:a[0],i=0.5*((g.x-0)*(f.y-0)-(g.y-0)*(f.x-0));
        d+=i;
        c.x+=i*e*(0+g.x+f.x);
        c.y+=i*e*(0+g.y+f.y)}c.x*=1/d;
    c.y*=1/d;
    return c
    };

    b2.PolygonShape.ComputeOBB=function(a,b,c){
    for(var d=0,e=Array(c+1),d=0;
        d<c;
        ++d)e[d]=b[d];
    e[c]=e[0];
    b=Number.MAX_VALUE;
    for(d=1;
        d<=c;
        ++d){
        var h=e[parseInt(d-1)],g=e[d].x-h.x,f=e[d].y-h.y,i=Math.sqrt(g*g+f*f);
        g/=i;
        f/=i;
        for(var j=-f,k=g,l=i=Number.MAX_VALUE,n=-Number.MAX_VALUE,m=-Number.MAX_VALUE,o=0;
        o<c;
        ++o){
        var p=e[o].x-h.x,q=e[o].y-h.y,r=g*p+f*q,p=j*p+k*q;
        r<i&&(i=r);
        p<l&&(l=p);
        r>n&&(n=r);
        p>m&&(m=p)}o=(n-i)*(m-l);
        if(o<0.95*b)b=o,a.R.col1.x=g,a.R.col1.y=f,a.R.col2.x=j,a.R.col2.y=k,g=0.5*(i+n),f=0.5*
        (l+m),j=a.R,a.center.x=h.x+(j.col1.x*g+j.col2.x*f),a.center.y=h.y+(j.col1.y*g+j.col2.y*f),a.extents.x=0.5*(n-i),a.extents.y=0.5*(m-l)}
    };
    b2.PolygonShape.s_mat=new b2.Mat22;
    b2.PolygonShape.prototype.Validate=function(){
    return!1
    };
    b2.PolygonShape.prototype.Reserve=function(a){
    for(var b=this.m_vertices.length;
        b<a;
        b++)this.m_vertices[b]=new b2.Vec2,this.m_normals[b]=new b2.Vec2
    };
    b2.PolygonShape.prototype.Copy=function(){
    var a=new b2.PolygonShape;
    a.Set(this);
    return a
    };

    b2.PolygonShape.prototype.Set=function(a){
    this._super.Set.apply(this,[a]);
    if(isInstanceOf(a,b2.PolygonShape)){
        this.m_centroid.SetV(a.m_centroid);
        this.m_vertexCount=a.m_vertexCount;
        this.Reserve(this.m_vertexCount);
        for(var b=0;
        b<this.m_vertexCount;
        b++)this.m_vertices[b].SetV(a.m_vertices[b]),this.m_normals[b].SetV(a.m_normals[b])}
    };
    b2.PolygonShape.prototype.SetAsArray=function(a,b){
    for(var c=[],d=0,e=null;
        e=a[d];
        d++)c.push(e);
    this.SetAsVector(c,b)
    };

    b2.PolygonShape.prototype.SetAsVector=function(a,b){
    if(typeof b=="undefined")b=a.length;
    b2.Settings.b2Assert(2<=b);
    this.m_vertexCount=b;
    this.Reserve(b);
    for(var c=0,c=0;
        c<this.m_vertexCount;
        c++)this.m_vertices[c].SetV(a[c]);
    for(c=0;
        c<this.m_vertexCount;
        ++c){
        var d=b2.Math.SubtractVV(this.m_vertices[c+1<this.m_vertexCount?c+1:0],this.m_vertices[c]);
        b2.Settings.b2Assert(d.LengthSquared()>Number.MIN_VALUE);
        this.m_normals[c].SetV(b2.Math.CrossVF(d,1));
        this.m_normals[c].Normalize()}this.m_centroid=b2.PolygonShape.ComputeCentroid(this.m_vertices,
                                              this.m_vertexCount)
    };
    b2.PolygonShape.prototype.SetAsBox=function(a,b){
    this.m_vertexCount=4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a,-b);
    this.m_vertices[1].Set(a,-b);
    this.m_vertices[2].Set(a,b);
    this.m_vertices[3].Set(-a,b);
    this.m_normals[0].Set(0,-1);
    this.m_normals[1].Set(1,0);
    this.m_normals[2].Set(0,1);
    this.m_normals[3].Set(-1,0);
    this.m_centroid.SetZero()
    };

    b2.PolygonShape.prototype.SetAsOrientedBox=function(a,b,c,d){
    this.m_vertexCount=4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a,-b);
    this.m_vertices[1].Set(a,-b);
    this.m_vertices[2].Set(a,b);
    this.m_vertices[3].Set(-a,b);
    this.m_normals[0].Set(0,-1);
    this.m_normals[1].Set(1,0);
    this.m_normals[2].Set(0,1);
    this.m_normals[3].Set(-1,0);
    this.m_centroid=c;
    a=new b2.Transform;
    a.position=c;
    a.R.Set(d);
    for(c=0;
        c<this.m_vertexCount;
        ++c)this.m_vertices[c]=b2.Math.MulX(a,this.m_vertices[c]),this.m_normals[c]=b2.Math.MulMV(a.R,
                                                      this.m_normals[c])
    };
    b2.PolygonShape.prototype.SetAsEdge=function(a,b){
    this.m_vertexCount=2;
    this.Reserve(2);
    this.m_vertices[0].SetV(a);
    this.m_vertices[1].SetV(b);
    this.m_centroid.x=0.5*(a.x+b.x);
    this.m_centroid.y=0.5*(a.y+b.y);
    this.m_normals[0]=b2.Math.CrossVF(b2.Math.SubtractVV(b,a),1);
    this.m_normals[0].Normalize();
    this.m_normals[1].x=-this.m_normals[0].x;
    this.m_normals[1].y=-this.m_normals[0].y
    };

    b2.PolygonShape.prototype.TestPoint=function(a,b){
    var c;
    c=a.R;
    for(var d=b.x-a.position.x,e=b.y-a.position.y,h=d*c.col1.x+e*c.col1.y,g=d*c.col2.x+e*c.col2.y,f=0;
        f<this.m_vertexCount;
        ++f)if(c=this.m_vertices[f],d=h-c.x,e=g-c.y,c=this.m_normals[f],c.x*d+c.y*e>0)return!1;
    return!0
    };

    b2.PolygonShape.prototype.RayCast=function(a,b,c){
    var d=0,e=b.maxFraction,h,g,f,i;
    h=b.p1.x-c.position.x;
    g=b.p1.y-c.position.y;
    f=c.R;
    var j=h*f.col1.x+g*f.col1.y,k=h*f.col2.x+g*f.col2.y;
    h=b.p2.x-c.position.x;
    g=b.p2.y-c.position.y;
    f=c.R;
    b=h*f.col1.x+g*f.col1.y-j;
    f=h*f.col2.x+g*f.col2.y-k;
    for(var l=-1,n=0;
        n<this.m_vertexCount;
        ++n){
        i=this.m_vertices[n];
        h=i.x-j;
        g=i.y-k;
        i=this.m_normals[n];
        h=i.x*h+i.y*g;
        g=i.x*b+i.y*f;
        if(g==0){
        if(h<0)return!1}else g<0&&h<d*g?(d=h/g,l=n):g>0&&h<e*g&&(e=h/g);
        if(e<d-Number.MIN_VALUE)return!1}if(l>=
                        0)return a.fraction=d,f=c.R,i=this.m_normals[l],a.normal.x=f.col1.x*i.x+f.col2.x*i.y,a.normal.y=f.col1.y*i.x+f.col2.y*i.y,!0;
    return!1
    };

    b2.PolygonShape.prototype.ComputeAABB=function(a,b){
    for(var c=b.R,d=this.m_vertices[0],e=b.position.x+(c.col1.x*d.x+c.col2.x*d.y),h=b.position.y+(c.col1.y*d.x+c.col2.y*d.y),g=e,f=h,i=1;
        i<this.m_vertexCount;
        ++i)var d=this.m_vertices[i],j=b.position.x+(c.col1.x*d.x+c.col2.x*d.y),d=b.position.y+(c.col1.y*d.x+c.col2.y*d.y),e=e<j?e:j,h=h<d?h:d,g=g>j?g:j,f=f>d?f:d;
    a.lowerBound.x=e-this.m_radius;
    a.lowerBound.y=h-this.m_radius;
    a.upperBound.x=g+this.m_radius;
    a.upperBound.y=f+this.m_radius
    };

    b2.PolygonShape.prototype.ComputeMass=function(a,b){
    if(this.m_vertexCount==2)a.center.x=0.5*(this.m_vertices[0].x+this.m_vertices[1].x),a.center.y=0.5*(this.m_vertices[0].y+this.m_vertices[1].y),a.mass=0,a.I=0;
    else{
        for(var c=0,d=0,e=0,h=0,g=1/3,f=0;
        f<this.m_vertexCount;
        ++f){
        var i=this.m_vertices[f],j=f+1<this.m_vertexCount?this.m_vertices[parseInt(f+1)]:this.m_vertices[0],k=i.x-0,l=i.y-0,n=j.x-0,m=j.y-0,o=k*m-l*n,p=0.5*o;
        e+=p;
        c+=p*g*(0+i.x+j.x);
        d+=p*g*(0+i.y+j.y);
        i=k;
        h+=o*(g*(0.25*(i*i+n*i+n*n)+(0*
                         i+0*n))+0+(g*(0.25*(l*l+m*l+m*m)+(0*l+0*m))+0))}a.mass=b*e;
        c*=1/e;
        d*=1/e;
        a.center.Set(c,d);
        a.I=b*h}
    };

    b2.PolygonShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    for(var e=b2.Math.MulTMV(c.R,a),h=b-b2.Math.Dot(a,c.position),g=[],f=0,i=-1,b=-1,j=!1,a=a=0;
        a<this.m_vertexCount;
        ++a){
        g[a]=b2.Math.Dot(e,this.m_vertices[a])-h;
        var k=g[a]<-Number.MIN_VALUE;
        a>0&&(k?j||(i=a-1,f++):j&&(b=a-1,f++));
        j=k}switch(f){
        case 0:return j?(a=new b2.MassData,this.ComputeMass(a,1),d.SetV(b2.Math.MulX(c,a.center)),a.mass):0;
        case 1:i==-1?i=this.m_vertexCount-1:b=this.m_vertexCount-1}a=(i+1)%this.m_vertexCount;
    e=(b+1)%this.m_vertexCount;

    h=(0-g[i])/(g[a]-g[i]);
    g=(0-g[b])/(g[e]-g[b]);
    i=new b2.Vec2(this.m_vertices[i].x*(1-h)+this.m_vertices[a].x*h,this.m_vertices[i].y*(1-h)+this.m_vertices[a].y*h);
    b=new b2.Vec2(this.m_vertices[b].x*(1-g)+this.m_vertices[e].x*g,this.m_vertices[b].y*(1-g)+this.m_vertices[e].y*g);
    g=0;
    h=new b2.Vec2;
    for(f=this.m_vertices[a];
        a!=e;
       )a=(a+1)%this.m_vertexCount,j=a==e?b:this.m_vertices[a],k=0.5*((f.x-i.x)*(j.y-i.y)-(f.y-i.y)*(j.x-i.x)),g+=k,h.x+=k*(i.x+f.x+j.x)/3,h.y+=k*(i.y+f.y+j.y)/3,f=j;
    h.Multiply(1/g);
    d.SetV(b2.Math.MulX(c,
                h));
    return g
    };
    b2.PolygonShape.prototype.GetVertexCount=function(){
    return this.m_vertexCount
    };
    b2.PolygonShape.prototype.GetVertices=function(){
    return this.m_vertices
    };
    b2.PolygonShape.prototype.GetNormals=function(){
    return this.m_normals
    };
    b2.PolygonShape.prototype.GetSupport=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_vertexCount;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return b
    };

    b2.PolygonShape.prototype.GetSupportVertex=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_vertexCount;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return this.m_vertices[b]
    };
    b2.PolygonShape.prototype.m_centroid=null;
    b2.PolygonShape.prototype.m_vertices=null;
    b2.PolygonShape.prototype.m_normals=null;
    b2.PolygonShape.prototype.m_vertexCount=0;
    b2.Fixture=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Fixture.prototype.__constructor=function(){
    this.m_aabb=new b2.AABB;
    this.m_shape=this.m_next=this.m_body=this.m_userData=null;
    this.m_restitution=this.m_friction=this.m_density=0
    };
    b2.Fixture.prototype.__varz=function(){
    this.m_filter=new b2.FilterData
    };

    b2.Fixture.prototype.Create=function(a,b,c){
    this.m_userData=c.userData;
    this.m_friction=c.friction;
    this.m_restitution=c.restitution;
    this.m_body=a;
    this.m_next=null;
    this.m_filter=c.filter.Copy();
    this.m_isSensor=c.isSensor;
    this.m_shape=c.shape.Copy();
    this.m_density=c.density
    };
    b2.Fixture.prototype.Destroy=function(){
    this.m_shape=null
    };
    b2.Fixture.prototype.CreateProxy=function(a,b){
    this.m_shape.ComputeAABB(this.m_aabb,b);
    this.m_proxy=a.CreateProxy(this.m_aabb,this)
    };

    b2.Fixture.prototype.DestroyProxy=function(a){
    if(this.m_proxy!=null)a.DestroyProxy(this.m_proxy),this.m_proxy=null
    };
    b2.Fixture.prototype.Synchronize=function(a,b,c){
    if(this.m_proxy){
        var d=new b2.AABB,e=new b2.AABB;
        this.m_shape.ComputeAABB(d,b);
        this.m_shape.ComputeAABB(e,c);
        this.m_aabb.Combine(d,e);
        b=b2.Math.SubtractVV(c.position,b.position);
        a.MoveProxy(this.m_proxy,this.m_aabb,b)}
    };
    b2.Fixture.prototype.GetType=function(){
    return this.m_shape.GetType()
    };
    b2.Fixture.prototype.GetShape=function(){
    return this.m_shape
    };

    b2.Fixture.prototype.SetSensor=function(a){
    if(this.m_isSensor!=a&&(this.m_isSensor=a,this.m_body!=null))for(a=this.m_body.GetContactList();
                                     a;
                                    ){
        var b=a.contact,c=b.GetFixtureA(),d=b.GetFixtureB();
        if(c==this||d==this)b.SetSensor(c.IsSensor()||d.IsSensor());
        a=a.next}
    };
    b2.Fixture.prototype.IsSensor=function(){
    return this.m_isSensor
    };

    b2.Fixture.prototype.SetFilterData=function(a){
    this.m_filter=a.Copy();
    if(!this.m_body)for(a=this.m_body.GetContactList();
                a;
               ){
        var b=a.contact,c=b.GetFixtureA(),d=b.GetFixtureB();
        (c==this||d==this)&&b.FlagForFiltering();
        a=a.next}
    };
    b2.Fixture.prototype.GetFilterData=function(){
    return this.m_filter.Copy()
    };
    b2.Fixture.prototype.GetBody=function(){
    return this.m_body
    };
    b2.Fixture.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Fixture.prototype.GetUserData=function(){
    return this.m_userData
    };

    b2.Fixture.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Fixture.prototype.TestPoint=function(a){
    return this.m_shape.TestPoint(this.m_body.GetTransform(),a)
    };
    b2.Fixture.prototype.RayCast=function(a,b){
    return this.m_shape.RayCast(a,b,this.m_body.GetTransform())
    };
    b2.Fixture.prototype.GetMassData=function(a){
    a==null&&(a=new b2.MassData);
    this.m_shape.ComputeMass(a,this.m_density);
    return a
    };
    b2.Fixture.prototype.SetDensity=function(a){
    this.m_density=a
    };
    b2.Fixture.prototype.GetDensity=function(){
    return this.m_density
    };

    b2.Fixture.prototype.GetFriction=function(){
    return this.m_friction
    };
    b2.Fixture.prototype.SetFriction=function(a){
    this.m_friction=a
    };
    b2.Fixture.prototype.GetRestitution=function(){
    return this.m_restitution
    };
    b2.Fixture.prototype.SetRestitution=function(a){
    this.m_restitution=a
    };
    b2.Fixture.prototype.GetAABB=function(){
    return this.m_aabb
    };
    b2.Fixture.prototype.m_massData=null;
    b2.Fixture.prototype.m_aabb=null;
    b2.Fixture.prototype.m_density=null;
    b2.Fixture.prototype.m_next=null;

    b2.Fixture.prototype.m_body=null;
    b2.Fixture.prototype.m_shape=null;
    b2.Fixture.prototype.m_friction=null;
    b2.Fixture.prototype.m_restitution=null;
    b2.Fixture.prototype.m_proxy=null;
    b2.Fixture.prototype.m_filter=new b2.FilterData;
    b2.Fixture.prototype.m_isSensor=null;
    b2.Fixture.prototype.m_userData=null;
    b2.DynamicTreeNode=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreeNode.prototype.__constructor=function(){

    };
    b2.DynamicTreeNode.prototype.__varz=function(){
    this.aabb=new b2.AABB
    };

    b2.DynamicTreeNode.prototype.IsLeaf=function(){
    return this.child1==null
    };
    b2.DynamicTreeNode.prototype.userData=null;
    b2.DynamicTreeNode.prototype.aabb=new b2.AABB;
    b2.DynamicTreeNode.prototype.parent=null;
    b2.DynamicTreeNode.prototype.child1=null;
    b2.DynamicTreeNode.prototype.child2=null;
    b2.BodyDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.BodyDef.prototype.__constructor=function(){
    this.userData=null;
    this.position.Set(0,0);
    this.angle=0;
    this.linearVelocity.Set(0,0);
    this.angularDamping=this.linearDamping=this.angularVelocity=0;
    this.awake=this.allowSleep=!0;
    this.bullet=this.fixedRotation=!1;
    this.type=b2.Body.b2_staticBody;
    this.active=!0;
    this.inertiaScale=1
    };
    b2.BodyDef.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.linearVelocity=new b2.Vec2
    };
    b2.BodyDef.prototype.type=0;
    b2.BodyDef.prototype.position=new b2.Vec2;

    b2.BodyDef.prototype.angle=null;
    b2.BodyDef.prototype.linearVelocity=new b2.Vec2;
    b2.BodyDef.prototype.angularVelocity=null;
    b2.BodyDef.prototype.linearDamping=null;
    b2.BodyDef.prototype.angularDamping=null;
    b2.BodyDef.prototype.allowSleep=null;
    b2.BodyDef.prototype.awake=null;
    b2.BodyDef.prototype.fixedRotation=null;
    b2.BodyDef.prototype.bullet=null;
    b2.BodyDef.prototype.active=null;
    b2.BodyDef.prototype.userData=null;
    b2.BodyDef.prototype.inertiaScale=null;

    b2.DynamicTreeBroadPhase=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreeBroadPhase.prototype.__constructor=function(){

    };
    b2.DynamicTreeBroadPhase.prototype.__varz=function(){
    this.m_tree=new b2.DynamicTree;
    this.m_moveBuffer=[];
    this.m_pairBuffer=[]
    };
    b2.DynamicTreeBroadPhase.prototype.BufferMove=function(a){
    this.m_moveBuffer[this.m_moveBuffer.length]=a
    };
    b2.DynamicTreeBroadPhase.prototype.UnBufferMove=function(a){
    this.m_moveBuffer.splice(this.m_moveBuffer.indexOf(a),1)
    };

    b2.DynamicTreeBroadPhase.prototype.ComparePairs=function(){
    return 0
    };
    b2.DynamicTreeBroadPhase.prototype.CreateProxy=function(a,b){
    var c=this.m_tree.CreateProxy(a,b);
    ++this.m_proxyCount;
    this.BufferMove(c);
    return c
    };
    b2.DynamicTreeBroadPhase.prototype.DestroyProxy=function(a){
    this.UnBufferMove(a);
    --this.m_proxyCount;
    this.m_tree.DestroyProxy(a)
    };
    b2.DynamicTreeBroadPhase.prototype.MoveProxy=function(a,b,c){
    this.m_tree.MoveProxy(a,b,c)&&this.BufferMove(a)
    };

    b2.DynamicTreeBroadPhase.prototype.TestOverlap=function(a,b){
    var c=this.m_tree.GetFatAABB(a),d=this.m_tree.GetFatAABB(b);
    return c.TestOverlap(d)
    };
    b2.DynamicTreeBroadPhase.prototype.GetUserData=function(a){
    return this.m_tree.GetUserData(a)
    };
    b2.DynamicTreeBroadPhase.prototype.GetFatAABB=function(a){
    return this.m_tree.GetFatAABB(a)
    };
    b2.DynamicTreeBroadPhase.prototype.GetProxyCount=function(){
    return this.m_proxyCount
    };

    b2.DynamicTreeBroadPhase.prototype.UpdatePairs=function(a){
    for(var b=this.m_pairCount=0,c=null;
        c=this.m_moveBuffer[b];
        b++){
        var d=this;
        this.m_tree.Query(function(a){
        if(a==c)return!0;
        d.m_pairCount==d.m_pairBuffer.length&&(d.m_pairBuffer[d.m_pairCount]=new b2.DynamicTreePair);
        var b=d.m_pairBuffer[d.m_pairCount];
        b.proxyA=a<c?a:c;
        b.proxyB=a>=c?a:c;
        ++d.m_pairCount;
        return!0},this.m_tree.GetFatAABB(c))}for(b=this.m_moveBuffer.length=0;
                             b<this.m_pairCount;
                            ){
            var e=this.m_pairBuffer[b],h=this.m_tree.GetUserData(e.proxyA),
            g=this.m_tree.GetUserData(e.proxyB);
            a(h,g);
            for(++b;
            b<this.m_pairCount;
               ){
            h=this.m_pairBuffer[b];
            if(h.proxyA!=e.proxyA||h.proxyB!=e.proxyB)break;
            ++b}}
    };
    b2.DynamicTreeBroadPhase.prototype.Query=function(a,b){
    this.m_tree.Query(a,b)
    };
    b2.DynamicTreeBroadPhase.prototype.RayCast=function(a,b){
    this.m_tree.RayCast(a,b)
    };
    b2.DynamicTreeBroadPhase.prototype.Validate=function(){

    };
    b2.DynamicTreeBroadPhase.prototype.Rebalance=function(a){
    this.m_tree.Rebalance(a)
    };
    b2.DynamicTreeBroadPhase.prototype.m_tree=new b2.DynamicTree;

    b2.DynamicTreeBroadPhase.prototype.m_proxyCount=0;
    b2.DynamicTreeBroadPhase.prototype.m_moveBuffer=[];
    b2.DynamicTreeBroadPhase.prototype.m_pairBuffer=[];
    b2.DynamicTreeBroadPhase.prototype.m_pairCount=0;
    b2.BroadPhase=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.BroadPhase.prototype.__constructor=function(a){
    var b=0;
    this.m_pairManager.Initialize(this);
    this.m_worldAABB=a;
    this.m_proxyCount=0;
    this.m_bounds=[];
    for(b=0;
        b<2;
        b++)this.m_bounds[b]=[];
    b=a.upperBound.y-a.lowerBound.y;
    this.m_quantizationFactor.x=b2.Settings.USHRT_MAX/(a.upperBound.x-a.lowerBound.x);
    this.m_quantizationFactor.y=b2.Settings.USHRT_MAX/b;
    this.m_timeStamp=1;
    this.m_queryResultCount=0
    };

    b2.BroadPhase.prototype.__varz=function(){
    this.m_pairManager=new b2.PairManager;
    this.m_proxyPool=[];
    this.m_querySortKeys=[];
    this.m_queryResults=[];
    this.m_quantizationFactor=new b2.Vec2
    };
    b2.BroadPhase.BinarySearch=function(a,b,c){
    var d=0;
    for(b-=1;
        d<=b;
       ){
        var e=Math.round((d+b)/2),h=a[e];
        if(h.value>c)b=e-1;
        else if(h.value<c)d=e+1;
        else return parseInt(e)}return parseInt(d)
    };
    b2.BroadPhase.s_validate=!1;
    b2.BroadPhase.b2_invalid=b2.Settings.USHRT_MAX;
    b2.BroadPhase.b2_nullEdge=b2.Settings.USHRT_MAX;

    b2.BroadPhase.prototype.ComputeBounds=function(a,b,c){
    var d=c.lowerBound.x,e=c.lowerBound.y,d=b2.Math.Min(d,this.m_worldAABB.upperBound.x),e=b2.Math.Min(e,this.m_worldAABB.upperBound.y),d=b2.Math.Max(d,this.m_worldAABB.lowerBound.x),e=b2.Math.Max(e,this.m_worldAABB.lowerBound.y),h=c.upperBound.x,c=c.upperBound.y,h=b2.Math.Min(h,this.m_worldAABB.upperBound.x),c=b2.Math.Min(c,this.m_worldAABB.upperBound.y),h=b2.Math.Max(h,this.m_worldAABB.lowerBound.x),c=b2.Math.Max(c,this.m_worldAABB.lowerBound.y);

    a[0]=parseInt(this.m_quantizationFactor.x*(d-this.m_worldAABB.lowerBound.x))&b2.Settings.USHRT_MAX-1;
    b[0]=parseInt(this.m_quantizationFactor.x*(h-this.m_worldAABB.lowerBound.x))%65535|1;
    a[1]=parseInt(this.m_quantizationFactor.y*(e-this.m_worldAABB.lowerBound.y))&b2.Settings.USHRT_MAX-1;
    b[1]=parseInt(this.m_quantizationFactor.y*(c-this.m_worldAABB.lowerBound.y))%65535|1
    };

    b2.BroadPhase.prototype.TestOverlapValidate=function(a,b){
    for(var c=0;
        c<2;
        ++c){
        var d=this.m_bounds[c],e=d[a.lowerBounds[c]],h=d[b.upperBounds[c]];
        if(e.value>h.value)return!1;
        e=d[a.upperBounds[c]];
        h=d[b.lowerBounds[c]];
        if(e.value<h.value)return!1}return!0
    };

    b2.BroadPhase.prototype.QueryAxis=function(a,b,c,d,e,h,g){
    for(var c=b2.BroadPhase.BinarySearch(e,h,c),d=b2.BroadPhase.BinarySearch(e,h,d),f=c;
        f<d;
        ++f)h=e[f],h.IsLower()&&this.IncrementOverlapCount(h.proxy);
    if(c>0)for(var f=c-1,h=e[f],i=h.stabbingCount;
           i;
          )h=e[f],h.IsLower()&&c<=h.proxy.upperBounds[g]&&(this.IncrementOverlapCount(h.proxy),--i),--f;
    a[0]=c;
    b[0]=d
    };

    b2.BroadPhase.prototype.IncrementOverlapCount=function(a){
    a.timeStamp<this.m_timeStamp?(a.timeStamp=this.m_timeStamp,a.overlapCount=1):(a.overlapCount=2,this.m_queryResults[this.m_queryResultCount]=a,++this.m_queryResultCount)
    };
    b2.BroadPhase.prototype.IncrementTimeStamp=function(){
    if(this.m_timeStamp==b2.Settings.USHRT_MAX){
        for(var a=0;
        a<this.m_proxyPool.length;
        ++a)this.m_proxyPool[a].timeStamp=0;
        this.m_timeStamp=1}else++this.m_timeStamp
    };

    b2.BroadPhase.prototype.InRange=function(a){
    var b,c,d,e;
    b=a.lowerBound.x;
    c=a.lowerBound.y;
    b-=this.m_worldAABB.upperBound.x;
    c-=this.m_worldAABB.upperBound.y;
    d=this.m_worldAABB.lowerBound.x;
    e=this.m_worldAABB.lowerBound.y;
    d-=a.upperBound.x;
    e-=a.upperBound.y;
    b=b2.Math.Max(b,d);
    c=b2.Math.Max(c,e);
    return b2.Math.Max(b,c)<0
    };

    b2.BroadPhase.prototype.CreateProxy=function(a,b){
    var c=0,d,e=0;
    d=0;
    if(!this.m_freeProxy){
        this.m_freeProxy=this.m_proxyPool[this.m_proxyCount]=new b2.Proxy;
        this.m_freeProxy.next=null;
        this.m_freeProxy.timeStamp=0;
        this.m_freeProxy.overlapCount=b2.BroadPhase.b2_invalid;
        this.m_freeProxy.userData=null;
        for(e=0;
        e<2;
        e++)d=this.m_proxyCount*2,this.m_bounds[e][d++]=new b2.Bound,this.m_bounds[e][d]=new b2.Bound}d=this.m_freeProxy;
    this.m_freeProxy=d.next;
    d.overlapCount=0;
    d.userData=b;
    var e=2*this.m_proxyCount,
    h=[],g=[];
    this.ComputeBounds(h,g,a);
    for(var f=0;
        f<2;
        ++f){
        var i=this.m_bounds[f],j=0,k=0,l=[];
        l.push(j);
        c=[];
        c.push(k);
        this.QueryAxis(l,c,h[f],g[f],i,e,f);
        j=l[0];
        k=c[0];
        i.splice(k,0,i[i.length-1]);
        i.length--;
        i.splice(j,0,i[i.length-1]);
        i.length--;
        ++k;
        l=i[j];
        c=i[k];
        l.value=h[f];
        l.proxy=d;
        c.value=g[f];
        c.proxy=d;
        var n=i[parseInt(j-1)];
        l.stabbingCount=j==0?0:n.stabbingCount;
        n=i[parseInt(k-1)];
        c.stabbingCount=n.stabbingCount;
        for(c=j;
        c<k;
        ++c)n=i[c],n.stabbingCount++;
        for(c=j;
        c<e+2;
        ++c)l=i[c],j=l.proxy,l.IsLower()?
        j.lowerBounds[f]=c:j.upperBounds[f]=c}++this.m_proxyCount;
    for(e=0;
        e<this.m_queryResultCount;
        ++e)this.m_pairManager.AddBufferedPair(d,this.m_queryResults[e]);
    this.m_queryResultCount=0;
    this.IncrementTimeStamp();
    return d
    };

    b2.BroadPhase.prototype.DestroyProxy=function(a){
    for(var b,c,d=2*this.m_proxyCount,e=0;
        e<2;
        ++e){
        var h=this.m_bounds[e],g=a.lowerBounds[e],f=a.upperBounds[e];
        b=h[g];
        var i=b.value;
        c=h[f];
        var j=c.value;
        h.splice(f,1);
        h.splice(g,1);
        h.push(b);
        h.push(c);
        c=d-2;
        for(var k=g;
        k<c;
        ++k){
        b=h[k];
        var l=b.proxy;
        b.IsLower()?l.lowerBounds[e]=k:l.upperBounds[e]=k}for(c=f-1;
                                      g<c;
                                      ++g)b=h[g],b.stabbingCount--;
        b=[];
        this.QueryAxis(b,b,i,j,h,d-2,e)}for(d=0;
                        d<this.m_queryResultCount;
                        ++d)this.m_pairManager.RemoveBufferedPair(a,
                                              this.m_queryResults[d]);
    this.m_queryResultCount=0;
    this.IncrementTimeStamp();
    a.userData=null;
    a.overlapCount=b2.BroadPhase.b2_invalid;
    a.lowerBounds[0]=b2.BroadPhase.b2_invalid;
    a.lowerBounds[1]=b2.BroadPhase.b2_invalid;
    a.upperBounds[0]=b2.BroadPhase.b2_invalid;
    a.upperBounds[1]=b2.BroadPhase.b2_invalid;
    a.next=this.m_freeProxy;
    this.m_freeProxy=a;
    --this.m_proxyCount
    };

    b2.BroadPhase.prototype.MoveProxy=function(a,b){
    var c,d=0,e=0,h=0,g,f;
    if(a!=null&&b.IsValid()!=!1){
        var i=2*this.m_proxyCount,j=new b2.BoundValues;
        this.ComputeBounds(j.lowerValues,j.upperValues,b);
        for(var k=new b2.BoundValues,e=0;
        e<2;
        ++e)g=this.m_bounds[e][a.lowerBounds[e]],k.lowerValues[e]=g.value,g=this.m_bounds[e][a.upperBounds[e]],k.upperValues[e]=g.value;
        for(e=0;
        e<2;
        ++e){
        var l=this.m_bounds[e],n=a.lowerBounds[e],m=a.upperBounds[e],o=j.lowerValues[e],p=j.upperValues[e];
        g=l[n];
        var q=o-g.value;
        g.value=
            o;
        g=l[m];
        var r=p-g.value;
        g.value=p;
        if(q<0)for(h=n;
               h>0&&o<l[parseInt(h-1)].value;
              )g=l[h],f=l[parseInt(h-1)],c=f.proxy,f.stabbingCount++,f.IsUpper()==!0?(this.TestOverlapBound(j,c)&&this.m_pairManager.AddBufferedPair(a,c),c=c.upperBounds,d=c[e],d++,c[e]=d,g.stabbingCount++):(c=c.lowerBounds,d=c[e],d++,c[e]=d,g.stabbingCount--),c=a.lowerBounds,d=c[e],d--,c[e]=d,g.Swap(f),--h;
        if(r>0)for(h=m;
               h<i-1&&l[parseInt(h+1)].value<=p;
              )g=l[h],f=l[parseInt(h+1)],c=f.proxy,f.stabbingCount++,f.IsLower()==!0?(this.TestOverlapBound(j,
                                                            c)&&this.m_pairManager.AddBufferedPair(a,c),c=c.lowerBounds,d=c[e],d--,c[e]=d,g.stabbingCount++):(c=c.upperBounds,d=c[e],d--,c[e]=d,g.stabbingCount--),c=a.upperBounds,d=c[e],d++,c[e]=d,g.Swap(f),h++;
        if(q>0)for(h=n;
               h<i-1&&l[parseInt(h+1)].value<=o;
              )g=l[h],f=l[parseInt(h+1)],c=f.proxy,f.stabbingCount--,f.IsUpper()?(this.TestOverlapBound(k,c)&&this.m_pairManager.RemoveBufferedPair(a,c),c=c.upperBounds,d=c[e],d--,c[e]=d,g.stabbingCount--):(c=c.lowerBounds,d=c[e],d--,c[e]=d,g.stabbingCount++),c=a.lowerBounds,
        d=c[e],d++,c[e]=d,g.Swap(f),h++;
        if(r<0)for(h=m;
               h>0&&p<l[parseInt(h-1)].value;
              )g=l[h],f=l[parseInt(h-1)],c=f.proxy,f.stabbingCount--,f.IsLower()==!0?(this.TestOverlapBound(k,c)&&this.m_pairManager.RemoveBufferedPair(a,c),c=c.lowerBounds,d=c[e],d++,c[e]=d,g.stabbingCount--):(c=c.upperBounds,d=c[e],d++,c[e]=d,g.stabbingCount++),c=a.upperBounds,d=c[e],d--,c[e]=d,g.Swap(f),h--}}
    };
    b2.BroadPhase.prototype.UpdatePairs=function(a){
    this.m_pairManager.Commit(a)
    };

    b2.BroadPhase.prototype.TestOverlap=function(a,b){
    if(a.lowerBounds[0]>b.upperBounds[0])return!1;
    if(b.lowerBounds[0]>a.upperBounds[0])return!1;
    if(a.lowerBounds[1]>b.upperBounds[1])return!1;
    if(b.lowerBounds[1]>a.upperBounds[1])return!1;
    return!0
    };
    b2.BroadPhase.prototype.GetUserData=function(a){
    return a.userData
    };

    b2.BroadPhase.prototype.GetFatAABB=function(a){
    var b=new b2.AABB;
    b.lowerBound.x=this.m_worldAABB.lowerBound.x+this.m_bounds[0][a.lowerBounds[0]].value/this.m_quantizationFactor.x;
    b.lowerBound.y=this.m_worldAABB.lowerBound.y+this.m_bounds[1][a.lowerBounds[1]].value/this.m_quantizationFactor.y;
    b.upperBound.x=this.m_worldAABB.lowerBound.x+this.m_bounds[0][a.upperBounds[0]].value/this.m_quantizationFactor.x;
    b.upperBound.y=this.m_worldAABB.lowerBound.y+this.m_bounds[1][a.upperBounds[1]].value/this.m_quantizationFactor.y;

    return b
    };
    b2.BroadPhase.prototype.GetProxyCount=function(){
    return this.m_proxyCount
    };
    b2.BroadPhase.prototype.Query=function(a,b){
    var c=[],d=[];
    this.ComputeBounds(c,d,b);
    var e=[];
    e.push(0);
    var h=[];
    h.push(0);
    this.QueryAxis(e,h,c[0],d[0],this.m_bounds[0],2*this.m_proxyCount,0);
    this.QueryAxis(e,h,c[1],d[1],this.m_bounds[1],2*this.m_proxyCount,1);
    for(c=0;
        c<this.m_queryResultCount;
        ++c)if(!a(this.m_queryResults[c]))break;
    this.m_queryResultCount=0;
    this.IncrementTimeStamp()
    };

    b2.BroadPhase.prototype.Validate=function(){
    for(var a=0;
        a<2;
        ++a)for(var b=this.m_bounds[a],c=2*this.m_proxyCount,d=0,e=0;
            e<c;
            ++e)b[e].IsLower()==!0?d++:d--
    };
    b2.BroadPhase.prototype.Rebalance=function(){

    };

    b2.BroadPhase.prototype.RayCast=function(a,b){
    var c=new b2.RayCastInput;
    c.p1.SetV(b.p1);
    c.p2.SetV(b.p2);
    c.maxFraction=b.maxFraction;
    var d=(b.p2.x-b.p1.x)*this.m_quantizationFactor.x,e=(b.p2.y-b.p1.y)*this.m_quantizationFactor.y,h=d<-Number.MIN_VALUE?-1:d>Number.MIN_VALUE?1:0,g=e<-Number.MIN_VALUE?-1:e>Number.MIN_VALUE?1:0,f=this.m_quantizationFactor.x*(b.p1.x-this.m_worldAABB.lowerBound.x),i=this.m_quantizationFactor.y*(b.p1.y-this.m_worldAABB.lowerBound.y),j=[],k=[];
    j[0]=parseInt(f)&b2.Settings.USHRT_MAX-
        1;
    j[1]=parseInt(i)&b2.Settings.USHRT_MAX-1;
    k[0]=j[0]+1;
    k[1]=j[1]+1;
    var l=0,n=0,n=[];
    n.push(0);
    var m=[];
    m.push(0);
    this.QueryAxis(n,m,j[0],k[0],this.m_bounds[0],2*this.m_proxyCount,0);
    l=h>=0?m[0]-1:n[0];
    this.QueryAxis(n,m,j[1],k[1],this.m_bounds[1],2*this.m_proxyCount,1);
    n=g>=0?m[0]-1:n[0];
    for(j=0;
        j<this.m_queryResultCount;
        j++)c.maxFraction=a(this.m_queryResults[j],c);
    for(;
        ;
       ){
        m=k=0;
        l+=h>=0?1:-1;
        if(l<0||l>=this.m_proxyCount*2)break;
        h!=0&&(k=(this.m_bounds[0][l].value-f)/d);
        n+=g>=0?1:-1;
        if(n<0||n>=this.m_proxyCount*
           2)break;
        for(g!=0&&(m=(this.m_bounds[1][n].value-i)/e);
        ;
           )if(g==0||h!=0&&k<m){
           if(k>c.maxFraction)break;
           if(h>0?this.m_bounds[0][l].IsLower():this.m_bounds[0][l].IsUpper())if(j=this.m_bounds[0][l].proxy,g>=0){
               if(j.lowerBounds[1]<=n-1&&j.upperBounds[1]>=n)c.maxFraction=a(j,c)}else if(j.lowerBounds[1]<=n&&j.upperBounds[1]>=n+1)c.maxFraction=a(j,c);
           if(c.maxFraction==0)break;
           if(h>0){
               if(l++,l==this.m_proxyCount*2)break}else if(l--,l<0)break;
           k=(this.m_bounds[0][l].value-f)/d}else{
               if(m>c.maxFraction)break;
               if(g>
              0?this.m_bounds[1][n].IsLower():this.m_bounds[1][n].IsUpper())if(j=this.m_bounds[1][n].proxy,h>=0){
                  if(j.lowerBounds[0]<=l-1&&j.upperBounds[0]>=l)c.maxFraction=a(j,c)}else if(j.lowerBounds[0]<=l&&j.upperBounds[0]>=l+1)c.maxFraction=a(j,c);
               if(c.maxFraction==0)break;
               if(g>0){
               if(n++,n==this.m_proxyCount*2)break}else if(n--,n<0)break;
               m=(this.m_bounds[1][n].value-i)/e}break}this.m_queryResultCount=0;
    this.IncrementTimeStamp()
    };

    b2.BroadPhase.prototype.TestOverlapBound=function(a,b){
    for(var c=0;
        c<2;
        ++c){
        var d=this.m_bounds[c],e=d[b.upperBounds[c]];
        if(a.lowerValues[c]>e.value)return!1;
        e=d[b.lowerBounds[c]];
        if(a.upperValues[c]<e.value)return!1}return!0
    };
    b2.BroadPhase.prototype.m_pairManager=new b2.PairManager;
    b2.BroadPhase.prototype.m_proxyPool=[];
    b2.BroadPhase.prototype.m_freeProxy=null;
    b2.BroadPhase.prototype.m_bounds=null;
    b2.BroadPhase.prototype.m_querySortKeys=[];
    b2.BroadPhase.prototype.m_queryResults=[];

    b2.BroadPhase.prototype.m_queryResultCount=0;
    b2.BroadPhase.prototype.m_worldAABB=null;
    b2.BroadPhase.prototype.m_quantizationFactor=new b2.Vec2;
    b2.BroadPhase.prototype.m_proxyCount=0;
    b2.BroadPhase.prototype.m_timeStamp=0;
    b2.Manifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Manifold.prototype.__constructor=function(){
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.ManifoldPoint;
    this.m_localPlaneNormal=new b2.Vec2;
    this.m_localPoint=new b2.Vec2
    };
    b2.Manifold.prototype.__varz=function(){

    };
    b2.Manifold.e_circles=1;
    b2.Manifold.e_faceA=2;
    b2.Manifold.e_faceB=4;

    b2.Manifold.prototype.Reset=function(){
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a].Reset();
    this.m_localPlaneNormal.SetZero();
    this.m_localPoint.SetZero();
    this.m_pointCount=this.m_type=0
    };
    b2.Manifold.prototype.Set=function(a){
    this.m_pointCount=a.m_pointCount;
    for(var b=0;
        b<b2.Settings.b2_maxManifoldPoints;
        b++)this.m_points[b].Set(a.m_points[b]);
    this.m_localPlaneNormal.SetV(a.m_localPlaneNormal);
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_type=a.m_type
    };

    b2.Manifold.prototype.Copy=function(){
    var a=new b2.Manifold;
    a.Set(this);
    return a
    };
    b2.Manifold.prototype.m_points=null;
    b2.Manifold.prototype.m_localPlaneNormal=null;
    b2.Manifold.prototype.m_localPoint=null;
    b2.Manifold.prototype.m_type=0;
    b2.Manifold.prototype.m_pointCount=0;
    b2.CircleShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.CircleShape.prototype,b2.Shape.prototype);
    b2.CircleShape.prototype._super=b2.Shape.prototype;

    b2.CircleShape.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[]);
    this.m_type=b2.Shape.e_circleShape;
    this.m_radius=a
    };
    b2.CircleShape.prototype.__varz=function(){
    this.m_p=new b2.Vec2
    };
    b2.CircleShape.prototype.Copy=function(){
    var a=new b2.CircleShape;
    a.Set(this);
    return a
    };
    b2.CircleShape.prototype.Set=function(a){
    this._super.Set.apply(this,[a]);
    isInstanceOf(a,b2.CircleShape)&&this.m_p.SetV(a.m_p)
    };

    b2.CircleShape.prototype.TestPoint=function(a,b){
    var c=a.R,d=a.position.x+(c.col1.x*this.m_p.x+c.col2.x*this.m_p.y),c=a.position.y+(c.col1.y*this.m_p.x+c.col2.y*this.m_p.y),d=b.x-d,c=b.y-c;
    return d*d+c*c<=this.m_radius*this.m_radius
    };

    b2.CircleShape.prototype.RayCast=function(a,b,c){
    var d=c.R,e=b.p1.x-(c.position.x+(d.col1.x*this.m_p.x+d.col2.x*this.m_p.y)),c=b.p1.y-(c.position.y+(d.col1.y*this.m_p.x+d.col2.y*this.m_p.y)),d=b.p2.x-b.p1.x,h=b.p2.y-b.p1.y,g=e*d+c*h,f=d*d+h*h,i=g*g-f*(e*e+c*c-this.m_radius*this.m_radius);
    if(i<0||f<Number.MIN_VALUE)return!1;
    g=-(g+Math.sqrt(i));
    if(0<=g&&g<=b.maxFraction*f)return g/=f,a.fraction=g,a.normal.x=e+g*d,a.normal.y=c+g*h,a.normal.Normalize(),!0;
    return!1
    };

    b2.CircleShape.prototype.ComputeAABB=function(a,b){
    var c=b.R,d=b.position.x+(c.col1.x*this.m_p.x+c.col2.x*this.m_p.y),c=b.position.y+(c.col1.y*this.m_p.x+c.col2.y*this.m_p.y);
    a.lowerBound.Set(d-this.m_radius,c-this.m_radius);
    a.upperBound.Set(d+this.m_radius,c+this.m_radius)
    };
    b2.CircleShape.prototype.ComputeMass=function(a,b){
    a.mass=b*b2.Settings.b2_pi*this.m_radius*this.m_radius;
    a.center.SetV(this.m_p);
    a.I=a.mass*(0.5*this.m_radius*this.m_radius+(this.m_p.x*this.m_p.x+this.m_p.y*this.m_p.y))
    };

    b2.CircleShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    var c=b2.Math.MulX(c,this.m_p),e=-(b2.Math.Dot(a,c)-b);
    if(e<-this.m_radius+Number.MIN_VALUE)return 0;
    if(e>this.m_radius)return d.SetV(c),Math.PI*this.m_radius*this.m_radius;
    var b=this.m_radius*this.m_radius,h=e*e,e=b*(Math.asin(e/this.m_radius)+Math.PI/2)+e*Math.sqrt(b-h),b=-2/3*Math.pow(b-h,1.5)/e;
    d.x=c.x+a.x*b;
    d.y=c.y+a.y*b;
    return e
    };
    b2.CircleShape.prototype.GetLocalPosition=function(){
    return this.m_p
    };

    b2.CircleShape.prototype.SetLocalPosition=function(a){
    this.m_p.SetV(a)
    };
    b2.CircleShape.prototype.GetRadius=function(){
    return this.m_radius
    };
    b2.CircleShape.prototype.SetRadius=function(a){
    this.m_radius=a
    };
    b2.CircleShape.prototype.m_p=new b2.Vec2;
    b2.Joint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Joint.prototype.__constructor=function(a){
    b2.Settings.b2Assert(a.bodyA!=a.bodyB);
    this.m_type=a.type;
    this.m_next=this.m_prev=null;
    this.m_bodyA=a.bodyA;
    this.m_bodyB=a.bodyB;
    this.m_collideConnected=a.collideConnected;
    this.m_islandFlag=!1;
    this.m_userData=a.userData
    };
    b2.Joint.prototype.__varz=function(){
    this.m_edgeA=new b2.JointEdge;
    this.m_edgeB=new b2.JointEdge;
    this.m_localCenterA=new b2.Vec2;
    this.m_localCenterB=new b2.Vec2
    };

    b2.Joint.Create=function(a){
    var b=null;
    switch(a.type){
    case b2.Joint.e_distanceJoint:b=new b2.DistanceJoint(a);
        break;
    case b2.Joint.e_mouseJoint:b=new b2.MouseJoint(a);
        break;
    case b2.Joint.e_prismaticJoint:b=new b2.PrismaticJoint(a);
        break;
    case b2.Joint.e_revoluteJoint:b=new b2.RevoluteJoint(a);
        break;
    case b2.Joint.e_pulleyJoint:b=new b2.PulleyJoint(a);
        break;
    case b2.Joint.e_gearJoint:b=new b2.GearJoint(a);
        break;
    case b2.Joint.e_lineJoint:b=new b2.LineJoint(a);
        break;
    case b2.Joint.e_weldJoint:b=new b2.WeldJoint(a);

        break;
    case b2.Joint.e_frictionJoint:b=new b2.FrictionJoint(a)}return b
    };
    b2.Joint.Destroy=function(){

    };
    b2.Joint.e_unknownJoint=0;
    b2.Joint.e_revoluteJoint=1;
    b2.Joint.e_prismaticJoint=2;
    b2.Joint.e_distanceJoint=3;
    b2.Joint.e_pulleyJoint=4;
    b2.Joint.e_mouseJoint=5;
    b2.Joint.e_gearJoint=6;
    b2.Joint.e_lineJoint=7;
    b2.Joint.e_weldJoint=8;
    b2.Joint.e_frictionJoint=9;
    b2.Joint.e_inactiveLimit=0;
    b2.Joint.e_atLowerLimit=1;
    b2.Joint.e_atUpperLimit=2;
    b2.Joint.e_equalLimits=3;

    b2.Joint.prototype.InitVelocityConstraints=function(){

    };
    b2.Joint.prototype.SolveVelocityConstraints=function(){

    };
    b2.Joint.prototype.FinalizeVelocityConstraints=function(){

    };
    b2.Joint.prototype.SolvePositionConstraints=function(){
    return!1
    };
    b2.Joint.prototype.GetType=function(){
    return this.m_type
    };
    b2.Joint.prototype.GetAnchorA=function(){
    return null
    };
    b2.Joint.prototype.GetAnchorB=function(){
    return null
    };
    b2.Joint.prototype.GetReactionForce=function(){
    return null
    };

    b2.Joint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.Joint.prototype.GetBodyA=function(){
    return this.m_bodyA
    };
    b2.Joint.prototype.GetBodyB=function(){
    return this.m_bodyB
    };
    b2.Joint.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Joint.prototype.GetUserData=function(){
    return this.m_userData
    };
    b2.Joint.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Joint.prototype.IsActive=function(){
    return this.m_bodyA.IsActive()&&this.m_bodyB.IsActive()
    };
    b2.Joint.prototype.m_type=0;

    b2.Joint.prototype.m_prev=null;
    b2.Joint.prototype.m_next=null;
    b2.Joint.prototype.m_edgeA=new b2.JointEdge;
    b2.Joint.prototype.m_edgeB=new b2.JointEdge;
    b2.Joint.prototype.m_bodyA=null;
    b2.Joint.prototype.m_bodyB=null;
    b2.Joint.prototype.m_islandFlag=null;
    b2.Joint.prototype.m_collideConnected=null;
    b2.Joint.prototype.m_userData=null;
    b2.Joint.prototype.m_localCenterA=new b2.Vec2;
    b2.Joint.prototype.m_localCenterB=new b2.Vec2;
    b2.Joint.prototype.m_invMassA=null;
    b2.Joint.prototype.m_invMassB=null;

    b2.Joint.prototype.m_invIA=null;
    b2.Joint.prototype.m_invIB=null;
    b2.LineJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.LineJoint.prototype,b2.Joint.prototype);
    b2.LineJoint.prototype._super=b2.Joint.prototype;

    b2.LineJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x=-this.m_localXAxis1.y;
    this.m_localYAxis1.y=this.m_localXAxis1.x;
    this.m_impulse.SetZero();
    this.m_motorImpulse=this.m_motorMass=0;
    this.m_lowerTranslation=a.lowerTranslation;
    this.m_upperTranslation=a.upperTranslation;
    this.m_maxMotorForce=a.maxMotorForce;
    this.m_motorSpeed=
        a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
    };
    b2.LineJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_localXAxis1=new b2.Vec2;
    this.m_localYAxis1=new b2.Vec2;
    this.m_axis=new b2.Vec2;
    this.m_perp=new b2.Vec2;
    this.m_K=new b2.Mat22;
    this.m_impulse=new b2.Vec2
    };

    b2.LineJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    this.m_localCenterA.SetV(b.GetLocalCenter());
    this.m_localCenterB.SetV(c.GetLocalCenter());
    var h=b.GetTransform();
    c.GetTransform();
    d=b.m_xf.R;
    var g=this.m_localAnchor1.x-this.m_localCenterA.x,f=this.m_localAnchor1.y-this.m_localCenterA.y;
    e=d.col1.x*g+d.col2.x*f;
    f=d.col1.y*g+d.col2.y*f;
    g=e;
    d=c.m_xf.R;
    var i=this.m_localAnchor2.x-this.m_localCenterB.x,j=this.m_localAnchor2.y-this.m_localCenterB.y;
    e=d.col1.x*
        i+d.col2.x*j;
    j=d.col1.y*i+d.col2.y*j;
    i=e;
    d=c.m_sweep.c.x+i-b.m_sweep.c.x-g;
    e=c.m_sweep.c.y+j-b.m_sweep.c.y-f;
    this.m_invMassA=b.m_invMass;
    this.m_invMassB=c.m_invMass;
    this.m_invIA=b.m_invI;
    this.m_invIB=c.m_invI;
    this.m_axis.SetV(b2.Math.MulMV(h.R,this.m_localXAxis1));
    this.m_a1=(d+g)*this.m_axis.y-(e+f)*this.m_axis.x;
    this.m_a2=i*this.m_axis.y-j*this.m_axis.x;
    this.m_motorMass=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_a1*this.m_a1+this.m_invIB*this.m_a2*this.m_a2;
    this.m_motorMass=this.m_motorMass>
        Number.MIN_VALUE?1/this.m_motorMass:0;
    this.m_perp.SetV(b2.Math.MulMV(h.R,this.m_localYAxis1));
    this.m_s1=(d+g)*this.m_perp.y-(e+f)*this.m_perp.x;
    this.m_s2=i*this.m_perp.y-j*this.m_perp.x;
    h=this.m_invMassA;
    g=this.m_invMassB;
    f=this.m_invIA;
    i=this.m_invIB;
    this.m_K.col1.x=h+g+f*this.m_s1*this.m_s1+i*this.m_s2*this.m_s2;
    this.m_K.col1.y=f*this.m_s1*this.m_a1+i*this.m_s2*this.m_a2;
    this.m_K.col2.x=this.m_K.col1.y;
    this.m_K.col2.y=h+g+f*this.m_a1*this.m_a1+i*this.m_a2*this.m_a2;
    if(this.m_enableLimit)if(d=this.m_axis.x*
                 d+this.m_axis.y*e,b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop)this.m_limitState=b2.Joint.e_equalLimits;
    else if(d<=this.m_lowerTranslation){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_limitState=b2.Joint.e_atLowerLimit,this.m_impulse.y=0}else if(d>=this.m_upperTranslation){
        if(this.m_limitState!=b2.Joint.e_atUpperLimit)this.m_limitState=b2.Joint.e_atUpperLimit,this.m_impulse.y=0}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.y=0;

    else this.m_limitState=b2.Joint.e_inactiveLimit;
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=a.dtRatio,a=this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.x,d=this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.y,e=this.m_impulse.x*this.m_s1+(this.m_motorImpulse+this.m_impulse.y)*this.m_a1,h=this.m_impulse.x*this.m_s2+(this.m_motorImpulse+this.m_impulse.y)*
            this.m_a2,b.m_linearVelocity.x-=this.m_invMassA*a,b.m_linearVelocity.y-=this.m_invMassA*d,b.m_angularVelocity-=this.m_invIA*e,c.m_linearVelocity.x+=this.m_invMassB*a,c.m_linearVelocity.y+=this.m_invMassB*d,c.m_angularVelocity+=this.m_invIB*h):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.LineJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d=b.m_linearVelocity,e=b.m_angularVelocity,h=c.m_linearVelocity,g=c.m_angularVelocity,f,i,j;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)j=this.m_motorMass*(this.m_motorSpeed-(this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e)),f=this.m_motorImpulse,a=a.dt*this.m_maxMotorForce,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+j,-a,a),j=this.m_motorImpulse-f,f=
        j*this.m_axis.x,a=j*this.m_axis.y,i=j*this.m_a1,j*=this.m_a2,d.x-=this.m_invMassA*f,d.y-=this.m_invMassA*a,e-=this.m_invIA*i,h.x+=this.m_invMassB*f,h.y+=this.m_invMassB*a,g+=this.m_invIB*j;
    a=this.m_perp.x*(h.x-d.x)+this.m_perp.y*(h.y-d.y)+this.m_s2*g-this.m_s1*e;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        i=this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e;
        f=this.m_impulse.Copy();
        j=this.m_K.Solve(new b2.Vec2,-a,-i);
        this.m_impulse.Add(j);
        if(this.m_limitState==
           b2.Joint.e_atLowerLimit)this.m_impulse.y=b2.Math.Max(this.m_impulse.y,0);
        else if(this.m_limitState==b2.Joint.e_atUpperLimit)this.m_impulse.y=b2.Math.Min(this.m_impulse.y,0);
        a=-a-(this.m_impulse.y-f.y)*this.m_K.col2.x;
        this.m_impulse.x=this.m_K.col1.x!=0?a/this.m_K.col1.x+f.x:f.x;
        j.x=this.m_impulse.x-f.x;
        j.y=this.m_impulse.y-f.y;
        f=j.x*this.m_perp.x+j.y*this.m_axis.x;
        a=j.x*this.m_perp.y+j.y*this.m_axis.y;
        i=j.x*this.m_s1+j.y*this.m_a1;
        j=j.x*this.m_s2+j.y*this.m_a2}else j=this.m_K.col1.x!=0?-a/this.m_K.col1.x:
        0,this.m_impulse.x+=j,f=j*this.m_perp.x,a=j*this.m_perp.y,i=j*this.m_s1,j*=this.m_s2;
    d.x-=this.m_invMassA*f;
    d.y-=this.m_invMassA*a;
    e-=this.m_invIA*i;
    h.x+=this.m_invMassB*f;
    h.y+=this.m_invMassB*a;
    g+=this.m_invIB*j;
    b.m_linearVelocity.SetV(d);
    b.m_angularVelocity=e;
    c.m_linearVelocity.SetV(h);
    c.m_angularVelocity=g
    };

    b2.LineJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.m_sweep.c,d=a.m_sweep.a,e=b.m_sweep.c,h=b.m_sweep.a,g,f,i,j,k,l=0,n=0;
    i=!1;
    var m=0,o=b2.Mat22.FromAngle(d);
    j=b2.Mat22.FromAngle(h);
    g=o;
    var n=this.m_localAnchor1.x-this.m_localCenterA.x,p=this.m_localAnchor1.y-this.m_localCenterA.y;
    f=g.col1.x*n+g.col2.x*p;
    p=g.col1.y*n+g.col2.y*p;
    n=f;
    g=j;
    j=this.m_localAnchor2.x-this.m_localCenterB.x;
    k=this.m_localAnchor2.y-this.m_localCenterB.y;
    f=g.col1.x*j+g.col2.x*k;
    k=
        g.col1.y*j+g.col2.y*k;
    j=f;
    g=e.x+j-c.x-n;
    f=e.y+k-c.y-p;
    if(this.m_enableLimit){
        this.m_axis=b2.Math.MulMV(o,this.m_localXAxis1);
        this.m_a1=(g+n)*this.m_axis.y-(f+p)*this.m_axis.x;
        this.m_a2=j*this.m_axis.y-k*this.m_axis.x;
        var q=this.m_axis.x*g+this.m_axis.y*f;
        b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop?(m=b2.Math.Clamp(q,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection),l=b2.Math.Abs(q),i=!0):q<=this.m_lowerTranslation?(m=b2.Math.Clamp(q-
                                                                                                                                   this.m_lowerTranslation+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),l=this.m_lowerTranslation-q,i=!0):q>=this.m_upperTranslation&&(m=b2.Math.Clamp(q-this.m_upperTranslation+b2.Settings.b2_linearSlop,0,b2.Settings.b2_maxLinearCorrection),l=q-this.m_upperTranslation,i=!0)}this.m_perp=b2.Math.MulMV(o,this.m_localYAxis1);
    this.m_s1=(g+n)*this.m_perp.y-(f+p)*this.m_perp.x;
    this.m_s2=j*this.m_perp.y-k*this.m_perp.x;
    o=new b2.Vec2;
    p=this.m_perp.x*g+this.m_perp.y*f;
    l=b2.Math.Max(l,b2.Math.Abs(p));

    n=0;
    i?(i=this.m_invMassA,j=this.m_invMassB,k=this.m_invIA,g=this.m_invIB,this.m_K.col1.x=i+j+k*this.m_s1*this.m_s1+g*this.m_s2*this.m_s2,this.m_K.col1.y=k*this.m_s1*this.m_a1+g*this.m_s2*this.m_a2,this.m_K.col2.x=this.m_K.col1.y,this.m_K.col2.y=i+j+k*this.m_a1*this.m_a1+g*this.m_a2*this.m_a2,this.m_K.Solve(o,-p,-m)):(i=this.m_invMassA,j=this.m_invMassB,k=this.m_invIA,g=this.m_invIB,m=i+j+k*this.m_s1*this.m_s1+g*this.m_s2*this.m_s2,o.x=m!=0?-p/m:0,o.y=0);
    m=o.x*this.m_perp.x+o.y*this.m_axis.x;
    i=o.x*
        this.m_perp.y+o.y*this.m_axis.y;
    p=o.x*this.m_s1+o.y*this.m_a1;
    o=o.x*this.m_s2+o.y*this.m_a2;
    c.x-=this.m_invMassA*m;
    c.y-=this.m_invMassA*i;
    d-=this.m_invIA*p;
    e.x+=this.m_invMassB*m;
    e.y+=this.m_invMassB*i;
    h+=this.m_invIB*o;
    a.m_sweep.a=d;
    b.m_sweep.a=h;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return l<=b2.Settings.b2_linearSlop&&n<=b2.Settings.b2_angularSlop
    };
    b2.LineJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };

    b2.LineJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2.LineJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*(this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.x),a*(this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.y))
    };
    b2.LineJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.y
    };

    b2.LineJoint.prototype.GetJointTranslation=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.GetWorldPoint(this.m_localAnchor1),d=b.GetWorldPoint(this.m_localAnchor2),b=d.x-c.x,c=d.y-c.y,a=a.GetWorldVector(this.m_localXAxis1);
    return a.x*b+a.y*c
    };

    b2.LineJoint.prototype.GetJointSpeed=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h;
    c=b.m_sweep.c.x+g-(a.m_sweep.c.x+d);
    var h=b.m_sweep.c.y+f-(a.m_sweep.c.y+e),i=a.GetWorldVector(this.m_localXAxis1),
    j=a.m_linearVelocity,k=b.m_linearVelocity,a=a.m_angularVelocity,b=b.m_angularVelocity;
    return c*-a*i.y+h*a*i.x+(i.x*(k.x+-b*f-j.x- -a*e)+i.y*(k.y+b*g-j.y-a*d))
    };
    b2.LineJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };
    b2.LineJoint.prototype.EnableLimit=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit=a
    };
    b2.LineJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerTranslation
    };
    b2.LineJoint.prototype.GetUpperLimit=function(){
    return this.m_upperTranslation
    };

    b2.LineJoint.prototype.SetLimits=function(a,b){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation=a;
    this.m_upperTranslation=b
    };
    b2.LineJoint.prototype.IsMotorEnabled=function(){
    return this.m_enableMotor
    };
    b2.LineJoint.prototype.EnableMotor=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor=a
    };
    b2.LineJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };

    b2.LineJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.LineJoint.prototype.SetMaxMotorForce=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce=a
    };
    b2.LineJoint.prototype.GetMaxMotorForce=function(){
    return this.m_maxMotorForce
    };
    b2.LineJoint.prototype.GetMotorForce=function(){
    return this.m_motorImpulse
    };
    b2.LineJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.LineJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.LineJoint.prototype.m_localXAxis1=new b2.Vec2;

    b2.LineJoint.prototype.m_localYAxis1=new b2.Vec2;
    b2.LineJoint.prototype.m_axis=new b2.Vec2;
    b2.LineJoint.prototype.m_perp=new b2.Vec2;
    b2.LineJoint.prototype.m_s1=null;
    b2.LineJoint.prototype.m_s2=null;
    b2.LineJoint.prototype.m_a1=null;
    b2.LineJoint.prototype.m_a2=null;
    b2.LineJoint.prototype.m_K=new b2.Mat22;
    b2.LineJoint.prototype.m_impulse=new b2.Vec2;
    b2.LineJoint.prototype.m_motorMass=null;
    b2.LineJoint.prototype.m_motorImpulse=null;
    b2.LineJoint.prototype.m_lowerTranslation=null;

    b2.LineJoint.prototype.m_upperTranslation=null;
    b2.LineJoint.prototype.m_maxMotorForce=null;
    b2.LineJoint.prototype.m_motorSpeed=null;
    b2.LineJoint.prototype.m_enableLimit=null;
    b2.LineJoint.prototype.m_enableMotor=null;
    b2.LineJoint.prototype.m_limitState=0;
    b2.ContactSolver=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactSolver.prototype.__constructor=function(){

    };
    b2.ContactSolver.prototype.__varz=function(){
    this.m_step=new b2.TimeStep;
    this.m_constraints=[]
    };

    b2.ContactSolver.s_worldManifold=new b2.WorldManifold;
    b2.ContactSolver.s_psm=new b2.PositionSolverManifold;

    b2.ContactSolver.prototype.Initialize=function(a,b,c,d){
    var e;
    this.m_step.Set(a);
    this.m_allocator=d;
    a=0;
    for(this.m_constraintCount=c;
        this.m_constraints.length<this.m_constraintCount;
       )this.m_constraints[this.m_constraints.length]=new b2.ContactConstraint;
    for(a=0;
        a<c;
        ++a){
        e=b[a];
        var d=e.m_fixtureA,h=e.m_fixtureB,g=d.m_shape.m_radius,f=h.m_shape.m_radius,i=d.m_body,j=h.m_body,k=e.GetManifold(),l=b2.Settings.b2MixFriction(d.GetFriction(),h.GetFriction()),n=b2.Settings.b2MixRestitution(d.GetRestitution(),
                                                                                                                h.GetRestitution()),m=i.m_linearVelocity.x,o=i.m_linearVelocity.y,p=j.m_linearVelocity.x,q=j.m_linearVelocity.y,r=i.m_angularVelocity,y=j.m_angularVelocity;
        b2.Settings.b2Assert(k.m_pointCount>0);
        b2.ContactSolver.s_worldManifold.Initialize(k,i.m_xf,g,j.m_xf,f);
        h=b2.ContactSolver.s_worldManifold.m_normal.x;
        e=b2.ContactSolver.s_worldManifold.m_normal.y;
        d=this.m_constraints[a];
        d.bodyA=i;
        d.bodyB=j;
        d.manifold=k;
        d.normal.x=h;
        d.normal.y=e;
        d.pointCount=k.m_pointCount;
        d.friction=l;
        d.restitution=n;
        d.localPlaneNormal.x=
        k.m_localPlaneNormal.x;
        d.localPlaneNormal.y=k.m_localPlaneNormal.y;
        d.localPoint.x=k.m_localPoint.x;
        d.localPoint.y=k.m_localPoint.y;
        d.radius=g+f;
        d.type=k.m_type;
        for(g=0;
        g<d.pointCount;
        ++g){
        l=k.m_points[g];
        f=d.points[g];
        f.normalImpulse=l.m_normalImpulse;
        f.tangentImpulse=l.m_tangentImpulse;
        f.localPoint.SetV(l.m_localPoint);
        var l=f.rA.x=b2.ContactSolver.s_worldManifold.m_points[g].x-i.m_sweep.c.x,n=f.rA.y=b2.ContactSolver.s_worldManifold.m_points[g].y-i.m_sweep.c.y,v=f.rB.x=b2.ContactSolver.s_worldManifold.m_points[g].x-
            j.m_sweep.c.x,x=f.rB.y=b2.ContactSolver.s_worldManifold.m_points[g].y-j.m_sweep.c.y,s=l*e-n*h,u=v*e-x*h;
        s*=s;
        u*=u;
        f.normalMass=1/(i.m_invMass+j.m_invMass+i.m_invI*s+j.m_invI*u);
        var w=i.m_mass*i.m_invMass+j.m_mass*j.m_invMass;
        w+=i.m_mass*i.m_invI*s+j.m_mass*j.m_invI*u;
        f.equalizedMass=1/w;
        u=e;
        w=-h;
        s=l*w-n*u;
        u=v*w-x*u;
        s*=s;
        u*=u;
        f.tangentMass=1/(i.m_invMass+j.m_invMass+i.m_invI*s+j.m_invI*u);
        f.velocityBias=0;
        l=d.normal.x*(p+-y*x-m- -r*n)+d.normal.y*(q+y*v-o-r*l);
        l<-b2.Settings.b2_velocityThreshold&&(f.velocityBias+=
                              -d.restitution*l)}if(d.pointCount==2)q=d.points[0],p=d.points[1],k=i.m_invMass,i=i.m_invI,m=j.m_invMass,j=j.m_invI,o=q.rA.x*e-q.rA.y*h,q=q.rB.x*e-q.rB.y*h,r=p.rA.x*e-p.rA.y*h,p=p.rB.x*e-p.rB.y*h,h=k+m+i*o*o+j*q*q,e=k+m+i*r*r+j*p*p,j=k+m+i*o*r+j*q*p,h*h<100*(h*e-j*j)?(d.K.col1.Set(h,j),d.K.col2.Set(j,e),d.K.GetInverse(d.normalMass)):d.pointCount=1}
    };

    b2.ContactSolver.prototype.InitVelocityConstraints=function(a){
    for(var b=0;
        b<this.m_constraintCount;
        ++b){
        var c=this.m_constraints[b],d=c.bodyA,e=c.bodyB,h=d.m_invMass,g=d.m_invI,f=e.m_invMass,i=e.m_invI,j=c.normal.x,k=c.normal.y,l=k,n=-j,m=0,o=0;
        if(a.warmStarting){
        o=c.pointCount;
        for(m=0;
            m<o;
            ++m){
            var p=c.points[m];
            p.normalImpulse*=a.dtRatio;
            p.tangentImpulse*=a.dtRatio;
            var q=p.normalImpulse*j+p.tangentImpulse*l,r=p.normalImpulse*k+p.tangentImpulse*n;
            d.m_angularVelocity-=g*(p.rA.x*r-p.rA.y*q);
            d.m_linearVelocity.x-=
            h*q;
            d.m_linearVelocity.y-=h*r;
            e.m_angularVelocity+=i*(p.rB.x*r-p.rB.y*q);
            e.m_linearVelocity.x+=f*q;
            e.m_linearVelocity.y+=f*r}}else{
            o=c.pointCount;
            for(m=0;
                m<o;
                ++m)d=c.points[m],d.normalImpulse=0,d.tangentImpulse=0}}
    };

    b2.ContactSolver.prototype.SolveVelocityConstraints=function(){
    for(var a=0,b,c,d,e,h,g,f,i,j,k=0;
        k<this.m_constraintCount;
        ++k){
        e=this.m_constraints[k];
        var l=e.bodyA,n=e.bodyB,m=l.m_angularVelocity,o=n.m_angularVelocity,p=l.m_linearVelocity,q=n.m_linearVelocity,r=l.m_invMass,y=l.m_invI,v=n.m_invMass,x=n.m_invI;
        f=e.normal.x;
        var s=i=e.normal.y;
        j=-f;
        g=e.friction;
        for(a=0;
        a<e.pointCount;
        a++)b=e.points[a],c=q.x-o*b.rB.y-p.x+m*b.rA.y,d=q.y+o*b.rB.x-p.y-m*b.rA.x,c=c*s+d*j,c=b.tangentMass*-c,d=g*b.normalImpulse,
        d=b2.Math.Clamp(b.tangentImpulse+c,-d,d),c=d-b.tangentImpulse,h=c*s,c*=j,p.x-=r*h,p.y-=r*c,m-=y*(b.rA.x*c-b.rA.y*h),q.x+=v*h,q.y+=v*c,o+=x*(b.rB.x*c-b.rB.y*h),b.tangentImpulse=d;
        if(e.pointCount==1)b=e.points[0],c=q.x+-o*b.rB.y-p.x- -m*b.rA.y,d=q.y+o*b.rB.x-p.y-m*b.rA.x,e=c*f+d*i,c=-b.normalMass*(e-b.velocityBias),d=b.normalImpulse+c,d=d>0?d:0,c=d-b.normalImpulse,h=c*f,c*=i,p.x-=r*h,p.y-=r*c,m-=y*(b.rA.x*c-b.rA.y*h),q.x+=v*h,q.y+=v*c,o+=x*(b.rB.x*c-b.rB.y*h),b.normalImpulse=d;
        else{
        b=e.points[0];
        a=
            e.points[1];
        c=b.normalImpulse;
        g=a.normalImpulse;
        var u=(q.x-o*b.rB.y-p.x+m*b.rA.y)*f+(q.y+o*b.rB.x-p.y-m*b.rA.x)*i,w=(q.x-o*a.rB.y-p.x+m*a.rA.y)*f+(q.y+o*a.rB.x-p.y-m*a.rA.x)*i;
        d=u-b.velocityBias;
        h=w-a.velocityBias;
        j=e.K;
        d-=j.col1.x*c+j.col2.x*g;
        for(h-=j.col1.y*c+j.col2.y*g;
            ;
           ){
            j=e.normalMass;
            s=-(j.col1.x*d+j.col2.x*h);
            j=-(j.col1.y*d+j.col2.y*h);
            if(s>=0&&j>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*
                  c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}s=-b.normalMass*d;
            j=0;
            w=e.K.col1.y*s+h;
            if(s>=0&&w>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}s=0;
            j=-a.normalMass*h;
            u=e.K.col2.x*j+d;
            if(j>=0&&u>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*
                (e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}j=s=0;
            u=d;
            w=h;
            if(u>=0&&w>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}break}}l.m_angularVelocity=m;
        n.m_angularVelocity=o}
    };

    b2.ContactSolver.prototype.FinalizeVelocityConstraints=function(){
    for(var a=0;
        a<this.m_constraintCount;
        ++a)for(var b=this.m_constraints[a],c=b.manifold,d=0;
            d<b.pointCount;
            ++d){
        var e=c.m_points[d],h=b.points[d];
        e.m_normalImpulse=h.normalImpulse;
        e.m_tangentImpulse=h.tangentImpulse}
    };

    b2.ContactSolver.prototype.SolvePositionConstraints=function(a){
    for(var b=0,c=0;
        c<this.m_constraintCount;
        c++){
        var d=this.m_constraints[c],e=d.bodyA,h=d.bodyB,g=e.m_mass*e.m_invMass,f=e.m_mass*e.m_invI,i=h.m_mass*h.m_invMass,j=h.m_mass*h.m_invI;
        b2.ContactSolver.s_psm.Initialize(d);
        for(var k=b2.ContactSolver.s_psm.m_normal,l=0;
        l<d.pointCount;
        l++){
        var n=d.points[l],m=b2.ContactSolver.s_psm.m_points[l],o=b2.ContactSolver.s_psm.m_separations[l],p=m.x-e.m_sweep.c.x,q=m.y-e.m_sweep.c.y,r=m.x-h.m_sweep.c.x,
        m=m.y-h.m_sweep.c.y,b=b<o?b:o,o=b2.Math.Clamp(a*(o+b2.Settings.b2_linearSlop),-b2.Settings.b2_maxLinearCorrection,0);
        o*=-n.equalizedMass;
        n=o*k.x;
        o*=k.y;
        e.m_sweep.c.x-=g*n;
        e.m_sweep.c.y-=g*o;
        e.m_sweep.a-=f*(p*o-q*n);
        e.SynchronizeTransform();
        h.m_sweep.c.x+=i*n;
        h.m_sweep.c.y+=i*o;
        h.m_sweep.a+=j*(r*o-m*n);
        h.SynchronizeTransform()}}return b>-1.5*b2.Settings.b2_linearSlop
    };
    b2.ContactSolver.prototype.m_step=new b2.TimeStep;
    b2.ContactSolver.prototype.m_allocator=null;

    b2.ContactSolver.prototype.m_constraints=[];
    b2.ContactSolver.prototype.m_constraintCount=0;
    b2.Simplex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Simplex.prototype.__constructor=function(){
    this.m_vertices[0]=this.m_v1;
    this.m_vertices[1]=this.m_v2;
    this.m_vertices[2]=this.m_v3
    };
    b2.Simplex.prototype.__varz=function(){
    this.m_v1=new b2.SimplexVertex;
    this.m_v2=new b2.SimplexVertex;
    this.m_v3=new b2.SimplexVertex;
    this.m_vertices=Array(3)
    };

    b2.Simplex.prototype.ReadCache=function(a,b,c,d,e){
    b2.Settings.b2Assert(0<=a.count&&a.count<=3);
    var h,g;
    this.m_count=a.count;
    for(var f=this.m_vertices,i=0;
        i<this.m_count;
        i++){
        var j=f[i];
        j.indexA=a.indexA[i];
        j.indexB=a.indexB[i];
        h=b.GetVertex(j.indexA);
        g=d.GetVertex(j.indexB);
        j.wA=b2.Math.MulX(c,h);
        j.wB=b2.Math.MulX(e,g);
        j.w=b2.Math.SubtractVV(j.wB,j.wA);
        j.a=0}if(this.m_count>1&&(a=a.metric,h=this.GetMetric(),h<0.5*a||2*a<h||h<Number.MIN_VALUE))this.m_count=0;
    if(this.m_count==0)j=f[0],j.indexA=0,j.indexB=
        0,h=b.GetVertex(0),g=d.GetVertex(0),j.wA=b2.Math.MulX(c,h),j.wB=b2.Math.MulX(e,g),j.w=b2.Math.SubtractVV(j.wB,j.wA),this.m_count=1
    };
    b2.Simplex.prototype.WriteCache=function(a){
    a.metric=this.GetMetric();
    a.count=parseInt(this.m_count);
    for(var b=this.m_vertices,c=0;
        c<this.m_count;
        c++)a.indexA[c]=parseInt(b[c].indexA),a.indexB[c]=parseInt(b[c].indexB)
    };

    b2.Simplex.prototype.GetSearchDirection=function(){
    switch(this.m_count){
    case 1:return this.m_v1.w.GetNegative();
    case 2:var a=b2.Math.SubtractVV(this.m_v2.w,this.m_v1.w);
        return b2.Math.CrossVV(a,this.m_v1.w.GetNegative())>0?b2.Math.CrossFV(1,a):b2.Math.CrossVF(a,1);
    default:return b2.Settings.b2Assert(!1),new b2.Vec2}
    };

    b2.Simplex.prototype.GetClosestPoint=function(){
    switch(this.m_count){
    case 0:return b2.Settings.b2Assert(!1),new b2.Vec2;
    case 1:return this.m_v1.w;
    case 2:return new b2.Vec2(this.m_v1.a*this.m_v1.w.x+this.m_v2.a*this.m_v2.w.x,this.m_v1.a*this.m_v1.w.y+this.m_v2.a*this.m_v2.w.y);
    default:return b2.Settings.b2Assert(!1),new b2.Vec2}
    };

    b2.Simplex.prototype.GetWitnessPoints=function(a,b){
    switch(this.m_count){
    case 0:b2.Settings.b2Assert(!1);
        break;
    case 1:a.SetV(this.m_v1.wA);
        b.SetV(this.m_v1.wB);
        break;
    case 2:a.x=this.m_v1.a*this.m_v1.wA.x+this.m_v2.a*this.m_v2.wA.x;
        a.y=this.m_v1.a*this.m_v1.wA.y+this.m_v2.a*this.m_v2.wA.y;
        b.x=this.m_v1.a*this.m_v1.wB.x+this.m_v2.a*this.m_v2.wB.x;
        b.y=this.m_v1.a*this.m_v1.wB.y+this.m_v2.a*this.m_v2.wB.y;
        break;
    case 3:b.x=a.x=this.m_v1.a*this.m_v1.wA.x+this.m_v2.a*this.m_v2.wA.x+this.m_v3.a*this.m_v3.wA.x;

        b.y=a.y=this.m_v1.a*this.m_v1.wA.y+this.m_v2.a*this.m_v2.wA.y+this.m_v3.a*this.m_v3.wA.y;
        break;
    default:b2.Settings.b2Assert(!1)}
    };
    b2.Simplex.prototype.GetMetric=function(){
    switch(this.m_count){
    case 0:return b2.Settings.b2Assert(!1),0;
    case 1:return 0;
    case 2:return b2.Math.SubtractVV(this.m_v1.w,this.m_v2.w).Length();
    case 3:return b2.Math.CrossVV(b2.Math.SubtractVV(this.m_v2.w,this.m_v1.w),b2.Math.SubtractVV(this.m_v3.w,this.m_v1.w));
    default:return b2.Settings.b2Assert(!1),0}
    };

    b2.Simplex.prototype.Solve2=function(){
    var a=this.m_v1.w,b=this.m_v2.w,c=b2.Math.SubtractVV(b,a),a=-(a.x*c.x+a.y*c.y);
    a<=0?this.m_count=this.m_v1.a=1:(b=b.x*c.x+b.y*c.y,b<=0?(this.m_count=this.m_v2.a=1,this.m_v1.Set(this.m_v2)):(c=1/(b+a),this.m_v1.a=b*c,this.m_v2.a=a*c,this.m_count=2))
    };

    b2.Simplex.prototype.Solve3=function(){
    var a=this.m_v1.w,b=this.m_v2.w,c=this.m_v3.w,d=b2.Math.SubtractVV(b,a),e=b2.Math.Dot(a,d),h=b2.Math.Dot(b,d),e=-e,g=b2.Math.SubtractVV(c,a),f=b2.Math.Dot(a,g),i=b2.Math.Dot(c,g),f=-f,j=b2.Math.SubtractVV(c,b),k=b2.Math.Dot(b,j),j=b2.Math.Dot(c,j),k=-k,g=b2.Math.CrossVV(d,g),d=g*b2.Math.CrossVV(b,c),c=g*b2.Math.CrossVV(c,a),a=g*b2.Math.CrossVV(a,b);
    e<=0&&f<=0?this.m_count=this.m_v1.a=1:h>0&&e>0&&a<=0?(i=1/(h+e),this.m_v1.a=h*i,this.m_v2.a=e*i,this.m_count=2):
        i>0&&f>0&&c<=0?(h=1/(i+f),this.m_v1.a=i*h,this.m_v3.a=f*h,this.m_count=2,this.m_v2.Set(this.m_v3)):h<=0&&k<=0?(this.m_count=this.m_v2.a=1,this.m_v1.Set(this.m_v2)):i<=0&&j<=0?(this.m_count=this.m_v3.a=1,this.m_v1.Set(this.m_v3)):j>0&&k>0&&d<=0?(h=1/(j+k),this.m_v2.a=j*h,this.m_v3.a=k*h,this.m_count=2,this.m_v1.Set(this.m_v3)):(h=1/(d+c+a),this.m_v1.a=d*h,this.m_v2.a=c*h,this.m_v3.a=a*h,this.m_count=3)
    };
    b2.Simplex.prototype.m_v1=new b2.SimplexVertex;
    b2.Simplex.prototype.m_v2=new b2.SimplexVertex;

    b2.Simplex.prototype.m_v3=new b2.SimplexVertex;
    b2.Simplex.prototype.m_vertices=Array(3);
    b2.Simplex.prototype.m_count=0;
    b2.WeldJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.WeldJoint.prototype,b2.Joint.prototype);
    b2.WeldJoint.prototype._super=b2.Joint.prototype;

    b2.WeldJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_referenceAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_mass=new b2.Mat33
    };
    b2.WeldJoint.prototype.__varz=function(){
    this.m_localAnchorA=new b2.Vec2;
    this.m_localAnchorB=new b2.Vec2;
    this.m_impulse=new b2.Vec3;
    this.m_mass=new b2.Mat33
    };

    b2.WeldJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchorA.x-d.m_sweep.localCenter.x,g=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchorB.x-e.m_sweep.localCenter.x,i=this.m_localAnchorB.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    b=d.m_invMass;
    c=e.m_invMass;
    var j=d.m_invI,k=e.m_invI;
    this.m_mass.col1.x=b+c+g*
        g*j+i*i*k;
    this.m_mass.col2.x=-g*h*j-i*f*k;
    this.m_mass.col3.x=-g*j-i*k;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=b+c+h*h*j+f*f*k;
    this.m_mass.col3.y=h*j+f*k;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=j+k;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_impulse.z*=a.dtRatio,d.m_linearVelocity.x-=b*this.m_impulse.x,d.m_linearVelocity.y-=b*this.m_impulse.y,d.m_angularVelocity-=j*(h*this.m_impulse.y-g*this.m_impulse.x+
                                                                                                              this.m_impulse.z),e.m_linearVelocity.x+=c*this.m_impulse.x,e.m_linearVelocity.y+=c*this.m_impulse.y,e.m_angularVelocity+=k*(f*this.m_impulse.y-i*this.m_impulse.x+this.m_impulse.z)):this.m_impulse.SetZero()
    };

    b2.WeldJoint.prototype.SolveVelocityConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB,e=c.m_linearVelocity,h=c.m_angularVelocity,g=d.m_linearVelocity,f=d.m_angularVelocity,i=c.m_invMass,j=d.m_invMass,k=c.m_invI,l=d.m_invI;
    a=c.m_xf.R;
    var n=this.m_localAnchorA.x-c.m_sweep.localCenter.x,m=this.m_localAnchorA.y-c.m_sweep.localCenter.y;
    b=a.col1.x*n+a.col2.x*m;
    m=a.col1.y*n+a.col2.y*m;
    n=b;
    a=d.m_xf.R;
    var o=this.m_localAnchorB.x-d.m_sweep.localCenter.x,p=this.m_localAnchorB.y-d.m_sweep.localCenter.y;

    b=a.col1.x*o+a.col2.x*p;
    p=a.col1.y*o+a.col2.y*p;
    o=b;
    a=g.x-f*p-e.x+h*m;
    b=g.y+f*o-e.y-h*n;
    var q=f-h,r=new b2.Vec3;
    this.m_mass.Solve33(r,-a,-b,-q);
    this.m_impulse.Add(r);
    e.x-=i*r.x;
    e.y-=i*r.y;
    h-=k*(n*r.y-m*r.x+r.z);
    g.x+=j*r.x;
    g.y+=j*r.y;
    f+=l*(o*r.y-p*r.x+r.z);
    c.m_angularVelocity=h;
    d.m_angularVelocity=f
    };

    b2.WeldJoint.prototype.SolvePositionConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB;
    a=c.m_xf.R;
    var e=this.m_localAnchorA.x-c.m_sweep.localCenter.x,h=this.m_localAnchorA.y-c.m_sweep.localCenter.y;
    b=a.col1.x*e+a.col2.x*h;
    h=a.col1.y*e+a.col2.y*h;
    e=b;
    a=d.m_xf.R;
    var g=this.m_localAnchorB.x-d.m_sweep.localCenter.x,f=this.m_localAnchorB.y-d.m_sweep.localCenter.y;
    b=a.col1.x*g+a.col2.x*f;
    f=a.col1.y*g+a.col2.y*f;
    g=b;
    a=c.m_invMass;
    b=d.m_invMass;
    var i=c.m_invI,j=d.m_invI,k=d.m_sweep.c.x+g-c.m_sweep.c.x-
        e,l=d.m_sweep.c.y+f-c.m_sweep.c.y-h,n=d.m_sweep.a-c.m_sweep.a-this.m_referenceAngle,m=10*b2.Settings.b2_linearSlop,o=Math.sqrt(k*k+l*l),p=b2.Math.Abs(n);
    o>m&&(i*=1,j*=1);
    this.m_mass.col1.x=a+b+h*h*i+f*f*j;
    this.m_mass.col2.x=-h*e*i-f*g*j;
    this.m_mass.col3.x=-h*i-f*j;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=a+b+e*e*i+g*g*j;
    this.m_mass.col3.y=e*i+g*j;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=i+j;
    m=new b2.Vec3;
    this.m_mass.Solve33(m,-k,
                -l,-n);
    c.m_sweep.c.x-=a*m.x;
    c.m_sweep.c.y-=a*m.y;
    c.m_sweep.a-=i*(e*m.y-h*m.x+m.z);
    d.m_sweep.c.x+=b*m.x;
    d.m_sweep.c.y+=b*m.y;
    d.m_sweep.a+=j*(g*m.y-f*m.x+m.z);
    c.SynchronizeTransform();
    d.SynchronizeTransform();
    return o<=b2.Settings.b2_linearSlop&&p<=b2.Settings.b2_angularSlop
    };
    b2.WeldJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2.WeldJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };

    b2.WeldJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.WeldJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.z
    };
    b2.WeldJoint.prototype.m_localAnchorA=new b2.Vec2;
    b2.WeldJoint.prototype.m_localAnchorB=new b2.Vec2;
    b2.WeldJoint.prototype.m_referenceAngle=null;
    b2.WeldJoint.prototype.m_impulse=new b2.Vec3;
    b2.WeldJoint.prototype.m_mass=new b2.Mat33;
    b2.Math=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Math.prototype.__constructor=function(){

    };
    b2.Math.prototype.__varz=function(){

    };
    b2.Math.IsValid=function(a){
    return isFinite(a)
    };
    b2.Math.Dot=function(a,b){
    return a.x*b.x+a.y*b.y
    };
    b2.Math.CrossVV=function(a,b){
    return a.x*b.y-a.y*b.x
    };
    b2.Math.CrossVF=function(a,b){
    return new b2.Vec2(b*a.y,-b*a.x)
    };
    b2.Math.CrossFV=function(a,b){
    return new b2.Vec2(-a*b.y,a*b.x)
    };
    b2.Math.MulMV=function(a,b){
    return new b2.Vec2(a.col1.x*b.x+a.col2.x*b.y,a.col1.y*b.x+a.col2.y*b.y)
    };

    b2.Math.MulTMV=function(a,b){
    return new b2.Vec2(b2.Math.Dot(b,a.col1),b2.Math.Dot(b,a.col2))
    };
    b2.Math.MulX=function(a,b){
    var c=b2.Math.MulMV(a.R,b);
    c.x+=a.position.x;
    c.y+=a.position.y;
    return c
    };
    b2.Math.MulXT=function(a,b){
    var c=b2.Math.SubtractVV(b,a.position),d=c.x*a.R.col1.x+c.y*a.R.col1.y;
    c.y=c.x*a.R.col2.x+c.y*a.R.col2.y;
    c.x=d;
    return c
    };
    b2.Math.AddVV=function(a,b){
    return new b2.Vec2(a.x+b.x,a.y+b.y)
    };
    b2.Math.SubtractVV=function(a,b){
    return new b2.Vec2(a.x-b.x,a.y-b.y)
    };

    b2.Math.Distance=function(a,b){
    var c=a.x-b.x,d=a.y-b.y;
    return Math.sqrt(c*c+d*d)
    };
    b2.Math.DistanceSquared=function(a,b){
    var c=a.x-b.x,d=a.y-b.y;
    return c*c+d*d
    };
    b2.Math.MulFV=function(a,b){
    return new b2.Vec2(a*b.x,a*b.y)
    };
    b2.Math.AddMM=function(a,b){
    return b2.Mat22.FromVV(b2.Math.AddVV(a.col1,b.col1),b2.Math.AddVV(a.col2,b.col2))
    };
    b2.Math.MulMM=function(a,b){
    return b2.Mat22.FromVV(b2.Math.MulMV(a,b.col1),b2.Math.MulMV(a,b.col2))
    };

    b2.Math.MulTMM=function(a,b){
    var c=new b2.Vec2(b2.Math.Dot(a.col1,b.col1),b2.Math.Dot(a.col2,b.col1)),d=new b2.Vec2(b2.Math.Dot(a.col1,b.col2),b2.Math.Dot(a.col2,b.col2));
    return b2.Mat22.FromVV(c,d)
    };
    b2.Math.Abs=function(a){
    return a>0?a:-a
    };
    b2.Math.AbsV=function(a){
    return new b2.Vec2(b2.Math.Abs(a.x),b2.Math.Abs(a.y))
    };
    b2.Math.AbsM=function(a){
    return b2.Mat22.FromVV(b2.Math.AbsV(a.col1),b2.Math.AbsV(a.col2))
    };
    b2.Math.Min=function(a,b){
    return a<b?a:b
    };

    b2.Math.MinV=function(a,b){
    return new b2.Vec2(b2.Math.Min(a.x,b.x),b2.Math.Min(a.y,b.y))
    };
    b2.Math.Max=function(a,b){
    return a>b?a:b
    };
    b2.Math.MaxV=function(a,b){
    return new b2.Vec2(b2.Math.Max(a.x,b.x),b2.Math.Max(a.y,b.y))
    };
    b2.Math.Clamp=function(a,b,c){
    return a<b?b:a>c?c:a
    };
    b2.Math.ClampV=function(a,b,c){
    return b2.Math.MaxV(b,b2.Math.MinV(a,c))
    };
    b2.Math.Swap=function(a,b){
    var c=a[0];
    a[0]=b[0];
    b[0]=c
    };
    b2.Math.Random=function(){
    return Math.random()*2-1
    };

    b2.Math.RandomRange=function(a,b){
    var c=Math.random();
    return(b-a)*c+a
    };
    b2.Math.NextPowerOfTwo=function(a){
    a|=a>>1&2147483647;
    a|=a>>2&1073741823;
    a|=a>>4&268435455;
    a|=a>>8&16777215;
    a|=a>>16&65535;
    return a+1
    };
    b2.Math.IsPowerOfTwo=function(a){
    return a>0&&(a&a-1)==0
    };
    b2.Math.b2Vec2_zero=new b2.Vec2(0,0);
    b2.Math.b2Mat22_identity=b2.Mat22.FromVV(new b2.Vec2(1,0),new b2.Vec2(0,1));
    b2.Math.b2Transform_identity=new b2.Transform(b2.Math.b2Vec2_zero,b2.Math.b2Mat22_identity);

    b2.PulleyJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PulleyJoint.prototype,b2.Joint.prototype);
    b2.PulleyJoint.prototype._super=b2.Joint.prototype;

    b2.PulleyJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_ground=this.m_bodyA.m_world.m_groundBody;
    this.m_groundAnchor1.x=a.groundAnchorA.x-this.m_ground.m_xf.position.x;
    this.m_groundAnchor1.y=a.groundAnchorA.y-this.m_ground.m_xf.position.y;
    this.m_groundAnchor2.x=a.groundAnchorB.x-this.m_ground.m_xf.position.x;
    this.m_groundAnchor2.y=a.groundAnchorB.y-this.m_ground.m_xf.position.y;
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);

    this.m_ratio=a.ratio;
    this.m_constant=a.lengthA+this.m_ratio*a.lengthB;
    this.m_maxLength1=b2.Math.Min(a.maxLengthA,this.m_constant-this.m_ratio*b2.PulleyJoint.b2_minPulleyLength);
    this.m_maxLength2=b2.Math.Min(a.maxLengthB,(this.m_constant-b2.PulleyJoint.b2_minPulleyLength)/this.m_ratio);
    this.m_limitImpulse2=this.m_limitImpulse1=this.m_impulse=0
    };

    b2.PulleyJoint.prototype.__varz=function(){
    this.m_groundAnchor1=new b2.Vec2;
    this.m_groundAnchor2=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_u1=new b2.Vec2;
    this.m_u2=new b2.Vec2
    };
    b2.PulleyJoint.b2_minPulleyLength=2;

    b2.PulleyJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d;
    d=b.m_xf.R;
    var e=this.m_localAnchor1.x-b.m_sweep.localCenter.x,h=this.m_localAnchor1.y-b.m_sweep.localCenter.y,g=d.col1.x*e+d.col2.x*h,h=d.col1.y*e+d.col2.y*h,e=g;
    d=c.m_xf.R;
    var f=this.m_localAnchor2.x-c.m_sweep.localCenter.x,i=this.m_localAnchor2.y-c.m_sweep.localCenter.y,g=d.col1.x*f+d.col2.x*i,i=d.col1.y*f+d.col2.y*i,f=g;
    d=c.m_sweep.c.x+f;
    var g=c.m_sweep.c.y+i,j=this.m_ground.m_xf.position.x+this.m_groundAnchor2.x,
    k=this.m_ground.m_xf.position.y+this.m_groundAnchor2.y;
    this.m_u1.Set(b.m_sweep.c.x+e-(this.m_ground.m_xf.position.x+this.m_groundAnchor1.x),b.m_sweep.c.y+h-(this.m_ground.m_xf.position.y+this.m_groundAnchor1.y));
    this.m_u2.Set(d-j,g-k);
    d=this.m_u1.Length();
    g=this.m_u2.Length();
    d>b2.Settings.b2_linearSlop?this.m_u1.Multiply(1/d):this.m_u1.SetZero();
    g>b2.Settings.b2_linearSlop?this.m_u2.Multiply(1/g):this.m_u2.SetZero();
    this.m_constant-d-this.m_ratio*g>0?(this.m_state=b2.Joint.e_inactiveLimit,this.m_impulse=
                        0):this.m_state=b2.Joint.e_atUpperLimit;
    d<this.m_maxLength1?(this.m_limitState1=b2.Joint.e_inactiveLimit,this.m_limitImpulse1=0):this.m_limitState1=b2.Joint.e_atUpperLimit;
    g<this.m_maxLength2?(this.m_limitState2=b2.Joint.e_inactiveLimit,this.m_limitImpulse2=0):this.m_limitState2=b2.Joint.e_atUpperLimit;
    d=e*this.m_u1.y-h*this.m_u1.x;
    g=f*this.m_u2.y-i*this.m_u2.x;
    this.m_limitMass1=b.m_invMass+b.m_invI*d*d;
    this.m_limitMass2=c.m_invMass+c.m_invI*g*g;
    this.m_pulleyMass=this.m_limitMass1+this.m_ratio*this.m_ratio*
        this.m_limitMass2;
    this.m_limitMass1=1/this.m_limitMass1;
    this.m_limitMass2=1/this.m_limitMass2;
    this.m_pulleyMass=1/this.m_pulleyMass;
    a.warmStarting?(this.m_impulse*=a.dtRatio,this.m_limitImpulse1*=a.dtRatio,this.m_limitImpulse2*=a.dtRatio,a=(-this.m_impulse-this.m_limitImpulse1)*this.m_u1.x,d=(-this.m_impulse-this.m_limitImpulse1)*this.m_u1.y,g=(-this.m_ratio*this.m_impulse-this.m_limitImpulse2)*this.m_u2.x,j=(-this.m_ratio*this.m_impulse-this.m_limitImpulse2)*this.m_u2.y,b.m_linearVelocity.x+=b.m_invMass*
            a,b.m_linearVelocity.y+=b.m_invMass*d,b.m_angularVelocity+=b.m_invI*(e*d-h*a),c.m_linearVelocity.x+=c.m_invMass*g,c.m_linearVelocity.y+=c.m_invMass*j,c.m_angularVelocity+=c.m_invI*(f*j-i*g)):this.m_limitImpulse2=this.m_limitImpulse1=this.m_impulse=0
    };

    b2.PulleyJoint.prototype.SolveVelocityConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h,i,j;
    if(this.m_state==b2.Joint.e_atUpperLimit)c=a.m_linearVelocity.x+-a.m_angularVelocity*
        e,h=a.m_linearVelocity.y+a.m_angularVelocity*d,i=b.m_linearVelocity.x+-b.m_angularVelocity*f,j=b.m_linearVelocity.y+b.m_angularVelocity*g,c=-(this.m_u1.x*c+this.m_u1.y*h)-this.m_ratio*(this.m_u2.x*i+this.m_u2.y*j),j=this.m_pulleyMass*-c,c=this.m_impulse,this.m_impulse=b2.Math.Max(0,this.m_impulse+j),j=this.m_impulse-c,c=-j*this.m_u1.x,h=-j*this.m_u1.y,i=-this.m_ratio*j*this.m_u2.x,j=-this.m_ratio*j*this.m_u2.y,a.m_linearVelocity.x+=a.m_invMass*c,a.m_linearVelocity.y+=a.m_invMass*h,a.m_angularVelocity+=
    a.m_invI*(d*h-e*c),b.m_linearVelocity.x+=b.m_invMass*i,b.m_linearVelocity.y+=b.m_invMass*j,b.m_angularVelocity+=b.m_invI*(g*j-f*i);
    if(this.m_limitState1==b2.Joint.e_atUpperLimit)c=a.m_linearVelocity.x+-a.m_angularVelocity*e,h=a.m_linearVelocity.y+a.m_angularVelocity*d,c=-(this.m_u1.x*c+this.m_u1.y*h),j=-this.m_limitMass1*c,c=this.m_limitImpulse1,this.m_limitImpulse1=b2.Math.Max(0,this.m_limitImpulse1+j),j=this.m_limitImpulse1-c,c=-j*this.m_u1.x,h=-j*this.m_u1.y,a.m_linearVelocity.x+=a.m_invMass*c,
    a.m_linearVelocity.y+=a.m_invMass*h,a.m_angularVelocity+=a.m_invI*(d*h-e*c);
    if(this.m_limitState2==b2.Joint.e_atUpperLimit)i=b.m_linearVelocity.x+-b.m_angularVelocity*f,j=b.m_linearVelocity.y+b.m_angularVelocity*g,c=-(this.m_u2.x*i+this.m_u2.y*j),j=-this.m_limitMass2*c,c=this.m_limitImpulse2,this.m_limitImpulse2=b2.Math.Max(0,this.m_limitImpulse2+j),j=this.m_limitImpulse2-c,i=-j*this.m_u2.x,j=-j*this.m_u2.y,b.m_linearVelocity.x+=b.m_invMass*i,b.m_linearVelocity.y+=b.m_invMass*j,b.m_angularVelocity+=
    b.m_invI*(g*j-f*i)
    };

    b2.PulleyJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c,d=this.m_ground.m_xf.position.x+this.m_groundAnchor1.x,e=this.m_ground.m_xf.position.y+this.m_groundAnchor1.y,h=this.m_ground.m_xf.position.x+this.m_groundAnchor2.x,g=this.m_ground.m_xf.position.y+this.m_groundAnchor2.y,f,i,j,k,l,n,m,o=0;
    if(this.m_state==b2.Joint.e_atUpperLimit)c=a.m_xf.R,f=this.m_localAnchor1.x-a.m_sweep.localCenter.x,i=this.m_localAnchor1.y-a.m_sweep.localCenter.y,l=c.col1.x*f+c.col2.x*
        i,i=c.col1.y*f+c.col2.y*i,f=l,c=b.m_xf.R,j=this.m_localAnchor2.x-b.m_sweep.localCenter.x,k=this.m_localAnchor2.y-b.m_sweep.localCenter.y,l=c.col1.x*j+c.col2.x*k,k=c.col1.y*j+c.col2.y*k,j=l,c=a.m_sweep.c.x+f,l=a.m_sweep.c.y+i,n=b.m_sweep.c.x+j,m=b.m_sweep.c.y+k,this.m_u1.Set(c-d,l-e),this.m_u2.Set(n-h,m-g),c=this.m_u1.Length(),l=this.m_u2.Length(),c>b2.Settings.b2_linearSlop?this.m_u1.Multiply(1/c):this.m_u1.SetZero(),l>b2.Settings.b2_linearSlop?this.m_u2.Multiply(1/l):this.m_u2.SetZero(),c=this.m_constant-
        c-this.m_ratio*l,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_pulleyMass*c,c=-m*this.m_u1.x,l=-m*this.m_u1.y,n=-this.m_ratio*m*this.m_u2.x,m=-this.m_ratio*m*this.m_u2.y,a.m_sweep.c.x+=a.m_invMass*c,a.m_sweep.c.y+=a.m_invMass*l,a.m_sweep.a+=a.m_invI*(f*l-i*c),b.m_sweep.c.x+=b.m_invMass*n,b.m_sweep.c.y+=b.m_invMass*m,b.m_sweep.a+=b.m_invI*(j*m-k*n),a.SynchronizeTransform(),b.SynchronizeTransform();
    if(this.m_limitState1==b2.Joint.e_atUpperLimit)c=
        a.m_xf.R,f=this.m_localAnchor1.x-a.m_sweep.localCenter.x,i=this.m_localAnchor1.y-a.m_sweep.localCenter.y,l=c.col1.x*f+c.col2.x*i,i=c.col1.y*f+c.col2.y*i,f=l,c=a.m_sweep.c.x+f,l=a.m_sweep.c.y+i,this.m_u1.Set(c-d,l-e),c=this.m_u1.Length(),c>b2.Settings.b2_linearSlop?(this.m_u1.x*=1/c,this.m_u1.y*=1/c):this.m_u1.SetZero(),c=this.m_maxLength1-c,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_limitMass1*c,c=-m*this.m_u1.x,l=-m*this.m_u1.y,
    a.m_sweep.c.x+=a.m_invMass*c,a.m_sweep.c.y+=a.m_invMass*l,a.m_sweep.a+=a.m_invI*(f*l-i*c),a.SynchronizeTransform();
    if(this.m_limitState2==b2.Joint.e_atUpperLimit)c=b.m_xf.R,j=this.m_localAnchor2.x-b.m_sweep.localCenter.x,k=this.m_localAnchor2.y-b.m_sweep.localCenter.y,l=c.col1.x*j+c.col2.x*k,k=c.col1.y*j+c.col2.y*k,j=l,n=b.m_sweep.c.x+j,m=b.m_sweep.c.y+k,this.m_u2.Set(n-h,m-g),l=this.m_u2.Length(),l>b2.Settings.b2_linearSlop?(this.m_u2.x*=1/l,this.m_u2.y*=1/l):this.m_u2.SetZero(),c=this.m_maxLength2-
        l,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_limitMass2*c,n=-m*this.m_u2.x,m=-m*this.m_u2.y,b.m_sweep.c.x+=b.m_invMass*n,b.m_sweep.c.y+=b.m_invMass*m,b.m_sweep.a+=b.m_invI*(j*m-k*n),b.SynchronizeTransform();
    return o<b2.Settings.b2_linearSlop
    };
    b2.PulleyJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.PulleyJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.PulleyJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_u2.x,a*this.m_impulse*this.m_u2.y)
    };
    b2.PulleyJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.PulleyJoint.prototype.GetGroundAnchorA=function(){
    var a=this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor1);
    return a
    };
    b2.PulleyJoint.prototype.GetGroundAnchorB=function(){
    var a=this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor2);
    return a
    };

    b2.PulleyJoint.prototype.GetLength1=function(){
    var a=this.m_bodyA.GetWorldPoint(this.m_localAnchor1),b=a.x-(this.m_ground.m_xf.position.x+this.m_groundAnchor1.x),a=a.y-(this.m_ground.m_xf.position.y+this.m_groundAnchor1.y);
    return Math.sqrt(b*b+a*a)
    };
    b2.PulleyJoint.prototype.GetLength2=function(){
    var a=this.m_bodyB.GetWorldPoint(this.m_localAnchor2),b=a.x-(this.m_ground.m_xf.position.x+this.m_groundAnchor2.x),a=a.y-(this.m_ground.m_xf.position.y+this.m_groundAnchor2.y);
    return Math.sqrt(b*b+a*a)
    };

    b2.PulleyJoint.prototype.GetRatio=function(){
    return this.m_ratio
    };
    b2.PulleyJoint.prototype.m_ground=null;
    b2.PulleyJoint.prototype.m_groundAnchor1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_groundAnchor2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_u1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_u2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_constant=null;
    b2.PulleyJoint.prototype.m_ratio=null;

    b2.PulleyJoint.prototype.m_maxLength1=null;
    b2.PulleyJoint.prototype.m_maxLength2=null;
    b2.PulleyJoint.prototype.m_pulleyMass=null;
    b2.PulleyJoint.prototype.m_limitMass1=null;
    b2.PulleyJoint.prototype.m_limitMass2=null;
    b2.PulleyJoint.prototype.m_impulse=null;
    b2.PulleyJoint.prototype.m_limitImpulse1=null;
    b2.PulleyJoint.prototype.m_limitImpulse2=null;
    b2.PulleyJoint.prototype.m_state=0;
    b2.PulleyJoint.prototype.m_limitState1=0;
    b2.PulleyJoint.prototype.m_limitState2=0;

    b2.PrismaticJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PrismaticJoint.prototype,b2.Joint.prototype);
    b2.PrismaticJoint.prototype._super=b2.Joint.prototype;

    b2.PrismaticJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x=-this.m_localXAxis1.y;
    this.m_localYAxis1.y=this.m_localXAxis1.x;
    this.m_refAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse=this.m_motorMass=0;
    this.m_lowerTranslation=a.lowerTranslation;
    this.m_upperTranslation=a.upperTranslation;
    this.m_maxMotorForce=
        a.maxMotorForce;
    this.m_motorSpeed=a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
    };
    b2.PrismaticJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_localXAxis1=new b2.Vec2;
    this.m_localYAxis1=new b2.Vec2;
    this.m_axis=new b2.Vec2;
    this.m_perp=new b2.Vec2;
    this.m_K=new b2.Mat33;
    this.m_impulse=new b2.Vec3
    };

    b2.PrismaticJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    this.m_localCenterA.SetV(b.GetLocalCenter());
    this.m_localCenterB.SetV(c.GetLocalCenter());
    var h=b.GetTransform();
    c.GetTransform();
    d=b.m_xf.R;
    var g=this.m_localAnchor1.x-this.m_localCenterA.x,f=this.m_localAnchor1.y-this.m_localCenterA.y;
    e=d.col1.x*g+d.col2.x*f;
    f=d.col1.y*g+d.col2.y*f;
    g=e;
    d=c.m_xf.R;
    var i=this.m_localAnchor2.x-this.m_localCenterB.x,j=this.m_localAnchor2.y-this.m_localCenterB.y;
    e=d.col1.x*
        i+d.col2.x*j;
    j=d.col1.y*i+d.col2.y*j;
    i=e;
    d=c.m_sweep.c.x+i-b.m_sweep.c.x-g;
    e=c.m_sweep.c.y+j-b.m_sweep.c.y-f;
    this.m_invMassA=b.m_invMass;
    this.m_invMassB=c.m_invMass;
    this.m_invIA=b.m_invI;
    this.m_invIB=c.m_invI;
    this.m_axis.SetV(b2.Math.MulMV(h.R,this.m_localXAxis1));
    this.m_a1=(d+g)*this.m_axis.y-(e+f)*this.m_axis.x;
    this.m_a2=i*this.m_axis.y-j*this.m_axis.x;
    this.m_motorMass=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_a1*this.m_a1+this.m_invIB*this.m_a2*this.m_a2;
    if(this.m_motorMass>Number.MIN_VALUE)this.m_motorMass=
        1/this.m_motorMass;
    this.m_perp.SetV(b2.Math.MulMV(h.R,this.m_localYAxis1));
    this.m_s1=(d+g)*this.m_perp.y-(e+f)*this.m_perp.x;
    this.m_s2=i*this.m_perp.y-j*this.m_perp.x;
    h=this.m_invMassA;
    g=this.m_invMassB;
    f=this.m_invIA;
    i=this.m_invIB;
    this.m_K.col1.x=h+g+f*this.m_s1*this.m_s1+i*this.m_s2*this.m_s2;
    this.m_K.col1.y=f*this.m_s1+i*this.m_s2;
    this.m_K.col1.z=f*this.m_s1*this.m_a1+i*this.m_s2*this.m_a2;
    this.m_K.col2.x=this.m_K.col1.y;
    this.m_K.col2.y=f+i;
    this.m_K.col2.z=f*this.m_a1+i*this.m_a2;
    this.m_K.col3.x=
        this.m_K.col1.z;
    this.m_K.col3.y=this.m_K.col2.z;
    this.m_K.col3.z=h+g+f*this.m_a1*this.m_a1+i*this.m_a2*this.m_a2;
    if(this.m_enableLimit)if(d=this.m_axis.x*d+this.m_axis.y*e,b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop)this.m_limitState=b2.Joint.e_equalLimits;
    else if(d<=this.m_lowerTranslation){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_limitState=b2.Joint.e_atLowerLimit,this.m_impulse.z=0}else if(d>=this.m_upperTranslation){
        if(this.m_limitState!=
           b2.Joint.e_atUpperLimit)this.m_limitState=b2.Joint.e_atUpperLimit,this.m_impulse.z=0}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.z=0;
    else this.m_limitState=b2.Joint.e_inactiveLimit;
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=a.dtRatio,a=this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.x,d=this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.z)*
            this.m_axis.y,e=this.m_impulse.x*this.m_s1+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a1,h=this.m_impulse.x*this.m_s2+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a2,b.m_linearVelocity.x-=this.m_invMassA*a,b.m_linearVelocity.y-=this.m_invMassA*d,b.m_angularVelocity-=this.m_invIA*e,c.m_linearVelocity.x+=this.m_invMassB*a,c.m_linearVelocity.y+=this.m_invMassB*d,c.m_angularVelocity+=this.m_invIB*h):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.PrismaticJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d=b.m_linearVelocity,e=b.m_angularVelocity,h=c.m_linearVelocity,g=c.m_angularVelocity,f,i,j;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)j=this.m_motorMass*(this.m_motorSpeed-(this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e)),f=this.m_motorImpulse,a=a.dt*this.m_maxMotorForce,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+j,-a,a),j=this.m_motorImpulse-
        f,f=j*this.m_axis.x,a=j*this.m_axis.y,i=j*this.m_a1,j*=this.m_a2,d.x-=this.m_invMassA*f,d.y-=this.m_invMassA*a,e-=this.m_invIA*i,h.x+=this.m_invMassB*f,h.y+=this.m_invMassB*a,g+=this.m_invIB*j;
    i=this.m_perp.x*(h.x-d.x)+this.m_perp.y*(h.y-d.y)+this.m_s2*g-this.m_s1*e;
    a=g-e;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        j=this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e;
        f=this.m_impulse.Copy();
        j=this.m_K.Solve33(new b2.Vec3,-i,-a,-j);
        this.m_impulse.Add(j);

        if(this.m_limitState==b2.Joint.e_atLowerLimit)this.m_impulse.z=b2.Math.Max(this.m_impulse.z,0);
        else if(this.m_limitState==b2.Joint.e_atUpperLimit)this.m_impulse.z=b2.Math.Min(this.m_impulse.z,0);
        i=-i-(this.m_impulse.z-f.z)*this.m_K.col3.x;
        a=-a-(this.m_impulse.z-f.z)*this.m_K.col3.y;
        a=this.m_K.Solve22(new b2.Vec2,i,a);
        a.x+=f.x;
        a.y+=f.y;
        this.m_impulse.x=a.x;
        this.m_impulse.y=a.y;
        j.x=this.m_impulse.x-f.x;
        j.y=this.m_impulse.y-f.y;
        j.z=this.m_impulse.z-f.z;
        f=j.x*this.m_perp.x+j.z*this.m_axis.x;
        a=j.x*this.m_perp.y+
        j.z*this.m_axis.y;
        i=j.x*this.m_s1+j.y+j.z*this.m_a1;
        j=j.x*this.m_s2+j.y+j.z*this.m_a2}else j=this.m_K.Solve22(new b2.Vec2,-i,-a),this.m_impulse.x+=j.x,this.m_impulse.y+=j.y,f=j.x*this.m_perp.x,a=j.x*this.m_perp.y,i=j.x*this.m_s1+j.y,j=j.x*this.m_s2+j.y;
    d.x-=this.m_invMassA*f;
    d.y-=this.m_invMassA*a;
    e-=this.m_invIA*i;
    h.x+=this.m_invMassB*f;
    h.y+=this.m_invMassB*a;
    g+=this.m_invIB*j;
    b.m_linearVelocity.SetV(d);
    b.m_angularVelocity=e;
    c.m_linearVelocity.SetV(h);
    c.m_angularVelocity=g
    };

    b2.PrismaticJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.m_sweep.c,d=a.m_sweep.a,e=b.m_sweep.c,h=b.m_sweep.a,g,f,i,j,k=0,l=0;
    i=!1;
    var n=0,m=b2.Mat22.FromAngle(d),o=b2.Mat22.FromAngle(h);
    g=m;
    var l=this.m_localAnchor1.x-this.m_localCenterA.x,p=this.m_localAnchor1.y-this.m_localCenterA.y;
    f=g.col1.x*l+g.col2.x*p;
    p=g.col1.y*l+g.col2.y*p;
    l=f;
    g=o;
    o=this.m_localAnchor2.x-this.m_localCenterB.x;
    j=this.m_localAnchor2.y-this.m_localCenterB.y;
    f=g.col1.x*o+g.col2.x*
        j;
    j=g.col1.y*o+g.col2.y*j;
    o=f;
    g=e.x+o-c.x-l;
    f=e.y+j-c.y-p;
    if(this.m_enableLimit){
        this.m_axis=b2.Math.MulMV(m,this.m_localXAxis1);
        this.m_a1=(g+l)*this.m_axis.y-(f+p)*this.m_axis.x;
        this.m_a2=o*this.m_axis.y-j*this.m_axis.x;
        var q=this.m_axis.x*g+this.m_axis.y*f;
        b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop?(n=b2.Math.Clamp(q,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection),k=b2.Math.Abs(q),i=!0):q<=this.m_lowerTranslation?(n=b2.Math.Clamp(q-
                                                                                                                                   this.m_lowerTranslation+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),k=this.m_lowerTranslation-q,i=!0):q>=this.m_upperTranslation&&(n=b2.Math.Clamp(q-this.m_upperTranslation+b2.Settings.b2_linearSlop,0,b2.Settings.b2_maxLinearCorrection),k=q-this.m_upperTranslation,i=!0)}this.m_perp=b2.Math.MulMV(m,this.m_localYAxis1);
    this.m_s1=(g+l)*this.m_perp.y-(f+p)*this.m_perp.x;
    this.m_s2=o*this.m_perp.y-j*this.m_perp.x;
    m=new b2.Vec3;
    p=this.m_perp.x*g+this.m_perp.y*f;
    o=h-d-this.m_refAngle;

    k=b2.Math.Max(k,b2.Math.Abs(p));
    l=b2.Math.Abs(o);
    i?(i=this.m_invMassA,j=this.m_invMassB,g=this.m_invIA,f=this.m_invIB,this.m_K.col1.x=i+j+g*this.m_s1*this.m_s1+f*this.m_s2*this.m_s2,this.m_K.col1.y=g*this.m_s1+f*this.m_s2,this.m_K.col1.z=g*this.m_s1*this.m_a1+f*this.m_s2*this.m_a2,this.m_K.col2.x=this.m_K.col1.y,this.m_K.col2.y=g+f,this.m_K.col2.z=g*this.m_a1+f*this.m_a2,this.m_K.col3.x=this.m_K.col1.z,this.m_K.col3.y=this.m_K.col2.z,this.m_K.col3.z=i+j+g*this.m_a1*this.m_a1+f*this.m_a2*this.m_a2,
       this.m_K.Solve33(m,-p,-o,-n)):(i=this.m_invMassA,j=this.m_invMassB,g=this.m_invIA,f=this.m_invIB,n=g*this.m_s1+f*this.m_s2,q=g+f,this.m_K.col1.Set(i+j+g*this.m_s1*this.m_s1+f*this.m_s2*this.m_s2,n,0),this.m_K.col2.Set(n,q,0),n=this.m_K.Solve22(new b2.Vec2,-p,-o),m.x=n.x,m.y=n.y,m.z=0);
    n=m.x*this.m_perp.x+m.z*this.m_axis.x;
    i=m.x*this.m_perp.y+m.z*this.m_axis.y;
    p=m.x*this.m_s1+m.y+m.z*this.m_a1;
    m=m.x*this.m_s2+m.y+m.z*this.m_a2;
    c.x-=this.m_invMassA*n;
    c.y-=this.m_invMassA*i;
    d-=this.m_invIA*p;
    e.x+=this.m_invMassB*
        n;
    e.y+=this.m_invMassB*i;
    h+=this.m_invIB*m;
    a.m_sweep.a=d;
    b.m_sweep.a=h;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return k<=b2.Settings.b2_linearSlop&&l<=b2.Settings.b2_angularSlop
    };
    b2.PrismaticJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.PrismaticJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.PrismaticJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*(this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.x),a*(this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.y))
    };
    b2.PrismaticJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.y
    };

    b2.PrismaticJoint.prototype.GetJointTranslation=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.GetWorldPoint(this.m_localAnchor1),d=b.GetWorldPoint(this.m_localAnchor2),b=d.x-c.x,c=d.y-c.y,a=a.GetWorldVector(this.m_localXAxis1);
    return a.x*b+a.y*c
    };

    b2.PrismaticJoint.prototype.GetJointSpeed=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h;
    c=b.m_sweep.c.x+g-(a.m_sweep.c.x+d);
    var h=b.m_sweep.c.y+f-(a.m_sweep.c.y+e),i=a.GetWorldVector(this.m_localXAxis1),
    j=a.m_linearVelocity,k=b.m_linearVelocity,a=a.m_angularVelocity,b=b.m_angularVelocity;
    return c*-a*i.y+h*a*i.x+(i.x*(k.x+-b*f-j.x- -a*e)+i.y*(k.y+b*g-j.y-a*d))
    };
    b2.PrismaticJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };
    b2.PrismaticJoint.prototype.EnableLimit=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit=a
    };
    b2.PrismaticJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerTranslation
    };
    b2.PrismaticJoint.prototype.GetUpperLimit=function(){
    return this.m_upperTranslation
    };

    b2.PrismaticJoint.prototype.SetLimits=function(a,b){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation=a;
    this.m_upperTranslation=b
    };
    b2.PrismaticJoint.prototype.IsMotorEnabled=function(){
    return this.m_enableMotor
    };
    b2.PrismaticJoint.prototype.EnableMotor=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor=a
    };
    b2.PrismaticJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };

    b2.PrismaticJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.PrismaticJoint.prototype.SetMaxMotorForce=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce=a
    };
    b2.PrismaticJoint.prototype.GetMotorForce=function(){
    return this.m_motorImpulse
    };
    b2.PrismaticJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localXAxis1=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localYAxis1=new b2.Vec2;

    b2.PrismaticJoint.prototype.m_refAngle=null;
    b2.PrismaticJoint.prototype.m_axis=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_perp=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_s1=null;
    b2.PrismaticJoint.prototype.m_s2=null;
    b2.PrismaticJoint.prototype.m_a1=null;
    b2.PrismaticJoint.prototype.m_a2=null;
    b2.PrismaticJoint.prototype.m_K=new b2.Mat33;
    b2.PrismaticJoint.prototype.m_impulse=new b2.Vec3;
    b2.PrismaticJoint.prototype.m_motorMass=null;
    b2.PrismaticJoint.prototype.m_motorImpulse=null;

    b2.PrismaticJoint.prototype.m_lowerTranslation=null;
    b2.PrismaticJoint.prototype.m_upperTranslation=null;
    b2.PrismaticJoint.prototype.m_maxMotorForce=null;
    b2.PrismaticJoint.prototype.m_motorSpeed=null;
    b2.PrismaticJoint.prototype.m_enableLimit=null;
    b2.PrismaticJoint.prototype.m_enableMotor=null;
    b2.PrismaticJoint.prototype.m_limitState=0;
    b2.RevoluteJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.RevoluteJoint.prototype,b2.Joint.prototype);

    b2.RevoluteJoint.prototype._super=b2.Joint.prototype;

    b2.RevoluteJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_referenceAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse=0;
    this.m_lowerAngle=a.lowerAngle;
    this.m_upperAngle=a.upperAngle;
    this.m_maxMotorTorque=a.maxMotorTorque;
    this.m_motorSpeed=a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit
    };

    b2.RevoluteJoint.prototype.__varz=function(){
    this.K=new b2.Mat22;
    this.K1=new b2.Mat22;
    this.K2=new b2.Mat22;
    this.K3=new b2.Mat22;
    this.impulse3=new b2.Vec3;
    this.impulse2=new b2.Vec2;
    this.reduced=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_impulse=new b2.Vec3;
    this.m_mass=new b2.Mat33
    };
    b2.RevoluteJoint.tImpulse=new b2.Vec2;

    b2.RevoluteJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    d=b.m_xf.R;
    var h=this.m_localAnchor1.x-b.m_sweep.localCenter.x,g=this.m_localAnchor1.y-b.m_sweep.localCenter.y;
    e=d.col1.x*h+d.col2.x*g;
    g=d.col1.y*h+d.col2.y*g;
    h=e;
    d=c.m_xf.R;
    var f=this.m_localAnchor2.x-c.m_sweep.localCenter.x,i=this.m_localAnchor2.y-c.m_sweep.localCenter.y;
    e=d.col1.x*f+d.col2.x*i;
    i=d.col1.y*f+d.col2.y*i;
    f=e;
    d=b.m_invMass;
    e=c.m_invMass;
    var j=b.m_invI,k=c.m_invI;
    this.m_mass.col1.x=d+
        e+g*g*j+i*i*k;
    this.m_mass.col2.x=-g*h*j-i*f*k;
    this.m_mass.col3.x=-g*j-i*k;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=d+e+h*h*j+f*f*k;
    this.m_mass.col3.y=h*j+f*k;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=j+k;
    this.m_motorMass=1/(j+k);
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    if(this.m_enableLimit){
        var l=c.m_sweep.a-b.m_sweep.a-this.m_referenceAngle;
        if(b2.Math.Abs(this.m_upperAngle-this.m_lowerAngle)<2*b2.Settings.b2_angularSlop)this.m_limitState=
        b2.Joint.e_equalLimits;
        else if(l<=this.m_lowerAngle){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_impulse.z=0;
        this.m_limitState=b2.Joint.e_atLowerLimit}else if(l>=this.m_upperAngle){
            if(this.m_limitState!=b2.Joint.e_atUpperLimit)this.m_impulse.z=0;
            this.m_limitState=b2.Joint.e_atUpperLimit}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.z=0}else this.m_limitState=b2.Joint.e_inactiveLimit;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=
            a.dtRatio,a=this.m_impulse.x,l=this.m_impulse.y,b.m_linearVelocity.x-=d*a,b.m_linearVelocity.y-=d*l,b.m_angularVelocity-=j*(h*l-g*a+this.m_motorImpulse+this.m_impulse.z),c.m_linearVelocity.x+=e*a,c.m_linearVelocity.y+=e*l,c.m_angularVelocity+=k*(f*l-i*a+this.m_motorImpulse+this.m_impulse.z)):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.RevoluteJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e,h,g,f,i=b.m_linearVelocity,j=b.m_angularVelocity,k=c.m_linearVelocity,l=c.m_angularVelocity,n=b.m_invMass,m=c.m_invMass,o=b.m_invI,p=c.m_invI;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)h=this.m_motorMass*-(l-j-this.m_motorSpeed),g=this.m_motorImpulse,a=a.dt*this.m_maxMotorTorque,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+h,-a,a),h=this.m_motorImpulse-g,j-=o*h,l+=p*
        h;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        d=b.m_xf.R;
        h=this.m_localAnchor1.x-b.m_sweep.localCenter.x;
        g=this.m_localAnchor1.y-b.m_sweep.localCenter.y;
        e=d.col1.x*h+d.col2.x*g;
        g=d.col1.y*h+d.col2.y*g;
        h=e;
        d=c.m_xf.R;
        a=this.m_localAnchor2.x-c.m_sweep.localCenter.x;
        f=this.m_localAnchor2.y-c.m_sweep.localCenter.y;
        e=d.col1.x*a+d.col2.x*f;
        f=d.col1.y*a+d.col2.y*f;
        a=e;
        e=k.x+-l*f-i.x- -j*g;
        var q=k.y+l*a-i.y-j*h;
        this.m_mass.Solve33(this.impulse3,-e,-q,-(l-j));
        if(this.m_limitState==
           b2.Joint.e_equalLimits)this.m_impulse.Add(this.impulse3);
        else if(this.m_limitState==b2.Joint.e_atLowerLimit){
        if(d=this.m_impulse.z+this.impulse3.z,d<0)this.m_mass.Solve22(this.reduced,-e,-q),this.impulse3.x=this.reduced.x,this.impulse3.y=this.reduced.y,this.impulse3.z=-this.m_impulse.z,this.m_impulse.x+=this.reduced.x,this.m_impulse.y+=this.reduced.y,this.m_impulse.z=0}else if(this.m_limitState==b2.Joint.e_atUpperLimit&&(d=this.m_impulse.z+this.impulse3.z,d>0))this.m_mass.Solve22(this.reduced,-e,
                                                                                                                                                                                                    -q),this.impulse3.x=this.reduced.x,this.impulse3.y=this.reduced.y,this.impulse3.z=-this.m_impulse.z,this.m_impulse.x+=this.reduced.x,this.m_impulse.y+=this.reduced.y,this.m_impulse.z=0;
        i.x-=n*this.impulse3.x;
        i.y-=n*this.impulse3.y;
        j-=o*(h*this.impulse3.y-g*this.impulse3.x+this.impulse3.z);
        k.x+=m*this.impulse3.x;
        k.y+=m*this.impulse3.y;
        l+=p*(a*this.impulse3.y-f*this.impulse3.x+this.impulse3.z)}else d=b.m_xf.R,h=this.m_localAnchor1.x-b.m_sweep.localCenter.x,g=this.m_localAnchor1.y-b.m_sweep.localCenter.y,
    e=d.col1.x*h+d.col2.x*g,g=d.col1.y*h+d.col2.y*g,h=e,d=c.m_xf.R,a=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,e=d.col1.x*a+d.col2.x*f,f=d.col1.y*a+d.col2.y*f,a=e,this.m_mass.Solve22(this.impulse2,-(k.x+-l*f-i.x- -j*g),-(k.y+l*a-i.y-j*h)),this.m_impulse.x+=this.impulse2.x,this.m_impulse.y+=this.impulse2.y,i.x-=n*this.impulse2.x,i.y-=n*this.impulse2.y,j-=o*(h*this.impulse2.y-g*this.impulse2.x),k.x+=m*this.impulse2.x,k.y+=m*this.impulse2.y,l+=p*(a*this.impulse2.y-
                                                                                                                                                                                                                                                            f*this.impulse2.x);
    b.m_linearVelocity.SetV(i);
    b.m_angularVelocity=j;
    c.m_linearVelocity.SetV(k);
    c.m_angularVelocity=l
    };

    b2.RevoluteJoint.prototype.SolvePositionConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB,e=0;
    b=0;
    var h,g,f;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        a=d.m_sweep.a-c.m_sweep.a-this.m_referenceAngle;
        var i=0;
        this.m_limitState==b2.Joint.e_equalLimits?(a=b2.Math.Clamp(a-this.m_lowerAngle,-b2.Settings.b2_maxAngularCorrection,b2.Settings.b2_maxAngularCorrection),i=-this.m_motorMass*a,e=b2.Math.Abs(a)):this.m_limitState==b2.Joint.e_atLowerLimit?(a-=this.m_lowerAngle,
                                                                                                                             e=-a,a=b2.Math.Clamp(a+b2.Settings.b2_angularSlop,-b2.Settings.b2_maxAngularCorrection,0),i=-this.m_motorMass*a):this.m_limitState==b2.Joint.e_atUpperLimit&&(a-=this.m_upperAngle,e=a,a=b2.Math.Clamp(a-b2.Settings.b2_angularSlop,0,b2.Settings.b2_maxAngularCorrection),i=-this.m_motorMass*a);
        c.m_sweep.a-=c.m_invI*i;
        d.m_sweep.a+=d.m_invI*i;
        c.SynchronizeTransform();
        d.SynchronizeTransform()}b=c.m_xf.R;
    i=this.m_localAnchor1.x-c.m_sweep.localCenter.x;
    a=this.m_localAnchor1.y-c.m_sweep.localCenter.y;
    h=b.col1.x*
        i+b.col2.x*a;
    a=b.col1.y*i+b.col2.y*a;
    i=h;
    b=d.m_xf.R;
    var j=this.m_localAnchor2.x-d.m_sweep.localCenter.x,k=this.m_localAnchor2.y-d.m_sweep.localCenter.y;
    h=b.col1.x*j+b.col2.x*k;
    k=b.col1.y*j+b.col2.y*k;
    j=h;
    g=d.m_sweep.c.x+j-c.m_sweep.c.x-i;
    f=d.m_sweep.c.y+k-c.m_sweep.c.y-a;
    var l=g*g+f*f;
    b=Math.sqrt(l);
    h=c.m_invMass;
    var n=d.m_invMass,m=c.m_invI,o=d.m_invI,p=10*b2.Settings.b2_linearSlop;
    l>p*p&&(l=1/(h+n),g=l*-g,f=l*-f,c.m_sweep.c.x-=0.5*h*g,c.m_sweep.c.y-=0.5*h*f,d.m_sweep.c.x+=0.5*n*g,d.m_sweep.c.y+=
        0.5*n*f,g=d.m_sweep.c.x+j-c.m_sweep.c.x-i,f=d.m_sweep.c.y+k-c.m_sweep.c.y-a);
    this.K1.col1.x=h+n;
    this.K1.col2.x=0;
    this.K1.col1.y=0;
    this.K1.col2.y=h+n;
    this.K2.col1.x=m*a*a;
    this.K2.col2.x=-m*i*a;
    this.K2.col1.y=-m*i*a;
    this.K2.col2.y=m*i*i;
    this.K3.col1.x=o*k*k;
    this.K3.col2.x=-o*j*k;
    this.K3.col1.y=-o*j*k;
    this.K3.col2.y=o*j*j;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Solve(b2.RevoluteJoint.tImpulse,-g,-f);
    g=b2.RevoluteJoint.tImpulse.x;
    f=b2.RevoluteJoint.tImpulse.y;
    c.m_sweep.c.x-=
        c.m_invMass*g;
    c.m_sweep.c.y-=c.m_invMass*f;
    c.m_sweep.a-=c.m_invI*(i*f-a*g);
    d.m_sweep.c.x+=d.m_invMass*g;
    d.m_sweep.c.y+=d.m_invMass*f;
    d.m_sweep.a+=d.m_invI*(j*f-k*g);
    c.SynchronizeTransform();
    d.SynchronizeTransform();
    return b<=b2.Settings.b2_linearSlop&&e<=b2.Settings.b2_angularSlop
    };
    b2.RevoluteJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.RevoluteJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.RevoluteJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.RevoluteJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.z
    };
    b2.RevoluteJoint.prototype.GetJointAngle=function(){
    return this.m_bodyB.m_sweep.a-this.m_bodyA.m_sweep.a-this.m_referenceAngle
    };
    b2.RevoluteJoint.prototype.GetJointSpeed=function(){
    return this.m_bodyB.m_angularVelocity-this.m_bodyA.m_angularVelocity
    };
    b2.RevoluteJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };

    b2.RevoluteJoint.prototype.EnableLimit=function(a){
    this.m_enableLimit=a
    };
    b2.RevoluteJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerAngle
    };
    b2.RevoluteJoint.prototype.GetUpperLimit=function(){
    return this.m_upperAngle
    };
    b2.RevoluteJoint.prototype.SetLimits=function(a,b){
    this.m_lowerAngle=a;
    this.m_upperAngle=b
    };
    b2.RevoluteJoint.prototype.IsMotorEnabled=function(){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    return this.m_enableMotor
    };

    b2.RevoluteJoint.prototype.EnableMotor=function(a){
    this.m_enableMotor=a
    };
    b2.RevoluteJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };
    b2.RevoluteJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.RevoluteJoint.prototype.SetMaxMotorTorque=function(a){
    this.m_maxMotorTorque=a
    };
    b2.RevoluteJoint.prototype.GetMotorTorque=function(){
    return this.m_maxMotorTorque
    };
    b2.RevoluteJoint.prototype.K=new b2.Mat22;

    b2.RevoluteJoint.prototype.K1=new b2.Mat22;
    b2.RevoluteJoint.prototype.K2=new b2.Mat22;
    b2.RevoluteJoint.prototype.K3=new b2.Mat22;
    b2.RevoluteJoint.prototype.impulse3=new b2.Vec3;
    b2.RevoluteJoint.prototype.impulse2=new b2.Vec2;
    b2.RevoluteJoint.prototype.reduced=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_impulse=new b2.Vec3;
    b2.RevoluteJoint.prototype.m_motorImpulse=null;

    b2.RevoluteJoint.prototype.m_mass=new b2.Mat33;
    b2.RevoluteJoint.prototype.m_motorMass=null;
    b2.RevoluteJoint.prototype.m_enableMotor=null;
    b2.RevoluteJoint.prototype.m_maxMotorTorque=null;
    b2.RevoluteJoint.prototype.m_motorSpeed=null;
    b2.RevoluteJoint.prototype.m_enableLimit=null;
    b2.RevoluteJoint.prototype.m_referenceAngle=null;
    b2.RevoluteJoint.prototype.m_lowerAngle=null;
    b2.RevoluteJoint.prototype.m_upperAngle=null;
    b2.RevoluteJoint.prototype.m_limitState=0;

    b2.JointDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.JointDef.prototype.__constructor=function(){
    this.type=b2.Joint.e_unknownJoint;
    this.bodyB=this.bodyA=this.userData=null;
    this.collideConnected=!1
    };
    b2.JointDef.prototype.__varz=function(){

    };
    b2.JointDef.prototype.type=0;
    b2.JointDef.prototype.userData=null;
    b2.JointDef.prototype.bodyA=null;
    b2.JointDef.prototype.bodyB=null;
    b2.JointDef.prototype.collideConnected=null;

    b2.LineJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.LineJointDef.prototype,b2.JointDef.prototype);
    b2.LineJointDef.prototype._super=b2.JointDef.prototype;

    b2.LineJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_lineJoint;
    this.localAxisA.Set(1,0);
    this.enableLimit=!1;
    this.upperTranslation=this.lowerTranslation=0;
    this.enableMotor=!1;
    this.motorSpeed=this.maxMotorForce=0
    };
    b2.LineJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2;
    this.localAxisA=new b2.Vec2
    };

    b2.LineJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.localAxisA=this.bodyA.GetLocalVector(d)
    };
    b2.LineJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.LineJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.LineJointDef.prototype.localAxisA=new b2.Vec2;
    b2.LineJointDef.prototype.enableLimit=null;
    b2.LineJointDef.prototype.lowerTranslation=null;

    b2.LineJointDef.prototype.upperTranslation=null;
    b2.LineJointDef.prototype.enableMotor=null;
    b2.LineJointDef.prototype.maxMotorForce=null;
    b2.LineJointDef.prototype.motorSpeed=null;
    b2.DistanceJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.DistanceJoint.prototype,b2.Joint.prototype);
    b2.DistanceJoint.prototype._super=b2.Joint.prototype;

    b2.DistanceJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_length=a.length;
    this.m_frequencyHz=a.frequencyHz;
    this.m_dampingRatio=a.dampingRatio;
    this.m_bias=this.m_gamma=this.m_impulse=0
    };
    b2.DistanceJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_u=new b2.Vec2
    };

    b2.DistanceJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchor1.x-d.m_sweep.localCenter.x,g=this.m_localAnchor1.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchor2.x-e.m_sweep.localCenter.x,i=this.m_localAnchor2.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    this.m_u.x=e.m_sweep.c.x+f-d.m_sweep.c.x-h;
    this.m_u.y=e.m_sweep.c.y+i-d.m_sweep.c.y-
        g;
    c=Math.sqrt(this.m_u.x*this.m_u.x+this.m_u.y*this.m_u.y);
    c>b2.Settings.b2_linearSlop?this.m_u.Multiply(1/c):this.m_u.SetZero();
    b=h*this.m_u.y-g*this.m_u.x;
    var j=f*this.m_u.y-i*this.m_u.x;
    b=d.m_invMass+d.m_invI*b*b+e.m_invMass+e.m_invI*j*j;
    this.m_mass=b!=0?1/b:0;
    if(this.m_frequencyHz>0){
        c-=this.m_length;
        var j=2*Math.PI*this.m_frequencyHz,k=this.m_mass*j*j;
        this.m_gamma=a.dt*(2*this.m_mass*this.m_dampingRatio*j+a.dt*k);
        this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0;
        this.m_bias=c*a.dt*k*this.m_gamma;

        this.m_mass=b+this.m_gamma;
        this.m_mass=this.m_mass!=0?1/this.m_mass:0}a.warmStarting?(this.m_impulse*=a.dtRatio,a=this.m_impulse*this.m_u.x,b=this.m_impulse*this.m_u.y,d.m_linearVelocity.x-=d.m_invMass*a,d.m_linearVelocity.y-=d.m_invMass*b,d.m_angularVelocity-=d.m_invI*(h*b-g*a),e.m_linearVelocity.x+=e.m_invMass*a,e.m_linearVelocity.y+=e.m_invMass*b,e.m_angularVelocity+=e.m_invI*(f*b-i*a)):this.m_impulse=0
    };

    b2.DistanceJoint.prototype.SolveVelocityConstraints=function(){
    var a,b=this.m_bodyA,c=this.m_bodyB;
    a=b.m_xf.R;
    var d=this.m_localAnchor1.x-b.m_sweep.localCenter.x,e=this.m_localAnchor1.y-b.m_sweep.localCenter.y,h=a.col1.x*d+a.col2.x*e,e=a.col1.y*d+a.col2.y*e,d=h;
    a=c.m_xf.R;
    var g=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,h=a.col1.x*g+a.col2.x*f,f=a.col1.y*g+a.col2.y*f,g=h,h=-this.m_mass*(this.m_u.x*(c.m_linearVelocity.x+-c.m_angularVelocity*f-(b.m_linearVelocity.x+
                                                                                                                     -b.m_angularVelocity*e))+this.m_u.y*(c.m_linearVelocity.y+c.m_angularVelocity*g-(b.m_linearVelocity.y+b.m_angularVelocity*d))+this.m_bias+this.m_gamma*this.m_impulse);
    this.m_impulse+=h;
    a=h*this.m_u.x;
    h*=this.m_u.y;
    b.m_linearVelocity.x-=b.m_invMass*a;
    b.m_linearVelocity.y-=b.m_invMass*h;
    b.m_angularVelocity-=b.m_invI*(d*h-e*a);
    c.m_linearVelocity.x+=c.m_invMass*a;
    c.m_linearVelocity.y+=c.m_invMass*h;
    c.m_angularVelocity+=c.m_invI*(g*h-f*a)
    };

    b2.DistanceJoint.prototype.SolvePositionConstraints=function(){
    var a;
    if(this.m_frequencyHz>0)return!0;
    var b=this.m_bodyA,c=this.m_bodyB;
    a=b.m_xf.R;
    var d=this.m_localAnchor1.x-b.m_sweep.localCenter.x,e=this.m_localAnchor1.y-b.m_sweep.localCenter.y,h=a.col1.x*d+a.col2.x*e,e=a.col1.y*d+a.col2.y*e,d=h;
    a=c.m_xf.R;
    var g=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,h=a.col1.x*g+a.col2.x*f,f=a.col1.y*g+a.col2.y*f,g=h,h=c.m_sweep.c.x+g-b.m_sweep.c.x-d,i=c.m_sweep.c.y+
        f-b.m_sweep.c.y-e;
    a=Math.sqrt(h*h+i*i);
    h/=a;
    i/=a;
    a-=this.m_length;
    a=b2.Math.Clamp(a,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection);
    var j=-this.m_mass*a;
    this.m_u.Set(h,i);
    h=j*this.m_u.x;
    i=j*this.m_u.y;
    b.m_sweep.c.x-=b.m_invMass*h;
    b.m_sweep.c.y-=b.m_invMass*i;
    b.m_sweep.a-=b.m_invI*(d*i-e*h);
    c.m_sweep.c.x+=c.m_invMass*h;
    c.m_sweep.c.y+=c.m_invMass*i;
    c.m_sweep.a+=c.m_invI*(g*i-f*h);
    b.SynchronizeTransform();
    c.SynchronizeTransform();
    return b2.Math.Abs(a)<b2.Settings.b2_linearSlop
    };

    b2.DistanceJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.DistanceJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2.DistanceJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_u.x,a*this.m_impulse*this.m_u.y)
    };
    b2.DistanceJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.DistanceJoint.prototype.GetLength=function(){
    return this.m_length
    };

    b2.DistanceJoint.prototype.SetLength=function(a){
    this.m_length=a
    };
    b2.DistanceJoint.prototype.GetFrequency=function(){
    return this.m_frequencyHz
    };
    b2.DistanceJoint.prototype.SetFrequency=function(a){
    this.m_frequencyHz=a
    };
    b2.DistanceJoint.prototype.GetDampingRatio=function(){
    return this.m_dampingRatio
    };
    b2.DistanceJoint.prototype.SetDampingRatio=function(a){
    this.m_dampingRatio=a
    };
    b2.DistanceJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.DistanceJoint.prototype.m_localAnchor2=new b2.Vec2;

    b2.DistanceJoint.prototype.m_u=new b2.Vec2;
    b2.DistanceJoint.prototype.m_frequencyHz=null;
    b2.DistanceJoint.prototype.m_dampingRatio=null;
    b2.DistanceJoint.prototype.m_gamma=null;
    b2.DistanceJoint.prototype.m_bias=null;
    b2.DistanceJoint.prototype.m_impulse=null;
    b2.DistanceJoint.prototype.m_mass=null;
    b2.DistanceJoint.prototype.m_length=null;
    b2.PulleyJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PulleyJointDef.prototype,b2.JointDef.prototype);

    b2.PulleyJointDef.prototype._super=b2.JointDef.prototype;
    b2.PulleyJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_pulleyJoint;
    this.groundAnchorA.Set(-1,1);
    this.groundAnchorB.Set(1,1);
    this.localAnchorA.Set(-1,0);
    this.localAnchorB.Set(1,0);
    this.maxLengthB=this.lengthB=this.maxLengthA=this.lengthA=0;
    this.ratio=1;
    this.collideConnected=!0
    };

    b2.PulleyJointDef.prototype.__varz=function(){
    this.groundAnchorA=new b2.Vec2;
    this.groundAnchorB=new b2.Vec2;
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };

    b2.PulleyJointDef.prototype.Initialize=function(a,b,c,d,e,h,g){
    this.bodyA=a;
    this.bodyB=b;
    this.groundAnchorA.SetV(c);
    this.groundAnchorB.SetV(d);
    this.localAnchorA=this.bodyA.GetLocalPoint(e);
    this.localAnchorB=this.bodyB.GetLocalPoint(h);
    a=e.x-c.x;
    c=e.y-c.y;
    this.lengthA=Math.sqrt(a*a+c*c);
    c=h.x-d.x;
    d=h.y-d.y;
    this.lengthB=Math.sqrt(c*c+d*d);
    this.ratio=g;
    g=this.lengthA+this.ratio*this.lengthB;
    this.maxLengthA=g-this.ratio*b2.PulleyJoint.b2_minPulleyLength;
    this.maxLengthB=(g-b2.PulleyJoint.b2_minPulleyLength)/
        this.ratio
    };
    b2.PulleyJointDef.prototype.groundAnchorA=new b2.Vec2;
    b2.PulleyJointDef.prototype.groundAnchorB=new b2.Vec2;
    b2.PulleyJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.PulleyJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.PulleyJointDef.prototype.lengthA=null;
    b2.PulleyJointDef.prototype.maxLengthA=null;
    b2.PulleyJointDef.prototype.lengthB=null;
    b2.PulleyJointDef.prototype.maxLengthB=null;
    b2.PulleyJointDef.prototype.ratio=null;

    b2.DistanceJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.DistanceJointDef.prototype,b2.JointDef.prototype);
    b2.DistanceJointDef.prototype._super=b2.JointDef.prototype;
    b2.DistanceJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_distanceJoint;
    this.length=1;
    this.dampingRatio=this.frequencyHz=0
    };

    b2.DistanceJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.DistanceJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
    a=d.x-c.x;
    c=d.y-c.y;
    this.length=Math.sqrt(a*a+c*c);
    this.dampingRatio=this.frequencyHz=0
    };
    b2.DistanceJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.DistanceJointDef.prototype.localAnchorB=new b2.Vec2;

    b2.DistanceJointDef.prototype.length=null;
    b2.DistanceJointDef.prototype.frequencyHz=null;
    b2.DistanceJointDef.prototype.dampingRatio=null;
    b2.FrictionJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.FrictionJointDef.prototype,b2.JointDef.prototype);
    b2.FrictionJointDef.prototype._super=b2.JointDef.prototype;

    b2.FrictionJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_frictionJoint;
    this.maxTorque=this.maxForce=0
    };
    b2.FrictionJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.FrictionJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c))
    };

    b2.FrictionJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.FrictionJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.FrictionJointDef.prototype.maxForce=null;
    b2.FrictionJointDef.prototype.maxTorque=null;
    b2.WeldJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.WeldJointDef.prototype,b2.JointDef.prototype);
    b2.WeldJointDef.prototype._super=b2.JointDef.prototype;

    b2.WeldJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_weldJoint;
    this.referenceAngle=0
    };
    b2.WeldJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.WeldJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c));
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };

    b2.WeldJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.WeldJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.WeldJointDef.prototype.referenceAngle=null;
    b2.GearJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GearJointDef.prototype,b2.JointDef.prototype);
    b2.GearJointDef.prototype._super=b2.JointDef.prototype;

    b2.GearJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_gearJoint;
    this.joint2=this.joint1=null;
    this.ratio=1
    };
    b2.GearJointDef.prototype.__varz=function(){

    };
    b2.GearJointDef.prototype.joint1=null;
    b2.GearJointDef.prototype.joint2=null;
    b2.GearJointDef.prototype.ratio=null;
    b2.Color=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Color.prototype.__constructor=function(a,b,c){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1));
    this._g=parseInt(255*b2.Math.Clamp(b,0,1));
    this._b=parseInt(255*b2.Math.Clamp(c,0,1))
    };
    b2.Color.prototype.__varz=function(){

    };
    b2.Color.prototype.Set=function(a,b,c){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1));
    this._g=parseInt(255*b2.Math.Clamp(b,0,1));
    this._b=parseInt(255*b2.Math.Clamp(c,0,1))
    };
    b2.Color.prototype.__defineGetter__("r",function(){
    return this._r});

    b2.Color.prototype.__defineSetter__("r",function(a){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1))});
    b2.Color.prototype.__defineGetter__("g",function(){
    return this._g});
    b2.Color.prototype.__defineSetter__("g",function(a){
    this._g=parseInt(255*b2.Math.Clamp(a,0,1))});
    b2.Color.prototype.__defineGetter__("b",function(){
    return this._b});
    b2.Color.prototype.__defineSetter__("b",function(a){
    this._b=parseInt(255*b2.Math.Clamp(a,0,1))});

    b2.Color.prototype.__defineGetter__("color",function(){
    return this._r<<16|this._g<<8|this._b});
    b2.Color.prototype._r=0;
    b2.Color.prototype._g=0;
    b2.Color.prototype._b=0;
    b2.FrictionJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.FrictionJoint.prototype,b2.Joint.prototype);
    b2.FrictionJoint.prototype._super=b2.Joint.prototype;

    b2.FrictionJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_linearMass.SetZero();
    this.m_angularMass=0;
    this.m_linearImpulse.SetZero();
    this.m_angularImpulse=0;
    this.m_maxForce=a.maxForce;
    this.m_maxTorque=a.maxTorque
    };
    b2.FrictionJoint.prototype.__varz=function(){
    this.m_localAnchorA=new b2.Vec2;
    this.m_localAnchorB=new b2.Vec2;
    this.m_linearImpulse=new b2.Vec2;
    this.m_linearMass=new b2.Mat22
    };

    b2.FrictionJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchorA.x-d.m_sweep.localCenter.x,g=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchorB.x-e.m_sweep.localCenter.x,i=this.m_localAnchorB.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    b=d.m_invMass;
    c=e.m_invMass;
    var j=d.m_invI,k=e.m_invI,l=new b2.Mat22;
    l.col1.x=
        b+c;
    l.col2.x=0;
    l.col1.y=0;
    l.col2.y=b+c;
    l.col1.x+=j*g*g;
    l.col2.x+=-j*h*g;
    l.col1.y+=-j*h*g;
    l.col2.y+=j*h*h;
    l.col1.x+=k*i*i;
    l.col2.x+=-k*f*i;
    l.col1.y+=-k*f*i;
    l.col2.y+=k*f*f;
    l.GetInverse(this.m_linearMass);
    this.m_angularMass=j+k;
    if(this.m_angularMass>0)this.m_angularMass=1/this.m_angularMass;
    a.warmStarting?(this.m_linearImpulse.x*=a.dtRatio,this.m_linearImpulse.y*=a.dtRatio,this.m_angularImpulse*=a.dtRatio,a=this.m_linearImpulse,d.m_linearVelocity.x-=b*a.x,d.m_linearVelocity.y-=b*a.y,d.m_angularVelocity-=
            j*(h*a.y-g*a.x+this.m_angularImpulse),e.m_linearVelocity.x+=c*a.x,e.m_linearVelocity.y+=c*a.y,e.m_angularVelocity+=k*(f*a.y-i*a.x+this.m_angularImpulse)):(this.m_linearImpulse.SetZero(),this.m_angularImpulse=0)
    };

    b2.FrictionJoint.prototype.SolveVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB,h=d.m_linearVelocity,g=d.m_angularVelocity,f=e.m_linearVelocity,i=e.m_angularVelocity,j=d.m_invMass,k=e.m_invMass,l=d.m_invI,n=e.m_invI;
    b=d.m_xf.R;
    var m=this.m_localAnchorA.x-d.m_sweep.localCenter.x,o=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*m+b.col2.x*o;
    o=b.col1.y*m+b.col2.y*o;
    m=c;
    b=e.m_xf.R;
    var p=this.m_localAnchorB.x-e.m_sweep.localCenter.x,q=this.m_localAnchorB.y-e.m_sweep.localCenter.y;

    c=b.col1.x*p+b.col2.x*q;
    q=b.col1.y*p+b.col2.y*q;
    p=c;
    c=-this.m_angularMass*(i-g);
    var r=this.m_angularImpulse;
    b=a.dt*this.m_maxTorque;
    this.m_angularImpulse=b2.Math.Clamp(this.m_angularImpulse+c,-b,b);
    c=this.m_angularImpulse-r;
    g-=l*c;
    i+=n*c;
    b=b2.Math.MulMV(this.m_linearMass,new b2.Vec2(-(f.x-i*q-h.x+g*o),-(f.y+i*p-h.y-g*m)));
    c=this.m_linearImpulse.Copy();
    this.m_linearImpulse.Add(b);
    b=a.dt*this.m_maxForce;
    this.m_linearImpulse.LengthSquared()>b*b&&(this.m_linearImpulse.Normalize(),this.m_linearImpulse.Multiply(b));

    b=b2.Math.SubtractVV(this.m_linearImpulse,c);
    h.x-=j*b.x;
    h.y-=j*b.y;
    g-=l*(m*b.y-o*b.x);
    f.x+=k*b.x;
    f.y+=k*b.y;
    i+=n*(p*b.y-q*b.x);
    d.m_angularVelocity=g;
    e.m_angularVelocity=i
    };
    b2.FrictionJoint.prototype.SolvePositionConstraints=function(){
    return!0
    };
    b2.FrictionJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2.FrictionJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };

    b2.FrictionJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_linearImpulse.x,a*this.m_linearImpulse.y)
    };
    b2.FrictionJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_angularImpulse
    };
    b2.FrictionJoint.prototype.SetMaxForce=function(a){
    this.m_maxForce=a
    };
    b2.FrictionJoint.prototype.GetMaxForce=function(){
    return this.m_maxForce
    };
    b2.FrictionJoint.prototype.SetMaxTorque=function(a){
    this.m_maxTorque=a
    };
    b2.FrictionJoint.prototype.GetMaxTorque=function(){
    return this.m_maxTorque
    };

    b2.FrictionJoint.prototype.m_localAnchorA=new b2.Vec2;
    b2.FrictionJoint.prototype.m_localAnchorB=new b2.Vec2;
    b2.FrictionJoint.prototype.m_linearImpulse=new b2.Vec2;
    b2.FrictionJoint.prototype.m_angularImpulse=null;
    b2.FrictionJoint.prototype.m_maxForce=null;
    b2.FrictionJoint.prototype.m_maxTorque=null;
    b2.FrictionJoint.prototype.m_linearMass=new b2.Mat22;
    b2.FrictionJoint.prototype.m_angularMass=null;
    b2.Distance=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Distance.prototype.__constructor=function(){

    };
    b2.Distance.prototype.__varz=function(){

    };

    b2.Distance.Distance=function(a,b,c){
    ++b2.Distance.b2_gjkCalls;
    var d=c.proxyA,e=c.proxyB,h=c.transformA,g=c.transformB,f=b2.Distance.s_simplex;
    f.ReadCache(b,d,h,e,g);
    var i=f.m_vertices,j=b2.Distance.s_saveA,k=b2.Distance.s_saveB,l=0;
    f.GetClosestPoint().LengthSquared();
    for(var n=0,m,o=0;
        o<20;
       ){
        l=f.m_count;
        for(n=0;
        n<l;
        n++)j[n]=i[n].indexA,k[n]=i[n].indexB;
        switch(f.m_count){
        case 1:break;
        case 2:f.Solve2();
        break;
        case 3:f.Solve3();
        break;
        default:b2.Settings.b2Assert(!1)}if(f.m_count==3)break;
        m=f.GetClosestPoint();

        m.LengthSquared();
        n=f.GetSearchDirection();
        if(n.LengthSquared()<Number.MIN_VALUE*Number.MIN_VALUE)break;
        m=i[f.m_count];
        m.indexA=d.GetSupport(b2.Math.MulTMV(h.R,n.GetNegative()));
        m.wA=b2.Math.MulX(h,d.GetVertex(m.indexA));
        m.indexB=e.GetSupport(b2.Math.MulTMV(g.R,n));
        m.wB=b2.Math.MulX(g,e.GetVertex(m.indexB));
        m.w=b2.Math.SubtractVV(m.wB,m.wA);
        ++o;
        ++b2.Distance.b2_gjkIters;
        for(var p=!1,n=0;
        n<l;
        n++)if(m.indexA==j[n]&&m.indexB==k[n]){
            p=!0;
            break}if(p)break;
        ++f.m_count}b2.Distance.b2_gjkMaxIters=b2.Math.Max(b2.Distance.b2_gjkMaxIters,
                                   o);
    f.GetWitnessPoints(a.pointA,a.pointB);
    a.distance=b2.Math.SubtractVV(a.pointA,a.pointB).Length();
    a.iterations=o;
    f.WriteCache(b);
    if(c.useRadii)b=d.m_radius,e=e.m_radius,a.distance>b+e&&a.distance>Number.MIN_VALUE?(a.distance-=b+e,c=b2.Math.SubtractVV(a.pointB,a.pointA),c.Normalize(),a.pointA.x+=b*c.x,a.pointA.y+=b*c.y,a.pointB.x-=e*c.x,a.pointB.y-=e*c.y):(m=new b2.Vec2,m.x=0.5*(a.pointA.x+a.pointB.x),m.y=0.5*(a.pointA.y+a.pointB.y),a.pointA.x=a.pointB.x=m.x,a.pointA.y=a.pointB.y=m.y,a.distance=0)
    };

    b2.Distance.b2_gjkCalls=0;
    b2.Distance.b2_gjkIters=0;
    b2.Distance.b2_gjkMaxIters=0;
    b2.Distance.s_simplex=new b2.Simplex;
    b2.Distance.s_saveA=Array(3);
    b2.Distance.s_saveB=Array(3);
    b2.MouseJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.MouseJoint.prototype,b2.Joint.prototype);
    b2.MouseJoint.prototype._super=b2.Joint.prototype;

    b2.MouseJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_target.SetV(a.target);
    var b=this.m_target.x-this.m_bodyB.m_xf.position.x,c=this.m_target.y-this.m_bodyB.m_xf.position.y,d=this.m_bodyB.m_xf.R;
    this.m_localAnchor.x=b*d.col1.x+c*d.col1.y;
    this.m_localAnchor.y=b*d.col2.x+c*d.col2.y;
    this.m_maxForce=a.maxForce;
    this.m_impulse.SetZero();
    this.m_frequencyHz=a.frequencyHz;
    this.m_dampingRatio=a.dampingRatio;
    this.m_gamma=this.m_beta=0
    };

    b2.MouseJoint.prototype.__varz=function(){
    this.K=new b2.Mat22;
    this.K1=new b2.Mat22;
    this.K2=new b2.Mat22;
    this.m_localAnchor=new b2.Vec2;
    this.m_target=new b2.Vec2;
    this.m_impulse=new b2.Vec2;
    this.m_mass=new b2.Mat22;
    this.m_C=new b2.Vec2
    };

    b2.MouseJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyB,c=b.GetMass(),d=2*Math.PI*this.m_frequencyHz,e=c*d*d;
    this.m_gamma=a.dt*(2*c*this.m_dampingRatio*d+a.dt*e);
    this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0;
    this.m_beta=a.dt*e*this.m_gamma;
    var e=b.m_xf.R,c=this.m_localAnchor.x-b.m_sweep.localCenter.x,d=this.m_localAnchor.y-b.m_sweep.localCenter.y,h=e.col1.x*c+e.col2.x*d,d=e.col1.y*c+e.col2.y*d,c=h,e=b.m_invMass,h=b.m_invI;
    this.K1.col1.x=e;
    this.K1.col2.x=0;
    this.K1.col1.y=0;
    this.K1.col2.y=
        e;
    this.K2.col1.x=h*d*d;
    this.K2.col2.x=-h*c*d;
    this.K2.col1.y=-h*c*d;
    this.K2.col2.y=h*c*c;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.col1.x+=this.m_gamma;
    this.K.col2.y+=this.m_gamma;
    this.K.GetInverse(this.m_mass);
    this.m_C.x=b.m_sweep.c.x+c-this.m_target.x;
    this.m_C.y=b.m_sweep.c.y+d-this.m_target.y;
    b.m_angularVelocity*=0.98;
    this.m_impulse.x*=a.dtRatio;
    this.m_impulse.y*=a.dtRatio;
    b.m_linearVelocity.x+=e*this.m_impulse.x;
    b.m_linearVelocity.y+=e*this.m_impulse.y;
    b.m_angularVelocity+=h*(c*this.m_impulse.y-
                d*this.m_impulse.x)
    };

    b2.MouseJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyB,c,d,e;
    c=b.m_xf.R;
    var h=this.m_localAnchor.x-b.m_sweep.localCenter.x,g=this.m_localAnchor.y-b.m_sweep.localCenter.y;
    d=c.col1.x*h+c.col2.x*g;
    g=c.col1.y*h+c.col2.y*g;
    h=d;
    d=b.m_linearVelocity.x+-b.m_angularVelocity*g;
    var f=b.m_linearVelocity.y+b.m_angularVelocity*h;
    c=this.m_mass;
    d=d+this.m_beta*this.m_C.x+this.m_gamma*this.m_impulse.x;
    e=f+this.m_beta*this.m_C.y+this.m_gamma*this.m_impulse.y;
    f=-(c.col1.x*d+c.col2.x*e);
    e=-(c.col1.y*
        d+c.col2.y*e);
    c=this.m_impulse.x;
    d=this.m_impulse.y;
    this.m_impulse.x+=f;
    this.m_impulse.y+=e;
    a=a.dt*this.m_maxForce;
    this.m_impulse.LengthSquared()>a*a&&this.m_impulse.Multiply(a/this.m_impulse.Length());
    f=this.m_impulse.x-c;
    e=this.m_impulse.y-d;
    b.m_linearVelocity.x+=b.m_invMass*f;
    b.m_linearVelocity.y+=b.m_invMass*e;
    b.m_angularVelocity+=b.m_invI*(h*e-g*f)
    };
    b2.MouseJoint.prototype.SolvePositionConstraints=function(){
    return!0
    };
    b2.MouseJoint.prototype.GetAnchorA=function(){
    return this.m_target
    };

    b2.MouseJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    };
    b2.MouseJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.MouseJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.MouseJoint.prototype.GetTarget=function(){
    return this.m_target
    };
    b2.MouseJoint.prototype.SetTarget=function(a){
    this.m_bodyB.IsAwake()==!1&&this.m_bodyB.SetAwake(!0);
    this.m_target=a
    };
    b2.MouseJoint.prototype.GetMaxForce=function(){
    return this.m_maxForce
    };

    b2.MouseJoint.prototype.SetMaxForce=function(a){
    this.m_maxForce=a
    };
    b2.MouseJoint.prototype.GetFrequency=function(){
    return this.m_frequencyHz
    };
    b2.MouseJoint.prototype.SetFrequency=function(a){
    this.m_frequencyHz=a
    };
    b2.MouseJoint.prototype.GetDampingRatio=function(){
    return this.m_dampingRatio
    };
    b2.MouseJoint.prototype.SetDampingRatio=function(a){
    this.m_dampingRatio=a
    };
    b2.MouseJoint.prototype.K=new b2.Mat22;
    b2.MouseJoint.prototype.K1=new b2.Mat22;
    b2.MouseJoint.prototype.K2=new b2.Mat22;

    b2.MouseJoint.prototype.m_localAnchor=new b2.Vec2;
    b2.MouseJoint.prototype.m_target=new b2.Vec2;
    b2.MouseJoint.prototype.m_impulse=new b2.Vec2;
    b2.MouseJoint.prototype.m_mass=new b2.Mat22;
    b2.MouseJoint.prototype.m_C=new b2.Vec2;
    b2.MouseJoint.prototype.m_maxForce=null;
    b2.MouseJoint.prototype.m_frequencyHz=null;
    b2.MouseJoint.prototype.m_dampingRatio=null;
    b2.MouseJoint.prototype.m_beta=null;
    b2.MouseJoint.prototype.m_gamma=null;

    b2.PrismaticJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PrismaticJointDef.prototype,b2.JointDef.prototype);
    b2.PrismaticJointDef.prototype._super=b2.JointDef.prototype;

    b2.PrismaticJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_prismaticJoint;
    this.localAxisA.Set(1,0);
    this.referenceAngle=0;
    this.enableLimit=!1;
    this.upperTranslation=this.lowerTranslation=0;
    this.enableMotor=!1;
    this.motorSpeed=this.maxMotorForce=0
    };
    b2.PrismaticJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2;
    this.localAxisA=new b2.Vec2
    };

    b2.PrismaticJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.localAxisA=this.bodyA.GetLocalVector(d);
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };
    b2.PrismaticJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.PrismaticJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.PrismaticJointDef.prototype.localAxisA=new b2.Vec2;
    b2.PrismaticJointDef.prototype.referenceAngle=null;

    b2.PrismaticJointDef.prototype.enableLimit=null;
    b2.PrismaticJointDef.prototype.lowerTranslation=null;
    b2.PrismaticJointDef.prototype.upperTranslation=null;
    b2.PrismaticJointDef.prototype.enableMotor=null;
    b2.PrismaticJointDef.prototype.maxMotorForce=null;
    b2.PrismaticJointDef.prototype.motorSpeed=null;
    b2.TimeOfImpact=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TimeOfImpact.prototype.__constructor=function(){

    };
    b2.TimeOfImpact.prototype.__varz=function(){

    };

    b2.TimeOfImpact.TimeOfImpact=function(a){
    ++b2.TimeOfImpact.b2_toiCalls;
    var b=a.proxyA,c=a.proxyB,d=a.sweepA,e=a.sweepB;
    b2.Settings.b2Assert(d.t0==e.t0);
    b2.Settings.b2Assert(1-d.t0>Number.MIN_VALUE);
    var h=b.m_radius+c.m_radius,a=a.tolerance,g=0,f=0,i=0;
    b2.TimeOfImpact.s_cache.count=0;
    for(b2.TimeOfImpact.s_distanceInput.useRadii=!1;
        ;
       ){
        d.GetTransform(b2.TimeOfImpact.s_xfA,g);
        e.GetTransform(b2.TimeOfImpact.s_xfB,g);
        b2.TimeOfImpact.s_distanceInput.proxyA=b;
        b2.TimeOfImpact.s_distanceInput.proxyB=c;
        b2.TimeOfImpact.s_distanceInput.transformA=
        b2.TimeOfImpact.s_xfA;
        b2.TimeOfImpact.s_distanceInput.transformB=b2.TimeOfImpact.s_xfB;
        b2.Distance.Distance(b2.TimeOfImpact.s_distanceOutput,b2.TimeOfImpact.s_cache,b2.TimeOfImpact.s_distanceInput);
        if(b2.TimeOfImpact.s_distanceOutput.distance<=0){
        g=1;
        break}b2.TimeOfImpact.s_fcn.Initialize(b2.TimeOfImpact.s_cache,b,b2.TimeOfImpact.s_xfA,c,b2.TimeOfImpact.s_xfB);
        var j=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
        if(j<=0){
        g=1;
        break}f==0&&(i=j>h?b2.Math.Max(h-a,0.75*h):
                 b2.Math.Max(j-a,0.02*h));
        if(j-i<0.5*a){
        if(f==0){
            g=1;
            break}break}var k=g,l=g,n=1;
        d.GetTransform(b2.TimeOfImpact.s_xfA,n);
        e.GetTransform(b2.TimeOfImpact.s_xfB,n);
        var m=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
        if(m>=i){
        g=1;
        break}for(var o=0;
              ;
             ){
            var p;
            p=o&1?l+(i-j)*(n-l)/(m-j):0.5*(l+n);
            d.GetTransform(b2.TimeOfImpact.s_xfA,p);
            e.GetTransform(b2.TimeOfImpact.s_xfB,p);
            var q=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
            if(b2.Math.Abs(q-i)<0.025*
               a){
            k=p;
            break}q>i?(l=p,j=q):(n=p,m=q);
            ++o;
            ++b2.TimeOfImpact.b2_toiRootIters;
            if(o==50)break}b2.TimeOfImpact.b2_toiMaxRootIters=b2.Math.Max(b2.TimeOfImpact.b2_toiMaxRootIters,o);
        if(k<(1+100*Number.MIN_VALUE)*g)break;
        g=k;
        f++;
        ++b2.TimeOfImpact.b2_toiIters;
        if(f==1E3)break}b2.TimeOfImpact.b2_toiMaxIters=b2.Math.Max(b2.TimeOfImpact.b2_toiMaxIters,f);
    return g
    };
    b2.TimeOfImpact.b2_toiCalls=0;
    b2.TimeOfImpact.b2_toiIters=0;
    b2.TimeOfImpact.b2_toiMaxIters=0;
    b2.TimeOfImpact.b2_toiRootIters=0;

    b2.TimeOfImpact.b2_toiMaxRootIters=0;
    b2.TimeOfImpact.s_cache=new b2.SimplexCache;
    b2.TimeOfImpact.s_distanceInput=new b2.DistanceInput;
    b2.TimeOfImpact.s_xfA=new b2.Transform;
    b2.TimeOfImpact.s_xfB=new b2.Transform;
    b2.TimeOfImpact.s_fcn=new b2.SeparationFunction;
    b2.TimeOfImpact.s_distanceOutput=new b2.DistanceOutput;
    b2.GearJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GearJoint.prototype,b2.Joint.prototype);

    b2.GearJoint.prototype._super=b2.Joint.prototype;

    b2.GearJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    var b=a.joint1.m_type,c=a.joint2.m_type;
    this.m_prismatic2=this.m_revolute2=this.m_prismatic1=this.m_revolute1=null;
    this.m_ground1=a.joint1.GetBodyA();
    this.m_bodyA=a.joint1.GetBodyB();
    b==b2.Joint.e_revoluteJoint?(this.m_revolute1=a.joint1,this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1),this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2),b=this.m_revolute1.GetJointAngle()):(this.m_prismatic1=
                                                                                                             a.joint1,this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1),this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2),b=this.m_prismatic1.GetJointTranslation());
    this.m_ground2=a.joint2.GetBodyA();
    this.m_bodyB=a.joint2.GetBodyB();
    c==b2.Joint.e_revoluteJoint?(this.m_revolute2=a.joint2,this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1),this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2),c=this.m_revolute2.GetJointAngle()):(this.m_prismatic2=a.joint2,this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1),
                                                                                                             this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2),c=this.m_prismatic2.GetJointTranslation());
    this.m_ratio=a.ratio;
    this.m_constant=b+this.m_ratio*c;
    this.m_impulse=0
    };
    b2.GearJoint.prototype.__varz=function(){
    this.m_groundAnchor1=new b2.Vec2;
    this.m_groundAnchor2=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_J=new b2.Jacobian
    };

    b2.GearJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_ground1,c=this.m_ground2,d=this.m_bodyA,e=this.m_bodyB,h,g,f,i,j,k=0;
    this.m_J.SetZero();
    this.m_revolute1?(this.m_J.angularA=-1,k+=d.m_invI):(i=b.m_xf.R,h=this.m_prismatic1.m_localXAxis1,b=i.col1.x*h.x+i.col2.x*h.y,h=i.col1.y*h.x+i.col2.y*h.y,i=d.m_xf.R,g=this.m_localAnchor1.x-d.m_sweep.localCenter.x,f=this.m_localAnchor1.y-d.m_sweep.localCenter.y,j=i.col1.x*g+i.col2.x*f,f=i.col1.y*g+i.col2.y*f,i=j*h-f*b,this.m_J.linearA.Set(-b,
                                                                                                                                                                                -h),this.m_J.angularA=-i,k+=d.m_invMass+d.m_invI*i*i);
    this.m_revolute2?(this.m_J.angularB=-this.m_ratio,k+=this.m_ratio*this.m_ratio*e.m_invI):(i=c.m_xf.R,h=this.m_prismatic2.m_localXAxis1,b=i.col1.x*h.x+i.col2.x*h.y,h=i.col1.y*h.x+i.col2.y*h.y,i=e.m_xf.R,g=this.m_localAnchor2.x-e.m_sweep.localCenter.x,f=this.m_localAnchor2.y-e.m_sweep.localCenter.y,j=i.col1.x*g+i.col2.x*f,f=i.col1.y*g+i.col2.y*f,i=j*h-f*b,this.m_J.linearB.Set(-this.m_ratio*b,-this.m_ratio*h),this.m_J.angularB=-this.m_ratio*i,k+=
                                                  this.m_ratio*this.m_ratio*(e.m_invMass+e.m_invI*i*i));
    this.m_mass=k>0?1/k:0;
    a.warmStarting?(d.m_linearVelocity.x+=d.m_invMass*this.m_impulse*this.m_J.linearA.x,d.m_linearVelocity.y+=d.m_invMass*this.m_impulse*this.m_J.linearA.y,d.m_angularVelocity+=d.m_invI*this.m_impulse*this.m_J.angularA,e.m_linearVelocity.x+=e.m_invMass*this.m_impulse*this.m_J.linearB.x,e.m_linearVelocity.y+=e.m_invMass*this.m_impulse*this.m_J.linearB.y,e.m_angularVelocity+=e.m_invI*this.m_impulse*this.m_J.angularB):this.m_impulse=
        0
    };

    b2.GearJoint.prototype.SolveVelocityConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=-this.m_mass*this.m_J.Compute(a.m_linearVelocity,a.m_angularVelocity,b.m_linearVelocity,b.m_angularVelocity);
    this.m_impulse+=c;
    a.m_linearVelocity.x+=a.m_invMass*c*this.m_J.linearA.x;
    a.m_linearVelocity.y+=a.m_invMass*c*this.m_J.linearA.y;
    a.m_angularVelocity+=a.m_invI*c*this.m_J.angularA;
    b.m_linearVelocity.x+=b.m_invMass*c*this.m_J.linearB.x;
    b.m_linearVelocity.y+=b.m_invMass*c*this.m_J.linearB.y;
    b.m_angularVelocity+=b.m_invI*
        c*this.m_J.angularB
    };

    b2.GearJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c,d;
    c=this.m_revolute1?this.m_revolute1.GetJointAngle():this.m_prismatic1.GetJointTranslation();
    d=this.m_revolute2?this.m_revolute2.GetJointAngle():this.m_prismatic2.GetJointTranslation();
    c=-this.m_mass*(this.m_constant-(c+this.m_ratio*d));
    a.m_sweep.c.x+=a.m_invMass*c*this.m_J.linearA.x;
    a.m_sweep.c.y+=a.m_invMass*c*this.m_J.linearA.y;
    a.m_sweep.a+=a.m_invI*c*this.m_J.angularA;
    b.m_sweep.c.x+=b.m_invMass*c*this.m_J.linearB.x;

    b.m_sweep.c.y+=b.m_invMass*c*this.m_J.linearB.y;
    b.m_sweep.a+=b.m_invI*c*this.m_J.angularB;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return 0<b2.Settings.b2_linearSlop
    };
    b2.GearJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.GearJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.GearJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_J.linearB.x,a*this.m_impulse*this.m_J.linearB.y)
    };
    b2.GearJoint.prototype.GetReactionTorque=function(a){
    var b=this.m_bodyB.m_xf.R,c=this.m_localAnchor1.x-this.m_bodyB.m_sweep.localCenter.x,d=this.m_localAnchor1.y-this.m_bodyB.m_sweep.localCenter.y,e=b.col1.x*c+b.col2.x*d,d=b.col1.y*c+b.col2.y*d;
    return a*(this.m_impulse*this.m_J.angularB-e*this.m_impulse*this.m_J.linearB.y+d*this.m_impulse*this.m_J.linearB.x)
    };

    b2.GearJoint.prototype.GetRatio=function(){
    return this.m_ratio
    };
    b2.GearJoint.prototype.SetRatio=function(a){
    this.m_ratio=a
    };
    b2.GearJoint.prototype.m_ground1=null;
    b2.GearJoint.prototype.m_ground2=null;
    b2.GearJoint.prototype.m_revolute1=null;
    b2.GearJoint.prototype.m_prismatic1=null;
    b2.GearJoint.prototype.m_revolute2=null;
    b2.GearJoint.prototype.m_prismatic2=null;
    b2.GearJoint.prototype.m_groundAnchor1=new b2.Vec2;
    b2.GearJoint.prototype.m_groundAnchor2=new b2.Vec2;

    b2.GearJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.GearJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.GearJoint.prototype.m_J=new b2.Jacobian;
    b2.GearJoint.prototype.m_constant=null;
    b2.GearJoint.prototype.m_ratio=null;
    b2.GearJoint.prototype.m_mass=null;
    b2.GearJoint.prototype.m_impulse=null;
    b2.TOIInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TOIInput.prototype.__constructor=function(){

    };

    b2.TOIInput.prototype.__varz=function(){
    this.proxyA=new b2.DistanceProxy;
    this.proxyB=new b2.DistanceProxy;
    this.sweepA=new b2.Sweep;
    this.sweepB=new b2.Sweep
    };
    b2.TOIInput.prototype.proxyA=new b2.DistanceProxy;
    b2.TOIInput.prototype.proxyB=new b2.DistanceProxy;
    b2.TOIInput.prototype.sweepA=new b2.Sweep;
    b2.TOIInput.prototype.sweepB=new b2.Sweep;
    b2.TOIInput.prototype.tolerance=null;
    b2.RevoluteJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.RevoluteJointDef.prototype,b2.JointDef.prototype);
    b2.RevoluteJointDef.prototype._super=b2.JointDef.prototype;
    b2.RevoluteJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_revoluteJoint;
    this.localAnchorA.Set(0,0);
    this.localAnchorB.Set(0,0);
    this.motorSpeed=this.maxMotorTorque=this.upperAngle=this.lowerAngle=this.referenceAngle=0;
    this.enableMotor=this.enableLimit=!1
    };

    b2.RevoluteJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.RevoluteJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };
    b2.RevoluteJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.RevoluteJointDef.prototype.localAnchorB=new b2.Vec2;

    b2.RevoluteJointDef.prototype.referenceAngle=null;
    b2.RevoluteJointDef.prototype.enableLimit=null;
    b2.RevoluteJointDef.prototype.lowerAngle=null;
    b2.RevoluteJointDef.prototype.upperAngle=null;
    b2.RevoluteJointDef.prototype.enableMotor=null;
    b2.RevoluteJointDef.prototype.motorSpeed=null;
    b2.RevoluteJointDef.prototype.maxMotorTorque=null;
    b2.MouseJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.MouseJointDef.prototype,b2.JointDef.prototype);

    b2.MouseJointDef.prototype._super=b2.JointDef.prototype;
    b2.MouseJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_mouseJoint;
    this.maxForce=0;
    this.frequencyHz=5;
    this.dampingRatio=0.7
    };
    b2.MouseJointDef.prototype.__varz=function(){
    this.target=new b2.Vec2
    };
    b2.MouseJointDef.prototype.target=new b2.Vec2;
    b2.MouseJointDef.prototype.maxForce=null;
    b2.MouseJointDef.prototype.frequencyHz=null;
    b2.MouseJointDef.prototype.dampingRatio=null;

    b2.Contact=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Contact.prototype.__constructor=function(){

    };
    b2.Contact.prototype.__varz=function(){
    this.m_nodeA=new b2.ContactEdge;
    this.m_nodeB=new b2.ContactEdge;
    this.m_manifold=new b2.Manifold;
    this.m_oldManifold=new b2.Manifold
    };
    b2.Contact.s_input=new b2.TOIInput;
    b2.Contact.e_sensorFlag=1;
    b2.Contact.e_continuousFlag=2;
    b2.Contact.e_islandFlag=4;
    b2.Contact.e_toiFlag=8;
    b2.Contact.e_touchingFlag=16;
    b2.Contact.e_enabledFlag=32;

    b2.Contact.e_filterFlag=64;

    b2.Contact.prototype.Reset=function(a,b){
    this.m_flags=b2.Contact.e_enabledFlag;
    if(!a||!b)this.m_fixtureB=this.m_fixtureA=null;
    else{
        if(a.IsSensor()||b.IsSensor())this.m_flags|=b2.Contact.e_sensorFlag;
        var c=a.GetBody(),d=b.GetBody();
        if(c.GetType()!=b2.Body.b2_dynamicBody||c.IsBullet()||d.GetType()!=b2.Body.b2_dynamicBody||d.IsBullet())this.m_flags|=b2.Contact.e_continuousFlag;
        this.m_fixtureA=a;
        this.m_fixtureB=b;
        this.m_manifold.m_pointCount=0;
        this.m_next=this.m_prev=null;
        this.m_nodeA.contact=null;
        this.m_nodeA.prev=
        null;
        this.m_nodeA.next=null;
        this.m_nodeA.other=null;
        this.m_nodeB.contact=null;
        this.m_nodeB.prev=null;
        this.m_nodeB.next=null;
        this.m_nodeB.other=null}
    };

    b2.Contact.prototype.Update=function(a){
    var b=this.m_oldManifold;
    this.m_oldManifold=this.m_manifold;
    this.m_manifold=b;
    this.m_flags|=b2.Contact.e_enabledFlag;
    var c=!1,b=(this.m_flags&b2.Contact.e_touchingFlag)==b2.Contact.e_touchingFlag,d=this.m_fixtureA.m_body,e=this.m_fixtureB.m_body,h=this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
    if(this.m_flags&b2.Contact.e_sensorFlag)h&&(c=this.m_fixtureA.GetShape(),h=this.m_fixtureB.GetShape(),d=d.GetTransform(),e=e.GetTransform(),c=b2.Shape.TestOverlap(c,
                                                                                       d,h,e)),this.m_manifold.m_pointCount=0;
    else{
        d.GetType()!=b2.Body.b2_dynamicBody||d.IsBullet()||e.GetType()!=b2.Body.b2_dynamicBody||e.IsBullet()?this.m_flags|=b2.Contact.e_continuousFlag:this.m_flags&=~b2.Contact.e_continuousFlag;
        if(h){
        this.Evaluate();
        c=this.m_manifold.m_pointCount>0;
        for(h=0;
            h<this.m_manifold.m_pointCount;
            ++h){
            var g=this.m_manifold.m_points[h];
            g.m_normalImpulse=0;
            g.m_tangentImpulse=0;
            for(var f=g.m_id,i=0;
            i<this.m_oldManifold.m_pointCount;
            ++i){
            var j=this.m_oldManifold.m_points[i];

            if(j.m_id.key==f.key){
                g.m_normalImpulse=j.m_normalImpulse;
                g.m_tangentImpulse=j.m_tangentImpulse;
                break}}}}else this.m_manifold.m_pointCount=0;
        c!=b&&(d.SetAwake(!0),e.SetAwake(!0))}c?this.m_flags|=b2.Contact.e_touchingFlag:this.m_flags&=~b2.Contact.e_touchingFlag;
    b==!1&&c==!0&&a.BeginContact(this);
    b==!0&&c==!1&&a.EndContact(this);
    (this.m_flags&b2.Contact.e_sensorFlag)==0&&a.PreSolve(this,this.m_oldManifold)
    };
    b2.Contact.prototype.Evaluate=function(){

    };

    b2.Contact.prototype.ComputeTOI=function(a,b){
    b2.Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
    b2.Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
    b2.Contact.s_input.sweepA=a;
    b2.Contact.s_input.sweepB=b;
    b2.Contact.s_input.tolerance=b2.Settings.b2_linearSlop;
    return b2.TimeOfImpact.TimeOfImpact(b2.Contact.s_input)
    };
    b2.Contact.prototype.GetManifold=function(){
    return this.m_manifold
    };

    b2.Contact.prototype.GetWorldManifold=function(a){
    var b=this.m_fixtureA.GetBody(),c=this.m_fixtureB.GetBody(),d=this.m_fixtureA.GetShape(),e=this.m_fixtureB.GetShape();
    a.Initialize(this.m_manifold,b.GetTransform(),d.m_radius,c.GetTransform(),e.m_radius)
    };
    b2.Contact.prototype.IsTouching=function(){
    return(this.m_flags&b2.Contact.e_touchingFlag)==b2.Contact.e_touchingFlag
    };
    b2.Contact.prototype.IsContinuous=function(){
    return(this.m_flags&b2.Contact.e_continuousFlag)==b2.Contact.e_continuousFlag
    };

    b2.Contact.prototype.SetSensor=function(a){
    a?this.m_flags|=b2.Contact.e_sensorFlag:this.m_flags&=~b2.Contact.e_sensorFlag
    };
    b2.Contact.prototype.IsSensor=function(){
    return(this.m_flags&b2.Contact.e_sensorFlag)==b2.Contact.e_sensorFlag
    };
    b2.Contact.prototype.SetEnabled=function(a){
    a?this.m_flags|=b2.Contact.e_enabledFlag:this.m_flags&=~b2.Contact.e_enabledFlag
    };
    b2.Contact.prototype.IsEnabled=function(){
    return(this.m_flags&b2.Contact.e_enabledFlag)==b2.Contact.e_enabledFlag
    };

    b2.Contact.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Contact.prototype.GetFixtureA=function(){
    return this.m_fixtureA
    };
    b2.Contact.prototype.GetFixtureB=function(){
    return this.m_fixtureB
    };
    b2.Contact.prototype.FlagForFiltering=function(){
    this.m_flags|=b2.Contact.e_filterFlag
    };
    b2.Contact.prototype.m_flags=0;
    b2.Contact.prototype.m_prev=null;
    b2.Contact.prototype.m_next=null;
    b2.Contact.prototype.m_nodeA=new b2.ContactEdge;
    b2.Contact.prototype.m_nodeB=new b2.ContactEdge;

    b2.Contact.prototype.m_fixtureA=null;
    b2.Contact.prototype.m_fixtureB=null;
    b2.Contact.prototype.m_manifold=new b2.Manifold;
    b2.Contact.prototype.m_oldManifold=new b2.Manifold;
    b2.Contact.prototype.m_toi=null;
    b2.ContactConstraint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactConstraint.prototype.__constructor=function(){
    this.points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.points[a]=new b2.ContactConstraintPoint
    };

    b2.ContactConstraint.prototype.__varz=function(){
    this.localPlaneNormal=new b2.Vec2;
    this.localPoint=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.normalMass=new b2.Mat22;
    this.K=new b2.Mat22
    };
    b2.ContactConstraint.prototype.points=null;
    b2.ContactConstraint.prototype.localPlaneNormal=new b2.Vec2;
    b2.ContactConstraint.prototype.localPoint=new b2.Vec2;
    b2.ContactConstraint.prototype.normal=new b2.Vec2;
    b2.ContactConstraint.prototype.normalMass=new b2.Mat22;
    b2.ContactConstraint.prototype.K=new b2.Mat22;

    b2.ContactConstraint.prototype.bodyA=null;
    b2.ContactConstraint.prototype.bodyB=null;
    b2.ContactConstraint.prototype.type=0;
    b2.ContactConstraint.prototype.radius=null;
    b2.ContactConstraint.prototype.friction=null;
    b2.ContactConstraint.prototype.restitution=null;
    b2.ContactConstraint.prototype.pointCount=0;
    b2.ContactConstraint.prototype.manifold=null;
    b2.ContactResult=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactResult.prototype.__constructor=function(){

    };

    b2.ContactResult.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.id=new b2.ContactID
    };
    b2.ContactResult.prototype.shape1=null;
    b2.ContactResult.prototype.shape2=null;
    b2.ContactResult.prototype.position=new b2.Vec2;
    b2.ContactResult.prototype.normal=new b2.Vec2;
    b2.ContactResult.prototype.normalImpulse=null;
    b2.ContactResult.prototype.tangentImpulse=null;
    b2.ContactResult.prototype.id=new b2.ContactID;

    b2.PolygonContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolygonContact.prototype,b2.Contact.prototype);
    b2.PolygonContact.prototype._super=b2.Contact.prototype;
    b2.PolygonContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.PolygonContact.prototype.__varz=function(){

    };
    b2.PolygonContact.Create=function(){
    return new b2.PolygonContact
    };
    b2.PolygonContact.Destroy=function(){

    };

    b2.PolygonContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    b2.Collision.CollidePolygons(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolygonContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };
    var ClipVertex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    ClipVertex.prototype.__constructor=function(){

    };

    ClipVertex.prototype.__varz=function(){
    this.v=new b2.Vec2;
    this.id=new b2.ContactID
    };
    ClipVertex.prototype.Set=function(a){
    this.v.SetV(a.v);
    this.id.Set(a.id)
    };
    ClipVertex.prototype.v=new b2.Vec2;
    ClipVertex.prototype.id=new b2.ContactID;
    b2.ContactFilter=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactFilter.prototype.__constructor=function(){

    };
    b2.ContactFilter.prototype.__varz=function(){

    };
    b2.ContactFilter.b2_defaultFilter=new b2.ContactFilter;

    b2.ContactFilter.prototype.ShouldCollide=function(a,b){
    var c=a.GetFilterData(),d=b.GetFilterData();
    if(c.groupIndex==d.groupIndex&&c.groupIndex!=0)return c.groupIndex>0;
    return(c.maskBits&d.categoryBits)!=0&&(c.categoryBits&d.maskBits)!=0
    };
    b2.ContactFilter.prototype.RayCollide=function(a,b){
    if(!a)return!0;
    return this.ShouldCollide(a,b)
    };
    b2.NullContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.NullContact.prototype,b2.Contact.prototype);

    b2.NullContact.prototype._super=b2.Contact.prototype;
    b2.NullContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.NullContact.prototype.__varz=function(){

    };
    b2.NullContact.prototype.Evaluate=function(){

    };
    b2.ContactListener=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactListener.prototype.__constructor=function(){

    };
    b2.ContactListener.prototype.__varz=function(){

    };
    b2.ContactListener.b2_defaultListener=new b2.ContactListener;

    b2.ContactListener.prototype.BeginContact=function(){

    };
    b2.ContactListener.prototype.EndContact=function(){

    };
    b2.ContactListener.prototype.PreSolve=function(){

    };
    b2.ContactListener.prototype.PostSolve=function(){

    };
    b2.Island=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Island.prototype.__constructor=function(){
    this.m_bodies=[];
    this.m_contacts=[];
    this.m_joints=[]
    };
    b2.Island.prototype.__varz=function(){

    };
    b2.Island.s_impulse=new b2.ContactImpulse;

    b2.Island.prototype.Initialize=function(a,b,c,d,e,h){
    var g=0;
    this.m_bodyCapacity=a;
    this.m_contactCapacity=b;
    this.m_jointCapacity=c;
    this.m_jointCount=this.m_contactCount=this.m_bodyCount=0;
    this.m_allocator=d;
    this.m_listener=e;
    this.m_contactSolver=h;
    for(g=this.m_bodies.length;
        g<a;
        g++)this.m_bodies[g]=null;
    for(g=this.m_contacts.length;
        g<b;
        g++)this.m_contacts[g]=null;
    for(g=this.m_joints.length;
        g<c;
        g++)this.m_joints[g]=null
    };

    b2.Island.prototype.Clear=function(){
    this.m_jointCount=this.m_contactCount=this.m_bodyCount=0
    };

    b2.Island.prototype.Solve=function(a,b,c){
    for(var d=0,e=0,h,d=0;
        d<this.m_bodyCount;
        ++d)e=this.m_bodies[d],e.GetType()==b2.Body.b2_dynamicBody&&(e.m_linearVelocity.x+=a.dt*(b.x+e.m_invMass*e.m_force.x),e.m_linearVelocity.y+=a.dt*(b.y+e.m_invMass*e.m_force.y),e.m_angularVelocity+=a.dt*e.m_invI*e.m_torque,e.m_linearVelocity.Multiply(b2.Math.Clamp(1-a.dt*e.m_linearDamping,0,1)),e.m_angularVelocity*=b2.Math.Clamp(1-a.dt*e.m_angularDamping,0,1));
    this.m_contactSolver.Initialize(a,this.m_contacts,this.m_contactCount,
                    this.m_allocator);
    b=this.m_contactSolver;
    b.InitVelocityConstraints(a);
    for(d=0;
        d<this.m_jointCount;
        ++d)h=this.m_joints[d],h.InitVelocityConstraints(a);
    for(d=0;
        d<a.velocityIterations;
        ++d){
        for(e=0;
        e<this.m_jointCount;
        ++e)h=this.m_joints[e],h.SolveVelocityConstraints(a);
        b.SolveVelocityConstraints()}for(d=0;
                         d<this.m_jointCount;
                         ++d)h=this.m_joints[d],h.FinalizeVelocityConstraints();
    b.FinalizeVelocityConstraints();
    for(d=0;
        d<this.m_bodyCount;
        ++d)if(e=this.m_bodies[d],e.GetType()!=b2.Body.b2_staticBody){
        var g=
            a.dt*e.m_linearVelocity.x,f=a.dt*e.m_linearVelocity.y;
        g*g+f*f>b2.Settings.b2_maxTranslationSquared&&(e.m_linearVelocity.Normalize(),e.m_linearVelocity.x*=b2.Settings.b2_maxTranslation*a.inv_dt,e.m_linearVelocity.y*=b2.Settings.b2_maxTranslation*a.inv_dt);
        g=a.dt*e.m_angularVelocity;
        if(g*g>b2.Settings.b2_maxRotationSquared)e.m_angularVelocity=e.m_angularVelocity<0?-b2.Settings.b2_maxRotation*a.inv_dt:b2.Settings.b2_maxRotation*a.inv_dt;
        e.m_sweep.c0.SetV(e.m_sweep.c);
        e.m_sweep.a0=e.m_sweep.a;
        e.m_sweep.c.x+=
        a.dt*e.m_linearVelocity.x;
        e.m_sweep.c.y+=a.dt*e.m_linearVelocity.y;
        e.m_sweep.a+=a.dt*e.m_angularVelocity;
        e.SynchronizeTransform()}for(d=0;
                         d<a.positionIterations;
                         ++d){
            g=b.SolvePositionConstraints(b2.Settings.b2_contactBaumgarte);
            f=!0;
            for(e=0;
            e<this.m_jointCount;
            ++e)h=this.m_joints[e],h=h.SolvePositionConstraints(b2.Settings.b2_contactBaumgarte),f=f&&h;
            if(g&&f)break}this.Report(b.m_constraints);
    if(c){
        c=Number.MAX_VALUE;
        b=b2.Settings.b2_linearSleepTolerance*b2.Settings.b2_linearSleepTolerance;
        g=b2.Settings.b2_angularSleepTolerance*
        b2.Settings.b2_angularSleepTolerance;
        for(d=0;
        d<this.m_bodyCount;
        ++d)if(e=this.m_bodies[d],e.GetType()!=b2.Body.b2_staticBody){
            if((e.m_flags&b2.Body.e_allowSleepFlag)==0)c=e.m_sleepTime=0;
            (e.m_flags&b2.Body.e_allowSleepFlag)==0||e.m_angularVelocity*e.m_angularVelocity>g||b2.Math.Dot(e.m_linearVelocity,e.m_linearVelocity)>b?c=e.m_sleepTime=0:(e.m_sleepTime+=a.dt,c=b2.Math.Min(c,e.m_sleepTime))}if(c>=b2.Settings.b2_timeToSleep)for(d=0;
                                                                                                                                     d<this.m_bodyCount;
                                                                                                                                     ++d)e=this.m_bodies[d],e.SetAwake(!1)}
    };

    b2.Island.prototype.SolveTOI=function(a){
    var b=0,c=0;
    this.m_contactSolver.Initialize(a,this.m_contacts,this.m_contactCount,this.m_allocator);
    for(var d=this.m_contactSolver,b=0;
        b<this.m_jointCount;
        ++b)this.m_joints[b].InitVelocityConstraints(a);
    for(b=0;
        b<a.velocityIterations;
        ++b){
        d.SolveVelocityConstraints();
        for(c=0;
        c<this.m_jointCount;
        ++c)this.m_joints[c].SolveVelocityConstraints(a)}for(b=0;
                                     b<this.m_bodyCount;
                                     ++b)if(c=this.m_bodies[b],c.GetType()!=b2.Body.b2_staticBody){
                                     var e=a.dt*c.m_linearVelocity.x,
                                     h=a.dt*c.m_linearVelocity.y;
                                     e*e+h*h>b2.Settings.b2_maxTranslationSquared&&(c.m_linearVelocity.Normalize(),c.m_linearVelocity.x*=b2.Settings.b2_maxTranslation*a.inv_dt,c.m_linearVelocity.y*=b2.Settings.b2_maxTranslation*a.inv_dt);
                                     e=a.dt*c.m_angularVelocity;
                                     if(e*e>b2.Settings.b2_maxRotationSquared)c.m_angularVelocity=c.m_angularVelocity<0?-b2.Settings.b2_maxRotation*a.inv_dt:b2.Settings.b2_maxRotation*a.inv_dt;
                                     c.m_sweep.c0.SetV(c.m_sweep.c);
                                     c.m_sweep.a0=c.m_sweep.a;
                                     c.m_sweep.c.x+=a.dt*c.m_linearVelocity.x;

                                     c.m_sweep.c.y+=a.dt*c.m_linearVelocity.y;
                                     c.m_sweep.a+=a.dt*c.m_angularVelocity;
                                     c.SynchronizeTransform()}for(b=0;
                                                      b<a.positionIterations;
                                                      ++b){
                                         e=d.SolvePositionConstraints(0.75);
                                         h=!0;
                                         for(c=0;
                                         c<this.m_jointCount;
                                         ++c)var g=this.m_joints[c].SolvePositionConstraints(b2.Settings.b2_contactBaumgarte),h=h&&g;
                                         if(e&&h)break}this.Report(d.m_constraints)
    };

    b2.Island.prototype.Report=function(a){
    if(this.m_listener!=null)for(var b=0;
                     b<this.m_contactCount;
                     ++b){
        for(var c=this.m_contacts[b],d=a[b],e=0;
        e<d.pointCount;
        ++e)b2.Island.s_impulse.normalImpulses[e]=d.points[e].normalImpulse,b2.Island.s_impulse.tangentImpulses[e]=d.points[e].tangentImpulse;
        this.m_listener.PostSolve(c,b2.Island.s_impulse)}
    };
    b2.Island.prototype.AddBody=function(a){
    a.m_islandIndex=this.m_bodyCount;
    this.m_bodies[this.m_bodyCount++]=a
    };

    b2.Island.prototype.AddContact=function(a){
    this.m_contacts[this.m_contactCount++]=a
    };
    b2.Island.prototype.AddJoint=function(a){
    this.m_joints[this.m_jointCount++]=a
    };
    b2.Island.prototype.m_allocator=null;
    b2.Island.prototype.m_listener=null;
    b2.Island.prototype.m_contactSolver=null;
    b2.Island.prototype.m_bodies=null;
    b2.Island.prototype.m_contacts=null;
    b2.Island.prototype.m_joints=null;
    b2.Island.prototype.m_bodyCount=0;
    b2.Island.prototype.m_jointCount=0;
    b2.Island.prototype.m_contactCount=0;

    b2.Island.prototype.m_bodyCapacity=0;
    b2.Island.prototype.m_contactCapacity=0;
    b2.Island.prototype.m_jointCapacity=0;
    b2.PolyAndEdgeContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolyAndEdgeContact.prototype,b2.Contact.prototype);
    b2.PolyAndEdgeContact.prototype._super=b2.Contact.prototype;
    b2.PolyAndEdgeContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.PolyAndEdgeContact.prototype.__varz=function(){

    };
    b2.PolyAndEdgeContact.Create=function(){
    return new b2.PolyAndEdgeContact
    };
    b2.PolyAndEdgeContact.Destroy=function(){

    };
    b2.PolyAndEdgeContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    this.b2CollidePolyAndEdge(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolyAndEdgeContact.prototype.b2CollidePolyAndEdge=function(){

    };

    b2.PolyAndEdgeContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b]);
    b2.Settings.b2Assert(a.GetType()==b2.Shape.e_polygonShape);
    b2.Settings.b2Assert(b.GetType()==b2.Shape.e_edgeShape)
    };
    b2.Collision=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Collision.prototype.__constructor=function(){

    };
    b2.Collision.prototype.__varz=function(){

    };
    b2.Collision.MakeClipPointVector=function(){
    var a=Array(2);
    a[0]=new ClipVertex;
    a[1]=new ClipVertex;
    return a
    };

    b2.Collision.ClipSegmentToLine=function(a,b,c,d){
    var e,h=0;
    e=b[0];
    var g=e.v;
    e=b[1];
    var f=e.v,i=c.x*g.x+c.y*g.y-d;
    e=c.x*f.x+c.y*f.y-d;
    i<=0&&a[h++].Set(b[0]);
    e<=0&&a[h++].Set(b[1]);
    if(i*e<0)c=i/(i-e),e=a[h],e=e.v,e.x=g.x+c*(f.x-g.x),e.y=g.y+c*(f.y-g.y),e=a[h],e.id=(i>0?b[0]:b[1]).id,++h;
    return h
    };

    b2.Collision.EdgeSeparation=function(a,b,c,d,e){
    var h=a.m_vertices,a=a.m_normals,g=d.m_vertexCount,f=d.m_vertices,i,j;
    i=b.R;
    j=a[c];
    a=i.col1.x*j.x+i.col2.x*j.y;
    d=i.col1.y*j.x+i.col2.y*j.y;
    i=e.R;
    var k=i.col1.x*a+i.col1.y*d;
    i=i.col2.x*a+i.col2.y*d;
    for(var l=0,n=Number.MAX_VALUE,m=0;
        m<g;
        ++m)j=f[m],j=j.x*k+j.y*i,j<n&&(n=j,l=m);
    j=h[c];
    i=b.R;
    c=b.position.x+(i.col1.x*j.x+i.col2.x*j.y);
    b=b.position.y+(i.col1.y*j.x+i.col2.y*j.y);
    j=f[l];
    i=e.R;
    h=e.position.x+(i.col1.x*j.x+i.col2.x*j.y);
    e=e.position.y+(i.col1.y*
            j.x+i.col2.y*j.y);
    h-=c;
    e-=b;
    return h*a+e*d
    };

    b2.Collision.FindMaxSeparation=function(a,b,c,d,e){
    var h=b.m_vertexCount,g=b.m_normals,f,i;
    i=e.R;
    f=d.m_centroid;
    var j=e.position.x+(i.col1.x*f.x+i.col2.x*f.y),k=e.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    i=c.R;
    f=b.m_centroid;
    j-=c.position.x+(i.col1.x*f.x+i.col2.x*f.y);
    k-=c.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    i=j*c.R.col1.x+k*c.R.col1.y;
    for(var k=j*c.R.col2.x+k*c.R.col2.y,j=0,l=-Number.MAX_VALUE,n=0;
        n<h;
        ++n)f=g[n],f=f.x*i+f.y*k,f>l&&(l=f,j=n);
    var g=b2.Collision.EdgeSeparation(b,c,j,d,e),k=j-1>=0?
        j-1:h-1,l=b2.Collision.EdgeSeparation(b,c,k,d,e),n=j+1<h?j+1:0,m=b2.Collision.EdgeSeparation(b,c,n,d,e);
    i=f=0;
    if(l>g&&l>m)i=-1,f=k,k=l;
    else if(m>g)i=1,f=n,k=m;
    else return a[0]=j,g;
    for(;
        ;
       )if(j=i==-1?f-1>=0?f-1:h-1:f+1<h?f+1:0,g=b2.Collision.EdgeSeparation(b,c,j,d,e),g>k)f=j,k=g;
    else break;
    a[0]=f;
    return k
    };

    b2.Collision.FindIncidentEdge=function(a,b,c,d,e,h){
    var g=b.m_normals,f=e.m_vertexCount,b=e.m_vertices,e=e.m_normals,i;
    i=c.R;
    var c=g[d],g=i.col1.x*c.x+i.col2.x*c.y,j=i.col1.y*c.x+i.col2.y*c.y;
    i=h.R;
    c=i.col1.x*g+i.col1.y*j;
    j=i.col2.x*g+i.col2.y*j;
    g=c;
    i=0;
    for(var k=Number.MAX_VALUE,l=0;
        l<f;
        ++l)c=e[l],c=g*c.x+j*c.y,c<k&&(k=c,i=l);
    e=i;
    g=e+1<f?e+1:0;
    f=a[0];
    c=b[e];
    i=h.R;
    f.v.x=h.position.x+(i.col1.x*c.x+i.col2.x*c.y);
    f.v.y=h.position.y+(i.col1.y*c.x+i.col2.y*c.y);
    f.id.features.referenceEdge=d;
    f.id.features.incidentEdge=
        e;
    f.id.features.incidentVertex=0;
    f=a[1];
    c=b[g];
    i=h.R;
    f.v.x=h.position.x+(i.col1.x*c.x+i.col2.x*c.y);
    f.v.y=h.position.y+(i.col1.y*c.x+i.col2.y*c.y);
    f.id.features.referenceEdge=d;
    f.id.features.incidentEdge=g;
    f.id.features.incidentVertex=1
    };

    b2.Collision.CollidePolygons=function(a,b,c,d,e){
    var h;
    a.m_pointCount=0;
    var g=b.m_radius+d.m_radius;
    b2.Collision.s_edgeAO[0]=0;
    var f=b2.Collision.FindMaxSeparation(b2.Collision.s_edgeAO,b,c,d,e);
    h=b2.Collision.s_edgeAO[0];
    if(!(f>g)){
        var i;
        b2.Collision.s_edgeBO[0]=0;
        var j=b2.Collision.FindMaxSeparation(b2.Collision.s_edgeBO,d,e,b,c);
        i=b2.Collision.s_edgeBO[0];
        if(!(j>g)){
        var k=0,l=0;
        j>0.98*f+0.001?(f=d,d=b,b=e,k=i,a.m_type=b2.Manifold.e_faceB,l=1):(f=b,b=c,c=e,k=h,a.m_type=b2.Manifold.e_faceA,l=0);

        h=b2.Collision.s_incidentEdge;
        b2.Collision.FindIncidentEdge(h,f,b,k,d,c);
        e=f.m_vertices;
        i=e[k];
        var n;
        n=k+1<f.m_vertexCount?e[parseInt(k+1)]:e[0];
        k=b2.Collision.s_localTangent;
        k.Set(n.x-i.x,n.y-i.y);
        k.Normalize();
        e=b2.Collision.s_localNormal;
        e.x=k.y;
        e.y=-k.x;
        d=b2.Collision.s_planePoint;
        d.Set(0.5*(i.x+n.x),0.5*(i.y+n.y));
        j=b2.Collision.s_tangent;
        f=b.R;
        j.x=f.col1.x*k.x+f.col2.x*k.y;
        j.y=f.col1.y*k.x+f.col2.y*k.y;
        var m=b2.Collision.s_tangent2;
        m.x=-j.x;
        m.y=-j.y;
        k=b2.Collision.s_normal;
        k.x=j.y;
        k.y=-j.x;

        var o=b2.Collision.s_v11,p=b2.Collision.s_v12;
        o.x=b.position.x+(f.col1.x*i.x+f.col2.x*i.y);
        o.y=b.position.y+(f.col1.y*i.x+f.col2.y*i.y);
        p.x=b.position.x+(f.col1.x*n.x+f.col2.x*n.y);
        p.y=b.position.y+(f.col1.y*n.x+f.col2.y*n.y);
        b=k.x*o.x+k.y*o.y;
        f=j.x*p.x+j.y*p.y+g;
        n=b2.Collision.s_clipPoints1;
        i=b2.Collision.s_clipPoints2;
        p=0;
        p=b2.Collision.ClipSegmentToLine(n,h,m,-j.x*o.x-j.y*o.y+g);
        if(!(p<2)&&(p=b2.Collision.ClipSegmentToLine(i,n,j,f),!(p<2))){
            a.m_localPlaneNormal.SetV(e);
            a.m_localPoint.SetV(d);
            for(d=
            e=0;
            d<b2.Settings.b2_maxManifoldPoints;
            ++d)if(h=i[d],k.x*h.v.x+k.y*h.v.y-b<=g)j=a.m_points[e],f=c.R,m=h.v.x-c.position.x,o=h.v.y-c.position.y,j.m_localPoint.x=m*f.col1.x+o*f.col1.y,j.m_localPoint.y=m*f.col2.x+o*f.col2.y,j.m_id.Set(h.id),j.m_id.features.flip=l,++e;
            a.m_pointCount=e}}}
    };

    b2.Collision.CollideCircles=function(a,b,c,d,e){
    a.m_pointCount=0;
    var h,g;
    h=c.R;
    g=b.m_p;
    var f=c.position.x+(h.col1.x*g.x+h.col2.x*g.y),c=c.position.y+(h.col1.y*g.x+h.col2.y*g.y);
    h=e.R;
    g=d.m_p;
    f=e.position.x+(h.col1.x*g.x+h.col2.x*g.y)-f;
    e=e.position.y+(h.col1.y*g.x+h.col2.y*g.y)-c;
    h=b.m_radius+d.m_radius;
    if(!(f*f+e*e>h*h))a.m_type=b2.Manifold.e_circles,a.m_localPoint.SetV(b.m_p),a.m_localPlaneNormal.SetZero(),a.m_pointCount=1,a.m_points[0].m_localPoint.SetV(d.m_p),a.m_points[0].m_id.key=0
    };

    b2.Collision.CollidePolygonAndCircle=function(a,b,c,d,e){
    a.m_pointCount=0;
    var h,g,f,i;
    i=e.R;
    f=d.m_p;
    var j=e.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    h=e.position.x+(i.col1.x*f.x+i.col2.x*f.y)-c.position.x;
    g=j-c.position.y;
    i=c.R;
    c=h*i.col1.x+g*i.col1.y;
    i=h*i.col2.x+g*i.col2.y;
    for(var k=0,e=-Number.MAX_VALUE,j=b.m_radius+d.m_radius,l=b.m_vertexCount,n=b.m_vertices,b=b.m_normals,m=0;
        m<l;
        ++m){
        f=n[m];
        h=c-f.x;
        g=i-f.y;
        f=b[m];
        f=f.x*h+f.y*g;
        if(f>j)return;
        f>e&&(e=f,k=m)}f=k;
    h=n[f];
    l=n[f+1<l?f+1:0];
    if(e<Number.MIN_VALUE)a.m_pointCount=
        1,a.m_type=b2.Manifold.e_faceA,a.m_localPlaneNormal.SetV(b[k]),a.m_localPoint.x=0.5*(h.x+l.x),a.m_localPoint.y=0.5*(h.y+l.y);
    else if(e=(c-l.x)*(h.x-l.x)+(i-l.y)*(h.y-l.y),(c-h.x)*(l.x-h.x)+(i-h.y)*(l.y-h.y)<=0){
        if((c-h.x)*(c-h.x)+(i-h.y)*(i-h.y)>j*j)return;
        a.m_pointCount=1;
        a.m_type=b2.Manifold.e_faceA;
        a.m_localPlaneNormal.x=c-h.x;
        a.m_localPlaneNormal.y=i-h.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(h)}else if(e<=0){
        if((c-l.x)*(c-l.x)+(i-l.y)*(i-l.y)>j*j)return;
        a.m_pointCount=1;
        a.m_type=
            b2.Manifold.e_faceA;
        a.m_localPlaneNormal.x=c-l.x;
        a.m_localPlaneNormal.y=i-l.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(l)}else{
            k=0.5*(h.x+l.x);
            h=0.5*(h.y+l.y);
            e=(c-k)*b[f].x+(i-h)*b[f].y;
            if(e>j)return;
            a.m_pointCount=1;
            a.m_type=b2.Manifold.e_faceA;
            a.m_localPlaneNormal.x=b[f].x;
            a.m_localPlaneNormal.y=b[f].y;
            a.m_localPlaneNormal.Normalize();
            a.m_localPoint.Set(k,h)}a.m_points[0].m_localPoint.SetV(d.m_p);
    a.m_points[0].m_id.key=0
    };

    b2.Collision.TestOverlap=function(a,b){
    var c=b.lowerBound,d=a.upperBound,e=c.x-d.x,h=c.y-d.y,c=a.lowerBound,d=b.upperBound,g=c.y-d.y;
    if(e>0||h>0)return!1;
    if(c.x-d.x>0||g>0)return!1;
    return!0
    };
    b2.Collision.b2_nullFeature=255;
    b2.Collision.s_incidentEdge=b2.Collision.MakeClipPointVector();
    b2.Collision.s_clipPoints1=b2.Collision.MakeClipPointVector();
    b2.Collision.s_clipPoints2=b2.Collision.MakeClipPointVector();
    b2.Collision.s_edgeAO=Array(1);
    b2.Collision.s_edgeBO=Array(1);
    b2.Collision.s_localTangent=new b2.Vec2;

    b2.Collision.s_localNormal=new b2.Vec2;
    b2.Collision.s_planePoint=new b2.Vec2;
    b2.Collision.s_normal=new b2.Vec2;
    b2.Collision.s_tangent=new b2.Vec2;
    b2.Collision.s_tangent2=new b2.Vec2;
    b2.Collision.s_v11=new b2.Vec2;
    b2.Collision.s_v12=new b2.Vec2;
    b2.Collision.b2CollidePolyTempVec=new b2.Vec2;
    b2.PolyAndCircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolyAndCircleContact.prototype,b2.Contact.prototype);

    b2.PolyAndCircleContact.prototype._super=b2.Contact.prototype;
    b2.PolyAndCircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.PolyAndCircleContact.prototype.__varz=function(){

    };
    b2.PolyAndCircleContact.Create=function(){
    return new b2.PolyAndCircleContact
    };
    b2.PolyAndCircleContact.Destroy=function(){

    };

    b2.PolyAndCircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.m_body,b=this.m_fixtureB.m_body;
    b2.Collision.CollidePolygonAndCircle(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolyAndCircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b]);
    b2.Settings.b2Assert(a.GetType()==b2.Shape.e_polygonShape);
    b2.Settings.b2Assert(b.GetType()==b2.Shape.e_circleShape)
    };

    b2.ContactPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactPoint.prototype.__constructor=function(){

    };
    b2.ContactPoint.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.velocity=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.id=new b2.ContactID
    };
    b2.ContactPoint.prototype.shape1=null;
    b2.ContactPoint.prototype.shape2=null;
    b2.ContactPoint.prototype.position=new b2.Vec2;
    b2.ContactPoint.prototype.velocity=new b2.Vec2;
    b2.ContactPoint.prototype.normal=new b2.Vec2;

    b2.ContactPoint.prototype.separation=null;
    b2.ContactPoint.prototype.friction=null;
    b2.ContactPoint.prototype.restitution=null;
    b2.ContactPoint.prototype.id=new b2.ContactID;
    b2.CircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.CircleContact.prototype,b2.Contact.prototype);
    b2.CircleContact.prototype._super=b2.Contact.prototype;
    b2.CircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.CircleContact.prototype.__varz=function(){

    };
    b2.CircleContact.Create=function(){
    return new b2.CircleContact
    };
    b2.CircleContact.Destroy=function(){

    };
    b2.CircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    b2.Collision.CollideCircles(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.CircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };

    b2.EdgeAndCircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.EdgeAndCircleContact.prototype,b2.Contact.prototype);
    b2.EdgeAndCircleContact.prototype._super=b2.Contact.prototype;
    b2.EdgeAndCircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.EdgeAndCircleContact.prototype.__varz=function(){

    };
    b2.EdgeAndCircleContact.Create=function(){
    return new b2.EdgeAndCircleContact
    };

    b2.EdgeAndCircleContact.Destroy=function(){

    };
    b2.EdgeAndCircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    this.b2CollideEdgeAndCircle(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle=function(){

    };
    b2.EdgeAndCircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };

    b2.ContactManager=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactManager.prototype.__constructor=function(){
    this.m_world=null;
    this.m_contactCount=0;
    this.m_contactFilter=b2.ContactFilter.b2_defaultFilter;
    this.m_contactListener=b2.ContactListener.b2_defaultListener;
    this.m_contactFactory=new b2.ContactFactory(this.m_allocator);
    this.m_broadPhase=new b2.DynamicTreeBroadPhase
    };
    b2.ContactManager.prototype.__varz=function(){

    };
    b2.ContactManager.s_evalCP=new b2.ContactPoint;

    b2.ContactManager.prototype.AddPair=function(a,b){
    var c=a,d=b,e=c.GetBody(),h=d.GetBody();
    if(e!=h){
        for(var g=h.GetContactList();
        g;
           ){
        if(g.other==e){
            var f=g.contact.GetFixtureA(),i=g.contact.GetFixtureB();
            if(f==c&&i==d)return;
            if(f==d&&i==c)return}g=g.next}if(h.ShouldCollide(e)!=!1&&this.m_contactFilter.ShouldCollide(c,d)!=!1){
            g=this.m_contactFactory.Create(c,d);
            c=g.GetFixtureA();
            d=g.GetFixtureB();
            e=c.m_body;
            h=d.m_body;
            g.m_prev=null;
            g.m_next=this.m_world.m_contactList;
            if(this.m_world.m_contactList!=
               null)this.m_world.m_contactList.m_prev=g;
            this.m_world.m_contactList=g;
            g.m_nodeA.contact=g;
            g.m_nodeA.other=h;
            g.m_nodeA.prev=null;
            g.m_nodeA.next=e.m_contactList;
            if(e.m_contactList!=null)e.m_contactList.prev=g.m_nodeA;
            e.m_contactList=g.m_nodeA;
            g.m_nodeB.contact=g;
            g.m_nodeB.other=e;
            g.m_nodeB.prev=null;
            g.m_nodeB.next=h.m_contactList;
            if(h.m_contactList!=null)h.m_contactList.prev=g.m_nodeB;
            h.m_contactList=g.m_nodeB;
            ++this.m_world.m_contactCount}}
    };

    b2.ContactManager.prototype.FindNewContacts=function(){
    var a=this;
    this.m_broadPhase.UpdatePairs(function(b,c){
        return a.AddPair(b,c)})
    };

    b2.ContactManager.prototype.Destroy=function(a){
    var b=a.GetFixtureA(),c=a.GetFixtureB(),b=b.GetBody(),c=c.GetBody();
    a.IsTouching()&&this.m_contactListener.EndContact(a);
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a==this.m_world.m_contactList)this.m_world.m_contactList=a.m_next;
    if(a.m_nodeA.prev)a.m_nodeA.prev.next=a.m_nodeA.next;
    if(a.m_nodeA.next)a.m_nodeA.next.prev=a.m_nodeA.prev;
    if(a.m_nodeA==b.m_contactList)b.m_contactList=a.m_nodeA.next;
    if(a.m_nodeB.prev)a.m_nodeB.prev.next=
        a.m_nodeB.next;
    if(a.m_nodeB.next)a.m_nodeB.next.prev=a.m_nodeB.prev;
    if(a.m_nodeB==c.m_contactList)c.m_contactList=a.m_nodeB.next;
    this.m_contactFactory.Destroy(a);
    --this.m_contactCount
    };

    b2.ContactManager.prototype.Collide=function(){
    for(var a=this.m_world.m_contactList;
        a;
       ){
        var b=a.GetFixtureA(),c=a.GetFixtureB(),d=b.GetBody(),e=c.GetBody();
        if(d.IsAwake()==!1&&e.IsAwake()==!1)a=a.GetNext();
        else{
        if(a.m_flags&b2.Contact.e_filterFlag){
            if(e.ShouldCollide(d)==!1){
            b=a;
            a=b.GetNext();
            this.Destroy(b);
            continue}if(this.m_contactFilter.ShouldCollide(b,c)==!1){
                b=a;
                a=b.GetNext();
                this.Destroy(b);
                continue}a.m_flags&=~b2.Contact.e_filterFlag}this.m_broadPhase.TestOverlap(b.m_proxy,c.m_proxy)==!1?
            (b=a,a=b.GetNext(),this.Destroy(b)):(a.Update(this.m_contactListener),a=a.GetNext())}}
    };
    b2.ContactManager.prototype.m_world=null;
    b2.ContactManager.prototype.m_broadPhase=null;
    b2.ContactManager.prototype.m_contactList=null;
    b2.ContactManager.prototype.m_contactCount=0;
    b2.ContactManager.prototype.m_contactFilter=null;
    b2.ContactManager.prototype.m_contactListener=null;
    b2.ContactManager.prototype.m_contactFactory=null;
    b2.ContactManager.prototype.m_allocator=null;

    b2.World=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.World.prototype.__constructor=function(a,b){
    this.m_controllerList=this.m_jointList=this.m_contactList=this.m_bodyList=this.m_debugDraw=this.m_destructionListener=null;
    this.m_controllerCount=this.m_jointCount=this.m_contactCount=this.m_bodyCount=0;
    b2.World.m_warmStarting=!0;
    b2.World.m_continuousPhysics=!0;
    this.m_allowSleep=b;
    this.m_gravity=a;
    this.m_inv_dt0=0;
    this.m_contactManager.m_world=this;
    this.m_groundBody=this.CreateBody(new b2.BodyDef)
    };

    b2.World.prototype.__varz=function(){
    this.s_stack=[];
    this.m_contactManager=new b2.ContactManager;
    this.m_contactSolver=new b2.ContactSolver;
    this.m_island=new b2.Island
    };
    b2.World.s_timestep2=new b2.TimeStep;
    b2.World.s_backupA=new b2.Sweep;
    b2.World.s_backupB=new b2.Sweep;
    b2.World.s_timestep=new b2.TimeStep;
    b2.World.s_queue=[];
    b2.World.e_newFixture=1;
    b2.World.e_locked=2;
    b2.World.s_xf=new b2.Transform;
    b2.World.s_jointColor=new b2.Color(0.5,0.8,0.8);
    b2.World.m_warmStarting=null;

    b2.World.m_continuousPhysics=null;

    b2.World.prototype.Solve=function(a){
    for(var b,c=this.m_controllerList;
        c;
        c=c.m_next)c.Step(a);
    c=this.m_island;
    c.Initialize(this.m_bodyCount,this.m_contactCount,this.m_jointCount,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
    for(b=this.m_bodyList;
        b;
        b=b.m_next)b.m_flags&=~b2.Body.e_islandFlag;
    for(var d=this.m_contactList;
        d;
        d=d.m_next)d.m_flags&=~b2.Contact.e_islandFlag;
    for(d=this.m_jointList;
        d;
        d=d.m_next)d.m_islandFlag=!1;
    for(var d=this.s_stack,e=this.m_bodyList;
        e;
        e=e.m_next)if(!(e.m_flags&
                b2.Body.e_islandFlag)&&!(e.IsAwake()==!1||e.IsActive()==!1)&&e.GetType()!=b2.Body.b2_staticBody){
        c.Clear();
        var h=0;
        d[h++]=e;
        for(e.m_flags|=b2.Body.e_islandFlag;
            h>0;
           )if(b=d[--h],c.AddBody(b),b.IsAwake()==!1&&b.SetAwake(!0),b.GetType()!=b2.Body.b2_staticBody){
               for(var g,f=b.m_contactList;
               f;
               f=f.next)if(!(f.contact.m_flags&b2.Contact.e_islandFlag)&&!(f.contact.IsSensor()==!0||f.contact.IsEnabled()==!1||f.contact.IsTouching()==!1))c.AddContact(f.contact),f.contact.m_flags|=b2.Contact.e_islandFlag,g=f.other,
               g.m_flags&b2.Body.e_islandFlag||(d[h++]=g,g.m_flags|=b2.Body.e_islandFlag);
               for(b=b.m_jointList;
               b;
               b=b.next)if(b.joint.m_islandFlag!=!0&&(g=b.other,g.IsActive()!=!1))c.AddJoint(b.joint),b.joint.m_islandFlag=!0,g.m_flags&b2.Body.e_islandFlag||(d[h++]=g,g.m_flags|=b2.Body.e_islandFlag)}c.Solve(a,this.m_gravity,this.m_allowSleep);
        for(h=0;
            h<c.m_bodyCount;
            ++h)b=c.m_bodies[h],b.GetType()==b2.Body.b2_staticBody&&(b.m_flags&=~b2.Body.e_islandFlag)}for(h=0;
                                                           h<d.length;
                                                           ++h){
            if(!d[h])break;
            d[h]=null}for(b=this.m_bodyList;
                      b;
                      b=
                      b.m_next)b.IsAwake()==!1||b.IsActive()==!1||b.GetType()!=b2.Body.b2_staticBody&&b.SynchronizeFixtures();
    this.m_contactManager.FindNewContacts()
    };

    b2.World.prototype.SolveTOI=function(a){
    var b,c,d,e=this.m_island;
    e.Initialize(this.m_bodyCount,b2.Settings.b2_maxTOIContactsPerIsland,b2.Settings.b2_maxTOIJointsPerIsland,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
    var h=b2.World.s_queue;
    for(b=this.m_bodyList;
        b;
        b=b.m_next)b.m_flags&=~b2.Body.e_islandFlag,b.m_sweep.t0=0;
    for(d=this.m_contactList;
        d;
        d=d.m_next)d.m_flags&=~(b2.Contact.e_toiFlag|b2.Contact.e_islandFlag);
    for(d=this.m_jointList;
        d;
        d=d.m_next)d.m_islandFlag=!1;
    for(;
        ;
       ){
        var g=
        null,f=1;
        for(d=this.m_contactList;
        d;
        d=d.m_next)if(!(d.IsSensor()==!0||d.IsEnabled()==!1||d.IsContinuous()==!1)){
            b=1;
            if(d.m_flags&b2.Contact.e_toiFlag)b=d.m_toi;
            else{
            b=d.m_fixtureA;
            c=d.m_fixtureB;
            b=b.m_body;
            c=c.m_body;
            if((b.GetType()!=b2.Body.b2_dynamicBody||b.IsAwake()==!1)&&(c.GetType()!=b2.Body.b2_dynamicBody||c.IsAwake()==!1))continue;
            var i=b.m_sweep.t0;
            if(b.m_sweep.t0<c.m_sweep.t0)i=c.m_sweep.t0,b.m_sweep.Advance(i);
            else if(c.m_sweep.t0<b.m_sweep.t0)i=b.m_sweep.t0,c.m_sweep.Advance(i);
            b=d.ComputeTOI(b.m_sweep,
                       c.m_sweep);
            b2.Settings.b2Assert(0<=b&&b<=1);
            b>0&&b<1&&(b=(1-b)*i+b,b>1&&(b=1));
            d.m_toi=b;
            d.m_flags|=b2.Contact.e_toiFlag}Number.MIN_VALUE<b&&b<f&&(g=d,f=b)}if(g==null||1-100*Number.MIN_VALUE<f)break;
        b=g.m_fixtureA;
        c=g.m_fixtureB;
        b=b.m_body;
        c=c.m_body;
        b2.World.s_backupA.Set(b.m_sweep);
        b2.World.s_backupB.Set(c.m_sweep);
        b.Advance(f);
        c.Advance(f);
        g.Update(this.m_contactManager.m_contactListener);
        g.m_flags&=~b2.Contact.e_toiFlag;
        if(g.IsSensor()==!0||g.IsEnabled()==!1)b.m_sweep.Set(b2.World.s_backupA),
        c.m_sweep.Set(b2.World.s_backupB),b.SynchronizeTransform(),c.SynchronizeTransform();
        else if(g.IsTouching()!=!1){
        b.GetType()!=b2.Body.b2_dynamicBody&&(b=c);
        e.Clear();
        g=d=0;
        h[d+g++]=b;
        for(b.m_flags|=b2.Body.e_islandFlag;
            g>0;
           )if(b=h[d++],--g,e.AddBody(b),b.IsAwake()==!1&&b.SetAwake(!0),b.GetType()==b2.Body.b2_dynamicBody){
               for(c=b.m_contactList;
               c;
               c=c.next){
               if(e.m_contactCount==e.m_contactCapacity)break;
               if(!(c.contact.m_flags&b2.Contact.e_islandFlag)&&!(c.contact.IsSensor()==!0||c.contact.IsEnabled()==
                                          !1||c.contact.IsTouching()==!1))e.AddContact(c.contact),c.contact.m_flags|=b2.Contact.e_islandFlag,i=c.other,i.m_flags&b2.Body.e_islandFlag||(i.GetType()!=b2.Body.b2_staticBody&&(i.Advance(f),i.SetAwake(!0)),h[d+g]=i,++g,i.m_flags|=b2.Body.e_islandFlag)}for(b=b.m_jointList;
                                                                                                                                                                        b;
                                                                                                                                                                        b=b.next)if(e.m_jointCount!=e.m_jointCapacity&&b.joint.m_islandFlag!=!0&&(i=b.other,i.IsActive()!=!1))e.AddJoint(b.joint),b.joint.m_islandFlag=!0,i.m_flags&b2.Body.e_islandFlag||(i.GetType()!=b2.Body.b2_staticBody&&(i.Advance(f),
                                                                                                                                                                                                                                                                                    i.SetAwake(!0)),h[d+g]=i,++g,i.m_flags|=b2.Body.e_islandFlag)}d=b2.World.s_timestep;
        d.warmStarting=!1;
        d.dt=(1-f)*a.dt;
        d.inv_dt=1/d.dt;
        d.dtRatio=0;
        d.velocityIterations=a.velocityIterations;
        d.positionIterations=a.positionIterations;
        e.SolveTOI(d);
        for(f=f=0;
            f<e.m_bodyCount;
            ++f)if(b=e.m_bodies[f],b.m_flags&=~b2.Body.e_islandFlag,b.IsAwake()!=!1&&b.GetType()==b2.Body.b2_dynamicBody){
            b.SynchronizeFixtures();
            for(c=b.m_contactList;
                c;
                c=c.next)c.contact.m_flags&=~b2.Contact.e_toiFlag}for(f=0;
                                          f<e.m_contactCount;
                                          ++f)d=
            e.m_contacts[f],d.m_flags&=~(b2.Contact.e_toiFlag|b2.Contact.e_islandFlag);
        for(f=0;
            f<e.m_jointCount;
            ++f)d=e.m_joints[f],d.m_islandFlag=!1;
        this.m_contactManager.FindNewContacts()}}
    };

    b2.World.prototype.DrawJoint=function(a){
    var b=a.GetBodyA(),c=a.GetBodyB(),d=b.m_xf.position,e=c.m_xf.position,h=a.GetAnchorA(),g=a.GetAnchorB(),f=b2.World.s_jointColor;
    switch(a.m_type){
    case b2.Joint.e_distanceJoint:this.m_debugDraw.DrawSegment(h,g,f);
        break;
    case b2.Joint.e_pulleyJoint:b=a.GetGroundAnchorA();
        a=a.GetGroundAnchorB();
        this.m_debugDraw.DrawSegment(b,h,f);
        this.m_debugDraw.DrawSegment(a,g,f);
        this.m_debugDraw.DrawSegment(b,a,f);
        break;
    case b2.Joint.e_mouseJoint:this.m_debugDraw.DrawSegment(h,
                                g,f);
        break;
    default:b!=this.m_groundBody&&this.m_debugDraw.DrawSegment(d,h,f),this.m_debugDraw.DrawSegment(h,g,f),c!=this.m_groundBody&&this.m_debugDraw.DrawSegment(e,g,f)}
    };

    b2.World.prototype.DrawShape=function(a,b,c){
    switch(a.m_type){
    case b2.Shape.e_circleShape:this.m_debugDraw.DrawSolidCircle(b2.Math.MulX(b,a.m_p),a.m_radius,b.R.col1,c);
        break;
    case b2.Shape.e_polygonShape:for(var d=0,e=a.GetVertexCount(),a=a.GetVertices(),h=Array(e),d=0;
                     d<e;
                     ++d)h[d]=b2.Math.MulX(b,a[d]);
        this.m_debugDraw.DrawSolidPolygon(h,e,c);
        break;
    case b2.Shape.e_edgeShape:this.m_debugDraw.DrawSegment(b2.Math.MulX(b,a.GetVertex1()),b2.Math.MulX(b,a.GetVertex2()),c)}
    };

    b2.World.prototype.SetDestructionListener=function(a){
    this.m_destructionListener=a
    };
    b2.World.prototype.SetContactFilter=function(a){
    this.m_contactManager.m_contactFilter=a
    };
    b2.World.prototype.SetContactListener=function(a){
    this.m_contactManager.m_contactListener=a
    };
    b2.World.prototype.SetDebugDraw=function(a){
    this.m_debugDraw=a
    };

    b2.World.prototype.SetBroadPhase=function(a){
    var b=this.m_contactManager.m_broadPhase;
    this.m_contactManager.m_broadPhase=a;
    for(var c=this.m_bodyList;
        c;
        c=c.m_next)for(var d=c.m_fixtureList;
               d;
               d=d.m_next)d.m_proxy=a.CreateProxy(b.GetFatAABB(d.m_proxy),d)
    };
    b2.World.prototype.Validate=function(){
    this.m_contactManager.m_broadPhase.Validate()
    };
    b2.World.prototype.GetProxyCount=function(){
    return this.m_contactManager.m_broadPhase.GetProxyCount()
    };

    b2.World.prototype.CreateBody=function(a){
    if(this.IsLocked()==!0)return null;
    a=new b2.Body(a,this);
    a.m_prev=null;
    if(a.m_next=this.m_bodyList)this.m_bodyList.m_prev=a;
    this.m_bodyList=a;
    ++this.m_bodyCount;
    return a
    };

    b2.World.prototype.DestroyBody=function(a){
    if(this.IsLocked()!=!0){
        for(var b=a.m_jointList;
        b;
           ){
        var c=b,b=b.next;
        this.m_destructionListener&&this.m_destructionListener.SayGoodbyeJoint(c.joint);
        this.DestroyJoint(c.joint)}for(b=a.m_controllerList;
                           b;
                          )c=b,b=b.nextController,c.controller.RemoveBody(a);
        for(b=a.m_contactList;
        b;
           )c=b,b=b.next,this.m_contactManager.Destroy(c.contact);
        a.m_contactList=null;
        for(b=a.m_fixtureList;
        b;
           )c=b,b=b.m_next,this.m_destructionListener&&this.m_destructionListener.SayGoodbyeFixture(c),
        c.DestroyProxy(this.m_contactManager.m_broadPhase),c.Destroy();
        a.m_fixtureList=null;
        a.m_fixtureCount=0;
        if(a.m_prev)a.m_prev.m_next=a.m_next;
        if(a.m_next)a.m_next.m_prev=a.m_prev;
        if(a==this.m_bodyList)this.m_bodyList=a.m_next;
        --this.m_bodyCount}
    };

    b2.World.prototype.CreateJoint=function(a){
    var b=b2.Joint.Create(a,null);
    b.m_prev=null;
    if(b.m_next=this.m_jointList)this.m_jointList.m_prev=b;
    this.m_jointList=b;
    ++this.m_jointCount;
    b.m_edgeA.joint=b;
    b.m_edgeA.other=b.m_bodyB;
    b.m_edgeA.prev=null;
    if(b.m_edgeA.next=b.m_bodyA.m_jointList)b.m_bodyA.m_jointList.prev=b.m_edgeA;
    b.m_bodyA.m_jointList=b.m_edgeA;
    b.m_edgeB.joint=b;
    b.m_edgeB.other=b.m_bodyA;
    b.m_edgeB.prev=null;
    if(b.m_edgeB.next=b.m_bodyB.m_jointList)b.m_bodyB.m_jointList.prev=b.m_edgeB;
    b.m_bodyB.m_jointList=
        b.m_edgeB;
    var c=a.bodyA,d=a.bodyB;
    if(a.collideConnected==!1)for(a=d.GetContactList();
                      a;
                     )a.other==c&&a.contact.FlagForFiltering(),a=a.next;
    return b
    };

    b2.World.prototype.DestroyJoint=function(a){
    var b=a.m_collideConnected;
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a==this.m_jointList)this.m_jointList=a.m_next;
    var c=a.m_bodyA,d=a.m_bodyB;
    c.SetAwake(!0);
    d.SetAwake(!0);
    if(a.m_edgeA.prev)a.m_edgeA.prev.next=a.m_edgeA.next;
    if(a.m_edgeA.next)a.m_edgeA.next.prev=a.m_edgeA.prev;
    if(a.m_edgeA==c.m_jointList)c.m_jointList=a.m_edgeA.next;
    a.m_edgeA.prev=null;
    a.m_edgeA.next=null;
    if(a.m_edgeB.prev)a.m_edgeB.prev.next=a.m_edgeB.next;

    if(a.m_edgeB.next)a.m_edgeB.next.prev=a.m_edgeB.prev;
    if(a.m_edgeB==d.m_jointList)d.m_jointList=a.m_edgeB.next;
    a.m_edgeB.prev=null;
    a.m_edgeB.next=null;
    b2.Joint.Destroy(a,null);
    --this.m_jointCount;
    if(b==!1)for(a=d.GetContactList();
             a;
            )a.other==c&&a.contact.FlagForFiltering(),a=a.next
    };
    b2.World.prototype.AddController=function(a){
    a.m_next=this.m_controllerList;
    a.m_prev=null;
    this.m_controllerList=a;
    a.m_world=this;
    this.m_controllerCount++;
    return a
    };

    b2.World.prototype.RemoveController=function(a){
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(this.m_controllerList==a)this.m_controllerList=a.m_next;
    this.m_controllerCount--
    };
    b2.World.prototype.CreateController=function(a){
    if(a.m_world!=this)throw Error("Controller can only be a member of one world");
    a.m_next=this.m_controllerList;
    a.m_prev=null;
    if(this.m_controllerList)this.m_controllerList.m_prev=a;
    this.m_controllerList=a;
    ++this.m_controllerCount;
    a.m_world=this;
    return a
    };

    b2.World.prototype.DestroyController=function(a){
    a.Clear();
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a==this.m_controllerList)this.m_controllerList=a.m_next;
    --this.m_controllerCount
    };
    b2.World.prototype.SetWarmStarting=function(a){
    b2.World.m_warmStarting=a
    };
    b2.World.prototype.SetContinuousPhysics=function(a){
    b2.World.m_continuousPhysics=a
    };
    b2.World.prototype.GetBodyCount=function(){
    return this.m_bodyCount
    };
    b2.World.prototype.GetJointCount=function(){
    return this.m_jointCount
    };

    b2.World.prototype.GetContactCount=function(){
    return this.m_contactCount
    };
    b2.World.prototype.SetGravity=function(a){
    this.m_gravity=a
    };
    b2.World.prototype.GetGravity=function(){
    return this.m_gravity
    };
    b2.World.prototype.GetGroundBody=function(){
    return this.m_groundBody
    };

    b2.World.prototype.Step=function(a,b,c){
    this.m_flags&b2.World.e_newFixture&&(this.m_contactManager.FindNewContacts(),this.m_flags&=~b2.World.e_newFixture);
    this.m_flags|=b2.World.e_locked;
    var d=b2.World.s_timestep2;
    d.dt=a;
    d.velocityIterations=b;
    d.positionIterations=c;
    d.inv_dt=a>0?1/a:0;
    d.dtRatio=this.m_inv_dt0*a;
    d.warmStarting=b2.World.m_warmStarting;
    this.m_contactManager.Collide();
    d.dt>0&&this.Solve(d);
    b2.World.m_continuousPhysics&&d.dt>0&&this.SolveTOI(d);
    if(d.dt>0)this.m_inv_dt0=d.inv_dt;
    this.m_flags&=
        ~b2.World.e_locked
    };
    b2.World.prototype.ClearForces=function(){
    for(var a=this.m_bodyList;
        a;
        a=a.m_next)a.m_force.SetZero(),a.m_torque=0
    };

    b2.World.prototype.DrawDebugData=function(){
    if(this.m_debugDraw!=null){
        this.m_debugDraw.Clear();
        var a=this.m_debugDraw.GetFlags(),b,c,d;
        new b2.Vec2;
        new b2.Vec2;
        new b2.Vec2;
        var e;
        new b2.AABB;
        new b2.AABB;
        e=[new b2.Vec2,new b2.Vec2,new b2.Vec2,new b2.Vec2];
        var h=new b2.Color(0,0,0);
        if(a&b2.DebugDraw.e_shapeBit)for(b=this.m_bodyList;
                         b;
                         b=b.m_next){
        e=b.m_xf;
        for(c=b.GetFixtureList();
            c;
            c=c.m_next)d=c.GetShape(),b.IsActive()==!1?h.Set(0.5,0.5,0.3):b.GetType()==b2.Body.b2_staticBody?h.Set(0.5,0.9,0.5):b.GetType()==
            b2.Body.b2_kinematicBody?h.Set(0.5,0.5,0.9):b.IsAwake()==!1?h.Set(0.6,0.6,0.6):h.Set(0.9,0.7,0.7),this.DrawShape(d,e,h)}if(a&b2.DebugDraw.e_jointBit)for(b=this.m_jointList;
                                                                                         b;
                                                                                         b=b.m_next)this.DrawJoint(b);
        if(a&b2.DebugDraw.e_controllerBit)for(b=this.m_controllerList;
                          b;
                          b=b.m_next)b.Draw(this.m_debugDraw);
        if(a&b2.DebugDraw.e_pairBit){
        h.Set(0.3,0.9,0.9);
        for(b=this.m_contactManager.m_contactList;
            b;
            b=b.GetNext())d=b.GetFixtureA(),c=b.GetFixtureB(),d=d.GetAABB().GetCenter(),c=c.GetAABB().GetCenter(),this.m_debugDraw.DrawSegment(d,
                                                                               c,h)}if(a&b2.DebugDraw.e_aabbBit){
                                                                               d=this.m_contactManager.m_broadPhase;
                                                                               e=[new b2.Vec2,new b2.Vec2,new b2.Vec2,new b2.Vec2];
                                                                               for(b=this.m_bodyList;
                                                                                   b;
                                                                                   b=b.GetNext())if(b.IsActive()!=!1)for(c=b.GetFixtureList();
                                                                                                     c;
                                                                                                     c=c.GetNext()){
                                                                                   var g=d.GetFatAABB(c.m_proxy);
                                                                                   e[0].Set(g.lowerBound.x,g.lowerBound.y);
                                                                                   e[1].Set(g.upperBound.x,g.lowerBound.y);
                                                                                   e[2].Set(g.upperBound.x,g.upperBound.y);
                                                                                   e[3].Set(g.lowerBound.x,g.upperBound.y);
                                                                                   this.m_debugDraw.DrawPolygon(e,4,h)}}if(a&b2.DebugDraw.e_centerOfMassBit)for(b=this.m_bodyList;
                                                                                                                        b;
                                                                                                                        b=
                                                                                                                        b.m_next)e=b2.World.s_xf,e.R=b.m_xf.R,e.position=b.GetWorldCenter(),this.m_debugDraw.DrawTransform(e)}
    };
    b2.World.prototype.QueryAABB=function(a,b){
    var c=this.m_contactManager.m_broadPhase;
    c.Query(function(b){
        return a(c.GetUserData(b))},b)
    };

    b2.World.prototype.QueryShape=function(a,b,c){
    c==null&&(c=new b2.Transform,c.SetIdentity());
    var d=this.m_contactManager.m_broadPhase,e=new b2.AABB;
    b.ComputeAABB(e,c);
    d.Query(function(e){
        e=d.GetUserData(e);
        if(b2.Shape.TestOverlap(b,c,e.GetShape(),e.GetBody().GetTransform()))return a(e);
        return!0},e)
    };

    b2.World.prototype.QueryPoint=function(a,b){
    var c=this.m_contactManager.m_broadPhase,d=new b2.AABB;
    d.lowerBound.Set(b.x-b2.Settings.b2_linearSlop,b.y-b2.Settings.b2_linearSlop);
    d.upperBound.Set(b.x+b2.Settings.b2_linearSlop,b.y+b2.Settings.b2_linearSlop);
    c.Query(function(d){
        d=c.GetUserData(d);
        if(d.TestPoint(b))return a(d);
        return!0},d)
    };

    b2.World.prototype.RayCast=function(a,b,c){
    var d=this.m_contactManager.m_broadPhase,e=new b2.RayCastOutput,h=new b2.RayCastInput(b,c);
    d.RayCast(function(g,f){
        var h=d.GetUserData(f);
        if(h.RayCast(e,g)){
        var j=e.fraction,k=new b2.Vec2((1-j)*b.x+j*c.x,(1-j)*b.y+j*c.y);
        return a(h,k,e.normal,j)}return g.maxFraction},h)
    };
    b2.World.prototype.RayCastOne=function(a,b){
    var c;
    this.RayCast(function(a,b,h,g){
        c=a;
        return g},a,b);
    return c
    };

    b2.World.prototype.RayCastAll=function(a,b){
    var c=[];
    this.RayCast(function(a){
        c[c.length]=a;
        return 1},a,b);
    return c
    };
    b2.World.prototype.GetBodyList=function(){
    return this.m_bodyList
    };
    b2.World.prototype.GetJointList=function(){
    return this.m_jointList
    };
    b2.World.prototype.GetContactList=function(){
    return this.m_contactList
    };
    b2.World.prototype.IsLocked=function(){
    return(this.m_flags&b2.World.e_locked)>0
    };
    b2.World.prototype.s_stack=[];
    b2.World.prototype.m_flags=0;
    b2.World.prototype.m_contactManager=new b2.ContactManager;

    b2.World.prototype.m_contactSolver=new b2.ContactSolver;
    b2.World.prototype.m_island=new b2.Island;
    b2.World.prototype.m_bodyList=null;
    b2.World.prototype.m_jointList=null;
    b2.World.prototype.m_contactList=null;
    b2.World.prototype.m_bodyCount=0;
    b2.World.prototype.m_contactCount=0;
    b2.World.prototype.m_jointCount=0;
    b2.World.prototype.m_controllerList=null;
    b2.World.prototype.m_controllerCount=0;
    b2.World.prototype.m_gravity=null;
    b2.World.prototype.m_allowSleep=null;
    b2.World.prototype.m_groundBody=null;

    b2.World.prototype.m_destructionListener=null;
    b2.World.prototype.m_debugDraw=null;
    b2.World.prototype.m_inv_dt0=null;

    if(typeof exports!=="undefined")exports.b2BoundValues=b2.BoundValues,exports.b2Math=b2.Math,exports.b2DistanceOutput=b2.DistanceOutput,exports.b2Mat33=b2.Mat33,exports.b2ContactPoint=b2.ContactPoint,exports.b2PairManager=b2.PairManager,exports.b2PositionSolverManifold=b2.PositionSolverManifold,exports.b2OBB=b2.OBB,exports.b2CircleContact=b2.CircleContact,exports.b2PulleyJoint=b2.PulleyJoint,exports.b2Pair=b2.Pair,exports.b2TimeStep=b2.TimeStep,exports.b2FixtureDef=b2.FixtureDef,exports.b2World=b2.World,
    exports.b2PrismaticJoint=b2.PrismaticJoint,exports.b2Controller=b2.Controller,exports.b2ContactID=b2.ContactID,exports.b2RevoluteJoint=b2.RevoluteJoint,exports.b2JointDef=b2.JointDef,exports.b2Transform=b2.Transform,exports.b2GravityController=b2.GravityController,exports.b2EdgeAndCircleContact=b2.EdgeAndCircleContact,exports.b2EdgeShape=b2.EdgeShape,exports.b2BuoyancyController=b2.BuoyancyController,exports.b2LineJointDef=b2.LineJointDef,exports.b2Contact=b2.Contact,exports.b2DistanceJoint=b2.DistanceJoint,
    exports.b2Body=b2.Body,exports.b2DestructionListener=b2.DestructionListener,exports.b2PulleyJointDef=b2.PulleyJointDef,exports.b2ContactEdge=b2.ContactEdge,exports.b2ContactConstraint=b2.ContactConstraint,exports.b2ContactImpulse=b2.ContactImpulse,exports.b2DistanceJointDef=b2.DistanceJointDef,exports.b2ContactResult=b2.ContactResult,exports.b2EdgeChainDef=b2.EdgeChainDef,exports.b2Vec2=b2.Vec2,exports.b2Vec3=b2.Vec3,exports.b2DistanceProxy=b2.DistanceProxy,exports.b2FrictionJointDef=b2.FrictionJointDef,
    exports.b2PolygonContact=b2.PolygonContact,exports.b2TensorDampingController=b2.TensorDampingController,exports.b2ContactFactory=b2.ContactFactory,exports.b2WeldJointDef=b2.WeldJointDef,exports.b2ConstantAccelController=b2.ConstantAccelController,exports.b2GearJointDef=b2.GearJointDef,exports.ClipVertex=ClipVertex,exports.b2SeparationFunction=b2.SeparationFunction,exports.b2ManifoldPoint=b2.ManifoldPoint,exports.b2Color=b2.Color,exports.b2PolygonShape=b2.PolygonShape,exports.b2DynamicTreePair=b2.DynamicTreePair,
    exports.b2ContactConstraintPoint=b2.ContactConstraintPoint,exports.b2FrictionJoint=b2.FrictionJoint,exports.b2ContactFilter=b2.ContactFilter,exports.b2ControllerEdge=b2.ControllerEdge,exports.b2Distance=b2.Distance,exports.b2Fixture=b2.Fixture,exports.b2DynamicTreeNode=b2.DynamicTreeNode,exports.b2MouseJoint=b2.MouseJoint,exports.b2DistanceInput=b2.DistanceInput,exports.b2BodyDef=b2.BodyDef,exports.b2DynamicTreeBroadPhase=b2.DynamicTreeBroadPhase,exports.b2Settings=b2.Settings,exports.b2Proxy=b2.Proxy,
    exports.b2Point=b2.Point,exports.b2BroadPhase=b2.BroadPhase,exports.b2Manifold=b2.Manifold,exports.b2WorldManifold=b2.WorldManifold,exports.b2PrismaticJointDef=b2.PrismaticJointDef,exports.b2RayCastOutput=b2.RayCastOutput,exports.b2ConstantForceController=b2.ConstantForceController,exports.b2TimeOfImpact=b2.TimeOfImpact,exports.b2CircleShape=b2.CircleShape,exports.b2MassData=b2.MassData,exports.b2Joint=b2.Joint,exports.b2GearJoint=b2.GearJoint,exports.b2DynamicTree=b2.DynamicTree,exports.b2JointEdge=
    b2.JointEdge,exports.b2LineJoint=b2.LineJoint,exports.b2NullContact=b2.NullContact,exports.b2ContactListener=b2.ContactListener,exports.b2RayCastInput=b2.RayCastInput,exports.b2TOIInput=b2.TOIInput,exports.Features=Features,exports.b2FilterData=b2.FilterData,exports.b2Island=b2.Island,exports.b2ContactManager=b2.ContactManager,exports.b2ContactSolver=b2.ContactSolver,exports.b2Simplex=b2.Simplex,exports.b2AABB=b2.AABB,exports.b2Jacobian=b2.Jacobian,exports.b2Bound=b2.Bound,exports.b2RevoluteJointDef=
    b2.RevoluteJointDef,exports.b2PolyAndEdgeContact=b2.PolyAndEdgeContact,exports.b2SimplexVertex=b2.SimplexVertex,exports.b2WeldJoint=b2.WeldJoint,exports.b2Collision=b2.Collision,exports.b2Mat22=b2.Mat22,exports.b2SimplexCache=b2.SimplexCache,exports.b2PolyAndCircleContact=b2.PolyAndCircleContact,exports.b2MouseJointDef=b2.MouseJointDef,exports.b2Shape=b2.Shape,exports.b2Segment=b2.Segment,exports.b2ContactRegister=b2.ContactRegister,exports.b2DebugDraw=b2.DebugDraw,exports.b2Sweep=b2.Sweep;

    function extend(a,b){
    for(var c in b)a[c]=b[c]}function isInstanceOf(a,b){
        for(;
        typeof a==="object";
           ){
        if(a.constructor===b)return!0;
        a=a._super}return!1}b2.BoundValues=function(){
            this.__varz();
            this.__constructor.apply(this,arguments)
        };
    b2.BoundValues.prototype.__constructor=function(){
    this.lowerValues=[];
    this.lowerValues[0]=0;
    this.lowerValues[1]=0;
    this.upperValues=[];
    this.upperValues[0]=0;
    this.upperValues[1]=0
    };
    b2.BoundValues.prototype.__varz=function(){

    };
    b2.BoundValues.prototype.lowerValues=null;

    b2.BoundValues.prototype.upperValues=null;
    b2.PairManager=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.PairManager.prototype.__constructor=function(){
    this.m_pairs=[];
    this.m_pairBuffer=[];
    this.m_pairBufferCount=this.m_pairCount=0;
    this.m_freePair=null
    };
    b2.PairManager.prototype.__varz=function(){

    };

    b2.PairManager.prototype.AddPair=function(a,b){
    var c=a.pairs[b];
    if(c!=null)return c;
    if(this.m_freePair==null)this.m_freePair=new b2.Pair,this.m_pairs.push(this.m_freePair);
    c=this.m_freePair;
    this.m_freePair=c.next;
    c.proxy1=a;
    c.proxy2=b;
    c.status=0;
    c.userData=null;
    c.next=null;
    a.pairs[b]=c;
    b.pairs[a]=c;
    ++this.m_pairCount;
    return c
    };

    b2.PairManager.prototype.RemovePair=function(a,b){
    var c=a.pairs[b];
    if(c==null)return null;
    var d=c.userData;
    delete a.pairs[b];
    delete b.pairs[a];
    c.next=this.m_freePair;
    c.proxy1=null;
    c.proxy2=null;
    c.userData=null;
    c.status=0;
    this.m_freePair=c;
    --this.m_pairCount;
    return d
    };
    b2.PairManager.prototype.Find=function(a,b){
    return a.pairs[b]
    };
    b2.PairManager.prototype.ValidateBuffer=function(){

    };
    b2.PairManager.prototype.ValidateTable=function(){

    };

    b2.PairManager.prototype.Initialize=function(a){
    this.m_broadPhase=a
    };
    b2.PairManager.prototype.AddBufferedPair=function(a,b){
    var c=this.AddPair(a,b);
    c.IsBuffered()==!1&&(c.SetBuffered(),this.m_pairBuffer[this.m_pairBufferCount]=c,++this.m_pairBufferCount);
    c.ClearRemoved();
    b2.BroadPhase.s_validate&&this.ValidateBuffer()
    };

    b2.PairManager.prototype.RemoveBufferedPair=function(a,b){
    var c=this.Find(a,b);
    c!=null&&(c.IsBuffered()==!1&&(c.SetBuffered(),this.m_pairBuffer[this.m_pairBufferCount]=c,++this.m_pairBufferCount),c.SetRemoved(),b2.BroadPhase.s_validate&&this.ValidateBuffer())
    };

    b2.PairManager.prototype.Commit=function(a){
    for(var b=0,b=0;
        b<this.m_pairBufferCount;
        ++b){
        var c=this.m_pairBuffer[b];
        c.ClearBuffered();
        var d=c.proxy1,e=c.proxy2;
        c.IsRemoved()||c.IsFinal()==!1&&a(d.userData,e.userData)}this.m_pairBufferCount=0;
    b2.BroadPhase.s_validate&&this.ValidateTable()
    };
    b2.PairManager.prototype.m_broadPhase=null;
    b2.PairManager.prototype.m_pairs=null;
    b2.PairManager.prototype.m_freePair=null;
    b2.PairManager.prototype.m_pairCount=0;
    b2.PairManager.prototype.m_pairBuffer=null;

    b2.PairManager.prototype.m_pairBufferCount=0;
    b2.TimeStep=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TimeStep.prototype.__constructor=function(){

    };
    b2.TimeStep.prototype.__varz=function(){

    };
    b2.TimeStep.prototype.Set=function(a){
    this.dt=a.dt;
    this.inv_dt=a.inv_dt;
    this.positionIterations=a.positionIterations;
    this.velocityIterations=a.velocityIterations;
    this.warmStarting=a.warmStarting
    };
    b2.TimeStep.prototype.dt=null;
    b2.TimeStep.prototype.inv_dt=null;

    b2.TimeStep.prototype.dtRatio=null;
    b2.TimeStep.prototype.velocityIterations=0;
    b2.TimeStep.prototype.positionIterations=0;
    b2.TimeStep.prototype.warmStarting=null;
    b2.Controller=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Controller.prototype.__constructor=function(){

    };
    b2.Controller.prototype.__varz=function(){

    };
    b2.Controller.prototype.Step=function(){

    };
    b2.Controller.prototype.Draw=function(){

    };

    b2.Controller.prototype.AddBody=function(a){
    var b=new b2.ControllerEdge;
    b.controller=this;
    b.body=a;
    b.nextBody=m_bodyList;
    b.prevBody=null;
    m_bodyList=b;
    if(b.nextBody)b.nextBody.prevBody=b;
    m_bodyCount++;
    b.nextController=a.m_controllerList;
    b.prevController=null;
    a.m_controllerList=b;
    if(b.nextController)b.nextController.prevController=b;
    a.m_controllerCount++
    };

    b2.Controller.prototype.RemoveBody=function(a){
    for(var b=a.m_controllerList;
        b&&b.controller!=this;
       )b=b.nextController;
    if(b.prevBody)b.prevBody.nextBody=b.nextBody;
    if(b.nextBody)b.nextBody.prevBody=b.prevBody;
    if(b.nextController)b.nextController.prevController=b.prevController;
    if(b.prevController)b.prevController.nextController=b.nextController;
    if(m_bodyList==b)m_bodyList=b.nextBody;
    if(a.m_controllerList==b)a.m_controllerList=b.nextController;
    a.m_controllerCount--;
    m_bodyCount--
    };

    b2.Controller.prototype.Clear=function(){
    for(;
        m_bodyList;
       )this.RemoveBody(m_bodyList.body)
    };
    b2.Controller.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Controller.prototype.GetWorld=function(){
    return this.m_world
    };
    b2.Controller.prototype.GetBodyList=function(){
    return m_bodyList
    };
    b2.Controller.prototype.m_next=null;
    b2.Controller.prototype.m_prev=null;
    b2.Controller.prototype.m_world=null;

    b2.GravityController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GravityController.prototype,b2.Controller.prototype);
    b2.GravityController.prototype._super=b2.Controller.prototype;
    b2.GravityController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.GravityController.prototype.__varz=function(){

    };

    b2.GravityController.prototype.Step=function(){
    var a=null,b=null,c=null,d=0,e=null,h=null,g=null,f=0,i=0,j=0;
    if(this.invSqr)for(a=m_bodyList;
               a;
               a=a.nextBody){
        b=a.body;
        c=b.GetWorldCenter();
        d=b.GetMass();
        for(e=m_bodyList;
        e!=a;
        e=e.nextBody)h=e.body,g=h.GetWorldCenter(),f=g.x-c.x,i=g.y-c.y,j=f*f+i*i,j<Number.MIN_VALUE||(f=new b2.Vec2(f,i),f.Multiply(this.G/j/Math.sqrt(j)*d*h.GetMass()),b.IsAwake()&&b.ApplyForce(f,c),f.Multiply(-1),h.IsAwake()&&h.ApplyForce(f,g))}else for(a=m_bodyList;
                                                                                                                                    a;
                                                                                                                                    a=a.nextBody){
            b=
            a.body;
            c=b.GetWorldCenter();
            d=b.GetMass();
            for(e=m_bodyList;
            e!=a;
            e=e.nextBody)h=e.body,g=h.GetWorldCenter(),f=g.x-c.x,i=g.y-c.y,j=f*f+i*i,j<Number.MIN_VALUE||(f=new b2.Vec2(f,i),f.Multiply(this.G/j*d*h.GetMass()),b.IsAwake()&&b.ApplyForce(f,c),f.Multiply(-1),h.IsAwake()&&h.ApplyForce(f,g))}
    };
    b2.GravityController.prototype.G=1;
    b2.GravityController.prototype.invSqr=!0;
    b2.DestructionListener=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.DestructionListener.prototype.__constructor=function(){

    };
    b2.DestructionListener.prototype.__varz=function(){

    };
    b2.DestructionListener.prototype.SayGoodbyeJoint=function(){

    };
    b2.DestructionListener.prototype.SayGoodbyeFixture=function(){

    };
    b2.ContactEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactEdge.prototype.__constructor=function(){

    };
    b2.ContactEdge.prototype.__varz=function(){

    };
    b2.ContactEdge.prototype.other=null;
    b2.ContactEdge.prototype.contact=null;

    b2.ContactEdge.prototype.prev=null;
    b2.ContactEdge.prototype.next=null;
    b2.EdgeChainDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.EdgeChainDef.prototype.__constructor=function(){
    this.vertexCount=0;
    this.isALoop=!0;
    this.vertices=[]
    };
    b2.EdgeChainDef.prototype.__varz=function(){

    };
    b2.EdgeChainDef.prototype.vertices=null;
    b2.EdgeChainDef.prototype.vertexCount=null;
    b2.EdgeChainDef.prototype.isALoop=null;
    b2.Vec2=function(a,b){
    if(arguments.length==2)this.x=a,this.y=b
    };

    b2.Vec2.Make=function(a,b){
    return new b2.Vec2(a,b)
    };
    b2.Vec2.prototype.SetZero=function(){
    this.y=this.x=0
    };
    b2.Vec2.prototype.Set=function(a,b){
    this.x=a;
    this.y=b
    };
    b2.Vec2.prototype.SetV=function(a){
    this.x=a.x;
    this.y=a.y
    };
    b2.Vec2.prototype.GetNegative=function(){
    return new b2.Vec2(-this.x,-this.y)
    };
    b2.Vec2.prototype.NegativeSelf=function(){
    this.x=-this.x;
    this.y=-this.y
    };
    b2.Vec2.prototype.Copy=function(){
    return new b2.Vec2(this.x,this.y)
    };
    b2.Vec2.prototype.Add=function(a){
    this.x+=a.x;
    this.y+=a.y
    };

    b2.Vec2.prototype.Subtract=function(a){
    this.x-=a.x;
    this.y-=a.y
    };
    b2.Vec2.prototype.Multiply=function(a){
    this.x*=a;
    this.y*=a
    };
    b2.Vec2.prototype.MulM=function(a){
    var b=this.x;
    this.x=a.col1.x*b+a.col2.x*this.y;
    this.y=a.col1.y*b+a.col2.y*this.y
    };
    b2.Vec2.prototype.MulTM=function(a){
    var b=b2.Math.Dot(this,a.col1);
    this.y=b2.Math.Dot(this,a.col2);
    this.x=b
    };
    b2.Vec2.prototype.CrossVF=function(a){
    var b=this.x;
    this.x=a*this.y;
    this.y=-a*b
    };

    b2.Vec2.prototype.CrossFV=function(a){
    var b=this.x;
    this.x=-a*this.y;
    this.y=a*b
    };
    b2.Vec2.prototype.MinV=function(a){
    this.x=this.x<a.x?this.x:a.x;
    this.y=this.y<a.y?this.y:a.y
    };
    b2.Vec2.prototype.MaxV=function(a){
    this.x=this.x>a.x?this.x:a.x;
    this.y=this.y>a.y?this.y:a.y
    };
    b2.Vec2.prototype.Abs=function(){
    if(this.x<0)this.x=-this.x;
    if(this.y<0)this.y=-this.y
    };
    b2.Vec2.prototype.Length=function(){
    return Math.sqrt(this.x*this.x+this.y*this.y)
    };

    b2.Vec2.prototype.LengthSquared=function(){
    return this.x*this.x+this.y*this.y
    };
    b2.Vec2.prototype.Normalize=function(){
    var a=Math.sqrt(this.x*this.x+this.y*this.y);
    if(a<Number.MIN_VALUE)return 0;
    var b=1/a;
    this.x*=b;
    this.y*=b;
    return a
    };
    b2.Vec2.prototype.IsValid=function(){
    return b2.Math.IsValid(this.x)&&b2.Math.IsValid(this.y)
    };
    b2.Vec2.prototype.x=0;
    b2.Vec2.prototype.y=0;
    b2.Vec3=function(a,b,c){
    if(arguments.length==3)this.x=a,this.y=b,this.z=c
    };

    b2.Vec3.prototype.SetZero=function(){
    this.x=this.y=this.z=0
    };
    b2.Vec3.prototype.Set=function(a,b,c){
    this.x=a;
    this.y=b;
    this.z=c
    };
    b2.Vec3.prototype.SetV=function(a){
    this.x=a.x;
    this.y=a.y;
    this.z=a.z
    };
    b2.Vec3.prototype.GetNegative=function(){
    return new b2.Vec3(-this.x,-this.y,-this.z)
    };
    b2.Vec3.prototype.NegativeSelf=function(){
    this.x=-this.x;
    this.y=-this.y;
    this.z=-this.z
    };
    b2.Vec3.prototype.Copy=function(){
    return new b2.Vec3(this.x,this.y,this.z)
    };

    b2.Vec3.prototype.Add=function(a){
    this.x+=a.x;
    this.y+=a.y;
    this.z+=a.z
    };
    b2.Vec3.prototype.Subtract=function(a){
    this.x-=a.x;
    this.y-=a.y;
    this.z-=a.z
    };
    b2.Vec3.prototype.Multiply=function(a){
    this.x*=a;
    this.y*=a;
    this.z*=a
    };
    b2.Vec3.prototype.x=0;
    b2.Vec3.prototype.y=0;
    b2.Vec3.prototype.z=0;
    b2.DistanceProxy=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DistanceProxy.prototype.__constructor=function(){

    };
    b2.DistanceProxy.prototype.__varz=function(){

    };

    b2.DistanceProxy.prototype.Set=function(a){
    switch(a.GetType()){
    case b2.Shape.e_circleShape:this.m_vertices=Array(1);
        this.m_vertices[0]=a.m_p;
        this.m_count=1;
        this.m_radius=a.m_radius;
        break;
    case b2.Shape.e_polygonShape:this.m_vertices=a.m_vertices;
        this.m_count=a.m_vertexCount;
        this.m_radius=a.m_radius;
        break;
    default:b2.Settings.b2Assert(!1)}
    };

    b2.DistanceProxy.prototype.GetSupport=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_count;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return b
    };
    b2.DistanceProxy.prototype.GetSupportVertex=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_count;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return this.m_vertices[b]
    };

    b2.DistanceProxy.prototype.GetVertexCount=function(){
    return this.m_count
    };
    b2.DistanceProxy.prototype.GetVertex=function(a){
    b2.Settings.b2Assert(0<=a&&a<this.m_count);
    return this.m_vertices[a]
    };
    b2.DistanceProxy.prototype.m_vertices=null;
    b2.DistanceProxy.prototype.m_count=0;
    b2.DistanceProxy.prototype.m_radius=null;
    b2.ContactFactory=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactFactory.prototype.__constructor=function(){

    };
    b2.ContactFactory.prototype.__varz=function(){
    this.InitializeRegisters()
    };

    b2.ContactFactory.prototype.AddType=function(a,b,c,d){
    this.m_registers[c][d].createFcn=a;
    this.m_registers[c][d].destroyFcn=b;
    this.m_registers[c][d].primary=!0;
    if(c!=d)this.m_registers[d][c].createFcn=a,this.m_registers[d][c].destroyFcn=b,this.m_registers[d][c].primary=!1
    };

    b2.ContactFactory.prototype.InitializeRegisters=function(){
    this.m_registers=Array(b2.Shape.e_shapeTypeCount);
    for(var a=0;
        a<b2.Shape.e_shapeTypeCount;
        a++){
        this.m_registers[a]=Array(b2.Shape.e_shapeTypeCount);
        for(var b=0;
        b<b2.Shape.e_shapeTypeCount;
        b++)this.m_registers[a][b]=new b2.ContactRegister}this.AddType(b2.CircleContact.Create,b2.CircleContact.Destroy,b2.Shape.e_circleShape,b2.Shape.e_circleShape);
    this.AddType(b2.PolyAndCircleContact.Create,b2.PolyAndCircleContact.Destroy,b2.Shape.e_polygonShape,
             b2.Shape.e_circleShape);
    this.AddType(b2.PolygonContact.Create,b2.PolygonContact.Destroy,b2.Shape.e_polygonShape,b2.Shape.e_polygonShape);
    this.AddType(b2.EdgeAndCircleContact.Create,b2.EdgeAndCircleContact.Destroy,b2.Shape.e_edgeShape,b2.Shape.e_circleShape);
    this.AddType(b2.PolyAndEdgeContact.Create,b2.PolyAndEdgeContact.Destroy,b2.Shape.e_polygonShape,b2.Shape.e_edgeShape)
    };

    b2.ContactFactory.prototype.Create=function(a,b){
    var c=a.GetType(),d=b.GetType(),c=this.m_registers[c][d];
    if(c.pool)return d=c.pool,c.pool=d.m_next,c.poolCount--,d.Reset(a,b),d;
    d=c.createFcn;
    return d!=null?(c.primary?(d=d(this.m_allocator),d.Reset(a,b)):(d=d(this.m_allocator),d.Reset(b,a)),d):null
    };

    b2.ContactFactory.prototype.Destroy=function(a){
    a.m_manifold.m_pointCount>0&&(a.m_fixtureA.m_body.SetAwake(!0),a.m_fixtureB.m_body.SetAwake(!0));
    var b=a.m_fixtureA.GetType(),c=a.m_fixtureB.GetType(),b=this.m_registers[b][c];
    b.poolCount++;
    a.m_next=b.pool;
    b.pool=a;
    b=b.destroyFcn;
    b(a,this.m_allocator)
    };
    b2.ContactFactory.prototype.m_registers=null;
    b2.ContactFactory.prototype.m_allocator=null;

    b2.ConstantAccelController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.ConstantAccelController.prototype,b2.Controller.prototype);
    b2.ConstantAccelController.prototype._super=b2.Controller.prototype;
    b2.ConstantAccelController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.ConstantAccelController.prototype.__varz=function(){
    this.A=new b2.Vec2(0,0)
    };

    b2.ConstantAccelController.prototype.Step=function(a){
    for(var a=new b2.Vec2(this.A.x*a.dt,this.A.y*a.dt),b=m_bodyList;
        b;
        b=b.nextBody){
        var c=b.body;
        c.IsAwake()&&c.SetLinearVelocity(new b2.Vec2(c.GetLinearVelocity().x+a.x,c.GetLinearVelocity().y+a.y))}
    };
    b2.ConstantAccelController.prototype.A=new b2.Vec2(0,0);
    b2.SeparationFunction=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SeparationFunction.prototype.__constructor=function(){

    };

    b2.SeparationFunction.prototype.__varz=function(){
    this.m_localPoint=new b2.Vec2;
    this.m_axis=new b2.Vec2
    };
    b2.SeparationFunction.e_points=1;
    b2.SeparationFunction.e_faceA=2;
    b2.SeparationFunction.e_faceB=4;

    b2.SeparationFunction.prototype.Initialize=function(a,b,c,d,e){
    this.m_proxyA=b;
    this.m_proxyB=d;
    b=a.count;
    b2.Settings.b2Assert(0<b&&b<3);
    var h,g,f,i;
    if(b==1)this.m_type=b2.SeparationFunction.e_points,h=this.m_proxyA.GetVertex(a.indexA[0]),g=this.m_proxyB.GetVertex(a.indexB[0]),i=h,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=g,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),this.m_axis.x=g-h,this.m_axis.y=
        e-c,this.m_axis.Normalize();
    else{
        if(a.indexB[0]==a.indexB[1])this.m_type=b2.SeparationFunction.e_faceA,b=this.m_proxyA.GetVertex(a.indexA[0]),d=this.m_proxyA.GetVertex(a.indexA[1]),g=this.m_proxyB.GetVertex(a.indexB[0]),this.m_localPoint.x=0.5*(b.x+d.x),this.m_localPoint.y=0.5*(b.y+d.y),this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(d,b),1),this.m_axis.Normalize(),i=this.m_axis,f=c.R,b=f.col1.x*i.x+f.col2.x*i.y,d=f.col1.y*i.x+f.col2.y*i.y,i=this.m_localPoint,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*
                                                                                                                                                                                                                                        i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=g,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),a=(g-h)*b+(e-c)*d;
        else if(a.indexA[0]==a.indexA[0])this.m_type=b2.SeparationFunction.e_faceB,f=this.m_proxyB.GetVertex(a.indexB[0]),i=this.m_proxyB.GetVertex(a.indexB[1]),h=this.m_proxyA.GetVertex(a.indexA[0]),this.m_localPoint.x=0.5*(f.x+i.x),this.m_localPoint.y=0.5*(f.y+i.y),this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(i,f),1),this.m_axis.Normalize(),
        i=this.m_axis,f=e.R,b=f.col1.x*i.x+f.col2.x*i.y,d=f.col1.y*i.x+f.col2.y*i.y,i=this.m_localPoint,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=h,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),a=(h-g)*b+(c-e)*d;
        else{
        b=this.m_proxyA.GetVertex(a.indexA[0]);
        d=this.m_proxyA.GetVertex(a.indexA[1]);
        f=this.m_proxyB.GetVertex(a.indexB[0]);
        i=this.m_proxyB.GetVertex(a.indexB[1]);
        b2.Math.MulX(c,h);
        h=b2.Math.MulMV(c.R,
                b2.Math.SubtractVV(d,b));
        b2.Math.MulX(e,g);
        a=b2.Math.MulMV(e.R,b2.Math.SubtractVV(i,f));
        e=h.x*h.x+h.y*h.y;
        g=a.x*a.x+a.y*a.y;
        var j=b2.Math.SubtractVV(a,h),c=h.x*j.x+h.y*j.y,j=a.x*j.x+a.y*j.y;
        h=h.x*a.x+h.y*a.y;
        var k=e*g-h*h,a=0;
        k!=0&&(a=b2.Math.Clamp((h*j-c*g)/k,0,1));
        (h*a+j)/g<0&&(a=b2.Math.Clamp((h-c)/e,0,1));
        h=new b2.Vec2;
        h.x=b.x+a*(d.x-b.x);
        h.y=b.y+a*(d.y-b.y);
        g=new b2.Vec2;
        g.x=f.x+a*(i.x-f.x);
        g.y=f.y+a*(i.y-f.y);
        a==0||a==1?(this.m_type=b2.SeparationFunction.e_faceB,this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(i,
                                                             f),1),this.m_axis.Normalize(),this.m_localPoint=g):(this.m_type=b2.SeparationFunction.e_faceA,this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(d,b),1),this.m_localPoint=h)}a<0&&this.m_axis.NegativeSelf()}
    };

    b2.SeparationFunction.prototype.Evaluate=function(a,b){
    var c,d,e;
    switch(this.m_type){
    case b2.SeparationFunction.e_points:return c=b2.Math.MulTMV(a.R,this.m_axis),d=b2.Math.MulTMV(b.R,this.m_axis.GetNegative()),c=this.m_proxyA.GetSupportVertex(c),d=this.m_proxyB.GetSupportVertex(d),c=b2.Math.MulX(a,c),d=b2.Math.MulX(b,d),(d.x-c.x)*this.m_axis.x+(d.y-c.y)*this.m_axis.y;
    case b2.SeparationFunction.e_faceA:return e=b2.Math.MulMV(a.R,this.m_axis),c=b2.Math.MulX(a,this.m_localPoint),d=b2.Math.MulTMV(b.R,
                                                                    e.GetNegative()),d=this.m_proxyB.GetSupportVertex(d),d=b2.Math.MulX(b,d),(d.x-c.x)*e.x+(d.y-c.y)*e.y;
    case b2.SeparationFunction.e_faceB:return e=b2.Math.MulMV(b.R,this.m_axis),d=b2.Math.MulX(b,this.m_localPoint),c=b2.Math.MulTMV(a.R,e.GetNegative()),c=this.m_proxyA.GetSupportVertex(c),c=b2.Math.MulX(a,c),(c.x-d.x)*e.x+(c.y-d.y)*e.y;
    default:return b2.Settings.b2Assert(!1),0}
    };
    b2.SeparationFunction.prototype.m_proxyA=null;
    b2.SeparationFunction.prototype.m_proxyB=null;

    b2.SeparationFunction.prototype.m_type=0;
    b2.SeparationFunction.prototype.m_localPoint=new b2.Vec2;
    b2.SeparationFunction.prototype.m_axis=new b2.Vec2;
    b2.DynamicTreePair=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreePair.prototype.__constructor=function(){

    };
    b2.DynamicTreePair.prototype.__varz=function(){

    };
    b2.DynamicTreePair.prototype.proxyA=null;
    b2.DynamicTreePair.prototype.proxyB=null;

    b2.ContactConstraintPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactConstraintPoint.prototype.__constructor=function(){

    };
    b2.ContactConstraintPoint.prototype.__varz=function(){
    this.localPoint=new b2.Vec2;
    this.rA=new b2.Vec2;
    this.rB=new b2.Vec2
    };
    b2.ContactConstraintPoint.prototype.localPoint=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.rA=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.rB=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.normalImpulse=null;

    b2.ContactConstraintPoint.prototype.tangentImpulse=null;
    b2.ContactConstraintPoint.prototype.normalMass=null;
    b2.ContactConstraintPoint.prototype.tangentMass=null;
    b2.ContactConstraintPoint.prototype.equalizedMass=null;
    b2.ContactConstraintPoint.prototype.velocityBias=null;
    b2.ControllerEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ControllerEdge.prototype.__constructor=function(){

    };
    b2.ControllerEdge.prototype.__varz=function(){

    };
    b2.ControllerEdge.prototype.controller=null;

    b2.ControllerEdge.prototype.body=null;
    b2.ControllerEdge.prototype.prevBody=null;
    b2.ControllerEdge.prototype.nextBody=null;
    b2.ControllerEdge.prototype.prevController=null;
    b2.ControllerEdge.prototype.nextController=null;
    b2.DistanceInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DistanceInput.prototype.__constructor=function(){

    };
    b2.DistanceInput.prototype.__varz=function(){

    };
    b2.DistanceInput.prototype.proxyA=null;
    b2.DistanceInput.prototype.proxyB=null;

    b2.DistanceInput.prototype.transformA=null;
    b2.DistanceInput.prototype.transformB=null;
    b2.DistanceInput.prototype.useRadii=null;
    b2.Settings=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Settings.prototype.__constructor=function(){

    };
    b2.Settings.prototype.__varz=function(){

    };
    b2.Settings.b2MixFriction=function(a,b){
    return Math.sqrt(a*b)
    };
    b2.Settings.b2MixRestitution=function(a,b){
    return a>b?a:b
    };
    b2.Settings.b2Assert=function(a){
    if(!a)throw"Assertion Failed";

    };

    b2.Settings.VERSION="2.1alpha";
    b2.Settings.USHRT_MAX=65535;
    b2.Settings.b2_pi=Math.PI;
    b2.Settings.b2_maxManifoldPoints=2;
    b2.Settings.b2_aabbExtension=0.1;
    b2.Settings.b2_aabbMultiplier=2;
    b2.Settings.b2_polygonRadius=2*b2.Settings.b2_linearSlop;
    b2.Settings.b2_linearSlop=0.005;
    b2.Settings.b2_angularSlop=2/180*b2.Settings.b2_pi;
    b2.Settings.b2_toiSlop=8*b2.Settings.b2_linearSlop;
    b2.Settings.b2_maxTOIContactsPerIsland=32;
    b2.Settings.b2_maxTOIJointsPerIsland=32;
    b2.Settings.b2_velocityThreshold=1;

    b2.Settings.b2_maxLinearCorrection=0.2;
    b2.Settings.b2_maxAngularCorrection=8/180*b2.Settings.b2_pi;
    b2.Settings.b2_maxTranslation=2;
    b2.Settings.b2_maxTranslationSquared=b2.Settings.b2_maxTranslation*b2.Settings.b2_maxTranslation;
    b2.Settings.b2_maxRotation=0.5*b2.Settings.b2_pi;
    b2.Settings.b2_maxRotationSquared=b2.Settings.b2_maxRotation*b2.Settings.b2_maxRotation;
    b2.Settings.b2_contactBaumgarte=0.2;
    b2.Settings.b2_timeToSleep=0.5;
    b2.Settings.b2_linearSleepTolerance=0.01;

    b2.Settings.b2_angularSleepTolerance=2/180*b2.Settings.b2_pi;
    b2.Proxy=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Proxy.prototype.__constructor=function(){

    };
    b2.Proxy.prototype.__varz=function(){
    this.lowerBounds=Array(2);
    this.upperBounds=Array(2);
    this.pairs={
    }
    };
    b2.Proxy.prototype.IsValid=function(){
    return this.overlapCount!=b2.BroadPhase.b2_invalid
    };
    b2.Proxy.prototype.lowerBounds=Array(2);
    b2.Proxy.prototype.upperBounds=Array(2);
    b2.Proxy.prototype.overlapCount=0;

    b2.Proxy.prototype.timeStamp=0;
    b2.Proxy.prototype.pairs={

    };
    b2.Proxy.prototype.next=null;
    b2.Proxy.prototype.userData=null;
    b2.Point=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Point.prototype.__constructor=function(){

    };
    b2.Point.prototype.__varz=function(){
    this.p=new b2.Vec2
    };
    b2.Point.prototype.Support=function(){
    return this.p
    };
    b2.Point.prototype.GetFirstVertex=function(){
    return this.p
    };
    b2.Point.prototype.p=new b2.Vec2;

    b2.WorldManifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.WorldManifold.prototype.__constructor=function(){
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.Vec2
    };
    b2.WorldManifold.prototype.__varz=function(){
    this.m_normal=new b2.Vec2
    };

    b2.WorldManifold.prototype.Initialize=function(a,b,c,d,e){
    if(a.m_pointCount!=0){
        var h=0,g,f,i,j,k,l,n;
        switch(a.m_type){
        case b2.Manifold.e_circles:f=b.R;
        g=a.m_localPoint;
        h=b.position.x+f.col1.x*g.x+f.col2.x*g.y;
        b=b.position.y+f.col1.y*g.x+f.col2.y*g.y;
        f=d.R;
        g=a.m_points[0].m_localPoint;
        a=d.position.x+f.col1.x*g.x+f.col2.x*g.y;
        d=d.position.y+f.col1.y*g.x+f.col2.y*g.y;
        g=a-h;
        f=d-b;
        i=g*g+f*f;
        i>Number.MIN_VALUE*Number.MIN_VALUE?(i=Math.sqrt(i),this.m_normal.x=g/i,this.m_normal.y=f/i):(this.m_normal.x=1,
                                                          this.m_normal.y=0);
        g=b+c*this.m_normal.y;
        d-=e*this.m_normal.y;
        this.m_points[0].x=0.5*(h+c*this.m_normal.x+(a-e*this.m_normal.x));
        this.m_points[0].y=0.5*(g+d);
        break;
        case b2.Manifold.e_faceA:f=b.R;
        g=a.m_localPlaneNormal;
        i=f.col1.x*g.x+f.col2.x*g.y;
        j=f.col1.y*g.x+f.col2.y*g.y;
        f=b.R;
        g=a.m_localPoint;
        k=b.position.x+f.col1.x*g.x+f.col2.x*g.y;
        l=b.position.y+f.col1.y*g.x+f.col2.y*g.y;
        this.m_normal.x=i;
        this.m_normal.y=j;
        for(h=0;
            h<a.m_pointCount;
            h++)f=d.R,g=a.m_points[h].m_localPoint,n=d.position.x+f.col1.x*
            g.x+f.col2.x*g.y,g=d.position.y+f.col1.y*g.x+f.col2.y*g.y,this.m_points[h].x=n+0.5*(c-(n-k)*i-(g-l)*j-e)*i,this.m_points[h].y=g+0.5*(c-(n-k)*i-(g-l)*j-e)*j;
        break;
        case b2.Manifold.e_faceB:f=d.R;
        g=a.m_localPlaneNormal;
        i=f.col1.x*g.x+f.col2.x*g.y;
        j=f.col1.y*g.x+f.col2.y*g.y;
        f=d.R;
        g=a.m_localPoint;
        k=d.position.x+f.col1.x*g.x+f.col2.x*g.y;
        l=d.position.y+f.col1.y*g.x+f.col2.y*g.y;
        this.m_normal.x=-i;
        this.m_normal.y=-j;
        for(h=0;
            h<a.m_pointCount;
            h++)f=b.R,g=a.m_points[h].m_localPoint,n=b.position.x+f.col1.x*
            g.x+f.col2.x*g.y,g=b.position.y+f.col1.y*g.x+f.col2.y*g.y,this.m_points[h].x=n+0.5*(e-(n-k)*i-(g-l)*j-c)*i,this.m_points[h].y=g+0.5*(e-(n-k)*i-(g-l)*j-c)*j}}
    };
    b2.WorldManifold.prototype.m_normal=new b2.Vec2;
    b2.WorldManifold.prototype.m_points=null;
    b2.RayCastOutput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.RayCastOutput.prototype.__constructor=function(){

    };
    b2.RayCastOutput.prototype.__varz=function(){
    this.normal=new b2.Vec2
    };
    b2.RayCastOutput.prototype.normal=new b2.Vec2;

    b2.RayCastOutput.prototype.fraction=null;
    b2.ConstantForceController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.ConstantForceController.prototype,b2.Controller.prototype);
    b2.ConstantForceController.prototype._super=b2.Controller.prototype;
    b2.ConstantForceController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.ConstantForceController.prototype.__varz=function(){
    this.F=new b2.Vec2(0,0)
    };
    b2.ConstantForceController.prototype.Step=function(){
    for(var a=m_bodyList;
        a;
        a=a.nextBody){
        var b=a.body;
        b.IsAwake()&&b.ApplyForce(this.F,b.GetWorldCenter())}
    };
    b2.ConstantForceController.prototype.F=new b2.Vec2(0,0);
    b2.MassData=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.MassData.prototype.__constructor=function(){

    };
    b2.MassData.prototype.__varz=function(){
    this.center=new b2.Vec2(0,0)
    };

    b2.MassData.prototype.mass=0;
    b2.MassData.prototype.center=new b2.Vec2(0,0);
    b2.MassData.prototype.I=0;
    b2.DynamicTree=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTree.prototype.__constructor=function(){
    this.m_freeList=this.m_root=null;
    this.m_insertionCount=this.m_path=0
    };
    b2.DynamicTree.prototype.__varz=function(){

    };

    b2.DynamicTree.prototype.AllocateNode=function(){
    if(this.m_freeList){
        var a=this.m_freeList;
        this.m_freeList=a.parent;
        a.parent=null;
        a.child1=null;
        a.child2=null;
        return a}return new b2.DynamicTreeNode
    };
    b2.DynamicTree.prototype.FreeNode=function(a){
    a.parent=this.m_freeList;
    this.m_freeList=a
    };

    b2.DynamicTree.prototype.InsertLeaf=function(a){
    ++this.m_insertionCount;
    if(this.m_root==null)this.m_root=a,this.m_root.parent=null;
    else{
        var b=a.aabb.GetCenter(),c=this.m_root;
        if(c.IsLeaf()==!1){
        do var d=c.child1,c=c.child2,c=Math.abs((d.aabb.lowerBound.x+d.aabb.upperBound.x)/2-b.x)+Math.abs((d.aabb.lowerBound.y+d.aabb.upperBound.y)/2-b.y)<Math.abs((c.aabb.lowerBound.x+c.aabb.upperBound.x)/2-b.x)+Math.abs((c.aabb.lowerBound.y+c.aabb.upperBound.y)/2-b.y)?d:c;
        while(c.IsLeaf()==!1)}b=c.parent;
        d=this.AllocateNode();

        d.parent=b;
        d.userData=null;
        d.aabb.Combine(a.aabb,c.aabb);
        if(b){
        c.parent.child1==c?b.child1=d:b.child2=d;
        d.child1=c;
        d.child2=a;
        c.parent=d;
        a.parent=d;
        do{
            if(b.aabb.Contains(d.aabb))break;
            b.aabb.Combine(b.child1.aabb,b.child2.aabb);
            d=b;
            b=b.parent}while(b)}else d.child1=c,d.child2=a,c.parent=d,this.m_root=a.parent=d}
    };

    b2.DynamicTree.prototype.RemoveLeaf=function(a){
    if(a==this.m_root)this.m_root=null;
    else{
        var b=a.parent,c=b.parent,a=b.child1==a?b.child2:b.child1;
        if(c){
        c.child1==b?c.child1=a:c.child2=a;
        a.parent=c;
        for(this.FreeNode(b);
            c;
           ){
            b=c.aabb;
            c.aabb=b2.AABB.Combine(c.child1.aabb,c.child2.aabb);
            if(b.Contains(c.aabb))break;
            c=c.parent}}else this.m_root=a,a.parent=null,this.FreeNode(b)}
    };

    b2.DynamicTree.prototype.CreateProxy=function(a,b){
    var c=this.AllocateNode(),d=b2.Settings.b2_aabbExtension,e=b2.Settings.b2_aabbExtension;
    c.aabb.lowerBound.x=a.lowerBound.x-d;
    c.aabb.lowerBound.y=a.lowerBound.y-e;
    c.aabb.upperBound.x=a.upperBound.x+d;
    c.aabb.upperBound.y=a.upperBound.y+e;
    c.userData=b;
    this.InsertLeaf(c);
    return c
    };
    b2.DynamicTree.prototype.DestroyProxy=function(a){
    this.RemoveLeaf(a);
    this.FreeNode(a)
    };

    b2.DynamicTree.prototype.MoveProxy=function(a,b,c){
    b2.Settings.b2Assert(a.IsLeaf());
    if(a.aabb.Contains(b))return!1;
    this.RemoveLeaf(a);
    var d=b2.Settings.b2_aabbExtension+b2.Settings.b2_aabbMultiplier*(c.x>0?c.x:-c.x),c=b2.Settings.b2_aabbExtension+b2.Settings.b2_aabbMultiplier*(c.y>0?c.y:-c.y);
    a.aabb.lowerBound.x=b.lowerBound.x-d;
    a.aabb.lowerBound.y=b.lowerBound.y-c;
    a.aabb.upperBound.x=b.upperBound.x+d;
    a.aabb.upperBound.y=b.upperBound.y+c;
    this.InsertLeaf(a);
    return!0
    };

    b2.DynamicTree.prototype.Rebalance=function(a){
    if(this.m_root!=null)for(var b=0;
                 b<a;
                 b++){
        for(var c=this.m_root,d=0;
        c.IsLeaf()==!1;
           )c=this.m_path>>d&1?c.child2:c.child1,d=d+1&31;
        ++this.m_path;
        this.RemoveLeaf(c);
        this.InsertLeaf(c)}
    };
    b2.DynamicTree.prototype.GetFatAABB=function(a){
    return a.aabb
    };
    b2.DynamicTree.prototype.GetUserData=function(a){
    return a.userData
    };

    b2.DynamicTree.prototype.Query=function(a,b){
    if(this.m_root!=null){
        var c=[],d=0;
        for(c[d++]=this.m_root;
        d>0;
           ){
        var e=c[--d];
        if(e.aabb.TestOverlap(b))if(e.IsLeaf()){
            if(!a(e))break}else c[d++]=e.child1,c[d++]=e.child2}}
    };

    b2.DynamicTree.prototype.RayCast=function(a,b){
    if(this.m_root!=null){
        var c=b.p1,d=b.p2,e=b2.Math.SubtractVV(c,d);
        e.Normalize();
        var e=b2.Math.CrossFV(1,e),h=b2.Math.AbsV(e),g=b.maxFraction,f=new b2.AABB,i;
        i=c.x+g*(d.x-c.x);
        g=c.y+g*(d.y-c.y);
        f.lowerBound.x=Math.min(c.x,i);
        f.lowerBound.y=Math.min(c.y,g);
        f.upperBound.x=Math.max(c.x,i);
        f.upperBound.y=Math.max(c.y,g);
        var j=[],k=0;
        for(j[k++]=this.m_root;
        k>0;
           )if(i=j[--k],i.aabb.TestOverlap(f)!=!1){
           var g=i.aabb.GetCenter(),l=i.aabb.GetExtents();
           if(!(Math.abs(e.x*
                 (c.x-g.x)+e.y*(c.y-g.y))-h.x*l.x-h.y*l.y>0))if(i.IsLeaf()){
                     g=new b2.RayCastInput;
                     g.p1=b.p1;
                     g.p2=b.p2;
                     g.maxFraction=b.maxFraction;
                     g=a(g,i);
                     if(g==0)break;
                     i=c.x+g*(d.x-c.x);
                     g=c.y+g*(d.y-c.y);
                     f.lowerBound.x=Math.min(c.x,i);
                     f.lowerBound.y=Math.min(c.y,g);
                     f.upperBound.x=Math.max(c.x,i);
                     f.upperBound.y=Math.max(c.y,g)}else j[k++]=i.child1,j[k++]=i.child2}}
    };
    b2.DynamicTree.prototype.m_root=null;
    b2.DynamicTree.prototype.m_freeList=null;
    b2.DynamicTree.prototype.m_path=0;

    b2.DynamicTree.prototype.m_insertionCount=0;
    b2.JointEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.JointEdge.prototype.__constructor=function(){

    };
    b2.JointEdge.prototype.__varz=function(){

    };
    b2.JointEdge.prototype.other=null;
    b2.JointEdge.prototype.joint=null;
    b2.JointEdge.prototype.prev=null;
    b2.JointEdge.prototype.next=null;
    b2.RayCastInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.RayCastInput.prototype.__constructor=function(){

    };

    b2.RayCastInput.prototype.__varz=function(){
    this.p1=new b2.Vec2;
    this.p2=new b2.Vec2
    };
    b2.RayCastInput.prototype.p1=new b2.Vec2;
    b2.RayCastInput.prototype.p2=new b2.Vec2;
    b2.RayCastInput.prototype.maxFraction=null;
    Features=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    Features.prototype.__constructor=function(){

    };
    Features.prototype.__varz=function(){

    };
    Features.prototype.__defineGetter__("referenceEdge",function(){
    return this._referenceEdge});

    Features.prototype.__defineSetter__("referenceEdge",function(a){
    this._referenceEdge=a;
    this._m_id._key=this._m_id._key&4294967040|this._referenceEdge&255});
    Features.prototype.__defineGetter__("incidentEdge",function(){
    return this._incidentEdge});
    Features.prototype.__defineSetter__("incidentEdge",function(a){
    this._incidentEdge=a;
    this._m_id._key=this._m_id._key&4294902015|this._incidentEdge<<8&65280});
    Features.prototype.__defineGetter__("incidentVertex",function(){
    return this._incidentVertex});

    Features.prototype.__defineSetter__("incidentVertex",function(a){
    this._incidentVertex=a;
    this._m_id._key=this._m_id._key&4278255615|this._incidentVertex<<16&16711680});
    Features.prototype.__defineGetter__("flip",function(){
    return this._flip});
    Features.prototype.__defineSetter__("flip",function(a){
    this._flip=a;
    this._m_id._key=this._m_id._key&16777215|this._flip<<24&4278190080});
    Features.prototype._referenceEdge=0;
    Features.prototype._incidentEdge=0;
    Features.prototype._incidentVertex=0;

    Features.prototype._flip=0;
    Features.prototype._m_id=null;
    b2.FilterData=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.FilterData.prototype.__constructor=function(){

    };
    b2.FilterData.prototype.__varz=function(){
    this.categoryBits=1;
    this.maskBits=65535
    };
    b2.FilterData.prototype.Copy=function(){
    var a=new b2.FilterData;
    a.categoryBits=this.categoryBits;
    a.maskBits=this.maskBits;
    a.groupIndex=this.groupIndex;
    return a
    };
    b2.FilterData.prototype.categoryBits=1;

    b2.FilterData.prototype.maskBits=65535;
    b2.FilterData.prototype.groupIndex=0;
    b2.AABB=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.AABB.prototype.__constructor=function(){

    };
    b2.AABB.prototype.__varz=function(){
    this.lowerBound=new b2.Vec2;
    this.upperBound=new b2.Vec2
    };
    b2.AABB.Combine=function(a,b){
    var c=new b2.AABB;
    c.Combine(a,b);
    return c
    };

    b2.AABB.prototype.IsValid=function(){
    var a=this.upperBound.y-this.lowerBound.y;
    return this.upperBound.x-this.lowerBound.x>=0&&a>=0&&this.lowerBound.IsValid()&&this.upperBound.IsValid()
    };
    b2.AABB.prototype.GetCenter=function(){
    return new b2.Vec2((this.lowerBound.x+this.upperBound.x)/2,(this.lowerBound.y+this.upperBound.y)/2)
    };
    b2.AABB.prototype.GetExtents=function(){
    return new b2.Vec2((this.upperBound.x-this.lowerBound.x)/2,(this.upperBound.y-this.lowerBound.y)/2)
    };

    b2.AABB.prototype.Contains=function(a){
    return this.lowerBound.x<=a.lowerBound.x&&this.lowerBound.y<=a.lowerBound.y&&a.upperBound.x<=this.upperBound.x&&a.upperBound.y<=this.upperBound.y
    };

    b2.AABB.prototype.RayCast=function(a,b){
    var c=-Number.MAX_VALUE,d=Number.MAX_VALUE,e=b.p1.x,h=b.p1.y,g=b.p2.x-b.p1.x,f=b.p2.y-b.p1.y,i=Math.abs(f),j=a.normal,k;
    if(Math.abs(g)<Number.MIN_VALUE){
        if(e<this.lowerBound.x||this.upperBound.x<e)return!1}else{
        k=1/g;
        g=(this.lowerBound.x-e)*k;
        e=(this.upperBound.x-e)*k;
        k=-1;
        g>e&&(k=g,g=e,e=k,k=1);
        if(g>c)j.x=k,j.y=0,c=g;
        d=Math.min(d,e);
        if(c>d)return!1}if(i<Number.MIN_VALUE){
            if(h<this.lowerBound.y||this.upperBound.y<h)return!1}else{
            k=1/f;
            g=(this.lowerBound.y-h)*
                k;
            e=(this.upperBound.y-h)*k;
            k=-1;
            g>e&&(k=g,g=e,e=k,k=1);
            if(g>c)j.y=k,j.x=0,c=g;
            d=Math.min(d,e);
            if(c>d)return!1}a.fraction=c;
    return!0
    };
    b2.AABB.prototype.TestOverlap=function(a){
    var b=a.lowerBound.y-this.upperBound.y,c=this.lowerBound.y-a.upperBound.y;
    if(a.lowerBound.x-this.upperBound.x>0||b>0)return!1;
    if(this.lowerBound.x-a.upperBound.x>0||c>0)return!1;
    return!0
    };

    b2.AABB.prototype.Combine=function(a,b){
    this.lowerBound.x=Math.min(a.lowerBound.x,b.lowerBound.x);
    this.lowerBound.y=Math.min(a.lowerBound.y,b.lowerBound.y);
    this.upperBound.x=Math.max(a.upperBound.x,b.upperBound.x);
    this.upperBound.y=Math.max(a.upperBound.y,b.upperBound.y)
    };
    b2.AABB.prototype.lowerBound=new b2.Vec2;
    b2.AABB.prototype.upperBound=new b2.Vec2;
    b2.Jacobian=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Jacobian.prototype.__constructor=function(){

    };

    b2.Jacobian.prototype.__varz=function(){
    this.linearA=new b2.Vec2;
    this.linearB=new b2.Vec2
    };
    b2.Jacobian.prototype.SetZero=function(){
    this.linearA.SetZero();
    this.angularA=0;
    this.linearB.SetZero();
    this.angularB=0
    };
    b2.Jacobian.prototype.Set=function(a,b,c,d){
    this.linearA.SetV(a);
    this.angularA=b;
    this.linearB.SetV(c);
    this.angularB=d
    };
    b2.Jacobian.prototype.Compute=function(a,b,c,d){
    return this.linearA.x*a.x+this.linearA.y*a.y+this.angularA*b+(this.linearB.x*c.x+this.linearB.y*c.y)+this.angularB*d
    };

    b2.Jacobian.prototype.linearA=new b2.Vec2;
    b2.Jacobian.prototype.angularA=null;
    b2.Jacobian.prototype.linearB=new b2.Vec2;
    b2.Jacobian.prototype.angularB=null;
    b2.Bound=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Bound.prototype.__constructor=function(){

    };
    b2.Bound.prototype.__varz=function(){

    };
    b2.Bound.prototype.IsLower=function(){
    return(this.value&1)==0
    };
    b2.Bound.prototype.IsUpper=function(){
    return(this.value&1)==1
    };

    b2.Bound.prototype.Swap=function(a){
    var b=this.value,c=this.proxy,d=this.stabbingCount;
    this.value=a.value;
    this.proxy=a.proxy;
    this.stabbingCount=a.stabbingCount;
    a.value=b;
    a.proxy=c;
    a.stabbingCount=d
    };
    b2.Bound.prototype.value=0;
    b2.Bound.prototype.proxy=null;
    b2.Bound.prototype.stabbingCount=0;
    b2.SimplexVertex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SimplexVertex.prototype.__constructor=function(){

    };
    b2.SimplexVertex.prototype.__varz=function(){

    };

    b2.SimplexVertex.prototype.Set=function(a){
    this.wA.SetV(a.wA);
    this.wB.SetV(a.wB);
    this.w.SetV(a.w);
    this.a=a.a;
    this.indexA=a.indexA;
    this.indexB=a.indexB
    };
    b2.SimplexVertex.prototype.wA=null;
    b2.SimplexVertex.prototype.wB=null;
    b2.SimplexVertex.prototype.w=null;
    b2.SimplexVertex.prototype.a=null;
    b2.SimplexVertex.prototype.indexA=0;
    b2.SimplexVertex.prototype.indexB=0;
    b2.Mat22=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Mat22.prototype.__constructor=function(){
    this.col1.x=this.col2.y=1
    };
    b2.Mat22.prototype.__varz=function(){
    this.col1=new b2.Vec2;
    this.col2=new b2.Vec2
    };
    b2.Mat22.FromAngle=function(a){
    var b=new b2.Mat22;
    b.Set(a);
    return b
    };
    b2.Mat22.FromVV=function(a,b){
    var c=new b2.Mat22;
    c.SetVV(a,b);
    return c
    };
    b2.Mat22.prototype.Set=function(a){
    var b=Math.cos(a),a=Math.sin(a);
    this.col1.x=b;
    this.col2.x=-a;
    this.col1.y=a;
    this.col2.y=b
    };
    b2.Mat22.prototype.SetVV=function(a,b){
    this.col1.SetV(a);
    this.col2.SetV(b)
    };

    b2.Mat22.prototype.Copy=function(){
    var a=new b2.Mat22;
    a.SetM(this);
    return a
    };
    b2.Mat22.prototype.SetM=function(a){
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2)
    };
    b2.Mat22.prototype.AddM=function(a){
    this.col1.x+=a.col1.x;
    this.col1.y+=a.col1.y;
    this.col2.x+=a.col2.x;
    this.col2.y+=a.col2.y
    };
    b2.Mat22.prototype.SetIdentity=function(){
    this.col1.x=1;
    this.col2.x=0;
    this.col1.y=0;
    this.col2.y=1
    };
    b2.Mat22.prototype.SetZero=function(){
    this.col1.x=0;
    this.col2.x=0;
    this.col1.y=0;
    this.col2.y=0
    };

    b2.Mat22.prototype.GetAngle=function(){
    return Math.atan2(this.col1.y,this.col1.x)
    };
    b2.Mat22.prototype.GetInverse=function(a){
    var b=this.col1.x,c=this.col2.x,d=this.col1.y,e=this.col2.y,h=b*e-c*d;
    h!=0&&(h=1/h);
    a.col1.x=h*e;
    a.col2.x=-h*c;
    a.col1.y=-h*d;
    a.col2.y=h*b;
    return a
    };
    b2.Mat22.prototype.Solve=function(a,b,c){
    var d=this.col1.x,e=this.col2.x,h=this.col1.y,g=this.col2.y,f=d*g-e*h;
    f!=0&&(f=1/f);
    a.x=f*(g*b-e*c);
    a.y=f*(d*c-h*b);
    return a
    };
    b2.Mat22.prototype.Abs=function(){
    this.col1.Abs();
    this.col2.Abs()
    };

    b2.Mat22.prototype.col1=new b2.Vec2;
    b2.Mat22.prototype.col2=new b2.Vec2;
    b2.SimplexCache=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SimplexCache.prototype.__constructor=function(){

    };
    b2.SimplexCache.prototype.__varz=function(){
    this.indexA=Array(3);
    this.indexB=Array(3)
    };
    b2.SimplexCache.prototype.metric=null;
    b2.SimplexCache.prototype.count=0;
    b2.SimplexCache.prototype.indexA=Array(3);
    b2.SimplexCache.prototype.indexB=Array(3);

    b2.Shape=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Shape.prototype.__constructor=function(){
    this.m_type=b2.Shape.e_unknownShape;
    this.m_radius=b2.Settings.b2_linearSlop
    };
    b2.Shape.prototype.__varz=function(){

    };

    b2.Shape.TestOverlap=function(a,b,c,d){
    var e=new b2.DistanceInput;
    e.proxyA=new b2.DistanceProxy;
    e.proxyA.Set(a);
    e.proxyB=new b2.DistanceProxy;
    e.proxyB.Set(c);
    e.transformA=b;
    e.transformB=d;
    e.useRadii=!0;
    a=new b2.SimplexCache;
    a.count=0;
    b=new b2.DistanceOutput;
    b2.Distance.Distance(b,a,e);
    return b.distance<10*Number.MIN_VALUE
    };
    b2.Shape.e_hitCollide=1;
    b2.Shape.e_missCollide=0;
    b2.Shape.e_startsInsideCollide=-1;
    b2.Shape.e_unknownShape=-1;
    b2.Shape.e_circleShape=0;
    b2.Shape.e_polygonShape=1;

    b2.Shape.e_edgeShape=2;
    b2.Shape.e_shapeTypeCount=3;
    b2.Shape.prototype.Copy=function(){
    return null
    };
    b2.Shape.prototype.Set=function(a){
    this.m_radius=a.m_radius
    };
    b2.Shape.prototype.GetType=function(){
    return this.m_type
    };
    b2.Shape.prototype.TestPoint=function(){
    return!1
    };
    b2.Shape.prototype.RayCast=function(){
    return!1
    };
    b2.Shape.prototype.ComputeAABB=function(){

    };
    b2.Shape.prototype.ComputeMass=function(){

    };
    b2.Shape.prototype.ComputeSubmergedArea=function(){
    return 0
    };
    b2.Shape.prototype.m_type=0;

    b2.Shape.prototype.m_radius=null;
    b2.Segment=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Segment.prototype.__constructor=function(){

    };
    b2.Segment.prototype.__varz=function(){
    this.p1=new b2.Vec2;
    this.p2=new b2.Vec2
    };

    b2.Segment.prototype.TestSegment=function(a,b,c,d){
    var e=c.p1,h=c.p2.x-e.x,g=c.p2.y-e.y,c=this.p2.y-this.p1.y,f=-(this.p2.x-this.p1.x),i=100*Number.MIN_VALUE,j=-(h*c+g*f);
    if(j>i){
        var k=e.x-this.p1.x,l=e.y-this.p1.y,e=k*c+l*f;
        if(0<=e&&e<=d*j&&(d=-h*l+g*k,-i*j<=d&&d<=j*(1+i)))return e/=j,d=Math.sqrt(c*c+f*f),c/=d,f/=d,a[0]=e,b.Set(c,f),!0}return!1
    };
    b2.Segment.prototype.Extend=function(a){
    this.ExtendForward(a);
    this.ExtendBackward(a)
    };

    b2.Segment.prototype.ExtendForward=function(a){
    var b=this.p2.x-this.p1.x,c=this.p2.y-this.p1.y,a=Math.min(b>0?(a.upperBound.x-this.p1.x)/b:b<0?(a.lowerBound.x-this.p1.x)/b:Number.POSITIVE_INFINITY,c>0?(a.upperBound.y-this.p1.y)/c:c<0?(a.lowerBound.y-this.p1.y)/c:Number.POSITIVE_INFINITY);
    this.p2.x=this.p1.x+b*a;
    this.p2.y=this.p1.y+c*a
    };

    b2.Segment.prototype.ExtendBackward=function(a){
    var b=-this.p2.x+this.p1.x,c=-this.p2.y+this.p1.y,a=Math.min(b>0?(a.upperBound.x-this.p2.x)/b:b<0?(a.lowerBound.x-this.p2.x)/b:Number.POSITIVE_INFINITY,c>0?(a.upperBound.y-this.p2.y)/c:c<0?(a.lowerBound.y-this.p2.y)/c:Number.POSITIVE_INFINITY);
    this.p1.x=this.p2.x+b*a;
    this.p1.y=this.p2.y+c*a
    };
    b2.Segment.prototype.p1=new b2.Vec2;
    b2.Segment.prototype.p2=new b2.Vec2;
    b2.ContactRegister=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.ContactRegister.prototype.__constructor=function(){

    };
    b2.ContactRegister.prototype.__varz=function(){

    };
    b2.ContactRegister.prototype.createFcn=null;
    b2.ContactRegister.prototype.destroyFcn=null;
    b2.ContactRegister.prototype.primary=null;
    b2.ContactRegister.prototype.pool=null;
    b2.ContactRegister.prototype.poolCount=0;
    b2.DebugDraw=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DebugDraw.prototype.__constructor=function(){
    this.m_drawFlags=0
    };
    b2.DebugDraw.prototype.__varz=function(){

    };

    b2.DebugDraw.e_shapeBit=1;
    b2.DebugDraw.e_jointBit=2;
    b2.DebugDraw.e_aabbBit=4;
    b2.DebugDraw.e_pairBit=8;
    b2.DebugDraw.e_centerOfMassBit=16;
    b2.DebugDraw.e_controllerBit=32;
    b2.DebugDraw.prototype.SetFlags=function(a){
    this.m_drawFlags=a
    };
    b2.DebugDraw.prototype.GetFlags=function(){
    return this.m_drawFlags
    };
    b2.DebugDraw.prototype.AppendFlags=function(a){
    this.m_drawFlags|=a
    };
    b2.DebugDraw.prototype.ClearFlags=function(a){
    this.m_drawFlags&=~a
    };
    b2.DebugDraw.prototype.SetSprite=function(a){
    this.m_sprite=a
    };

    b2.DebugDraw.prototype.GetSprite=function(){
    return this.m_sprite
    };
    b2.DebugDraw.prototype.SetDrawScale=function(a){
    this.m_drawScale=a
    };
    b2.DebugDraw.prototype.GetDrawScale=function(){
    return this.m_drawScale
    };
    b2.DebugDraw.prototype.SetLineThickness=function(a){
    this.m_lineThickness=a
    };
    b2.DebugDraw.prototype.GetLineThickness=function(){
    return this.m_lineThickness
    };
    b2.DebugDraw.prototype.SetAlpha=function(a){
    this.m_alpha=a
    };
    b2.DebugDraw.prototype.GetAlpha=function(){
    return this.m_alpha
    };

    b2.DebugDraw.prototype.SetFillAlpha=function(a){
    this.m_fillAlpha=a
    };
    b2.DebugDraw.prototype.GetFillAlpha=function(){
    return this.m_fillAlpha
    };
    b2.DebugDraw.prototype.SetXFormScale=function(a){
    this.m_xformScale=a
    };
    b2.DebugDraw.prototype.GetXFormScale=function(){
    return this.m_xformScale
    };
    b2.DebugDraw.prototype.Clear=function(){
    this.m_sprite.clearRect(0,0,this.m_sprite.canvas.width,this.m_sprite.canvas.height)
    };
    b2.DebugDraw.prototype.Y=function(a){
    return this.m_sprite.canvas.height-a
    };

    b2.DebugDraw.prototype.ToWorldPoint=function(a){
    return new b2.Vec2(a.x/this.m_drawScale,this.Y(a.y)/this.m_drawScale)
    };
    b2.DebugDraw.prototype.ColorStyle=function(a,b){
    return"rgba("+a.r+", "+a.g+", "+a.b+", "+b+")"
    };

    b2.DebugDraw.prototype.DrawPolygon=function(a,b,c){
    this.m_sprite.graphics.lineStyle(this.m_lineThickness,c.color,this.m_alpha);
    this.m_sprite.graphics.moveTo(a[0].x*this.m_drawScale,a[0].y*this.m_drawScale);
    for(c=1;
        c<b;
        c++)this.m_sprite.graphics.lineTo(a[c].x*this.m_drawScale,a[c].y*this.m_drawScale);
    this.m_sprite.graphics.lineTo(a[0].x*this.m_drawScale,a[0].y*this.m_drawScale)
    };

    b2.DebugDraw.prototype.DrawSolidPolygon=function(a,b,c){
    this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.fillStyle=this.ColorStyle(c,this.m_fillAlpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a[0].x*this.m_drawScale,this.Y(a[0].y*this.m_drawScale));
    for(c=1;
        c<b;
        c++)this.m_sprite.lineTo(a[c].x*this.m_drawScale,this.Y(a[c].y*this.m_drawScale));
    this.m_sprite.lineTo(a[0].x*this.m_drawScale,this.Y(a[0].y*this.m_drawScale));
    this.m_sprite.fill();

    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };
    b2.DebugDraw.prototype.DrawCircle=function(a,b,c){
    this.m_sprite.graphics.lineStyle(this.m_lineThickness,c.color,this.m_alpha);
    this.m_sprite.graphics.drawCircle(a.x*this.m_drawScale,a.y*this.m_drawScale,b*this.m_drawScale)
    };

    b2.DebugDraw.prototype.DrawSolidCircle=function(a,b,c,d){
    this.m_sprite.strokeSyle=this.ColorStyle(d,this.m_alpha);
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.fillStyle=this.ColorStyle(d,this.m_fillAlpha);
    this.m_sprite.beginPath();
    this.m_sprite.arc(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale),b*this.m_drawScale,0,Math.PI*2,!0);
    this.m_sprite.fill();
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };

    b2.DebugDraw.prototype.DrawSegment=function(a,b,c){
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale));
    this.m_sprite.lineTo(b.x*this.m_drawScale,this.Y(b.y*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };

    b2.DebugDraw.prototype.DrawTransform=function(a){
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.strokeSyle=this.ColorStyle(new b2.Color(255,0,0),this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.position.x*this.m_drawScale,this.Y(a.position.y*this.m_drawScale));
    this.m_sprite.lineTo((a.position.x+this.m_xformScale*a.R.col1.x)*this.m_drawScale,this.Y((a.position.y+this.m_xformScale*a.R.col1.y)*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath();
    this.m_sprite.strokeSyle=
        this.ColorStyle(new b2.Color(0,255,0),this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.position.x*this.m_drawScale,this.Y(a.position.y*this.m_drawScale));
    this.m_sprite.lineTo((a.position.x+this.m_xformScale*a.R.col2.x)*this.m_drawScale,this.Y((a.position.y+this.m_xformScale*a.R.col2.y)*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };
    b2.DebugDraw.prototype.m_drawFlags=0;
    b2.DebugDraw.prototype.m_sprite=null;
    b2.DebugDraw.prototype.m_drawScale=1;

    b2.DebugDraw.prototype.m_lineThickness=1;
    b2.DebugDraw.prototype.m_alpha=1;
    b2.DebugDraw.prototype.m_fillAlpha=1;
    b2.DebugDraw.prototype.m_xformScale=1;
    b2.Sweep=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Sweep.prototype.__constructor=function(){

    };
    b2.Sweep.prototype.__varz=function(){
    this.localCenter=new b2.Vec2;
    this.c0=new b2.Vec2;
    this.c=new b2.Vec2
    };

    b2.Sweep.prototype.Set=function(a){
    this.localCenter.SetV(a.localCenter);
    this.c0.SetV(a.c0);
    this.c.SetV(a.c);
    this.a0=a.a0;
    this.a=a.a;
    this.t0=a.t0
    };
    b2.Sweep.prototype.Copy=function(){
    var a=new b2.Sweep;
    a.localCenter.SetV(this.localCenter);
    a.c0.SetV(this.c0);
    a.c.SetV(this.c);
    a.a0=this.a0;
    a.a=this.a;
    a.t0=this.t0;
    return a
    };

    b2.Sweep.prototype.GetTransform=function(a,b){
    a.position.x=(1-b)*this.c0.x+b*this.c.x;
    a.position.y=(1-b)*this.c0.y+b*this.c.y;
    a.R.Set((1-b)*this.a0+b*this.a);
    var c=a.R;
    a.position.x-=c.col1.x*this.localCenter.x+c.col2.x*this.localCenter.y;
    a.position.y-=c.col1.y*this.localCenter.x+c.col2.y*this.localCenter.y
    };

    b2.Sweep.prototype.Advance=function(a){
    if(this.t0<a&&1-this.t0>Number.MIN_VALUE){
        var b=(a-this.t0)/(1-this.t0);
        this.c0.x=(1-b)*this.c0.x+b*this.c.x;
        this.c0.y=(1-b)*this.c0.y+b*this.c.y;
        this.a0=(1-b)*this.a0+b*this.a;
        this.t0=a}
    };
    b2.Sweep.prototype.localCenter=new b2.Vec2;
    b2.Sweep.prototype.c0=new b2.Vec2;
    b2.Sweep.prototype.c=new b2.Vec2;
    b2.Sweep.prototype.a0=null;
    b2.Sweep.prototype.a=null;
    b2.Sweep.prototype.t0=null;
    b2.DistanceOutput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.DistanceOutput.prototype.__constructor=function(){

    };
    b2.DistanceOutput.prototype.__varz=function(){
    this.pointA=new b2.Vec2;
    this.pointB=new b2.Vec2
    };
    b2.DistanceOutput.prototype.pointA=new b2.Vec2;
    b2.DistanceOutput.prototype.pointB=new b2.Vec2;
    b2.DistanceOutput.prototype.distance=null;
    b2.DistanceOutput.prototype.iterations=0;
    b2.Mat33=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Mat33.prototype.__constructor=function(a,b,c){
    !a&&!b&&!c?(this.col1.SetZero(),this.col2.SetZero(),this.col3.SetZero()):(this.col1.SetV(a),this.col2.SetV(b),this.col3.SetV(c))
    };
    b2.Mat33.prototype.__varz=function(){
    this.col1=new b2.Vec3;
    this.col2=new b2.Vec3;
    this.col3=new b2.Vec3
    };
    b2.Mat33.prototype.SetVVV=function(a,b,c){
    this.col1.SetV(a);
    this.col2.SetV(b);
    this.col3.SetV(c)
    };
    b2.Mat33.prototype.Copy=function(){
    return new b2.Mat33(this.col1,this.col2,this.col3)
    };

    b2.Mat33.prototype.SetM=function(a){
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2);
    this.col3.SetV(a.col3)
    };
    b2.Mat33.prototype.AddM=function(a){
    this.col1.x+=a.col1.x;
    this.col1.y+=a.col1.y;
    this.col1.z+=a.col1.z;
    this.col2.x+=a.col2.x;
    this.col2.y+=a.col2.y;
    this.col2.z+=a.col2.z;
    this.col3.x+=a.col3.x;
    this.col3.y+=a.col3.y;
    this.col3.z+=a.col3.z
    };

    b2.Mat33.prototype.SetIdentity=function(){
    this.col1.x=1;
    this.col2.x=0;
    this.col3.x=0;
    this.col1.y=0;
    this.col2.y=1;
    this.col3.y=0;
    this.col1.z=0;
    this.col2.z=0;
    this.col3.z=1
    };
    b2.Mat33.prototype.SetZero=function(){
    this.col1.x=0;
    this.col2.x=0;
    this.col3.x=0;
    this.col1.y=0;
    this.col2.y=0;
    this.col3.y=0;
    this.col1.z=0;
    this.col2.z=0;
    this.col3.z=0
    };
    b2.Mat33.prototype.Solve22=function(a,b,c){
    var d=this.col1.x,e=this.col2.x,h=this.col1.y,g=this.col2.y,f=d*g-e*h;
    f!=0&&(f=1/f);
    a.x=f*(g*b-e*c);
    a.y=f*(d*c-h*b);
    return a
    };

    b2.Mat33.prototype.Solve33=function(a,b,c,d){
    var e=this.col1.x,h=this.col1.y,g=this.col1.z,f=this.col2.x,i=this.col2.y,j=this.col2.z,k=this.col3.x,l=this.col3.y,n=this.col3.z,m=e*(i*n-j*l)+h*(j*k-f*n)+g*(f*l-i*k);
    m!=0&&(m=1/m);
    a.x=m*(b*(i*n-j*l)+c*(j*k-f*n)+d*(f*l-i*k));
    a.y=m*(e*(c*n-d*l)+h*(d*k-b*n)+g*(b*l-c*k));
    a.z=m*(e*(i*d-j*c)+h*(j*b-f*d)+g*(f*c-i*b));
    return a
    };
    b2.Mat33.prototype.col1=new b2.Vec3;
    b2.Mat33.prototype.col2=new b2.Vec3;
    b2.Mat33.prototype.col3=new b2.Vec3;

    b2.PositionSolverManifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.PositionSolverManifold.prototype.__constructor=function(){
    this.m_normal=new b2.Vec2;
    this.m_separations=Array(b2.Settings.b2_maxManifoldPoints);
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.Vec2
    };
    b2.PositionSolverManifold.prototype.__varz=function(){

    };
    b2.PositionSolverManifold.circlePointA=new b2.Vec2;

    b2.PositionSolverManifold.circlePointB=new b2.Vec2;

    b2.PositionSolverManifold.prototype.Initialize=function(a){
    b2.Settings.b2Assert(a.pointCount>0);
    var b=0,c,d,e,h,g;
    switch(a.type){
    case b2.Manifold.e_circles:e=a.bodyA.m_xf.R;
        d=a.localPoint;
        b=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        c=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        e=a.bodyB.m_xf.R;
        d=a.points[0].localPoint;
        h=a.bodyB.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        e=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        d=h-b;
        g=e-c;
        var f=d*d+g*g;
        f>Number.MIN_VALUE*Number.MIN_VALUE?
        (f=Math.sqrt(f),this.m_normal.x=d/f,this.m_normal.y=g/f):(this.m_normal.x=1,this.m_normal.y=0);
        this.m_points[0].x=0.5*(b+h);
        this.m_points[0].y=0.5*(c+e);
        this.m_separations[0]=d*this.m_normal.x+g*this.m_normal.y-a.radius;
        break;
    case b2.Manifold.e_faceA:e=a.bodyA.m_xf.R;
        d=a.localPlaneNormal;
        this.m_normal.x=e.col1.x*d.x+e.col2.x*d.y;
        this.m_normal.y=e.col1.y*d.x+e.col2.y*d.y;
        e=a.bodyA.m_xf.R;
        d=a.localPoint;
        h=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        g=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*
                       d.y);
        e=a.bodyB.m_xf.R;
        for(b=0;
        b<a.pointCount;
        ++b)d=a.points[b].localPoint,c=a.bodyB.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y),d=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y),this.m_separations[b]=(c-h)*this.m_normal.x+(d-g)*this.m_normal.y-a.radius,this.m_points[b].x=c,this.m_points[b].y=d;
        break;
    case b2.Manifold.e_faceB:e=a.bodyB.m_xf.R;
        d=a.localPlaneNormal;
        this.m_normal.x=e.col1.x*d.x+e.col2.x*d.y;
        this.m_normal.y=e.col1.y*d.x+e.col2.y*d.y;
        e=a.bodyB.m_xf.R;
        d=a.localPoint;
        h=a.bodyB.m_xf.position.x+
        (e.col1.x*d.x+e.col2.x*d.y);
        g=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        e=a.bodyA.m_xf.R;
        for(b=0;
        b<a.pointCount;
        ++b)d=a.points[b].localPoint,c=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y),d=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y),this.m_separations[b]=(c-h)*this.m_normal.x+(d-g)*this.m_normal.y-a.radius,this.m_points[b].Set(c,d);
        this.m_normal.x*=-1;
        this.m_normal.y*=-1}
    };
    b2.PositionSolverManifold.prototype.m_normal=null;
    b2.PositionSolverManifold.prototype.m_points=null;

    b2.PositionSolverManifold.prototype.m_separations=null;
    b2.OBB=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.OBB.prototype.__constructor=function(){

    };
    b2.OBB.prototype.__varz=function(){
    this.R=new b2.Mat22;
    this.center=new b2.Vec2;
    this.extents=new b2.Vec2
    };
    b2.OBB.prototype.R=new b2.Mat22;
    b2.OBB.prototype.center=new b2.Vec2;
    b2.OBB.prototype.extents=new b2.Vec2;
    b2.Pair=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Pair.prototype.__constructor=function(){

    };

    b2.Pair.prototype.__varz=function(){

    };
    b2.Pair.b2_nullProxy=b2.Settings.USHRT_MAX;
    b2.Pair.e_pairBuffered=1;
    b2.Pair.e_pairRemoved=2;
    b2.Pair.e_pairFinal=4;
    b2.Pair.prototype.SetBuffered=function(){
    this.status|=b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.ClearBuffered=function(){
    this.status&=~b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.IsBuffered=function(){
    return(this.status&b2.Pair.e_pairBuffered)==b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.SetRemoved=function(){
    this.status|=b2.Pair.e_pairRemoved
    };

    b2.Pair.prototype.ClearRemoved=function(){
    this.status&=~b2.Pair.e_pairRemoved
    };
    b2.Pair.prototype.IsRemoved=function(){
    return(this.status&b2.Pair.e_pairRemoved)==b2.Pair.e_pairRemoved
    };
    b2.Pair.prototype.SetFinal=function(){
    this.status|=b2.Pair.e_pairFinal
    };
    b2.Pair.prototype.IsFinal=function(){
    return(this.status&b2.Pair.e_pairFinal)==b2.Pair.e_pairFinal
    };
    b2.Pair.prototype.userData=null;
    b2.Pair.prototype.proxy1=null;
    b2.Pair.prototype.proxy2=null;
    b2.Pair.prototype.next=null;
    b2.Pair.prototype.status=0;

    b2.FixtureDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.FixtureDef.prototype.__constructor=function(){
    this.userData=this.shape=null;
    this.friction=0.2;
    this.density=this.restitution=0;
    this.filter.categoryBits=1;
    this.filter.maskBits=65535;
    this.filter.groupIndex=0;
    this.isSensor=!1
    };
    b2.FixtureDef.prototype.__varz=function(){
    this.filter=new b2.FilterData
    };
    b2.FixtureDef.prototype.shape=null;
    b2.FixtureDef.prototype.userData=null;
    b2.FixtureDef.prototype.friction=null;

    b2.FixtureDef.prototype.restitution=null;
    b2.FixtureDef.prototype.density=null;
    b2.FixtureDef.prototype.isSensor=null;
    b2.FixtureDef.prototype.filter=new b2.FilterData;
    b2.ContactID=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactID.prototype.__constructor=function(){
    this.features._m_id=this
    };
    b2.ContactID.prototype.__varz=function(){
    this.features=new Features
    };
    b2.ContactID.prototype.Set=function(a){
    key=a._key
    };

    b2.ContactID.prototype.Copy=function(){
    var a=new b2.ContactID;
    a.key=key;
    return a
    };
    b2.ContactID.prototype.__defineSetter__("key",function(){
    return this._key});
    b2.ContactID.prototype.__defineSetter__("key",function(a){
    this._key=a;
    this.features._referenceEdge=this._key&255;
    this.features._incidentEdge=(this._key&65280)>>8&255;
    this.features._incidentVertex=(this._key&16711680)>>16&255;
    this.features._flip=(this._key&4278190080)>>24&255});
    b2.ContactID.prototype._key=0;
    b2.ContactID.prototype.features=new Features;

    b2.Transform=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Transform.prototype.__constructor=function(a,b){
    a&&(this.position.SetV(a),this.R.SetM(b))
    };
    b2.Transform.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.R=new b2.Mat22
    };
    b2.Transform.prototype.Initialize=function(a,b){
    this.position.SetV(a);
    this.R.SetM(b)
    };
    b2.Transform.prototype.SetIdentity=function(){
    this.position.SetZero();
    this.R.SetIdentity()
    };

    b2.Transform.prototype.Set=function(a){
    this.position.SetV(a.position);
    this.R.SetM(a.R)
    };
    b2.Transform.prototype.GetAngle=function(){
    return Math.atan2(this.R.col1.y,this.R.col1.x)
    };
    b2.Transform.prototype.position=new b2.Vec2;
    b2.Transform.prototype.R=new b2.Mat22;
    b2.EdgeShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.EdgeShape.prototype,b2.Shape.prototype);
    b2.EdgeShape.prototype._super=b2.Shape.prototype;

    b2.EdgeShape.prototype.__constructor=function(a,b){
    this._super.__constructor.apply(this,[]);
    this.m_type=b2.Shape.e_edgeShape;
    this.m_nextEdge=this.m_prevEdge=null;
    this.m_v1=a;
    this.m_v2=b;
    this.m_direction.Set(this.m_v2.x-this.m_v1.x,this.m_v2.y-this.m_v1.y);
    this.m_length=this.m_direction.Normalize();
    this.m_normal.Set(this.m_direction.y,-this.m_direction.x);
    this.m_coreV1.Set(-b2.Settings.b2_toiSlop*(this.m_normal.x-this.m_direction.x)+this.m_v1.x,-b2.Settings.b2_toiSlop*(this.m_normal.y-this.m_direction.y)+
              this.m_v1.y);
    this.m_coreV2.Set(-b2.Settings.b2_toiSlop*(this.m_normal.x+this.m_direction.x)+this.m_v2.x,-b2.Settings.b2_toiSlop*(this.m_normal.y+this.m_direction.y)+this.m_v2.y);
    this.m_cornerDir1=this.m_normal;
    this.m_cornerDir2.Set(-this.m_normal.x,-this.m_normal.y)
    };

    b2.EdgeShape.prototype.__varz=function(){
    this.s_supportVec=new b2.Vec2;
    this.m_v1=new b2.Vec2;
    this.m_v2=new b2.Vec2;
    this.m_coreV1=new b2.Vec2;
    this.m_coreV2=new b2.Vec2;
    this.m_normal=new b2.Vec2;
    this.m_direction=new b2.Vec2;
    this.m_cornerDir1=new b2.Vec2;
    this.m_cornerDir2=new b2.Vec2
    };
    b2.EdgeShape.prototype.SetPrevEdge=function(a,b,c,d){
    this.m_prevEdge=a;
    this.m_coreV1=b;
    this.m_cornerDir1=c;
    this.m_cornerConvex1=d
    };

    b2.EdgeShape.prototype.SetNextEdge=function(a,b,c,d){
    this.m_nextEdge=a;
    this.m_coreV2=b;
    this.m_cornerDir2=c;
    this.m_cornerConvex2=d
    };
    b2.EdgeShape.prototype.TestPoint=function(){
    return!1
    };

    b2.EdgeShape.prototype.RayCast=function(a,b,c){
    var d,e=b.p2.x-b.p1.x,h=b.p2.y-b.p1.y;
    d=c.R;
    var g=c.position.x+(d.col1.x*this.m_v1.x+d.col2.x*this.m_v1.y),f=c.position.y+(d.col1.y*this.m_v1.x+d.col2.y*this.m_v1.y),i=c.position.y+(d.col1.y*this.m_v2.x+d.col2.y*this.m_v2.y)-f,c=-(c.position.x+(d.col1.x*this.m_v2.x+d.col2.x*this.m_v2.y)-g);
    d=100*Number.MIN_VALUE;
    var j=-(e*i+h*c);
    if(j>d){
        var g=b.p1.x-g,k=b.p1.y-f,f=g*i+k*c;
        if(0<=f&&f<=b.maxFraction*j&&(b=-e*k+h*g,-d*j<=b&&b<=j*(1+d)))return f/=j,a.fraction=
        f,b=Math.sqrt(i*i+c*c),a.normal.x=i/b,a.normal.y=c/b,!0}return!1
    };

    b2.EdgeShape.prototype.ComputeAABB=function(a,b){
    var c=b.R,d=b.position.x+(c.col1.x*this.m_v1.x+c.col2.x*this.m_v1.y),e=b.position.y+(c.col1.y*this.m_v1.x+c.col2.y*this.m_v1.y),h=b.position.x+(c.col1.x*this.m_v2.x+c.col2.x*this.m_v2.y),c=b.position.y+(c.col1.y*this.m_v2.x+c.col2.y*this.m_v2.y);
    d<h?(a.lowerBound.x=d,a.upperBound.x=h):(a.lowerBound.x=h,a.upperBound.x=d);
    e<c?(a.lowerBound.y=e,a.upperBound.y=c):(a.lowerBound.y=c,a.upperBound.y=e)
    };

    b2.EdgeShape.prototype.ComputeMass=function(a){
    a.mass=0;
    a.center.SetV(this.m_v1);
    a.I=0
    };

    b2.EdgeShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    var e=new b2.Vec2(a.x*b,a.y*b),h=b2.Math.MulX(c,this.m_v1),c=b2.Math.MulX(c,this.m_v2),g=b2.Math.Dot(a,h)-b,a=b2.Math.Dot(a,c)-b;
    if(g>0)if(a>0)return 0;
    else h.x=-a/(g-a)*h.x+g/(g-a)*c.x,h.y=-a/(g-a)*h.y+g/(g-a)*c.y;
    else if(a>0)c.x=-a/(g-a)*h.x+g/(g-a)*c.x,c.y=-a/(g-a)*h.y+g/(g-a)*c.y;
    d.x=(e.x+h.x+c.x)/3;
    d.y=(e.y+h.y+c.y)/3;
    return 0.5*((h.x-e.x)*(c.y-e.y)-(h.y-e.y)*(c.x-e.x))
    };
    b2.EdgeShape.prototype.GetLength=function(){
    return this.m_length
    };

    b2.EdgeShape.prototype.GetVertex1=function(){
    return this.m_v1
    };
    b2.EdgeShape.prototype.GetVertex2=function(){
    return this.m_v2
    };
    b2.EdgeShape.prototype.GetCoreVertex1=function(){
    return this.m_coreV1
    };
    b2.EdgeShape.prototype.GetCoreVertex2=function(){
    return this.m_coreV2
    };
    b2.EdgeShape.prototype.GetNormalVector=function(){
    return this.m_normal
    };
    b2.EdgeShape.prototype.GetDirectionVector=function(){
    return this.m_direction
    };
    b2.EdgeShape.prototype.GetCorner1Vector=function(){
    return this.m_cornerDir1
    };

    b2.EdgeShape.prototype.GetCorner2Vector=function(){
    return this.m_cornerDir2
    };
    b2.EdgeShape.prototype.Corner1IsConvex=function(){
    return this.m_cornerConvex1
    };
    b2.EdgeShape.prototype.Corner2IsConvex=function(){
    return this.m_cornerConvex2
    };
    b2.EdgeShape.prototype.GetFirstVertex=function(a){
    var b=a.R;
    return new b2.Vec2(a.position.x+(b.col1.x*this.m_coreV1.x+b.col2.x*this.m_coreV1.y),a.position.y+(b.col1.y*this.m_coreV1.x+b.col2.y*this.m_coreV1.y))
    };
    b2.EdgeShape.prototype.GetNextEdge=function(){
    return this.m_nextEdge
    };

    b2.EdgeShape.prototype.GetPrevEdge=function(){
    return this.m_prevEdge
    };

    b2.EdgeShape.prototype.Support=function(a,b,c){
    var d=a.R,e=a.position.x+(d.col1.x*this.m_coreV1.x+d.col2.x*this.m_coreV1.y),h=a.position.y+(d.col1.y*this.m_coreV1.x+d.col2.y*this.m_coreV1.y),g=a.position.x+(d.col1.x*this.m_coreV2.x+d.col2.x*this.m_coreV2.y),a=a.position.y+(d.col1.y*this.m_coreV2.x+d.col2.y*this.m_coreV2.y);
    e*b+h*c>g*b+a*c?(this.s_supportVec.x=e,this.s_supportVec.y=h):(this.s_supportVec.x=g,this.s_supportVec.y=a);
    return this.s_supportVec
    };
    b2.EdgeShape.prototype.s_supportVec=new b2.Vec2;

    b2.EdgeShape.prototype.m_v1=new b2.Vec2;
    b2.EdgeShape.prototype.m_v2=new b2.Vec2;
    b2.EdgeShape.prototype.m_coreV1=new b2.Vec2;
    b2.EdgeShape.prototype.m_coreV2=new b2.Vec2;
    b2.EdgeShape.prototype.m_length=null;
    b2.EdgeShape.prototype.m_normal=new b2.Vec2;
    b2.EdgeShape.prototype.m_direction=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerDir1=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerDir2=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerConvex1=null;
    b2.EdgeShape.prototype.m_cornerConvex2=null;

    b2.EdgeShape.prototype.m_nextEdge=null;
    b2.EdgeShape.prototype.m_prevEdge=null;
    b2.BuoyancyController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.BuoyancyController.prototype,b2.Controller.prototype);
    b2.BuoyancyController.prototype._super=b2.Controller.prototype;
    b2.BuoyancyController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.BuoyancyController.prototype.__varz=function(){
    this.normal=new b2.Vec2(0,-1);
    this.velocity=new b2.Vec2(0,0)
    };

    b2.BuoyancyController.prototype.Step=function(){
    if(m_bodyList){
        if(this.useWorldGravity)this.gravity=this.GetWorld().GetGravity().Copy();
        for(var a=m_bodyList;
        a;
        a=a.nextBody){
        var b=a.body;
        if(b.IsAwake()!=!1){
            for(var c=new b2.Vec2,d=new b2.Vec2,e=0,h=0,g=b.GetFixtureList();
            g;
            g=g.GetNext()){
            var f=new b2.Vec2,i=g.GetShape().ComputeSubmergedArea(this.normal,this.offset,b.GetTransform(),f);
            e+=i;
            c.x+=i*f.x;
            c.y+=i*f.y;
            h+=i*1;
            d.x+=i*f.x*1;
            d.y+=i*f.y*1}c.x/=e;
            c.y/=e;
            d.x/=h;
            d.y/=h;
            e<Number.MIN_VALUE||(h=this.gravity.GetNegative(),
                     h.Multiply(this.density*e),b.ApplyForce(h,d),d=b.GetLinearVelocityFromWorldPoint(c),d.Subtract(this.velocity),d.Multiply(-this.linearDrag*e),b.ApplyForce(d,c),b.ApplyTorque(-b.GetInertia()/b.GetMass()*e*b.GetAngularVelocity()*this.angularDrag))}}}
    };

    b2.BuoyancyController.prototype.Draw=function(a){
    var b=new b2.Vec2,c=new b2.Vec2;
    b.x=this.normal.x*this.offset+this.normal.y*1E3;
    b.y=this.normal.y*this.offset-this.normal.x*1E3;
    c.x=this.normal.x*this.offset-this.normal.y*1E3;
    c.y=this.normal.y*this.offset+this.normal.x*1E3;
    var d=new b2.Color(0,0,1);
    a.DrawSegment(b,c,d)
    };
    b2.BuoyancyController.prototype.normal=new b2.Vec2(0,-1);
    b2.BuoyancyController.prototype.offset=0;
    b2.BuoyancyController.prototype.density=0;

    b2.BuoyancyController.prototype.velocity=new b2.Vec2(0,0);
    b2.BuoyancyController.prototype.linearDrag=2;
    b2.BuoyancyController.prototype.angularDrag=1;
    b2.BuoyancyController.prototype.useDensity=!1;
    b2.BuoyancyController.prototype.useWorldGravity=!0;
    b2.BuoyancyController.prototype.gravity=null;
    b2.Body=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Body.prototype.__constructor=function(a,b){
    this.m_flags=0;
    a.bullet&&(this.m_flags|=b2.Body.e_bulletFlag);
    a.fixedRotation&&(this.m_flags|=b2.Body.e_fixedRotationFlag);
    a.allowSleep&&(this.m_flags|=b2.Body.e_allowSleepFlag);
    a.awake&&(this.m_flags|=b2.Body.e_awakeFlag);
    a.active&&(this.m_flags|=b2.Body.e_activeFlag);
    this.m_world=b;
    this.m_xf.position.SetV(a.position);
    this.m_xf.R.Set(a.angle);
    this.m_sweep.localCenter.SetZero();
    this.m_sweep.t0=1;
    this.m_sweep.a0=this.m_sweep.a=a.angle;
    var c=this.m_xf.R,
    d=this.m_sweep.localCenter;
    this.m_sweep.c.x=c.col1.x*d.x+c.col2.x*d.y;
    this.m_sweep.c.y=c.col1.y*d.x+c.col2.y*d.y;
    this.m_sweep.c.x+=this.m_xf.position.x;
    this.m_sweep.c.y+=this.m_xf.position.y;
    this.m_sweep.c0.SetV(this.m_sweep.c);
    this.m_contactList=this.m_controllerList=this.m_jointList=null;
    this.m_controllerCount=0;
    this.m_next=this.m_prev=null;
    this.m_linearVelocity.SetV(a.linearVelocity);
    this.m_angularVelocity=a.angularVelocity;
    this.m_linearDamping=a.linearDamping;
    this.m_angularDamping=a.angularDamping;

    this.m_force.Set(0,0);
    this.m_sleepTime=this.m_torque=0;
    this.m_type=a.type;
    this.m_invMass=this.m_type==b2.Body.b2_dynamicBody?this.m_mass=1:this.m_mass=0;
    this.m_invI=this.m_I=0;
    this.m_inertiaScale=a.inertiaScale;
    this.m_userData=a.userData;
    this.m_fixtureList=null;
    this.m_fixtureCount=0
    };
    b2.Body.prototype.__varz=function(){
    this.m_xf=new b2.Transform;
    this.m_sweep=new b2.Sweep;
    this.m_linearVelocity=new b2.Vec2;
    this.m_force=new b2.Vec2
    };
    b2.Body.b2_staticBody=0;
    b2.Body.b2_kinematicBody=1;

    b2.Body.b2_dynamicBody=2;
    b2.Body.s_xf1=new b2.Transform;
    b2.Body.e_islandFlag=1;
    b2.Body.e_awakeFlag=2;
    b2.Body.e_allowSleepFlag=4;
    b2.Body.e_bulletFlag=8;
    b2.Body.e_fixedRotationFlag=16;
    b2.Body.e_activeFlag=32;

    b2.Body.prototype.connectEdges=function(a,b,c){
    var d=Math.atan2(b.GetDirectionVector().y,b.GetDirectionVector().x),c=b2.Math.MulFV(Math.tan((d-c)*0.5),b.GetDirectionVector()),c=b2.Math.SubtractVV(c,b.GetNormalVector()),c=b2.Math.MulFV(b2.Settings.b2_toiSlop,c),c=b2.Math.AddVV(c,b.GetVertex1()),e=b2.Math.AddVV(a.GetDirectionVector(),b.GetDirectionVector());
    e.Normalize();
    var h=b2.Math.Dot(a.GetDirectionVector(),b.GetNormalVector())>0;
    a.SetNextEdge(b,c,e,h);
    b.SetPrevEdge(a,c,e,h);
    return d
    };

    b2.Body.prototype.SynchronizeFixtures=function(){
    var a=b2.Body.s_xf1;
    a.R.Set(this.m_sweep.a0);
    var b=a.R,c=this.m_sweep.localCenter;
    a.position.x=this.m_sweep.c0.x-(b.col1.x*c.x+b.col2.x*c.y);
    a.position.y=this.m_sweep.c0.y-(b.col1.y*c.x+b.col2.y*c.y);
    c=this.m_world.m_contactManager.m_broadPhase;
    for(b=this.m_fixtureList;
        b;
        b=b.m_next)b.Synchronize(c,a,this.m_xf)
    };

    b2.Body.prototype.SynchronizeTransform=function(){
    this.m_xf.R.Set(this.m_sweep.a);
    var a=this.m_xf.R,b=this.m_sweep.localCenter;
    this.m_xf.position.x=this.m_sweep.c.x-(a.col1.x*b.x+a.col2.x*b.y);
    this.m_xf.position.y=this.m_sweep.c.y-(a.col1.y*b.x+a.col2.y*b.y)
    };
    b2.Body.prototype.ShouldCollide=function(a){
    if(this.m_type!=b2.Body.b2_dynamicBody&&a.m_type!=b2.Body.b2_dynamicBody)return!1;
    for(var b=this.m_jointList;
        b;
        b=b.next)if(b.other==a&&b.joint.m_collideConnected==!1)return!1;
    return!0
    };

    b2.Body.prototype.Advance=function(a){
    this.m_sweep.Advance(a);
    this.m_sweep.c.SetV(this.m_sweep.c0);
    this.m_sweep.a=this.m_sweep.a0;
    this.SynchronizeTransform()
    };

    b2.Body.prototype.CreateFixture=function(a){
    if(this.m_world.IsLocked()==!0)return null;
    var b=new b2.Fixture;
    b.Create(this,this.m_xf,a);
    this.m_flags&b2.Body.e_activeFlag&&b.CreateProxy(this.m_world.m_contactManager.m_broadPhase,this.m_xf);
    b.m_next=this.m_fixtureList;
    this.m_fixtureList=b;
    ++this.m_fixtureCount;
    b.m_body=this;
    b.m_density>0&&this.ResetMassData();
    this.m_world.m_flags|=b2.World.e_newFixture;
    return b
    };

    b2.Body.prototype.CreateFixture2=function(a,b){
    var c=new b2.FixtureDef;
    c.shape=a;
    c.density=b;
    return this.CreateFixture(c)
    };

    b2.Body.prototype.DestroyFixture=function(a){
    if(this.m_world.IsLocked()!=!0){
        for(var b=this.m_fixtureList,c=null;
        b!=null;
           ){
        if(b==a){
            c?c.m_next=a.m_next:this.m_fixtureList=a.m_next;
            break}c=b;
        b=b.m_next}for(b=this.m_contactList;
                   b;
                  ){
            var c=b.contact,b=b.next,d=c.GetFixtureA(),e=c.GetFixtureB();
            (a==d||a==e)&&this.m_world.m_contactManager.Destroy(c)}this.m_flags&b2.Body.e_activeFlag&&a.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
        a.Destroy();
        a.m_body=null;
        a.m_next=null;
        --this.m_fixtureCount;

        this.ResetMassData()}
    };

    b2.Body.prototype.SetPositionAndAngle=function(a,b){
    var c;
    if(this.m_world.IsLocked()!=!0){
        this.m_xf.R.Set(b);
        this.m_xf.position.SetV(a);
        c=this.m_xf.R;
        var d=this.m_sweep.localCenter;
        this.m_sweep.c.x=c.col1.x*d.x+c.col2.x*d.y;
        this.m_sweep.c.y=c.col1.y*d.x+c.col2.y*d.y;
        this.m_sweep.c.x+=this.m_xf.position.x;
        this.m_sweep.c.y+=this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_sweep.a0=this.m_sweep.a=b;
        d=this.m_world.m_contactManager.m_broadPhase;
        for(c=this.m_fixtureList;
        c;
        c=c.m_next)c.Synchronize(d,
                     this.m_xf,this.m_xf);
        this.m_world.m_contactManager.FindNewContacts()}
    };
    b2.Body.prototype.SetTransform=function(a){
    this.SetPositionAndAngle(a.position,a.GetAngle())
    };
    b2.Body.prototype.GetTransform=function(){
    return this.m_xf
    };
    b2.Body.prototype.GetPosition=function(){
    return this.m_xf.position
    };
    b2.Body.prototype.SetPosition=function(a){
    this.SetPositionAndAngle(a,this.GetAngle())
    };
    b2.Body.prototype.GetAngle=function(){
    return this.m_sweep.a
    };

    b2.Body.prototype.SetAngle=function(a){
    this.SetPositionAndAngle(this.GetPosition(),a)
    };
    b2.Body.prototype.GetWorldCenter=function(){
    return this.m_sweep.c
    };
    b2.Body.prototype.GetLocalCenter=function(){
    return this.m_sweep.localCenter
    };
    b2.Body.prototype.SetLinearVelocity=function(a){
    this.m_type!=b2.Body.b2_staticBody&&this.m_linearVelocity.SetV(a)
    };
    b2.Body.prototype.GetLinearVelocity=function(){
    return this.m_linearVelocity
    };

    b2.Body.prototype.SetAngularVelocity=function(a){
    if(this.m_type!=b2.Body.b2_staticBody)this.m_angularVelocity=a
    };
    b2.Body.prototype.GetAngularVelocity=function(){
    return this.m_angularVelocity
    };

    b2.Body.prototype.GetDefinition=function(){
    var a=new b2.BodyDef;
    a.type=this.GetType();
    a.allowSleep=(this.m_flags&b2.Body.e_allowSleepFlag)==b2.Body.e_allowSleepFlag;
    a.angle=this.GetAngle();
    a.angularDamping=this.m_angularDamping;
    a.angularVelocity=this.m_angularVelocity;
    a.fixedRotation=(this.m_flags&b2.Body.e_fixedRotationFlag)==b2.Body.e_fixedRotationFlag;
    a.bullet=(this.m_flags&b2.Body.e_bulletFlag)==b2.Body.e_bulletFlag;
    a.awake=(this.m_flags&b2.Body.e_awakeFlag)==b2.Body.e_awakeFlag;
    a.linearDamping=
        this.m_linearDamping;
    a.linearVelocity.SetV(this.GetLinearVelocity());
    a.position=this.GetPosition();
    a.userData=this.GetUserData();
    return a
    };
    b2.Body.prototype.ApplyForce=function(a,b){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_force.x+=a.x,this.m_force.y+=a.y,this.m_torque+=(b.x-this.m_sweep.c.x)*a.y-(b.y-this.m_sweep.c.y)*a.x)
    };

    b2.Body.prototype.ApplyTorque=function(a){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_torque+=a)
    };
    b2.Body.prototype.ApplyImpulse=function(a,b){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_linearVelocity.x+=this.m_invMass*a.x,this.m_linearVelocity.y+=this.m_invMass*a.y,this.m_angularVelocity+=this.m_invI*((b.x-this.m_sweep.c.x)*a.y-(b.y-this.m_sweep.c.y)*a.x))
    };

    b2.Body.prototype.Split=function(a){
    for(var b=this.GetLinearVelocity().Copy(),c=this.GetAngularVelocity(),d=this.GetWorldCenter(),e=this.m_world.CreateBody(this.GetDefinition()),h,g=this.m_fixtureList;
        g;
       )if(a(g)){
           var f=g.m_next;
           h?h.m_next=f:this.m_fixtureList=f;
           this.m_fixtureCount--;
           g.m_next=e.m_fixtureList;
           e.m_fixtureList=g;
           e.m_fixtureCount++;
           g.m_body=e;
           g=f}else h=g,g=g.m_next;
    this.ResetMassData();
    e.ResetMassData();
    h=this.GetWorldCenter();
    a=e.GetWorldCenter();
    h=b2.Math.AddVV(b,b2.Math.CrossFV(c,
                      b2.Math.SubtractVV(h,d)));
    b=b2.Math.AddVV(b,b2.Math.CrossFV(c,b2.Math.SubtractVV(a,d)));
    this.SetLinearVelocity(h);
    e.SetLinearVelocity(b);
    this.SetAngularVelocity(c);
    e.SetAngularVelocity(c);
    this.SynchronizeFixtures();
    e.SynchronizeFixtures();
    return e
    };

    b2.Body.prototype.Merge=function(a){
    var b;
    for(b=a.m_fixtureList;
        b;
       ){
        var c=b.m_next;
        a.m_fixtureCount--;
        b.m_next=this.m_fixtureList;
        this.m_fixtureList=b;
        this.m_fixtureCount++;
        b.m_body=e;
        b=c}d.m_fixtureCount=0;
    var d=this,e=a;
    d.GetWorldCenter();
    e.GetWorldCenter();
    d.GetLinearVelocity().Copy();
    e.GetLinearVelocity().Copy();
    d.GetAngularVelocity();
    e.GetAngularVelocity();
    d.ResetMassData();
    this.SynchronizeFixtures()
    };
    b2.Body.prototype.GetMass=function(){
    return this.m_mass
    };
    b2.Body.prototype.GetInertia=function(){
    return this.m_I
    };

    b2.Body.prototype.GetMassData=function(a){
    a.mass=this.m_mass;
    a.I=this.m_I;
    a.center.SetV(this.m_sweep.localCenter)
    };

    b2.Body.prototype.SetMassData=function(a){
    b2.Settings.b2Assert(this.m_world.IsLocked()==!1);
    if(this.m_world.IsLocked()!=!0&&this.m_type==b2.Body.b2_dynamicBody){
        this.m_invI=this.m_I=this.m_invMass=0;
        this.m_mass=a.mass;
        if(this.m_mass<=0)this.m_mass=1;
        this.m_invMass=1/this.m_mass;
        if(a.I>0&&(this.m_flags&b2.Body.e_fixedRotationFlag)==0)this.m_I=a.I-this.m_mass*(a.center.x*a.center.x+a.center.y*a.center.y),this.m_invI=1/this.m_I;
        var b=this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(a.center);
        this.m_sweep.c0.SetV(b2.Math.MulX(this.m_xf,
                          this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x+=this.m_angularVelocity*-(this.m_sweep.c.y-b.y);
        this.m_linearVelocity.y+=this.m_angularVelocity*+(this.m_sweep.c.x-b.x)}
    };

    b2.Body.prototype.ResetMassData=function(){
    this.m_invI=this.m_I=this.m_invMass=this.m_mass=0;
    this.m_sweep.localCenter.SetZero();
    if(!(this.m_type==b2.Body.b2_staticBody||this.m_type==b2.Body.b2_kinematicBody)){
        for(var a=b2.Vec2.Make(0,0),b=this.m_fixtureList;
        b;
        b=b.m_next)if(b.m_density!=0){
            var c=b.GetMassData();
            this.m_mass+=c.mass;
            a.x+=c.center.x*c.mass;
            a.y+=c.center.y*c.mass;
            this.m_I+=c.I}this.m_mass>0?(this.m_invMass=1/this.m_mass,a.x*=this.m_invMass,a.y*=this.m_invMass):this.m_invMass=this.m_mass=
        1;
        this.m_I>0&&(this.m_flags&b2.Body.e_fixedRotationFlag)==0?(this.m_I-=this.m_mass*(a.x*a.x+a.y*a.y),this.m_I*=this.m_inertiaScale,b2.Settings.b2Assert(this.m_I>0),this.m_invI=1/this.m_I):this.m_invI=this.m_I=0;
        b=this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(a);
        this.m_sweep.c0.SetV(b2.Math.MulX(this.m_xf,this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x+=this.m_angularVelocity*-(this.m_sweep.c.y-b.y);
        this.m_linearVelocity.y+=this.m_angularVelocity*+(this.m_sweep.c.x-
                                  b.x)}
    };
    b2.Body.prototype.GetWorldPoint=function(a){
    var b=this.m_xf.R,a=new b2.Vec2(b.col1.x*a.x+b.col2.x*a.y,b.col1.y*a.x+b.col2.y*a.y);
    a.x+=this.m_xf.position.x;
    a.y+=this.m_xf.position.y;
    return a
    };
    b2.Body.prototype.GetWorldVector=function(a){
    return b2.Math.MulMV(this.m_xf.R,a)
    };
    b2.Body.prototype.GetLocalPoint=function(a){
    return b2.Math.MulXT(this.m_xf,a)
    };
    b2.Body.prototype.GetLocalVector=function(a){
    return b2.Math.MulTMV(this.m_xf.R,a)
    };

    b2.Body.prototype.GetLinearVelocityFromWorldPoint=function(a){
    return new b2.Vec2(this.m_linearVelocity.x-this.m_angularVelocity*(a.y-this.m_sweep.c.y),this.m_linearVelocity.y+this.m_angularVelocity*(a.x-this.m_sweep.c.x))
    };

    b2.Body.prototype.GetLinearVelocityFromLocalPoint=function(a){
    var b=this.m_xf.R,a=new b2.Vec2(b.col1.x*a.x+b.col2.x*a.y,b.col1.y*a.x+b.col2.y*a.y);
    a.x+=this.m_xf.position.x;
    a.y+=this.m_xf.position.y;
    return new b2.Vec2(this.m_linearVelocity.x-this.m_angularVelocity*(a.y-this.m_sweep.c.y),this.m_linearVelocity.y+this.m_angularVelocity*(a.x-this.m_sweep.c.x))
    };
    b2.Body.prototype.GetLinearDamping=function(){
    return this.m_linearDamping
    };

    b2.Body.prototype.SetLinearDamping=function(a){
    this.m_linearDamping=a
    };
    b2.Body.prototype.GetAngularDamping=function(){
    return this.m_angularDamping
    };
    b2.Body.prototype.SetAngularDamping=function(a){
    this.m_angularDamping=a
    };
    b2.Body.prototype.SetType=function(a){
    if(this.m_type!=a){
        this.m_type=a;
        this.ResetMassData();
        if(this.m_type==b2.Body.b2_staticBody)this.m_linearVelocity.SetZero(),this.m_angularVelocity=0;
        this.SetAwake(!0);
        this.m_force.SetZero();
        this.m_torque=0;
        for(a=this.m_contactList;
        a;
        a=a.next)a.contact.FlagForFiltering()}
    };

    b2.Body.prototype.GetType=function(){
    return this.m_type
    };
    b2.Body.prototype.SetBullet=function(a){
    a?this.m_flags|=b2.Body.e_bulletFlag:this.m_flags&=~b2.Body.e_bulletFlag
    };
    b2.Body.prototype.IsBullet=function(){
    return(this.m_flags&b2.Body.e_bulletFlag)==b2.Body.e_bulletFlag
    };
    b2.Body.prototype.SetSleepingAllowed=function(a){
    a?this.m_flags|=b2.Body.e_allowSleepFlag:(this.m_flags&=~b2.Body.e_allowSleepFlag,this.SetAwake(!0))
    };

    b2.Body.prototype.SetAwake=function(a){
    a?(this.m_flags|=b2.Body.e_awakeFlag,this.m_sleepTime=0):(this.m_flags&=~b2.Body.e_awakeFlag,this.m_sleepTime=0,this.m_linearVelocity.SetZero(),this.m_angularVelocity=0,this.m_force.SetZero(),this.m_torque=0)
    };
    b2.Body.prototype.IsAwake=function(){
    return(this.m_flags&b2.Body.e_awakeFlag)==b2.Body.e_awakeFlag
    };
    b2.Body.prototype.SetFixedRotation=function(a){
    a?this.m_flags|=b2.Body.e_fixedRotationFlag:this.m_flags&=~b2.Body.e_fixedRotationFlag;
    this.ResetMassData()
    };

    b2.Body.prototype.IsFixedRotation=function(){
    return(this.m_flags&b2.Body.e_fixedRotationFlag)==b2.Body.e_fixedRotationFlag
    };

    b2.Body.prototype.SetActive=function(a){
    if(a!=this.IsActive()){
        var b;
        if(a){
        this.m_flags|=b2.Body.e_activeFlag;
        a=this.m_world.m_contactManager.m_broadPhase;
        for(b=this.m_fixtureList;
            b;
            b=b.m_next)b.CreateProxy(a,this.m_xf)}else{
            this.m_flags&=~b2.Body.e_activeFlag;
            a=this.m_world.m_contactManager.m_broadPhase;
            for(b=this.m_fixtureList;
                b;
                b=b.m_next)b.DestroyProxy(a);
            for(a=this.m_contactList;
                a;
               )b=a,a=a.next,this.m_world.m_contactManager.Destroy(b.contact);
            this.m_contactList=null}}
    };

    b2.Body.prototype.IsActive=function(){
    return(this.m_flags&b2.Body.e_activeFlag)==b2.Body.e_activeFlag
    };
    b2.Body.prototype.IsSleepingAllowed=function(){
    return(this.m_flags&b2.Body.e_allowSleepFlag)==b2.Body.e_allowSleepFlag
    };
    b2.Body.prototype.GetFixtureList=function(){
    return this.m_fixtureList
    };
    b2.Body.prototype.GetJointList=function(){
    return this.m_jointList
    };
    b2.Body.prototype.GetControllerList=function(){
    return this.m_controllerList
    };
    b2.Body.prototype.GetContactList=function(){
    return this.m_contactList
    };

    b2.Body.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Body.prototype.GetUserData=function(){
    return this.m_userData
    };
    b2.Body.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Body.prototype.GetWorld=function(){
    return this.m_world
    };
    b2.Body.prototype.m_flags=0;
    b2.Body.prototype.m_type=0;
    b2.Body.prototype.m_islandIndex=0;
    b2.Body.prototype.m_xf=new b2.Transform;
    b2.Body.prototype.m_sweep=new b2.Sweep;
    b2.Body.prototype.m_linearVelocity=new b2.Vec2;
    b2.Body.prototype.m_angularVelocity=null;

    b2.Body.prototype.m_force=new b2.Vec2;
    b2.Body.prototype.m_torque=null;
    b2.Body.prototype.m_world=null;
    b2.Body.prototype.m_prev=null;
    b2.Body.prototype.m_next=null;
    b2.Body.prototype.m_fixtureList=null;
    b2.Body.prototype.m_fixtureCount=0;
    b2.Body.prototype.m_controllerList=null;
    b2.Body.prototype.m_controllerCount=0;
    b2.Body.prototype.m_jointList=null;
    b2.Body.prototype.m_contactList=null;
    b2.Body.prototype.m_mass=null;
    b2.Body.prototype.m_invMass=null;
    b2.Body.prototype.m_I=null;
    b2.Body.prototype.m_invI=null;

    b2.Body.prototype.m_inertiaScale=null;
    b2.Body.prototype.m_linearDamping=null;
    b2.Body.prototype.m_angularDamping=null;
    b2.Body.prototype.m_sleepTime=null;
    b2.Body.prototype.m_userData=null;
    b2.ContactImpulse=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactImpulse.prototype.__constructor=function(){

    };
    b2.ContactImpulse.prototype.__varz=function(){
    this.normalImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    this.tangentImpulses=Array(b2.Settings.b2_maxManifoldPoints)
    };

    b2.ContactImpulse.prototype.normalImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    b2.ContactImpulse.prototype.tangentImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    b2.TensorDampingController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.TensorDampingController.prototype,b2.Controller.prototype);
    b2.TensorDampingController.prototype._super=b2.Controller.prototype;

    b2.TensorDampingController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.TensorDampingController.prototype.__varz=function(){
    this.T=new b2.Mat22
    };
    b2.TensorDampingController.prototype.SetAxisAligned=function(a,b){
    this.T.col1.x=-a;
    this.T.col1.y=0;
    this.T.col2.x=0;
    this.T.col2.y=-b;
    this.maxTimestep=a>0||b>0?1/Math.max(a,b):0
    };

    b2.TensorDampingController.prototype.Step=function(a){
    a=a.dt;
    if(!(a<=Number.MIN_VALUE)){
        if(a>this.maxTimestep&&this.maxTimestep>0)a=this.maxTimestep;
        for(var b=m_bodyList;
        b;
        b=b.nextBody){
        var c=b.body;
        if(c.IsAwake()){
            var d=c.GetWorldVector(b2.Math.MulMV(this.T,c.GetLocalVector(c.GetLinearVelocity())));
            c.SetLinearVelocity(new b2.Vec2(c.GetLinearVelocity().x+d.x*a,c.GetLinearVelocity().y+d.y*a))}}}
    };
    b2.TensorDampingController.prototype.T=new b2.Mat22;
    b2.TensorDampingController.prototype.maxTimestep=0;

    b2.ManifoldPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ManifoldPoint.prototype.__constructor=function(){
    this.Reset()
    };
    b2.ManifoldPoint.prototype.__varz=function(){
    this.m_localPoint=new b2.Vec2;
    this.m_id=new b2.ContactID
    };
    b2.ManifoldPoint.prototype.Reset=function(){
    this.m_localPoint.SetZero();
    this.m_tangentImpulse=this.m_normalImpulse=0;
    this.m_id.key=0
    };

    b2.ManifoldPoint.prototype.Set=function(a){
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_normalImpulse=a.m_normalImpulse;
    this.m_tangentImpulse=a.m_tangentImpulse;
    this.m_id.Set(a.m_id)
    };
    b2.ManifoldPoint.prototype.m_localPoint=new b2.Vec2;
    b2.ManifoldPoint.prototype.m_normalImpulse=null;
    b2.ManifoldPoint.prototype.m_tangentImpulse=null;
    b2.ManifoldPoint.prototype.m_id=new b2.ContactID;
    b2.PolygonShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.PolygonShape.prototype,b2.Shape.prototype);
    b2.PolygonShape.prototype._super=b2.Shape.prototype;
    b2.PolygonShape.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.m_type=b2.Shape.e_polygonShape;
    this.m_centroid=new b2.Vec2;
    this.m_vertices=[];
    this.m_normals=[]
    };
    b2.PolygonShape.prototype.__varz=function(){

    };
    b2.PolygonShape.AsArray=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsArray(a,b);
    return c
    };

    b2.PolygonShape.AsVector=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsVector(a,b);
    return c
    };
    b2.PolygonShape.AsBox=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsBox(a,b);
    return c
    };
    b2.PolygonShape.AsOrientedBox=function(a,b,c,d){
    var e=new b2.PolygonShape;
    e.SetAsOrientedBox(a,b,c,d);
    return e
    };
    b2.PolygonShape.AsEdge=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsEdge(a,b);
    return c
    };

    b2.PolygonShape.ComputeCentroid=function(a,b){
    for(var c=new b2.Vec2,d=0,e=1/3,h=0;
        h<b;
        ++h){
        var g=a[h],f=h+1<b?a[parseInt(h+1)]:a[0],i=0.5*((g.x-0)*(f.y-0)-(g.y-0)*(f.x-0));
        d+=i;
        c.x+=i*e*(0+g.x+f.x);
        c.y+=i*e*(0+g.y+f.y)}c.x*=1/d;
    c.y*=1/d;
    return c
    };

    b2.PolygonShape.ComputeOBB=function(a,b,c){
    for(var d=0,e=Array(c+1),d=0;
        d<c;
        ++d)e[d]=b[d];
    e[c]=e[0];
    b=Number.MAX_VALUE;
    for(d=1;
        d<=c;
        ++d){
        var h=e[parseInt(d-1)],g=e[d].x-h.x,f=e[d].y-h.y,i=Math.sqrt(g*g+f*f);
        g/=i;
        f/=i;
        for(var j=-f,k=g,l=i=Number.MAX_VALUE,n=-Number.MAX_VALUE,m=-Number.MAX_VALUE,o=0;
        o<c;
        ++o){
        var p=e[o].x-h.x,q=e[o].y-h.y,r=g*p+f*q,p=j*p+k*q;
        r<i&&(i=r);
        p<l&&(l=p);
        r>n&&(n=r);
        p>m&&(m=p)}o=(n-i)*(m-l);
        if(o<0.95*b)b=o,a.R.col1.x=g,a.R.col1.y=f,a.R.col2.x=j,a.R.col2.y=k,g=0.5*(i+n),f=0.5*
        (l+m),j=a.R,a.center.x=h.x+(j.col1.x*g+j.col2.x*f),a.center.y=h.y+(j.col1.y*g+j.col2.y*f),a.extents.x=0.5*(n-i),a.extents.y=0.5*(m-l)}
    };
    b2.PolygonShape.s_mat=new b2.Mat22;
    b2.PolygonShape.prototype.Validate=function(){
    return!1
    };
    b2.PolygonShape.prototype.Reserve=function(a){
    for(var b=this.m_vertices.length;
        b<a;
        b++)this.m_vertices[b]=new b2.Vec2,this.m_normals[b]=new b2.Vec2
    };
    b2.PolygonShape.prototype.Copy=function(){
    var a=new b2.PolygonShape;
    a.Set(this);
    return a
    };

    b2.PolygonShape.prototype.Set=function(a){
    this._super.Set.apply(this,[a]);
    if(isInstanceOf(a,b2.PolygonShape)){
        this.m_centroid.SetV(a.m_centroid);
        this.m_vertexCount=a.m_vertexCount;
        this.Reserve(this.m_vertexCount);
        for(var b=0;
        b<this.m_vertexCount;
        b++)this.m_vertices[b].SetV(a.m_vertices[b]),this.m_normals[b].SetV(a.m_normals[b])}
    };
    b2.PolygonShape.prototype.SetAsArray=function(a,b){
    for(var c=[],d=0,e=null;
        e=a[d];
        d++)c.push(e);
    this.SetAsVector(c,b)
    };

    b2.PolygonShape.prototype.SetAsVector=function(a,b){
    if(typeof b=="undefined")b=a.length;
    b2.Settings.b2Assert(2<=b);
    this.m_vertexCount=b;
    this.Reserve(b);
    for(var c=0,c=0;
        c<this.m_vertexCount;
        c++)this.m_vertices[c].SetV(a[c]);
    for(c=0;
        c<this.m_vertexCount;
        ++c){
        var d=b2.Math.SubtractVV(this.m_vertices[c+1<this.m_vertexCount?c+1:0],this.m_vertices[c]);
        b2.Settings.b2Assert(d.LengthSquared()>Number.MIN_VALUE);
        this.m_normals[c].SetV(b2.Math.CrossVF(d,1));
        this.m_normals[c].Normalize()}this.m_centroid=b2.PolygonShape.ComputeCentroid(this.m_vertices,
                                              this.m_vertexCount)
    };
    b2.PolygonShape.prototype.SetAsBox=function(a,b){
    this.m_vertexCount=4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a,-b);
    this.m_vertices[1].Set(a,-b);
    this.m_vertices[2].Set(a,b);
    this.m_vertices[3].Set(-a,b);
    this.m_normals[0].Set(0,-1);
    this.m_normals[1].Set(1,0);
    this.m_normals[2].Set(0,1);
    this.m_normals[3].Set(-1,0);
    this.m_centroid.SetZero()
    };

    b2.PolygonShape.prototype.SetAsOrientedBox=function(a,b,c,d){
    this.m_vertexCount=4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a,-b);
    this.m_vertices[1].Set(a,-b);
    this.m_vertices[2].Set(a,b);
    this.m_vertices[3].Set(-a,b);
    this.m_normals[0].Set(0,-1);
    this.m_normals[1].Set(1,0);
    this.m_normals[2].Set(0,1);
    this.m_normals[3].Set(-1,0);
    this.m_centroid=c;
    a=new b2.Transform;
    a.position=c;
    a.R.Set(d);
    for(c=0;
        c<this.m_vertexCount;
        ++c)this.m_vertices[c]=b2.Math.MulX(a,this.m_vertices[c]),this.m_normals[c]=b2.Math.MulMV(a.R,
                                                      this.m_normals[c])
    };
    b2.PolygonShape.prototype.SetAsEdge=function(a,b){
    this.m_vertexCount=2;
    this.Reserve(2);
    this.m_vertices[0].SetV(a);
    this.m_vertices[1].SetV(b);
    this.m_centroid.x=0.5*(a.x+b.x);
    this.m_centroid.y=0.5*(a.y+b.y);
    this.m_normals[0]=b2.Math.CrossVF(b2.Math.SubtractVV(b,a),1);
    this.m_normals[0].Normalize();
    this.m_normals[1].x=-this.m_normals[0].x;
    this.m_normals[1].y=-this.m_normals[0].y
    };

    b2.PolygonShape.prototype.TestPoint=function(a,b){
    var c;
    c=a.R;
    for(var d=b.x-a.position.x,e=b.y-a.position.y,h=d*c.col1.x+e*c.col1.y,g=d*c.col2.x+e*c.col2.y,f=0;
        f<this.m_vertexCount;
        ++f)if(c=this.m_vertices[f],d=h-c.x,e=g-c.y,c=this.m_normals[f],c.x*d+c.y*e>0)return!1;
    return!0
    };

    b2.PolygonShape.prototype.RayCast=function(a,b,c){
    var d=0,e=b.maxFraction,h,g,f,i;
    h=b.p1.x-c.position.x;
    g=b.p1.y-c.position.y;
    f=c.R;
    var j=h*f.col1.x+g*f.col1.y,k=h*f.col2.x+g*f.col2.y;
    h=b.p2.x-c.position.x;
    g=b.p2.y-c.position.y;
    f=c.R;
    b=h*f.col1.x+g*f.col1.y-j;
    f=h*f.col2.x+g*f.col2.y-k;
    for(var l=-1,n=0;
        n<this.m_vertexCount;
        ++n){
        i=this.m_vertices[n];
        h=i.x-j;
        g=i.y-k;
        i=this.m_normals[n];
        h=i.x*h+i.y*g;
        g=i.x*b+i.y*f;
        if(g==0){
        if(h<0)return!1}else g<0&&h<d*g?(d=h/g,l=n):g>0&&h<e*g&&(e=h/g);
        if(e<d-Number.MIN_VALUE)return!1}if(l>=
                        0)return a.fraction=d,f=c.R,i=this.m_normals[l],a.normal.x=f.col1.x*i.x+f.col2.x*i.y,a.normal.y=f.col1.y*i.x+f.col2.y*i.y,!0;
    return!1
    };

    b2.PolygonShape.prototype.ComputeAABB=function(a,b){
    for(var c=b.R,d=this.m_vertices[0],e=b.position.x+(c.col1.x*d.x+c.col2.x*d.y),h=b.position.y+(c.col1.y*d.x+c.col2.y*d.y),g=e,f=h,i=1;
        i<this.m_vertexCount;
        ++i)var d=this.m_vertices[i],j=b.position.x+(c.col1.x*d.x+c.col2.x*d.y),d=b.position.y+(c.col1.y*d.x+c.col2.y*d.y),e=e<j?e:j,h=h<d?h:d,g=g>j?g:j,f=f>d?f:d;
    a.lowerBound.x=e-this.m_radius;
    a.lowerBound.y=h-this.m_radius;
    a.upperBound.x=g+this.m_radius;
    a.upperBound.y=f+this.m_radius
    };

    b2.PolygonShape.prototype.ComputeMass=function(a,b){
    if(this.m_vertexCount==2)a.center.x=0.5*(this.m_vertices[0].x+this.m_vertices[1].x),a.center.y=0.5*(this.m_vertices[0].y+this.m_vertices[1].y),a.mass=0,a.I=0;
    else{
        for(var c=0,d=0,e=0,h=0,g=1/3,f=0;
        f<this.m_vertexCount;
        ++f){
        var i=this.m_vertices[f],j=f+1<this.m_vertexCount?this.m_vertices[parseInt(f+1)]:this.m_vertices[0],k=i.x-0,l=i.y-0,n=j.x-0,m=j.y-0,o=k*m-l*n,p=0.5*o;
        e+=p;
        c+=p*g*(0+i.x+j.x);
        d+=p*g*(0+i.y+j.y);
        i=k;
        h+=o*(g*(0.25*(i*i+n*i+n*n)+(0*
                         i+0*n))+0+(g*(0.25*(l*l+m*l+m*m)+(0*l+0*m))+0))}a.mass=b*e;
        c*=1/e;
        d*=1/e;
        a.center.Set(c,d);
        a.I=b*h}
    };

    b2.PolygonShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    for(var e=b2.Math.MulTMV(c.R,a),h=b-b2.Math.Dot(a,c.position),g=[],f=0,i=-1,b=-1,j=!1,a=a=0;
        a<this.m_vertexCount;
        ++a){
        g[a]=b2.Math.Dot(e,this.m_vertices[a])-h;
        var k=g[a]<-Number.MIN_VALUE;
        a>0&&(k?j||(i=a-1,f++):j&&(b=a-1,f++));
        j=k}switch(f){
        case 0:return j?(a=new b2.MassData,this.ComputeMass(a,1),d.SetV(b2.Math.MulX(c,a.center)),a.mass):0;
        case 1:i==-1?i=this.m_vertexCount-1:b=this.m_vertexCount-1}a=(i+1)%this.m_vertexCount;
    e=(b+1)%this.m_vertexCount;

    h=(0-g[i])/(g[a]-g[i]);
    g=(0-g[b])/(g[e]-g[b]);
    i=new b2.Vec2(this.m_vertices[i].x*(1-h)+this.m_vertices[a].x*h,this.m_vertices[i].y*(1-h)+this.m_vertices[a].y*h);
    b=new b2.Vec2(this.m_vertices[b].x*(1-g)+this.m_vertices[e].x*g,this.m_vertices[b].y*(1-g)+this.m_vertices[e].y*g);
    g=0;
    h=new b2.Vec2;
    for(f=this.m_vertices[a];
        a!=e;
       )a=(a+1)%this.m_vertexCount,j=a==e?b:this.m_vertices[a],k=0.5*((f.x-i.x)*(j.y-i.y)-(f.y-i.y)*(j.x-i.x)),g+=k,h.x+=k*(i.x+f.x+j.x)/3,h.y+=k*(i.y+f.y+j.y)/3,f=j;
    h.Multiply(1/g);
    d.SetV(b2.Math.MulX(c,
                h));
    return g
    };
    b2.PolygonShape.prototype.GetVertexCount=function(){
    return this.m_vertexCount
    };
    b2.PolygonShape.prototype.GetVertices=function(){
    return this.m_vertices
    };
    b2.PolygonShape.prototype.GetNormals=function(){
    return this.m_normals
    };
    b2.PolygonShape.prototype.GetSupport=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_vertexCount;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return b
    };

    b2.PolygonShape.prototype.GetSupportVertex=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_vertexCount;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return this.m_vertices[b]
    };
    b2.PolygonShape.prototype.m_centroid=null;
    b2.PolygonShape.prototype.m_vertices=null;
    b2.PolygonShape.prototype.m_normals=null;
    b2.PolygonShape.prototype.m_vertexCount=0;
    b2.Fixture=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Fixture.prototype.__constructor=function(){
    this.m_aabb=new b2.AABB;
    this.m_shape=this.m_next=this.m_body=this.m_userData=null;
    this.m_restitution=this.m_friction=this.m_density=0
    };
    b2.Fixture.prototype.__varz=function(){
    this.m_filter=new b2.FilterData
    };

    b2.Fixture.prototype.Create=function(a,b,c){
    this.m_userData=c.userData;
    this.m_friction=c.friction;
    this.m_restitution=c.restitution;
    this.m_body=a;
    this.m_next=null;
    this.m_filter=c.filter.Copy();
    this.m_isSensor=c.isSensor;
    this.m_shape=c.shape.Copy();
    this.m_density=c.density
    };
    b2.Fixture.prototype.Destroy=function(){
    this.m_shape=null
    };
    b2.Fixture.prototype.CreateProxy=function(a,b){
    this.m_shape.ComputeAABB(this.m_aabb,b);
    this.m_proxy=a.CreateProxy(this.m_aabb,this)
    };

    b2.Fixture.prototype.DestroyProxy=function(a){
    if(this.m_proxy!=null)a.DestroyProxy(this.m_proxy),this.m_proxy=null
    };
    b2.Fixture.prototype.Synchronize=function(a,b,c){
    if(this.m_proxy){
        var d=new b2.AABB,e=new b2.AABB;
        this.m_shape.ComputeAABB(d,b);
        this.m_shape.ComputeAABB(e,c);
        this.m_aabb.Combine(d,e);
        b=b2.Math.SubtractVV(c.position,b.position);
        a.MoveProxy(this.m_proxy,this.m_aabb,b)}
    };
    b2.Fixture.prototype.GetType=function(){
    return this.m_shape.GetType()
    };
    b2.Fixture.prototype.GetShape=function(){
    return this.m_shape
    };

    b2.Fixture.prototype.SetSensor=function(a){
    if(this.m_isSensor!=a&&(this.m_isSensor=a,this.m_body!=null))for(a=this.m_body.GetContactList();
                                     a;
                                    ){
        var b=a.contact,c=b.GetFixtureA(),d=b.GetFixtureB();
        if(c==this||d==this)b.SetSensor(c.IsSensor()||d.IsSensor());
        a=a.next}
    };
    b2.Fixture.prototype.IsSensor=function(){
    return this.m_isSensor
    };

    b2.Fixture.prototype.SetFilterData=function(a){
    this.m_filter=a.Copy();
    if(!this.m_body)for(a=this.m_body.GetContactList();
                a;
               ){
        var b=a.contact,c=b.GetFixtureA(),d=b.GetFixtureB();
        (c==this||d==this)&&b.FlagForFiltering();
        a=a.next}
    };
    b2.Fixture.prototype.GetFilterData=function(){
    return this.m_filter.Copy()
    };
    b2.Fixture.prototype.GetBody=function(){
    return this.m_body
    };
    b2.Fixture.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Fixture.prototype.GetUserData=function(){
    return this.m_userData
    };

    b2.Fixture.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Fixture.prototype.TestPoint=function(a){
    return this.m_shape.TestPoint(this.m_body.GetTransform(),a)
    };
    b2.Fixture.prototype.RayCast=function(a,b){
    return this.m_shape.RayCast(a,b,this.m_body.GetTransform())
    };
    b2.Fixture.prototype.GetMassData=function(a){
    a==null&&(a=new b2.MassData);
    this.m_shape.ComputeMass(a,this.m_density);
    return a
    };
    b2.Fixture.prototype.SetDensity=function(a){
    this.m_density=a
    };
    b2.Fixture.prototype.GetDensity=function(){
    return this.m_density
    };

    b2.Fixture.prototype.GetFriction=function(){
    return this.m_friction
    };
    b2.Fixture.prototype.SetFriction=function(a){
    this.m_friction=a
    };
    b2.Fixture.prototype.GetRestitution=function(){
    return this.m_restitution
    };
    b2.Fixture.prototype.SetRestitution=function(a){
    this.m_restitution=a
    };
    b2.Fixture.prototype.GetAABB=function(){
    return this.m_aabb
    };
    b2.Fixture.prototype.m_massData=null;
    b2.Fixture.prototype.m_aabb=null;
    b2.Fixture.prototype.m_density=null;
    b2.Fixture.prototype.m_next=null;

    b2.Fixture.prototype.m_body=null;
    b2.Fixture.prototype.m_shape=null;
    b2.Fixture.prototype.m_friction=null;
    b2.Fixture.prototype.m_restitution=null;
    b2.Fixture.prototype.m_proxy=null;
    b2.Fixture.prototype.m_filter=new b2.FilterData;
    b2.Fixture.prototype.m_isSensor=null;
    b2.Fixture.prototype.m_userData=null;
    b2.DynamicTreeNode=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreeNode.prototype.__constructor=function(){

    };
    b2.DynamicTreeNode.prototype.__varz=function(){
    this.aabb=new b2.AABB
    };

    b2.DynamicTreeNode.prototype.IsLeaf=function(){
    return this.child1==null
    };
    b2.DynamicTreeNode.prototype.userData=null;
    b2.DynamicTreeNode.prototype.aabb=new b2.AABB;
    b2.DynamicTreeNode.prototype.parent=null;
    b2.DynamicTreeNode.prototype.child1=null;
    b2.DynamicTreeNode.prototype.child2=null;
    b2.BodyDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.BodyDef.prototype.__constructor=function(){
    this.userData=null;
    this.position.Set(0,0);
    this.angle=0;
    this.linearVelocity.Set(0,0);
    this.angularDamping=this.linearDamping=this.angularVelocity=0;
    this.awake=this.allowSleep=!0;
    this.bullet=this.fixedRotation=!1;
    this.type=b2.Body.b2_staticBody;
    this.active=!0;
    this.inertiaScale=1
    };
    b2.BodyDef.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.linearVelocity=new b2.Vec2
    };
    b2.BodyDef.prototype.type=0;
    b2.BodyDef.prototype.position=new b2.Vec2;

    b2.BodyDef.prototype.angle=null;
    b2.BodyDef.prototype.linearVelocity=new b2.Vec2;
    b2.BodyDef.prototype.angularVelocity=null;
    b2.BodyDef.prototype.linearDamping=null;
    b2.BodyDef.prototype.angularDamping=null;
    b2.BodyDef.prototype.allowSleep=null;
    b2.BodyDef.prototype.awake=null;
    b2.BodyDef.prototype.fixedRotation=null;
    b2.BodyDef.prototype.bullet=null;
    b2.BodyDef.prototype.active=null;
    b2.BodyDef.prototype.userData=null;
    b2.BodyDef.prototype.inertiaScale=null;

    b2.DynamicTreeBroadPhase=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreeBroadPhase.prototype.__constructor=function(){

    };
    b2.DynamicTreeBroadPhase.prototype.__varz=function(){
    this.m_tree=new b2.DynamicTree;
    this.m_moveBuffer=[];
    this.m_pairBuffer=[]
    };
    b2.DynamicTreeBroadPhase.prototype.BufferMove=function(a){
    this.m_moveBuffer[this.m_moveBuffer.length]=a
    };
    b2.DynamicTreeBroadPhase.prototype.UnBufferMove=function(a){
    this.m_moveBuffer.splice(this.m_moveBuffer.indexOf(a),1)
    };

    b2.DynamicTreeBroadPhase.prototype.ComparePairs=function(){
    return 0
    };
    b2.DynamicTreeBroadPhase.prototype.CreateProxy=function(a,b){
    var c=this.m_tree.CreateProxy(a,b);
    ++this.m_proxyCount;
    this.BufferMove(c);
    return c
    };
    b2.DynamicTreeBroadPhase.prototype.DestroyProxy=function(a){
    this.UnBufferMove(a);
    --this.m_proxyCount;
    this.m_tree.DestroyProxy(a)
    };
    b2.DynamicTreeBroadPhase.prototype.MoveProxy=function(a,b,c){
    this.m_tree.MoveProxy(a,b,c)&&this.BufferMove(a)
    };

    b2.DynamicTreeBroadPhase.prototype.TestOverlap=function(a,b){
    var c=this.m_tree.GetFatAABB(a),d=this.m_tree.GetFatAABB(b);
    return c.TestOverlap(d)
    };
    b2.DynamicTreeBroadPhase.prototype.GetUserData=function(a){
    return this.m_tree.GetUserData(a)
    };
    b2.DynamicTreeBroadPhase.prototype.GetFatAABB=function(a){
    return this.m_tree.GetFatAABB(a)
    };
    b2.DynamicTreeBroadPhase.prototype.GetProxyCount=function(){
    return this.m_proxyCount
    };

    b2.DynamicTreeBroadPhase.prototype.UpdatePairs=function(a){
    for(var b=this.m_pairCount=0,c=null;
        c=this.m_moveBuffer[b];
        b++){
        var d=this;
        this.m_tree.Query(function(a){
        if(a==c)return!0;
        d.m_pairCount==d.m_pairBuffer.length&&(d.m_pairBuffer[d.m_pairCount]=new b2.DynamicTreePair);
        var b=d.m_pairBuffer[d.m_pairCount];
        b.proxyA=a<c?a:c;
        b.proxyB=a>=c?a:c;
        ++d.m_pairCount;
        return!0},this.m_tree.GetFatAABB(c))}for(b=this.m_moveBuffer.length=0;
                             b<this.m_pairCount;
                            ){
            var e=this.m_pairBuffer[b],h=this.m_tree.GetUserData(e.proxyA),
            g=this.m_tree.GetUserData(e.proxyB);
            a(h,g);
            for(++b;
            b<this.m_pairCount;
               ){
            h=this.m_pairBuffer[b];
            if(h.proxyA!=e.proxyA||h.proxyB!=e.proxyB)break;
            ++b}}
    };
    b2.DynamicTreeBroadPhase.prototype.Query=function(a,b){
    this.m_tree.Query(a,b)
    };
    b2.DynamicTreeBroadPhase.prototype.RayCast=function(a,b){
    this.m_tree.RayCast(a,b)
    };
    b2.DynamicTreeBroadPhase.prototype.Validate=function(){

    };
    b2.DynamicTreeBroadPhase.prototype.Rebalance=function(a){
    this.m_tree.Rebalance(a)
    };
    b2.DynamicTreeBroadPhase.prototype.m_tree=new b2.DynamicTree;

    b2.DynamicTreeBroadPhase.prototype.m_proxyCount=0;
    b2.DynamicTreeBroadPhase.prototype.m_moveBuffer=[];
    b2.DynamicTreeBroadPhase.prototype.m_pairBuffer=[];
    b2.DynamicTreeBroadPhase.prototype.m_pairCount=0;
    b2.BroadPhase=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.BroadPhase.prototype.__constructor=function(a){
    var b=0;
    this.m_pairManager.Initialize(this);
    this.m_worldAABB=a;
    this.m_proxyCount=0;
    this.m_bounds=[];
    for(b=0;
        b<2;
        b++)this.m_bounds[b]=[];
    b=a.upperBound.y-a.lowerBound.y;
    this.m_quantizationFactor.x=b2.Settings.USHRT_MAX/(a.upperBound.x-a.lowerBound.x);
    this.m_quantizationFactor.y=b2.Settings.USHRT_MAX/b;
    this.m_timeStamp=1;
    this.m_queryResultCount=0
    };

    b2.BroadPhase.prototype.__varz=function(){
    this.m_pairManager=new b2.PairManager;
    this.m_proxyPool=[];
    this.m_querySortKeys=[];
    this.m_queryResults=[];
    this.m_quantizationFactor=new b2.Vec2
    };
    b2.BroadPhase.BinarySearch=function(a,b,c){
    var d=0;
    for(b-=1;
        d<=b;
       ){
        var e=Math.round((d+b)/2),h=a[e];
        if(h.value>c)b=e-1;
        else if(h.value<c)d=e+1;
        else return parseInt(e)}return parseInt(d)
    };
    b2.BroadPhase.s_validate=!1;
    b2.BroadPhase.b2_invalid=b2.Settings.USHRT_MAX;
    b2.BroadPhase.b2_nullEdge=b2.Settings.USHRT_MAX;

    b2.BroadPhase.prototype.ComputeBounds=function(a,b,c){
    var d=c.lowerBound.x,e=c.lowerBound.y,d=b2.Math.Min(d,this.m_worldAABB.upperBound.x),e=b2.Math.Min(e,this.m_worldAABB.upperBound.y),d=b2.Math.Max(d,this.m_worldAABB.lowerBound.x),e=b2.Math.Max(e,this.m_worldAABB.lowerBound.y),h=c.upperBound.x,c=c.upperBound.y,h=b2.Math.Min(h,this.m_worldAABB.upperBound.x),c=b2.Math.Min(c,this.m_worldAABB.upperBound.y),h=b2.Math.Max(h,this.m_worldAABB.lowerBound.x),c=b2.Math.Max(c,this.m_worldAABB.lowerBound.y);

    a[0]=parseInt(this.m_quantizationFactor.x*(d-this.m_worldAABB.lowerBound.x))&b2.Settings.USHRT_MAX-1;
    b[0]=parseInt(this.m_quantizationFactor.x*(h-this.m_worldAABB.lowerBound.x))%65535|1;
    a[1]=parseInt(this.m_quantizationFactor.y*(e-this.m_worldAABB.lowerBound.y))&b2.Settings.USHRT_MAX-1;
    b[1]=parseInt(this.m_quantizationFactor.y*(c-this.m_worldAABB.lowerBound.y))%65535|1
    };

    b2.BroadPhase.prototype.TestOverlapValidate=function(a,b){
    for(var c=0;
        c<2;
        ++c){
        var d=this.m_bounds[c],e=d[a.lowerBounds[c]],h=d[b.upperBounds[c]];
        if(e.value>h.value)return!1;
        e=d[a.upperBounds[c]];
        h=d[b.lowerBounds[c]];
        if(e.value<h.value)return!1}return!0
    };

    b2.BroadPhase.prototype.QueryAxis=function(a,b,c,d,e,h,g){
    for(var c=b2.BroadPhase.BinarySearch(e,h,c),d=b2.BroadPhase.BinarySearch(e,h,d),f=c;
        f<d;
        ++f)h=e[f],h.IsLower()&&this.IncrementOverlapCount(h.proxy);
    if(c>0)for(var f=c-1,h=e[f],i=h.stabbingCount;
           i;
          )h=e[f],h.IsLower()&&c<=h.proxy.upperBounds[g]&&(this.IncrementOverlapCount(h.proxy),--i),--f;
    a[0]=c;
    b[0]=d
    };

    b2.BroadPhase.prototype.IncrementOverlapCount=function(a){
    a.timeStamp<this.m_timeStamp?(a.timeStamp=this.m_timeStamp,a.overlapCount=1):(a.overlapCount=2,this.m_queryResults[this.m_queryResultCount]=a,++this.m_queryResultCount)
    };
    b2.BroadPhase.prototype.IncrementTimeStamp=function(){
    if(this.m_timeStamp==b2.Settings.USHRT_MAX){
        for(var a=0;
        a<this.m_proxyPool.length;
        ++a)this.m_proxyPool[a].timeStamp=0;
        this.m_timeStamp=1}else++this.m_timeStamp
    };

    b2.BroadPhase.prototype.InRange=function(a){
    var b,c,d,e;
    b=a.lowerBound.x;
    c=a.lowerBound.y;
    b-=this.m_worldAABB.upperBound.x;
    c-=this.m_worldAABB.upperBound.y;
    d=this.m_worldAABB.lowerBound.x;
    e=this.m_worldAABB.lowerBound.y;
    d-=a.upperBound.x;
    e-=a.upperBound.y;
    b=b2.Math.Max(b,d);
    c=b2.Math.Max(c,e);
    return b2.Math.Max(b,c)<0
    };

    b2.BroadPhase.prototype.CreateProxy=function(a,b){
    var c=0,d,e=0;
    if(!this.m_freeProxy){
        this.m_freeProxy=this.m_proxyPool[this.m_proxyCount]=new b2.Proxy;
        this.m_freeProxy.next=null;
        this.m_freeProxy.timeStamp=0;
        this.m_freeProxy.overlapCount=b2.BroadPhase.b2_invalid;
        this.m_freeProxy.userData=null;
        for(e=0;
        e<2;
        e++)d=this.m_proxyCount*2,this.m_bounds[e][d++]=new b2.Bound,this.m_bounds[e][d]=new b2.Bound}d=this.m_freeProxy;
    this.m_freeProxy=d.next;
    d.overlapCount=0;
    d.userData=b;
    var e=2*this.m_proxyCount,h=
        [],g=[];
    this.ComputeBounds(h,g,a);
    for(var f=0;
        f<2;
        ++f){
        var i=this.m_bounds[f],j=0,k=0,l=[];
        l.push(j);
        c=[];
        c.push(k);
        this.QueryAxis(l,c,h[f],g[f],i,e,f);
        j=l[0];
        k=c[0];
        i.splice(k,0,i[i.length-1]);
        i.length--;
        i.splice(j,0,i[i.length-1]);
        i.length--;
        ++k;
        l=i[j];
        c=i[k];
        l.value=h[f];
        l.proxy=d;
        c.value=g[f];
        c.proxy=d;
        var n=i[parseInt(j-1)];
        l.stabbingCount=j==0?0:n.stabbingCount;
        n=i[parseInt(k-1)];
        c.stabbingCount=n.stabbingCount;
        for(c=j;
        c<k;
        ++c)n=i[c],n.stabbingCount++;
        for(c=j;
        c<e+2;
        ++c)l=i[c],j=l.proxy,l.IsLower()?
        j.lowerBounds[f]=c:j.upperBounds[f]=c}++this.m_proxyCount;
    for(e=0;
        e<this.m_queryResultCount;
        ++e)this.m_pairManager.AddBufferedPair(d,this.m_queryResults[e]);
    this.m_queryResultCount=0;
    this.IncrementTimeStamp();
    return d
    };

    b2.BroadPhase.prototype.DestroyProxy=function(a){
    for(var b,c,d=2*this.m_proxyCount,e=0;
        e<2;
        ++e){
        var h=this.m_bounds[e],g=a.lowerBounds[e],f=a.upperBounds[e];
        b=h[g];
        var i=b.value;
        c=h[f];
        var j=c.value;
        h.splice(f,1);
        h.splice(g,1);
        h.push(b);
        h.push(c);
        c=d-2;
        for(var k=g;
        k<c;
        ++k){
        b=h[k];
        var l=b.proxy;
        b.IsLower()?l.lowerBounds[e]=k:l.upperBounds[e]=k}for(c=f-1;
                                      g<c;
                                      ++g)b=h[g],b.stabbingCount--;
        b=[];
        this.QueryAxis(b,b,i,j,h,d-2,e)}for(d=0;
                        d<this.m_queryResultCount;
                        ++d)this.m_pairManager.RemoveBufferedPair(a,
                                              this.m_queryResults[d]);
    this.m_queryResultCount=0;
    this.IncrementTimeStamp();
    a.userData=null;
    a.overlapCount=b2.BroadPhase.b2_invalid;
    a.lowerBounds[0]=b2.BroadPhase.b2_invalid;
    a.lowerBounds[1]=b2.BroadPhase.b2_invalid;
    a.upperBounds[0]=b2.BroadPhase.b2_invalid;
    a.upperBounds[1]=b2.BroadPhase.b2_invalid;
    a.next=this.m_freeProxy;
    this.m_freeProxy=a;
    --this.m_proxyCount
    };

    b2.BroadPhase.prototype.MoveProxy=function(a,b){
    var c,d=0,e=0,h=0,g,f;
    if(a!=null&&b.IsValid()!=!1){
        var i=2*this.m_proxyCount,j=new b2.BoundValues;
        this.ComputeBounds(j.lowerValues,j.upperValues,b);
        for(var k=new b2.BoundValues,e=0;
        e<2;
        ++e)g=this.m_bounds[e][a.lowerBounds[e]],k.lowerValues[e]=g.value,g=this.m_bounds[e][a.upperBounds[e]],k.upperValues[e]=g.value;
        for(e=0;
        e<2;
        ++e){
        var l=this.m_bounds[e],n=a.lowerBounds[e],m=a.upperBounds[e],o=j.lowerValues[e],p=j.upperValues[e];
        g=l[n];
        var q=o-g.value;
        g.value=
            o;
        g=l[m];
        var r=p-g.value;
        g.value=p;
        if(q<0)for(h=n;
               h>0&&o<l[parseInt(h-1)].value;
              )g=l[h],f=l[parseInt(h-1)],c=f.proxy,f.stabbingCount++,f.IsUpper()==!0?(this.TestOverlapBound(j,c)&&this.m_pairManager.AddBufferedPair(a,c),c=c.upperBounds,d=c[e],d++,c[e]=d,g.stabbingCount++):(c=c.lowerBounds,d=c[e],d++,c[e]=d,g.stabbingCount--),c=a.lowerBounds,d=c[e],d--,c[e]=d,g.Swap(f),--h;
        if(r>0)for(h=m;
               h<i-1&&l[parseInt(h+1)].value<=p;
              )g=l[h],f=l[parseInt(h+1)],c=f.proxy,f.stabbingCount++,f.IsLower()==!0?(this.TestOverlapBound(j,
                                                            c)&&this.m_pairManager.AddBufferedPair(a,c),c=c.lowerBounds,d=c[e],d--,c[e]=d,g.stabbingCount++):(c=c.upperBounds,d=c[e],d--,c[e]=d,g.stabbingCount--),c=a.upperBounds,d=c[e],d++,c[e]=d,g.Swap(f),h++;
        if(q>0)for(h=n;
               h<i-1&&l[parseInt(h+1)].value<=o;
              )g=l[h],f=l[parseInt(h+1)],c=f.proxy,f.stabbingCount--,f.IsUpper()?(this.TestOverlapBound(k,c)&&this.m_pairManager.RemoveBufferedPair(a,c),c=c.upperBounds,d=c[e],d--,c[e]=d,g.stabbingCount--):(c=c.lowerBounds,d=c[e],d--,c[e]=d,g.stabbingCount++),c=a.lowerBounds,
        d=c[e],d++,c[e]=d,g.Swap(f),h++;
        if(r<0)for(h=m;
               h>0&&p<l[parseInt(h-1)].value;
              )g=l[h],f=l[parseInt(h-1)],c=f.proxy,f.stabbingCount--,f.IsLower()==!0?(this.TestOverlapBound(k,c)&&this.m_pairManager.RemoveBufferedPair(a,c),c=c.lowerBounds,d=c[e],d++,c[e]=d,g.stabbingCount--):(c=c.upperBounds,d=c[e],d++,c[e]=d,g.stabbingCount++),c=a.upperBounds,d=c[e],d--,c[e]=d,g.Swap(f),h--}}
    };
    b2.BroadPhase.prototype.UpdatePairs=function(a){
    this.m_pairManager.Commit(a)
    };

    b2.BroadPhase.prototype.TestOverlap=function(a,b){
    if(a.lowerBounds[0]>b.upperBounds[0])return!1;
    if(b.lowerBounds[0]>a.upperBounds[0])return!1;
    if(a.lowerBounds[1]>b.upperBounds[1])return!1;
    if(b.lowerBounds[1]>a.upperBounds[1])return!1;
    return!0
    };
    b2.BroadPhase.prototype.GetUserData=function(a){
    return a.userData
    };

    b2.BroadPhase.prototype.GetFatAABB=function(a){
    var b=new b2.AABB;
    b.lowerBound.x=this.m_worldAABB.lowerBound.x+this.m_bounds[0][a.lowerBounds[0]].value/this.m_quantizationFactor.x;
    b.lowerBound.y=this.m_worldAABB.lowerBound.y+this.m_bounds[1][a.lowerBounds[1]].value/this.m_quantizationFactor.y;
    b.upperBound.x=this.m_worldAABB.lowerBound.x+this.m_bounds[0][a.upperBounds[0]].value/this.m_quantizationFactor.x;
    b.upperBound.y=this.m_worldAABB.lowerBound.y+this.m_bounds[1][a.upperBounds[1]].value/this.m_quantizationFactor.y;

    return b
    };
    b2.BroadPhase.prototype.GetProxyCount=function(){
    return this.m_proxyCount
    };
    b2.BroadPhase.prototype.Query=function(a,b){
    var c=[],d=[];
    this.ComputeBounds(c,d,b);
    var e=[];
    e.push(0);
    var h=[];
    h.push(0);
    this.QueryAxis(e,h,c[0],d[0],this.m_bounds[0],2*this.m_proxyCount,0);
    this.QueryAxis(e,h,c[1],d[1],this.m_bounds[1],2*this.m_proxyCount,1);
    for(c=0;
        c<this.m_queryResultCount;
        ++c)if(!a(this.m_queryResults[c]))break;
    this.m_queryResultCount=0;
    this.IncrementTimeStamp()
    };

    b2.BroadPhase.prototype.Validate=function(){
    for(var a=0;
        a<2;
        ++a)for(var b=this.m_bounds[a],c=2*this.m_proxyCount,d=0,e=0;
            e<c;
            ++e)b[e].IsLower()==!0?d++:d--
    };
    b2.BroadPhase.prototype.Rebalance=function(){

    };

    b2.BroadPhase.prototype.RayCast=function(a,b){
    var c=new b2.RayCastInput;
    c.p1.SetV(b.p1);
    c.p2.SetV(b.p2);
    c.maxFraction=b.maxFraction;
    var d=(b.p2.x-b.p1.x)*this.m_quantizationFactor.x,e=(b.p2.y-b.p1.y)*this.m_quantizationFactor.y,h=d<-Number.MIN_VALUE?-1:d>Number.MIN_VALUE?1:0,g=e<-Number.MIN_VALUE?-1:e>Number.MIN_VALUE?1:0,f=this.m_quantizationFactor.x*(b.p1.x-this.m_worldAABB.lowerBound.x),i=this.m_quantizationFactor.y*(b.p1.y-this.m_worldAABB.lowerBound.y),j=[],k=[];
    j[0]=parseInt(f)&b2.Settings.USHRT_MAX-
        1;
    j[1]=parseInt(i)&b2.Settings.USHRT_MAX-1;
    k[0]=j[0]+1;
    k[1]=j[1]+1;
    var l=0,n=0,n=[];
    n.push(0);
    var m=[];
    m.push(0);
    this.QueryAxis(n,m,j[0],k[0],this.m_bounds[0],2*this.m_proxyCount,0);
    l=h>=0?m[0]-1:n[0];
    this.QueryAxis(n,m,j[1],k[1],this.m_bounds[1],2*this.m_proxyCount,1);
    n=g>=0?m[0]-1:n[0];
    for(j=0;
        j<this.m_queryResultCount;
        j++)c.maxFraction=a(this.m_queryResults[j],c);
    for(;
        ;
       ){
        m=k=0;
        l+=h>=0?1:-1;
        if(l<0||l>=this.m_proxyCount*2)break;
        h!=0&&(k=(this.m_bounds[0][l].value-f)/d);
        n+=g>=0?1:-1;
        if(n<0||n>=this.m_proxyCount*
           2)break;
        for(g!=0&&(m=(this.m_bounds[1][n].value-i)/e);
        ;
           )if(g==0||h!=0&&k<m){
           if(k>c.maxFraction)break;
           if(h>0?this.m_bounds[0][l].IsLower():this.m_bounds[0][l].IsUpper())if(j=this.m_bounds[0][l].proxy,g>=0){
               if(j.lowerBounds[1]<=n-1&&j.upperBounds[1]>=n)c.maxFraction=a(j,c)}else if(j.lowerBounds[1]<=n&&j.upperBounds[1]>=n+1)c.maxFraction=a(j,c);
           if(c.maxFraction==0)break;
           if(h>0){
               if(l++,l==this.m_proxyCount*2)break}else if(l--,l<0)break;
           k=(this.m_bounds[0][l].value-f)/d}else{
               if(m>c.maxFraction)break;
               if(g>
              0?this.m_bounds[1][n].IsLower():this.m_bounds[1][n].IsUpper())if(j=this.m_bounds[1][n].proxy,h>=0){
                  if(j.lowerBounds[0]<=l-1&&j.upperBounds[0]>=l)c.maxFraction=a(j,c)}else if(j.lowerBounds[0]<=l&&j.upperBounds[0]>=l+1)c.maxFraction=a(j,c);
               if(c.maxFraction==0)break;
               if(g>0){
               if(n++,n==this.m_proxyCount*2)break}else if(n--,n<0)break;
               m=(this.m_bounds[1][n].value-i)/e}break}this.m_queryResultCount=0;
    this.IncrementTimeStamp()
    };

    b2.BroadPhase.prototype.TestOverlapBound=function(a,b){
    for(var c=0;
        c<2;
        ++c){
        var d=this.m_bounds[c],e=d[b.upperBounds[c]];
        if(a.lowerValues[c]>e.value)return!1;
        e=d[b.lowerBounds[c]];
        if(a.upperValues[c]<e.value)return!1}return!0
    };
    b2.BroadPhase.prototype.m_pairManager=new b2.PairManager;
    b2.BroadPhase.prototype.m_proxyPool=[];
    b2.BroadPhase.prototype.m_freeProxy=null;
    b2.BroadPhase.prototype.m_bounds=null;
    b2.BroadPhase.prototype.m_querySortKeys=[];
    b2.BroadPhase.prototype.m_queryResults=[];

    b2.BroadPhase.prototype.m_queryResultCount=0;
    b2.BroadPhase.prototype.m_worldAABB=null;
    b2.BroadPhase.prototype.m_quantizationFactor=new b2.Vec2;
    b2.BroadPhase.prototype.m_proxyCount=0;
    b2.BroadPhase.prototype.m_timeStamp=0;
    b2.Manifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Manifold.prototype.__constructor=function(){
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.ManifoldPoint;
    this.m_localPlaneNormal=new b2.Vec2;
    this.m_localPoint=new b2.Vec2
    };
    b2.Manifold.prototype.__varz=function(){

    };
    b2.Manifold.e_circles=1;
    b2.Manifold.e_faceA=2;
    b2.Manifold.e_faceB=4;

    b2.Manifold.prototype.Reset=function(){
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a].Reset();
    this.m_localPlaneNormal.SetZero();
    this.m_localPoint.SetZero();
    this.m_pointCount=this.m_type=0
    };
    b2.Manifold.prototype.Set=function(a){
    this.m_pointCount=a.m_pointCount;
    for(var b=0;
        b<b2.Settings.b2_maxManifoldPoints;
        b++)this.m_points[b].Set(a.m_points[b]);
    this.m_localPlaneNormal.SetV(a.m_localPlaneNormal);
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_type=a.m_type
    };

    b2.Manifold.prototype.Copy=function(){
    var a=new b2.Manifold;
    a.Set(this);
    return a
    };
    b2.Manifold.prototype.m_points=null;
    b2.Manifold.prototype.m_localPlaneNormal=null;
    b2.Manifold.prototype.m_localPoint=null;
    b2.Manifold.prototype.m_type=0;
    b2.Manifold.prototype.m_pointCount=0;
    b2.CircleShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.CircleShape.prototype,b2.Shape.prototype);
    b2.CircleShape.prototype._super=b2.Shape.prototype;

    b2.CircleShape.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[]);
    this.m_type=b2.Shape.e_circleShape;
    this.m_radius=a
    };
    b2.CircleShape.prototype.__varz=function(){
    this.m_p=new b2.Vec2
    };
    b2.CircleShape.prototype.Copy=function(){
    var a=new b2.CircleShape;
    a.Set(this);
    return a
    };
    b2.CircleShape.prototype.Set=function(a){
    this._super.Set.apply(this,[a]);
    isInstanceOf(a,b2.CircleShape)&&this.m_p.SetV(a.m_p)
    };

    b2.CircleShape.prototype.TestPoint=function(a,b){
    var c=a.R,d=a.position.x+(c.col1.x*this.m_p.x+c.col2.x*this.m_p.y),c=a.position.y+(c.col1.y*this.m_p.x+c.col2.y*this.m_p.y),d=b.x-d,c=b.y-c;
    return d*d+c*c<=this.m_radius*this.m_radius
    };

    b2.CircleShape.prototype.RayCast=function(a,b,c){
    var d=c.R,e=b.p1.x-(c.position.x+(d.col1.x*this.m_p.x+d.col2.x*this.m_p.y)),c=b.p1.y-(c.position.y+(d.col1.y*this.m_p.x+d.col2.y*this.m_p.y)),d=b.p2.x-b.p1.x,h=b.p2.y-b.p1.y,g=e*d+c*h,f=d*d+h*h,i=g*g-f*(e*e+c*c-this.m_radius*this.m_radius);
    if(i<0||f<Number.MIN_VALUE)return!1;
    g=-(g+Math.sqrt(i));
    if(0<=g&&g<=b.maxFraction*f)return g/=f,a.fraction=g,a.normal.x=e+g*d,a.normal.y=c+g*h,a.normal.Normalize(),!0;
    return!1
    };

    b2.CircleShape.prototype.ComputeAABB=function(a,b){
    var c=b.R,d=b.position.x+(c.col1.x*this.m_p.x+c.col2.x*this.m_p.y),c=b.position.y+(c.col1.y*this.m_p.x+c.col2.y*this.m_p.y);
    a.lowerBound.Set(d-this.m_radius,c-this.m_radius);
    a.upperBound.Set(d+this.m_radius,c+this.m_radius)
    };
    b2.CircleShape.prototype.ComputeMass=function(a,b){
    a.mass=b*b2.Settings.b2_pi*this.m_radius*this.m_radius;
    a.center.SetV(this.m_p);
    a.I=a.mass*(0.5*this.m_radius*this.m_radius+(this.m_p.x*this.m_p.x+this.m_p.y*this.m_p.y))
    };

    b2.CircleShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    var c=b2.Math.MulX(c,this.m_p),e=-(b2.Math.Dot(a,c)-b);
    if(e<-this.m_radius+Number.MIN_VALUE)return 0;
    if(e>this.m_radius)return d.SetV(c),Math.PI*this.m_radius*this.m_radius;
    var b=this.m_radius*this.m_radius,h=e*e,e=b*(Math.asin(e/this.m_radius)+Math.PI/2)+e*Math.sqrt(b-h),b=-2/3*Math.pow(b-h,1.5)/e;
    d.x=c.x+a.x*b;
    d.y=c.y+a.y*b;
    return e
    };
    b2.CircleShape.prototype.GetLocalPosition=function(){
    return this.m_p
    };

    b2.CircleShape.prototype.SetLocalPosition=function(a){
    this.m_p.SetV(a)
    };
    b2.CircleShape.prototype.GetRadius=function(){
    return this.m_radius
    };
    b2.CircleShape.prototype.SetRadius=function(a){
    this.m_radius=a
    };
    b2.CircleShape.prototype.m_p=new b2.Vec2;
    b2.Joint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Joint.prototype.__constructor=function(a){
    b2.Settings.b2Assert(a.bodyA!=a.bodyB);
    this.m_type=a.type;
    this.m_next=this.m_prev=null;
    this.m_bodyA=a.bodyA;
    this.m_bodyB=a.bodyB;
    this.m_collideConnected=a.collideConnected;
    this.m_islandFlag=!1;
    this.m_userData=a.userData
    };
    b2.Joint.prototype.__varz=function(){
    this.m_edgeA=new b2.JointEdge;
    this.m_edgeB=new b2.JointEdge;
    this.m_localCenterA=new b2.Vec2;
    this.m_localCenterB=new b2.Vec2
    };

    b2.Joint.Create=function(a){
    var b=null;
    switch(a.type){
    case b2.Joint.e_distanceJoint:b=new b2.DistanceJoint(a);
        break;
    case b2.Joint.e_mouseJoint:b=new b2.MouseJoint(a);
        break;
    case b2.Joint.e_prismaticJoint:b=new b2.PrismaticJoint(a);
        break;
    case b2.Joint.e_revoluteJoint:b=new b2.RevoluteJoint(a);
        break;
    case b2.Joint.e_pulleyJoint:b=new b2.PulleyJoint(a);
        break;
    case b2.Joint.e_gearJoint:b=new b2.GearJoint(a);
        break;
    case b2.Joint.e_lineJoint:b=new b2.LineJoint(a);
        break;
    case b2.Joint.e_weldJoint:b=new b2.WeldJoint(a);

        break;
    case b2.Joint.e_frictionJoint:b=new b2.FrictionJoint(a)}return b
    };
    b2.Joint.Destroy=function(){

    };
    b2.Joint.e_unknownJoint=0;
    b2.Joint.e_revoluteJoint=1;
    b2.Joint.e_prismaticJoint=2;
    b2.Joint.e_distanceJoint=3;
    b2.Joint.e_pulleyJoint=4;
    b2.Joint.e_mouseJoint=5;
    b2.Joint.e_gearJoint=6;
    b2.Joint.e_lineJoint=7;
    b2.Joint.e_weldJoint=8;
    b2.Joint.e_frictionJoint=9;
    b2.Joint.e_inactiveLimit=0;
    b2.Joint.e_atLowerLimit=1;
    b2.Joint.e_atUpperLimit=2;
    b2.Joint.e_equalLimits=3;

    b2.Joint.prototype.InitVelocityConstraints=function(){

    };
    b2.Joint.prototype.SolveVelocityConstraints=function(){

    };
    b2.Joint.prototype.FinalizeVelocityConstraints=function(){

    };
    b2.Joint.prototype.SolvePositionConstraints=function(){
    return!1
    };
    b2.Joint.prototype.GetType=function(){
    return this.m_type
    };
    b2.Joint.prototype.GetAnchorA=function(){
    return null
    };
    b2.Joint.prototype.GetAnchorB=function(){
    return null
    };
    b2.Joint.prototype.GetReactionForce=function(){
    return null
    };

    b2.Joint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.Joint.prototype.GetBodyA=function(){
    return this.m_bodyA
    };
    b2.Joint.prototype.GetBodyB=function(){
    return this.m_bodyB
    };
    b2.Joint.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Joint.prototype.GetUserData=function(){
    return this.m_userData
    };
    b2.Joint.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Joint.prototype.IsActive=function(){
    return this.m_bodyA.IsActive()&&this.m_bodyB.IsActive()
    };
    b2.Joint.prototype.m_type=0;

    b2.Joint.prototype.m_prev=null;
    b2.Joint.prototype.m_next=null;
    b2.Joint.prototype.m_edgeA=new b2.JointEdge;
    b2.Joint.prototype.m_edgeB=new b2.JointEdge;
    b2.Joint.prototype.m_bodyA=null;
    b2.Joint.prototype.m_bodyB=null;
    b2.Joint.prototype.m_islandFlag=null;
    b2.Joint.prototype.m_collideConnected=null;
    b2.Joint.prototype.m_userData=null;
    b2.Joint.prototype.m_localCenterA=new b2.Vec2;
    b2.Joint.prototype.m_localCenterB=new b2.Vec2;
    b2.Joint.prototype.m_invMassA=null;
    b2.Joint.prototype.m_invMassB=null;

    b2.Joint.prototype.m_invIA=null;
    b2.Joint.prototype.m_invIB=null;
    b2.LineJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.LineJoint.prototype,b2.Joint.prototype);
    b2.LineJoint.prototype._super=b2.Joint.prototype;

    b2.LineJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x=-this.m_localXAxis1.y;
    this.m_localYAxis1.y=this.m_localXAxis1.x;
    this.m_impulse.SetZero();
    this.m_motorImpulse=this.m_motorMass=0;
    this.m_lowerTranslation=a.lowerTranslation;
    this.m_upperTranslation=a.upperTranslation;
    this.m_maxMotorForce=a.maxMotorForce;
    this.m_motorSpeed=
        a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
    };
    b2.LineJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_localXAxis1=new b2.Vec2;
    this.m_localYAxis1=new b2.Vec2;
    this.m_axis=new b2.Vec2;
    this.m_perp=new b2.Vec2;
    this.m_K=new b2.Mat22;
    this.m_impulse=new b2.Vec2
    };

    b2.LineJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    this.m_localCenterA.SetV(b.GetLocalCenter());
    this.m_localCenterB.SetV(c.GetLocalCenter());
    var h=b.GetTransform();
    c.GetTransform();
    d=b.m_xf.R;
    var g=this.m_localAnchor1.x-this.m_localCenterA.x,f=this.m_localAnchor1.y-this.m_localCenterA.y;
    e=d.col1.x*g+d.col2.x*f;
    f=d.col1.y*g+d.col2.y*f;
    g=e;
    d=c.m_xf.R;
    var i=this.m_localAnchor2.x-this.m_localCenterB.x,j=this.m_localAnchor2.y-this.m_localCenterB.y;
    e=d.col1.x*
        i+d.col2.x*j;
    j=d.col1.y*i+d.col2.y*j;
    i=e;
    d=c.m_sweep.c.x+i-b.m_sweep.c.x-g;
    e=c.m_sweep.c.y+j-b.m_sweep.c.y-f;
    this.m_invMassA=b.m_invMass;
    this.m_invMassB=c.m_invMass;
    this.m_invIA=b.m_invI;
    this.m_invIB=c.m_invI;
    this.m_axis.SetV(b2.Math.MulMV(h.R,this.m_localXAxis1));
    this.m_a1=(d+g)*this.m_axis.y-(e+f)*this.m_axis.x;
    this.m_a2=i*this.m_axis.y-j*this.m_axis.x;
    this.m_motorMass=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_a1*this.m_a1+this.m_invIB*this.m_a2*this.m_a2;
    this.m_motorMass=this.m_motorMass>
        Number.MIN_VALUE?1/this.m_motorMass:0;
    this.m_perp.SetV(b2.Math.MulMV(h.R,this.m_localYAxis1));
    this.m_s1=(d+g)*this.m_perp.y-(e+f)*this.m_perp.x;
    this.m_s2=i*this.m_perp.y-j*this.m_perp.x;
    h=this.m_invMassA;
    g=this.m_invMassB;
    f=this.m_invIA;
    i=this.m_invIB;
    this.m_K.col1.x=h+g+f*this.m_s1*this.m_s1+i*this.m_s2*this.m_s2;
    this.m_K.col1.y=f*this.m_s1*this.m_a1+i*this.m_s2*this.m_a2;
    this.m_K.col2.x=this.m_K.col1.y;
    this.m_K.col2.y=h+g+f*this.m_a1*this.m_a1+i*this.m_a2*this.m_a2;
    if(this.m_enableLimit)if(d=this.m_axis.x*
                 d+this.m_axis.y*e,b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop)this.m_limitState=b2.Joint.e_equalLimits;
    else if(d<=this.m_lowerTranslation){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_limitState=b2.Joint.e_atLowerLimit,this.m_impulse.y=0}else if(d>=this.m_upperTranslation){
        if(this.m_limitState!=b2.Joint.e_atUpperLimit)this.m_limitState=b2.Joint.e_atUpperLimit,this.m_impulse.y=0}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.y=0;

    else this.m_limitState=b2.Joint.e_inactiveLimit;
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=a.dtRatio,a=this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.x,d=this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.y,e=this.m_impulse.x*this.m_s1+(this.m_motorImpulse+this.m_impulse.y)*this.m_a1,h=this.m_impulse.x*this.m_s2+(this.m_motorImpulse+this.m_impulse.y)*
            this.m_a2,b.m_linearVelocity.x-=this.m_invMassA*a,b.m_linearVelocity.y-=this.m_invMassA*d,b.m_angularVelocity-=this.m_invIA*e,c.m_linearVelocity.x+=this.m_invMassB*a,c.m_linearVelocity.y+=this.m_invMassB*d,c.m_angularVelocity+=this.m_invIB*h):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.LineJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d=b.m_linearVelocity,e=b.m_angularVelocity,h=c.m_linearVelocity,g=c.m_angularVelocity,f,i,j;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)j=this.m_motorMass*(this.m_motorSpeed-(this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e)),f=this.m_motorImpulse,a=a.dt*this.m_maxMotorForce,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+j,-a,a),j=this.m_motorImpulse-f,f=
        j*this.m_axis.x,a=j*this.m_axis.y,i=j*this.m_a1,j*=this.m_a2,d.x-=this.m_invMassA*f,d.y-=this.m_invMassA*a,e-=this.m_invIA*i,h.x+=this.m_invMassB*f,h.y+=this.m_invMassB*a,g+=this.m_invIB*j;
    a=this.m_perp.x*(h.x-d.x)+this.m_perp.y*(h.y-d.y)+this.m_s2*g-this.m_s1*e;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        i=this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e;
        f=this.m_impulse.Copy();
        j=this.m_K.Solve(new b2.Vec2,-a,-i);
        this.m_impulse.Add(j);
        if(this.m_limitState==
           b2.Joint.e_atLowerLimit)this.m_impulse.y=b2.Math.Max(this.m_impulse.y,0);
        else if(this.m_limitState==b2.Joint.e_atUpperLimit)this.m_impulse.y=b2.Math.Min(this.m_impulse.y,0);
        a=-a-(this.m_impulse.y-f.y)*this.m_K.col2.x;
        this.m_impulse.x=this.m_K.col1.x!=0?a/this.m_K.col1.x+f.x:f.x;
        j.x=this.m_impulse.x-f.x;
        j.y=this.m_impulse.y-f.y;
        f=j.x*this.m_perp.x+j.y*this.m_axis.x;
        a=j.x*this.m_perp.y+j.y*this.m_axis.y;
        i=j.x*this.m_s1+j.y*this.m_a1;
        j=j.x*this.m_s2+j.y*this.m_a2}else j=this.m_K.col1.x!=0?-a/this.m_K.col1.x:
        0,this.m_impulse.x+=j,f=j*this.m_perp.x,a=j*this.m_perp.y,i=j*this.m_s1,j*=this.m_s2;
    d.x-=this.m_invMassA*f;
    d.y-=this.m_invMassA*a;
    e-=this.m_invIA*i;
    h.x+=this.m_invMassB*f;
    h.y+=this.m_invMassB*a;
    g+=this.m_invIB*j;
    b.m_linearVelocity.SetV(d);
    b.m_angularVelocity=e;
    c.m_linearVelocity.SetV(h);
    c.m_angularVelocity=g
    };

    b2.LineJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.m_sweep.c,d=a.m_sweep.a,e=b.m_sweep.c,h=b.m_sweep.a,g,f,i,j,k,l=0,n=0;
    i=!1;
    var m=0,o=b2.Mat22.FromAngle(d);
    j=b2.Mat22.FromAngle(h);
    g=o;
    var n=this.m_localAnchor1.x-this.m_localCenterA.x,p=this.m_localAnchor1.y-this.m_localCenterA.y;
    f=g.col1.x*n+g.col2.x*p;
    p=g.col1.y*n+g.col2.y*p;
    n=f;
    g=j;
    j=this.m_localAnchor2.x-this.m_localCenterB.x;
    k=this.m_localAnchor2.y-this.m_localCenterB.y;
    f=g.col1.x*j+g.col2.x*k;
    k=
        g.col1.y*j+g.col2.y*k;
    j=f;
    g=e.x+j-c.x-n;
    f=e.y+k-c.y-p;
    if(this.m_enableLimit){
        this.m_axis=b2.Math.MulMV(o,this.m_localXAxis1);
        this.m_a1=(g+n)*this.m_axis.y-(f+p)*this.m_axis.x;
        this.m_a2=j*this.m_axis.y-k*this.m_axis.x;
        var q=this.m_axis.x*g+this.m_axis.y*f;
        b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop?(m=b2.Math.Clamp(q,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection),l=b2.Math.Abs(q),i=!0):q<=this.m_lowerTranslation?(m=b2.Math.Clamp(q-
                                                                                                                                   this.m_lowerTranslation+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),l=this.m_lowerTranslation-q,i=!0):q>=this.m_upperTranslation&&(m=b2.Math.Clamp(q-this.m_upperTranslation+b2.Settings.b2_linearSlop,0,b2.Settings.b2_maxLinearCorrection),l=q-this.m_upperTranslation,i=!0)}this.m_perp=b2.Math.MulMV(o,this.m_localYAxis1);
    this.m_s1=(g+n)*this.m_perp.y-(f+p)*this.m_perp.x;
    this.m_s2=j*this.m_perp.y-k*this.m_perp.x;
    o=new b2.Vec2;
    p=this.m_perp.x*g+this.m_perp.y*f;
    l=b2.Math.Max(l,b2.Math.Abs(p));

    n=0;
    i?(i=this.m_invMassA,j=this.m_invMassB,k=this.m_invIA,g=this.m_invIB,this.m_K.col1.x=i+j+k*this.m_s1*this.m_s1+g*this.m_s2*this.m_s2,this.m_K.col1.y=k*this.m_s1*this.m_a1+g*this.m_s2*this.m_a2,this.m_K.col2.x=this.m_K.col1.y,this.m_K.col2.y=i+j+k*this.m_a1*this.m_a1+g*this.m_a2*this.m_a2,this.m_K.Solve(o,-p,-m)):(i=this.m_invMassA,j=this.m_invMassB,k=this.m_invIA,g=this.m_invIB,m=i+j+k*this.m_s1*this.m_s1+g*this.m_s2*this.m_s2,o.x=m!=0?-p/m:0,o.y=0);
    m=o.x*this.m_perp.x+o.y*this.m_axis.x;
    i=o.x*
        this.m_perp.y+o.y*this.m_axis.y;
    p=o.x*this.m_s1+o.y*this.m_a1;
    o=o.x*this.m_s2+o.y*this.m_a2;
    c.x-=this.m_invMassA*m;
    c.y-=this.m_invMassA*i;
    d-=this.m_invIA*p;
    e.x+=this.m_invMassB*m;
    e.y+=this.m_invMassB*i;
    h+=this.m_invIB*o;
    a.m_sweep.a=d;
    b.m_sweep.a=h;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return l<=b2.Settings.b2_linearSlop&&n<=b2.Settings.b2_angularSlop
    };
    b2.LineJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };

    b2.LineJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2.LineJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*(this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.x),a*(this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.y))
    };
    b2.LineJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.y
    };

    b2.LineJoint.prototype.GetJointTranslation=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.GetWorldPoint(this.m_localAnchor1),d=b.GetWorldPoint(this.m_localAnchor2),b=d.x-c.x,c=d.y-c.y,a=a.GetWorldVector(this.m_localXAxis1);
    return a.x*b+a.y*c
    };

    b2.LineJoint.prototype.GetJointSpeed=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h;
    c=b.m_sweep.c.x+g-(a.m_sweep.c.x+d);
    var h=b.m_sweep.c.y+f-(a.m_sweep.c.y+e),i=a.GetWorldVector(this.m_localXAxis1),
    j=a.m_linearVelocity,k=b.m_linearVelocity,a=a.m_angularVelocity,b=b.m_angularVelocity;
    return c*-a*i.y+h*a*i.x+(i.x*(k.x+-b*f-j.x- -a*e)+i.y*(k.y+b*g-j.y-a*d))
    };
    b2.LineJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };
    b2.LineJoint.prototype.EnableLimit=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit=a
    };
    b2.LineJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerTranslation
    };
    b2.LineJoint.prototype.GetUpperLimit=function(){
    return this.m_upperTranslation
    };

    b2.LineJoint.prototype.SetLimits=function(a,b){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation=a;
    this.m_upperTranslation=b
    };
    b2.LineJoint.prototype.IsMotorEnabled=function(){
    return this.m_enableMotor
    };
    b2.LineJoint.prototype.EnableMotor=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor=a
    };
    b2.LineJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };

    b2.LineJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.LineJoint.prototype.SetMaxMotorForce=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce=a
    };
    b2.LineJoint.prototype.GetMaxMotorForce=function(){
    return this.m_maxMotorForce
    };
    b2.LineJoint.prototype.GetMotorForce=function(){
    return this.m_motorImpulse
    };
    b2.LineJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.LineJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.LineJoint.prototype.m_localXAxis1=new b2.Vec2;

    b2.LineJoint.prototype.m_localYAxis1=new b2.Vec2;
    b2.LineJoint.prototype.m_axis=new b2.Vec2;
    b2.LineJoint.prototype.m_perp=new b2.Vec2;
    b2.LineJoint.prototype.m_s1=null;
    b2.LineJoint.prototype.m_s2=null;
    b2.LineJoint.prototype.m_a1=null;
    b2.LineJoint.prototype.m_a2=null;
    b2.LineJoint.prototype.m_K=new b2.Mat22;
    b2.LineJoint.prototype.m_impulse=new b2.Vec2;
    b2.LineJoint.prototype.m_motorMass=null;
    b2.LineJoint.prototype.m_motorImpulse=null;
    b2.LineJoint.prototype.m_lowerTranslation=null;

    b2.LineJoint.prototype.m_upperTranslation=null;
    b2.LineJoint.prototype.m_maxMotorForce=null;
    b2.LineJoint.prototype.m_motorSpeed=null;
    b2.LineJoint.prototype.m_enableLimit=null;
    b2.LineJoint.prototype.m_enableMotor=null;
    b2.LineJoint.prototype.m_limitState=0;
    b2.ContactSolver=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactSolver.prototype.__constructor=function(){

    };
    b2.ContactSolver.prototype.__varz=function(){
    this.m_step=new b2.TimeStep;
    this.m_constraints=[]
    };

    b2.ContactSolver.s_worldManifold=new b2.WorldManifold;
    b2.ContactSolver.s_psm=new b2.PositionSolverManifold;

    b2.ContactSolver.prototype.Initialize=function(a,b,c,d){
    var e;
    this.m_step.Set(a);
    this.m_allocator=d;
    for(this.m_constraintCount=c;
        this.m_constraints.length<this.m_constraintCount;
       )this.m_constraints[this.m_constraints.length]=new b2.ContactConstraint;
    for(a=0;
        a<c;
        ++a){
        e=b[a];
        var d=e.m_fixtureA,h=e.m_fixtureB,g=d.m_shape.m_radius,f=h.m_shape.m_radius,i=d.m_body,j=h.m_body,k=e.GetManifold(),l=b2.Settings.b2MixFriction(d.GetFriction(),h.GetFriction()),n=b2.Settings.b2MixRestitution(d.GetRestitution(),
                                                                                                                h.GetRestitution()),m=i.m_linearVelocity.x,o=i.m_linearVelocity.y,p=j.m_linearVelocity.x,q=j.m_linearVelocity.y,r=i.m_angularVelocity,y=j.m_angularVelocity;
        b2.Settings.b2Assert(k.m_pointCount>0);
        b2.ContactSolver.s_worldManifold.Initialize(k,i.m_xf,g,j.m_xf,f);
        h=b2.ContactSolver.s_worldManifold.m_normal.x;
        e=b2.ContactSolver.s_worldManifold.m_normal.y;
        d=this.m_constraints[a];
        d.bodyA=i;
        d.bodyB=j;
        d.manifold=k;
        d.normal.x=h;
        d.normal.y=e;
        d.pointCount=k.m_pointCount;
        d.friction=l;
        d.restitution=n;
        d.localPlaneNormal.x=
        k.m_localPlaneNormal.x;
        d.localPlaneNormal.y=k.m_localPlaneNormal.y;
        d.localPoint.x=k.m_localPoint.x;
        d.localPoint.y=k.m_localPoint.y;
        d.radius=g+f;
        d.type=k.m_type;
        for(g=0;
        g<d.pointCount;
        ++g){
        l=k.m_points[g];
        f=d.points[g];
        f.normalImpulse=l.m_normalImpulse;
        f.tangentImpulse=l.m_tangentImpulse;
        f.localPoint.SetV(l.m_localPoint);
        var l=f.rA.x=b2.ContactSolver.s_worldManifold.m_points[g].x-i.m_sweep.c.x,n=f.rA.y=b2.ContactSolver.s_worldManifold.m_points[g].y-i.m_sweep.c.y,v=f.rB.x=b2.ContactSolver.s_worldManifold.m_points[g].x-
            j.m_sweep.c.x,x=f.rB.y=b2.ContactSolver.s_worldManifold.m_points[g].y-j.m_sweep.c.y,s=l*e-n*h,u=v*e-x*h;
        s*=s;
        u*=u;
        f.normalMass=1/(i.m_invMass+j.m_invMass+i.m_invI*s+j.m_invI*u);
        var w=i.m_mass*i.m_invMass+j.m_mass*j.m_invMass;
        w+=i.m_mass*i.m_invI*s+j.m_mass*j.m_invI*u;
        f.equalizedMass=1/w;
        u=e;
        w=-h;
        s=l*w-n*u;
        u=v*w-x*u;
        s*=s;
        u*=u;
        f.tangentMass=1/(i.m_invMass+j.m_invMass+i.m_invI*s+j.m_invI*u);
        f.velocityBias=0;
        l=d.normal.x*(p+-y*x-m- -r*n)+d.normal.y*(q+y*v-o-r*l);
        l<-b2.Settings.b2_velocityThreshold&&(f.velocityBias+=
                              -d.restitution*l)}if(d.pointCount==2)q=d.points[0],p=d.points[1],k=i.m_invMass,i=i.m_invI,m=j.m_invMass,j=j.m_invI,o=q.rA.x*e-q.rA.y*h,q=q.rB.x*e-q.rB.y*h,r=p.rA.x*e-p.rA.y*h,p=p.rB.x*e-p.rB.y*h,h=k+m+i*o*o+j*q*q,e=k+m+i*r*r+j*p*p,j=k+m+i*o*r+j*q*p,h*h<100*(h*e-j*j)?(d.K.col1.Set(h,j),d.K.col2.Set(j,e),d.K.GetInverse(d.normalMass)):d.pointCount=1}
    };

    b2.ContactSolver.prototype.InitVelocityConstraints=function(a){
    for(var b=0;
        b<this.m_constraintCount;
        ++b){
        var c=this.m_constraints[b],d=c.bodyA,e=c.bodyB,h=d.m_invMass,g=d.m_invI,f=e.m_invMass,i=e.m_invI,j=c.normal.x,k=c.normal.y,l=k,n=-j,m=0,o=0;
        if(a.warmStarting){
        o=c.pointCount;
        for(m=0;
            m<o;
            ++m){
            var p=c.points[m];
            p.normalImpulse*=a.dtRatio;
            p.tangentImpulse*=a.dtRatio;
            var q=p.normalImpulse*j+p.tangentImpulse*l,r=p.normalImpulse*k+p.tangentImpulse*n;
            d.m_angularVelocity-=g*(p.rA.x*r-p.rA.y*q);
            d.m_linearVelocity.x-=
            h*q;
            d.m_linearVelocity.y-=h*r;
            e.m_angularVelocity+=i*(p.rB.x*r-p.rB.y*q);
            e.m_linearVelocity.x+=f*q;
            e.m_linearVelocity.y+=f*r}}else{
            o=c.pointCount;
            for(m=0;
                m<o;
                ++m)d=c.points[m],d.normalImpulse=0,d.tangentImpulse=0}}
    };

    b2.ContactSolver.prototype.SolveVelocityConstraints=function(){
    for(var a=0,b,c,d,e,h,g,f,i,j,k=0;
        k<this.m_constraintCount;
        ++k){
        e=this.m_constraints[k];
        var l=e.bodyA,n=e.bodyB,m=l.m_angularVelocity,o=n.m_angularVelocity,p=l.m_linearVelocity,q=n.m_linearVelocity,r=l.m_invMass,y=l.m_invI,v=n.m_invMass,x=n.m_invI;
        f=e.normal.x;
        var s=i=e.normal.y;
        j=-f;
        g=e.friction;
        for(a=0;
        a<e.pointCount;
        a++)b=e.points[a],c=q.x-o*b.rB.y-p.x+m*b.rA.y,d=q.y+o*b.rB.x-p.y-m*b.rA.x,c=c*s+d*j,c=b.tangentMass*-c,d=g*b.normalImpulse,
        d=b2.Math.Clamp(b.tangentImpulse+c,-d,d),c=d-b.tangentImpulse,h=c*s,c*=j,p.x-=r*h,p.y-=r*c,m-=y*(b.rA.x*c-b.rA.y*h),q.x+=v*h,q.y+=v*c,o+=x*(b.rB.x*c-b.rB.y*h),b.tangentImpulse=d;
        if(e.pointCount==1)b=e.points[0],c=q.x+-o*b.rB.y-p.x- -m*b.rA.y,d=q.y+o*b.rB.x-p.y-m*b.rA.x,e=c*f+d*i,c=-b.normalMass*(e-b.velocityBias),d=b.normalImpulse+c,d=d>0?d:0,c=d-b.normalImpulse,h=c*f,c*=i,p.x-=r*h,p.y-=r*c,m-=y*(b.rA.x*c-b.rA.y*h),q.x+=v*h,q.y+=v*c,o+=x*(b.rB.x*c-b.rB.y*h),b.normalImpulse=d;
        else{
        b=e.points[0];
        a=
            e.points[1];
        c=b.normalImpulse;
        g=a.normalImpulse;
        var u=(q.x-o*b.rB.y-p.x+m*b.rA.y)*f+(q.y+o*b.rB.x-p.y-m*b.rA.x)*i,w=(q.x-o*a.rB.y-p.x+m*a.rA.y)*f+(q.y+o*a.rB.x-p.y-m*a.rA.x)*i;
        d=u-b.velocityBias;
        h=w-a.velocityBias;
        j=e.K;
        d-=j.col1.x*c+j.col2.x*g;
        for(h-=j.col1.y*c+j.col2.y*g;
            ;
           ){
            j=e.normalMass;
            s=-(j.col1.x*d+j.col2.x*h);
            j=-(j.col1.y*d+j.col2.y*h);
            if(s>=0&&j>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*
                  c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}s=-b.normalMass*d;
            j=0;
            w=e.K.col1.y*s+h;
            if(s>=0&&w>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}s=0;
            j=-a.normalMass*h;
            u=e.K.col2.x*j+d;
            if(j>=0&&u>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*
                (e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}j=s=0;
            u=d;
            w=h;
            if(u>=0&&w>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}break}}l.m_angularVelocity=m;
        n.m_angularVelocity=o}
    };

    b2.ContactSolver.prototype.FinalizeVelocityConstraints=function(){
    for(var a=0;
        a<this.m_constraintCount;
        ++a)for(var b=this.m_constraints[a],c=b.manifold,d=0;
            d<b.pointCount;
            ++d){
        var e=c.m_points[d],h=b.points[d];
        e.m_normalImpulse=h.normalImpulse;
        e.m_tangentImpulse=h.tangentImpulse}
    };

    b2.ContactSolver.prototype.SolvePositionConstraints=function(a){
    for(var b=0,c=0;
        c<this.m_constraintCount;
        c++){
        var d=this.m_constraints[c],e=d.bodyA,h=d.bodyB,g=e.m_mass*e.m_invMass,f=e.m_mass*e.m_invI,i=h.m_mass*h.m_invMass,j=h.m_mass*h.m_invI;
        b2.ContactSolver.s_psm.Initialize(d);
        for(var k=b2.ContactSolver.s_psm.m_normal,l=0;
        l<d.pointCount;
        l++){
        var n=d.points[l],m=b2.ContactSolver.s_psm.m_points[l],o=b2.ContactSolver.s_psm.m_separations[l],p=m.x-e.m_sweep.c.x,q=m.y-e.m_sweep.c.y,r=m.x-h.m_sweep.c.x,
        m=m.y-h.m_sweep.c.y,b=b<o?b:o,o=b2.Math.Clamp(a*(o+b2.Settings.b2_linearSlop),-b2.Settings.b2_maxLinearCorrection,0);
        o*=-n.equalizedMass;
        n=o*k.x;
        o*=k.y;
        e.m_sweep.c.x-=g*n;
        e.m_sweep.c.y-=g*o;
        e.m_sweep.a-=f*(p*o-q*n);
        e.SynchronizeTransform();
        h.m_sweep.c.x+=i*n;
        h.m_sweep.c.y+=i*o;
        h.m_sweep.a+=j*(r*o-m*n);
        h.SynchronizeTransform()}}return b>-1.5*b2.Settings.b2_linearSlop
    };
    b2.ContactSolver.prototype.m_step=new b2.TimeStep;
    b2.ContactSolver.prototype.m_allocator=null;

    b2.ContactSolver.prototype.m_constraints=[];
    b2.ContactSolver.prototype.m_constraintCount=0;
    b2.Simplex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Simplex.prototype.__constructor=function(){
    this.m_vertices[0]=this.m_v1;
    this.m_vertices[1]=this.m_v2;
    this.m_vertices[2]=this.m_v3
    };
    b2.Simplex.prototype.__varz=function(){
    this.m_v1=new b2.SimplexVertex;
    this.m_v2=new b2.SimplexVertex;
    this.m_v3=new b2.SimplexVertex;
    this.m_vertices=Array(3)
    };

    b2.Simplex.prototype.ReadCache=function(a,b,c,d,e){
    b2.Settings.b2Assert(0<=a.count&&a.count<=3);
    var h,g;
    this.m_count=a.count;
    for(var f=this.m_vertices,i=0;
        i<this.m_count;
        i++){
        var j=f[i];
        j.indexA=a.indexA[i];
        j.indexB=a.indexB[i];
        h=b.GetVertex(j.indexA);
        g=d.GetVertex(j.indexB);
        j.wA=b2.Math.MulX(c,h);
        j.wB=b2.Math.MulX(e,g);
        j.w=b2.Math.SubtractVV(j.wB,j.wA);
        j.a=0}if(this.m_count>1&&(a=a.metric,h=this.GetMetric(),h<0.5*a||2*a<h||h<Number.MIN_VALUE))this.m_count=0;
    if(this.m_count==0)j=f[0],j.indexA=0,j.indexB=
        0,h=b.GetVertex(0),g=d.GetVertex(0),j.wA=b2.Math.MulX(c,h),j.wB=b2.Math.MulX(e,g),j.w=b2.Math.SubtractVV(j.wB,j.wA),this.m_count=1
    };
    b2.Simplex.prototype.WriteCache=function(a){
    a.metric=this.GetMetric();
    a.count=parseInt(this.m_count);
    for(var b=this.m_vertices,c=0;
        c<this.m_count;
        c++)a.indexA[c]=parseInt(b[c].indexA),a.indexB[c]=parseInt(b[c].indexB)
    };

    b2.Simplex.prototype.GetSearchDirection=function(){
    switch(this.m_count){
    case 1:return this.m_v1.w.GetNegative();
    case 2:var a=b2.Math.SubtractVV(this.m_v2.w,this.m_v1.w);
        return b2.Math.CrossVV(a,this.m_v1.w.GetNegative())>0?b2.Math.CrossFV(1,a):b2.Math.CrossVF(a,1);
    default:return b2.Settings.b2Assert(!1),new b2.Vec2}
    };

    b2.Simplex.prototype.GetClosestPoint=function(){
    switch(this.m_count){
    case 0:return b2.Settings.b2Assert(!1),new b2.Vec2;
    case 1:return this.m_v1.w;
    case 2:return new b2.Vec2(this.m_v1.a*this.m_v1.w.x+this.m_v2.a*this.m_v2.w.x,this.m_v1.a*this.m_v1.w.y+this.m_v2.a*this.m_v2.w.y);
    default:return b2.Settings.b2Assert(!1),new b2.Vec2}
    };

    b2.Simplex.prototype.GetWitnessPoints=function(a,b){
    switch(this.m_count){
    case 0:b2.Settings.b2Assert(!1);
        break;
    case 1:a.SetV(this.m_v1.wA);
        b.SetV(this.m_v1.wB);
        break;
    case 2:a.x=this.m_v1.a*this.m_v1.wA.x+this.m_v2.a*this.m_v2.wA.x;
        a.y=this.m_v1.a*this.m_v1.wA.y+this.m_v2.a*this.m_v2.wA.y;
        b.x=this.m_v1.a*this.m_v1.wB.x+this.m_v2.a*this.m_v2.wB.x;
        b.y=this.m_v1.a*this.m_v1.wB.y+this.m_v2.a*this.m_v2.wB.y;
        break;
    case 3:b.x=a.x=this.m_v1.a*this.m_v1.wA.x+this.m_v2.a*this.m_v2.wA.x+this.m_v3.a*this.m_v3.wA.x;

        b.y=a.y=this.m_v1.a*this.m_v1.wA.y+this.m_v2.a*this.m_v2.wA.y+this.m_v3.a*this.m_v3.wA.y;
        break;
    default:b2.Settings.b2Assert(!1)}
    };
    b2.Simplex.prototype.GetMetric=function(){
    switch(this.m_count){
    case 0:return b2.Settings.b2Assert(!1),0;
    case 1:return 0;
    case 2:return b2.Math.SubtractVV(this.m_v1.w,this.m_v2.w).Length();
    case 3:return b2.Math.CrossVV(b2.Math.SubtractVV(this.m_v2.w,this.m_v1.w),b2.Math.SubtractVV(this.m_v3.w,this.m_v1.w));
    default:return b2.Settings.b2Assert(!1),0}
    };

    b2.Simplex.prototype.Solve2=function(){
    var a=this.m_v1.w,b=this.m_v2.w,c=b2.Math.SubtractVV(b,a),a=-(a.x*c.x+a.y*c.y);
    a<=0?this.m_count=this.m_v1.a=1:(b=b.x*c.x+b.y*c.y,b<=0?(this.m_count=this.m_v2.a=1,this.m_v1.Set(this.m_v2)):(c=1/(b+a),this.m_v1.a=b*c,this.m_v2.a=a*c,this.m_count=2))
    };

    b2.Simplex.prototype.Solve3=function(){
    var a=this.m_v1.w,b=this.m_v2.w,c=this.m_v3.w,d=b2.Math.SubtractVV(b,a),e=b2.Math.Dot(a,d),h=b2.Math.Dot(b,d),e=-e,g=b2.Math.SubtractVV(c,a),f=b2.Math.Dot(a,g),i=b2.Math.Dot(c,g),f=-f,j=b2.Math.SubtractVV(c,b),k=b2.Math.Dot(b,j),j=b2.Math.Dot(c,j),k=-k,g=b2.Math.CrossVV(d,g),d=g*b2.Math.CrossVV(b,c),c=g*b2.Math.CrossVV(c,a),a=g*b2.Math.CrossVV(a,b);
    e<=0&&f<=0?this.m_count=this.m_v1.a=1:h>0&&e>0&&a<=0?(i=1/(h+e),this.m_v1.a=h*i,this.m_v2.a=e*i,this.m_count=2):
        i>0&&f>0&&c<=0?(h=1/(i+f),this.m_v1.a=i*h,this.m_v3.a=f*h,this.m_count=2,this.m_v2.Set(this.m_v3)):h<=0&&k<=0?(this.m_count=this.m_v2.a=1,this.m_v1.Set(this.m_v2)):i<=0&&j<=0?(this.m_count=this.m_v3.a=1,this.m_v1.Set(this.m_v3)):j>0&&k>0&&d<=0?(h=1/(j+k),this.m_v2.a=j*h,this.m_v3.a=k*h,this.m_count=2,this.m_v1.Set(this.m_v3)):(h=1/(d+c+a),this.m_v1.a=d*h,this.m_v2.a=c*h,this.m_v3.a=a*h,this.m_count=3)
    };
    b2.Simplex.prototype.m_v1=new b2.SimplexVertex;
    b2.Simplex.prototype.m_v2=new b2.SimplexVertex;

    b2.Simplex.prototype.m_v3=new b2.SimplexVertex;
    b2.Simplex.prototype.m_vertices=Array(3);
    b2.Simplex.prototype.m_count=0;
    b2.WeldJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.WeldJoint.prototype,b2.Joint.prototype);
    b2.WeldJoint.prototype._super=b2.Joint.prototype;

    b2.WeldJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_referenceAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_mass=new b2.Mat33
    };
    b2.WeldJoint.prototype.__varz=function(){
    this.m_localAnchorA=new b2.Vec2;
    this.m_localAnchorB=new b2.Vec2;
    this.m_impulse=new b2.Vec3;
    this.m_mass=new b2.Mat33
    };

    b2.WeldJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchorA.x-d.m_sweep.localCenter.x,g=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchorB.x-e.m_sweep.localCenter.x,i=this.m_localAnchorB.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    b=d.m_invMass;
    c=e.m_invMass;
    var j=d.m_invI,k=e.m_invI;
    this.m_mass.col1.x=b+c+g*
        g*j+i*i*k;
    this.m_mass.col2.x=-g*h*j-i*f*k;
    this.m_mass.col3.x=-g*j-i*k;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=b+c+h*h*j+f*f*k;
    this.m_mass.col3.y=h*j+f*k;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=j+k;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_impulse.z*=a.dtRatio,d.m_linearVelocity.x-=b*this.m_impulse.x,d.m_linearVelocity.y-=b*this.m_impulse.y,d.m_angularVelocity-=j*(h*this.m_impulse.y-g*this.m_impulse.x+
                                                                                                              this.m_impulse.z),e.m_linearVelocity.x+=c*this.m_impulse.x,e.m_linearVelocity.y+=c*this.m_impulse.y,e.m_angularVelocity+=k*(f*this.m_impulse.y-i*this.m_impulse.x+this.m_impulse.z)):this.m_impulse.SetZero()
    };

    b2.WeldJoint.prototype.SolveVelocityConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB,e=c.m_linearVelocity,h=c.m_angularVelocity,g=d.m_linearVelocity,f=d.m_angularVelocity,i=c.m_invMass,j=d.m_invMass,k=c.m_invI,l=d.m_invI;
    a=c.m_xf.R;
    var n=this.m_localAnchorA.x-c.m_sweep.localCenter.x,m=this.m_localAnchorA.y-c.m_sweep.localCenter.y;
    b=a.col1.x*n+a.col2.x*m;
    m=a.col1.y*n+a.col2.y*m;
    n=b;
    a=d.m_xf.R;
    var o=this.m_localAnchorB.x-d.m_sweep.localCenter.x,p=this.m_localAnchorB.y-d.m_sweep.localCenter.y;

    b=a.col1.x*o+a.col2.x*p;
    p=a.col1.y*o+a.col2.y*p;
    o=b;
    a=g.x-f*p-e.x+h*m;
    b=g.y+f*o-e.y-h*n;
    var q=f-h,r=new b2.Vec3;
    this.m_mass.Solve33(r,-a,-b,-q);
    this.m_impulse.Add(r);
    e.x-=i*r.x;
    e.y-=i*r.y;
    h-=k*(n*r.y-m*r.x+r.z);
    g.x+=j*r.x;
    g.y+=j*r.y;
    f+=l*(o*r.y-p*r.x+r.z);
    c.m_angularVelocity=h;
    d.m_angularVelocity=f
    };

    b2.WeldJoint.prototype.SolvePositionConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB;
    a=c.m_xf.R;
    var e=this.m_localAnchorA.x-c.m_sweep.localCenter.x,h=this.m_localAnchorA.y-c.m_sweep.localCenter.y;
    b=a.col1.x*e+a.col2.x*h;
    h=a.col1.y*e+a.col2.y*h;
    e=b;
    a=d.m_xf.R;
    var g=this.m_localAnchorB.x-d.m_sweep.localCenter.x,f=this.m_localAnchorB.y-d.m_sweep.localCenter.y;
    b=a.col1.x*g+a.col2.x*f;
    f=a.col1.y*g+a.col2.y*f;
    g=b;
    a=c.m_invMass;
    b=d.m_invMass;
    var i=c.m_invI,j=d.m_invI,k=d.m_sweep.c.x+g-c.m_sweep.c.x-
        e,l=d.m_sweep.c.y+f-c.m_sweep.c.y-h,n=d.m_sweep.a-c.m_sweep.a-this.m_referenceAngle,m=10*b2.Settings.b2_linearSlop,o=Math.sqrt(k*k+l*l),p=b2.Math.Abs(n);
    o>m&&(i*=1,j*=1);
    this.m_mass.col1.x=a+b+h*h*i+f*f*j;
    this.m_mass.col2.x=-h*e*i-f*g*j;
    this.m_mass.col3.x=-h*i-f*j;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=a+b+e*e*i+g*g*j;
    this.m_mass.col3.y=e*i+g*j;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=i+j;
    m=new b2.Vec3;
    this.m_mass.Solve33(m,-k,
                -l,-n);
    c.m_sweep.c.x-=a*m.x;
    c.m_sweep.c.y-=a*m.y;
    c.m_sweep.a-=i*(e*m.y-h*m.x+m.z);
    d.m_sweep.c.x+=b*m.x;
    d.m_sweep.c.y+=b*m.y;
    d.m_sweep.a+=j*(g*m.y-f*m.x+m.z);
    c.SynchronizeTransform();
    d.SynchronizeTransform();
    return o<=b2.Settings.b2_linearSlop&&p<=b2.Settings.b2_angularSlop
    };
    b2.WeldJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2.WeldJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };

    b2.WeldJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.WeldJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.z
    };
    b2.WeldJoint.prototype.m_localAnchorA=new b2.Vec2;
    b2.WeldJoint.prototype.m_localAnchorB=new b2.Vec2;
    b2.WeldJoint.prototype.m_referenceAngle=null;
    b2.WeldJoint.prototype.m_impulse=new b2.Vec3;
    b2.WeldJoint.prototype.m_mass=new b2.Mat33;
    b2.Math=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Math.prototype.__constructor=function(){

    };
    b2.Math.prototype.__varz=function(){

    };
    b2.Math.IsValid=function(a){
    return isFinite(a)
    };
    b2.Math.Dot=function(a,b){
    return a.x*b.x+a.y*b.y
    };
    b2.Math.CrossVV=function(a,b){
    return a.x*b.y-a.y*b.x
    };
    b2.Math.CrossVF=function(a,b){
    return new b2.Vec2(b*a.y,-b*a.x)
    };
    b2.Math.CrossFV=function(a,b){
    return new b2.Vec2(-a*b.y,a*b.x)
    };
    b2.Math.MulMV=function(a,b){
    return new b2.Vec2(a.col1.x*b.x+a.col2.x*b.y,a.col1.y*b.x+a.col2.y*b.y)
    };

    b2.Math.MulTMV=function(a,b){
    return new b2.Vec2(b2.Math.Dot(b,a.col1),b2.Math.Dot(b,a.col2))
    };
    b2.Math.MulX=function(a,b){
    var c=b2.Math.MulMV(a.R,b);
    c.x+=a.position.x;
    c.y+=a.position.y;
    return c
    };
    b2.Math.MulXT=function(a,b){
    var c=b2.Math.SubtractVV(b,a.position),d=c.x*a.R.col1.x+c.y*a.R.col1.y;
    c.y=c.x*a.R.col2.x+c.y*a.R.col2.y;
    c.x=d;
    return c
    };
    b2.Math.AddVV=function(a,b){
    return new b2.Vec2(a.x+b.x,a.y+b.y)
    };
    b2.Math.SubtractVV=function(a,b){
    return new b2.Vec2(a.x-b.x,a.y-b.y)
    };

    b2.Math.Distance=function(a,b){
    var c=a.x-b.x,d=a.y-b.y;
    return Math.sqrt(c*c+d*d)
    };
    b2.Math.DistanceSquared=function(a,b){
    var c=a.x-b.x,d=a.y-b.y;
    return c*c+d*d
    };
    b2.Math.MulFV=function(a,b){
    return new b2.Vec2(a*b.x,a*b.y)
    };
    b2.Math.AddMM=function(a,b){
    return b2.Mat22.FromVV(b2.Math.AddVV(a.col1,b.col1),b2.Math.AddVV(a.col2,b.col2))
    };
    b2.Math.MulMM=function(a,b){
    return b2.Mat22.FromVV(b2.Math.MulMV(a,b.col1),b2.Math.MulMV(a,b.col2))
    };

    b2.Math.MulTMM=function(a,b){
    var c=new b2.Vec2(b2.Math.Dot(a.col1,b.col1),b2.Math.Dot(a.col2,b.col1)),d=new b2.Vec2(b2.Math.Dot(a.col1,b.col2),b2.Math.Dot(a.col2,b.col2));
    return b2.Mat22.FromVV(c,d)
    };
    b2.Math.Abs=function(a){
    return a>0?a:-a
    };
    b2.Math.AbsV=function(a){
    return new b2.Vec2(b2.Math.Abs(a.x),b2.Math.Abs(a.y))
    };
    b2.Math.AbsM=function(a){
    return b2.Mat22.FromVV(b2.Math.AbsV(a.col1),b2.Math.AbsV(a.col2))
    };
    b2.Math.Min=function(a,b){
    return a<b?a:b
    };

    b2.Math.MinV=function(a,b){
    return new b2.Vec2(b2.Math.Min(a.x,b.x),b2.Math.Min(a.y,b.y))
    };
    b2.Math.Max=function(a,b){
    return a>b?a:b
    };
    b2.Math.MaxV=function(a,b){
    return new b2.Vec2(b2.Math.Max(a.x,b.x),b2.Math.Max(a.y,b.y))
    };
    b2.Math.Clamp=function(a,b,c){
    return a<b?b:a>c?c:a
    };
    b2.Math.ClampV=function(a,b,c){
    return b2.Math.MaxV(b,b2.Math.MinV(a,c))
    };
    b2.Math.Swap=function(a,b){
    var c=a[0];
    a[0]=b[0];
    b[0]=c
    };
    b2.Math.Random=function(){
    return Math.random()*2-1
    };

    b2.Math.RandomRange=function(a,b){
    return(b-a)*Math.random()+a
    };
    b2.Math.NextPowerOfTwo=function(a){
    a|=a>>1&2147483647;
    a|=a>>2&1073741823;
    a|=a>>4&268435455;
    a|=a>>8&16777215;
    a|=a>>16&65535;
    return a+1
    };
    b2.Math.IsPowerOfTwo=function(a){
    return a>0&&(a&a-1)==0
    };
    b2.Math.b2Vec2_zero=new b2.Vec2(0,0);
    b2.Math.b2Mat22_identity=b2.Mat22.FromVV(new b2.Vec2(1,0),new b2.Vec2(0,1));
    b2.Math.b2Transform_identity=new b2.Transform(b2.Math.b2Vec2_zero,b2.Math.b2Mat22_identity);

    b2.PulleyJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PulleyJoint.prototype,b2.Joint.prototype);
    b2.PulleyJoint.prototype._super=b2.Joint.prototype;

    b2.PulleyJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_ground=this.m_bodyA.m_world.m_groundBody;
    this.m_groundAnchor1.x=a.groundAnchorA.x-this.m_ground.m_xf.position.x;
    this.m_groundAnchor1.y=a.groundAnchorA.y-this.m_ground.m_xf.position.y;
    this.m_groundAnchor2.x=a.groundAnchorB.x-this.m_ground.m_xf.position.x;
    this.m_groundAnchor2.y=a.groundAnchorB.y-this.m_ground.m_xf.position.y;
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);

    this.m_ratio=a.ratio;
    this.m_constant=a.lengthA+this.m_ratio*a.lengthB;
    this.m_maxLength1=b2.Math.Min(a.maxLengthA,this.m_constant-this.m_ratio*b2.PulleyJoint.b2_minPulleyLength);
    this.m_maxLength2=b2.Math.Min(a.maxLengthB,(this.m_constant-b2.PulleyJoint.b2_minPulleyLength)/this.m_ratio);
    this.m_limitImpulse2=this.m_limitImpulse1=this.m_impulse=0
    };

    b2.PulleyJoint.prototype.__varz=function(){
    this.m_groundAnchor1=new b2.Vec2;
    this.m_groundAnchor2=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_u1=new b2.Vec2;
    this.m_u2=new b2.Vec2
    };
    b2.PulleyJoint.b2_minPulleyLength=2;

    b2.PulleyJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d;
    d=b.m_xf.R;
    var e=this.m_localAnchor1.x-b.m_sweep.localCenter.x,h=this.m_localAnchor1.y-b.m_sweep.localCenter.y,g=d.col1.x*e+d.col2.x*h,h=d.col1.y*e+d.col2.y*h,e=g;
    d=c.m_xf.R;
    var f=this.m_localAnchor2.x-c.m_sweep.localCenter.x,i=this.m_localAnchor2.y-c.m_sweep.localCenter.y,g=d.col1.x*f+d.col2.x*i,i=d.col1.y*f+d.col2.y*i,f=g;
    d=c.m_sweep.c.x+f;
    var g=c.m_sweep.c.y+i,j=this.m_ground.m_xf.position.x+this.m_groundAnchor2.x,
    k=this.m_ground.m_xf.position.y+this.m_groundAnchor2.y;
    this.m_u1.Set(b.m_sweep.c.x+e-(this.m_ground.m_xf.position.x+this.m_groundAnchor1.x),b.m_sweep.c.y+h-(this.m_ground.m_xf.position.y+this.m_groundAnchor1.y));
    this.m_u2.Set(d-j,g-k);
    d=this.m_u1.Length();
    g=this.m_u2.Length();
    d>b2.Settings.b2_linearSlop?this.m_u1.Multiply(1/d):this.m_u1.SetZero();
    g>b2.Settings.b2_linearSlop?this.m_u2.Multiply(1/g):this.m_u2.SetZero();
    this.m_constant-d-this.m_ratio*g>0?(this.m_state=b2.Joint.e_inactiveLimit,this.m_impulse=
                        0):this.m_state=b2.Joint.e_atUpperLimit;
    d<this.m_maxLength1?(this.m_limitState1=b2.Joint.e_inactiveLimit,this.m_limitImpulse1=0):this.m_limitState1=b2.Joint.e_atUpperLimit;
    g<this.m_maxLength2?(this.m_limitState2=b2.Joint.e_inactiveLimit,this.m_limitImpulse2=0):this.m_limitState2=b2.Joint.e_atUpperLimit;
    d=e*this.m_u1.y-h*this.m_u1.x;
    g=f*this.m_u2.y-i*this.m_u2.x;
    this.m_limitMass1=b.m_invMass+b.m_invI*d*d;
    this.m_limitMass2=c.m_invMass+c.m_invI*g*g;
    this.m_pulleyMass=this.m_limitMass1+this.m_ratio*this.m_ratio*
        this.m_limitMass2;
    this.m_limitMass1=1/this.m_limitMass1;
    this.m_limitMass2=1/this.m_limitMass2;
    this.m_pulleyMass=1/this.m_pulleyMass;
    a.warmStarting?(this.m_impulse*=a.dtRatio,this.m_limitImpulse1*=a.dtRatio,this.m_limitImpulse2*=a.dtRatio,a=(-this.m_impulse-this.m_limitImpulse1)*this.m_u1.x,d=(-this.m_impulse-this.m_limitImpulse1)*this.m_u1.y,g=(-this.m_ratio*this.m_impulse-this.m_limitImpulse2)*this.m_u2.x,j=(-this.m_ratio*this.m_impulse-this.m_limitImpulse2)*this.m_u2.y,b.m_linearVelocity.x+=b.m_invMass*
            a,b.m_linearVelocity.y+=b.m_invMass*d,b.m_angularVelocity+=b.m_invI*(e*d-h*a),c.m_linearVelocity.x+=c.m_invMass*g,c.m_linearVelocity.y+=c.m_invMass*j,c.m_angularVelocity+=c.m_invI*(f*j-i*g)):this.m_limitImpulse2=this.m_limitImpulse1=this.m_impulse=0
    };

    b2.PulleyJoint.prototype.SolveVelocityConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h,i,j;
    if(this.m_state==b2.Joint.e_atUpperLimit)c=a.m_linearVelocity.x+-a.m_angularVelocity*
        e,h=a.m_linearVelocity.y+a.m_angularVelocity*d,i=b.m_linearVelocity.x+-b.m_angularVelocity*f,j=b.m_linearVelocity.y+b.m_angularVelocity*g,c=-(this.m_u1.x*c+this.m_u1.y*h)-this.m_ratio*(this.m_u2.x*i+this.m_u2.y*j),j=this.m_pulleyMass*-c,c=this.m_impulse,this.m_impulse=b2.Math.Max(0,this.m_impulse+j),j=this.m_impulse-c,c=-j*this.m_u1.x,h=-j*this.m_u1.y,i=-this.m_ratio*j*this.m_u2.x,j=-this.m_ratio*j*this.m_u2.y,a.m_linearVelocity.x+=a.m_invMass*c,a.m_linearVelocity.y+=a.m_invMass*h,a.m_angularVelocity+=
    a.m_invI*(d*h-e*c),b.m_linearVelocity.x+=b.m_invMass*i,b.m_linearVelocity.y+=b.m_invMass*j,b.m_angularVelocity+=b.m_invI*(g*j-f*i);
    if(this.m_limitState1==b2.Joint.e_atUpperLimit)c=a.m_linearVelocity.x+-a.m_angularVelocity*e,h=a.m_linearVelocity.y+a.m_angularVelocity*d,c=-(this.m_u1.x*c+this.m_u1.y*h),j=-this.m_limitMass1*c,c=this.m_limitImpulse1,this.m_limitImpulse1=b2.Math.Max(0,this.m_limitImpulse1+j),j=this.m_limitImpulse1-c,c=-j*this.m_u1.x,h=-j*this.m_u1.y,a.m_linearVelocity.x+=a.m_invMass*c,
    a.m_linearVelocity.y+=a.m_invMass*h,a.m_angularVelocity+=a.m_invI*(d*h-e*c);
    if(this.m_limitState2==b2.Joint.e_atUpperLimit)i=b.m_linearVelocity.x+-b.m_angularVelocity*f,j=b.m_linearVelocity.y+b.m_angularVelocity*g,c=-(this.m_u2.x*i+this.m_u2.y*j),j=-this.m_limitMass2*c,c=this.m_limitImpulse2,this.m_limitImpulse2=b2.Math.Max(0,this.m_limitImpulse2+j),j=this.m_limitImpulse2-c,i=-j*this.m_u2.x,j=-j*this.m_u2.y,b.m_linearVelocity.x+=b.m_invMass*i,b.m_linearVelocity.y+=b.m_invMass*j,b.m_angularVelocity+=
    b.m_invI*(g*j-f*i)
    };

    b2.PulleyJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c,d=this.m_ground.m_xf.position.x+this.m_groundAnchor1.x,e=this.m_ground.m_xf.position.y+this.m_groundAnchor1.y,h=this.m_ground.m_xf.position.x+this.m_groundAnchor2.x,g=this.m_ground.m_xf.position.y+this.m_groundAnchor2.y,f,i,j,k,l,n,m,o=0;
    if(this.m_state==b2.Joint.e_atUpperLimit)c=a.m_xf.R,f=this.m_localAnchor1.x-a.m_sweep.localCenter.x,i=this.m_localAnchor1.y-a.m_sweep.localCenter.y,l=c.col1.x*f+c.col2.x*
        i,i=c.col1.y*f+c.col2.y*i,f=l,c=b.m_xf.R,j=this.m_localAnchor2.x-b.m_sweep.localCenter.x,k=this.m_localAnchor2.y-b.m_sweep.localCenter.y,l=c.col1.x*j+c.col2.x*k,k=c.col1.y*j+c.col2.y*k,j=l,c=a.m_sweep.c.x+f,l=a.m_sweep.c.y+i,n=b.m_sweep.c.x+j,m=b.m_sweep.c.y+k,this.m_u1.Set(c-d,l-e),this.m_u2.Set(n-h,m-g),c=this.m_u1.Length(),l=this.m_u2.Length(),c>b2.Settings.b2_linearSlop?this.m_u1.Multiply(1/c):this.m_u1.SetZero(),l>b2.Settings.b2_linearSlop?this.m_u2.Multiply(1/l):this.m_u2.SetZero(),c=this.m_constant-
        c-this.m_ratio*l,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_pulleyMass*c,c=-m*this.m_u1.x,l=-m*this.m_u1.y,n=-this.m_ratio*m*this.m_u2.x,m=-this.m_ratio*m*this.m_u2.y,a.m_sweep.c.x+=a.m_invMass*c,a.m_sweep.c.y+=a.m_invMass*l,a.m_sweep.a+=a.m_invI*(f*l-i*c),b.m_sweep.c.x+=b.m_invMass*n,b.m_sweep.c.y+=b.m_invMass*m,b.m_sweep.a+=b.m_invI*(j*m-k*n),a.SynchronizeTransform(),b.SynchronizeTransform();
    if(this.m_limitState1==b2.Joint.e_atUpperLimit)c=
        a.m_xf.R,f=this.m_localAnchor1.x-a.m_sweep.localCenter.x,i=this.m_localAnchor1.y-a.m_sweep.localCenter.y,l=c.col1.x*f+c.col2.x*i,i=c.col1.y*f+c.col2.y*i,f=l,c=a.m_sweep.c.x+f,l=a.m_sweep.c.y+i,this.m_u1.Set(c-d,l-e),c=this.m_u1.Length(),c>b2.Settings.b2_linearSlop?(this.m_u1.x*=1/c,this.m_u1.y*=1/c):this.m_u1.SetZero(),c=this.m_maxLength1-c,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_limitMass1*c,c=-m*this.m_u1.x,l=-m*this.m_u1.y,
    a.m_sweep.c.x+=a.m_invMass*c,a.m_sweep.c.y+=a.m_invMass*l,a.m_sweep.a+=a.m_invI*(f*l-i*c),a.SynchronizeTransform();
    if(this.m_limitState2==b2.Joint.e_atUpperLimit)c=b.m_xf.R,j=this.m_localAnchor2.x-b.m_sweep.localCenter.x,k=this.m_localAnchor2.y-b.m_sweep.localCenter.y,l=c.col1.x*j+c.col2.x*k,k=c.col1.y*j+c.col2.y*k,j=l,n=b.m_sweep.c.x+j,m=b.m_sweep.c.y+k,this.m_u2.Set(n-h,m-g),l=this.m_u2.Length(),l>b2.Settings.b2_linearSlop?(this.m_u2.x*=1/l,this.m_u2.y*=1/l):this.m_u2.SetZero(),c=this.m_maxLength2-
        l,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_limitMass2*c,n=-m*this.m_u2.x,m=-m*this.m_u2.y,b.m_sweep.c.x+=b.m_invMass*n,b.m_sweep.c.y+=b.m_invMass*m,b.m_sweep.a+=b.m_invI*(j*m-k*n),b.SynchronizeTransform();
    return o<b2.Settings.b2_linearSlop
    };
    b2.PulleyJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.PulleyJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.PulleyJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_u2.x,a*this.m_impulse*this.m_u2.y)
    };
    b2.PulleyJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.PulleyJoint.prototype.GetGroundAnchorA=function(){
    var a=this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor1);
    return a
    };
    b2.PulleyJoint.prototype.GetGroundAnchorB=function(){
    var a=this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor2);
    return a
    };

    b2.PulleyJoint.prototype.GetLength1=function(){
    var a=this.m_bodyA.GetWorldPoint(this.m_localAnchor1),b=a.x-(this.m_ground.m_xf.position.x+this.m_groundAnchor1.x),a=a.y-(this.m_ground.m_xf.position.y+this.m_groundAnchor1.y);
    return Math.sqrt(b*b+a*a)
    };
    b2.PulleyJoint.prototype.GetLength2=function(){
    var a=this.m_bodyB.GetWorldPoint(this.m_localAnchor2),b=a.x-(this.m_ground.m_xf.position.x+this.m_groundAnchor2.x),a=a.y-(this.m_ground.m_xf.position.y+this.m_groundAnchor2.y);
    return Math.sqrt(b*b+a*a)
    };

    b2.PulleyJoint.prototype.GetRatio=function(){
    return this.m_ratio
    };
    b2.PulleyJoint.prototype.m_ground=null;
    b2.PulleyJoint.prototype.m_groundAnchor1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_groundAnchor2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_u1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_u2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_constant=null;
    b2.PulleyJoint.prototype.m_ratio=null;

    b2.PulleyJoint.prototype.m_maxLength1=null;
    b2.PulleyJoint.prototype.m_maxLength2=null;
    b2.PulleyJoint.prototype.m_pulleyMass=null;
    b2.PulleyJoint.prototype.m_limitMass1=null;
    b2.PulleyJoint.prototype.m_limitMass2=null;
    b2.PulleyJoint.prototype.m_impulse=null;
    b2.PulleyJoint.prototype.m_limitImpulse1=null;
    b2.PulleyJoint.prototype.m_limitImpulse2=null;
    b2.PulleyJoint.prototype.m_state=0;
    b2.PulleyJoint.prototype.m_limitState1=0;
    b2.PulleyJoint.prototype.m_limitState2=0;

    b2.PrismaticJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PrismaticJoint.prototype,b2.Joint.prototype);
    b2.PrismaticJoint.prototype._super=b2.Joint.prototype;

    b2.PrismaticJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x=-this.m_localXAxis1.y;
    this.m_localYAxis1.y=this.m_localXAxis1.x;
    this.m_refAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse=this.m_motorMass=0;
    this.m_lowerTranslation=a.lowerTranslation;
    this.m_upperTranslation=a.upperTranslation;
    this.m_maxMotorForce=
        a.maxMotorForce;
    this.m_motorSpeed=a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
    };
    b2.PrismaticJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_localXAxis1=new b2.Vec2;
    this.m_localYAxis1=new b2.Vec2;
    this.m_axis=new b2.Vec2;
    this.m_perp=new b2.Vec2;
    this.m_K=new b2.Mat33;
    this.m_impulse=new b2.Vec3
    };

    b2.PrismaticJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    this.m_localCenterA.SetV(b.GetLocalCenter());
    this.m_localCenterB.SetV(c.GetLocalCenter());
    var h=b.GetTransform();
    c.GetTransform();
    d=b.m_xf.R;
    var g=this.m_localAnchor1.x-this.m_localCenterA.x,f=this.m_localAnchor1.y-this.m_localCenterA.y;
    e=d.col1.x*g+d.col2.x*f;
    f=d.col1.y*g+d.col2.y*f;
    g=e;
    d=c.m_xf.R;
    var i=this.m_localAnchor2.x-this.m_localCenterB.x,j=this.m_localAnchor2.y-this.m_localCenterB.y;
    e=d.col1.x*
        i+d.col2.x*j;
    j=d.col1.y*i+d.col2.y*j;
    i=e;
    d=c.m_sweep.c.x+i-b.m_sweep.c.x-g;
    e=c.m_sweep.c.y+j-b.m_sweep.c.y-f;
    this.m_invMassA=b.m_invMass;
    this.m_invMassB=c.m_invMass;
    this.m_invIA=b.m_invI;
    this.m_invIB=c.m_invI;
    this.m_axis.SetV(b2.Math.MulMV(h.R,this.m_localXAxis1));
    this.m_a1=(d+g)*this.m_axis.y-(e+f)*this.m_axis.x;
    this.m_a2=i*this.m_axis.y-j*this.m_axis.x;
    this.m_motorMass=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_a1*this.m_a1+this.m_invIB*this.m_a2*this.m_a2;
    if(this.m_motorMass>Number.MIN_VALUE)this.m_motorMass=
        1/this.m_motorMass;
    this.m_perp.SetV(b2.Math.MulMV(h.R,this.m_localYAxis1));
    this.m_s1=(d+g)*this.m_perp.y-(e+f)*this.m_perp.x;
    this.m_s2=i*this.m_perp.y-j*this.m_perp.x;
    h=this.m_invMassA;
    g=this.m_invMassB;
    f=this.m_invIA;
    i=this.m_invIB;
    this.m_K.col1.x=h+g+f*this.m_s1*this.m_s1+i*this.m_s2*this.m_s2;
    this.m_K.col1.y=f*this.m_s1+i*this.m_s2;
    this.m_K.col1.z=f*this.m_s1*this.m_a1+i*this.m_s2*this.m_a2;
    this.m_K.col2.x=this.m_K.col1.y;
    this.m_K.col2.y=f+i;
    this.m_K.col2.z=f*this.m_a1+i*this.m_a2;
    this.m_K.col3.x=
        this.m_K.col1.z;
    this.m_K.col3.y=this.m_K.col2.z;
    this.m_K.col3.z=h+g+f*this.m_a1*this.m_a1+i*this.m_a2*this.m_a2;
    if(this.m_enableLimit)if(d=this.m_axis.x*d+this.m_axis.y*e,b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop)this.m_limitState=b2.Joint.e_equalLimits;
    else if(d<=this.m_lowerTranslation){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_limitState=b2.Joint.e_atLowerLimit,this.m_impulse.z=0}else if(d>=this.m_upperTranslation){
        if(this.m_limitState!=
           b2.Joint.e_atUpperLimit)this.m_limitState=b2.Joint.e_atUpperLimit,this.m_impulse.z=0}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.z=0;
    else this.m_limitState=b2.Joint.e_inactiveLimit;
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=a.dtRatio,a=this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.x,d=this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.z)*
            this.m_axis.y,e=this.m_impulse.x*this.m_s1+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a1,h=this.m_impulse.x*this.m_s2+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a2,b.m_linearVelocity.x-=this.m_invMassA*a,b.m_linearVelocity.y-=this.m_invMassA*d,b.m_angularVelocity-=this.m_invIA*e,c.m_linearVelocity.x+=this.m_invMassB*a,c.m_linearVelocity.y+=this.m_invMassB*d,c.m_angularVelocity+=this.m_invIB*h):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.PrismaticJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d=b.m_linearVelocity,e=b.m_angularVelocity,h=c.m_linearVelocity,g=c.m_angularVelocity,f,i,j;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)j=this.m_motorMass*(this.m_motorSpeed-(this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e)),f=this.m_motorImpulse,a=a.dt*this.m_maxMotorForce,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+j,-a,a),j=this.m_motorImpulse-
        f,f=j*this.m_axis.x,a=j*this.m_axis.y,i=j*this.m_a1,j*=this.m_a2,d.x-=this.m_invMassA*f,d.y-=this.m_invMassA*a,e-=this.m_invIA*i,h.x+=this.m_invMassB*f,h.y+=this.m_invMassB*a,g+=this.m_invIB*j;
    i=this.m_perp.x*(h.x-d.x)+this.m_perp.y*(h.y-d.y)+this.m_s2*g-this.m_s1*e;
    a=g-e;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        j=this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e;
        f=this.m_impulse.Copy();
        j=this.m_K.Solve33(new b2.Vec3,-i,-a,-j);
        this.m_impulse.Add(j);

        if(this.m_limitState==b2.Joint.e_atLowerLimit)this.m_impulse.z=b2.Math.Max(this.m_impulse.z,0);
        else if(this.m_limitState==b2.Joint.e_atUpperLimit)this.m_impulse.z=b2.Math.Min(this.m_impulse.z,0);
        i=-i-(this.m_impulse.z-f.z)*this.m_K.col3.x;
        a=-a-(this.m_impulse.z-f.z)*this.m_K.col3.y;
        a=this.m_K.Solve22(new b2.Vec2,i,a);
        a.x+=f.x;
        a.y+=f.y;
        this.m_impulse.x=a.x;
        this.m_impulse.y=a.y;
        j.x=this.m_impulse.x-f.x;
        j.y=this.m_impulse.y-f.y;
        j.z=this.m_impulse.z-f.z;
        f=j.x*this.m_perp.x+j.z*this.m_axis.x;
        a=j.x*this.m_perp.y+
        j.z*this.m_axis.y;
        i=j.x*this.m_s1+j.y+j.z*this.m_a1;
        j=j.x*this.m_s2+j.y+j.z*this.m_a2}else j=this.m_K.Solve22(new b2.Vec2,-i,-a),this.m_impulse.x+=j.x,this.m_impulse.y+=j.y,f=j.x*this.m_perp.x,a=j.x*this.m_perp.y,i=j.x*this.m_s1+j.y,j=j.x*this.m_s2+j.y;
    d.x-=this.m_invMassA*f;
    d.y-=this.m_invMassA*a;
    e-=this.m_invIA*i;
    h.x+=this.m_invMassB*f;
    h.y+=this.m_invMassB*a;
    g+=this.m_invIB*j;
    b.m_linearVelocity.SetV(d);
    b.m_angularVelocity=e;
    c.m_linearVelocity.SetV(h);
    c.m_angularVelocity=g
    };

    b2.PrismaticJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.m_sweep.c,d=a.m_sweep.a,e=b.m_sweep.c,h=b.m_sweep.a,g,f,i,j,k=0,l=0;
    i=!1;
    var n=0,m=b2.Mat22.FromAngle(d),o=b2.Mat22.FromAngle(h);
    g=m;
    var l=this.m_localAnchor1.x-this.m_localCenterA.x,p=this.m_localAnchor1.y-this.m_localCenterA.y;
    f=g.col1.x*l+g.col2.x*p;
    p=g.col1.y*l+g.col2.y*p;
    l=f;
    g=o;
    o=this.m_localAnchor2.x-this.m_localCenterB.x;
    j=this.m_localAnchor2.y-this.m_localCenterB.y;
    f=g.col1.x*o+g.col2.x*
        j;
    j=g.col1.y*o+g.col2.y*j;
    o=f;
    g=e.x+o-c.x-l;
    f=e.y+j-c.y-p;
    if(this.m_enableLimit){
        this.m_axis=b2.Math.MulMV(m,this.m_localXAxis1);
        this.m_a1=(g+l)*this.m_axis.y-(f+p)*this.m_axis.x;
        this.m_a2=o*this.m_axis.y-j*this.m_axis.x;
        var q=this.m_axis.x*g+this.m_axis.y*f;
        b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop?(n=b2.Math.Clamp(q,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection),k=b2.Math.Abs(q),i=!0):q<=this.m_lowerTranslation?(n=b2.Math.Clamp(q-
                                                                                                                                   this.m_lowerTranslation+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),k=this.m_lowerTranslation-q,i=!0):q>=this.m_upperTranslation&&(n=b2.Math.Clamp(q-this.m_upperTranslation+b2.Settings.b2_linearSlop,0,b2.Settings.b2_maxLinearCorrection),k=q-this.m_upperTranslation,i=!0)}this.m_perp=b2.Math.MulMV(m,this.m_localYAxis1);
    this.m_s1=(g+l)*this.m_perp.y-(f+p)*this.m_perp.x;
    this.m_s2=o*this.m_perp.y-j*this.m_perp.x;
    m=new b2.Vec3;
    p=this.m_perp.x*g+this.m_perp.y*f;
    o=h-d-this.m_refAngle;

    k=b2.Math.Max(k,b2.Math.Abs(p));
    l=b2.Math.Abs(o);
    i?(i=this.m_invMassA,j=this.m_invMassB,g=this.m_invIA,f=this.m_invIB,this.m_K.col1.x=i+j+g*this.m_s1*this.m_s1+f*this.m_s2*this.m_s2,this.m_K.col1.y=g*this.m_s1+f*this.m_s2,this.m_K.col1.z=g*this.m_s1*this.m_a1+f*this.m_s2*this.m_a2,this.m_K.col2.x=this.m_K.col1.y,this.m_K.col2.y=g+f,this.m_K.col2.z=g*this.m_a1+f*this.m_a2,this.m_K.col3.x=this.m_K.col1.z,this.m_K.col3.y=this.m_K.col2.z,this.m_K.col3.z=i+j+g*this.m_a1*this.m_a1+f*this.m_a2*this.m_a2,
       this.m_K.Solve33(m,-p,-o,-n)):(i=this.m_invMassA,j=this.m_invMassB,g=this.m_invIA,f=this.m_invIB,n=g*this.m_s1+f*this.m_s2,q=g+f,this.m_K.col1.Set(i+j+g*this.m_s1*this.m_s1+f*this.m_s2*this.m_s2,n,0),this.m_K.col2.Set(n,q,0),n=this.m_K.Solve22(new b2.Vec2,-p,-o),m.x=n.x,m.y=n.y,m.z=0);
    n=m.x*this.m_perp.x+m.z*this.m_axis.x;
    i=m.x*this.m_perp.y+m.z*this.m_axis.y;
    p=m.x*this.m_s1+m.y+m.z*this.m_a1;
    m=m.x*this.m_s2+m.y+m.z*this.m_a2;
    c.x-=this.m_invMassA*n;
    c.y-=this.m_invMassA*i;
    d-=this.m_invIA*p;
    e.x+=this.m_invMassB*
        n;
    e.y+=this.m_invMassB*i;
    h+=this.m_invIB*m;
    a.m_sweep.a=d;
    b.m_sweep.a=h;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return k<=b2.Settings.b2_linearSlop&&l<=b2.Settings.b2_angularSlop
    };
    b2.PrismaticJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.PrismaticJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.PrismaticJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*(this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.x),a*(this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.y))
    };
    b2.PrismaticJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.y
    };

    b2.PrismaticJoint.prototype.GetJointTranslation=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.GetWorldPoint(this.m_localAnchor1),d=b.GetWorldPoint(this.m_localAnchor2),b=d.x-c.x,c=d.y-c.y,a=a.GetWorldVector(this.m_localXAxis1);
    return a.x*b+a.y*c
    };

    b2.PrismaticJoint.prototype.GetJointSpeed=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h;
    c=b.m_sweep.c.x+g-(a.m_sweep.c.x+d);
    var h=b.m_sweep.c.y+f-(a.m_sweep.c.y+e),i=a.GetWorldVector(this.m_localXAxis1),
    j=a.m_linearVelocity,k=b.m_linearVelocity,a=a.m_angularVelocity,b=b.m_angularVelocity;
    return c*-a*i.y+h*a*i.x+(i.x*(k.x+-b*f-j.x- -a*e)+i.y*(k.y+b*g-j.y-a*d))
    };
    b2.PrismaticJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };
    b2.PrismaticJoint.prototype.EnableLimit=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit=a
    };
    b2.PrismaticJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerTranslation
    };
    b2.PrismaticJoint.prototype.GetUpperLimit=function(){
    return this.m_upperTranslation
    };

    b2.PrismaticJoint.prototype.SetLimits=function(a,b){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation=a;
    this.m_upperTranslation=b
    };
    b2.PrismaticJoint.prototype.IsMotorEnabled=function(){
    return this.m_enableMotor
    };
    b2.PrismaticJoint.prototype.EnableMotor=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor=a
    };
    b2.PrismaticJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };

    b2.PrismaticJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.PrismaticJoint.prototype.SetMaxMotorForce=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce=a
    };
    b2.PrismaticJoint.prototype.GetMotorForce=function(){
    return this.m_motorImpulse
    };
    b2.PrismaticJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localXAxis1=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localYAxis1=new b2.Vec2;

    b2.PrismaticJoint.prototype.m_refAngle=null;
    b2.PrismaticJoint.prototype.m_axis=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_perp=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_s1=null;
    b2.PrismaticJoint.prototype.m_s2=null;
    b2.PrismaticJoint.prototype.m_a1=null;
    b2.PrismaticJoint.prototype.m_a2=null;
    b2.PrismaticJoint.prototype.m_K=new b2.Mat33;
    b2.PrismaticJoint.prototype.m_impulse=new b2.Vec3;
    b2.PrismaticJoint.prototype.m_motorMass=null;
    b2.PrismaticJoint.prototype.m_motorImpulse=null;

    b2.PrismaticJoint.prototype.m_lowerTranslation=null;
    b2.PrismaticJoint.prototype.m_upperTranslation=null;
    b2.PrismaticJoint.prototype.m_maxMotorForce=null;
    b2.PrismaticJoint.prototype.m_motorSpeed=null;
    b2.PrismaticJoint.prototype.m_enableLimit=null;
    b2.PrismaticJoint.prototype.m_enableMotor=null;
    b2.PrismaticJoint.prototype.m_limitState=0;
    b2.RevoluteJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.RevoluteJoint.prototype,b2.Joint.prototype);

    b2.RevoluteJoint.prototype._super=b2.Joint.prototype;

    b2.RevoluteJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_referenceAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse=0;
    this.m_lowerAngle=a.lowerAngle;
    this.m_upperAngle=a.upperAngle;
    this.m_maxMotorTorque=a.maxMotorTorque;
    this.m_motorSpeed=a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit
    };

    b2.RevoluteJoint.prototype.__varz=function(){
    this.K=new b2.Mat22;
    this.K1=new b2.Mat22;
    this.K2=new b2.Mat22;
    this.K3=new b2.Mat22;
    this.impulse3=new b2.Vec3;
    this.impulse2=new b2.Vec2;
    this.reduced=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_impulse=new b2.Vec3;
    this.m_mass=new b2.Mat33
    };
    b2.RevoluteJoint.tImpulse=new b2.Vec2;

    b2.RevoluteJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    d=b.m_xf.R;
    var h=this.m_localAnchor1.x-b.m_sweep.localCenter.x,g=this.m_localAnchor1.y-b.m_sweep.localCenter.y;
    e=d.col1.x*h+d.col2.x*g;
    g=d.col1.y*h+d.col2.y*g;
    h=e;
    d=c.m_xf.R;
    var f=this.m_localAnchor2.x-c.m_sweep.localCenter.x,i=this.m_localAnchor2.y-c.m_sweep.localCenter.y;
    e=d.col1.x*f+d.col2.x*i;
    i=d.col1.y*f+d.col2.y*i;
    f=e;
    d=b.m_invMass;
    e=c.m_invMass;
    var j=b.m_invI,k=c.m_invI;
    this.m_mass.col1.x=d+
        e+g*g*j+i*i*k;
    this.m_mass.col2.x=-g*h*j-i*f*k;
    this.m_mass.col3.x=-g*j-i*k;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=d+e+h*h*j+f*f*k;
    this.m_mass.col3.y=h*j+f*k;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=j+k;
    this.m_motorMass=1/(j+k);
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    if(this.m_enableLimit){
        var l=c.m_sweep.a-b.m_sweep.a-this.m_referenceAngle;
        if(b2.Math.Abs(this.m_upperAngle-this.m_lowerAngle)<2*b2.Settings.b2_angularSlop)this.m_limitState=
        b2.Joint.e_equalLimits;
        else if(l<=this.m_lowerAngle){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_impulse.z=0;
        this.m_limitState=b2.Joint.e_atLowerLimit}else if(l>=this.m_upperAngle){
            if(this.m_limitState!=b2.Joint.e_atUpperLimit)this.m_impulse.z=0;
            this.m_limitState=b2.Joint.e_atUpperLimit}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.z=0}else this.m_limitState=b2.Joint.e_inactiveLimit;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=
            a.dtRatio,a=this.m_impulse.x,l=this.m_impulse.y,b.m_linearVelocity.x-=d*a,b.m_linearVelocity.y-=d*l,b.m_angularVelocity-=j*(h*l-g*a+this.m_motorImpulse+this.m_impulse.z),c.m_linearVelocity.x+=e*a,c.m_linearVelocity.y+=e*l,c.m_angularVelocity+=k*(f*l-i*a+this.m_motorImpulse+this.m_impulse.z)):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.RevoluteJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e,h,g,f,i=b.m_linearVelocity,j=b.m_angularVelocity,k=c.m_linearVelocity,l=c.m_angularVelocity,n=b.m_invMass,m=c.m_invMass,o=b.m_invI,p=c.m_invI;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)h=this.m_motorMass*-(l-j-this.m_motorSpeed),g=this.m_motorImpulse,a=a.dt*this.m_maxMotorTorque,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+h,-a,a),h=this.m_motorImpulse-g,j-=o*h,l+=p*
        h;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        d=b.m_xf.R;
        h=this.m_localAnchor1.x-b.m_sweep.localCenter.x;
        g=this.m_localAnchor1.y-b.m_sweep.localCenter.y;
        e=d.col1.x*h+d.col2.x*g;
        g=d.col1.y*h+d.col2.y*g;
        h=e;
        d=c.m_xf.R;
        a=this.m_localAnchor2.x-c.m_sweep.localCenter.x;
        f=this.m_localAnchor2.y-c.m_sweep.localCenter.y;
        e=d.col1.x*a+d.col2.x*f;
        f=d.col1.y*a+d.col2.y*f;
        a=e;
        e=k.x+-l*f-i.x- -j*g;
        var q=k.y+l*a-i.y-j*h;
        this.m_mass.Solve33(this.impulse3,-e,-q,-(l-j));
        if(this.m_limitState==
           b2.Joint.e_equalLimits)this.m_impulse.Add(this.impulse3);
        else if(this.m_limitState==b2.Joint.e_atLowerLimit){
        if(d=this.m_impulse.z+this.impulse3.z,d<0)this.m_mass.Solve22(this.reduced,-e,-q),this.impulse3.x=this.reduced.x,this.impulse3.y=this.reduced.y,this.impulse3.z=-this.m_impulse.z,this.m_impulse.x+=this.reduced.x,this.m_impulse.y+=this.reduced.y,this.m_impulse.z=0}else if(this.m_limitState==b2.Joint.e_atUpperLimit&&(d=this.m_impulse.z+this.impulse3.z,d>0))this.m_mass.Solve22(this.reduced,-e,
                                                                                                                                                                                                    -q),this.impulse3.x=this.reduced.x,this.impulse3.y=this.reduced.y,this.impulse3.z=-this.m_impulse.z,this.m_impulse.x+=this.reduced.x,this.m_impulse.y+=this.reduced.y,this.m_impulse.z=0;
        i.x-=n*this.impulse3.x;
        i.y-=n*this.impulse3.y;
        j-=o*(h*this.impulse3.y-g*this.impulse3.x+this.impulse3.z);
        k.x+=m*this.impulse3.x;
        k.y+=m*this.impulse3.y;
        l+=p*(a*this.impulse3.y-f*this.impulse3.x+this.impulse3.z)}else d=b.m_xf.R,h=this.m_localAnchor1.x-b.m_sweep.localCenter.x,g=this.m_localAnchor1.y-b.m_sweep.localCenter.y,
    e=d.col1.x*h+d.col2.x*g,g=d.col1.y*h+d.col2.y*g,h=e,d=c.m_xf.R,a=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,e=d.col1.x*a+d.col2.x*f,f=d.col1.y*a+d.col2.y*f,a=e,this.m_mass.Solve22(this.impulse2,-(k.x+-l*f-i.x- -j*g),-(k.y+l*a-i.y-j*h)),this.m_impulse.x+=this.impulse2.x,this.m_impulse.y+=this.impulse2.y,i.x-=n*this.impulse2.x,i.y-=n*this.impulse2.y,j-=o*(h*this.impulse2.y-g*this.impulse2.x),k.x+=m*this.impulse2.x,k.y+=m*this.impulse2.y,l+=p*(a*this.impulse2.y-
                                                                                                                                                                                                                                                            f*this.impulse2.x);
    b.m_linearVelocity.SetV(i);
    b.m_angularVelocity=j;
    c.m_linearVelocity.SetV(k);
    c.m_angularVelocity=l
    };

    b2.RevoluteJoint.prototype.SolvePositionConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB,e=0,h,g,f;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        a=d.m_sweep.a-c.m_sweep.a-this.m_referenceAngle;
        var i=0;
        this.m_limitState==b2.Joint.e_equalLimits?(a=b2.Math.Clamp(a-this.m_lowerAngle,-b2.Settings.b2_maxAngularCorrection,b2.Settings.b2_maxAngularCorrection),i=-this.m_motorMass*a,e=b2.Math.Abs(a)):this.m_limitState==b2.Joint.e_atLowerLimit?(a-=this.m_lowerAngle,e=-a,a=b2.Math.Clamp(a+
                                                                                                                                                   b2.Settings.b2_angularSlop,-b2.Settings.b2_maxAngularCorrection,0),i=-this.m_motorMass*a):this.m_limitState==b2.Joint.e_atUpperLimit&&(e=a-=this.m_upperAngle,a=b2.Math.Clamp(a-b2.Settings.b2_angularSlop,0,b2.Settings.b2_maxAngularCorrection),i=-this.m_motorMass*a);
        c.m_sweep.a-=c.m_invI*i;
        d.m_sweep.a+=d.m_invI*i;
        c.SynchronizeTransform();
        d.SynchronizeTransform()}b=c.m_xf.R;
    i=this.m_localAnchor1.x-c.m_sweep.localCenter.x;
    a=this.m_localAnchor1.y-c.m_sweep.localCenter.y;
    h=b.col1.x*i+b.col2.x*a;
    a=b.col1.y*
        i+b.col2.y*a;
    i=h;
    b=d.m_xf.R;
    var j=this.m_localAnchor2.x-d.m_sweep.localCenter.x,k=this.m_localAnchor2.y-d.m_sweep.localCenter.y;
    h=b.col1.x*j+b.col2.x*k;
    k=b.col1.y*j+b.col2.y*k;
    j=h;
    g=d.m_sweep.c.x+j-c.m_sweep.c.x-i;
    f=d.m_sweep.c.y+k-c.m_sweep.c.y-a;
    var l=g*g+f*f;
    b=Math.sqrt(l);
    h=c.m_invMass;
    var n=d.m_invMass,m=c.m_invI,o=d.m_invI,p=10*b2.Settings.b2_linearSlop;
    l>p*p&&(l=1/(h+n),g=l*-g,f=l*-f,c.m_sweep.c.x-=0.5*h*g,c.m_sweep.c.y-=0.5*h*f,d.m_sweep.c.x+=0.5*n*g,d.m_sweep.c.y+=0.5*n*f,g=d.m_sweep.c.x+
        j-c.m_sweep.c.x-i,f=d.m_sweep.c.y+k-c.m_sweep.c.y-a);
    this.K1.col1.x=h+n;
    this.K1.col2.x=0;
    this.K1.col1.y=0;
    this.K1.col2.y=h+n;
    this.K2.col1.x=m*a*a;
    this.K2.col2.x=-m*i*a;
    this.K2.col1.y=-m*i*a;
    this.K2.col2.y=m*i*i;
    this.K3.col1.x=o*k*k;
    this.K3.col2.x=-o*j*k;
    this.K3.col1.y=-o*j*k;
    this.K3.col2.y=o*j*j;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Solve(b2.RevoluteJoint.tImpulse,-g,-f);
    g=b2.RevoluteJoint.tImpulse.x;
    f=b2.RevoluteJoint.tImpulse.y;
    c.m_sweep.c.x-=c.m_invMass*g;
    c.m_sweep.c.y-=
        c.m_invMass*f;
    c.m_sweep.a-=c.m_invI*(i*f-a*g);
    d.m_sweep.c.x+=d.m_invMass*g;
    d.m_sweep.c.y+=d.m_invMass*f;
    d.m_sweep.a+=d.m_invI*(j*f-k*g);
    c.SynchronizeTransform();
    d.SynchronizeTransform();
    return b<=b2.Settings.b2_linearSlop&&e<=b2.Settings.b2_angularSlop
    };
    b2.RevoluteJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.RevoluteJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.RevoluteJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.RevoluteJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.z
    };
    b2.RevoluteJoint.prototype.GetJointAngle=function(){
    return this.m_bodyB.m_sweep.a-this.m_bodyA.m_sweep.a-this.m_referenceAngle
    };
    b2.RevoluteJoint.prototype.GetJointSpeed=function(){
    return this.m_bodyB.m_angularVelocity-this.m_bodyA.m_angularVelocity
    };
    b2.RevoluteJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };

    b2.RevoluteJoint.prototype.EnableLimit=function(a){
    this.m_enableLimit=a
    };
    b2.RevoluteJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerAngle
    };
    b2.RevoluteJoint.prototype.GetUpperLimit=function(){
    return this.m_upperAngle
    };
    b2.RevoluteJoint.prototype.SetLimits=function(a,b){
    this.m_lowerAngle=a;
    this.m_upperAngle=b
    };
    b2.RevoluteJoint.prototype.IsMotorEnabled=function(){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    return this.m_enableMotor
    };

    b2.RevoluteJoint.prototype.EnableMotor=function(a){
    this.m_enableMotor=a
    };
    b2.RevoluteJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };
    b2.RevoluteJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.RevoluteJoint.prototype.SetMaxMotorTorque=function(a){
    this.m_maxMotorTorque=a
    };
    b2.RevoluteJoint.prototype.GetMotorTorque=function(){
    return this.m_maxMotorTorque
    };
    b2.RevoluteJoint.prototype.K=new b2.Mat22;

    b2.RevoluteJoint.prototype.K1=new b2.Mat22;
    b2.RevoluteJoint.prototype.K2=new b2.Mat22;
    b2.RevoluteJoint.prototype.K3=new b2.Mat22;
    b2.RevoluteJoint.prototype.impulse3=new b2.Vec3;
    b2.RevoluteJoint.prototype.impulse2=new b2.Vec2;
    b2.RevoluteJoint.prototype.reduced=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_impulse=new b2.Vec3;
    b2.RevoluteJoint.prototype.m_motorImpulse=null;

    b2.RevoluteJoint.prototype.m_mass=new b2.Mat33;
    b2.RevoluteJoint.prototype.m_motorMass=null;
    b2.RevoluteJoint.prototype.m_enableMotor=null;
    b2.RevoluteJoint.prototype.m_maxMotorTorque=null;
    b2.RevoluteJoint.prototype.m_motorSpeed=null;
    b2.RevoluteJoint.prototype.m_enableLimit=null;
    b2.RevoluteJoint.prototype.m_referenceAngle=null;
    b2.RevoluteJoint.prototype.m_lowerAngle=null;
    b2.RevoluteJoint.prototype.m_upperAngle=null;
    b2.RevoluteJoint.prototype.m_limitState=0;

    b2.JointDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.JointDef.prototype.__constructor=function(){
    this.type=b2.Joint.e_unknownJoint;
    this.bodyB=this.bodyA=this.userData=null;
    this.collideConnected=!1
    };
    b2.JointDef.prototype.__varz=function(){

    };
    b2.JointDef.prototype.type=0;
    b2.JointDef.prototype.userData=null;
    b2.JointDef.prototype.bodyA=null;
    b2.JointDef.prototype.bodyB=null;
    b2.JointDef.prototype.collideConnected=null;

    b2.LineJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.LineJointDef.prototype,b2.JointDef.prototype);
    b2.LineJointDef.prototype._super=b2.JointDef.prototype;

    b2.LineJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_lineJoint;
    this.localAxisA.Set(1,0);
    this.enableLimit=!1;
    this.upperTranslation=this.lowerTranslation=0;
    this.enableMotor=!1;
    this.motorSpeed=this.maxMotorForce=0
    };
    b2.LineJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2;
    this.localAxisA=new b2.Vec2
    };

    b2.LineJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.localAxisA=this.bodyA.GetLocalVector(d)
    };
    b2.LineJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.LineJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.LineJointDef.prototype.localAxisA=new b2.Vec2;
    b2.LineJointDef.prototype.enableLimit=null;
    b2.LineJointDef.prototype.lowerTranslation=null;

    b2.LineJointDef.prototype.upperTranslation=null;
    b2.LineJointDef.prototype.enableMotor=null;
    b2.LineJointDef.prototype.maxMotorForce=null;
    b2.LineJointDef.prototype.motorSpeed=null;
    b2.DistanceJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.DistanceJoint.prototype,b2.Joint.prototype);
    b2.DistanceJoint.prototype._super=b2.Joint.prototype;

    b2.DistanceJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_length=a.length;
    this.m_frequencyHz=a.frequencyHz;
    this.m_dampingRatio=a.dampingRatio;
    this.m_bias=this.m_gamma=this.m_impulse=0
    };
    b2.DistanceJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_u=new b2.Vec2
    };

    b2.DistanceJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchor1.x-d.m_sweep.localCenter.x,g=this.m_localAnchor1.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchor2.x-e.m_sweep.localCenter.x,i=this.m_localAnchor2.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    this.m_u.x=e.m_sweep.c.x+f-d.m_sweep.c.x-h;
    this.m_u.y=e.m_sweep.c.y+i-d.m_sweep.c.y-
        g;
    c=Math.sqrt(this.m_u.x*this.m_u.x+this.m_u.y*this.m_u.y);
    c>b2.Settings.b2_linearSlop?this.m_u.Multiply(1/c):this.m_u.SetZero();
    b=h*this.m_u.y-g*this.m_u.x;
    var j=f*this.m_u.y-i*this.m_u.x;
    b=d.m_invMass+d.m_invI*b*b+e.m_invMass+e.m_invI*j*j;
    this.m_mass=b!=0?1/b:0;
    if(this.m_frequencyHz>0){
        c-=this.m_length;
        var j=2*Math.PI*this.m_frequencyHz,k=this.m_mass*j*j;
        this.m_gamma=a.dt*(2*this.m_mass*this.m_dampingRatio*j+a.dt*k);
        this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0;
        this.m_bias=c*a.dt*k*this.m_gamma;

        this.m_mass=b+this.m_gamma;
        this.m_mass=this.m_mass!=0?1/this.m_mass:0}a.warmStarting?(this.m_impulse*=a.dtRatio,a=this.m_impulse*this.m_u.x,b=this.m_impulse*this.m_u.y,d.m_linearVelocity.x-=d.m_invMass*a,d.m_linearVelocity.y-=d.m_invMass*b,d.m_angularVelocity-=d.m_invI*(h*b-g*a),e.m_linearVelocity.x+=e.m_invMass*a,e.m_linearVelocity.y+=e.m_invMass*b,e.m_angularVelocity+=e.m_invI*(f*b-i*a)):this.m_impulse=0
    };

    b2.DistanceJoint.prototype.SolveVelocityConstraints=function(){
    var a,b=this.m_bodyA,c=this.m_bodyB;
    a=b.m_xf.R;
    var d=this.m_localAnchor1.x-b.m_sweep.localCenter.x,e=this.m_localAnchor1.y-b.m_sweep.localCenter.y,h=a.col1.x*d+a.col2.x*e,e=a.col1.y*d+a.col2.y*e,d=h;
    a=c.m_xf.R;
    var g=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,h=a.col1.x*g+a.col2.x*f,f=a.col1.y*g+a.col2.y*f,g=h,h=-this.m_mass*(this.m_u.x*(c.m_linearVelocity.x+-c.m_angularVelocity*f-(b.m_linearVelocity.x+
                                                                                                                     -b.m_angularVelocity*e))+this.m_u.y*(c.m_linearVelocity.y+c.m_angularVelocity*g-(b.m_linearVelocity.y+b.m_angularVelocity*d))+this.m_bias+this.m_gamma*this.m_impulse);
    this.m_impulse+=h;
    a=h*this.m_u.x;
    h*=this.m_u.y;
    b.m_linearVelocity.x-=b.m_invMass*a;
    b.m_linearVelocity.y-=b.m_invMass*h;
    b.m_angularVelocity-=b.m_invI*(d*h-e*a);
    c.m_linearVelocity.x+=c.m_invMass*a;
    c.m_linearVelocity.y+=c.m_invMass*h;
    c.m_angularVelocity+=c.m_invI*(g*h-f*a)
    };

    b2.DistanceJoint.prototype.SolvePositionConstraints=function(){
    var a;
    if(this.m_frequencyHz>0)return!0;
    var b=this.m_bodyA,c=this.m_bodyB;
    a=b.m_xf.R;
    var d=this.m_localAnchor1.x-b.m_sweep.localCenter.x,e=this.m_localAnchor1.y-b.m_sweep.localCenter.y,h=a.col1.x*d+a.col2.x*e,e=a.col1.y*d+a.col2.y*e,d=h;
    a=c.m_xf.R;
    var g=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,h=a.col1.x*g+a.col2.x*f,f=a.col1.y*g+a.col2.y*f,g=h,h=c.m_sweep.c.x+g-b.m_sweep.c.x-d,i=c.m_sweep.c.y+
        f-b.m_sweep.c.y-e;
    a=Math.sqrt(h*h+i*i);
    h/=a;
    i/=a;
    a-=this.m_length;
    a=b2.Math.Clamp(a,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection);
    var j=-this.m_mass*a;
    this.m_u.Set(h,i);
    h=j*this.m_u.x;
    i=j*this.m_u.y;
    b.m_sweep.c.x-=b.m_invMass*h;
    b.m_sweep.c.y-=b.m_invMass*i;
    b.m_sweep.a-=b.m_invI*(d*i-e*h);
    c.m_sweep.c.x+=c.m_invMass*h;
    c.m_sweep.c.y+=c.m_invMass*i;
    c.m_sweep.a+=c.m_invI*(g*i-f*h);
    b.SynchronizeTransform();
    c.SynchronizeTransform();
    return b2.Math.Abs(a)<b2.Settings.b2_linearSlop
    };

    b2.DistanceJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.DistanceJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2.DistanceJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_u.x,a*this.m_impulse*this.m_u.y)
    };
    b2.DistanceJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.DistanceJoint.prototype.GetLength=function(){
    return this.m_length
    };

    b2.DistanceJoint.prototype.SetLength=function(a){
    this.m_length=a
    };
    b2.DistanceJoint.prototype.GetFrequency=function(){
    return this.m_frequencyHz
    };
    b2.DistanceJoint.prototype.SetFrequency=function(a){
    this.m_frequencyHz=a
    };
    b2.DistanceJoint.prototype.GetDampingRatio=function(){
    return this.m_dampingRatio
    };
    b2.DistanceJoint.prototype.SetDampingRatio=function(a){
    this.m_dampingRatio=a
    };
    b2.DistanceJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.DistanceJoint.prototype.m_localAnchor2=new b2.Vec2;

    b2.DistanceJoint.prototype.m_u=new b2.Vec2;
    b2.DistanceJoint.prototype.m_frequencyHz=null;
    b2.DistanceJoint.prototype.m_dampingRatio=null;
    b2.DistanceJoint.prototype.m_gamma=null;
    b2.DistanceJoint.prototype.m_bias=null;
    b2.DistanceJoint.prototype.m_impulse=null;
    b2.DistanceJoint.prototype.m_mass=null;
    b2.DistanceJoint.prototype.m_length=null;
    b2.PulleyJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PulleyJointDef.prototype,b2.JointDef.prototype);

    b2.PulleyJointDef.prototype._super=b2.JointDef.prototype;
    b2.PulleyJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_pulleyJoint;
    this.groundAnchorA.Set(-1,1);
    this.groundAnchorB.Set(1,1);
    this.localAnchorA.Set(-1,0);
    this.localAnchorB.Set(1,0);
    this.maxLengthB=this.lengthB=this.maxLengthA=this.lengthA=0;
    this.ratio=1;
    this.collideConnected=!0
    };

    b2.PulleyJointDef.prototype.__varz=function(){
    this.groundAnchorA=new b2.Vec2;
    this.groundAnchorB=new b2.Vec2;
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };

    b2.PulleyJointDef.prototype.Initialize=function(a,b,c,d,e,h,g){
    this.bodyA=a;
    this.bodyB=b;
    this.groundAnchorA.SetV(c);
    this.groundAnchorB.SetV(d);
    this.localAnchorA=this.bodyA.GetLocalPoint(e);
    this.localAnchorB=this.bodyB.GetLocalPoint(h);
    a=e.x-c.x;
    c=e.y-c.y;
    this.lengthA=Math.sqrt(a*a+c*c);
    c=h.x-d.x;
    d=h.y-d.y;
    this.lengthB=Math.sqrt(c*c+d*d);
    this.ratio=g;
    g=this.lengthA+this.ratio*this.lengthB;
    this.maxLengthA=g-this.ratio*b2.PulleyJoint.b2_minPulleyLength;
    this.maxLengthB=(g-b2.PulleyJoint.b2_minPulleyLength)/
        this.ratio
    };
    b2.PulleyJointDef.prototype.groundAnchorA=new b2.Vec2;
    b2.PulleyJointDef.prototype.groundAnchorB=new b2.Vec2;
    b2.PulleyJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.PulleyJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.PulleyJointDef.prototype.lengthA=null;
    b2.PulleyJointDef.prototype.maxLengthA=null;
    b2.PulleyJointDef.prototype.lengthB=null;
    b2.PulleyJointDef.prototype.maxLengthB=null;
    b2.PulleyJointDef.prototype.ratio=null;

    b2.DistanceJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.DistanceJointDef.prototype,b2.JointDef.prototype);
    b2.DistanceJointDef.prototype._super=b2.JointDef.prototype;
    b2.DistanceJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_distanceJoint;
    this.length=1;
    this.dampingRatio=this.frequencyHz=0
    };

    b2.DistanceJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.DistanceJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
    a=d.x-c.x;
    c=d.y-c.y;
    this.length=Math.sqrt(a*a+c*c);
    this.dampingRatio=this.frequencyHz=0
    };
    b2.DistanceJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.DistanceJointDef.prototype.localAnchorB=new b2.Vec2;

    b2.DistanceJointDef.prototype.length=null;
    b2.DistanceJointDef.prototype.frequencyHz=null;
    b2.DistanceJointDef.prototype.dampingRatio=null;
    b2.FrictionJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.FrictionJointDef.prototype,b2.JointDef.prototype);
    b2.FrictionJointDef.prototype._super=b2.JointDef.prototype;

    b2.FrictionJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_frictionJoint;
    this.maxTorque=this.maxForce=0
    };
    b2.FrictionJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.FrictionJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c))
    };

    b2.FrictionJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.FrictionJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.FrictionJointDef.prototype.maxForce=null;
    b2.FrictionJointDef.prototype.maxTorque=null;
    b2.WeldJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.WeldJointDef.prototype,b2.JointDef.prototype);
    b2.WeldJointDef.prototype._super=b2.JointDef.prototype;

    b2.WeldJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_weldJoint;
    this.referenceAngle=0
    };
    b2.WeldJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.WeldJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c));
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };

    b2.WeldJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.WeldJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.WeldJointDef.prototype.referenceAngle=null;
    b2.GearJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GearJointDef.prototype,b2.JointDef.prototype);
    b2.GearJointDef.prototype._super=b2.JointDef.prototype;

    b2.GearJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_gearJoint;
    this.joint2=this.joint1=null;
    this.ratio=1
    };
    b2.GearJointDef.prototype.__varz=function(){

    };
    b2.GearJointDef.prototype.joint1=null;
    b2.GearJointDef.prototype.joint2=null;
    b2.GearJointDef.prototype.ratio=null;
    b2.Color=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Color.prototype.__constructor=function(a,b,c){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1));
    this._g=parseInt(255*b2.Math.Clamp(b,0,1));
    this._b=parseInt(255*b2.Math.Clamp(c,0,1))
    };
    b2.Color.prototype.__varz=function(){

    };
    b2.Color.prototype.Set=function(a,b,c){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1));
    this._g=parseInt(255*b2.Math.Clamp(b,0,1));
    this._b=parseInt(255*b2.Math.Clamp(c,0,1))
    };
    b2.Color.prototype.__defineGetter__("r",function(){
    return this._r});

    b2.Color.prototype.__defineSetter__("r",function(a){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1))});
    b2.Color.prototype.__defineGetter__("g",function(){
    return this._g});
    b2.Color.prototype.__defineSetter__("g",function(a){
    this._g=parseInt(255*b2.Math.Clamp(a,0,1))});
    b2.Color.prototype.__defineGetter__("b",function(){
    return this._b});
    b2.Color.prototype.__defineSetter__("b",function(a){
    this._b=parseInt(255*b2.Math.Clamp(a,0,1))});

    b2.Color.prototype.__defineGetter__("color",function(){
    return this._r<<16|this._g<<8|this._b});
    b2.Color.prototype._r=0;
    b2.Color.prototype._g=0;
    b2.Color.prototype._b=0;
    b2.FrictionJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.FrictionJoint.prototype,b2.Joint.prototype);
    b2.FrictionJoint.prototype._super=b2.Joint.prototype;

    b2.FrictionJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_linearMass.SetZero();
    this.m_angularMass=0;
    this.m_linearImpulse.SetZero();
    this.m_angularImpulse=0;
    this.m_maxForce=a.maxForce;
    this.m_maxTorque=a.maxTorque
    };
    b2.FrictionJoint.prototype.__varz=function(){
    this.m_localAnchorA=new b2.Vec2;
    this.m_localAnchorB=new b2.Vec2;
    this.m_linearImpulse=new b2.Vec2;
    this.m_linearMass=new b2.Mat22
    };

    b2.FrictionJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchorA.x-d.m_sweep.localCenter.x,g=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchorB.x-e.m_sweep.localCenter.x,i=this.m_localAnchorB.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    b=d.m_invMass;
    c=e.m_invMass;
    var j=d.m_invI,k=e.m_invI,l=new b2.Mat22;
    l.col1.x=
        b+c;
    l.col2.x=0;
    l.col1.y=0;
    l.col2.y=b+c;
    l.col1.x+=j*g*g;
    l.col2.x+=-j*h*g;
    l.col1.y+=-j*h*g;
    l.col2.y+=j*h*h;
    l.col1.x+=k*i*i;
    l.col2.x+=-k*f*i;
    l.col1.y+=-k*f*i;
    l.col2.y+=k*f*f;
    l.GetInverse(this.m_linearMass);
    this.m_angularMass=j+k;
    if(this.m_angularMass>0)this.m_angularMass=1/this.m_angularMass;
    a.warmStarting?(this.m_linearImpulse.x*=a.dtRatio,this.m_linearImpulse.y*=a.dtRatio,this.m_angularImpulse*=a.dtRatio,a=this.m_linearImpulse,d.m_linearVelocity.x-=b*a.x,d.m_linearVelocity.y-=b*a.y,d.m_angularVelocity-=
            j*(h*a.y-g*a.x+this.m_angularImpulse),e.m_linearVelocity.x+=c*a.x,e.m_linearVelocity.y+=c*a.y,e.m_angularVelocity+=k*(f*a.y-i*a.x+this.m_angularImpulse)):(this.m_linearImpulse.SetZero(),this.m_angularImpulse=0)
    };

    b2.FrictionJoint.prototype.SolveVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB,h=d.m_linearVelocity,g=d.m_angularVelocity,f=e.m_linearVelocity,i=e.m_angularVelocity,j=d.m_invMass,k=e.m_invMass,l=d.m_invI,n=e.m_invI;
    b=d.m_xf.R;
    var m=this.m_localAnchorA.x-d.m_sweep.localCenter.x,o=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*m+b.col2.x*o;
    o=b.col1.y*m+b.col2.y*o;
    m=c;
    b=e.m_xf.R;
    var p=this.m_localAnchorB.x-e.m_sweep.localCenter.x,q=this.m_localAnchorB.y-e.m_sweep.localCenter.y;

    c=b.col1.x*p+b.col2.x*q;
    q=b.col1.y*p+b.col2.y*q;
    p=c;
    c=-this.m_angularMass*(i-g);
    var r=this.m_angularImpulse;
    b=a.dt*this.m_maxTorque;
    this.m_angularImpulse=b2.Math.Clamp(this.m_angularImpulse+c,-b,b);
    c=this.m_angularImpulse-r;
    g-=l*c;
    i+=n*c;
    b=b2.Math.MulMV(this.m_linearMass,new b2.Vec2(-(f.x-i*q-h.x+g*o),-(f.y+i*p-h.y-g*m)));
    c=this.m_linearImpulse.Copy();
    this.m_linearImpulse.Add(b);
    b=a.dt*this.m_maxForce;
    this.m_linearImpulse.LengthSquared()>b*b&&(this.m_linearImpulse.Normalize(),this.m_linearImpulse.Multiply(b));

    b=b2.Math.SubtractVV(this.m_linearImpulse,c);
    h.x-=j*b.x;
    h.y-=j*b.y;
    g-=l*(m*b.y-o*b.x);
    f.x+=k*b.x;
    f.y+=k*b.y;
    i+=n*(p*b.y-q*b.x);
    d.m_angularVelocity=g;
    e.m_angularVelocity=i
    };
    b2.FrictionJoint.prototype.SolvePositionConstraints=function(){
    return!0
    };
    b2.FrictionJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2.FrictionJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };

    b2.FrictionJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_linearImpulse.x,a*this.m_linearImpulse.y)
    };
    b2.FrictionJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_angularImpulse
    };
    b2.FrictionJoint.prototype.SetMaxForce=function(a){
    this.m_maxForce=a
    };
    b2.FrictionJoint.prototype.GetMaxForce=function(){
    return this.m_maxForce
    };
    b2.FrictionJoint.prototype.SetMaxTorque=function(a){
    this.m_maxTorque=a
    };
    b2.FrictionJoint.prototype.GetMaxTorque=function(){
    return this.m_maxTorque
    };

    b2.FrictionJoint.prototype.m_localAnchorA=new b2.Vec2;
    b2.FrictionJoint.prototype.m_localAnchorB=new b2.Vec2;
    b2.FrictionJoint.prototype.m_linearImpulse=new b2.Vec2;
    b2.FrictionJoint.prototype.m_angularImpulse=null;
    b2.FrictionJoint.prototype.m_maxForce=null;
    b2.FrictionJoint.prototype.m_maxTorque=null;
    b2.FrictionJoint.prototype.m_linearMass=new b2.Mat22;
    b2.FrictionJoint.prototype.m_angularMass=null;
    b2.Distance=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Distance.prototype.__constructor=function(){

    };
    b2.Distance.prototype.__varz=function(){

    };

    b2.Distance.Distance=function(a,b,c){
    ++b2.Distance.b2_gjkCalls;
    var d=c.proxyA,e=c.proxyB,h=c.transformA,g=c.transformB,f=b2.Distance.s_simplex;
    f.ReadCache(b,d,h,e,g);
    var i=f.m_vertices,j=b2.Distance.s_saveA,k=b2.Distance.s_saveB,l=0;
    f.GetClosestPoint().LengthSquared();
    for(var n=0,m,o=0;
        o<20;
       ){
        l=f.m_count;
        for(n=0;
        n<l;
        n++)j[n]=i[n].indexA,k[n]=i[n].indexB;
        switch(f.m_count){
        case 1:break;
        case 2:f.Solve2();
        break;
        case 3:f.Solve3();
        break;
        default:b2.Settings.b2Assert(!1)}if(f.m_count==3)break;
        m=f.GetClosestPoint();

        m.LengthSquared();
        n=f.GetSearchDirection();
        if(n.LengthSquared()<Number.MIN_VALUE*Number.MIN_VALUE)break;
        m=i[f.m_count];
        m.indexA=d.GetSupport(b2.Math.MulTMV(h.R,n.GetNegative()));
        m.wA=b2.Math.MulX(h,d.GetVertex(m.indexA));
        m.indexB=e.GetSupport(b2.Math.MulTMV(g.R,n));
        m.wB=b2.Math.MulX(g,e.GetVertex(m.indexB));
        m.w=b2.Math.SubtractVV(m.wB,m.wA);
        ++o;
        ++b2.Distance.b2_gjkIters;
        for(var p=!1,n=0;
        n<l;
        n++)if(m.indexA==j[n]&&m.indexB==k[n]){
            p=!0;
            break}if(p)break;
        ++f.m_count}b2.Distance.b2_gjkMaxIters=b2.Math.Max(b2.Distance.b2_gjkMaxIters,
                                   o);
    f.GetWitnessPoints(a.pointA,a.pointB);
    a.distance=b2.Math.SubtractVV(a.pointA,a.pointB).Length();
    a.iterations=o;
    f.WriteCache(b);
    if(c.useRadii)b=d.m_radius,e=e.m_radius,a.distance>b+e&&a.distance>Number.MIN_VALUE?(a.distance-=b+e,c=b2.Math.SubtractVV(a.pointB,a.pointA),c.Normalize(),a.pointA.x+=b*c.x,a.pointA.y+=b*c.y,a.pointB.x-=e*c.x,a.pointB.y-=e*c.y):(m=new b2.Vec2,m.x=0.5*(a.pointA.x+a.pointB.x),m.y=0.5*(a.pointA.y+a.pointB.y),a.pointA.x=a.pointB.x=m.x,a.pointA.y=a.pointB.y=m.y,a.distance=0)
    };

    b2.Distance.b2_gjkCalls=0;
    b2.Distance.b2_gjkIters=0;
    b2.Distance.b2_gjkMaxIters=0;
    b2.Distance.s_simplex=new b2.Simplex;
    b2.Distance.s_saveA=Array(3);
    b2.Distance.s_saveB=Array(3);
    b2.MouseJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.MouseJoint.prototype,b2.Joint.prototype);
    b2.MouseJoint.prototype._super=b2.Joint.prototype;

    b2.MouseJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_target.SetV(a.target);
    var b=this.m_target.x-this.m_bodyB.m_xf.position.x,c=this.m_target.y-this.m_bodyB.m_xf.position.y,d=this.m_bodyB.m_xf.R;
    this.m_localAnchor.x=b*d.col1.x+c*d.col1.y;
    this.m_localAnchor.y=b*d.col2.x+c*d.col2.y;
    this.m_maxForce=a.maxForce;
    this.m_impulse.SetZero();
    this.m_frequencyHz=a.frequencyHz;
    this.m_dampingRatio=a.dampingRatio;
    this.m_gamma=this.m_beta=0
    };

    b2.MouseJoint.prototype.__varz=function(){
    this.K=new b2.Mat22;
    this.K1=new b2.Mat22;
    this.K2=new b2.Mat22;
    this.m_localAnchor=new b2.Vec2;
    this.m_target=new b2.Vec2;
    this.m_impulse=new b2.Vec2;
    this.m_mass=new b2.Mat22;
    this.m_C=new b2.Vec2
    };

    b2.MouseJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyB,c=b.GetMass(),d=2*Math.PI*this.m_frequencyHz,e=c*d*d;
    this.m_gamma=a.dt*(2*c*this.m_dampingRatio*d+a.dt*e);
    this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0;
    this.m_beta=a.dt*e*this.m_gamma;
    var e=b.m_xf.R,c=this.m_localAnchor.x-b.m_sweep.localCenter.x,d=this.m_localAnchor.y-b.m_sweep.localCenter.y,h=e.col1.x*c+e.col2.x*d,d=e.col1.y*c+e.col2.y*d,c=h,e=b.m_invMass,h=b.m_invI;
    this.K1.col1.x=e;
    this.K1.col2.x=0;
    this.K1.col1.y=0;
    this.K1.col2.y=
        e;
    this.K2.col1.x=h*d*d;
    this.K2.col2.x=-h*c*d;
    this.K2.col1.y=-h*c*d;
    this.K2.col2.y=h*c*c;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.col1.x+=this.m_gamma;
    this.K.col2.y+=this.m_gamma;
    this.K.GetInverse(this.m_mass);
    this.m_C.x=b.m_sweep.c.x+c-this.m_target.x;
    this.m_C.y=b.m_sweep.c.y+d-this.m_target.y;
    b.m_angularVelocity*=0.98;
    this.m_impulse.x*=a.dtRatio;
    this.m_impulse.y*=a.dtRatio;
    b.m_linearVelocity.x+=e*this.m_impulse.x;
    b.m_linearVelocity.y+=e*this.m_impulse.y;
    b.m_angularVelocity+=h*(c*this.m_impulse.y-
                d*this.m_impulse.x)
    };

    b2.MouseJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyB,c,d,e;
    c=b.m_xf.R;
    var h=this.m_localAnchor.x-b.m_sweep.localCenter.x,g=this.m_localAnchor.y-b.m_sweep.localCenter.y;
    d=c.col1.x*h+c.col2.x*g;
    g=c.col1.y*h+c.col2.y*g;
    h=d;
    d=b.m_linearVelocity.x+-b.m_angularVelocity*g;
    var f=b.m_linearVelocity.y+b.m_angularVelocity*h;
    c=this.m_mass;
    d=d+this.m_beta*this.m_C.x+this.m_gamma*this.m_impulse.x;
    e=f+this.m_beta*this.m_C.y+this.m_gamma*this.m_impulse.y;
    f=-(c.col1.x*d+c.col2.x*e);
    e=-(c.col1.y*
        d+c.col2.y*e);
    c=this.m_impulse.x;
    d=this.m_impulse.y;
    this.m_impulse.x+=f;
    this.m_impulse.y+=e;
    a=a.dt*this.m_maxForce;
    this.m_impulse.LengthSquared()>a*a&&this.m_impulse.Multiply(a/this.m_impulse.Length());
    f=this.m_impulse.x-c;
    e=this.m_impulse.y-d;
    b.m_linearVelocity.x+=b.m_invMass*f;
    b.m_linearVelocity.y+=b.m_invMass*e;
    b.m_angularVelocity+=b.m_invI*(h*e-g*f)
    };
    b2.MouseJoint.prototype.SolvePositionConstraints=function(){
    return!0
    };
    b2.MouseJoint.prototype.GetAnchorA=function(){
    return this.m_target
    };

    b2.MouseJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    };
    b2.MouseJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.MouseJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.MouseJoint.prototype.GetTarget=function(){
    return this.m_target
    };
    b2.MouseJoint.prototype.SetTarget=function(a){
    this.m_bodyB.IsAwake()==!1&&this.m_bodyB.SetAwake(!0);
    this.m_target=a
    };
    b2.MouseJoint.prototype.GetMaxForce=function(){
    return this.m_maxForce
    };

    b2.MouseJoint.prototype.SetMaxForce=function(a){
    this.m_maxForce=a
    };
    b2.MouseJoint.prototype.GetFrequency=function(){
    return this.m_frequencyHz
    };
    b2.MouseJoint.prototype.SetFrequency=function(a){
    this.m_frequencyHz=a
    };
    b2.MouseJoint.prototype.GetDampingRatio=function(){
    return this.m_dampingRatio
    };
    b2.MouseJoint.prototype.SetDampingRatio=function(a){
    this.m_dampingRatio=a
    };
    b2.MouseJoint.prototype.K=new b2.Mat22;
    b2.MouseJoint.prototype.K1=new b2.Mat22;
    b2.MouseJoint.prototype.K2=new b2.Mat22;

    b2.MouseJoint.prototype.m_localAnchor=new b2.Vec2;
    b2.MouseJoint.prototype.m_target=new b2.Vec2;
    b2.MouseJoint.prototype.m_impulse=new b2.Vec2;
    b2.MouseJoint.prototype.m_mass=new b2.Mat22;
    b2.MouseJoint.prototype.m_C=new b2.Vec2;
    b2.MouseJoint.prototype.m_maxForce=null;
    b2.MouseJoint.prototype.m_frequencyHz=null;
    b2.MouseJoint.prototype.m_dampingRatio=null;
    b2.MouseJoint.prototype.m_beta=null;
    b2.MouseJoint.prototype.m_gamma=null;

    b2.PrismaticJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PrismaticJointDef.prototype,b2.JointDef.prototype);
    b2.PrismaticJointDef.prototype._super=b2.JointDef.prototype;

    b2.PrismaticJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_prismaticJoint;
    this.localAxisA.Set(1,0);
    this.referenceAngle=0;
    this.enableLimit=!1;
    this.upperTranslation=this.lowerTranslation=0;
    this.enableMotor=!1;
    this.motorSpeed=this.maxMotorForce=0
    };
    b2.PrismaticJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2;
    this.localAxisA=new b2.Vec2
    };

    b2.PrismaticJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.localAxisA=this.bodyA.GetLocalVector(d);
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };
    b2.PrismaticJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.PrismaticJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.PrismaticJointDef.prototype.localAxisA=new b2.Vec2;
    b2.PrismaticJointDef.prototype.referenceAngle=null;

    b2.PrismaticJointDef.prototype.enableLimit=null;
    b2.PrismaticJointDef.prototype.lowerTranslation=null;
    b2.PrismaticJointDef.prototype.upperTranslation=null;
    b2.PrismaticJointDef.prototype.enableMotor=null;
    b2.PrismaticJointDef.prototype.maxMotorForce=null;
    b2.PrismaticJointDef.prototype.motorSpeed=null;
    b2.TimeOfImpact=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TimeOfImpact.prototype.__constructor=function(){

    };
    b2.TimeOfImpact.prototype.__varz=function(){

    };

    b2.TimeOfImpact.TimeOfImpact=function(a){
    ++b2.TimeOfImpact.b2_toiCalls;
    var b=a.proxyA,c=a.proxyB,d=a.sweepA,e=a.sweepB;
    b2.Settings.b2Assert(d.t0==e.t0);
    b2.Settings.b2Assert(1-d.t0>Number.MIN_VALUE);
    var h=b.m_radius+c.m_radius,a=a.tolerance,g=0,f=0,i=0;
    b2.TimeOfImpact.s_cache.count=0;
    for(b2.TimeOfImpact.s_distanceInput.useRadii=!1;
        ;
       ){
        d.GetTransform(b2.TimeOfImpact.s_xfA,g);
        e.GetTransform(b2.TimeOfImpact.s_xfB,g);
        b2.TimeOfImpact.s_distanceInput.proxyA=b;
        b2.TimeOfImpact.s_distanceInput.proxyB=c;
        b2.TimeOfImpact.s_distanceInput.transformA=
        b2.TimeOfImpact.s_xfA;
        b2.TimeOfImpact.s_distanceInput.transformB=b2.TimeOfImpact.s_xfB;
        b2.Distance.Distance(b2.TimeOfImpact.s_distanceOutput,b2.TimeOfImpact.s_cache,b2.TimeOfImpact.s_distanceInput);
        if(b2.TimeOfImpact.s_distanceOutput.distance<=0){
        g=1;
        break}b2.TimeOfImpact.s_fcn.Initialize(b2.TimeOfImpact.s_cache,b,b2.TimeOfImpact.s_xfA,c,b2.TimeOfImpact.s_xfB);
        var j=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
        if(j<=0){
        g=1;
        break}f==0&&(i=j>h?b2.Math.Max(h-a,0.75*h):
                 b2.Math.Max(j-a,0.02*h));
        if(j-i<0.5*a){
        if(f==0){
            g=1;
            break}break}var k=g,l=g,n=1;
        d.GetTransform(b2.TimeOfImpact.s_xfA,n);
        e.GetTransform(b2.TimeOfImpact.s_xfB,n);
        var m=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
        if(m>=i){
        g=1;
        break}for(var o=0;
              ;
             ){
            var p;
            p=o&1?l+(i-j)*(n-l)/(m-j):0.5*(l+n);
            d.GetTransform(b2.TimeOfImpact.s_xfA,p);
            e.GetTransform(b2.TimeOfImpact.s_xfB,p);
            var q=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
            if(b2.Math.Abs(q-i)<0.025*
               a){
            k=p;
            break}q>i?(l=p,j=q):(n=p,m=q);
            ++o;
            ++b2.TimeOfImpact.b2_toiRootIters;
            if(o==50)break}b2.TimeOfImpact.b2_toiMaxRootIters=b2.Math.Max(b2.TimeOfImpact.b2_toiMaxRootIters,o);
        if(k<(1+100*Number.MIN_VALUE)*g)break;
        g=k;
        f++;
        ++b2.TimeOfImpact.b2_toiIters;
        if(f==1E3)break}b2.TimeOfImpact.b2_toiMaxIters=b2.Math.Max(b2.TimeOfImpact.b2_toiMaxIters,f);
    return g
    };
    b2.TimeOfImpact.b2_toiCalls=0;
    b2.TimeOfImpact.b2_toiIters=0;
    b2.TimeOfImpact.b2_toiMaxIters=0;
    b2.TimeOfImpact.b2_toiRootIters=0;

    b2.TimeOfImpact.b2_toiMaxRootIters=0;
    b2.TimeOfImpact.s_cache=new b2.SimplexCache;
    b2.TimeOfImpact.s_distanceInput=new b2.DistanceInput;
    b2.TimeOfImpact.s_xfA=new b2.Transform;
    b2.TimeOfImpact.s_xfB=new b2.Transform;
    b2.TimeOfImpact.s_fcn=new b2.SeparationFunction;
    b2.TimeOfImpact.s_distanceOutput=new b2.DistanceOutput;
    b2.GearJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GearJoint.prototype,b2.Joint.prototype);

    b2.GearJoint.prototype._super=b2.Joint.prototype;

    b2.GearJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    var b=a.joint1.m_type,c=a.joint2.m_type;
    this.m_prismatic2=this.m_revolute2=this.m_prismatic1=this.m_revolute1=null;
    this.m_ground1=a.joint1.GetBodyA();
    this.m_bodyA=a.joint1.GetBodyB();
    b==b2.Joint.e_revoluteJoint?(this.m_revolute1=a.joint1,this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1),this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2),b=this.m_revolute1.GetJointAngle()):(this.m_prismatic1=
                                                                                                             a.joint1,this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1),this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2),b=this.m_prismatic1.GetJointTranslation());
    this.m_ground2=a.joint2.GetBodyA();
    this.m_bodyB=a.joint2.GetBodyB();
    c==b2.Joint.e_revoluteJoint?(this.m_revolute2=a.joint2,this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1),this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2),c=this.m_revolute2.GetJointAngle()):(this.m_prismatic2=a.joint2,this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1),
                                                                                                             this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2),c=this.m_prismatic2.GetJointTranslation());
    this.m_ratio=a.ratio;
    this.m_constant=b+this.m_ratio*c;
    this.m_impulse=0
    };
    b2.GearJoint.prototype.__varz=function(){
    this.m_groundAnchor1=new b2.Vec2;
    this.m_groundAnchor2=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_J=new b2.Jacobian
    };

    b2.GearJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_ground1,c=this.m_ground2,d=this.m_bodyA,e=this.m_bodyB,h,g,f,i,j,k=0;
    this.m_J.SetZero();
    this.m_revolute1?(this.m_J.angularA=-1,k+=d.m_invI):(i=b.m_xf.R,h=this.m_prismatic1.m_localXAxis1,b=i.col1.x*h.x+i.col2.x*h.y,h=i.col1.y*h.x+i.col2.y*h.y,i=d.m_xf.R,g=this.m_localAnchor1.x-d.m_sweep.localCenter.x,f=this.m_localAnchor1.y-d.m_sweep.localCenter.y,j=i.col1.x*g+i.col2.x*f,f=i.col1.y*g+i.col2.y*f,i=j*h-f*b,this.m_J.linearA.Set(-b,
                                                                                                                                                                                -h),this.m_J.angularA=-i,k+=d.m_invMass+d.m_invI*i*i);
    this.m_revolute2?(this.m_J.angularB=-this.m_ratio,k+=this.m_ratio*this.m_ratio*e.m_invI):(i=c.m_xf.R,h=this.m_prismatic2.m_localXAxis1,b=i.col1.x*h.x+i.col2.x*h.y,h=i.col1.y*h.x+i.col2.y*h.y,i=e.m_xf.R,g=this.m_localAnchor2.x-e.m_sweep.localCenter.x,f=this.m_localAnchor2.y-e.m_sweep.localCenter.y,j=i.col1.x*g+i.col2.x*f,f=i.col1.y*g+i.col2.y*f,i=j*h-f*b,this.m_J.linearB.Set(-this.m_ratio*b,-this.m_ratio*h),this.m_J.angularB=-this.m_ratio*i,k+=
                                                  this.m_ratio*this.m_ratio*(e.m_invMass+e.m_invI*i*i));
    this.m_mass=k>0?1/k:0;
    a.warmStarting?(d.m_linearVelocity.x+=d.m_invMass*this.m_impulse*this.m_J.linearA.x,d.m_linearVelocity.y+=d.m_invMass*this.m_impulse*this.m_J.linearA.y,d.m_angularVelocity+=d.m_invI*this.m_impulse*this.m_J.angularA,e.m_linearVelocity.x+=e.m_invMass*this.m_impulse*this.m_J.linearB.x,e.m_linearVelocity.y+=e.m_invMass*this.m_impulse*this.m_J.linearB.y,e.m_angularVelocity+=e.m_invI*this.m_impulse*this.m_J.angularB):this.m_impulse=
        0
    };

    b2.GearJoint.prototype.SolveVelocityConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=-this.m_mass*this.m_J.Compute(a.m_linearVelocity,a.m_angularVelocity,b.m_linearVelocity,b.m_angularVelocity);
    this.m_impulse+=c;
    a.m_linearVelocity.x+=a.m_invMass*c*this.m_J.linearA.x;
    a.m_linearVelocity.y+=a.m_invMass*c*this.m_J.linearA.y;
    a.m_angularVelocity+=a.m_invI*c*this.m_J.angularA;
    b.m_linearVelocity.x+=b.m_invMass*c*this.m_J.linearB.x;
    b.m_linearVelocity.y+=b.m_invMass*c*this.m_J.linearB.y;
    b.m_angularVelocity+=b.m_invI*
        c*this.m_J.angularB
    };

    b2.GearJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c,d;
    c=this.m_revolute1?this.m_revolute1.GetJointAngle():this.m_prismatic1.GetJointTranslation();
    d=this.m_revolute2?this.m_revolute2.GetJointAngle():this.m_prismatic2.GetJointTranslation();
    c=-this.m_mass*(this.m_constant-(c+this.m_ratio*d));
    a.m_sweep.c.x+=a.m_invMass*c*this.m_J.linearA.x;
    a.m_sweep.c.y+=a.m_invMass*c*this.m_J.linearA.y;
    a.m_sweep.a+=a.m_invI*c*this.m_J.angularA;
    b.m_sweep.c.x+=b.m_invMass*c*this.m_J.linearB.x;

    b.m_sweep.c.y+=b.m_invMass*c*this.m_J.linearB.y;
    b.m_sweep.a+=b.m_invI*c*this.m_J.angularB;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return 0<b2.Settings.b2_linearSlop
    };
    b2.GearJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.GearJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.GearJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_J.linearB.x,a*this.m_impulse*this.m_J.linearB.y)
    };
    b2.GearJoint.prototype.GetReactionTorque=function(a){
    var b=this.m_bodyB.m_xf.R,c=this.m_localAnchor1.x-this.m_bodyB.m_sweep.localCenter.x,d=this.m_localAnchor1.y-this.m_bodyB.m_sweep.localCenter.y,e=b.col1.x*c+b.col2.x*d,d=b.col1.y*c+b.col2.y*d;
    return a*(this.m_impulse*this.m_J.angularB-e*this.m_impulse*this.m_J.linearB.y+d*this.m_impulse*this.m_J.linearB.x)
    };

    b2.GearJoint.prototype.GetRatio=function(){
    return this.m_ratio
    };
    b2.GearJoint.prototype.SetRatio=function(a){
    this.m_ratio=a
    };
    b2.GearJoint.prototype.m_ground1=null;
    b2.GearJoint.prototype.m_ground2=null;
    b2.GearJoint.prototype.m_revolute1=null;
    b2.GearJoint.prototype.m_prismatic1=null;
    b2.GearJoint.prototype.m_revolute2=null;
    b2.GearJoint.prototype.m_prismatic2=null;
    b2.GearJoint.prototype.m_groundAnchor1=new b2.Vec2;
    b2.GearJoint.prototype.m_groundAnchor2=new b2.Vec2;

    b2.GearJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.GearJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.GearJoint.prototype.m_J=new b2.Jacobian;
    b2.GearJoint.prototype.m_constant=null;
    b2.GearJoint.prototype.m_ratio=null;
    b2.GearJoint.prototype.m_mass=null;
    b2.GearJoint.prototype.m_impulse=null;
    b2.TOIInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TOIInput.prototype.__constructor=function(){

    };

    b2.TOIInput.prototype.__varz=function(){
    this.proxyA=new b2.DistanceProxy;
    this.proxyB=new b2.DistanceProxy;
    this.sweepA=new b2.Sweep;
    this.sweepB=new b2.Sweep
    };
    b2.TOIInput.prototype.proxyA=new b2.DistanceProxy;
    b2.TOIInput.prototype.proxyB=new b2.DistanceProxy;
    b2.TOIInput.prototype.sweepA=new b2.Sweep;
    b2.TOIInput.prototype.sweepB=new b2.Sweep;
    b2.TOIInput.prototype.tolerance=null;
    b2.RevoluteJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.RevoluteJointDef.prototype,b2.JointDef.prototype);
    b2.RevoluteJointDef.prototype._super=b2.JointDef.prototype;
    b2.RevoluteJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_revoluteJoint;
    this.localAnchorA.Set(0,0);
    this.localAnchorB.Set(0,0);
    this.motorSpeed=this.maxMotorTorque=this.upperAngle=this.lowerAngle=this.referenceAngle=0;
    this.enableMotor=this.enableLimit=!1
    };

    b2.RevoluteJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.RevoluteJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };
    b2.RevoluteJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.RevoluteJointDef.prototype.localAnchorB=new b2.Vec2;

    b2.RevoluteJointDef.prototype.referenceAngle=null;
    b2.RevoluteJointDef.prototype.enableLimit=null;
    b2.RevoluteJointDef.prototype.lowerAngle=null;
    b2.RevoluteJointDef.prototype.upperAngle=null;
    b2.RevoluteJointDef.prototype.enableMotor=null;
    b2.RevoluteJointDef.prototype.motorSpeed=null;
    b2.RevoluteJointDef.prototype.maxMotorTorque=null;
    b2.MouseJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.MouseJointDef.prototype,b2.JointDef.prototype);

    b2.MouseJointDef.prototype._super=b2.JointDef.prototype;
    b2.MouseJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_mouseJoint;
    this.maxForce=0;
    this.frequencyHz=5;
    this.dampingRatio=0.7
    };
    b2.MouseJointDef.prototype.__varz=function(){
    this.target=new b2.Vec2
    };
    b2.MouseJointDef.prototype.target=new b2.Vec2;
    b2.MouseJointDef.prototype.maxForce=null;
    b2.MouseJointDef.prototype.frequencyHz=null;
    b2.MouseJointDef.prototype.dampingRatio=null;

    b2.Contact=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Contact.prototype.__constructor=function(){

    };
    b2.Contact.prototype.__varz=function(){
    this.m_nodeA=new b2.ContactEdge;
    this.m_nodeB=new b2.ContactEdge;
    this.m_manifold=new b2.Manifold;
    this.m_oldManifold=new b2.Manifold
    };
    b2.Contact.s_input=new b2.TOIInput;
    b2.Contact.e_sensorFlag=1;
    b2.Contact.e_continuousFlag=2;
    b2.Contact.e_islandFlag=4;
    b2.Contact.e_toiFlag=8;
    b2.Contact.e_touchingFlag=16;
    b2.Contact.e_enabledFlag=32;

    b2.Contact.e_filterFlag=64;

    b2.Contact.prototype.Reset=function(a,b){
    this.m_flags=b2.Contact.e_enabledFlag;
    if(!a||!b)this.m_fixtureB=this.m_fixtureA=null;
    else{
        if(a.IsSensor()||b.IsSensor())this.m_flags|=b2.Contact.e_sensorFlag;
        var c=a.GetBody(),d=b.GetBody();
        if(c.GetType()!=b2.Body.b2_dynamicBody||c.IsBullet()||d.GetType()!=b2.Body.b2_dynamicBody||d.IsBullet())this.m_flags|=b2.Contact.e_continuousFlag;
        this.m_fixtureA=a;
        this.m_fixtureB=b;
        this.m_manifold.m_pointCount=0;
        this.m_next=this.m_prev=null;
        this.m_nodeA.contact=null;
        this.m_nodeA.prev=
        null;
        this.m_nodeA.next=null;
        this.m_nodeA.other=null;
        this.m_nodeB.contact=null;
        this.m_nodeB.prev=null;
        this.m_nodeB.next=null;
        this.m_nodeB.other=null}
    };

    b2.Contact.prototype.Update=function(a){
    var b=this.m_oldManifold;
    this.m_oldManifold=this.m_manifold;
    this.m_manifold=b;
    this.m_flags|=b2.Contact.e_enabledFlag;
    var c=!1,b=(this.m_flags&b2.Contact.e_touchingFlag)==b2.Contact.e_touchingFlag,d=this.m_fixtureA.m_body,e=this.m_fixtureB.m_body,h=this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
    if(this.m_flags&b2.Contact.e_sensorFlag)h&&(c=this.m_fixtureA.GetShape(),h=this.m_fixtureB.GetShape(),d=d.GetTransform(),e=e.GetTransform(),c=b2.Shape.TestOverlap(c,
                                                                                       d,h,e)),this.m_manifold.m_pointCount=0;
    else{
        d.GetType()!=b2.Body.b2_dynamicBody||d.IsBullet()||e.GetType()!=b2.Body.b2_dynamicBody||e.IsBullet()?this.m_flags|=b2.Contact.e_continuousFlag:this.m_flags&=~b2.Contact.e_continuousFlag;
        if(h){
        this.Evaluate();
        c=this.m_manifold.m_pointCount>0;
        for(h=0;
            h<this.m_manifold.m_pointCount;
            ++h){
            var g=this.m_manifold.m_points[h];
            g.m_normalImpulse=0;
            g.m_tangentImpulse=0;
            for(var f=g.m_id,i=0;
            i<this.m_oldManifold.m_pointCount;
            ++i){
            var j=this.m_oldManifold.m_points[i];

            if(j.m_id.key==f.key){
                g.m_normalImpulse=j.m_normalImpulse;
                g.m_tangentImpulse=j.m_tangentImpulse;
                break}}}}else this.m_manifold.m_pointCount=0;
        c!=b&&(d.SetAwake(!0),e.SetAwake(!0))}c?this.m_flags|=b2.Contact.e_touchingFlag:this.m_flags&=~b2.Contact.e_touchingFlag;
    b==!1&&c==!0&&a.BeginContact(this);
    b==!0&&c==!1&&a.EndContact(this);
    (this.m_flags&b2.Contact.e_sensorFlag)==0&&a.PreSolve(this,this.m_oldManifold)
    };
    b2.Contact.prototype.Evaluate=function(){

    };

    b2.Contact.prototype.ComputeTOI=function(a,b){
    b2.Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
    b2.Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
    b2.Contact.s_input.sweepA=a;
    b2.Contact.s_input.sweepB=b;
    b2.Contact.s_input.tolerance=b2.Settings.b2_linearSlop;
    return b2.TimeOfImpact.TimeOfImpact(b2.Contact.s_input)
    };
    b2.Contact.prototype.GetManifold=function(){
    return this.m_manifold
    };

    b2.Contact.prototype.GetWorldManifold=function(a){
    var b=this.m_fixtureA.GetBody(),c=this.m_fixtureB.GetBody(),d=this.m_fixtureA.GetShape(),e=this.m_fixtureB.GetShape();
    a.Initialize(this.m_manifold,b.GetTransform(),d.m_radius,c.GetTransform(),e.m_radius)
    };
    b2.Contact.prototype.IsTouching=function(){
    return(this.m_flags&b2.Contact.e_touchingFlag)==b2.Contact.e_touchingFlag
    };
    b2.Contact.prototype.IsContinuous=function(){
    return(this.m_flags&b2.Contact.e_continuousFlag)==b2.Contact.e_continuousFlag
    };

    b2.Contact.prototype.SetSensor=function(a){
    a?this.m_flags|=b2.Contact.e_sensorFlag:this.m_flags&=~b2.Contact.e_sensorFlag
    };
    b2.Contact.prototype.IsSensor=function(){
    return(this.m_flags&b2.Contact.e_sensorFlag)==b2.Contact.e_sensorFlag
    };
    b2.Contact.prototype.SetEnabled=function(a){
    a?this.m_flags|=b2.Contact.e_enabledFlag:this.m_flags&=~b2.Contact.e_enabledFlag
    };
    b2.Contact.prototype.IsEnabled=function(){
    return(this.m_flags&b2.Contact.e_enabledFlag)==b2.Contact.e_enabledFlag
    };

    b2.Contact.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Contact.prototype.GetFixtureA=function(){
    return this.m_fixtureA
    };
    b2.Contact.prototype.GetFixtureB=function(){
    return this.m_fixtureB
    };
    b2.Contact.prototype.FlagForFiltering=function(){
    this.m_flags|=b2.Contact.e_filterFlag
    };
    b2.Contact.prototype.m_flags=0;
    b2.Contact.prototype.m_prev=null;
    b2.Contact.prototype.m_next=null;
    b2.Contact.prototype.m_nodeA=new b2.ContactEdge;
    b2.Contact.prototype.m_nodeB=new b2.ContactEdge;

    b2.Contact.prototype.m_fixtureA=null;
    b2.Contact.prototype.m_fixtureB=null;
    b2.Contact.prototype.m_manifold=new b2.Manifold;
    b2.Contact.prototype.m_oldManifold=new b2.Manifold;
    b2.Contact.prototype.m_toi=null;
    b2.ContactConstraint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactConstraint.prototype.__constructor=function(){
    this.points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.points[a]=new b2.ContactConstraintPoint
    };

    b2.ContactConstraint.prototype.__varz=function(){
    this.localPlaneNormal=new b2.Vec2;
    this.localPoint=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.normalMass=new b2.Mat22;
    this.K=new b2.Mat22
    };
    b2.ContactConstraint.prototype.points=null;
    b2.ContactConstraint.prototype.localPlaneNormal=new b2.Vec2;
    b2.ContactConstraint.prototype.localPoint=new b2.Vec2;
    b2.ContactConstraint.prototype.normal=new b2.Vec2;
    b2.ContactConstraint.prototype.normalMass=new b2.Mat22;
    b2.ContactConstraint.prototype.K=new b2.Mat22;

    b2.ContactConstraint.prototype.bodyA=null;
    b2.ContactConstraint.prototype.bodyB=null;
    b2.ContactConstraint.prototype.type=0;
    b2.ContactConstraint.prototype.radius=null;
    b2.ContactConstraint.prototype.friction=null;
    b2.ContactConstraint.prototype.restitution=null;
    b2.ContactConstraint.prototype.pointCount=0;
    b2.ContactConstraint.prototype.manifold=null;
    b2.ContactResult=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactResult.prototype.__constructor=function(){

    };

    b2.ContactResult.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.id=new b2.ContactID
    };
    b2.ContactResult.prototype.shape1=null;
    b2.ContactResult.prototype.shape2=null;
    b2.ContactResult.prototype.position=new b2.Vec2;
    b2.ContactResult.prototype.normal=new b2.Vec2;
    b2.ContactResult.prototype.normalImpulse=null;
    b2.ContactResult.prototype.tangentImpulse=null;
    b2.ContactResult.prototype.id=new b2.ContactID;

    b2.PolygonContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolygonContact.prototype,b2.Contact.prototype);
    b2.PolygonContact.prototype._super=b2.Contact.prototype;
    b2.PolygonContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.PolygonContact.prototype.__varz=function(){

    };
    b2.PolygonContact.Create=function(){
    return new b2.PolygonContact
    };
    b2.PolygonContact.Destroy=function(){

    };

    b2.PolygonContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    b2.Collision.CollidePolygons(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolygonContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };
    ClipVertex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    ClipVertex.prototype.__constructor=function(){

    };
    ClipVertex.prototype.__varz=function(){
    this.v=new b2.Vec2;
    this.id=new b2.ContactID
    };

    ClipVertex.prototype.Set=function(a){
    this.v.SetV(a.v);
    this.id.Set(a.id)
    };
    ClipVertex.prototype.v=new b2.Vec2;
    ClipVertex.prototype.id=new b2.ContactID;
    b2.ContactFilter=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactFilter.prototype.__constructor=function(){

    };
    b2.ContactFilter.prototype.__varz=function(){

    };
    b2.ContactFilter.b2_defaultFilter=new b2.ContactFilter;

    b2.ContactFilter.prototype.ShouldCollide=function(a,b){
    var c=a.GetFilterData(),d=b.GetFilterData();
    if(c.groupIndex==d.groupIndex&&c.groupIndex!=0)return c.groupIndex>0;
    return(c.maskBits&d.categoryBits)!=0&&(c.categoryBits&d.maskBits)!=0
    };
    b2.ContactFilter.prototype.RayCollide=function(a,b){
    if(!a)return!0;
    return this.ShouldCollide(a,b)
    };
    b2.NullContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.NullContact.prototype,b2.Contact.prototype);

    b2.NullContact.prototype._super=b2.Contact.prototype;
    b2.NullContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.NullContact.prototype.__varz=function(){

    };
    b2.NullContact.prototype.Evaluate=function(){

    };
    b2.ContactListener=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactListener.prototype.__constructor=function(){

    };
    b2.ContactListener.prototype.__varz=function(){

    };
    b2.ContactListener.b2_defaultListener=new b2.ContactListener;

    b2.ContactListener.prototype.BeginContact=function(){

    };
    b2.ContactListener.prototype.EndContact=function(){

    };
    b2.ContactListener.prototype.PreSolve=function(){

    };
    b2.ContactListener.prototype.PostSolve=function(){

    };
    b2.Island=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Island.prototype.__constructor=function(){
    this.m_bodies=[];
    this.m_contacts=[];
    this.m_joints=[]
    };
    b2.Island.prototype.__varz=function(){

    };
    b2.Island.s_impulse=new b2.ContactImpulse;

    b2.Island.prototype.Initialize=function(a,b,c,d,e,h){
    var g=0;
    this.m_bodyCapacity=a;
    this.m_contactCapacity=b;
    this.m_jointCapacity=c;
    this.m_jointCount=this.m_contactCount=this.m_bodyCount=0;
    this.m_allocator=d;
    this.m_listener=e;
    this.m_contactSolver=h;
    for(g=this.m_bodies.length;
        g<a;
        g++)this.m_bodies[g]=null;
    for(g=this.m_contacts.length;
        g<b;
        g++)this.m_contacts[g]=null;
    for(g=this.m_joints.length;
        g<c;
        g++)this.m_joints[g]=null
    };

    b2.Island.prototype.Clear=function(){
    this.m_jointCount=this.m_contactCount=this.m_bodyCount=0
    };

    b2.Island.prototype.Solve=function(a,b,c){
    for(var d=0,e=0,h,d=0;
        d<this.m_bodyCount;
        ++d)e=this.m_bodies[d],e.GetType()==b2.Body.b2_dynamicBody&&(e.m_linearVelocity.x+=a.dt*(b.x+e.m_invMass*e.m_force.x),e.m_linearVelocity.y+=a.dt*(b.y+e.m_invMass*e.m_force.y),e.m_angularVelocity+=a.dt*e.m_invI*e.m_torque,e.m_linearVelocity.Multiply(b2.Math.Clamp(1-a.dt*e.m_linearDamping,0,1)),e.m_angularVelocity*=b2.Math.Clamp(1-a.dt*e.m_angularDamping,0,1));
    this.m_contactSolver.Initialize(a,this.m_contacts,this.m_contactCount,
                    this.m_allocator);
    b=this.m_contactSolver;
    b.InitVelocityConstraints(a);
    for(d=0;
        d<this.m_jointCount;
        ++d)h=this.m_joints[d],h.InitVelocityConstraints(a);
    for(d=0;
        d<a.velocityIterations;
        ++d){
        for(e=0;
        e<this.m_jointCount;
        ++e)h=this.m_joints[e],h.SolveVelocityConstraints(a);
        b.SolveVelocityConstraints()}for(d=0;
                         d<this.m_jointCount;
                         ++d)h=this.m_joints[d],h.FinalizeVelocityConstraints();
    b.FinalizeVelocityConstraints();
    for(d=0;
        d<this.m_bodyCount;
        ++d)if(e=this.m_bodies[d],e.GetType()!=b2.Body.b2_staticBody){
        var g=
            a.dt*e.m_linearVelocity.x,f=a.dt*e.m_linearVelocity.y;
        g*g+f*f>b2.Settings.b2_maxTranslationSquared&&(e.m_linearVelocity.Normalize(),e.m_linearVelocity.x*=b2.Settings.b2_maxTranslation*a.inv_dt,e.m_linearVelocity.y*=b2.Settings.b2_maxTranslation*a.inv_dt);
        g=a.dt*e.m_angularVelocity;
        if(g*g>b2.Settings.b2_maxRotationSquared)e.m_angularVelocity=e.m_angularVelocity<0?-b2.Settings.b2_maxRotation*a.inv_dt:b2.Settings.b2_maxRotation*a.inv_dt;
        e.m_sweep.c0.SetV(e.m_sweep.c);
        e.m_sweep.a0=e.m_sweep.a;
        e.m_sweep.c.x+=
        a.dt*e.m_linearVelocity.x;
        e.m_sweep.c.y+=a.dt*e.m_linearVelocity.y;
        e.m_sweep.a+=a.dt*e.m_angularVelocity;
        e.SynchronizeTransform()}for(d=0;
                         d<a.positionIterations;
                         ++d){
            g=b.SolvePositionConstraints(b2.Settings.b2_contactBaumgarte);
            f=!0;
            for(e=0;
            e<this.m_jointCount;
            ++e)h=this.m_joints[e],h=h.SolvePositionConstraints(b2.Settings.b2_contactBaumgarte),f=f&&h;
            if(g&&f)break}this.Report(b.m_constraints);
    if(c){
        c=Number.MAX_VALUE;
        b=b2.Settings.b2_linearSleepTolerance*b2.Settings.b2_linearSleepTolerance;
        g=b2.Settings.b2_angularSleepTolerance*
        b2.Settings.b2_angularSleepTolerance;
        for(d=0;
        d<this.m_bodyCount;
        ++d)if(e=this.m_bodies[d],e.GetType()!=b2.Body.b2_staticBody){
            if((e.m_flags&b2.Body.e_allowSleepFlag)==0)c=e.m_sleepTime=0;
            (e.m_flags&b2.Body.e_allowSleepFlag)==0||e.m_angularVelocity*e.m_angularVelocity>g||b2.Math.Dot(e.m_linearVelocity,e.m_linearVelocity)>b?c=e.m_sleepTime=0:(e.m_sleepTime+=a.dt,c=b2.Math.Min(c,e.m_sleepTime))}if(c>=b2.Settings.b2_timeToSleep)for(d=0;
                                                                                                                                     d<this.m_bodyCount;
                                                                                                                                     ++d)e=this.m_bodies[d],e.SetAwake(!1)}
    };

    b2.Island.prototype.SolveTOI=function(a){
    var b=0,c=0;
    this.m_contactSolver.Initialize(a,this.m_contacts,this.m_contactCount,this.m_allocator);
    for(var d=this.m_contactSolver,b=0;
        b<this.m_jointCount;
        ++b)this.m_joints[b].InitVelocityConstraints(a);
    for(b=0;
        b<a.velocityIterations;
        ++b){
        d.SolveVelocityConstraints();
        for(c=0;
        c<this.m_jointCount;
        ++c)this.m_joints[c].SolveVelocityConstraints(a)}for(b=0;
                                     b<this.m_bodyCount;
                                     ++b)if(c=this.m_bodies[b],c.GetType()!=b2.Body.b2_staticBody){
                                     var e=a.dt*c.m_linearVelocity.x,
                                     h=a.dt*c.m_linearVelocity.y;
                                     e*e+h*h>b2.Settings.b2_maxTranslationSquared&&(c.m_linearVelocity.Normalize(),c.m_linearVelocity.x*=b2.Settings.b2_maxTranslation*a.inv_dt,c.m_linearVelocity.y*=b2.Settings.b2_maxTranslation*a.inv_dt);
                                     e=a.dt*c.m_angularVelocity;
                                     if(e*e>b2.Settings.b2_maxRotationSquared)c.m_angularVelocity=c.m_angularVelocity<0?-b2.Settings.b2_maxRotation*a.inv_dt:b2.Settings.b2_maxRotation*a.inv_dt;
                                     c.m_sweep.c0.SetV(c.m_sweep.c);
                                     c.m_sweep.a0=c.m_sweep.a;
                                     c.m_sweep.c.x+=a.dt*c.m_linearVelocity.x;

                                     c.m_sweep.c.y+=a.dt*c.m_linearVelocity.y;
                                     c.m_sweep.a+=a.dt*c.m_angularVelocity;
                                     c.SynchronizeTransform()}for(b=0;
                                                      b<a.positionIterations;
                                                      ++b){
                                         e=d.SolvePositionConstraints(0.75);
                                         h=!0;
                                         for(c=0;
                                         c<this.m_jointCount;
                                         ++c)var g=this.m_joints[c].SolvePositionConstraints(b2.Settings.b2_contactBaumgarte),h=h&&g;
                                         if(e&&h)break}this.Report(d.m_constraints)
    };

    b2.Island.prototype.Report=function(a){
    if(this.m_listener!=null)for(var b=0;
                     b<this.m_contactCount;
                     ++b){
        for(var c=this.m_contacts[b],d=a[b],e=0;
        e<d.pointCount;
        ++e)b2.Island.s_impulse.normalImpulses[e]=d.points[e].normalImpulse,b2.Island.s_impulse.tangentImpulses[e]=d.points[e].tangentImpulse;
        this.m_listener.PostSolve(c,b2.Island.s_impulse)}
    };
    b2.Island.prototype.AddBody=function(a){
    a.m_islandIndex=this.m_bodyCount;
    this.m_bodies[this.m_bodyCount++]=a
    };

    b2.Island.prototype.AddContact=function(a){
    this.m_contacts[this.m_contactCount++]=a
    };
    b2.Island.prototype.AddJoint=function(a){
    this.m_joints[this.m_jointCount++]=a
    };
    b2.Island.prototype.m_allocator=null;
    b2.Island.prototype.m_listener=null;
    b2.Island.prototype.m_contactSolver=null;
    b2.Island.prototype.m_bodies=null;
    b2.Island.prototype.m_contacts=null;
    b2.Island.prototype.m_joints=null;
    b2.Island.prototype.m_bodyCount=0;
    b2.Island.prototype.m_jointCount=0;
    b2.Island.prototype.m_contactCount=0;

    b2.Island.prototype.m_bodyCapacity=0;
    b2.Island.prototype.m_contactCapacity=0;
    b2.Island.prototype.m_jointCapacity=0;
    b2.PolyAndEdgeContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolyAndEdgeContact.prototype,b2.Contact.prototype);
    b2.PolyAndEdgeContact.prototype._super=b2.Contact.prototype;
    b2.PolyAndEdgeContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.PolyAndEdgeContact.prototype.__varz=function(){

    };
    b2.PolyAndEdgeContact.Create=function(){
    return new b2.PolyAndEdgeContact
    };
    b2.PolyAndEdgeContact.Destroy=function(){

    };
    b2.PolyAndEdgeContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    this.b2CollidePolyAndEdge(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolyAndEdgeContact.prototype.b2CollidePolyAndEdge=function(){

    };

    b2.PolyAndEdgeContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b]);
    b2.Settings.b2Assert(a.GetType()==b2.Shape.e_polygonShape);
    b2.Settings.b2Assert(b.GetType()==b2.Shape.e_edgeShape)
    };
    b2.Collision=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Collision.prototype.__constructor=function(){

    };
    b2.Collision.prototype.__varz=function(){

    };
    b2.Collision.MakeClipPointVector=function(){
    var a=Array(2);
    a[0]=new ClipVertex;
    a[1]=new ClipVertex;
    return a
    };

    b2.Collision.ClipSegmentToLine=function(a,b,c,d){
    var e,h=0;
    e=b[0];
    var g=e.v;
    e=b[1];
    var f=e.v,i=c.x*g.x+c.y*g.y-d;
    e=c.x*f.x+c.y*f.y-d;
    i<=0&&a[h++].Set(b[0]);
    e<=0&&a[h++].Set(b[1]);
    if(i*e<0)c=i/(i-e),e=a[h],e=e.v,e.x=g.x+c*(f.x-g.x),e.y=g.y+c*(f.y-g.y),e=a[h],e.id=(i>0?b[0]:b[1]).id,++h;
    return h
    };

    b2.Collision.EdgeSeparation=function(a,b,c,d,e){
    var h=a.m_vertices,a=a.m_normals,g=d.m_vertexCount,f=d.m_vertices,i,j;
    i=b.R;
    j=a[c];
    a=i.col1.x*j.x+i.col2.x*j.y;
    d=i.col1.y*j.x+i.col2.y*j.y;
    i=e.R;
    var k=i.col1.x*a+i.col1.y*d;
    i=i.col2.x*a+i.col2.y*d;
    for(var l=0,n=Number.MAX_VALUE,m=0;
        m<g;
        ++m)j=f[m],j=j.x*k+j.y*i,j<n&&(n=j,l=m);
    j=h[c];
    i=b.R;
    c=b.position.x+(i.col1.x*j.x+i.col2.x*j.y);
    b=b.position.y+(i.col1.y*j.x+i.col2.y*j.y);
    j=f[l];
    i=e.R;
    h=e.position.x+(i.col1.x*j.x+i.col2.x*j.y);
    e=e.position.y+(i.col1.y*
            j.x+i.col2.y*j.y);
    h-=c;
    e-=b;
    return h*a+e*d
    };

    b2.Collision.FindMaxSeparation=function(a,b,c,d,e){
    var h=b.m_vertexCount,g=b.m_normals,f,i;
    i=e.R;
    f=d.m_centroid;
    var j=e.position.x+(i.col1.x*f.x+i.col2.x*f.y),k=e.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    i=c.R;
    f=b.m_centroid;
    j-=c.position.x+(i.col1.x*f.x+i.col2.x*f.y);
    k-=c.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    i=j*c.R.col1.x+k*c.R.col1.y;
    for(var k=j*c.R.col2.x+k*c.R.col2.y,j=0,l=-Number.MAX_VALUE,n=0;
        n<h;
        ++n)f=g[n],f=f.x*i+f.y*k,f>l&&(l=f,j=n);
    var g=b2.Collision.EdgeSeparation(b,c,j,d,e),k=j-1>=0?
        j-1:h-1,l=b2.Collision.EdgeSeparation(b,c,k,d,e),n=j+1<h?j+1:0,m=b2.Collision.EdgeSeparation(b,c,n,d,e);
    if(l>g&&l>m)i=-1,f=k,k=l;
    else if(m>g)i=1,f=n,k=m;
    else return a[0]=j,g;
    for(;
        ;
       )if(j=i==-1?f-1>=0?f-1:h-1:f+1<h?f+1:0,g=b2.Collision.EdgeSeparation(b,c,j,d,e),g>k)f=j,k=g;
    else break;
    a[0]=f;
    return k
    };

    b2.Collision.FindIncidentEdge=function(a,b,c,d,e,h){
    var g=b.m_normals,f=e.m_vertexCount,b=e.m_vertices,e=e.m_normals,i;
    i=c.R;
    var c=g[d],g=i.col1.x*c.x+i.col2.x*c.y,j=i.col1.y*c.x+i.col2.y*c.y;
    i=h.R;
    c=i.col1.x*g+i.col1.y*j;
    j=i.col2.x*g+i.col2.y*j;
    g=c;
    i=0;
    for(var k=Number.MAX_VALUE,l=0;
        l<f;
        ++l)c=e[l],c=g*c.x+j*c.y,c<k&&(k=c,i=l);
    e=i;
    g=e+1<f?e+1:0;
    f=a[0];
    c=b[e];
    i=h.R;
    f.v.x=h.position.x+(i.col1.x*c.x+i.col2.x*c.y);
    f.v.y=h.position.y+(i.col1.y*c.x+i.col2.y*c.y);
    f.id.features.referenceEdge=d;
    f.id.features.incidentEdge=
        e;
    f.id.features.incidentVertex=0;
    f=a[1];
    c=b[g];
    i=h.R;
    f.v.x=h.position.x+(i.col1.x*c.x+i.col2.x*c.y);
    f.v.y=h.position.y+(i.col1.y*c.x+i.col2.y*c.y);
    f.id.features.referenceEdge=d;
    f.id.features.incidentEdge=g;
    f.id.features.incidentVertex=1
    };

    b2.Collision.CollidePolygons=function(a,b,c,d,e){
    var h;
    a.m_pointCount=0;
    var g=b.m_radius+d.m_radius;
    b2.Collision.s_edgeAO[0]=0;
    var f=b2.Collision.FindMaxSeparation(b2.Collision.s_edgeAO,b,c,d,e);
    h=b2.Collision.s_edgeAO[0];
    if(!(f>g)){
        var i;
        b2.Collision.s_edgeBO[0]=0;
        var j=b2.Collision.FindMaxSeparation(b2.Collision.s_edgeBO,d,e,b,c);
        i=b2.Collision.s_edgeBO[0];
        if(!(j>g)){
        var k=0,l=0;
        j>0.98*f+0.001?(f=d,d=b,b=e,k=i,a.m_type=b2.Manifold.e_faceB,l=1):(f=b,b=c,c=e,k=h,a.m_type=b2.Manifold.e_faceA,l=0);

        h=b2.Collision.s_incidentEdge;
        b2.Collision.FindIncidentEdge(h,f,b,k,d,c);
        e=f.m_vertices;
        i=e[k];
        var n;
        n=k+1<f.m_vertexCount?e[parseInt(k+1)]:e[0];
        k=b2.Collision.s_localTangent;
        k.Set(n.x-i.x,n.y-i.y);
        k.Normalize();
        e=b2.Collision.s_localNormal;
        e.x=k.y;
        e.y=-k.x;
        d=b2.Collision.s_planePoint;
        d.Set(0.5*(i.x+n.x),0.5*(i.y+n.y));
        j=b2.Collision.s_tangent;
        f=b.R;
        j.x=f.col1.x*k.x+f.col2.x*k.y;
        j.y=f.col1.y*k.x+f.col2.y*k.y;
        var m=b2.Collision.s_tangent2;
        m.x=-j.x;
        m.y=-j.y;
        k=b2.Collision.s_normal;
        k.x=j.y;
        k.y=-j.x;

        var o=b2.Collision.s_v11,p=b2.Collision.s_v12;
        o.x=b.position.x+(f.col1.x*i.x+f.col2.x*i.y);
        o.y=b.position.y+(f.col1.y*i.x+f.col2.y*i.y);
        p.x=b.position.x+(f.col1.x*n.x+f.col2.x*n.y);
        p.y=b.position.y+(f.col1.y*n.x+f.col2.y*n.y);
        b=k.x*o.x+k.y*o.y;
        f=j.x*p.x+j.y*p.y+g;
        n=b2.Collision.s_clipPoints1;
        i=b2.Collision.s_clipPoints2;
        p=b2.Collision.ClipSegmentToLine(n,h,m,-j.x*o.x-j.y*o.y+g);
        if(!(p<2)&&(p=b2.Collision.ClipSegmentToLine(i,n,j,f),!(p<2))){
            a.m_localPlaneNormal.SetV(e);
            a.m_localPoint.SetV(d);
            for(d=
            e=0;
            d<b2.Settings.b2_maxManifoldPoints;
            ++d)if(h=i[d],k.x*h.v.x+k.y*h.v.y-b<=g)j=a.m_points[e],f=c.R,m=h.v.x-c.position.x,o=h.v.y-c.position.y,j.m_localPoint.x=m*f.col1.x+o*f.col1.y,j.m_localPoint.y=m*f.col2.x+o*f.col2.y,j.m_id.Set(h.id),j.m_id.features.flip=l,++e;
            a.m_pointCount=e}}}
    };

    b2.Collision.CollideCircles=function(a,b,c,d,e){
    a.m_pointCount=0;
    var h,g;
    h=c.R;
    g=b.m_p;
    var f=c.position.x+(h.col1.x*g.x+h.col2.x*g.y),c=c.position.y+(h.col1.y*g.x+h.col2.y*g.y);
    h=e.R;
    g=d.m_p;
    f=e.position.x+(h.col1.x*g.x+h.col2.x*g.y)-f;
    e=e.position.y+(h.col1.y*g.x+h.col2.y*g.y)-c;
    h=b.m_radius+d.m_radius;
    if(!(f*f+e*e>h*h))a.m_type=b2.Manifold.e_circles,a.m_localPoint.SetV(b.m_p),a.m_localPlaneNormal.SetZero(),a.m_pointCount=1,a.m_points[0].m_localPoint.SetV(d.m_p),a.m_points[0].m_id.key=0
    };

    b2.Collision.CollidePolygonAndCircle=function(a,b,c,d,e){
    a.m_pointCount=0;
    var h,g,f,i;
    i=e.R;
    f=d.m_p;
    var j=e.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    h=e.position.x+(i.col1.x*f.x+i.col2.x*f.y)-c.position.x;
    g=j-c.position.y;
    i=c.R;
    c=h*i.col1.x+g*i.col1.y;
    i=h*i.col2.x+g*i.col2.y;
    for(var k=0,e=-Number.MAX_VALUE,j=b.m_radius+d.m_radius,l=b.m_vertexCount,n=b.m_vertices,b=b.m_normals,m=0;
        m<l;
        ++m){
        f=n[m];
        h=c-f.x;
        g=i-f.y;
        f=b[m];
        f=f.x*h+f.y*g;
        if(f>j)return;
        f>e&&(e=f,k=m)}f=k;
    h=n[f];
    l=n[f+1<l?f+1:0];
    if(e<Number.MIN_VALUE)a.m_pointCount=
        1,a.m_type=b2.Manifold.e_faceA,a.m_localPlaneNormal.SetV(b[k]),a.m_localPoint.x=0.5*(h.x+l.x),a.m_localPoint.y=0.5*(h.y+l.y);
    else if(e=(c-l.x)*(h.x-l.x)+(i-l.y)*(h.y-l.y),(c-h.x)*(l.x-h.x)+(i-h.y)*(l.y-h.y)<=0){
        if((c-h.x)*(c-h.x)+(i-h.y)*(i-h.y)>j*j)return;
        a.m_pointCount=1;
        a.m_type=b2.Manifold.e_faceA;
        a.m_localPlaneNormal.x=c-h.x;
        a.m_localPlaneNormal.y=i-h.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(h)}else if(e<=0){
        if((c-l.x)*(c-l.x)+(i-l.y)*(i-l.y)>j*j)return;
        a.m_pointCount=1;
        a.m_type=
            b2.Manifold.e_faceA;
        a.m_localPlaneNormal.x=c-l.x;
        a.m_localPlaneNormal.y=i-l.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(l)}else{
            k=0.5*(h.x+l.x);
            h=0.5*(h.y+l.y);
            e=(c-k)*b[f].x+(i-h)*b[f].y;
            if(e>j)return;
            a.m_pointCount=1;
            a.m_type=b2.Manifold.e_faceA;
            a.m_localPlaneNormal.x=b[f].x;
            a.m_localPlaneNormal.y=b[f].y;
            a.m_localPlaneNormal.Normalize();
            a.m_localPoint.Set(k,h)}a.m_points[0].m_localPoint.SetV(d.m_p);
    a.m_points[0].m_id.key=0
    };

    b2.Collision.TestOverlap=function(a,b){
    var c=b.lowerBound,d=a.upperBound,e=c.x-d.x,h=c.y-d.y,c=a.lowerBound,d=b.upperBound,g=c.y-d.y;
    if(e>0||h>0)return!1;
    if(c.x-d.x>0||g>0)return!1;
    return!0
    };
    b2.Collision.b2_nullFeature=255;
    b2.Collision.s_incidentEdge=b2.Collision.MakeClipPointVector();
    b2.Collision.s_clipPoints1=b2.Collision.MakeClipPointVector();
    b2.Collision.s_clipPoints2=b2.Collision.MakeClipPointVector();
    b2.Collision.s_edgeAO=Array(1);
    b2.Collision.s_edgeBO=Array(1);
    b2.Collision.s_localTangent=new b2.Vec2;

    b2.Collision.s_localNormal=new b2.Vec2;
    b2.Collision.s_planePoint=new b2.Vec2;
    b2.Collision.s_normal=new b2.Vec2;
    b2.Collision.s_tangent=new b2.Vec2;
    b2.Collision.s_tangent2=new b2.Vec2;
    b2.Collision.s_v11=new b2.Vec2;
    b2.Collision.s_v12=new b2.Vec2;
    b2.Collision.b2CollidePolyTempVec=new b2.Vec2;
    b2.PolyAndCircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolyAndCircleContact.prototype,b2.Contact.prototype);

    b2.PolyAndCircleContact.prototype._super=b2.Contact.prototype;
    b2.PolyAndCircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.PolyAndCircleContact.prototype.__varz=function(){

    };
    b2.PolyAndCircleContact.Create=function(){
    return new b2.PolyAndCircleContact
    };
    b2.PolyAndCircleContact.Destroy=function(){

    };

    b2.PolyAndCircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.m_body,b=this.m_fixtureB.m_body;
    b2.Collision.CollidePolygonAndCircle(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolyAndCircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b]);
    b2.Settings.b2Assert(a.GetType()==b2.Shape.e_polygonShape);
    b2.Settings.b2Assert(b.GetType()==b2.Shape.e_circleShape)
    };

    b2.ContactPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactPoint.prototype.__constructor=function(){

    };
    b2.ContactPoint.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.velocity=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.id=new b2.ContactID
    };
    b2.ContactPoint.prototype.shape1=null;
    b2.ContactPoint.prototype.shape2=null;
    b2.ContactPoint.prototype.position=new b2.Vec2;
    b2.ContactPoint.prototype.velocity=new b2.Vec2;
    b2.ContactPoint.prototype.normal=new b2.Vec2;

    b2.ContactPoint.prototype.separation=null;
    b2.ContactPoint.prototype.friction=null;
    b2.ContactPoint.prototype.restitution=null;
    b2.ContactPoint.prototype.id=new b2.ContactID;
    b2.CircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.CircleContact.prototype,b2.Contact.prototype);
    b2.CircleContact.prototype._super=b2.Contact.prototype;
    b2.CircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.CircleContact.prototype.__varz=function(){

    };
    b2.CircleContact.Create=function(){
    return new b2.CircleContact
    };
    b2.CircleContact.Destroy=function(){

    };
    b2.CircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    b2.Collision.CollideCircles(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.CircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };

    b2.EdgeAndCircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.EdgeAndCircleContact.prototype,b2.Contact.prototype);
    b2.EdgeAndCircleContact.prototype._super=b2.Contact.prototype;
    b2.EdgeAndCircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.EdgeAndCircleContact.prototype.__varz=function(){

    };
    b2.EdgeAndCircleContact.Create=function(){
    return new b2.EdgeAndCircleContact
    };

    b2.EdgeAndCircleContact.Destroy=function(){

    };
    b2.EdgeAndCircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    this.b2CollideEdgeAndCircle(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle=function(){

    };
    b2.EdgeAndCircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };

    b2.ContactManager=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactManager.prototype.__constructor=function(){
    this.m_world=null;
    this.m_contactCount=0;
    this.m_contactFilter=b2.ContactFilter.b2_defaultFilter;
    this.m_contactListener=b2.ContactListener.b2_defaultListener;
    this.m_contactFactory=new b2.ContactFactory(this.m_allocator);
    this.m_broadPhase=new b2.DynamicTreeBroadPhase
    };
    b2.ContactManager.prototype.__varz=function(){

    };
    b2.ContactManager.s_evalCP=new b2.ContactPoint;

    b2.ContactManager.prototype.AddPair=function(a,b){
    var c=a,d=b,e=c.GetBody(),h=d.GetBody();
    if(e!=h){
        for(var g=h.GetContactList();
        g;
           ){
        if(g.other==e){
            var f=g.contact.GetFixtureA(),i=g.contact.GetFixtureB();
            if(f==c&&i==d)return;
            if(f==d&&i==c)return}g=g.next}if(h.ShouldCollide(e)!=!1&&this.m_contactFilter.ShouldCollide(c,d)!=!1){
            g=this.m_contactFactory.Create(c,d);
            c=g.GetFixtureA();
            d=g.GetFixtureB();
            e=c.m_body;
            h=d.m_body;
            g.m_prev=null;
            g.m_next=this.m_world.m_contactList;
            if(this.m_world.m_contactList!=
               null)this.m_world.m_contactList.m_prev=g;
            this.m_world.m_contactList=g;
            g.m_nodeA.contact=g;
            g.m_nodeA.other=h;
            g.m_nodeA.prev=null;
            g.m_nodeA.next=e.m_contactList;
            if(e.m_contactList!=null)e.m_contactList.prev=g.m_nodeA;
            e.m_contactList=g.m_nodeA;
            g.m_nodeB.contact=g;
            g.m_nodeB.other=e;
            g.m_nodeB.prev=null;
            g.m_nodeB.next=h.m_contactList;
            if(h.m_contactList!=null)h.m_contactList.prev=g.m_nodeB;
            h.m_contactList=g.m_nodeB;
            ++this.m_world.m_contactCount}}
    };

    b2.ContactManager.prototype.FindNewContacts=function(){
    var a=this;
    this.m_broadPhase.UpdatePairs(function(b,c){
        return a.AddPair(b,c)})
    };

    b2.ContactManager.prototype.Destroy=function(a){
    var b=a.GetFixtureA(),c=a.GetFixtureB(),b=b.GetBody(),c=c.GetBody();
    a.IsTouching()&&this.m_contactListener.EndContact(a);
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a==this.m_world.m_contactList)this.m_world.m_contactList=a.m_next;
    if(a.m_nodeA.prev)a.m_nodeA.prev.next=a.m_nodeA.next;
    if(a.m_nodeA.next)a.m_nodeA.next.prev=a.m_nodeA.prev;
    if(a.m_nodeA==b.m_contactList)b.m_contactList=a.m_nodeA.next;
    if(a.m_nodeB.prev)a.m_nodeB.prev.next=
        a.m_nodeB.next;
    if(a.m_nodeB.next)a.m_nodeB.next.prev=a.m_nodeB.prev;
    if(a.m_nodeB==c.m_contactList)c.m_contactList=a.m_nodeB.next;
    this.m_contactFactory.Destroy(a);
    --this.m_contactCount
    };

    b2.ContactManager.prototype.Collide=function(){
    for(var a=this.m_world.m_contactList;
        a;
       ){
        var b=a.GetFixtureA(),c=a.GetFixtureB(),d=b.GetBody(),e=c.GetBody();
        if(d.IsAwake()==!1&&e.IsAwake()==!1)a=a.GetNext();
        else{
        if(a.m_flags&b2.Contact.e_filterFlag){
            if(e.ShouldCollide(d)==!1){
            b=a;
            a=b.GetNext();
            this.Destroy(b);
            continue}if(this.m_contactFilter.ShouldCollide(b,c)==!1){
                b=a;
                a=b.GetNext();
                this.Destroy(b);
                continue}a.m_flags&=~b2.Contact.e_filterFlag}this.m_broadPhase.TestOverlap(b.m_proxy,c.m_proxy)==!1?
            (b=a,a=b.GetNext(),this.Destroy(b)):(a.Update(this.m_contactListener),a=a.GetNext())}}
    };
    b2.ContactManager.prototype.m_world=null;
    b2.ContactManager.prototype.m_broadPhase=null;
    b2.ContactManager.prototype.m_contactList=null;
    b2.ContactManager.prototype.m_contactCount=0;
    b2.ContactManager.prototype.m_contactFilter=null;
    b2.ContactManager.prototype.m_contactListener=null;
    b2.ContactManager.prototype.m_contactFactory=null;
    b2.ContactManager.prototype.m_allocator=null;

    b2.World=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.World.prototype.__constructor=function(a,b){
    this.m_controllerList=this.m_jointList=this.m_contactList=this.m_bodyList=this.m_debugDraw=this.m_destructionListener=null;
    this.m_controllerCount=this.m_jointCount=this.m_contactCount=this.m_bodyCount=0;
    b2.World.m_warmStarting=!0;
    b2.World.m_continuousPhysics=!0;
    this.m_allowSleep=b;
    this.m_gravity=a;
    this.m_inv_dt0=0;
    this.m_contactManager.m_world=this;
    this.m_groundBody=this.CreateBody(new b2.BodyDef)
    };

    b2.World.prototype.__varz=function(){
    this.s_stack=[];
    this.m_contactManager=new b2.ContactManager;
    this.m_contactSolver=new b2.ContactSolver;
    this.m_island=new b2.Island
    };
    b2.World.s_timestep2=new b2.TimeStep;
    b2.World.s_backupA=new b2.Sweep;
    b2.World.s_backupB=new b2.Sweep;
    b2.World.s_timestep=new b2.TimeStep;
    b2.World.s_queue=[];
    b2.World.e_newFixture=1;
    b2.World.e_locked=2;
    b2.World.s_xf=new b2.Transform;
    b2.World.s_jointColor=new b2.Color(0.5,0.8,0.8);
    b2.World.m_warmStarting=null;

    b2.World.m_continuousPhysics=null;

    b2.World.prototype.Solve=function(a){
    for(var b,c=this.m_controllerList;
        c;
        c=c.m_next)c.Step(a);
    c=this.m_island;
    c.Initialize(this.m_bodyCount,this.m_contactCount,this.m_jointCount,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
    for(b=this.m_bodyList;
        b;
        b=b.m_next)b.m_flags&=~b2.Body.e_islandFlag;
    for(var d=this.m_contactList;
        d;
        d=d.m_next)d.m_flags&=~b2.Contact.e_islandFlag;
    for(d=this.m_jointList;
        d;
        d=d.m_next)d.m_islandFlag=!1;
    for(var d=this.s_stack,e=this.m_bodyList;
        e;
        e=e.m_next)if(!(e.m_flags&
                b2.Body.e_islandFlag)&&!(e.IsAwake()==!1||e.IsActive()==!1)&&e.GetType()!=b2.Body.b2_staticBody){
        c.Clear();
        var h=0;
        d[h++]=e;
        for(e.m_flags|=b2.Body.e_islandFlag;
            h>0;
           )if(b=d[--h],c.AddBody(b),b.IsAwake()==!1&&b.SetAwake(!0),b.GetType()!=b2.Body.b2_staticBody){
               for(var g,f=b.m_contactList;
               f;
               f=f.next)if(!(f.contact.m_flags&b2.Contact.e_islandFlag)&&!(f.contact.IsSensor()==!0||f.contact.IsEnabled()==!1||f.contact.IsTouching()==!1))c.AddContact(f.contact),f.contact.m_flags|=b2.Contact.e_islandFlag,g=f.other,
               g.m_flags&b2.Body.e_islandFlag||(d[h++]=g,g.m_flags|=b2.Body.e_islandFlag);
               for(b=b.m_jointList;
               b;
               b=b.next)if(b.joint.m_islandFlag!=!0&&(g=b.other,g.IsActive()!=!1))c.AddJoint(b.joint),b.joint.m_islandFlag=!0,g.m_flags&b2.Body.e_islandFlag||(d[h++]=g,g.m_flags|=b2.Body.e_islandFlag)}c.Solve(a,this.m_gravity,this.m_allowSleep);
        for(h=0;
            h<c.m_bodyCount;
            ++h)b=c.m_bodies[h],b.GetType()==b2.Body.b2_staticBody&&(b.m_flags&=~b2.Body.e_islandFlag)}for(h=0;
                                                           h<d.length;
                                                           ++h){
            if(!d[h])break;
            d[h]=null}for(b=this.m_bodyList;
                      b;
                      b=
                      b.m_next)b.IsAwake()==!1||b.IsActive()==!1||b.GetType()!=b2.Body.b2_staticBody&&b.SynchronizeFixtures();
    this.m_contactManager.FindNewContacts()
    };

    b2.World.prototype.SolveTOI=function(a){
    var b,c,d,e=this.m_island;
    e.Initialize(this.m_bodyCount,b2.Settings.b2_maxTOIContactsPerIsland,b2.Settings.b2_maxTOIJointsPerIsland,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
    var h=b2.World.s_queue;
    for(b=this.m_bodyList;
        b;
        b=b.m_next)b.m_flags&=~b2.Body.e_islandFlag,b.m_sweep.t0=0;
    for(d=this.m_contactList;
        d;
        d=d.m_next)d.m_flags&=~(b2.Contact.e_toiFlag|b2.Contact.e_islandFlag);
    for(d=this.m_jointList;
        d;
        d=d.m_next)d.m_islandFlag=!1;
    for(;
        ;
       ){
        var g=
        null,f=1;
        for(d=this.m_contactList;
        d;
        d=d.m_next)if(!(d.IsSensor()==!0||d.IsEnabled()==!1||d.IsContinuous()==!1)){
            if(d.m_flags&b2.Contact.e_toiFlag)b=d.m_toi;
            else{
            b=d.m_fixtureA;
            c=d.m_fixtureB;
            b=b.m_body;
            c=c.m_body;
            if((b.GetType()!=b2.Body.b2_dynamicBody||b.IsAwake()==!1)&&(c.GetType()!=b2.Body.b2_dynamicBody||c.IsAwake()==!1))continue;
            var i=b.m_sweep.t0;
            if(b.m_sweep.t0<c.m_sweep.t0)i=c.m_sweep.t0,b.m_sweep.Advance(i);
            else if(c.m_sweep.t0<b.m_sweep.t0)i=b.m_sweep.t0,c.m_sweep.Advance(i);
            b=d.ComputeTOI(b.m_sweep,
                       c.m_sweep);
            b2.Settings.b2Assert(0<=b&&b<=1);
            b>0&&b<1&&(b=(1-b)*i+b,b>1&&(b=1));
            d.m_toi=b;
            d.m_flags|=b2.Contact.e_toiFlag}Number.MIN_VALUE<b&&b<f&&(g=d,f=b)}if(g==null||1-100*Number.MIN_VALUE<f)break;
        b=g.m_fixtureA;
        c=g.m_fixtureB;
        b=b.m_body;
        c=c.m_body;
        b2.World.s_backupA.Set(b.m_sweep);
        b2.World.s_backupB.Set(c.m_sweep);
        b.Advance(f);
        c.Advance(f);
        g.Update(this.m_contactManager.m_contactListener);
        g.m_flags&=~b2.Contact.e_toiFlag;
        if(g.IsSensor()==!0||g.IsEnabled()==!1)b.m_sweep.Set(b2.World.s_backupA),
        c.m_sweep.Set(b2.World.s_backupB),b.SynchronizeTransform(),c.SynchronizeTransform();
        else if(g.IsTouching()!=!1){
        b.GetType()!=b2.Body.b2_dynamicBody&&(b=c);
        e.Clear();
        g=d=0;
        h[d+g++]=b;
        for(b.m_flags|=b2.Body.e_islandFlag;
            g>0;
           )if(b=h[d++],--g,e.AddBody(b),b.IsAwake()==!1&&b.SetAwake(!0),b.GetType()==b2.Body.b2_dynamicBody){
               for(c=b.m_contactList;
               c;
               c=c.next){
               if(e.m_contactCount==e.m_contactCapacity)break;
               if(!(c.contact.m_flags&b2.Contact.e_islandFlag)&&!(c.contact.IsSensor()==!0||c.contact.IsEnabled()==
                                          !1||c.contact.IsTouching()==!1))e.AddContact(c.contact),c.contact.m_flags|=b2.Contact.e_islandFlag,i=c.other,i.m_flags&b2.Body.e_islandFlag||(i.GetType()!=b2.Body.b2_staticBody&&(i.Advance(f),i.SetAwake(!0)),h[d+g]=i,++g,i.m_flags|=b2.Body.e_islandFlag)}for(b=b.m_jointList;
                                                                                                                                                                        b;
                                                                                                                                                                        b=b.next)if(e.m_jointCount!=e.m_jointCapacity&&b.joint.m_islandFlag!=!0&&(i=b.other,i.IsActive()!=!1))e.AddJoint(b.joint),b.joint.m_islandFlag=!0,i.m_flags&b2.Body.e_islandFlag||(i.GetType()!=b2.Body.b2_staticBody&&(i.Advance(f),
                                                                                                                                                                                                                                                                                    i.SetAwake(!0)),h[d+g]=i,++g,i.m_flags|=b2.Body.e_islandFlag)}d=b2.World.s_timestep;
        d.warmStarting=!1;
        d.dt=(1-f)*a.dt;
        d.inv_dt=1/d.dt;
        d.dtRatio=0;
        d.velocityIterations=a.velocityIterations;
        d.positionIterations=a.positionIterations;
        e.SolveTOI(d);
        for(f=f=0;
            f<e.m_bodyCount;
            ++f)if(b=e.m_bodies[f],b.m_flags&=~b2.Body.e_islandFlag,b.IsAwake()!=!1&&b.GetType()==b2.Body.b2_dynamicBody){
            b.SynchronizeFixtures();
            for(c=b.m_contactList;
                c;
                c=c.next)c.contact.m_flags&=~b2.Contact.e_toiFlag}for(f=0;
                                          f<e.m_contactCount;
                                          ++f)d=
            e.m_contacts[f],d.m_flags&=~(b2.Contact.e_toiFlag|b2.Contact.e_islandFlag);
        for(f=0;
            f<e.m_jointCount;
            ++f)d=e.m_joints[f],d.m_islandFlag=!1;
        this.m_contactManager.FindNewContacts()}}
    };

    b2.World.prototype.DrawJoint=function(a){
    var b=a.GetBodyA(),c=a.GetBodyB(),d=b.m_xf.position,e=c.m_xf.position,h=a.GetAnchorA(),g=a.GetAnchorB(),f=b2.World.s_jointColor;
    switch(a.m_type){
    case b2.Joint.e_distanceJoint:this.m_debugDraw.DrawSegment(h,g,f);
        break;
    case b2.Joint.e_pulleyJoint:b=a.GetGroundAnchorA();
        a=a.GetGroundAnchorB();
        this.m_debugDraw.DrawSegment(b,h,f);
        this.m_debugDraw.DrawSegment(a,g,f);
        this.m_debugDraw.DrawSegment(b,a,f);
        break;
    case b2.Joint.e_mouseJoint:this.m_debugDraw.DrawSegment(h,
                                g,f);
        break;
    default:b!=this.m_groundBody&&this.m_debugDraw.DrawSegment(d,h,f),this.m_debugDraw.DrawSegment(h,g,f),c!=this.m_groundBody&&this.m_debugDraw.DrawSegment(e,g,f)}
    };

    b2.World.prototype.DrawShape=function(a,b,c){
    switch(a.m_type){
    case b2.Shape.e_circleShape:this.m_debugDraw.DrawSolidCircle(b2.Math.MulX(b,a.m_p),a.m_radius,b.R.col1,c);
        break;
    case b2.Shape.e_polygonShape:for(var d=0,e=a.GetVertexCount(),a=a.GetVertices(),h=Array(e),d=0;
                     d<e;
                     ++d)h[d]=b2.Math.MulX(b,a[d]);
        this.m_debugDraw.DrawSolidPolygon(h,e,c);
        break;
    case b2.Shape.e_edgeShape:this.m_debugDraw.DrawSegment(b2.Math.MulX(b,a.GetVertex1()),b2.Math.MulX(b,a.GetVertex2()),c)}
    };

    b2.World.prototype.SetDestructionListener=function(a){
    this.m_destructionListener=a
    };
    b2.World.prototype.SetContactFilter=function(a){
    this.m_contactManager.m_contactFilter=a
    };
    b2.World.prototype.SetContactListener=function(a){
    this.m_contactManager.m_contactListener=a
    };
    b2.World.prototype.SetDebugDraw=function(a){
    this.m_debugDraw=a
    };

    b2.World.prototype.SetBroadPhase=function(a){
    var b=this.m_contactManager.m_broadPhase;
    this.m_contactManager.m_broadPhase=a;
    for(var c=this.m_bodyList;
        c;
        c=c.m_next)for(var d=c.m_fixtureList;
               d;
               d=d.m_next)d.m_proxy=a.CreateProxy(b.GetFatAABB(d.m_proxy),d)
    };
    b2.World.prototype.Validate=function(){
    this.m_contactManager.m_broadPhase.Validate()
    };
    b2.World.prototype.GetProxyCount=function(){
    return this.m_contactManager.m_broadPhase.GetProxyCount()
    };

    b2.World.prototype.CreateBody=function(a){
    if(this.IsLocked()==!0)return null;
    a=new b2.Body(a,this);
    a.m_prev=null;
    if(a.m_next=this.m_bodyList)this.m_bodyList.m_prev=a;
    this.m_bodyList=a;
    ++this.m_bodyCount;
    return a
    };

    b2.World.prototype.DestroyBody=function(a){
    if(this.IsLocked()!=!0){
        for(var b=a.m_jointList;
        b;
           ){
        var c=b,b=b.next;
        this.m_destructionListener&&this.m_destructionListener.SayGoodbyeJoint(c.joint);
        this.DestroyJoint(c.joint)}for(b=a.m_controllerList;
                           b;
                          )c=b,b=b.nextController,c.controller.RemoveBody(a);
        for(b=a.m_contactList;
        b;
           )c=b,b=b.next,this.m_contactManager.Destroy(c.contact);
        a.m_contactList=null;
        for(b=a.m_fixtureList;
        b;
           )c=b,b=b.m_next,this.m_destructionListener&&this.m_destructionListener.SayGoodbyeFixture(c),
        c.DestroyProxy(this.m_contactManager.m_broadPhase),c.Destroy();
        a.m_fixtureList=null;
        a.m_fixtureCount=0;
        if(a.m_prev)a.m_prev.m_next=a.m_next;
        if(a.m_next)a.m_next.m_prev=a.m_prev;
        if(a==this.m_bodyList)this.m_bodyList=a.m_next;
        --this.m_bodyCount}
    };

    b2.World.prototype.CreateJoint=function(a){
    var b=b2.Joint.Create(a,null);
    b.m_prev=null;
    if(b.m_next=this.m_jointList)this.m_jointList.m_prev=b;
    this.m_jointList=b;
    ++this.m_jointCount;
    b.m_edgeA.joint=b;
    b.m_edgeA.other=b.m_bodyB;
    b.m_edgeA.prev=null;
    if(b.m_edgeA.next=b.m_bodyA.m_jointList)b.m_bodyA.m_jointList.prev=b.m_edgeA;
    b.m_bodyA.m_jointList=b.m_edgeA;
    b.m_edgeB.joint=b;
    b.m_edgeB.other=b.m_bodyA;
    b.m_edgeB.prev=null;
    if(b.m_edgeB.next=b.m_bodyB.m_jointList)b.m_bodyB.m_jointList.prev=b.m_edgeB;
    b.m_bodyB.m_jointList=
        b.m_edgeB;
    var c=a.bodyA,d=a.bodyB;
    if(a.collideConnected==!1)for(a=d.GetContactList();
                      a;
                     )a.other==c&&a.contact.FlagForFiltering(),a=a.next;
    return b
    };

    b2.World.prototype.DestroyJoint=function(a){
    var b=a.m_collideConnected;
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a==this.m_jointList)this.m_jointList=a.m_next;
    var c=a.m_bodyA,d=a.m_bodyB;
    c.SetAwake(!0);
    d.SetAwake(!0);
    if(a.m_edgeA.prev)a.m_edgeA.prev.next=a.m_edgeA.next;
    if(a.m_edgeA.next)a.m_edgeA.next.prev=a.m_edgeA.prev;
    if(a.m_edgeA==c.m_jointList)c.m_jointList=a.m_edgeA.next;
    a.m_edgeA.prev=null;
    a.m_edgeA.next=null;
    if(a.m_edgeB.prev)a.m_edgeB.prev.next=a.m_edgeB.next;

    if(a.m_edgeB.next)a.m_edgeB.next.prev=a.m_edgeB.prev;
    if(a.m_edgeB==d.m_jointList)d.m_jointList=a.m_edgeB.next;
    a.m_edgeB.prev=null;
    a.m_edgeB.next=null;
    b2.Joint.Destroy(a,null);
    --this.m_jointCount;
    if(b==!1)for(a=d.GetContactList();
             a;
            )a.other==c&&a.contact.FlagForFiltering(),a=a.next
    };
    b2.World.prototype.AddController=function(a){
    a.m_next=this.m_controllerList;
    a.m_prev=null;
    this.m_controllerList=a;
    a.m_world=this;
    this.m_controllerCount++;
    return a
    };

    b2.World.prototype.RemoveController=function(a){
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(this.m_controllerList==a)this.m_controllerList=a.m_next;
    this.m_controllerCount--
    };
    b2.World.prototype.CreateController=function(a){
    if(a.m_world!=this)throw Error("Controller can only be a member of one world");
    a.m_next=this.m_controllerList;
    a.m_prev=null;
    if(this.m_controllerList)this.m_controllerList.m_prev=a;
    this.m_controllerList=a;
    ++this.m_controllerCount;
    a.m_world=this;
    return a
    };

    b2.World.prototype.DestroyController=function(a){
    a.Clear();
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a==this.m_controllerList)this.m_controllerList=a.m_next;
    --this.m_controllerCount
    };
    b2.World.prototype.SetWarmStarting=function(a){
    b2.World.m_warmStarting=a
    };
    b2.World.prototype.SetContinuousPhysics=function(a){
    b2.World.m_continuousPhysics=a
    };
    b2.World.prototype.GetBodyCount=function(){
    return this.m_bodyCount
    };
    b2.World.prototype.GetJointCount=function(){
    return this.m_jointCount
    };

    b2.World.prototype.GetContactCount=function(){
    return this.m_contactCount
    };
    b2.World.prototype.SetGravity=function(a){
    this.m_gravity=a
    };
    b2.World.prototype.GetGravity=function(){
    return this.m_gravity
    };
    b2.World.prototype.GetGroundBody=function(){
    return this.m_groundBody
    };

    b2.World.prototype.Step=function(a,b,c){
    this.m_flags&b2.World.e_newFixture&&(this.m_contactManager.FindNewContacts(),this.m_flags&=~b2.World.e_newFixture);
    this.m_flags|=b2.World.e_locked;
    var d=b2.World.s_timestep2;
    d.dt=a;
    d.velocityIterations=b;
    d.positionIterations=c;
    d.inv_dt=a>0?1/a:0;
    d.dtRatio=this.m_inv_dt0*a;
    d.warmStarting=b2.World.m_warmStarting;
    this.m_contactManager.Collide();
    d.dt>0&&this.Solve(d);
    b2.World.m_continuousPhysics&&d.dt>0&&this.SolveTOI(d);
    if(d.dt>0)this.m_inv_dt0=d.inv_dt;
    this.m_flags&=
        ~b2.World.e_locked
    };
    b2.World.prototype.ClearForces=function(){
    for(var a=this.m_bodyList;
        a;
        a=a.m_next)a.m_force.SetZero(),a.m_torque=0
    };

    b2.World.prototype.DrawDebugData=function(){
    if(this.m_debugDraw!=null){
        this.m_debugDraw.Clear();
        var a=this.m_debugDraw.GetFlags(),b,c,d;
        new b2.Vec2;
        new b2.Vec2;
        new b2.Vec2;
        var e;
        new b2.AABB;
        new b2.AABB;
        new b2.Vec2;
        new b2.Vec2;
        new b2.Vec2;
        new b2.Vec2;
        var h=new b2.Color(0,0,0);
        if(a&b2.DebugDraw.e_shapeBit)for(b=this.m_bodyList;
                         b;
                         b=b.m_next){
        e=b.m_xf;
        for(c=b.GetFixtureList();
            c;
            c=c.m_next)d=c.GetShape(),b.IsActive()==!1?h.Set(0.5,0.5,0.3):b.GetType()==b2.Body.b2_staticBody?h.Set(0.5,0.9,0.5):b.GetType()==
            b2.Body.b2_kinematicBody?h.Set(0.5,0.5,0.9):b.IsAwake()==!1?h.Set(0.6,0.6,0.6):h.Set(0.9,0.7,0.7),this.DrawShape(d,e,h)}if(a&b2.DebugDraw.e_jointBit)for(b=this.m_jointList;
                                                                                         b;
                                                                                         b=b.m_next)this.DrawJoint(b);
        if(a&b2.DebugDraw.e_controllerBit)for(b=this.m_controllerList;
                          b;
                          b=b.m_next)b.Draw(this.m_debugDraw);
        if(a&b2.DebugDraw.e_pairBit){
        h.Set(0.3,0.9,0.9);
        for(b=this.m_contactManager.m_contactList;
            b;
            b=b.GetNext())d=b.GetFixtureA(),c=b.GetFixtureB(),d=d.GetAABB().GetCenter(),c=c.GetAABB().GetCenter(),this.m_debugDraw.DrawSegment(d,
                                                                               c,h)}if(a&b2.DebugDraw.e_aabbBit){
                                                                               d=this.m_contactManager.m_broadPhase;
                                                                               e=[new b2.Vec2,new b2.Vec2,new b2.Vec2,new b2.Vec2];
                                                                               for(b=this.m_bodyList;
                                                                                   b;
                                                                                   b=b.GetNext())if(b.IsActive()!=!1)for(c=b.GetFixtureList();
                                                                                                     c;
                                                                                                     c=c.GetNext()){
                                                                                   var g=d.GetFatAABB(c.m_proxy);
                                                                                   e[0].Set(g.lowerBound.x,g.lowerBound.y);
                                                                                   e[1].Set(g.upperBound.x,g.lowerBound.y);
                                                                                   e[2].Set(g.upperBound.x,g.upperBound.y);
                                                                                   e[3].Set(g.lowerBound.x,g.upperBound.y);
                                                                                   this.m_debugDraw.DrawPolygon(e,4,h)}}if(a&b2.DebugDraw.e_centerOfMassBit)for(b=this.m_bodyList;
                                                                                                                        b;
                                                                                                                        b=
                                                                                                                        b.m_next)e=b2.World.s_xf,e.R=b.m_xf.R,e.position=b.GetWorldCenter(),this.m_debugDraw.DrawTransform(e)}
    };
    b2.World.prototype.QueryAABB=function(a,b){
    var c=this.m_contactManager.m_broadPhase;
    c.Query(function(b){
        return a(c.GetUserData(b))},b)
    };

    b2.World.prototype.QueryShape=function(a,b,c){
    c==null&&(c=new b2.Transform,c.SetIdentity());
    var d=this.m_contactManager.m_broadPhase,e=new b2.AABB;
    b.ComputeAABB(e,c);
    d.Query(function(e){
        e=d.GetUserData(e);
        if(b2.Shape.TestOverlap(b,c,e.GetShape(),e.GetBody().GetTransform()))return a(e);
        return!0},e)
    };

    b2.World.prototype.QueryPoint=function(a,b){
    var c=this.m_contactManager.m_broadPhase,d=new b2.AABB;
    d.lowerBound.Set(b.x-b2.Settings.b2_linearSlop,b.y-b2.Settings.b2_linearSlop);
    d.upperBound.Set(b.x+b2.Settings.b2_linearSlop,b.y+b2.Settings.b2_linearSlop);
    c.Query(function(d){
        d=c.GetUserData(d);
        if(d.TestPoint(b))return a(d);
        return!0},d)
    };

    b2.World.prototype.RayCast=function(a,b,c){
    var d=this.m_contactManager.m_broadPhase,e=new b2.RayCastOutput,h=new b2.RayCastInput(b,c);
    d.RayCast(function(g,f){
        var h=d.GetUserData(f);
        if(h.RayCast(e,g)){
        var j=e.fraction,k=new b2.Vec2((1-j)*b.x+j*c.x,(1-j)*b.y+j*c.y);
        return a(h,k,e.normal,j)}return g.maxFraction},h)
    };
    b2.World.prototype.RayCastOne=function(a,b){
    var c;
    this.RayCast(function(a,b,h,g){
        c=a;
        return g},a,b);
    return c
    };

    b2.World.prototype.RayCastAll=function(a,b){
    var c=[];
    this.RayCast(function(a){
        c[c.length]=a;
        return 1},a,b);
    return c
    };
    b2.World.prototype.GetBodyList=function(){
    return this.m_bodyList
    };
    b2.World.prototype.GetJointList=function(){
    return this.m_jointList
    };
    b2.World.prototype.GetContactList=function(){
    return this.m_contactList
    };
    b2.World.prototype.IsLocked=function(){
    return(this.m_flags&b2.World.e_locked)>0
    };
    b2.World.prototype.s_stack=[];
    b2.World.prototype.m_flags=0;
    b2.World.prototype.m_contactManager=new b2.ContactManager;

    b2.World.prototype.m_contactSolver=new b2.ContactSolver;
    b2.World.prototype.m_island=new b2.Island;
    b2.World.prototype.m_bodyList=null;
    b2.World.prototype.m_jointList=null;
    b2.World.prototype.m_contactList=null;
    b2.World.prototype.m_bodyCount=0;
    b2.World.prototype.m_contactCount=0;
    b2.World.prototype.m_jointCount=0;
    b2.World.prototype.m_controllerList=null;
    b2.World.prototype.m_controllerCount=0;
    b2.World.prototype.m_gravity=null;
    b2.World.prototype.m_allowSleep=null;
    b2.World.prototype.m_groundBody=null;

    b2.World.prototype.m_destructionListener=null;
    b2.World.prototype.m_debugDraw=null;
    b2.World.prototype.m_inv_dt0=null;

    if(typeof exports!=="undefined")exports.b2BoundValues=b2.BoundValues,exports.b2Math=b2.Math,exports.b2DistanceOutput=b2.DistanceOutput,exports.b2Mat33=b2.Mat33,exports.b2ContactPoint=b2.ContactPoint,exports.b2PairManager=b2.PairManager,exports.b2PositionSolverManifold=b2.PositionSolverManifold,exports.b2OBB=b2.OBB,exports.b2CircleContact=b2.CircleContact,exports.b2PulleyJoint=b2.PulleyJoint,exports.b2Pair=b2.Pair,exports.b2TimeStep=b2.TimeStep,exports.b2FixtureDef=b2.FixtureDef,exports.b2World=b2.World,
    exports.b2PrismaticJoint=b2.PrismaticJoint,exports.b2Controller=b2.Controller,exports.b2ContactID=b2.ContactID,exports.b2RevoluteJoint=b2.RevoluteJoint,exports.b2JointDef=b2.JointDef,exports.b2Transform=b2.Transform,exports.b2GravityController=b2.GravityController,exports.b2EdgeAndCircleContact=b2.EdgeAndCircleContact,exports.b2EdgeShape=b2.EdgeShape,exports.b2BuoyancyController=b2.BuoyancyController,exports.b2LineJointDef=b2.LineJointDef,exports.b2Contact=b2.Contact,exports.b2DistanceJoint=b2.DistanceJoint,
    exports.b2Body=b2.Body,exports.b2DestructionListener=b2.DestructionListener,exports.b2PulleyJointDef=b2.PulleyJointDef,exports.b2ContactEdge=b2.ContactEdge,exports.b2ContactConstraint=b2.ContactConstraint,exports.b2ContactImpulse=b2.ContactImpulse,exports.b2DistanceJointDef=b2.DistanceJointDef,exports.b2ContactResult=b2.ContactResult,exports.b2EdgeChainDef=b2.EdgeChainDef,exports.b2Vec2=b2.Vec2,exports.b2Vec3=b2.Vec3,exports.b2DistanceProxy=b2.DistanceProxy,exports.b2FrictionJointDef=b2.FrictionJointDef,
    exports.b2PolygonContact=b2.PolygonContact,exports.b2TensorDampingController=b2.TensorDampingController,exports.b2ContactFactory=b2.ContactFactory,exports.b2WeldJointDef=b2.WeldJointDef,exports.b2ConstantAccelController=b2.ConstantAccelController,exports.b2GearJointDef=b2.GearJointDef,exports.ClipVertex=ClipVertex,exports.b2SeparationFunction=b2.SeparationFunction,exports.b2ManifoldPoint=b2.ManifoldPoint,exports.b2Color=b2.Color,exports.b2PolygonShape=b2.PolygonShape,exports.b2DynamicTreePair=b2.DynamicTreePair,
    exports.b2ContactConstraintPoint=b2.ContactConstraintPoint,exports.b2FrictionJoint=b2.FrictionJoint,exports.b2ContactFilter=b2.ContactFilter,exports.b2ControllerEdge=b2.ControllerEdge,exports.b2Distance=b2.Distance,exports.b2Fixture=b2.Fixture,exports.b2DynamicTreeNode=b2.DynamicTreeNode,exports.b2MouseJoint=b2.MouseJoint,exports.b2DistanceInput=b2.DistanceInput,exports.b2BodyDef=b2.BodyDef,exports.b2DynamicTreeBroadPhase=b2.DynamicTreeBroadPhase,exports.b2Settings=b2.Settings,exports.b2Proxy=b2.Proxy,
    exports.b2Point=b2.Point,exports.b2BroadPhase=b2.BroadPhase,exports.b2Manifold=b2.Manifold,exports.b2WorldManifold=b2.WorldManifold,exports.b2PrismaticJointDef=b2.PrismaticJointDef,exports.b2RayCastOutput=b2.RayCastOutput,exports.b2ConstantForceController=b2.ConstantForceController,exports.b2TimeOfImpact=b2.TimeOfImpact,exports.b2CircleShape=b2.CircleShape,exports.b2MassData=b2.MassData,exports.b2Joint=b2.Joint,exports.b2GearJoint=b2.GearJoint,exports.b2DynamicTree=b2.DynamicTree,exports.b2JointEdge=
    b2.JointEdge,exports.b2LineJoint=b2.LineJoint,exports.b2NullContact=b2.NullContact,exports.b2ContactListener=b2.ContactListener,exports.b2RayCastInput=b2.RayCastInput,exports.b2TOIInput=b2.TOIInput,exports.Features=Features,exports.b2FilterData=b2.FilterData,exports.b2Island=b2.Island,exports.b2ContactManager=b2.ContactManager,exports.b2ContactSolver=b2.ContactSolver,exports.b2Simplex=b2.Simplex,exports.b2AABB=b2.AABB,exports.b2Jacobian=b2.Jacobian,exports.b2Bound=b2.Bound,exports.b2RevoluteJointDef=
    b2.RevoluteJointDef,exports.b2PolyAndEdgeContact=b2.PolyAndEdgeContact,exports.b2SimplexVertex=b2.SimplexVertex,exports.b2WeldJoint=b2.WeldJoint,exports.b2Collision=b2.Collision,exports.b2Mat22=b2.Mat22,exports.b2SimplexCache=b2.SimplexCache,exports.b2PolyAndCircleContact=b2.PolyAndCircleContact,exports.b2MouseJointDef=b2.MouseJointDef,exports.b2Shape=b2.Shape,exports.b2Segment=b2.Segment,exports.b2ContactRegister=b2.ContactRegister,exports.b2DebugDraw=b2.DebugDraw,exports.b2Sweep=b2.Sweep;

    b2.AABB=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.AABB.prototype.__constructor=function(){

    };
    b2.AABB.prototype.__varz=function(){
    this.lowerBound=new b2.Vec2;
    this.upperBound=new b2.Vec2
    };
    b2.AABB.Combine=function(a,b){
    var c=new b2.AABB;
    c.Combine(a,b);
    return c
    };
    b2.AABB.prototype.IsValid=function(){
    var a=this.upperBound.y-this.lowerBound.y;
    return a=(a=this.upperBound.x-this.lowerBound.x>=0&&a>=0)&&this.lowerBound.IsValid()&&this.upperBound.IsValid()
    };

    b2.AABB.prototype.GetCenter=function(){
    return new b2.Vec2((this.lowerBound.x+this.upperBound.x)/2,(this.lowerBound.y+this.upperBound.y)/2)
    };
    b2.AABB.prototype.GetExtents=function(){
    return new b2.Vec2((this.upperBound.x-this.lowerBound.x)/2,(this.upperBound.y-this.lowerBound.y)/2)
    };
    b2.AABB.prototype.Contains=function(a){
    return this.lowerBound.x<=a.lowerBound.x&&this.lowerBound.y<=a.lowerBound.y&&a.upperBound.x<=this.upperBound.x&&a.upperBound.y<=this.upperBound.y
    };

    b2.AABB.prototype.RayCast=function(a,b){
    var c=-Number.MAX_VALUE,d=Number.MAX_VALUE,e=b.p1.x,h=b.p1.y,g=b.p2.x-b.p1.x,f=b.p2.y-b.p1.y,i=Math.abs(f),j=a.normal,k;
    if(Math.abs(g)<Number.MIN_VALUE){
        if(e<this.lowerBound.x||this.upperBound.x<e)return!1}else{
        k=1/g;
        g=(this.lowerBound.x-e)*k;
        e=(this.upperBound.x-e)*k;
        k=-1;
        g>e&&(k=g,g=e,e=k,k=1);
        if(g>c)j.x=k,j.y=0,c=g;
        d=Math.min(d,e);
        if(c>d)return!1}if(i<Number.MIN_VALUE){
            if(h<this.lowerBound.y||this.upperBound.y<h)return!1}else{
            k=1/f;
            g=(this.lowerBound.y-h)*
                k;
            e=(this.upperBound.y-h)*k;
            k=-1;
            g>e&&(k=g,g=e,e=k,k=1);
            if(g>c)j.y=k,j.x=0,c=g;
            d=Math.min(d,e);
            if(c>d)return!1}a.fraction=c;
    return!0
    };
    b2.AABB.prototype.TestOverlap=function(a){
    var b=a.lowerBound.y-this.upperBound.y,c=this.lowerBound.y-a.upperBound.y;
    if(a.lowerBound.x-this.upperBound.x>0||b>0)return!1;
    if(this.lowerBound.x-a.upperBound.x>0||c>0)return!1;
    return!0
    };

    b2.AABB.prototype.Combine=function(a,b){
    this.lowerBound.x=Math.min(a.lowerBound.x,b.lowerBound.x);
    this.lowerBound.y=Math.min(a.lowerBound.y,b.lowerBound.y);
    this.upperBound.x=Math.max(a.upperBound.x,b.upperBound.x);
    this.upperBound.y=Math.max(a.upperBound.y,b.upperBound.y)
    };
    b2.AABB.prototype.lowerBound=new b2.Vec2;
    b2.AABB.prototype.upperBound=new b2.Vec2;
    b2.Bound=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Bound.prototype.__constructor=function(){

    };

    b2.Bound.prototype.__varz=function(){

    };
    b2.Bound.prototype.IsLower=function(){
    return(this.value&1)==0
    };
    b2.Bound.prototype.IsUpper=function(){
    return(this.value&1)==1
    };
    b2.Bound.prototype.Swap=function(a){
    var b=this.value,c=this.proxy,d=this.stabbingCount;
    this.value=a.value;
    this.proxy=a.proxy;
    this.stabbingCount=a.stabbingCount;
    a.value=b;
    a.proxy=c;
    a.stabbingCount=d
    };
    b2.Bound.prototype.value=0;
    b2.Bound.prototype.proxy=null;
    b2.Bound.prototype.stabbingCount=0;

    b2.BoundValues=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.BoundValues.prototype.__constructor=function(){
    this.lowerValues=[];
    this.lowerValues[0]=0;
    this.lowerValues[1]=0;
    this.upperValues=[];
    this.upperValues[0]=0;
    this.upperValues[1]=0
    };
    b2.BoundValues.prototype.__varz=function(){

    };
    b2.BoundValues.prototype.lowerValues=null;
    b2.BoundValues.prototype.upperValues=null;
    b2.BroadPhase=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.BroadPhase.prototype.__constructor=function(a){
    var b=0;
    this.m_pairManager.Initialize(this);
    this.m_worldAABB=a;
    this.m_proxyCount=0;
    this.m_bounds=[];
    for(b=0;
        b<2;
        b++)this.m_bounds[b]=[];
    b=a.upperBound.y-a.lowerBound.y;
    this.m_quantizationFactor.x=b2.Settings.USHRT_MAX/(a.upperBound.x-a.lowerBound.x);
    this.m_quantizationFactor.y=b2.Settings.USHRT_MAX/b;
    this.m_timeStamp=1;
    this.m_queryResultCount=0
    };

    b2.BroadPhase.prototype.__varz=function(){
    this.m_pairManager=new b2.PairManager;
    this.m_proxyPool=[];
    this.m_querySortKeys=[];
    this.m_queryResults=[];
    this.m_quantizationFactor=new b2.Vec2
    };
    b2.BroadPhase.BinarySearch=function(a,b,c){
    var d=0;
    for(b-=1;
        d<=b;
       ){
        var e=Math.round((d+b)/2),h=a[e];
        if(h.value>c)b=e-1;
        else if(h.value<c)d=e+1;
        else return parseInt(e)}return parseInt(d)
    };
    b2.BroadPhase.s_validate=!1;
    b2.BroadPhase.b2_invalid=b2.Settings.USHRT_MAX;
    b2.BroadPhase.b2_nullEdge=b2.Settings.USHRT_MAX;

    b2.BroadPhase.prototype.ComputeBounds=function(a,b,c){
    var d=c.lowerBound.x,e=c.lowerBound.y,d=b2.Math.Min(d,this.m_worldAABB.upperBound.x),e=b2.Math.Min(e,this.m_worldAABB.upperBound.y),d=b2.Math.Max(d,this.m_worldAABB.lowerBound.x),e=b2.Math.Max(e,this.m_worldAABB.lowerBound.y),h=c.upperBound.x,c=c.upperBound.y,h=b2.Math.Min(h,this.m_worldAABB.upperBound.x),c=b2.Math.Min(c,this.m_worldAABB.upperBound.y),h=b2.Math.Max(h,this.m_worldAABB.lowerBound.x),c=b2.Math.Max(c,this.m_worldAABB.lowerBound.y);

    a[0]=parseInt(this.m_quantizationFactor.x*(d-this.m_worldAABB.lowerBound.x))&b2.Settings.USHRT_MAX-1;
    b[0]=parseInt(this.m_quantizationFactor.x*(h-this.m_worldAABB.lowerBound.x))%65535|1;
    a[1]=parseInt(this.m_quantizationFactor.y*(e-this.m_worldAABB.lowerBound.y))&b2.Settings.USHRT_MAX-1;
    b[1]=parseInt(this.m_quantizationFactor.y*(c-this.m_worldAABB.lowerBound.y))%65535|1
    };

    b2.BroadPhase.prototype.TestOverlapValidate=function(a,b){
    for(var c=0;
        c<2;
        ++c){
        var d=this.m_bounds[c],e=d[a.lowerBounds[c]],h=d[b.upperBounds[c]];
        if(e.value>h.value)return!1;
        e=d[a.upperBounds[c]];
        h=d[b.lowerBounds[c]];
        if(e.value<h.value)return!1}return!0
    };

    b2.BroadPhase.prototype.QueryAxis=function(a,b,c,d,e,h,g){
    for(var c=b2.BroadPhase.BinarySearch(e,h,c),d=b2.BroadPhase.BinarySearch(e,h,d),f=c;
        f<d;
        ++f)h=e[f],h.IsLower()&&this.IncrementOverlapCount(h.proxy);
    if(c>0)for(var f=c-1,h=e[f],i=h.stabbingCount;
           i;
          )h=e[f],h.IsLower()&&c<=h.proxy.upperBounds[g]&&(this.IncrementOverlapCount(h.proxy),--i),--f;
    a[0]=c;
    b[0]=d
    };

    b2.BroadPhase.prototype.IncrementOverlapCount=function(a){
    a.timeStamp<this.m_timeStamp?(a.timeStamp=this.m_timeStamp,a.overlapCount=1):(a.overlapCount=2,this.m_queryResults[this.m_queryResultCount]=a,++this.m_queryResultCount)
    };
    b2.BroadPhase.prototype.IncrementTimeStamp=function(){
    if(this.m_timeStamp==b2.Settings.USHRT_MAX){
        for(var a=0;
        a<this.m_proxyPool.length;
        ++a)this.m_proxyPool[a].timeStamp=0;
        this.m_timeStamp=1}else++this.m_timeStamp
    };

    b2.BroadPhase.prototype.InRange=function(a){
    var b,c,d,e;
    b=a.lowerBound.x;
    c=a.lowerBound.y;
    b-=this.m_worldAABB.upperBound.x;
    c-=this.m_worldAABB.upperBound.y;
    d=this.m_worldAABB.lowerBound.x;
    e=this.m_worldAABB.lowerBound.y;
    d-=a.upperBound.x;
    e-=a.upperBound.y;
    b=b2.Math.Max(b,d);
    c=b2.Math.Max(c,e);
    return b2.Math.Max(b,c)<0
    };

    b2.BroadPhase.prototype.CreateProxy=function(a,b){
    var c=0,d,e=0;
    d=0;
    if(!this.m_freeProxy){
        this.m_freeProxy=this.m_proxyPool[this.m_proxyCount]=new b2.Proxy;
        this.m_freeProxy.next=null;
        this.m_freeProxy.timeStamp=0;
        this.m_freeProxy.overlapCount=b2.BroadPhase.b2_invalid;
        this.m_freeProxy.userData=null;
        for(e=0;
        e<2;
        e++)d=this.m_proxyCount*2,this.m_bounds[e][d++]=new b2.Bound,this.m_bounds[e][d]=new b2.Bound}d=this.m_freeProxy;
    this.m_freeProxy=d.next;
    d.overlapCount=0;
    d.userData=b;
    var e=2*this.m_proxyCount,
    h=[],g=[];
    this.ComputeBounds(h,g,a);
    for(var f=0;
        f<2;
        ++f){
        var i=this.m_bounds[f],j=0,k=0,l=[];
        l.push(j);
        c=[];
        c.push(k);
        this.QueryAxis(l,c,h[f],g[f],i,e,f);
        j=l[0];
        k=c[0];
        i.splice(k,0,i[i.length-1]);
        i.length--;
        i.splice(j,0,i[i.length-1]);
        i.length--;
        ++k;
        l=i[j];
        c=i[k];
        l.value=h[f];
        l.proxy=d;
        c.value=g[f];
        c.proxy=d;
        var n=i[parseInt(j-1)];
        l.stabbingCount=j==0?0:n.stabbingCount;
        n=i[parseInt(k-1)];
        c.stabbingCount=n.stabbingCount;
        for(c=j;
        c<k;
        ++c)n=i[c],n.stabbingCount++;
        for(c=j;
        c<e+2;
        ++c)l=i[c],j=l.proxy,l.IsLower()?
        j.lowerBounds[f]=c:j.upperBounds[f]=c}++this.m_proxyCount;
    for(e=0;
        e<this.m_queryResultCount;
        ++e)this.m_pairManager.AddBufferedPair(d,this.m_queryResults[e]);
    this.m_queryResultCount=0;
    this.IncrementTimeStamp();
    return d
    };

    b2.BroadPhase.prototype.DestroyProxy=function(a){
    for(var b,c,d=2*this.m_proxyCount,e=0;
        e<2;
        ++e){
        var h=this.m_bounds[e],g=a.lowerBounds[e],f=a.upperBounds[e];
        b=h[g];
        var i=b.value;
        c=h[f];
        var j=c.value;
        h.splice(f,1);
        h.splice(g,1);
        h.push(b);
        h.push(c);
        c=d-2;
        for(var k=g;
        k<c;
        ++k){
        b=h[k];
        var l=b.proxy;
        b.IsLower()?l.lowerBounds[e]=k:l.upperBounds[e]=k}for(c=f-1;
                                      g<c;
                                      ++g)b=h[g],b.stabbingCount--;
        b=[];
        this.QueryAxis(b,b,i,j,h,d-2,e)}for(d=0;
                        d<this.m_queryResultCount;
                        ++d)this.m_pairManager.RemoveBufferedPair(a,
                                              this.m_queryResults[d]);
    this.m_queryResultCount=0;
    this.IncrementTimeStamp();
    a.userData=null;
    a.overlapCount=b2.BroadPhase.b2_invalid;
    a.lowerBounds[0]=b2.BroadPhase.b2_invalid;
    a.lowerBounds[1]=b2.BroadPhase.b2_invalid;
    a.upperBounds[0]=b2.BroadPhase.b2_invalid;
    a.upperBounds[1]=b2.BroadPhase.b2_invalid;
    a.next=this.m_freeProxy;
    this.m_freeProxy=a;
    --this.m_proxyCount
    };

    b2.BroadPhase.prototype.MoveProxy=function(a,b){
    var c,d=0,e=0,h=0,g,f;
    if(a!=null&&b.IsValid()!=!1){
        var i=2*this.m_proxyCount,j=new b2.BoundValues;
        this.ComputeBounds(j.lowerValues,j.upperValues,b);
        for(var k=new b2.BoundValues,e=0;
        e<2;
        ++e)g=this.m_bounds[e][a.lowerBounds[e]],k.lowerValues[e]=g.value,g=this.m_bounds[e][a.upperBounds[e]],k.upperValues[e]=g.value;
        for(e=0;
        e<2;
        ++e){
        var l=this.m_bounds[e],n=a.lowerBounds[e],m=a.upperBounds[e],o=j.lowerValues[e],p=j.upperValues[e];
        g=l[n];
        var q=o-g.value;
        g.value=
            o;
        g=l[m];
        var r=p-g.value;
        g.value=p;
        if(q<0)for(h=n;
               h>0&&o<l[parseInt(h-1)].value;
              )g=l[h],f=l[parseInt(h-1)],c=f.proxy,f.stabbingCount++,f.IsUpper()==!0?(this.TestOverlapBound(j,c)&&this.m_pairManager.AddBufferedPair(a,c),c=c.upperBounds,d=c[e],d++,c[e]=d,g.stabbingCount++):(c=c.lowerBounds,d=c[e],d++,c[e]=d,g.stabbingCount--),c=a.lowerBounds,d=c[e],d--,c[e]=d,g.Swap(f),--h;
        if(r>0)for(h=m;
               h<i-1&&l[parseInt(h+1)].value<=p;
              )g=l[h],f=l[parseInt(h+1)],c=f.proxy,f.stabbingCount++,f.IsLower()==!0?(this.TestOverlapBound(j,
                                                            c)&&this.m_pairManager.AddBufferedPair(a,c),c=c.lowerBounds,d=c[e],d--,c[e]=d,g.stabbingCount++):(c=c.upperBounds,d=c[e],d--,c[e]=d,g.stabbingCount--),c=a.upperBounds,d=c[e],d++,c[e]=d,g.Swap(f),h++;
        if(q>0)for(h=n;
               h<i-1&&l[parseInt(h+1)].value<=o;
              )g=l[h],f=l[parseInt(h+1)],c=f.proxy,f.stabbingCount--,f.IsUpper()?(this.TestOverlapBound(k,c)&&this.m_pairManager.RemoveBufferedPair(a,c),c=c.upperBounds,d=c[e],d--,c[e]=d,g.stabbingCount--):(c=c.lowerBounds,d=c[e],d--,c[e]=d,g.stabbingCount++),c=a.lowerBounds,
        d=c[e],d++,c[e]=d,g.Swap(f),h++;
        if(r<0)for(h=m;
               h>0&&p<l[parseInt(h-1)].value;
              )g=l[h],f=l[parseInt(h-1)],c=f.proxy,f.stabbingCount--,f.IsLower()==!0?(this.TestOverlapBound(k,c)&&this.m_pairManager.RemoveBufferedPair(a,c),c=c.lowerBounds,d=c[e],d++,c[e]=d,g.stabbingCount--):(c=c.upperBounds,d=c[e],d++,c[e]=d,g.stabbingCount++),c=a.upperBounds,d=c[e],d--,c[e]=d,g.Swap(f),h--}}
    };
    b2.BroadPhase.prototype.UpdatePairs=function(a){
    this.m_pairManager.Commit(a)
    };

    b2.BroadPhase.prototype.TestOverlap=function(a,b){
    if(a.lowerBounds[0]>b.upperBounds[0])return!1;
    if(b.lowerBounds[0]>a.upperBounds[0])return!1;
    if(a.lowerBounds[1]>b.upperBounds[1])return!1;
    if(b.lowerBounds[1]>a.upperBounds[1])return!1;
    return!0
    };
    b2.BroadPhase.prototype.GetUserData=function(a){
    return a.userData
    };

    b2.BroadPhase.prototype.GetFatAABB=function(a){
    var b=new b2.AABB;
    b.lowerBound.x=this.m_worldAABB.lowerBound.x+this.m_bounds[0][a.lowerBounds[0]].value/this.m_quantizationFactor.x;
    b.lowerBound.y=this.m_worldAABB.lowerBound.y+this.m_bounds[1][a.lowerBounds[1]].value/this.m_quantizationFactor.y;
    b.upperBound.x=this.m_worldAABB.lowerBound.x+this.m_bounds[0][a.upperBounds[0]].value/this.m_quantizationFactor.x;
    b.upperBound.y=this.m_worldAABB.lowerBound.y+this.m_bounds[1][a.upperBounds[1]].value/this.m_quantizationFactor.y;

    return b
    };
    b2.BroadPhase.prototype.GetProxyCount=function(){
    return this.m_proxyCount
    };
    b2.BroadPhase.prototype.Query=function(a,b){
    var c=[],d=[];
    this.ComputeBounds(c,d,b);
    var e=[];
    e.push(0);
    var h=[];
    h.push(0);
    this.QueryAxis(e,h,c[0],d[0],this.m_bounds[0],2*this.m_proxyCount,0);
    this.QueryAxis(e,h,c[1],d[1],this.m_bounds[1],2*this.m_proxyCount,1);
    for(c=0;
        c<this.m_queryResultCount;
        ++c)if(!a(this.m_queryResults[c]))break;
    this.m_queryResultCount=0;
    this.IncrementTimeStamp()
    };

    b2.BroadPhase.prototype.Validate=function(){
    for(var a=0;
        a<2;
        ++a)for(var b=this.m_bounds[a],c=2*this.m_proxyCount,d=0,e=0;
            e<c;
            ++e)b[e].IsLower()==!0?d++:d--
    };
    b2.BroadPhase.prototype.Rebalance=function(){

    };

    b2.BroadPhase.prototype.RayCast=function(a,b){
    var c=new b2.RayCastInput;
    c.p1.SetV(b.p1);
    c.p2.SetV(b.p2);
    c.maxFraction=b.maxFraction;
    var d=(b.p2.x-b.p1.x)*this.m_quantizationFactor.x,e=(b.p2.y-b.p1.y)*this.m_quantizationFactor.y,h=d<-Number.MIN_VALUE?-1:d>Number.MIN_VALUE?1:0,g=e<-Number.MIN_VALUE?-1:e>Number.MIN_VALUE?1:0,f=this.m_quantizationFactor.x*(b.p1.x-this.m_worldAABB.lowerBound.x),i=this.m_quantizationFactor.y*(b.p1.y-this.m_worldAABB.lowerBound.y),j=[],k=[];
    j[0]=parseInt(f)&b2.Settings.USHRT_MAX-
        1;
    j[1]=parseInt(i)&b2.Settings.USHRT_MAX-1;
    k[0]=j[0]+1;
    k[1]=j[1]+1;
    var l=0,n=0,n=[];
    n.push(0);
    var m=[];
    m.push(0);
    this.QueryAxis(n,m,j[0],k[0],this.m_bounds[0],2*this.m_proxyCount,0);
    l=h>=0?m[0]-1:n[0];
    this.QueryAxis(n,m,j[1],k[1],this.m_bounds[1],2*this.m_proxyCount,1);
    n=g>=0?m[0]-1:n[0];
    for(j=0;
        j<this.m_queryResultCount;
        j++)c.maxFraction=a(this.m_queryResults[j],c);
    for(;
        ;
       ){
        m=k=0;
        l+=h>=0?1:-1;
        if(l<0||l>=this.m_proxyCount*2)break;
        h!=0&&(k=(this.m_bounds[0][l].value-f)/d);
        n+=g>=0?1:-1;
        if(n<0||n>=this.m_proxyCount*
           2)break;
        for(g!=0&&(m=(this.m_bounds[1][n].value-i)/e);
        ;
           )if(g==0||h!=0&&k<m){
           if(k>c.maxFraction)break;
           if(h>0?this.m_bounds[0][l].IsLower():this.m_bounds[0][l].IsUpper())if(j=this.m_bounds[0][l].proxy,g>=0){
               if(j.lowerBounds[1]<=n-1&&j.upperBounds[1]>=n)c.maxFraction=a(j,c)}else if(j.lowerBounds[1]<=n&&j.upperBounds[1]>=n+1)c.maxFraction=a(j,c);
           if(c.maxFraction==0)break;
           if(h>0){
               if(l++,l==this.m_proxyCount*2)break}else if(l--,l<0)break;
           k=(this.m_bounds[0][l].value-f)/d}else{
               if(m>c.maxFraction)break;
               if(g>
              0?this.m_bounds[1][n].IsLower():this.m_bounds[1][n].IsUpper())if(j=this.m_bounds[1][n].proxy,h>=0){
                  if(j.lowerBounds[0]<=l-1&&j.upperBounds[0]>=l)c.maxFraction=a(j,c)}else if(j.lowerBounds[0]<=l&&j.upperBounds[0]>=l+1)c.maxFraction=a(j,c);
               if(c.maxFraction==0)break;
               if(g>0){
               if(n++,n==this.m_proxyCount*2)break}else if(n--,n<0)break;
               m=(this.m_bounds[1][n].value-i)/e}break}this.m_queryResultCount=0;
    this.IncrementTimeStamp()
    };

    b2.BroadPhase.prototype.TestOverlapBound=function(a,b){
    for(var c=0;
        c<2;
        ++c){
        var d=this.m_bounds[c],e=d[b.upperBounds[c]];
        if(a.lowerValues[c]>e.value)return!1;
        e=d[b.lowerBounds[c]];
        if(a.upperValues[c]<e.value)return!1}return!0
    };
    b2.BroadPhase.prototype.m_pairManager=new b2.PairManager;
    b2.BroadPhase.prototype.m_proxyPool=[];
    b2.BroadPhase.prototype.m_freeProxy=null;
    b2.BroadPhase.prototype.m_bounds=null;
    b2.BroadPhase.prototype.m_querySortKeys=[];
    b2.BroadPhase.prototype.m_queryResults=[];

    b2.BroadPhase.prototype.m_queryResultCount=0;
    b2.BroadPhase.prototype.m_worldAABB=null;
    b2.BroadPhase.prototype.m_quantizationFactor=new b2.Vec2;
    b2.BroadPhase.prototype.m_proxyCount=0;
    b2.BroadPhase.prototype.m_timeStamp=0;
    b2.Collision=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Collision.prototype.__constructor=function(){

    };
    b2.Collision.prototype.__varz=function(){

    };
    b2.Collision.MakeClipPointVector=function(){
    var a=Array(2);
    a[0]=new ClipVertex;
    a[1]=new ClipVertex;
    return a
    };

    b2.Collision.ClipSegmentToLine=function(a,b,c,d){
    var e,h=0;
    e=b[0];
    var g=e.v;
    e=b[1];
    var f=e.v,i=c.x*g.x+c.y*g.y-d;
    e=c.x*f.x+c.y*f.y-d;
    i<=0&&a[h++].Set(b[0]);
    e<=0&&a[h++].Set(b[1]);
    if(i*e<0)c=i/(i-e),e=a[h],e=e.v,e.x=g.x+c*(f.x-g.x),e.y=g.y+c*(f.y-g.y),e=a[h],e.id=(i>0?b[0]:b[1]).id,++h;
    return h
    };

    b2.Collision.EdgeSeparation=function(a,b,c,d,e){
    var h=a.m_vertices,a=a.m_normals,g=d.m_vertexCount,f=d.m_vertices,i,j;
    i=b.R;
    j=a[c];
    a=i.col1.x*j.x+i.col2.x*j.y;
    d=i.col1.y*j.x+i.col2.y*j.y;
    i=e.R;
    var k=i.col1.x*a+i.col1.y*d;
    i=i.col2.x*a+i.col2.y*d;
    for(var l=0,n=Number.MAX_VALUE,m=0;
        m<g;
        ++m)j=f[m],j=j.x*k+j.y*i,j<n&&(n=j,l=m);
    j=h[c];
    i=b.R;
    c=b.position.x+(i.col1.x*j.x+i.col2.x*j.y);
    b=b.position.y+(i.col1.y*j.x+i.col2.y*j.y);
    j=f[l];
    i=e.R;
    h=e.position.x+(i.col1.x*j.x+i.col2.x*j.y);
    e=e.position.y+(i.col1.y*
            j.x+i.col2.y*j.y);
    h-=c;
    e-=b;
    return h*a+e*d
    };

    b2.Collision.FindMaxSeparation=function(a,b,c,d,e){
    var h=b.m_vertexCount,g=b.m_normals,f,i;
    i=e.R;
    f=d.m_centroid;
    var j=e.position.x+(i.col1.x*f.x+i.col2.x*f.y),k=e.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    i=c.R;
    f=b.m_centroid;
    j-=c.position.x+(i.col1.x*f.x+i.col2.x*f.y);
    k-=c.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    i=j*c.R.col1.x+k*c.R.col1.y;
    for(var k=j*c.R.col2.x+k*c.R.col2.y,j=0,l=-Number.MAX_VALUE,n=0;
        n<h;
        ++n)f=g[n],f=f.x*i+f.y*k,f>l&&(l=f,j=n);
    var g=b2.Collision.EdgeSeparation(b,c,j,d,e),k=j-1>=0?
        j-1:h-1,l=b2.Collision.EdgeSeparation(b,c,k,d,e),n=j+1<h?j+1:0,m=b2.Collision.EdgeSeparation(b,c,n,d,e);
    i=f=0;
    if(l>g&&l>m)i=-1,f=k,k=l;
    else if(m>g)i=1,f=n,k=m;
    else return a[0]=j,g;
    for(;
        ;
       )if(j=i==-1?f-1>=0?f-1:h-1:f+1<h?f+1:0,g=b2.Collision.EdgeSeparation(b,c,j,d,e),g>k)f=j,k=g;
    else break;
    a[0]=f;
    return k
    };

    b2.Collision.FindIncidentEdge=function(a,b,c,d,e,h){
    var g=b.m_normals,f=e.m_vertexCount,b=e.m_vertices,e=e.m_normals,i;
    i=c.R;
    var c=g[d],g=i.col1.x*c.x+i.col2.x*c.y,j=i.col1.y*c.x+i.col2.y*c.y;
    i=h.R;
    c=i.col1.x*g+i.col1.y*j;
    j=i.col2.x*g+i.col2.y*j;
    g=c;
    i=0;
    for(var k=Number.MAX_VALUE,l=0;
        l<f;
        ++l)c=e[l],c=g*c.x+j*c.y,c<k&&(k=c,i=l);
    e=i;
    g=e+1<f?e+1:0;
    f=a[0];
    c=b[e];
    i=h.R;
    f.v.x=h.position.x+(i.col1.x*c.x+i.col2.x*c.y);
    f.v.y=h.position.y+(i.col1.y*c.x+i.col2.y*c.y);
    f.id.features.referenceEdge=d;
    f.id.features.incidentEdge=
        e;
    f.id.features.incidentVertex=0;
    f=a[1];
    c=b[g];
    i=h.R;
    f.v.x=h.position.x+(i.col1.x*c.x+i.col2.x*c.y);
    f.v.y=h.position.y+(i.col1.y*c.x+i.col2.y*c.y);
    f.id.features.referenceEdge=d;
    f.id.features.incidentEdge=g;
    f.id.features.incidentVertex=1
    };

    b2.Collision.CollidePolygons=function(a,b,c,d,e){
    var h;
    a.m_pointCount=0;
    var g=b.m_radius+d.m_radius;
    b2.Collision.s_edgeAO[0]=0;
    var f=b2.Collision.FindMaxSeparation(b2.Collision.s_edgeAO,b,c,d,e);
    h=b2.Collision.s_edgeAO[0];
    if(!(f>g)){
        var i;
        b2.Collision.s_edgeBO[0]=0;
        var j=b2.Collision.FindMaxSeparation(b2.Collision.s_edgeBO,d,e,b,c);
        i=b2.Collision.s_edgeBO[0];
        if(!(j>g)){
        var k=0,l=0;
        j>0.98*f+0.001?(f=d,d=b,b=e,k=i,a.m_type=b2.Manifold.e_faceB,l=1):(f=b,b=c,c=e,k=h,a.m_type=b2.Manifold.e_faceA,l=0);

        h=b2.Collision.s_incidentEdge;
        b2.Collision.FindIncidentEdge(h,f,b,k,d,c);
        e=f.m_vertices;
        i=e[k];
        var n;
        n=k+1<f.m_vertexCount?e[parseInt(k+1)]:e[0];
        k=b2.Collision.s_localTangent;
        k.Set(n.x-i.x,n.y-i.y);
        k.Normalize();
        e=b2.Collision.s_localNormal;
        e.x=k.y;
        e.y=-k.x;
        d=b2.Collision.s_planePoint;
        d.Set(0.5*(i.x+n.x),0.5*(i.y+n.y));
        j=b2.Collision.s_tangent;
        f=b.R;
        j.x=f.col1.x*k.x+f.col2.x*k.y;
        j.y=f.col1.y*k.x+f.col2.y*k.y;
        var m=b2.Collision.s_tangent2;
        m.x=-j.x;
        m.y=-j.y;
        k=b2.Collision.s_normal;
        k.x=j.y;
        k.y=-j.x;

        var o=b2.Collision.s_v11,p=b2.Collision.s_v12;
        o.x=b.position.x+(f.col1.x*i.x+f.col2.x*i.y);
        o.y=b.position.y+(f.col1.y*i.x+f.col2.y*i.y);
        p.x=b.position.x+(f.col1.x*n.x+f.col2.x*n.y);
        p.y=b.position.y+(f.col1.y*n.x+f.col2.y*n.y);
        b=k.x*o.x+k.y*o.y;
        f=j.x*p.x+j.y*p.y+g;
        n=b2.Collision.s_clipPoints1;
        i=b2.Collision.s_clipPoints2;
        p=0;
        p=b2.Collision.ClipSegmentToLine(n,h,m,-j.x*o.x-j.y*o.y+g);
        if(!(p<2)&&(p=b2.Collision.ClipSegmentToLine(i,n,j,f),!(p<2))){
            a.m_localPlaneNormal.SetV(e);
            a.m_localPoint.SetV(d);
            for(d=
            e=0;
            d<b2.Settings.b2_maxManifoldPoints;
            ++d)if(h=i[d],k.x*h.v.x+k.y*h.v.y-b<=g)j=a.m_points[e],f=c.R,m=h.v.x-c.position.x,o=h.v.y-c.position.y,j.m_localPoint.x=m*f.col1.x+o*f.col1.y,j.m_localPoint.y=m*f.col2.x+o*f.col2.y,j.m_id.Set(h.id),j.m_id.features.flip=l,++e;
            a.m_pointCount=e}}}
    };

    b2.Collision.CollideCircles=function(a,b,c,d,e){
    a.m_pointCount=0;
    var h,g;
    h=c.R;
    g=b.m_p;
    var f=c.position.x+(h.col1.x*g.x+h.col2.x*g.y),c=c.position.y+(h.col1.y*g.x+h.col2.y*g.y);
    h=e.R;
    g=d.m_p;
    f=e.position.x+(h.col1.x*g.x+h.col2.x*g.y)-f;
    e=e.position.y+(h.col1.y*g.x+h.col2.y*g.y)-c;
    h=b.m_radius+d.m_radius;
    if(!(f*f+e*e>h*h))a.m_type=b2.Manifold.e_circles,a.m_localPoint.SetV(b.m_p),a.m_localPlaneNormal.SetZero(),a.m_pointCount=1,a.m_points[0].m_localPoint.SetV(d.m_p),a.m_points[0].m_id.key=0
    };

    b2.Collision.CollidePolygonAndCircle=function(a,b,c,d,e){
    a.m_pointCount=0;
    var h,g,f,i;
    i=e.R;
    f=d.m_p;
    var j=e.position.y+(i.col1.y*f.x+i.col2.y*f.y);
    h=e.position.x+(i.col1.x*f.x+i.col2.x*f.y)-c.position.x;
    g=j-c.position.y;
    i=c.R;
    c=h*i.col1.x+g*i.col1.y;
    i=h*i.col2.x+g*i.col2.y;
    for(var k=0,e=-Number.MAX_VALUE,j=b.m_radius+d.m_radius,l=b.m_vertexCount,n=b.m_vertices,b=b.m_normals,m=0;
        m<l;
        ++m){
        f=n[m];
        h=c-f.x;
        g=i-f.y;
        f=b[m];
        f=f.x*h+f.y*g;
        if(f>j)return;
        f>e&&(e=f,k=m)}f=k;
    h=n[f];
    l=n[f+1<l?f+1:0];
    if(e<Number.MIN_VALUE)a.m_pointCount=
        1,a.m_type=b2.Manifold.e_faceA,a.m_localPlaneNormal.SetV(b[k]),a.m_localPoint.x=0.5*(h.x+l.x),a.m_localPoint.y=0.5*(h.y+l.y);
    else if(e=(c-l.x)*(h.x-l.x)+(i-l.y)*(h.y-l.y),(c-h.x)*(l.x-h.x)+(i-h.y)*(l.y-h.y)<=0){
        if((c-h.x)*(c-h.x)+(i-h.y)*(i-h.y)>j*j)return;
        a.m_pointCount=1;
        a.m_type=b2.Manifold.e_faceA;
        a.m_localPlaneNormal.x=c-h.x;
        a.m_localPlaneNormal.y=i-h.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(h)}else if(e<=0){
        if((c-l.x)*(c-l.x)+(i-l.y)*(i-l.y)>j*j)return;
        a.m_pointCount=1;
        a.m_type=
            b2.Manifold.e_faceA;
        a.m_localPlaneNormal.x=c-l.x;
        a.m_localPlaneNormal.y=i-l.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(l)}else{
            k=0.5*(h.x+l.x);
            h=0.5*(h.y+l.y);
            e=(c-k)*b[f].x+(i-h)*b[f].y;
            if(e>j)return;
            a.m_pointCount=1;
            a.m_type=b2.Manifold.e_faceA;
            a.m_localPlaneNormal.x=b[f].x;
            a.m_localPlaneNormal.y=b[f].y;
            a.m_localPlaneNormal.Normalize();
            a.m_localPoint.Set(k,h)}a.m_points[0].m_localPoint.SetV(d.m_p);
    a.m_points[0].m_id.key=0
    };

    b2.Collision.TestOverlap=function(a,b){
    var c=b.lowerBound,d=a.upperBound,e=c.x-d.x,h=c.y-d.y,c=a.lowerBound,d=b.upperBound,g=c.y-d.y;
    if(e>0||h>0)return!1;
    if(c.x-d.x>0||g>0)return!1;
    return!0
    };
    b2.Collision.b2_nullFeature=255;
    b2.Collision.s_incidentEdge=b2.Collision.MakeClipPointVector();
    b2.Collision.s_clipPoints1=b2.Collision.MakeClipPointVector();
    b2.Collision.s_clipPoints2=b2.Collision.MakeClipPointVector();
    b2.Collision.s_edgeAO=Array(1);
    b2.Collision.s_edgeBO=Array(1);
    b2.Collision.s_localTangent=new b2.Vec2;

    b2.Collision.s_localNormal=new b2.Vec2;
    b2.Collision.s_planePoint=new b2.Vec2;
    b2.Collision.s_normal=new b2.Vec2;
    b2.Collision.s_tangent=new b2.Vec2;
    b2.Collision.s_tangent2=new b2.Vec2;
    b2.Collision.s_v11=new b2.Vec2;
    b2.Collision.s_v12=new b2.Vec2;
    b2.Collision.b2CollidePolyTempVec=new b2.Vec2;
    b2.ContactID=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactID.prototype.__constructor=function(){
    this.features._m_id=this
    };
    b2.ContactID.prototype.__varz=function(){
    this.features=new Features
    };

    b2.ContactID.prototype.Set=function(a){
    key=a._key
    };
    b2.ContactID.prototype.Copy=function(){
    var a=new b2.ContactID;
    a.key=key;
    return a
    };
    b2.ContactID.prototype.__defineSetter__("key",function(){
    return this._key});
    b2.ContactID.prototype.__defineSetter__("key",function(a){
    this._key=a;
    this.features._referenceEdge=this._key&255;
    this.features._incidentEdge=(this._key&65280)>>8&255;
    this.features._incidentVertex=(this._key&16711680)>>16&255;
    this.features._flip=(this._key&4278190080)>>24&255});

    b2.ContactID.prototype._key=0;
    b2.ContactID.prototype.features=new Features;
    b2.ContactPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactPoint.prototype.__constructor=function(){

    };
    b2.ContactPoint.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.velocity=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.id=new b2.ContactID
    };
    b2.ContactPoint.prototype.shape1=null;
    b2.ContactPoint.prototype.shape2=null;
    b2.ContactPoint.prototype.position=new b2.Vec2;

    b2.ContactPoint.prototype.velocity=new b2.Vec2;
    b2.ContactPoint.prototype.normal=new b2.Vec2;
    b2.ContactPoint.prototype.separation=null;
    b2.ContactPoint.prototype.friction=null;
    b2.ContactPoint.prototype.restitution=null;
    b2.ContactPoint.prototype.id=new b2.ContactID;
    b2.Distance=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Distance.prototype.__constructor=function(){

    };
    b2.Distance.prototype.__varz=function(){

    };

    b2.Distance.Distance=function(a,b,c){
    ++b2.Distance.b2_gjkCalls;
    var d=c.proxyA,e=c.proxyB,h=c.transformA,g=c.transformB,f=b2.Distance.s_simplex;
    f.ReadCache(b,d,h,e,g);
    var i=f.m_vertices,j=b2.Distance.s_saveA,k=b2.Distance.s_saveB,l=0;
    f.GetClosestPoint().LengthSquared();
    for(var n=0,m,o=0;
        o<20;
       ){
        l=f.m_count;
        for(n=0;
        n<l;
        n++)j[n]=i[n].indexA,k[n]=i[n].indexB;
        switch(f.m_count){
        case 1:break;
        case 2:f.Solve2();
        break;
        case 3:f.Solve3();
        break;
        default:b2.Settings.b2Assert(!1)}if(f.m_count==3)break;
        m=f.GetClosestPoint();

        m.LengthSquared();
        n=f.GetSearchDirection();
        if(n.LengthSquared()<Number.MIN_VALUE*Number.MIN_VALUE)break;
        m=i[f.m_count];
        m.indexA=d.GetSupport(b2.Math.MulTMV(h.R,n.GetNegative()));
        m.wA=b2.Math.MulX(h,d.GetVertex(m.indexA));
        m.indexB=e.GetSupport(b2.Math.MulTMV(g.R,n));
        m.wB=b2.Math.MulX(g,e.GetVertex(m.indexB));
        m.w=b2.Math.SubtractVV(m.wB,m.wA);
        ++o;
        ++b2.Distance.b2_gjkIters;
        for(var p=!1,n=0;
        n<l;
        n++)if(m.indexA==j[n]&&m.indexB==k[n]){
            p=!0;
            break}if(p)break;
        ++f.m_count}b2.Distance.b2_gjkMaxIters=b2.Math.Max(b2.Distance.b2_gjkMaxIters,
                                   o);
    f.GetWitnessPoints(a.pointA,a.pointB);
    a.distance=b2.Math.SubtractVV(a.pointA,a.pointB).Length();
    a.iterations=o;
    f.WriteCache(b);
    if(c.useRadii)b=d.m_radius,e=e.m_radius,a.distance>b+e&&a.distance>Number.MIN_VALUE?(a.distance-=b+e,c=b2.Math.SubtractVV(a.pointB,a.pointA),c.Normalize(),a.pointA.x+=b*c.x,a.pointA.y+=b*c.y,a.pointB.x-=e*c.x,a.pointB.y-=e*c.y):(m=new b2.Vec2,m.x=0.5*(a.pointA.x+a.pointB.x),m.y=0.5*(a.pointA.y+a.pointB.y),a.pointA.x=a.pointB.x=m.x,a.pointA.y=a.pointB.y=m.y,a.distance=0)
    };

    b2.Distance.b2_gjkCalls=0;
    b2.Distance.b2_gjkIters=0;
    b2.Distance.b2_gjkMaxIters=0;
    b2.Distance.s_simplex=new b2.Simplex;
    b2.Distance.s_saveA=Array(3);
    b2.Distance.s_saveB=Array(3);
    b2.DistanceInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DistanceInput.prototype.__constructor=function(){

    };
    b2.DistanceInput.prototype.__varz=function(){

    };
    b2.DistanceInput.prototype.proxyA=null;
    b2.DistanceInput.prototype.proxyB=null;
    b2.DistanceInput.prototype.transformA=null;

    b2.DistanceInput.prototype.transformB=null;
    b2.DistanceInput.prototype.useRadii=null;
    b2.DistanceOutput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DistanceOutput.prototype.__constructor=function(){

    };
    b2.DistanceOutput.prototype.__varz=function(){
    this.pointA=new b2.Vec2;
    this.pointB=new b2.Vec2
    };
    b2.DistanceOutput.prototype.pointA=new b2.Vec2;
    b2.DistanceOutput.prototype.pointB=new b2.Vec2;
    b2.DistanceOutput.prototype.distance=null;
    b2.DistanceOutput.prototype.iterations=0;

    b2.DistanceProxy=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DistanceProxy.prototype.__constructor=function(){

    };
    b2.DistanceProxy.prototype.__varz=function(){

    };
    b2.DistanceProxy.prototype.Set=function(a){
    switch(a.GetType()){
    case b2.Shape.e_circleShape:this.m_vertices=Array(1);
        this.m_vertices[0]=a.m_p;
        this.m_count=1;
        this.m_radius=a.m_radius;
        break;
    case b2.Shape.e_polygonShape:this.m_vertices=a.m_vertices;
        this.m_count=a.m_vertexCount;
        this.m_radius=a.m_radius;
        break;
    default:b2.Settings.b2Assert(!1)}
    };

    b2.DistanceProxy.prototype.GetSupport=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_count;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return b
    };
    b2.DistanceProxy.prototype.GetSupportVertex=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_count;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return this.m_vertices[b]
    };

    b2.DistanceProxy.prototype.GetVertexCount=function(){
    return this.m_count
    };
    b2.DistanceProxy.prototype.GetVertex=function(a){
    b2.Settings.b2Assert(0<=a&&a<this.m_count);
    return this.m_vertices[a]
    };
    b2.DistanceProxy.prototype.m_vertices=null;
    b2.DistanceProxy.prototype.m_count=0;
    b2.DistanceProxy.prototype.m_radius=null;
    b2.DynamicTree=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.DynamicTree.prototype.__constructor=function(){
    this.m_freeList=this.m_root=null;
    this.m_insertionCount=this.m_path=0
    };
    b2.DynamicTree.prototype.__varz=function(){

    };
    b2.DynamicTree.prototype.AllocateNode=function(){
    if(this.m_freeList){
        var a=this.m_freeList;
        this.m_freeList=a.parent;
        a.parent=null;
        a.child1=null;
        a.child2=null;
        return a}return new b2.DynamicTreeNode
    };
    b2.DynamicTree.prototype.FreeNode=function(a){
    a.parent=this.m_freeList;
    this.m_freeList=a
    };

    b2.DynamicTree.prototype.InsertLeaf=function(a){
    ++this.m_insertionCount;
    if(this.m_root==null)this.m_root=a,this.m_root.parent=null;
    else{
        var b=a.aabb.GetCenter(),c=this.m_root;
        if(c.IsLeaf()==!1){
        do var d=c.child1,c=c.child2,c=Math.abs((d.aabb.lowerBound.x+d.aabb.upperBound.x)/2-b.x)+Math.abs((d.aabb.lowerBound.y+d.aabb.upperBound.y)/2-b.y)<Math.abs((c.aabb.lowerBound.x+c.aabb.upperBound.x)/2-b.x)+Math.abs((c.aabb.lowerBound.y+c.aabb.upperBound.y)/2-b.y)?d:c;
        while(c.IsLeaf()==!1)}b=c.parent;
        d=this.AllocateNode();

        d.parent=b;
        d.userData=null;
        d.aabb.Combine(a.aabb,c.aabb);
        if(b){
        c.parent.child1==c?b.child1=d:b.child2=d;
        d.child1=c;
        d.child2=a;
        c.parent=d;
        a.parent=d;
        do{
            if(b.aabb.Contains(d.aabb))break;
            b.aabb.Combine(b.child1.aabb,b.child2.aabb);
            d=b;
            b=b.parent}while(b)}else d.child1=c,d.child2=a,c.parent=d,this.m_root=a.parent=d}
    };

    b2.DynamicTree.prototype.RemoveLeaf=function(a){
    if(a==this.m_root)this.m_root=null;
    else{
        var b=a.parent,c=b.parent,a=b.child1==a?b.child2:b.child1;
        if(c){
        c.child1==b?c.child1=a:c.child2=a;
        a.parent=c;
        for(this.FreeNode(b);
            c;
           ){
            b=c.aabb;
            c.aabb=b2.AABB.Combine(c.child1.aabb,c.child2.aabb);
            if(b.Contains(c.aabb))break;
            c=c.parent}}else this.m_root=a,a.parent=null,this.FreeNode(b)}
    };

    b2.DynamicTree.prototype.CreateProxy=function(a,b){
    var c=this.AllocateNode(),d=b2.Settings.b2_aabbExtension,e=b2.Settings.b2_aabbExtension;
    c.aabb.lowerBound.x=a.lowerBound.x-d;
    c.aabb.lowerBound.y=a.lowerBound.y-e;
    c.aabb.upperBound.x=a.upperBound.x+d;
    c.aabb.upperBound.y=a.upperBound.y+e;
    c.userData=b;
    this.InsertLeaf(c);
    return c
    };
    b2.DynamicTree.prototype.DestroyProxy=function(a){
    this.RemoveLeaf(a);
    this.FreeNode(a)
    };

    b2.DynamicTree.prototype.MoveProxy=function(a,b,c){
    b2.Settings.b2Assert(a.IsLeaf());
    if(a.aabb.Contains(b))return!1;
    this.RemoveLeaf(a);
    var d=b2.Settings.b2_aabbExtension+b2.Settings.b2_aabbMultiplier*(c.x>0?c.x:-c.x),c=b2.Settings.b2_aabbExtension+b2.Settings.b2_aabbMultiplier*(c.y>0?c.y:-c.y);
    a.aabb.lowerBound.x=b.lowerBound.x-d;
    a.aabb.lowerBound.y=b.lowerBound.y-c;
    a.aabb.upperBound.x=b.upperBound.x+d;
    a.aabb.upperBound.y=b.upperBound.y+c;
    this.InsertLeaf(a);
    return!0
    };

    b2.DynamicTree.prototype.Rebalance=function(a){
    if(this.m_root!=null)for(var b=0;
                 b<a;
                 b++){
        for(var c=this.m_root,d=0;
        c.IsLeaf()==!1;
           )c=this.m_path>>d&1?c.child2:c.child1,d=d+1&31;
        ++this.m_path;
        this.RemoveLeaf(c);
        this.InsertLeaf(c)}
    };
    b2.DynamicTree.prototype.GetFatAABB=function(a){
    return a.aabb
    };
    b2.DynamicTree.prototype.GetUserData=function(a){
    return a.userData
    };

    b2.DynamicTree.prototype.Query=function(a,b){
    if(this.m_root!=null){
        var c=[],d=0;
        for(c[d++]=this.m_root;
        d>0;
           ){
        var e=c[--d];
        if(e.aabb.TestOverlap(b))if(e.IsLeaf()){
            if(!a(e))break}else c[d++]=e.child1,c[d++]=e.child2}}
    };

    b2.DynamicTree.prototype.RayCast=function(a,b){
    if(this.m_root!=null){
        var c=b.p1,d=b.p2,e=b2.Math.SubtractVV(c,d);
        e.Normalize();
        var e=b2.Math.CrossFV(1,e),h=b2.Math.AbsV(e),g=b.maxFraction,f=new b2.AABB,i;
        i=c.x+g*(d.x-c.x);
        g=c.y+g*(d.y-c.y);
        f.lowerBound.x=Math.min(c.x,i);
        f.lowerBound.y=Math.min(c.y,g);
        f.upperBound.x=Math.max(c.x,i);
        f.upperBound.y=Math.max(c.y,g);
        var j=[],k=0;
        for(j[k++]=this.m_root;
        k>0;
           )if(i=j[--k],i.aabb.TestOverlap(f)!=!1){
           var g=i.aabb.GetCenter(),l=i.aabb.GetExtents();
           if(!(Math.abs(e.x*
                 (c.x-g.x)+e.y*(c.y-g.y))-h.x*l.x-h.y*l.y>0))if(i.IsLeaf()){
                     g=new b2.RayCastInput;
                     g.p1=b.p1;
                     g.p2=b.p2;
                     g.maxFraction=b.maxFraction;
                     g=a(g,i);
                     if(g==0)break;
                     i=c.x+g*(d.x-c.x);
                     g=c.y+g*(d.y-c.y);
                     f.lowerBound.x=Math.min(c.x,i);
                     f.lowerBound.y=Math.min(c.y,g);
                     f.upperBound.x=Math.max(c.x,i);
                     f.upperBound.y=Math.max(c.y,g)}else j[k++]=i.child1,j[k++]=i.child2}}
    };
    b2.DynamicTree.prototype.m_root=null;
    b2.DynamicTree.prototype.m_freeList=null;
    b2.DynamicTree.prototype.m_path=0;

    b2.DynamicTree.prototype.m_insertionCount=0;
    b2.DynamicTreeBroadPhase=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreeBroadPhase.prototype.__constructor=function(){

    };
    b2.DynamicTreeBroadPhase.prototype.__varz=function(){
    this.m_tree=new b2.DynamicTree;
    this.m_moveBuffer=[];
    this.m_pairBuffer=[]
    };
    b2.DynamicTreeBroadPhase.prototype.BufferMove=function(a){
    this.m_moveBuffer[this.m_moveBuffer.length]=a
    };

    b2.DynamicTreeBroadPhase.prototype.UnBufferMove=function(a){
    this.m_moveBuffer.splice(this.m_moveBuffer.indexOf(a),1)
    };
    b2.DynamicTreeBroadPhase.prototype.ComparePairs=function(){
    return 0
    };
    b2.DynamicTreeBroadPhase.prototype.CreateProxy=function(a,b){
    var c=this.m_tree.CreateProxy(a,b);
    ++this.m_proxyCount;
    this.BufferMove(c);
    return c
    };
    b2.DynamicTreeBroadPhase.prototype.DestroyProxy=function(a){
    this.UnBufferMove(a);
    --this.m_proxyCount;
    this.m_tree.DestroyProxy(a)
    };

    b2.DynamicTreeBroadPhase.prototype.MoveProxy=function(a,b,c){
    this.m_tree.MoveProxy(a,b,c)&&this.BufferMove(a)
    };
    b2.DynamicTreeBroadPhase.prototype.TestOverlap=function(a,b){
    var c=this.m_tree.GetFatAABB(a),d=this.m_tree.GetFatAABB(b);
    return c.TestOverlap(d)
    };
    b2.DynamicTreeBroadPhase.prototype.GetUserData=function(a){
    return this.m_tree.GetUserData(a)
    };
    b2.DynamicTreeBroadPhase.prototype.GetFatAABB=function(a){
    return this.m_tree.GetFatAABB(a)
    };
    b2.DynamicTreeBroadPhase.prototype.GetProxyCount=function(){
    return this.m_proxyCount
    };

    b2.DynamicTreeBroadPhase.prototype.UpdatePairs=function(a){
    for(var b=this.m_pairCount=0,c=null;
        c=this.m_moveBuffer[b];
        b++){
        var d=this;
        this.m_tree.Query(function(a){
        if(a==c)return!0;
        d.m_pairCount==d.m_pairBuffer.length&&(d.m_pairBuffer[d.m_pairCount]=new b2.DynamicTreePair);
        var b=d.m_pairBuffer[d.m_pairCount];
        b.proxyA=a<c?a:c;
        b.proxyB=a>=c?a:c;
        ++d.m_pairCount;
        return!0},this.m_tree.GetFatAABB(c))}for(b=this.m_moveBuffer.length=0;
                             b<this.m_pairCount;
                            ){
            var e=this.m_pairBuffer[b],h=this.m_tree.GetUserData(e.proxyA),
            g=this.m_tree.GetUserData(e.proxyB);
            a(h,g);
            for(++b;
            b<this.m_pairCount;
               ){
            h=this.m_pairBuffer[b];
            if(h.proxyA!=e.proxyA||h.proxyB!=e.proxyB)break;
            ++b}}
    };
    b2.DynamicTreeBroadPhase.prototype.Query=function(a,b){
    this.m_tree.Query(a,b)
    };
    b2.DynamicTreeBroadPhase.prototype.RayCast=function(a,b){
    this.m_tree.RayCast(a,b)
    };
    b2.DynamicTreeBroadPhase.prototype.Validate=function(){

    };
    b2.DynamicTreeBroadPhase.prototype.Rebalance=function(a){
    this.m_tree.Rebalance(a)
    };
    b2.DynamicTreeBroadPhase.prototype.m_tree=new b2.DynamicTree;

    b2.DynamicTreeBroadPhase.prototype.m_proxyCount=0;
    b2.DynamicTreeBroadPhase.prototype.m_moveBuffer=[];
    b2.DynamicTreeBroadPhase.prototype.m_pairBuffer=[];
    b2.DynamicTreeBroadPhase.prototype.m_pairCount=0;
    b2.DynamicTreeNode=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreeNode.prototype.__constructor=function(){

    };
    b2.DynamicTreeNode.prototype.__varz=function(){
    this.aabb=new b2.AABB
    };
    b2.DynamicTreeNode.prototype.IsLeaf=function(){
    return this.child1==null
    };

    b2.DynamicTreeNode.prototype.userData=null;
    b2.DynamicTreeNode.prototype.aabb=new b2.AABB;
    b2.DynamicTreeNode.prototype.parent=null;
    b2.DynamicTreeNode.prototype.child1=null;
    b2.DynamicTreeNode.prototype.child2=null;
    b2.DynamicTreePair=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DynamicTreePair.prototype.__constructor=function(){

    };
    b2.DynamicTreePair.prototype.__varz=function(){

    };
    b2.DynamicTreePair.prototype.proxyA=null;
    b2.DynamicTreePair.prototype.proxyB=null;

    b2.Manifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Manifold.prototype.__constructor=function(){
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.ManifoldPoint;
    this.m_localPlaneNormal=new b2.Vec2;
    this.m_localPoint=new b2.Vec2
    };
    b2.Manifold.prototype.__varz=function(){

    };
    b2.Manifold.e_circles=1;
    b2.Manifold.e_faceA=2;
    b2.Manifold.e_faceB=4;

    b2.Manifold.prototype.Reset=function(){
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a].Reset();
    this.m_localPlaneNormal.SetZero();
    this.m_localPoint.SetZero();
    this.m_pointCount=this.m_type=0
    };
    b2.Manifold.prototype.Set=function(a){
    this.m_pointCount=a.m_pointCount;
    for(var b=0;
        b<b2.Settings.b2_maxManifoldPoints;
        b++)this.m_points[b].Set(a.m_points[b]);
    this.m_localPlaneNormal.SetV(a.m_localPlaneNormal);
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_type=a.m_type
    };

    b2.Manifold.prototype.Copy=function(){
    var a=new b2.Manifold;
    a.Set(this);
    return a
    };
    b2.Manifold.prototype.m_points=null;
    b2.Manifold.prototype.m_localPlaneNormal=null;
    b2.Manifold.prototype.m_localPoint=null;
    b2.Manifold.prototype.m_type=0;
    b2.Manifold.prototype.m_pointCount=0;
    b2.ManifoldPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ManifoldPoint.prototype.__constructor=function(){
    this.Reset()
    };

    b2.ManifoldPoint.prototype.__varz=function(){
    this.m_localPoint=new b2.Vec2;
    this.m_id=new b2.ContactID
    };
    b2.ManifoldPoint.prototype.Reset=function(){
    this.m_localPoint.SetZero();
    this.m_tangentImpulse=this.m_normalImpulse=0;
    this.m_id.key=0
    };
    b2.ManifoldPoint.prototype.Set=function(a){
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_normalImpulse=a.m_normalImpulse;
    this.m_tangentImpulse=a.m_tangentImpulse;
    this.m_id.Set(a.m_id)
    };
    b2.ManifoldPoint.prototype.m_localPoint=new b2.Vec2;

    b2.ManifoldPoint.prototype.m_normalImpulse=null;
    b2.ManifoldPoint.prototype.m_tangentImpulse=null;
    b2.ManifoldPoint.prototype.m_id=new b2.ContactID;
    b2.OBB=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.OBB.prototype.__constructor=function(){

    };
    b2.OBB.prototype.__varz=function(){
    this.R=new b2.Mat22;
    this.center=new b2.Vec2;
    this.extents=new b2.Vec2
    };
    b2.OBB.prototype.R=new b2.Mat22;
    b2.OBB.prototype.center=new b2.Vec2;
    b2.OBB.prototype.extents=new b2.Vec2;

    b2.Pair=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Pair.prototype.__constructor=function(){

    };
    b2.Pair.prototype.__varz=function(){

    };
    b2.Pair.b2_nullProxy=b2.Settings.USHRT_MAX;
    b2.Pair.e_pairBuffered=1;
    b2.Pair.e_pairRemoved=2;
    b2.Pair.e_pairFinal=4;
    b2.Pair.prototype.SetBuffered=function(){
    this.status|=b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.ClearBuffered=function(){
    this.status&=~b2.Pair.e_pairBuffered
    };

    b2.Pair.prototype.IsBuffered=function(){
    return(this.status&b2.Pair.e_pairBuffered)==b2.Pair.e_pairBuffered
    };
    b2.Pair.prototype.SetRemoved=function(){
    this.status|=b2.Pair.e_pairRemoved
    };
    b2.Pair.prototype.ClearRemoved=function(){
    this.status&=~b2.Pair.e_pairRemoved
    };
    b2.Pair.prototype.IsRemoved=function(){
    return(this.status&b2.Pair.e_pairRemoved)==b2.Pair.e_pairRemoved
    };
    b2.Pair.prototype.SetFinal=function(){
    this.status|=b2.Pair.e_pairFinal
    };

    b2.Pair.prototype.IsFinal=function(){
    return(this.status&b2.Pair.e_pairFinal)==b2.Pair.e_pairFinal
    };
    b2.Pair.prototype.userData=null;
    b2.Pair.prototype.proxy1=null;
    b2.Pair.prototype.proxy2=null;
    b2.Pair.prototype.next=null;
    b2.Pair.prototype.status=0;
    b2.PairManager=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.PairManager.prototype.__constructor=function(){
    this.m_pairs=[];
    this.m_pairBuffer=[];
    this.m_pairBufferCount=this.m_pairCount=0;
    this.m_freePair=null
    };

    b2.PairManager.prototype.__varz=function(){

    };
    b2.PairManager.prototype.AddPair=function(a,b){
    var c=a.pairs[b];
    if(c!=null)return c;
    if(this.m_freePair==null)this.m_freePair=new b2.Pair,this.m_pairs.push(this.m_freePair);
    c=this.m_freePair;
    this.m_freePair=c.next;
    c.proxy1=a;
    c.proxy2=b;
    c.status=0;
    c.userData=null;
    c.next=null;
    a.pairs[b]=c;
    b.pairs[a]=c;
    ++this.m_pairCount;
    return c
    };

    b2.PairManager.prototype.RemovePair=function(a,b){
    var c=a.pairs[b];
    if(c==null)return null;
    var d=c.userData;
    delete a.pairs[b];
    delete b.pairs[a];
    c.next=this.m_freePair;
    c.proxy1=null;
    c.proxy2=null;
    c.userData=null;
    c.status=0;
    this.m_freePair=c;
    --this.m_pairCount;
    return d
    };
    b2.PairManager.prototype.Find=function(a,b){
    return a.pairs[b]
    };
    b2.PairManager.prototype.ValidateBuffer=function(){

    };
    b2.PairManager.prototype.ValidateTable=function(){

    };

    b2.PairManager.prototype.Initialize=function(a){
    this.m_broadPhase=a
    };
    b2.PairManager.prototype.AddBufferedPair=function(a,b){
    var c=this.AddPair(a,b);
    c.IsBuffered()==!1&&(c.SetBuffered(),this.m_pairBuffer[this.m_pairBufferCount]=c,++this.m_pairBufferCount);
    c.ClearRemoved();
    b2.BroadPhase.s_validate&&this.ValidateBuffer()
    };

    b2.PairManager.prototype.RemoveBufferedPair=function(a,b){
    var c=this.Find(a,b);
    c!=null&&(c.IsBuffered()==!1&&(c.SetBuffered(),this.m_pairBuffer[this.m_pairBufferCount]=c,++this.m_pairBufferCount),c.SetRemoved(),b2.BroadPhase.s_validate&&this.ValidateBuffer())
    };

    b2.PairManager.prototype.Commit=function(a){
    for(var b=0,b=0;
        b<this.m_pairBufferCount;
        ++b){
        var c=this.m_pairBuffer[b];
        c.ClearBuffered();
        var d=c.proxy1,e=c.proxy2;
        c.IsRemoved()||c.IsFinal()==!1&&a(d.userData,e.userData)}this.m_pairBufferCount=0;
    b2.BroadPhase.s_validate&&this.ValidateTable()
    };
    b2.PairManager.prototype.m_broadPhase=null;
    b2.PairManager.prototype.m_pairs=null;
    b2.PairManager.prototype.m_freePair=null;
    b2.PairManager.prototype.m_pairCount=0;
    b2.PairManager.prototype.m_pairBuffer=null;

    b2.PairManager.prototype.m_pairBufferCount=0;
    b2.Point=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Point.prototype.__constructor=function(){

    };
    b2.Point.prototype.__varz=function(){
    this.p=new b2.Vec2
    };
    b2.Point.prototype.Support=function(){
    return this.p
    };
    b2.Point.prototype.GetFirstVertex=function(){
    return this.p
    };
    b2.Point.prototype.p=new b2.Vec2;
    b2.Proxy=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Proxy.prototype.__constructor=function(){

    };

    b2.Proxy.prototype.__varz=function(){
    this.lowerBounds=Array(2);
    this.upperBounds=Array(2);
    this.pairs={
    }
    };
    b2.Proxy.prototype.IsValid=function(){
    return this.overlapCount!=b2.BroadPhase.b2_invalid
    };
    b2.Proxy.prototype.lowerBounds=Array(2);
    b2.Proxy.prototype.upperBounds=Array(2);
    b2.Proxy.prototype.overlapCount=0;
    b2.Proxy.prototype.timeStamp=0;
    b2.Proxy.prototype.pairs={

    };
    b2.Proxy.prototype.next=null;
    b2.Proxy.prototype.userData=null;
    b2.RayCastInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.RayCastInput.prototype.__constructor=function(){

    };
    b2.RayCastInput.prototype.__varz=function(){
    this.p1=new b2.Vec2;
    this.p2=new b2.Vec2
    };
    b2.RayCastInput.prototype.p1=new b2.Vec2;
    b2.RayCastInput.prototype.p2=new b2.Vec2;
    b2.RayCastInput.prototype.maxFraction=null;
    b2.RayCastOutput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.RayCastOutput.prototype.__constructor=function(){

    };
    b2.RayCastOutput.prototype.__varz=function(){
    this.normal=new b2.Vec2
    };

    b2.RayCastOutput.prototype.normal=new b2.Vec2;
    b2.RayCastOutput.prototype.fraction=null;
    b2.Segment=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Segment.prototype.__constructor=function(){

    };
    b2.Segment.prototype.__varz=function(){
    this.p1=new b2.Vec2;
    this.p2=new b2.Vec2
    };

    b2.Segment.prototype.TestSegment=function(a,b,c,d){
    var e=c.p1,h=c.p2.x-e.x,g=c.p2.y-e.y,c=this.p2.y-this.p1.y,f=-(this.p2.x-this.p1.x),i=100*Number.MIN_VALUE,j=-(h*c+g*f);
    if(j>i){
        var k=e.x-this.p1.x,l=e.y-this.p1.y,e=k*c+l*f;
        if(0<=e&&e<=d*j&&(d=-h*l+g*k,-i*j<=d&&d<=j*(1+i)))return e/=j,d=Math.sqrt(c*c+f*f),c/=d,f/=d,a[0]=e,b.Set(c,f),!0}return!1
    };
    b2.Segment.prototype.Extend=function(a){
    this.ExtendForward(a);
    this.ExtendBackward(a)
    };

    b2.Segment.prototype.ExtendForward=function(a){
    var b=this.p2.x-this.p1.x,c=this.p2.y-this.p1.y,a=Math.min(b>0?(a.upperBound.x-this.p1.x)/b:b<0?(a.lowerBound.x-this.p1.x)/b:Number.POSITIVE_INFINITY,c>0?(a.upperBound.y-this.p1.y)/c:c<0?(a.lowerBound.y-this.p1.y)/c:Number.POSITIVE_INFINITY);
    this.p2.x=this.p1.x+b*a;
    this.p2.y=this.p1.y+c*a
    };

    b2.Segment.prototype.ExtendBackward=function(a){
    var b=-this.p2.x+this.p1.x,c=-this.p2.y+this.p1.y,a=Math.min(b>0?(a.upperBound.x-this.p2.x)/b:b<0?(a.lowerBound.x-this.p2.x)/b:Number.POSITIVE_INFINITY,c>0?(a.upperBound.y-this.p2.y)/c:c<0?(a.lowerBound.y-this.p2.y)/c:Number.POSITIVE_INFINITY);
    this.p1.x=this.p2.x+b*a;
    this.p1.y=this.p2.y+c*a
    };
    b2.Segment.prototype.p1=new b2.Vec2;
    b2.Segment.prototype.p2=new b2.Vec2;
    b2.SeparationFunction=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.SeparationFunction.prototype.__constructor=function(){

    };
    b2.SeparationFunction.prototype.__varz=function(){
    this.m_localPoint=new b2.Vec2;
    this.m_axis=new b2.Vec2
    };
    b2.SeparationFunction.e_points=1;
    b2.SeparationFunction.e_faceA=2;
    b2.SeparationFunction.e_faceB=4;

    b2.SeparationFunction.prototype.Initialize=function(a,b,c,d,e){
    this.m_proxyA=b;
    this.m_proxyB=d;
    b=a.count;
    b2.Settings.b2Assert(0<b&&b<3);
    var h,g,f,i;
    if(b==1)this.m_type=b2.SeparationFunction.e_points,h=this.m_proxyA.GetVertex(a.indexA[0]),g=this.m_proxyB.GetVertex(a.indexB[0]),i=h,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=g,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),this.m_axis.x=g-h,this.m_axis.y=
        e-c,this.m_axis.Normalize();
    else{
        if(a.indexB[0]==a.indexB[1])this.m_type=b2.SeparationFunction.e_faceA,b=this.m_proxyA.GetVertex(a.indexA[0]),d=this.m_proxyA.GetVertex(a.indexA[1]),g=this.m_proxyB.GetVertex(a.indexB[0]),this.m_localPoint.x=0.5*(b.x+d.x),this.m_localPoint.y=0.5*(b.y+d.y),this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(d,b),1),this.m_axis.Normalize(),i=this.m_axis,f=c.R,b=f.col1.x*i.x+f.col2.x*i.y,d=f.col1.y*i.x+f.col2.y*i.y,i=this.m_localPoint,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*
                                                                                                                                                                                                                                        i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=g,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),a=(g-h)*b+(e-c)*d;
        else if(a.indexA[0]==a.indexA[0])this.m_type=b2.SeparationFunction.e_faceB,f=this.m_proxyB.GetVertex(a.indexB[0]),i=this.m_proxyB.GetVertex(a.indexB[1]),h=this.m_proxyA.GetVertex(a.indexA[0]),this.m_localPoint.x=0.5*(f.x+i.x),this.m_localPoint.y=0.5*(f.y+i.y),this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(i,f),1),this.m_axis.Normalize(),
        i=this.m_axis,f=e.R,b=f.col1.x*i.x+f.col2.x*i.y,d=f.col1.y*i.x+f.col2.y*i.y,i=this.m_localPoint,f=e.R,g=e.position.x+(f.col1.x*i.x+f.col2.x*i.y),e=e.position.y+(f.col1.y*i.x+f.col2.y*i.y),i=h,f=c.R,h=c.position.x+(f.col1.x*i.x+f.col2.x*i.y),c=c.position.y+(f.col1.y*i.x+f.col2.y*i.y),a=(h-g)*b+(c-e)*d;
        else{
        b=this.m_proxyA.GetVertex(a.indexA[0]);
        d=this.m_proxyA.GetVertex(a.indexA[1]);
        f=this.m_proxyB.GetVertex(a.indexB[0]);
        i=this.m_proxyB.GetVertex(a.indexB[1]);
        b2.Math.MulX(c,h);
        h=b2.Math.MulMV(c.R,
                b2.Math.SubtractVV(d,b));
        b2.Math.MulX(e,g);
        a=b2.Math.MulMV(e.R,b2.Math.SubtractVV(i,f));
        e=h.x*h.x+h.y*h.y;
        g=a.x*a.x+a.y*a.y;
        var j=b2.Math.SubtractVV(a,h),c=h.x*j.x+h.y*j.y,j=a.x*j.x+a.y*j.y;
        h=h.x*a.x+h.y*a.y;
        var k=e*g-h*h,a=0;
        k!=0&&(a=b2.Math.Clamp((h*j-c*g)/k,0,1));
        (h*a+j)/g<0&&(a=b2.Math.Clamp((h-c)/e,0,1));
        h=new b2.Vec2;
        h.x=b.x+a*(d.x-b.x);
        h.y=b.y+a*(d.y-b.y);
        g=new b2.Vec2;
        g.x=f.x+a*(i.x-f.x);
        g.y=f.y+a*(i.y-f.y);
        a==0||a==1?(this.m_type=b2.SeparationFunction.e_faceB,this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(i,
                                                             f),1),this.m_axis.Normalize(),this.m_localPoint=g):(this.m_type=b2.SeparationFunction.e_faceA,this.m_axis=b2.Math.CrossVF(b2.Math.SubtractVV(d,b),1),this.m_localPoint=h)}a<0&&this.m_axis.NegativeSelf()}
    };

    b2.SeparationFunction.prototype.Evaluate=function(a,b){
    var c,d,e;
    switch(this.m_type){
    case b2.SeparationFunction.e_points:return c=b2.Math.MulTMV(a.R,this.m_axis),d=b2.Math.MulTMV(b.R,this.m_axis.GetNegative()),c=this.m_proxyA.GetSupportVertex(c),d=this.m_proxyB.GetSupportVertex(d),c=b2.Math.MulX(a,c),d=b2.Math.MulX(b,d),e=(d.x-c.x)*this.m_axis.x+(d.y-c.y)*this.m_axis.y;
    case b2.SeparationFunction.e_faceA:return e=b2.Math.MulMV(a.R,this.m_axis),c=b2.Math.MulX(a,this.m_localPoint),d=b2.Math.MulTMV(b.R,
                                                                    e.GetNegative()),d=this.m_proxyB.GetSupportVertex(d),d=b2.Math.MulX(b,d),e=(d.x-c.x)*e.x+(d.y-c.y)*e.y;
    case b2.SeparationFunction.e_faceB:return e=b2.Math.MulMV(b.R,this.m_axis),d=b2.Math.MulX(b,this.m_localPoint),c=b2.Math.MulTMV(a.R,e.GetNegative()),c=this.m_proxyA.GetSupportVertex(c),c=b2.Math.MulX(a,c),e=(c.x-d.x)*e.x+(c.y-d.y)*e.y;
    default:return b2.Settings.b2Assert(!1),0}
    };
    b2.SeparationFunction.prototype.m_proxyA=null;
    b2.SeparationFunction.prototype.m_proxyB=null;

    b2.SeparationFunction.prototype.m_type=0;
    b2.SeparationFunction.prototype.m_localPoint=new b2.Vec2;
    b2.SeparationFunction.prototype.m_axis=new b2.Vec2;
    b2.Simplex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Simplex.prototype.__constructor=function(){
    this.m_vertices[0]=this.m_v1;
    this.m_vertices[1]=this.m_v2;
    this.m_vertices[2]=this.m_v3
    };

    b2.Simplex.prototype.__varz=function(){
    this.m_v1=new b2.SimplexVertex;
    this.m_v2=new b2.SimplexVertex;
    this.m_v3=new b2.SimplexVertex;
    this.m_vertices=Array(3)
    };

    b2.Simplex.prototype.ReadCache=function(a,b,c,d,e){
    b2.Settings.b2Assert(0<=a.count&&a.count<=3);
    var h,g;
    this.m_count=a.count;
    for(var f=this.m_vertices,i=0;
        i<this.m_count;
        i++){
        var j=f[i];
        j.indexA=a.indexA[i];
        j.indexB=a.indexB[i];
        h=b.GetVertex(j.indexA);
        g=d.GetVertex(j.indexB);
        j.wA=b2.Math.MulX(c,h);
        j.wB=b2.Math.MulX(e,g);
        j.w=b2.Math.SubtractVV(j.wB,j.wA);
        j.a=0}if(this.m_count>1&&(a=a.metric,h=this.GetMetric(),h<0.5*a||2*a<h||h<Number.MIN_VALUE))this.m_count=0;
    if(this.m_count==0)j=f[0],j.indexA=0,j.indexB=
        0,h=b.GetVertex(0),g=d.GetVertex(0),j.wA=b2.Math.MulX(c,h),j.wB=b2.Math.MulX(e,g),j.w=b2.Math.SubtractVV(j.wB,j.wA),this.m_count=1
    };
    b2.Simplex.prototype.WriteCache=function(a){
    a.metric=this.GetMetric();
    a.count=parseInt(this.m_count);
    for(var b=this.m_vertices,c=0;
        c<this.m_count;
        c++)a.indexA[c]=parseInt(b[c].indexA),a.indexB[c]=parseInt(b[c].indexB)
    };

    b2.Simplex.prototype.GetSearchDirection=function(){
    switch(this.m_count){
    case 1:return this.m_v1.w.GetNegative();
    case 2:var a=b2.Math.SubtractVV(this.m_v2.w,this.m_v1.w);
        return b2.Math.CrossVV(a,this.m_v1.w.GetNegative())>0?b2.Math.CrossFV(1,a):b2.Math.CrossVF(a,1);
    default:return b2.Settings.b2Assert(!1),new b2.Vec2}
    };

    b2.Simplex.prototype.GetClosestPoint=function(){
    switch(this.m_count){
    case 0:return b2.Settings.b2Assert(!1),new b2.Vec2;
    case 1:return this.m_v1.w;
    case 2:return new b2.Vec2(this.m_v1.a*this.m_v1.w.x+this.m_v2.a*this.m_v2.w.x,this.m_v1.a*this.m_v1.w.y+this.m_v2.a*this.m_v2.w.y);
    default:return b2.Settings.b2Assert(!1),new b2.Vec2}
    };

    b2.Simplex.prototype.GetWitnessPoints=function(a,b){
    switch(this.m_count){
    case 0:b2.Settings.b2Assert(!1);
        break;
    case 1:a.SetV(this.m_v1.wA);
        b.SetV(this.m_v1.wB);
        break;
    case 2:a.x=this.m_v1.a*this.m_v1.wA.x+this.m_v2.a*this.m_v2.wA.x;
        a.y=this.m_v1.a*this.m_v1.wA.y+this.m_v2.a*this.m_v2.wA.y;
        b.x=this.m_v1.a*this.m_v1.wB.x+this.m_v2.a*this.m_v2.wB.x;
        b.y=this.m_v1.a*this.m_v1.wB.y+this.m_v2.a*this.m_v2.wB.y;
        break;
    case 3:b.x=a.x=this.m_v1.a*this.m_v1.wA.x+this.m_v2.a*this.m_v2.wA.x+this.m_v3.a*this.m_v3.wA.x;

        b.y=a.y=this.m_v1.a*this.m_v1.wA.y+this.m_v2.a*this.m_v2.wA.y+this.m_v3.a*this.m_v3.wA.y;
        break;
    default:b2.Settings.b2Assert(!1)}
    };
    b2.Simplex.prototype.GetMetric=function(){
    switch(this.m_count){
    case 0:return b2.Settings.b2Assert(!1),0;
    case 1:return 0;
    case 2:return b2.Math.SubtractVV(this.m_v1.w,this.m_v2.w).Length();
    case 3:return b2.Math.CrossVV(b2.Math.SubtractVV(this.m_v2.w,this.m_v1.w),b2.Math.SubtractVV(this.m_v3.w,this.m_v1.w));
    default:return b2.Settings.b2Assert(!1),0}
    };

    b2.Simplex.prototype.Solve2=function(){
    var a=this.m_v1.w,b=this.m_v2.w,c=b2.Math.SubtractVV(b,a),a=-(a.x*c.x+a.y*c.y);
    a<=0?this.m_count=this.m_v1.a=1:(b=b.x*c.x+b.y*c.y,b<=0?(this.m_count=this.m_v2.a=1,this.m_v1.Set(this.m_v2)):(c=1/(b+a),this.m_v1.a=b*c,this.m_v2.a=a*c,this.m_count=2))
    };

    b2.Simplex.prototype.Solve3=function(){
    var a=this.m_v1.w,b=this.m_v2.w,c=this.m_v3.w,d=b2.Math.SubtractVV(b,a),e=b2.Math.Dot(a,d),h=b2.Math.Dot(b,d),e=-e,g=b2.Math.SubtractVV(c,a),f=b2.Math.Dot(a,g),i=b2.Math.Dot(c,g),f=-f,j=b2.Math.SubtractVV(c,b),k=b2.Math.Dot(b,j),j=b2.Math.Dot(c,j),k=-k,g=b2.Math.CrossVV(d,g),d=g*b2.Math.CrossVV(b,c),c=g*b2.Math.CrossVV(c,a),a=g*b2.Math.CrossVV(a,b);
    e<=0&&f<=0?this.m_count=this.m_v1.a=1:h>0&&e>0&&a<=0?(i=1/(h+e),this.m_v1.a=h*i,this.m_v2.a=e*i,this.m_count=2):
        i>0&&f>0&&c<=0?(h=1/(i+f),this.m_v1.a=i*h,this.m_v3.a=f*h,this.m_count=2,this.m_v2.Set(this.m_v3)):h<=0&&k<=0?(this.m_count=this.m_v2.a=1,this.m_v1.Set(this.m_v2)):i<=0&&j<=0?(this.m_count=this.m_v3.a=1,this.m_v1.Set(this.m_v3)):j>0&&k>0&&d<=0?(h=1/(j+k),this.m_v2.a=j*h,this.m_v3.a=k*h,this.m_count=2,this.m_v1.Set(this.m_v3)):(h=1/(d+c+a),this.m_v1.a=d*h,this.m_v2.a=c*h,this.m_v3.a=a*h,this.m_count=3)
    };
    b2.Simplex.prototype.m_v1=new b2.SimplexVertex;
    b2.Simplex.prototype.m_v2=new b2.SimplexVertex;

    b2.Simplex.prototype.m_v3=new b2.SimplexVertex;
    b2.Simplex.prototype.m_vertices=Array(3);
    b2.Simplex.prototype.m_count=0;
    b2.SimplexCache=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SimplexCache.prototype.__constructor=function(){

    };
    b2.SimplexCache.prototype.__varz=function(){
    this.indexA=Array(3);
    this.indexB=Array(3)
    };
    b2.SimplexCache.prototype.metric=null;
    b2.SimplexCache.prototype.count=0;
    b2.SimplexCache.prototype.indexA=Array(3);
    b2.SimplexCache.prototype.indexB=Array(3);

    b2.SimplexVertex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.SimplexVertex.prototype.__constructor=function(){

    };
    b2.SimplexVertex.prototype.__varz=function(){

    };
    b2.SimplexVertex.prototype.Set=function(a){
    this.wA.SetV(a.wA);
    this.wB.SetV(a.wB);
    this.w.SetV(a.w);
    this.a=a.a;
    this.indexA=a.indexA;
    this.indexB=a.indexB
    };
    b2.SimplexVertex.prototype.wA=null;
    b2.SimplexVertex.prototype.wB=null;
    b2.SimplexVertex.prototype.w=null;
    b2.SimplexVertex.prototype.a=null;

    b2.SimplexVertex.prototype.indexA=0;
    b2.SimplexVertex.prototype.indexB=0;
    b2.TimeOfImpact=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TimeOfImpact.prototype.__constructor=function(){

    };
    b2.TimeOfImpact.prototype.__varz=function(){

    };

    b2.TimeOfImpact.TimeOfImpact=function(a){
    ++b2.TimeOfImpact.b2_toiCalls;
    var b=a.proxyA,c=a.proxyB,d=a.sweepA,e=a.sweepB;
    b2.Settings.b2Assert(d.t0==e.t0);
    b2.Settings.b2Assert(1-d.t0>Number.MIN_VALUE);
    var h=b.m_radius+c.m_radius,a=a.tolerance,g=0,f=0,i=0;
    b2.TimeOfImpact.s_cache.count=0;
    for(b2.TimeOfImpact.s_distanceInput.useRadii=!1;
        ;
       ){
        d.GetTransform(b2.TimeOfImpact.s_xfA,g);
        e.GetTransform(b2.TimeOfImpact.s_xfB,g);
        b2.TimeOfImpact.s_distanceInput.proxyA=b;
        b2.TimeOfImpact.s_distanceInput.proxyB=c;
        b2.TimeOfImpact.s_distanceInput.transformA=
        b2.TimeOfImpact.s_xfA;
        b2.TimeOfImpact.s_distanceInput.transformB=b2.TimeOfImpact.s_xfB;
        b2.Distance.Distance(b2.TimeOfImpact.s_distanceOutput,b2.TimeOfImpact.s_cache,b2.TimeOfImpact.s_distanceInput);
        if(b2.TimeOfImpact.s_distanceOutput.distance<=0){
        g=1;
        break}b2.TimeOfImpact.s_fcn.Initialize(b2.TimeOfImpact.s_cache,b,b2.TimeOfImpact.s_xfA,c,b2.TimeOfImpact.s_xfB);
        var j=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
        if(j<=0){
        g=1;
        break}f==0&&(i=j>h?b2.Math.Max(h-a,0.75*h):
                 b2.Math.Max(j-a,0.02*h));
        if(j-i<0.5*a){
        if(f==0){
            g=1;
            break}break}var k=g,l=g,n=1;
        d.GetTransform(b2.TimeOfImpact.s_xfA,n);
        e.GetTransform(b2.TimeOfImpact.s_xfB,n);
        var m=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
        if(m>=i){
        g=1;
        break}for(var o=0;
              ;
             ){
            var p;
            p=o&1?l+(i-j)*(n-l)/(m-j):0.5*(l+n);
            d.GetTransform(b2.TimeOfImpact.s_xfA,p);
            e.GetTransform(b2.TimeOfImpact.s_xfB,p);
            var q=b2.TimeOfImpact.s_fcn.Evaluate(b2.TimeOfImpact.s_xfA,b2.TimeOfImpact.s_xfB);
            if(b2.Math.Abs(q-i)<0.025*
               a){
            k=p;
            break}q>i?(l=p,j=q):(n=p,m=q);
            ++o;
            ++b2.TimeOfImpact.b2_toiRootIters;
            if(o==50)break}b2.TimeOfImpact.b2_toiMaxRootIters=b2.Math.Max(b2.TimeOfImpact.b2_toiMaxRootIters,o);
        if(k<(1+100*Number.MIN_VALUE)*g)break;
        g=k;
        f++;
        ++b2.TimeOfImpact.b2_toiIters;
        if(f==1E3)break}b2.TimeOfImpact.b2_toiMaxIters=b2.Math.Max(b2.TimeOfImpact.b2_toiMaxIters,f);
    return g
    };
    b2.TimeOfImpact.b2_toiCalls=0;
    b2.TimeOfImpact.b2_toiIters=0;
    b2.TimeOfImpact.b2_toiMaxIters=0;
    b2.TimeOfImpact.b2_toiRootIters=0;

    b2.TimeOfImpact.b2_toiMaxRootIters=0;
    b2.TimeOfImpact.s_cache=new b2.SimplexCache;
    b2.TimeOfImpact.s_distanceInput=new b2.DistanceInput;
    b2.TimeOfImpact.s_xfA=new b2.Transform;
    b2.TimeOfImpact.s_xfB=new b2.Transform;
    b2.TimeOfImpact.s_fcn=new b2.SeparationFunction;
    b2.TimeOfImpact.s_distanceOutput=new b2.DistanceOutput;
    b2.TOIInput=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TOIInput.prototype.__constructor=function(){

    };

    b2.TOIInput.prototype.__varz=function(){
    this.proxyA=new b2.DistanceProxy;
    this.proxyB=new b2.DistanceProxy;
    this.sweepA=new b2.Sweep;
    this.sweepB=new b2.Sweep
    };
    b2.TOIInput.prototype.proxyA=new b2.DistanceProxy;
    b2.TOIInput.prototype.proxyB=new b2.DistanceProxy;
    b2.TOIInput.prototype.sweepA=new b2.Sweep;
    b2.TOIInput.prototype.sweepB=new b2.Sweep;
    b2.TOIInput.prototype.tolerance=null;
    b2.WorldManifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.WorldManifold.prototype.__constructor=function(){
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.Vec2
    };
    b2.WorldManifold.prototype.__varz=function(){
    this.m_normal=new b2.Vec2
    };

    b2.WorldManifold.prototype.Initialize=function(a,b,c,d,e){
    if(a.m_pointCount!=0){
        var h=0,g,f,i,j,k,l,n;
        switch(a.m_type){
        case b2.Manifold.e_circles:f=b.R;
        g=a.m_localPoint;
        h=b.position.x+f.col1.x*g.x+f.col2.x*g.y;
        b=b.position.y+f.col1.y*g.x+f.col2.y*g.y;
        f=d.R;
        g=a.m_points[0].m_localPoint;
        a=d.position.x+f.col1.x*g.x+f.col2.x*g.y;
        d=d.position.y+f.col1.y*g.x+f.col2.y*g.y;
        g=a-h;
        f=d-b;
        i=g*g+f*f;
        i>Number.MIN_VALUE*Number.MIN_VALUE?(i=Math.sqrt(i),this.m_normal.x=g/i,this.m_normal.y=f/i):(this.m_normal.x=1,
                                                          this.m_normal.y=0);
        g=b+c*this.m_normal.y;
        d-=e*this.m_normal.y;
        this.m_points[0].x=0.5*(h+c*this.m_normal.x+(a-e*this.m_normal.x));
        this.m_points[0].y=0.5*(g+d);
        break;
        case b2.Manifold.e_faceA:f=b.R;
        g=a.m_localPlaneNormal;
        i=f.col1.x*g.x+f.col2.x*g.y;
        j=f.col1.y*g.x+f.col2.y*g.y;
        f=b.R;
        g=a.m_localPoint;
        k=b.position.x+f.col1.x*g.x+f.col2.x*g.y;
        l=b.position.y+f.col1.y*g.x+f.col2.y*g.y;
        this.m_normal.x=i;
        this.m_normal.y=j;
        for(h=0;
            h<a.m_pointCount;
            h++)f=d.R,g=a.m_points[h].m_localPoint,n=d.position.x+f.col1.x*
            g.x+f.col2.x*g.y,g=d.position.y+f.col1.y*g.x+f.col2.y*g.y,this.m_points[h].x=n+0.5*(c-(n-k)*i-(g-l)*j-e)*i,this.m_points[h].y=g+0.5*(c-(n-k)*i-(g-l)*j-e)*j;
        break;
        case b2.Manifold.e_faceB:f=d.R;
        g=a.m_localPlaneNormal;
        i=f.col1.x*g.x+f.col2.x*g.y;
        j=f.col1.y*g.x+f.col2.y*g.y;
        f=d.R;
        g=a.m_localPoint;
        k=d.position.x+f.col1.x*g.x+f.col2.x*g.y;
        l=d.position.y+f.col1.y*g.x+f.col2.y*g.y;
        this.m_normal.x=-i;
        this.m_normal.y=-j;
        for(h=0;
            h<a.m_pointCount;
            h++)f=b.R,g=a.m_points[h].m_localPoint,n=b.position.x+f.col1.x*
            g.x+f.col2.x*g.y,g=b.position.y+f.col1.y*g.x+f.col2.y*g.y,this.m_points[h].x=n+0.5*(e-(n-k)*i-(g-l)*j-c)*i,this.m_points[h].y=g+0.5*(e-(n-k)*i-(g-l)*j-c)*j}}
    };
    b2.WorldManifold.prototype.m_normal=new b2.Vec2;
    b2.WorldManifold.prototype.m_points=null;
    ClipVertex=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    ClipVertex.prototype.__constructor=function(){

    };
    ClipVertex.prototype.__varz=function(){
    this.v=new b2.Vec2;
    this.id=new b2.ContactID
    };

    ClipVertex.prototype.Set=function(a){
    this.v.SetV(a.v);
    this.id.Set(a.id)
    };
    ClipVertex.prototype.v=new b2.Vec2;
    ClipVertex.prototype.id=new b2.ContactID;
    Features=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    Features.prototype.__constructor=function(){

    };
    Features.prototype.__varz=function(){

    };
    Features.prototype.__defineGetter__("referenceEdge",function(){
    return this._referenceEdge});

    Features.prototype.__defineSetter__("referenceEdge",function(a){
    this._referenceEdge=a;
    this._m_id._key=this._m_id._key&4294967040|this._referenceEdge&255});
    Features.prototype.__defineGetter__("incidentEdge",function(){
    return this._incidentEdge});
    Features.prototype.__defineSetter__("incidentEdge",function(a){
    this._incidentEdge=a;
    this._m_id._key=this._m_id._key&4294902015|this._incidentEdge<<8&65280});
    Features.prototype.__defineGetter__("incidentVertex",function(){
    return this._incidentVertex});

    Features.prototype.__defineSetter__("incidentVertex",function(a){
    this._incidentVertex=a;
    this._m_id._key=this._m_id._key&4278255615|this._incidentVertex<<16&16711680});
    Features.prototype.__defineGetter__("flip",function(){
    return this._flip});
    Features.prototype.__defineSetter__("flip",function(a){
    this._flip=a;
    this._m_id._key=this._m_id._key&16777215|this._flip<<24&4278190080});
    Features.prototype._referenceEdge=0;
    Features.prototype._incidentEdge=0;
    Features.prototype._incidentVertex=0;

    Features.prototype._flip=0;
    Features.prototype._m_id=null;
    b2.CircleShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.CircleShape.prototype,b2.Shape.prototype);
    b2.CircleShape.prototype._super=b2.Shape.prototype;
    b2.CircleShape.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[]);
    this.m_type=b2.Shape.e_circleShape;
    this.m_radius=a
    };
    b2.CircleShape.prototype.__varz=function(){
    this.m_p=new b2.Vec2
    };

    b2.CircleShape.prototype.Copy=function(){
    var a=new b2.CircleShape;
    a.Set(this);
    return a
    };
    b2.CircleShape.prototype.Set=function(a){
    this._super.Set.apply(this,[a]);
    isInstanceOf(a,b2.CircleShape)&&this.m_p.SetV(a.m_p)
    };
    b2.CircleShape.prototype.TestPoint=function(a,b){
    var c=a.R,d=a.position.x+(c.col1.x*this.m_p.x+c.col2.x*this.m_p.y),c=a.position.y+(c.col1.y*this.m_p.x+c.col2.y*this.m_p.y),d=b.x-d,c=b.y-c;
    return d*d+c*c<=this.m_radius*this.m_radius
    };

    b2.CircleShape.prototype.RayCast=function(a,b,c){
    var d=c.R,e=b.p1.x-(c.position.x+(d.col1.x*this.m_p.x+d.col2.x*this.m_p.y)),c=b.p1.y-(c.position.y+(d.col1.y*this.m_p.x+d.col2.y*this.m_p.y)),d=b.p2.x-b.p1.x,h=b.p2.y-b.p1.y,g=e*d+c*h,f=d*d+h*h,i=g*g-f*(e*e+c*c-this.m_radius*this.m_radius);
    if(i<0||f<Number.MIN_VALUE)return!1;
    g=-(g+Math.sqrt(i));
    if(0<=g&&g<=b.maxFraction*f)return g/=f,a.fraction=g,a.normal.x=e+g*d,a.normal.y=c+g*h,a.normal.Normalize(),!0;
    return!1
    };

    b2.CircleShape.prototype.ComputeAABB=function(a,b){
    var c=b.R,d=b.position.x+(c.col1.x*this.m_p.x+c.col2.x*this.m_p.y),c=b.position.y+(c.col1.y*this.m_p.x+c.col2.y*this.m_p.y);
    a.lowerBound.Set(d-this.m_radius,c-this.m_radius);
    a.upperBound.Set(d+this.m_radius,c+this.m_radius)
    };
    b2.CircleShape.prototype.ComputeMass=function(a,b){
    a.mass=b*b2.Settings.b2_pi*this.m_radius*this.m_radius;
    a.center.SetV(this.m_p);
    a.I=a.mass*(0.5*this.m_radius*this.m_radius+(this.m_p.x*this.m_p.x+this.m_p.y*this.m_p.y))
    };

    b2.CircleShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    var c=b2.Math.MulX(c,this.m_p),e=-(b2.Math.Dot(a,c)-b);
    if(e<-this.m_radius+Number.MIN_VALUE)return 0;
    if(e>this.m_radius)return d.SetV(c),Math.PI*this.m_radius*this.m_radius;
    var b=this.m_radius*this.m_radius,h=e*e,e=b*(Math.asin(e/this.m_radius)+Math.PI/2)+e*Math.sqrt(b-h),b=-2/3*Math.pow(b-h,1.5)/e;
    d.x=c.x+a.x*b;
    d.y=c.y+a.y*b;
    return e
    };
    b2.CircleShape.prototype.GetLocalPosition=function(){
    return this.m_p
    };

    b2.CircleShape.prototype.SetLocalPosition=function(a){
    this.m_p.SetV(a)
    };
    b2.CircleShape.prototype.GetRadius=function(){
    return this.m_radius
    };
    b2.CircleShape.prototype.SetRadius=function(a){
    this.m_radius=a
    };
    b2.CircleShape.prototype.m_p=new b2.Vec2;
    b2.EdgeChainDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.EdgeChainDef.prototype.__constructor=function(){
    this.vertexCount=0;
    this.isALoop=!0;
    this.vertices=[]
    };
    b2.EdgeChainDef.prototype.__varz=function(){

    };

    b2.EdgeChainDef.prototype.vertices=null;
    b2.EdgeChainDef.prototype.vertexCount=null;
    b2.EdgeChainDef.prototype.isALoop=null;
    b2.EdgeShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.EdgeShape.prototype,b2.Shape.prototype);
    b2.EdgeShape.prototype._super=b2.Shape.prototype;

    b2.EdgeShape.prototype.__constructor=function(a,b){
    this._super.__constructor.apply(this,[]);
    this.m_type=b2.Shape.e_edgeShape;
    this.m_nextEdge=this.m_prevEdge=null;
    this.m_v1=a;
    this.m_v2=b;
    this.m_direction.Set(this.m_v2.x-this.m_v1.x,this.m_v2.y-this.m_v1.y);
    this.m_length=this.m_direction.Normalize();
    this.m_normal.Set(this.m_direction.y,-this.m_direction.x);
    this.m_coreV1.Set(-b2.Settings.b2_toiSlop*(this.m_normal.x-this.m_direction.x)+this.m_v1.x,-b2.Settings.b2_toiSlop*(this.m_normal.y-this.m_direction.y)+
              this.m_v1.y);
    this.m_coreV2.Set(-b2.Settings.b2_toiSlop*(this.m_normal.x+this.m_direction.x)+this.m_v2.x,-b2.Settings.b2_toiSlop*(this.m_normal.y+this.m_direction.y)+this.m_v2.y);
    this.m_cornerDir1=this.m_normal;
    this.m_cornerDir2.Set(-this.m_normal.x,-this.m_normal.y)
    };

    b2.EdgeShape.prototype.__varz=function(){
    this.s_supportVec=new b2.Vec2;
    this.m_v1=new b2.Vec2;
    this.m_v2=new b2.Vec2;
    this.m_coreV1=new b2.Vec2;
    this.m_coreV2=new b2.Vec2;
    this.m_normal=new b2.Vec2;
    this.m_direction=new b2.Vec2;
    this.m_cornerDir1=new b2.Vec2;
    this.m_cornerDir2=new b2.Vec2
    };
    b2.EdgeShape.prototype.SetPrevEdge=function(a,b,c,d){
    this.m_prevEdge=a;
    this.m_coreV1=b;
    this.m_cornerDir1=c;
    this.m_cornerConvex1=d
    };

    b2.EdgeShape.prototype.SetNextEdge=function(a,b,c,d){
    this.m_nextEdge=a;
    this.m_coreV2=b;
    this.m_cornerDir2=c;
    this.m_cornerConvex2=d
    };
    b2.EdgeShape.prototype.TestPoint=function(){
    return!1
    };

    b2.EdgeShape.prototype.RayCast=function(a,b,c){
    var d,e=b.p2.x-b.p1.x,h=b.p2.y-b.p1.y;
    d=c.R;
    var g=c.position.x+(d.col1.x*this.m_v1.x+d.col2.x*this.m_v1.y),f=c.position.y+(d.col1.y*this.m_v1.x+d.col2.y*this.m_v1.y),i=c.position.y+(d.col1.y*this.m_v2.x+d.col2.y*this.m_v2.y)-f,c=-(c.position.x+(d.col1.x*this.m_v2.x+d.col2.x*this.m_v2.y)-g);
    d=100*Number.MIN_VALUE;
    var j=-(e*i+h*c);
    if(j>d){
        var g=b.p1.x-g,k=b.p1.y-f,f=g*i+k*c;
        if(0<=f&&f<=b.maxFraction*j&&(b=-e*k+h*g,-d*j<=b&&b<=j*(1+d)))return f/=j,a.fraction=
        f,b=Math.sqrt(i*i+c*c),a.normal.x=i/b,a.normal.y=c/b,!0}return!1
    };

    b2.EdgeShape.prototype.ComputeAABB=function(a,b){
    var c=b.R,d=b.position.x+(c.col1.x*this.m_v1.x+c.col2.x*this.m_v1.y),e=b.position.y+(c.col1.y*this.m_v1.x+c.col2.y*this.m_v1.y),h=b.position.x+(c.col1.x*this.m_v2.x+c.col2.x*this.m_v2.y),c=b.position.y+(c.col1.y*this.m_v2.x+c.col2.y*this.m_v2.y);
    d<h?(a.lowerBound.x=d,a.upperBound.x=h):(a.lowerBound.x=h,a.upperBound.x=d);
    e<c?(a.lowerBound.y=e,a.upperBound.y=c):(a.lowerBound.y=c,a.upperBound.y=e)
    };

    b2.EdgeShape.prototype.ComputeMass=function(a){
    a.mass=0;
    a.center.SetV(this.m_v1);
    a.I=0
    };

    b2.EdgeShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    var e=new b2.Vec2(a.x*b,a.y*b),h=b2.Math.MulX(c,this.m_v1),c=b2.Math.MulX(c,this.m_v2),g=b2.Math.Dot(a,h)-b,a=b2.Math.Dot(a,c)-b;
    if(g>0)if(a>0)return 0;
    else h.x=-a/(g-a)*h.x+g/(g-a)*c.x,h.y=-a/(g-a)*h.y+g/(g-a)*c.y;
    else if(a>0)c.x=-a/(g-a)*h.x+g/(g-a)*c.x,c.y=-a/(g-a)*h.y+g/(g-a)*c.y;
    d.x=(e.x+h.x+c.x)/3;
    d.y=(e.y+h.y+c.y)/3;
    return 0.5*((h.x-e.x)*(c.y-e.y)-(h.y-e.y)*(c.x-e.x))
    };
    b2.EdgeShape.prototype.GetLength=function(){
    return this.m_length
    };

    b2.EdgeShape.prototype.GetVertex1=function(){
    return this.m_v1
    };
    b2.EdgeShape.prototype.GetVertex2=function(){
    return this.m_v2
    };
    b2.EdgeShape.prototype.GetCoreVertex1=function(){
    return this.m_coreV1
    };
    b2.EdgeShape.prototype.GetCoreVertex2=function(){
    return this.m_coreV2
    };
    b2.EdgeShape.prototype.GetNormalVector=function(){
    return this.m_normal
    };
    b2.EdgeShape.prototype.GetDirectionVector=function(){
    return this.m_direction
    };
    b2.EdgeShape.prototype.GetCorner1Vector=function(){
    return this.m_cornerDir1
    };

    b2.EdgeShape.prototype.GetCorner2Vector=function(){
    return this.m_cornerDir2
    };
    b2.EdgeShape.prototype.Corner1IsConvex=function(){
    return this.m_cornerConvex1
    };
    b2.EdgeShape.prototype.Corner2IsConvex=function(){
    return this.m_cornerConvex2
    };
    b2.EdgeShape.prototype.GetFirstVertex=function(a){
    var b=a.R;
    return new b2.Vec2(a.position.x+(b.col1.x*this.m_coreV1.x+b.col2.x*this.m_coreV1.y),a.position.y+(b.col1.y*this.m_coreV1.x+b.col2.y*this.m_coreV1.y))
    };
    b2.EdgeShape.prototype.GetNextEdge=function(){
    return this.m_nextEdge
    };

    b2.EdgeShape.prototype.GetPrevEdge=function(){
    return this.m_prevEdge
    };

    b2.EdgeShape.prototype.Support=function(a,b,c){
    var d=a.R,e=a.position.x+(d.col1.x*this.m_coreV1.x+d.col2.x*this.m_coreV1.y),h=a.position.y+(d.col1.y*this.m_coreV1.x+d.col2.y*this.m_coreV1.y),g=a.position.x+(d.col1.x*this.m_coreV2.x+d.col2.x*this.m_coreV2.y),a=a.position.y+(d.col1.y*this.m_coreV2.x+d.col2.y*this.m_coreV2.y);
    e*b+h*c>g*b+a*c?(this.s_supportVec.x=e,this.s_supportVec.y=h):(this.s_supportVec.x=g,this.s_supportVec.y=a);
    return this.s_supportVec
    };
    b2.EdgeShape.prototype.s_supportVec=new b2.Vec2;

    b2.EdgeShape.prototype.m_v1=new b2.Vec2;
    b2.EdgeShape.prototype.m_v2=new b2.Vec2;
    b2.EdgeShape.prototype.m_coreV1=new b2.Vec2;
    b2.EdgeShape.prototype.m_coreV2=new b2.Vec2;
    b2.EdgeShape.prototype.m_length=null;
    b2.EdgeShape.prototype.m_normal=new b2.Vec2;
    b2.EdgeShape.prototype.m_direction=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerDir1=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerDir2=new b2.Vec2;
    b2.EdgeShape.prototype.m_cornerConvex1=null;
    b2.EdgeShape.prototype.m_cornerConvex2=null;

    b2.EdgeShape.prototype.m_nextEdge=null;
    b2.EdgeShape.prototype.m_prevEdge=null;
    b2.MassData=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.MassData.prototype.__constructor=function(){

    };
    b2.MassData.prototype.__varz=function(){
    this.center=new b2.Vec2(0,0)
    };
    b2.MassData.prototype.mass=0;
    b2.MassData.prototype.center=new b2.Vec2(0,0);
    b2.MassData.prototype.I=0;
    b2.PolygonShape=function(){
    b2.Shape.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.PolygonShape.prototype,b2.Shape.prototype);
    b2.PolygonShape.prototype._super=b2.Shape.prototype;
    b2.PolygonShape.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.m_type=b2.Shape.e_polygonShape;
    this.m_centroid=new b2.Vec2;
    this.m_vertices=[];
    this.m_normals=[]
    };
    b2.PolygonShape.prototype.__varz=function(){

    };
    b2.PolygonShape.AsArray=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsArray(a,b);
    return c
    };

    b2.PolygonShape.AsVector=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsVector(a,b);
    return c
    };
    b2.PolygonShape.AsBox=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsBox(a,b);
    return c
    };
    b2.PolygonShape.AsOrientedBox=function(a,b,c,d){
    var e=new b2.PolygonShape;
    e.SetAsOrientedBox(a,b,c,d);
    return e
    };
    b2.PolygonShape.AsEdge=function(a,b){
    var c=new b2.PolygonShape;
    c.SetAsEdge(a,b);
    return c
    };

    b2.PolygonShape.ComputeCentroid=function(a,b){
    for(var c=new b2.Vec2,d=0,e=1/3,h=0;
        h<b;
        ++h){
        var g=a[h],f=h+1<b?a[parseInt(h+1)]:a[0],i=0.5*((g.x-0)*(f.y-0)-(g.y-0)*(f.x-0));
        d+=i;
        c.x+=i*e*(0+g.x+f.x);
        c.y+=i*e*(0+g.y+f.y)}c.x*=1/d;
    c.y*=1/d;
    return c
    };

    b2.PolygonShape.ComputeOBB=function(a,b,c){
    for(var d=0,e=Array(c+1),d=0;
        d<c;
        ++d)e[d]=b[d];
    e[c]=e[0];
    b=Number.MAX_VALUE;
    for(d=1;
        d<=c;
        ++d){
        var h=e[parseInt(d-1)],g=e[d].x-h.x,f=e[d].y-h.y,i=Math.sqrt(g*g+f*f);
        g/=i;
        f/=i;
        for(var j=-f,k=g,l=i=Number.MAX_VALUE,n=-Number.MAX_VALUE,m=-Number.MAX_VALUE,o=0;
        o<c;
        ++o){
        var p=e[o].x-h.x,q=e[o].y-h.y,r=g*p+f*q,p=j*p+k*q;
        r<i&&(i=r);
        p<l&&(l=p);
        r>n&&(n=r);
        p>m&&(m=p)}o=(n-i)*(m-l);
        if(o<0.95*b)b=o,a.R.col1.x=g,a.R.col1.y=f,a.R.col2.x=j,a.R.col2.y=k,g=0.5*(i+n),f=0.5*
        (l+m),j=a.R,a.center.x=h.x+(j.col1.x*g+j.col2.x*f),a.center.y=h.y+(j.col1.y*g+j.col2.y*f),a.extents.x=0.5*(n-i),a.extents.y=0.5*(m-l)}
    };
    b2.PolygonShape.s_mat=new b2.Mat22;
    b2.PolygonShape.prototype.Validate=function(){
    return!1
    };
    b2.PolygonShape.prototype.Reserve=function(a){
    for(var b=this.m_vertices.length;
        b<a;
        b++)this.m_vertices[b]=new b2.Vec2,this.m_normals[b]=new b2.Vec2
    };
    b2.PolygonShape.prototype.Copy=function(){
    var a=new b2.PolygonShape;
    a.Set(this);
    return a
    };

    b2.PolygonShape.prototype.Set=function(a){
    this._super.Set.apply(this,[a]);
    if(isInstanceOf(a,b2.PolygonShape)){
        this.m_centroid.SetV(a.m_centroid);
        this.m_vertexCount=a.m_vertexCount;
        this.Reserve(this.m_vertexCount);
        for(var b=0;
        b<this.m_vertexCount;
        b++)this.m_vertices[b].SetV(a.m_vertices[b]),this.m_normals[b].SetV(a.m_normals[b])}
    };
    b2.PolygonShape.prototype.SetAsArray=function(a,b){
    for(var c=[],d=0,e=null;
        e=a[d];
        d++)c.push(e);
    this.SetAsVector(c,b)
    };

    b2.PolygonShape.prototype.SetAsVector=function(a,b){
    if(typeof b=="undefined")b=a.length;
    b2.Settings.b2Assert(2<=b);
    this.m_vertexCount=b;
    this.Reserve(b);
    for(var c=0,c=0;
        c<this.m_vertexCount;
        c++)this.m_vertices[c].SetV(a[c]);
    for(c=0;
        c<this.m_vertexCount;
        ++c){
        var d=b2.Math.SubtractVV(this.m_vertices[c+1<this.m_vertexCount?c+1:0],this.m_vertices[c]);
        b2.Settings.b2Assert(d.LengthSquared()>Number.MIN_VALUE);
        this.m_normals[c].SetV(b2.Math.CrossVF(d,1));
        this.m_normals[c].Normalize()}this.m_centroid=b2.PolygonShape.ComputeCentroid(this.m_vertices,
                                              this.m_vertexCount)
    };
    b2.PolygonShape.prototype.SetAsBox=function(a,b){
    this.m_vertexCount=4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a,-b);
    this.m_vertices[1].Set(a,-b);
    this.m_vertices[2].Set(a,b);
    this.m_vertices[3].Set(-a,b);
    this.m_normals[0].Set(0,-1);
    this.m_normals[1].Set(1,0);
    this.m_normals[2].Set(0,1);
    this.m_normals[3].Set(-1,0);
    this.m_centroid.SetZero()
    };

    b2.PolygonShape.prototype.SetAsOrientedBox=function(a,b,c,d){
    this.m_vertexCount=4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a,-b);
    this.m_vertices[1].Set(a,-b);
    this.m_vertices[2].Set(a,b);
    this.m_vertices[3].Set(-a,b);
    this.m_normals[0].Set(0,-1);
    this.m_normals[1].Set(1,0);
    this.m_normals[2].Set(0,1);
    this.m_normals[3].Set(-1,0);
    this.m_centroid=c;
    a=new b2.Transform;
    a.position=c;
    a.R.Set(d);
    for(c=0;
        c<this.m_vertexCount;
        ++c)this.m_vertices[c]=b2.Math.MulX(a,this.m_vertices[c]),this.m_normals[c]=b2.Math.MulMV(a.R,
                                                      this.m_normals[c])
    };
    b2.PolygonShape.prototype.SetAsEdge=function(a,b){
    this.m_vertexCount=2;
    this.Reserve(2);
    this.m_vertices[0].SetV(a);
    this.m_vertices[1].SetV(b);
    this.m_centroid.x=0.5*(a.x+b.x);
    this.m_centroid.y=0.5*(a.y+b.y);
    this.m_normals[0]=b2.Math.CrossVF(b2.Math.SubtractVV(b,a),1);
    this.m_normals[0].Normalize();
    this.m_normals[1].x=-this.m_normals[0].x;
    this.m_normals[1].y=-this.m_normals[0].y
    };

    b2.PolygonShape.prototype.TestPoint=function(a,b){
    var c;
    c=a.R;
    for(var d=b.x-a.position.x,e=b.y-a.position.y,h=d*c.col1.x+e*c.col1.y,g=d*c.col2.x+e*c.col2.y,f=0;
        f<this.m_vertexCount;
        ++f)if(c=this.m_vertices[f],d=h-c.x,e=g-c.y,c=this.m_normals[f],c.x*d+c.y*e>0)return!1;
    return!0
    };

    b2.PolygonShape.prototype.RayCast=function(a,b,c){
    var d=0,e=b.maxFraction,h,g,f,i;
    h=b.p1.x-c.position.x;
    g=b.p1.y-c.position.y;
    f=c.R;
    var j=h*f.col1.x+g*f.col1.y,k=h*f.col2.x+g*f.col2.y;
    h=b.p2.x-c.position.x;
    g=b.p2.y-c.position.y;
    f=c.R;
    b=h*f.col1.x+g*f.col1.y-j;
    f=h*f.col2.x+g*f.col2.y-k;
    for(var l=-1,n=0;
        n<this.m_vertexCount;
        ++n){
        i=this.m_vertices[n];
        h=i.x-j;
        g=i.y-k;
        i=this.m_normals[n];
        h=i.x*h+i.y*g;
        g=i.x*b+i.y*f;
        if(g==0){
        if(h<0)return!1}else g<0&&h<d*g?(d=h/g,l=n):g>0&&h<e*g&&(e=h/g);
        if(e<d-Number.MIN_VALUE)return!1}if(l>=
                        0)return a.fraction=d,f=c.R,i=this.m_normals[l],a.normal.x=f.col1.x*i.x+f.col2.x*i.y,a.normal.y=f.col1.y*i.x+f.col2.y*i.y,!0;
    return!1
    };

    b2.PolygonShape.prototype.ComputeAABB=function(a,b){
    for(var c=b.R,d=this.m_vertices[0],e=b.position.x+(c.col1.x*d.x+c.col2.x*d.y),h=b.position.y+(c.col1.y*d.x+c.col2.y*d.y),g=e,f=h,i=1;
        i<this.m_vertexCount;
        ++i)var d=this.m_vertices[i],j=b.position.x+(c.col1.x*d.x+c.col2.x*d.y),d=b.position.y+(c.col1.y*d.x+c.col2.y*d.y),e=e<j?e:j,h=h<d?h:d,g=g>j?g:j,f=f>d?f:d;
    a.lowerBound.x=e-this.m_radius;
    a.lowerBound.y=h-this.m_radius;
    a.upperBound.x=g+this.m_radius;
    a.upperBound.y=f+this.m_radius
    };

    b2.PolygonShape.prototype.ComputeMass=function(a,b){
    if(this.m_vertexCount==2)a.center.x=0.5*(this.m_vertices[0].x+this.m_vertices[1].x),a.center.y=0.5*(this.m_vertices[0].y+this.m_vertices[1].y),a.mass=0,a.I=0;
    else{
        for(var c=0,d=0,e=0,h=0,g=1/3,f=0;
        f<this.m_vertexCount;
        ++f){
        var i=this.m_vertices[f],j=f+1<this.m_vertexCount?this.m_vertices[parseInt(f+1)]:this.m_vertices[0],k=i.x-0,l=i.y-0,n=j.x-0,m=j.y-0,o=k*m-l*n,p=0.5*o;
        e+=p;
        c+=p*g*(0+i.x+j.x);
        d+=p*g*(0+i.y+j.y);
        i=k;
        h+=o*(g*(0.25*(i*i+n*i+n*n)+(0*
                         i+0*n))+0+(g*(0.25*(l*l+m*l+m*m)+(0*l+0*m))+0))}a.mass=b*e;
        c*=1/e;
        d*=1/e;
        a.center.Set(c,d);
        a.I=b*h}
    };

    b2.PolygonShape.prototype.ComputeSubmergedArea=function(a,b,c,d){
    for(var e=b2.Math.MulTMV(c.R,a),h=b-b2.Math.Dot(a,c.position),g=[],f=0,i=-1,b=-1,j=!1,a=a=0;
        a<this.m_vertexCount;
        ++a){
        g[a]=b2.Math.Dot(e,this.m_vertices[a])-h;
        var k=g[a]<-Number.MIN_VALUE;
        a>0&&(k?j||(i=a-1,f++):j&&(b=a-1,f++));
        j=k}switch(f){
        case 0:return j?(a=new b2.MassData,this.ComputeMass(a,1),d.SetV(b2.Math.MulX(c,a.center)),a.mass):0;
        case 1:i==-1?i=this.m_vertexCount-1:b=this.m_vertexCount-1}a=(i+1)%this.m_vertexCount;
    e=(b+1)%this.m_vertexCount;

    h=(0-g[i])/(g[a]-g[i]);
    g=(0-g[b])/(g[e]-g[b]);
    i=new b2.Vec2(this.m_vertices[i].x*(1-h)+this.m_vertices[a].x*h,this.m_vertices[i].y*(1-h)+this.m_vertices[a].y*h);
    b=new b2.Vec2(this.m_vertices[b].x*(1-g)+this.m_vertices[e].x*g,this.m_vertices[b].y*(1-g)+this.m_vertices[e].y*g);
    g=0;
    h=new b2.Vec2;
    for(f=this.m_vertices[a];
        a!=e;
       )a=(a+1)%this.m_vertexCount,j=a==e?b:this.m_vertices[a],k=0.5*((f.x-i.x)*(j.y-i.y)-(f.y-i.y)*(j.x-i.x)),g+=k,h.x+=k*(i.x+f.x+j.x)/3,h.y+=k*(i.y+f.y+j.y)/3,f=j;
    h.Multiply(1/g);
    d.SetV(b2.Math.MulX(c,
                h));
    return g
    };
    b2.PolygonShape.prototype.GetVertexCount=function(){
    return this.m_vertexCount
    };
    b2.PolygonShape.prototype.GetVertices=function(){
    return this.m_vertices
    };
    b2.PolygonShape.prototype.GetNormals=function(){
    return this.m_normals
    };
    b2.PolygonShape.prototype.GetSupport=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_vertexCount;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return b
    };

    b2.PolygonShape.prototype.GetSupportVertex=function(a){
    for(var b=0,c=this.m_vertices[0].x*a.x+this.m_vertices[0].y*a.y,d=1;
        d<this.m_vertexCount;
        ++d){
        var e=this.m_vertices[d].x*a.x+this.m_vertices[d].y*a.y;
        e>c&&(b=d,c=e)}return this.m_vertices[b]
    };
    b2.PolygonShape.prototype.m_centroid=null;
    b2.PolygonShape.prototype.m_vertices=null;
    b2.PolygonShape.prototype.m_normals=null;
    b2.PolygonShape.prototype.m_vertexCount=0;
    b2.Shape=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Shape.prototype.__constructor=function(){
    this.m_type=b2.Shape.e_unknownShape;
    this.m_radius=b2.Settings.b2_linearSlop
    };
    b2.Shape.prototype.__varz=function(){

    };
    b2.Shape.TestOverlap=function(a,b,c,d){
    var e=new b2.DistanceInput;
    e.proxyA=new b2.DistanceProxy;
    e.proxyA.Set(a);
    e.proxyB=new b2.DistanceProxy;
    e.proxyB.Set(c);
    e.transformA=b;
    e.transformB=d;
    e.useRadii=!0;
    a=new b2.SimplexCache;
    a.count=0;
    b=new b2.DistanceOutput;
    b2.Distance.Distance(b,a,e);
    return b.distance<10*Number.MIN_VALUE
    };

    b2.Shape.e_hitCollide=1;
    b2.Shape.e_missCollide=0;
    b2.Shape.e_startsInsideCollide=-1;
    b2.Shape.e_unknownShape=-1;
    b2.Shape.e_circleShape=0;
    b2.Shape.e_polygonShape=1;
    b2.Shape.e_edgeShape=2;
    b2.Shape.e_shapeTypeCount=3;
    b2.Shape.prototype.Copy=function(){
    return null
    };
    b2.Shape.prototype.Set=function(a){
    this.m_radius=a.m_radius
    };
    b2.Shape.prototype.GetType=function(){
    return this.m_type
    };
    b2.Shape.prototype.TestPoint=function(){
    return!1
    };
    b2.Shape.prototype.RayCast=function(){
    return!1
    };

    b2.Shape.prototype.ComputeAABB=function(){

    };
    b2.Shape.prototype.ComputeMass=function(){

    };
    b2.Shape.prototype.ComputeSubmergedArea=function(){
    return 0
    };
    b2.Shape.prototype.m_type=0;
    b2.Shape.prototype.m_radius=null;
    b2.Color=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Color.prototype.__constructor=function(a,b,c){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1));
    this._g=parseInt(255*b2.Math.Clamp(b,0,1));
    this._b=parseInt(255*b2.Math.Clamp(c,0,1))
    };
    b2.Color.prototype.__varz=function(){

    };

    b2.Color.prototype.Set=function(a,b,c){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1));
    this._g=parseInt(255*b2.Math.Clamp(b,0,1));
    this._b=parseInt(255*b2.Math.Clamp(c,0,1))
    };
    b2.Color.prototype.__defineGetter__("r",function(){
    return this._r});
    b2.Color.prototype.__defineSetter__("r",function(a){
    this._r=parseInt(255*b2.Math.Clamp(a,0,1))});
    b2.Color.prototype.__defineGetter__("g",function(){
    return this._g});
    b2.Color.prototype.__defineSetter__("g",function(a){
    this._g=parseInt(255*b2.Math.Clamp(a,0,1))});

    b2.Color.prototype.__defineGetter__("b",function(){
    return this._b});
    b2.Color.prototype.__defineSetter__("b",function(a){
    this._b=parseInt(255*b2.Math.Clamp(a,0,1))});
    b2.Color.prototype.__defineGetter__("color",function(){
    return this._r<<16|this._g<<8|this._b});
    b2.Color.prototype._r=0;
    b2.Color.prototype._g=0;
    b2.Color.prototype._b=0;
    b2.Settings=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Settings.prototype.__constructor=function(){

    };
    b2.Settings.prototype.__varz=function(){

    };

    b2.Settings.b2MixFriction=function(a,b){
    return Math.sqrt(a*b)
    };
    b2.Settings.b2MixRestitution=function(a,b){
    return a>b?a:b
    };
    b2.Settings.b2Assert=function(a){
    if(!a)throw"Assertion Failed";

    };
    b2.Settings.VERSION="2.1alpha";
    b2.Settings.USHRT_MAX=65535;
    b2.Settings.b2_pi=Math.PI;
    b2.Settings.b2_maxManifoldPoints=2;
    b2.Settings.b2_aabbExtension=0.1;
    b2.Settings.b2_aabbMultiplier=2;
    b2.Settings.b2_polygonRadius=2*b2.Settings.b2_linearSlop;
    b2.Settings.b2_linearSlop=0.005;
    b2.Settings.b2_angularSlop=2/180*b2.Settings.b2_pi;

    b2.Settings.b2_toiSlop=8*b2.Settings.b2_linearSlop;
    b2.Settings.b2_maxTOIContactsPerIsland=32;
    b2.Settings.b2_maxTOIJointsPerIsland=32;
    b2.Settings.b2_velocityThreshold=1;
    b2.Settings.b2_maxLinearCorrection=0.2;
    b2.Settings.b2_maxAngularCorrection=8/180*b2.Settings.b2_pi;
    b2.Settings.b2_maxTranslation=2;
    b2.Settings.b2_maxTranslationSquared=b2.Settings.b2_maxTranslation*b2.Settings.b2_maxTranslation;
    b2.Settings.b2_maxRotation=0.5*b2.Settings.b2_pi;

    b2.Settings.b2_maxRotationSquared=b2.Settings.b2_maxRotation*b2.Settings.b2_maxRotation;
    b2.Settings.b2_contactBaumgarte=0.2;
    b2.Settings.b2_timeToSleep=0.5;
    b2.Settings.b2_linearSleepTolerance=0.01;
    b2.Settings.b2_angularSleepTolerance=2/180*b2.Settings.b2_pi;
    b2.Mat22=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Mat22.prototype.__constructor=function(){
    this.col1.x=this.col2.y=1
    };
    b2.Mat22.prototype.__varz=function(){
    this.col1=new b2.Vec2;
    this.col2=new b2.Vec2
    };

    b2.Mat22.FromAngle=function(a){
    var b=new b2.Mat22;
    b.Set(a);
    return b
    };
    b2.Mat22.FromVV=function(a,b){
    var c=new b2.Mat22;
    c.SetVV(a,b);
    return c
    };
    b2.Mat22.prototype.Set=function(a){
    var b=Math.cos(a),a=Math.sin(a);
    this.col1.x=b;
    this.col2.x=-a;
    this.col1.y=a;
    this.col2.y=b
    };
    b2.Mat22.prototype.SetVV=function(a,b){
    this.col1.SetV(a);
    this.col2.SetV(b)
    };
    b2.Mat22.prototype.Copy=function(){
    var a=new b2.Mat22;
    a.SetM(this);
    return a
    };
    b2.Mat22.prototype.SetM=function(a){
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2)
    };

    b2.Mat22.prototype.AddM=function(a){
    this.col1.x+=a.col1.x;
    this.col1.y+=a.col1.y;
    this.col2.x+=a.col2.x;
    this.col2.y+=a.col2.y
    };
    b2.Mat22.prototype.SetIdentity=function(){
    this.col1.x=1;
    this.col2.x=0;
    this.col1.y=0;
    this.col2.y=1
    };
    b2.Mat22.prototype.SetZero=function(){
    this.col1.x=0;
    this.col2.x=0;
    this.col1.y=0;
    this.col2.y=0
    };
    b2.Mat22.prototype.GetAngle=function(){
    return Math.atan2(this.col1.y,this.col1.x)
    };

    b2.Mat22.prototype.GetInverse=function(a){
    var b=this.col1.x,c=this.col2.x,d=this.col1.y,e=this.col2.y,h=b*e-c*d;
    h!=0&&(h=1/h);
    a.col1.x=h*e;
    a.col2.x=-h*c;
    a.col1.y=-h*d;
    a.col2.y=h*b;
    return a
    };
    b2.Mat22.prototype.Solve=function(a,b,c){
    var d=this.col1.x,e=this.col2.x,h=this.col1.y,g=this.col2.y,f=d*g-e*h;
    f!=0&&(f=1/f);
    a.x=f*(g*b-e*c);
    a.y=f*(d*c-h*b);
    return a
    };
    b2.Mat22.prototype.Abs=function(){
    this.col1.Abs();
    this.col2.Abs()
    };
    b2.Mat22.prototype.col1=new b2.Vec2;
    b2.Mat22.prototype.col2=new b2.Vec2;

    b2.Mat33=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Mat33.prototype.__constructor=function(a,b,c){
    !a&&!b&&!c?(this.col1.SetZero(),this.col2.SetZero(),this.col3.SetZero()):(this.col1.SetV(a),this.col2.SetV(b),this.col3.SetV(c))
    };
    b2.Mat33.prototype.__varz=function(){
    this.col1=new b2.Vec3;
    this.col2=new b2.Vec3;
    this.col3=new b2.Vec3
    };
    b2.Mat33.prototype.SetVVV=function(a,b,c){
    this.col1.SetV(a);
    this.col2.SetV(b);
    this.col3.SetV(c)
    };

    b2.Mat33.prototype.Copy=function(){
    return new b2.Mat33(this.col1,this.col2,this.col3)
    };
    b2.Mat33.prototype.SetM=function(a){
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2);
    this.col3.SetV(a.col3)
    };
    b2.Mat33.prototype.AddM=function(a){
    this.col1.x+=a.col1.x;
    this.col1.y+=a.col1.y;
    this.col1.z+=a.col1.z;
    this.col2.x+=a.col2.x;
    this.col2.y+=a.col2.y;
    this.col2.z+=a.col2.z;
    this.col3.x+=a.col3.x;
    this.col3.y+=a.col3.y;
    this.col3.z+=a.col3.z
    };

    b2.Mat33.prototype.SetIdentity=function(){
    this.col1.x=1;
    this.col2.x=0;
    this.col3.x=0;
    this.col1.y=0;
    this.col2.y=1;
    this.col3.y=0;
    this.col1.z=0;
    this.col2.z=0;
    this.col3.z=1
    };
    b2.Mat33.prototype.SetZero=function(){
    this.col1.x=0;
    this.col2.x=0;
    this.col3.x=0;
    this.col1.y=0;
    this.col2.y=0;
    this.col3.y=0;
    this.col1.z=0;
    this.col2.z=0;
    this.col3.z=0
    };
    b2.Mat33.prototype.Solve22=function(a,b,c){
    var d=this.col1.x,e=this.col2.x,h=this.col1.y,g=this.col2.y,f=d*g-e*h;
    f!=0&&(f=1/f);
    a.x=f*(g*b-e*c);
    a.y=f*(d*c-h*b);
    return a
    };

    b2.Mat33.prototype.Solve33=function(a,b,c,d){
    var e=this.col1.x,h=this.col1.y,g=this.col1.z,f=this.col2.x,i=this.col2.y,j=this.col2.z,k=this.col3.x,l=this.col3.y,n=this.col3.z,m=e*(i*n-j*l)+h*(j*k-f*n)+g*(f*l-i*k);
    m!=0&&(m=1/m);
    a.x=m*(b*(i*n-j*l)+c*(j*k-f*n)+d*(f*l-i*k));
    a.y=m*(e*(c*n-d*l)+h*(d*k-b*n)+g*(b*l-c*k));
    a.z=m*(e*(i*d-j*c)+h*(j*b-f*d)+g*(f*c-i*b));
    return a
    };
    b2.Mat33.prototype.col1=new b2.Vec3;
    b2.Mat33.prototype.col2=new b2.Vec3;
    b2.Mat33.prototype.col3=new b2.Vec3;

    b2.Math=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Math.prototype.__constructor=function(){

    };
    b2.Math.prototype.__varz=function(){

    };
    b2.Math.IsValid=function(a){
    return isFinite(a)
    };
    b2.Math.Dot=function(a,b){
    return a.x*b.x+a.y*b.y
    };
    b2.Math.CrossVV=function(a,b){
    return a.x*b.y-a.y*b.x
    };
    b2.Math.CrossVF=function(a,b){
    return new b2.Vec2(b*a.y,-b*a.x)
    };
    b2.Math.CrossFV=function(a,b){
    return new b2.Vec2(-a*b.y,a*b.x)
    };

    b2.Math.MulMV=function(a,b){
    return new b2.Vec2(a.col1.x*b.x+a.col2.x*b.y,a.col1.y*b.x+a.col2.y*b.y)
    };
    b2.Math.MulTMV=function(a,b){
    return new b2.Vec2(b2.Math.Dot(b,a.col1),b2.Math.Dot(b,a.col2))
    };
    b2.Math.MulX=function(a,b){
    var c=b2.Math.MulMV(a.R,b);
    c.x+=a.position.x;
    c.y+=a.position.y;
    return c
    };
    b2.Math.MulXT=function(a,b){
    var c=b2.Math.SubtractVV(b,a.position),d=c.x*a.R.col1.x+c.y*a.R.col1.y;
    c.y=c.x*a.R.col2.x+c.y*a.R.col2.y;
    c.x=d;
    return c
    };

    b2.Math.AddVV=function(a,b){
    return new b2.Vec2(a.x+b.x,a.y+b.y)
    };
    b2.Math.SubtractVV=function(a,b){
    return new b2.Vec2(a.x-b.x,a.y-b.y)
    };
    b2.Math.Distance=function(a,b){
    var c=a.x-b.x,d=a.y-b.y;
    return Math.sqrt(c*c+d*d)
    };
    b2.Math.DistanceSquared=function(a,b){
    var c=a.x-b.x,d=a.y-b.y;
    return c*c+d*d
    };
    b2.Math.MulFV=function(a,b){
    return new b2.Vec2(a*b.x,a*b.y)
    };
    b2.Math.AddMM=function(a,b){
    return b2.Mat22.FromVV(b2.Math.AddVV(a.col1,b.col1),b2.Math.AddVV(a.col2,b.col2))
    };

    b2.Math.MulMM=function(a,b){
    return b2.Mat22.FromVV(b2.Math.MulMV(a,b.col1),b2.Math.MulMV(a,b.col2))
    };
    b2.Math.MulTMM=function(a,b){
    var c=new b2.Vec2(b2.Math.Dot(a.col1,b.col1),b2.Math.Dot(a.col2,b.col1)),d=new b2.Vec2(b2.Math.Dot(a.col1,b.col2),b2.Math.Dot(a.col2,b.col2));
    return b2.Mat22.FromVV(c,d)
    };
    b2.Math.Abs=function(a){
    return a>0?a:-a
    };
    b2.Math.AbsV=function(a){
    return new b2.Vec2(b2.Math.Abs(a.x),b2.Math.Abs(a.y))
    };
    b2.Math.AbsM=function(a){
    return b2.Mat22.FromVV(b2.Math.AbsV(a.col1),b2.Math.AbsV(a.col2))
    };

    b2.Math.Min=function(a,b){
    return a<b?a:b
    };
    b2.Math.MinV=function(a,b){
    return new b2.Vec2(b2.Math.Min(a.x,b.x),b2.Math.Min(a.y,b.y))
    };
    b2.Math.Max=function(a,b){
    return a>b?a:b
    };
    b2.Math.MaxV=function(a,b){
    return new b2.Vec2(b2.Math.Max(a.x,b.x),b2.Math.Max(a.y,b.y))
    };
    b2.Math.Clamp=function(a,b,c){
    return a<b?b:a>c?c:a
    };
    b2.Math.ClampV=function(a,b,c){
    return b2.Math.MaxV(b,b2.Math.MinV(a,c))
    };
    b2.Math.Swap=function(a,b){
    var c=a[0];
    a[0]=b[0];
    b[0]=c
    };
    b2.Math.Random=function(){
    return Math.random()*2-1
    };

    b2.Math.RandomRange=function(a,b){
    var c=Math.random();
    return(b-a)*c+a
    };
    b2.Math.NextPowerOfTwo=function(a){
    a|=a>>1&2147483647;
    a|=a>>2&1073741823;
    a|=a>>4&268435455;
    a|=a>>8&16777215;
    a|=a>>16&65535;
    return a+1
    };
    b2.Math.IsPowerOfTwo=function(a){
    return a>0&&(a&a-1)==0
    };
    b2.Math.b2Vec2_zero=new b2.Vec2(0,0);
    b2.Math.b2Mat22_identity=b2.Mat22.FromVV(new b2.Vec2(1,0),new b2.Vec2(0,1));
    b2.Math.b2Transform_identity=new b2.Transform(b2.Math.b2Vec2_zero,b2.Math.b2Mat22_identity);

    b2.Sweep=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Sweep.prototype.__constructor=function(){

    };
    b2.Sweep.prototype.__varz=function(){
    this.localCenter=new b2.Vec2;
    this.c0=new b2.Vec2;
    this.c=new b2.Vec2
    };
    b2.Sweep.prototype.Set=function(a){
    this.localCenter.SetV(a.localCenter);
    this.c0.SetV(a.c0);
    this.c.SetV(a.c);
    this.a0=a.a0;
    this.a=a.a;
    this.t0=a.t0
    };

    b2.Sweep.prototype.Copy=function(){
    var a=new b2.Sweep;
    a.localCenter.SetV(this.localCenter);
    a.c0.SetV(this.c0);
    a.c.SetV(this.c);
    a.a0=this.a0;
    a.a=this.a;
    a.t0=this.t0;
    return a
    };
    b2.Sweep.prototype.GetTransform=function(a,b){
    a.position.x=(1-b)*this.c0.x+b*this.c.x;
    a.position.y=(1-b)*this.c0.y+b*this.c.y;
    a.R.Set((1-b)*this.a0+b*this.a);
    var c=a.R;
    a.position.x-=c.col1.x*this.localCenter.x+c.col2.x*this.localCenter.y;
    a.position.y-=c.col1.y*this.localCenter.x+c.col2.y*this.localCenter.y
    };

    b2.Sweep.prototype.Advance=function(a){
    if(this.t0<a&&1-this.t0>Number.MIN_VALUE){
        var b=(a-this.t0)/(1-this.t0);
        this.c0.x=(1-b)*this.c0.x+b*this.c.x;
        this.c0.y=(1-b)*this.c0.y+b*this.c.y;
        this.a0=(1-b)*this.a0+b*this.a;
        this.t0=a}
    };
    b2.Sweep.prototype.localCenter=new b2.Vec2;
    b2.Sweep.prototype.c0=new b2.Vec2;
    b2.Sweep.prototype.c=new b2.Vec2;
    b2.Sweep.prototype.a0=null;
    b2.Sweep.prototype.a=null;
    b2.Sweep.prototype.t0=null;
    b2.Transform=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Transform.prototype.__constructor=function(a,b){
    a&&(this.position.SetV(a),this.R.SetM(b))
    };
    b2.Transform.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.R=new b2.Mat22
    };
    b2.Transform.prototype.Initialize=function(a,b){
    this.position.SetV(a);
    this.R.SetM(b)
    };
    b2.Transform.prototype.SetIdentity=function(){
    this.position.SetZero();
    this.R.SetIdentity()
    };
    b2.Transform.prototype.Set=function(a){
    this.position.SetV(a.position);
    this.R.SetM(a.R)
    };

    b2.Transform.prototype.GetAngle=function(){
    return Math.atan2(this.R.col1.y,this.R.col1.x)
    };
    b2.Transform.prototype.position=new b2.Vec2;
    b2.Transform.prototype.R=new b2.Mat22;
    b2.Vec2=function(a,b){
    if(arguments.length==2)this.x=a,this.y=b
    };
    b2.Vec2.Make=function(a,b){
    return new b2.Vec2(a,b)
    };
    b2.Vec2.prototype.SetZero=function(){
    this.y=this.x=0
    };
    b2.Vec2.prototype.Set=function(a,b){
    this.x=a;
    this.y=b
    };
    b2.Vec2.prototype.SetV=function(a){
    this.x=a.x;
    this.y=a.y
    };

    b2.Vec2.prototype.GetNegative=function(){
    return new b2.Vec2(-this.x,-this.y)
    };
    b2.Vec2.prototype.NegativeSelf=function(){
    this.x=-this.x;
    this.y=-this.y
    };
    b2.Vec2.prototype.Copy=function(){
    return new b2.Vec2(this.x,this.y)
    };
    b2.Vec2.prototype.Add=function(a){
    this.x+=a.x;
    this.y+=a.y
    };
    b2.Vec2.prototype.Subtract=function(a){
    this.x-=a.x;
    this.y-=a.y
    };
    b2.Vec2.prototype.Multiply=function(a){
    this.x*=a;
    this.y*=a
    };

    b2.Vec2.prototype.MulM=function(a){
    var b=this.x;
    this.x=a.col1.x*b+a.col2.x*this.y;
    this.y=a.col1.y*b+a.col2.y*this.y
    };
    b2.Vec2.prototype.MulTM=function(a){
    var b=b2.Math.Dot(this,a.col1);
    this.y=b2.Math.Dot(this,a.col2);
    this.x=b
    };
    b2.Vec2.prototype.CrossVF=function(a){
    var b=this.x;
    this.x=a*this.y;
    this.y=-a*b
    };
    b2.Vec2.prototype.CrossFV=function(a){
    var b=this.x;
    this.x=-a*this.y;
    this.y=a*b
    };
    b2.Vec2.prototype.MinV=function(a){
    this.x=this.x<a.x?this.x:a.x;
    this.y=this.y<a.y?this.y:a.y
    };

    b2.Vec2.prototype.MaxV=function(a){
    this.x=this.x>a.x?this.x:a.x;
    this.y=this.y>a.y?this.y:a.y
    };
    b2.Vec2.prototype.Abs=function(){
    if(this.x<0)this.x=-this.x;
    if(this.y<0)this.y=-this.y
    };
    b2.Vec2.prototype.Length=function(){
    return Math.sqrt(this.x*this.x+this.y*this.y)
    };
    b2.Vec2.prototype.LengthSquared=function(){
    return this.x*this.x+this.y*this.y
    };
    b2.Vec2.prototype.Normalize=function(){
    var a=Math.sqrt(this.x*this.x+this.y*this.y);
    if(a<Number.MIN_VALUE)return 0;
    var b=1/a;
    this.x*=b;
    this.y*=b;
    return a
    };

    b2.Vec2.prototype.IsValid=function(){
    return b2.Math.IsValid(this.x)&&b2.Math.IsValid(this.y)
    };
    b2.Vec2.prototype.x=0;
    b2.Vec2.prototype.y=0;
    b2.Vec3=function(a,b,c){
    if(arguments.length==3)this.x=a,this.y=b,this.z=c
    };
    b2.Vec3.prototype.SetZero=function(){
    this.x=this.y=this.z=0
    };
    b2.Vec3.prototype.Set=function(a,b,c){
    this.x=a;
    this.y=b;
    this.z=c
    };
    b2.Vec3.prototype.SetV=function(a){
    this.x=a.x;
    this.y=a.y;
    this.z=a.z
    };
    b2.Vec3.prototype.GetNegative=function(){
    return new b2.Vec3(-this.x,-this.y,-this.z)
    };

    b2.Vec3.prototype.NegativeSelf=function(){
    this.x=-this.x;
    this.y=-this.y;
    this.z=-this.z
    };
    b2.Vec3.prototype.Copy=function(){
    return new b2.Vec3(this.x,this.y,this.z)
    };
    b2.Vec3.prototype.Add=function(a){
    this.x+=a.x;
    this.y+=a.y;
    this.z+=a.z
    };
    b2.Vec3.prototype.Subtract=function(a){
    this.x-=a.x;
    this.y-=a.y;
    this.z-=a.z
    };
    b2.Vec3.prototype.Multiply=function(a){
    this.x*=a;
    this.y*=a;
    this.z*=a
    };
    b2.Vec3.prototype.x=0;
    b2.Vec3.prototype.y=0;
    b2.Vec3.prototype.z=0;

    b2.Body=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Body.prototype.__constructor=function(a,b){
    this.m_flags=0;
    a.bullet&&(this.m_flags|=b2.Body.e_bulletFlag);
    a.fixedRotation&&(this.m_flags|=b2.Body.e_fixedRotationFlag);
    a.allowSleep&&(this.m_flags|=b2.Body.e_allowSleepFlag);
    a.awake&&(this.m_flags|=b2.Body.e_awakeFlag);
    a.active&&(this.m_flags|=b2.Body.e_activeFlag);
    this.m_world=b;
    this.m_xf.position.SetV(a.position);
    this.m_xf.R.Set(a.angle);
    this.m_sweep.localCenter.SetZero();
    this.m_sweep.t0=1;
    this.m_sweep.a0=this.m_sweep.a=a.angle;
    var c=this.m_xf.R,
    d=this.m_sweep.localCenter;
    this.m_sweep.c.x=c.col1.x*d.x+c.col2.x*d.y;
    this.m_sweep.c.y=c.col1.y*d.x+c.col2.y*d.y;
    this.m_sweep.c.x+=this.m_xf.position.x;
    this.m_sweep.c.y+=this.m_xf.position.y;
    this.m_sweep.c0.SetV(this.m_sweep.c);
    this.m_contactList=this.m_controllerList=this.m_jointList=null;
    this.m_controllerCount=0;
    this.m_next=this.m_prev=null;
    this.m_linearVelocity.SetV(a.linearVelocity);
    this.m_angularVelocity=a.angularVelocity;
    this.m_linearDamping=a.linearDamping;
    this.m_angularDamping=a.angularDamping;

    this.m_force.Set(0,0);
    this.m_sleepTime=this.m_torque=0;
    this.m_type=a.type;
    this.m_invMass=this.m_type==b2.Body.b2_dynamicBody?this.m_mass=1:this.m_mass=0;
    this.m_invI=this.m_I=0;
    this.m_inertiaScale=a.inertiaScale;
    this.m_userData=a.userData;
    this.m_fixtureList=null;
    this.m_fixtureCount=0
    };
    b2.Body.prototype.__varz=function(){
    this.m_xf=new b2.Transform;
    this.m_sweep=new b2.Sweep;
    this.m_linearVelocity=new b2.Vec2;
    this.m_force=new b2.Vec2
    };
    b2.Body.b2_staticBody=0;
    b2.Body.b2_kinematicBody=1;

    b2.Body.b2_dynamicBody=2;
    b2.Body.s_xf1=new b2.Transform;
    b2.Body.e_islandFlag=1;
    b2.Body.e_awakeFlag=2;
    b2.Body.e_allowSleepFlag=4;
    b2.Body.e_bulletFlag=8;
    b2.Body.e_fixedRotationFlag=16;
    b2.Body.e_activeFlag=32;

    b2.Body.prototype.connectEdges=function(a,b,c){
    var d=Math.atan2(b.GetDirectionVector().y,b.GetDirectionVector().x),c=b2.Math.MulFV(Math.tan((d-c)*0.5),b.GetDirectionVector()),c=b2.Math.SubtractVV(c,b.GetNormalVector()),c=b2.Math.MulFV(b2.Settings.b2_toiSlop,c),c=b2.Math.AddVV(c,b.GetVertex1()),e=b2.Math.AddVV(a.GetDirectionVector(),b.GetDirectionVector());
    e.Normalize();
    var h=b2.Math.Dot(a.GetDirectionVector(),b.GetNormalVector())>0;
    a.SetNextEdge(b,c,e,h);
    b.SetPrevEdge(a,c,e,h);
    return d
    };

    b2.Body.prototype.SynchronizeFixtures=function(){
    var a=b2.Body.s_xf1;
    a.R.Set(this.m_sweep.a0);
    var b=a.R,c=this.m_sweep.localCenter;
    a.position.x=this.m_sweep.c0.x-(b.col1.x*c.x+b.col2.x*c.y);
    a.position.y=this.m_sweep.c0.y-(b.col1.y*c.x+b.col2.y*c.y);
    c=this.m_world.m_contactManager.m_broadPhase;
    for(b=this.m_fixtureList;
        b;
        b=b.m_next)b.Synchronize(c,a,this.m_xf)
    };

    b2.Body.prototype.SynchronizeTransform=function(){
    this.m_xf.R.Set(this.m_sweep.a);
    var a=this.m_xf.R,b=this.m_sweep.localCenter;
    this.m_xf.position.x=this.m_sweep.c.x-(a.col1.x*b.x+a.col2.x*b.y);
    this.m_xf.position.y=this.m_sweep.c.y-(a.col1.y*b.x+a.col2.y*b.y)
    };
    b2.Body.prototype.ShouldCollide=function(a){
    if(this.m_type!=b2.Body.b2_dynamicBody&&a.m_type!=b2.Body.b2_dynamicBody)return!1;
    for(var b=this.m_jointList;
        b;
        b=b.next)if(b.other==a&&b.joint.m_collideConnected==!1)return!1;
    return!0
    };

    b2.Body.prototype.Advance=function(a){
    this.m_sweep.Advance(a);
    this.m_sweep.c.SetV(this.m_sweep.c0);
    this.m_sweep.a=this.m_sweep.a0;
    this.SynchronizeTransform()
    };

    b2.Body.prototype.CreateFixture=function(a){
    if(this.m_world.IsLocked()==!0)return null;
    var b=new b2.Fixture;
    b.Create(this,this.m_xf,a);
    this.m_flags&b2.Body.e_activeFlag&&b.CreateProxy(this.m_world.m_contactManager.m_broadPhase,this.m_xf);
    b.m_next=this.m_fixtureList;
    this.m_fixtureList=b;
    ++this.m_fixtureCount;
    b.m_body=this;
    b.m_density>0&&this.ResetMassData();
    this.m_world.m_flags|=b2.World.e_newFixture;
    return b
    };

    b2.Body.prototype.CreateFixture2=function(a,b){
    var c=new b2.FixtureDef;
    c.shape=a;
    c.density=b;
    return this.CreateFixture(c)
    };

    b2.Body.prototype.DestroyFixture=function(a){
    if(this.m_world.IsLocked()!=!0){
        for(var b=this.m_fixtureList,c=null;
        b!=null;
           ){
        if(b==a){
            c?c.m_next=a.m_next:this.m_fixtureList=a.m_next;
            break}c=b;
        b=b.m_next}for(b=this.m_contactList;
                   b;
                  ){
            var c=b.contact,b=b.next,d=c.GetFixtureA(),e=c.GetFixtureB();
            (a==d||a==e)&&this.m_world.m_contactManager.Destroy(c)}this.m_flags&b2.Body.e_activeFlag&&a.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
        a.Destroy();
        a.m_body=null;
        a.m_next=null;
        --this.m_fixtureCount;

        this.ResetMassData()}
    };

    b2.Body.prototype.SetPositionAndAngle=function(a,b){
    var c;
    if(this.m_world.IsLocked()!=!0){
        this.m_xf.R.Set(b);
        this.m_xf.position.SetV(a);
        c=this.m_xf.R;
        var d=this.m_sweep.localCenter;
        this.m_sweep.c.x=c.col1.x*d.x+c.col2.x*d.y;
        this.m_sweep.c.y=c.col1.y*d.x+c.col2.y*d.y;
        this.m_sweep.c.x+=this.m_xf.position.x;
        this.m_sweep.c.y+=this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_sweep.a0=this.m_sweep.a=b;
        d=this.m_world.m_contactManager.m_broadPhase;
        for(c=this.m_fixtureList;
        c;
        c=c.m_next)c.Synchronize(d,
                     this.m_xf,this.m_xf);
        this.m_world.m_contactManager.FindNewContacts()}
    };
    b2.Body.prototype.SetTransform=function(a){
    this.SetPositionAndAngle(a.position,a.GetAngle())
    };
    b2.Body.prototype.GetTransform=function(){
    return this.m_xf
    };
    b2.Body.prototype.GetPosition=function(){
    return this.m_xf.position
    };
    b2.Body.prototype.SetPosition=function(a){
    this.SetPositionAndAngle(a,this.GetAngle())
    };
    b2.Body.prototype.GetAngle=function(){
    return this.m_sweep.a
    };

    b2.Body.prototype.SetAngle=function(a){
    this.SetPositionAndAngle(this.GetPosition(),a)
    };
    b2.Body.prototype.GetWorldCenter=function(){
    return this.m_sweep.c
    };
    b2.Body.prototype.GetLocalCenter=function(){
    return this.m_sweep.localCenter
    };
    b2.Body.prototype.SetLinearVelocity=function(a){
    this.m_type!=b2.Body.b2_staticBody&&this.m_linearVelocity.SetV(a)
    };
    b2.Body.prototype.GetLinearVelocity=function(){
    return this.m_linearVelocity
    };

    b2.Body.prototype.SetAngularVelocity=function(a){
    if(this.m_type!=b2.Body.b2_staticBody)this.m_angularVelocity=a
    };
    b2.Body.prototype.GetAngularVelocity=function(){
    return this.m_angularVelocity
    };

    b2.Body.prototype.GetDefinition=function(){
    var a=new b2.BodyDef;
    a.type=this.GetType();
    a.allowSleep=(this.m_flags&b2.Body.e_allowSleepFlag)==b2.Body.e_allowSleepFlag;
    a.angle=this.GetAngle();
    a.angularDamping=this.m_angularDamping;
    a.angularVelocity=this.m_angularVelocity;
    a.fixedRotation=(this.m_flags&b2.Body.e_fixedRotationFlag)==b2.Body.e_fixedRotationFlag;
    a.bullet=(this.m_flags&b2.Body.e_bulletFlag)==b2.Body.e_bulletFlag;
    a.awake=(this.m_flags&b2.Body.e_awakeFlag)==b2.Body.e_awakeFlag;
    a.linearDamping=
        this.m_linearDamping;
    a.linearVelocity.SetV(this.GetLinearVelocity());
    a.position=this.GetPosition();
    a.userData=this.GetUserData();
    return a
    };
    b2.Body.prototype.ApplyForce=function(a,b){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_force.x+=a.x,this.m_force.y+=a.y,this.m_torque+=(b.x-this.m_sweep.c.x)*a.y-(b.y-this.m_sweep.c.y)*a.x)
    };

    b2.Body.prototype.ApplyTorque=function(a){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_torque+=a)
    };
    b2.Body.prototype.ApplyImpulse=function(a,b){
    this.m_type==b2.Body.b2_dynamicBody&&(this.IsAwake()==!1&&this.SetAwake(!0),this.m_linearVelocity.x+=this.m_invMass*a.x,this.m_linearVelocity.y+=this.m_invMass*a.y,this.m_angularVelocity+=this.m_invI*((b.x-this.m_sweep.c.x)*a.y-(b.y-this.m_sweep.c.y)*a.x))
    };

    b2.Body.prototype.Split=function(a){
    for(var b=this.GetLinearVelocity().Copy(),c=this.GetAngularVelocity(),d=this.GetWorldCenter(),e=this.m_world.CreateBody(this.GetDefinition()),h,g=this.m_fixtureList;
        g;
       )if(a(g)){
           var f=g.m_next;
           h?h.m_next=f:this.m_fixtureList=f;
           this.m_fixtureCount--;
           g.m_next=e.m_fixtureList;
           e.m_fixtureList=g;
           e.m_fixtureCount++;
           g.m_body=e;
           g=f}else h=g,g=g.m_next;
    this.ResetMassData();
    e.ResetMassData();
    h=this.GetWorldCenter();
    a=e.GetWorldCenter();
    h=b2.Math.AddVV(b,b2.Math.CrossFV(c,
                      b2.Math.SubtractVV(h,d)));
    b=b2.Math.AddVV(b,b2.Math.CrossFV(c,b2.Math.SubtractVV(a,d)));
    this.SetLinearVelocity(h);
    e.SetLinearVelocity(b);
    this.SetAngularVelocity(c);
    e.SetAngularVelocity(c);
    this.SynchronizeFixtures();
    e.SynchronizeFixtures();
    return e
    };

    b2.Body.prototype.Merge=function(a){
    var b;
    for(b=a.m_fixtureList;
        b;
       ){
        var c=b.m_next;
        a.m_fixtureCount--;
        b.m_next=this.m_fixtureList;
        this.m_fixtureList=b;
        this.m_fixtureCount++;
        b.m_body=e;
        b=c}d.m_fixtureCount=0;
    var d=this,e=a;
    d.GetWorldCenter();
    e.GetWorldCenter();
    d.GetLinearVelocity().Copy();
    e.GetLinearVelocity().Copy();
    d.GetAngularVelocity();
    e.GetAngularVelocity();
    d.ResetMassData();
    this.SynchronizeFixtures()
    };
    b2.Body.prototype.GetMass=function(){
    return this.m_mass
    };
    b2.Body.prototype.GetInertia=function(){
    return this.m_I
    };

    b2.Body.prototype.GetMassData=function(a){
    a.mass=this.m_mass;
    a.I=this.m_I;
    a.center.SetV(this.m_sweep.localCenter)
    };

    b2.Body.prototype.SetMassData=function(a){
    b2.Settings.b2Assert(this.m_world.IsLocked()==!1);
    if(this.m_world.IsLocked()!=!0&&this.m_type==b2.Body.b2_dynamicBody){
        this.m_invI=this.m_I=this.m_invMass=0;
        this.m_mass=a.mass;
        if(this.m_mass<=0)this.m_mass=1;
        this.m_invMass=1/this.m_mass;
        if(a.I>0&&(this.m_flags&b2.Body.e_fixedRotationFlag)==0)this.m_I=a.I-this.m_mass*(a.center.x*a.center.x+a.center.y*a.center.y),this.m_invI=1/this.m_I;
        var b=this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(a.center);
        this.m_sweep.c0.SetV(b2.Math.MulX(this.m_xf,
                          this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x+=this.m_angularVelocity*-(this.m_sweep.c.y-b.y);
        this.m_linearVelocity.y+=this.m_angularVelocity*+(this.m_sweep.c.x-b.x)}
    };

    b2.Body.prototype.ResetMassData=function(){
    this.m_invI=this.m_I=this.m_invMass=this.m_mass=0;
    this.m_sweep.localCenter.SetZero();
    if(!(this.m_type==b2.Body.b2_staticBody||this.m_type==b2.Body.b2_kinematicBody)){
        for(var a=b2.Vec2.Make(0,0),b=this.m_fixtureList;
        b;
        b=b.m_next)if(b.m_density!=0){
            var c=b.GetMassData();
            this.m_mass+=c.mass;
            a.x+=c.center.x*c.mass;
            a.y+=c.center.y*c.mass;
            this.m_I+=c.I}this.m_mass>0?(this.m_invMass=1/this.m_mass,a.x*=this.m_invMass,a.y*=this.m_invMass):this.m_invMass=this.m_mass=
        1;
        this.m_I>0&&(this.m_flags&b2.Body.e_fixedRotationFlag)==0?(this.m_I-=this.m_mass*(a.x*a.x+a.y*a.y),this.m_I*=this.m_inertiaScale,b2.Settings.b2Assert(this.m_I>0),this.m_invI=1/this.m_I):this.m_invI=this.m_I=0;
        b=this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(a);
        this.m_sweep.c0.SetV(b2.Math.MulX(this.m_xf,this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x+=this.m_angularVelocity*-(this.m_sweep.c.y-b.y);
        this.m_linearVelocity.y+=this.m_angularVelocity*+(this.m_sweep.c.x-
                                  b.x)}
    };
    b2.Body.prototype.GetWorldPoint=function(a){
    var b=this.m_xf.R,a=new b2.Vec2(b.col1.x*a.x+b.col2.x*a.y,b.col1.y*a.x+b.col2.y*a.y);
    a.x+=this.m_xf.position.x;
    a.y+=this.m_xf.position.y;
    return a
    };
    b2.Body.prototype.GetWorldVector=function(a){
    return b2.Math.MulMV(this.m_xf.R,a)
    };
    b2.Body.prototype.GetLocalPoint=function(a){
    return b2.Math.MulXT(this.m_xf,a)
    };
    b2.Body.prototype.GetLocalVector=function(a){
    return b2.Math.MulTMV(this.m_xf.R,a)
    };

    b2.Body.prototype.GetLinearVelocityFromWorldPoint=function(a){
    return new b2.Vec2(this.m_linearVelocity.x-this.m_angularVelocity*(a.y-this.m_sweep.c.y),this.m_linearVelocity.y+this.m_angularVelocity*(a.x-this.m_sweep.c.x))
    };

    b2.Body.prototype.GetLinearVelocityFromLocalPoint=function(a){
    var b=this.m_xf.R,a=new b2.Vec2(b.col1.x*a.x+b.col2.x*a.y,b.col1.y*a.x+b.col2.y*a.y);
    a.x+=this.m_xf.position.x;
    a.y+=this.m_xf.position.y;
    return new b2.Vec2(this.m_linearVelocity.x-this.m_angularVelocity*(a.y-this.m_sweep.c.y),this.m_linearVelocity.y+this.m_angularVelocity*(a.x-this.m_sweep.c.x))
    };
    b2.Body.prototype.GetLinearDamping=function(){
    return this.m_linearDamping
    };

    b2.Body.prototype.SetLinearDamping=function(a){
    this.m_linearDamping=a
    };
    b2.Body.prototype.GetAngularDamping=function(){
    return this.m_angularDamping
    };
    b2.Body.prototype.SetAngularDamping=function(a){
    this.m_angularDamping=a
    };
    b2.Body.prototype.SetType=function(a){
    if(this.m_type!=a){
        this.m_type=a;
        this.ResetMassData();
        if(this.m_type==b2.Body.b2_staticBody)this.m_linearVelocity.SetZero(),this.m_angularVelocity=0;
        this.SetAwake(!0);
        this.m_force.SetZero();
        this.m_torque=0;
        for(a=this.m_contactList;
        a;
        a=a.next)a.contact.FlagForFiltering()}
    };

    b2.Body.prototype.GetType=function(){
    return this.m_type
    };
    b2.Body.prototype.SetBullet=function(a){
    a?this.m_flags|=b2.Body.e_bulletFlag:this.m_flags&=~b2.Body.e_bulletFlag
    };
    b2.Body.prototype.IsBullet=function(){
    return(this.m_flags&b2.Body.e_bulletFlag)==b2.Body.e_bulletFlag
    };
    b2.Body.prototype.SetSleepingAllowed=function(a){
    a?this.m_flags|=b2.Body.e_allowSleepFlag:(this.m_flags&=~b2.Body.e_allowSleepFlag,this.SetAwake(!0))
    };

    b2.Body.prototype.SetAwake=function(a){
    a?(this.m_flags|=b2.Body.e_awakeFlag,this.m_sleepTime=0):(this.m_flags&=~b2.Body.e_awakeFlag,this.m_sleepTime=0,this.m_linearVelocity.SetZero(),this.m_angularVelocity=0,this.m_force.SetZero(),this.m_torque=0)
    };
    b2.Body.prototype.IsAwake=function(){
    return(this.m_flags&b2.Body.e_awakeFlag)==b2.Body.e_awakeFlag
    };
    b2.Body.prototype.SetFixedRotation=function(a){
    a?this.m_flags|=b2.Body.e_fixedRotationFlag:this.m_flags&=~b2.Body.e_fixedRotationFlag;
    this.ResetMassData()
    };

    b2.Body.prototype.IsFixedRotation=function(){
    return(this.m_flags&b2.Body.e_fixedRotationFlag)==b2.Body.e_fixedRotationFlag
    };

    b2.Body.prototype.SetActive=function(a){
    if(a!=this.IsActive()){
        var b;
        if(a){
        this.m_flags|=b2.Body.e_activeFlag;
        a=this.m_world.m_contactManager.m_broadPhase;
        for(b=this.m_fixtureList;
            b;
            b=b.m_next)b.CreateProxy(a,this.m_xf)}else{
            this.m_flags&=~b2.Body.e_activeFlag;
            a=this.m_world.m_contactManager.m_broadPhase;
            for(b=this.m_fixtureList;
                b;
                b=b.m_next)b.DestroyProxy(a);
            for(a=this.m_contactList;
                a;
               )b=a,a=a.next,this.m_world.m_contactManager.Destroy(b.contact);
            this.m_contactList=null}}
    };

    b2.Body.prototype.IsActive=function(){
    return(this.m_flags&b2.Body.e_activeFlag)==b2.Body.e_activeFlag
    };
    b2.Body.prototype.IsSleepingAllowed=function(){
    return(this.m_flags&b2.Body.e_allowSleepFlag)==b2.Body.e_allowSleepFlag
    };
    b2.Body.prototype.GetFixtureList=function(){
    return this.m_fixtureList
    };
    b2.Body.prototype.GetJointList=function(){
    return this.m_jointList
    };
    b2.Body.prototype.GetControllerList=function(){
    return this.m_controllerList
    };
    b2.Body.prototype.GetContactList=function(){
    return this.m_contactList
    };

    b2.Body.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Body.prototype.GetUserData=function(){
    return this.m_userData
    };
    b2.Body.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Body.prototype.GetWorld=function(){
    return this.m_world
    };
    b2.Body.prototype.m_flags=0;
    b2.Body.prototype.m_type=0;
    b2.Body.prototype.m_islandIndex=0;
    b2.Body.prototype.m_xf=new b2.Transform;
    b2.Body.prototype.m_sweep=new b2.Sweep;
    b2.Body.prototype.m_linearVelocity=new b2.Vec2;
    b2.Body.prototype.m_angularVelocity=null;

    b2.Body.prototype.m_force=new b2.Vec2;
    b2.Body.prototype.m_torque=null;
    b2.Body.prototype.m_world=null;
    b2.Body.prototype.m_prev=null;
    b2.Body.prototype.m_next=null;
    b2.Body.prototype.m_fixtureList=null;
    b2.Body.prototype.m_fixtureCount=0;
    b2.Body.prototype.m_controllerList=null;
    b2.Body.prototype.m_controllerCount=0;
    b2.Body.prototype.m_jointList=null;
    b2.Body.prototype.m_contactList=null;
    b2.Body.prototype.m_mass=null;
    b2.Body.prototype.m_invMass=null;
    b2.Body.prototype.m_I=null;
    b2.Body.prototype.m_invI=null;

    b2.Body.prototype.m_inertiaScale=null;
    b2.Body.prototype.m_linearDamping=null;
    b2.Body.prototype.m_angularDamping=null;
    b2.Body.prototype.m_sleepTime=null;
    b2.Body.prototype.m_userData=null;
    b2.BodyDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.BodyDef.prototype.__constructor=function(){
    this.userData=null;
    this.position.Set(0,0);
    this.angle=0;
    this.linearVelocity.Set(0,0);
    this.angularDamping=this.linearDamping=this.angularVelocity=0;
    this.awake=this.allowSleep=!0;
    this.bullet=this.fixedRotation=!1;
    this.type=b2.Body.b2_staticBody;
    this.active=!0;
    this.inertiaScale=1
    };
    b2.BodyDef.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.linearVelocity=new b2.Vec2
    };
    b2.BodyDef.prototype.type=0;
    b2.BodyDef.prototype.position=new b2.Vec2;

    b2.BodyDef.prototype.angle=null;
    b2.BodyDef.prototype.linearVelocity=new b2.Vec2;
    b2.BodyDef.prototype.angularVelocity=null;
    b2.BodyDef.prototype.linearDamping=null;
    b2.BodyDef.prototype.angularDamping=null;
    b2.BodyDef.prototype.allowSleep=null;
    b2.BodyDef.prototype.awake=null;
    b2.BodyDef.prototype.fixedRotation=null;
    b2.BodyDef.prototype.bullet=null;
    b2.BodyDef.prototype.active=null;
    b2.BodyDef.prototype.userData=null;
    b2.BodyDef.prototype.inertiaScale=null;

    b2.ContactFilter=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactFilter.prototype.__constructor=function(){

    };
    b2.ContactFilter.prototype.__varz=function(){

    };
    b2.ContactFilter.b2_defaultFilter=new b2.ContactFilter;
    b2.ContactFilter.prototype.ShouldCollide=function(a,b){
    var c=a.GetFilterData(),d=b.GetFilterData();
    if(c.groupIndex==d.groupIndex&&c.groupIndex!=0)return c.groupIndex>0;
    return(c.maskBits&d.categoryBits)!=0&&(c.categoryBits&d.maskBits)!=0
    };

    b2.ContactFilter.prototype.RayCollide=function(a,b){
    if(!a)return!0;
    return this.ShouldCollide(a,b)
    };
    b2.ContactImpulse=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactImpulse.prototype.__constructor=function(){

    };
    b2.ContactImpulse.prototype.__varz=function(){
    this.normalImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    this.tangentImpulses=Array(b2.Settings.b2_maxManifoldPoints)
    };
    b2.ContactImpulse.prototype.normalImpulses=Array(b2.Settings.b2_maxManifoldPoints);

    b2.ContactImpulse.prototype.tangentImpulses=Array(b2.Settings.b2_maxManifoldPoints);
    b2.ContactListener=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactListener.prototype.__constructor=function(){

    };
    b2.ContactListener.prototype.__varz=function(){

    };
    b2.ContactListener.b2_defaultListener=new b2.ContactListener;
    b2.ContactListener.prototype.BeginContact=function(){

    };
    b2.ContactListener.prototype.EndContact=function(){

    };
    b2.ContactListener.prototype.PreSolve=function(){

    };

    b2.ContactListener.prototype.PostSolve=function(){

    };
    b2.ContactManager=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactManager.prototype.__constructor=function(){
    this.m_world=null;
    this.m_contactCount=0;
    this.m_contactFilter=b2.ContactFilter.b2_defaultFilter;
    this.m_contactListener=b2.ContactListener.b2_defaultListener;
    this.m_contactFactory=new b2.ContactFactory(this.m_allocator);
    this.m_broadPhase=new b2.DynamicTreeBroadPhase
    };
    b2.ContactManager.prototype.__varz=function(){

    };

    b2.ContactManager.s_evalCP=new b2.ContactPoint;

    b2.ContactManager.prototype.AddPair=function(a,b){
    var c=a,d=b,e=c.GetBody(),h=d.GetBody();
    if(e!=h){
        for(var g=h.GetContactList();
        g;
           ){
        if(g.other==e){
            var f=g.contact.GetFixtureA(),i=g.contact.GetFixtureB();
            if(f==c&&i==d)return;
            if(f==d&&i==c)return}g=g.next}if(h.ShouldCollide(e)!=!1&&this.m_contactFilter.ShouldCollide(c,d)!=!1){
            g=this.m_contactFactory.Create(c,d);
            c=g.GetFixtureA();
            d=g.GetFixtureB();
            e=c.m_body;
            h=d.m_body;
            g.m_prev=null;
            g.m_next=this.m_world.m_contactList;
            if(this.m_world.m_contactList!=
               null)this.m_world.m_contactList.m_prev=g;
            this.m_world.m_contactList=g;
            g.m_nodeA.contact=g;
            g.m_nodeA.other=h;
            g.m_nodeA.prev=null;
            g.m_nodeA.next=e.m_contactList;
            if(e.m_contactList!=null)e.m_contactList.prev=g.m_nodeA;
            e.m_contactList=g.m_nodeA;
            g.m_nodeB.contact=g;
            g.m_nodeB.other=e;
            g.m_nodeB.prev=null;
            g.m_nodeB.next=h.m_contactList;
            if(h.m_contactList!=null)h.m_contactList.prev=g.m_nodeB;
            h.m_contactList=g.m_nodeB;
            ++this.m_world.m_contactCount}}
    };

    b2.ContactManager.prototype.FindNewContacts=function(){
    var a=this;
    this.m_broadPhase.UpdatePairs(function(b,c){
        return a.AddPair(b,c)})
    };

    b2.ContactManager.prototype.Destroy=function(a){
    var b=a.GetFixtureA(),c=a.GetFixtureB(),b=b.GetBody(),c=c.GetBody();
    a.IsTouching()&&this.m_contactListener.EndContact(a);
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a==this.m_world.m_contactList)this.m_world.m_contactList=a.m_next;
    if(a.m_nodeA.prev)a.m_nodeA.prev.next=a.m_nodeA.next;
    if(a.m_nodeA.next)a.m_nodeA.next.prev=a.m_nodeA.prev;
    if(a.m_nodeA==b.m_contactList)b.m_contactList=a.m_nodeA.next;
    if(a.m_nodeB.prev)a.m_nodeB.prev.next=
        a.m_nodeB.next;
    if(a.m_nodeB.next)a.m_nodeB.next.prev=a.m_nodeB.prev;
    if(a.m_nodeB==c.m_contactList)c.m_contactList=a.m_nodeB.next;
    this.m_contactFactory.Destroy(a);
    --this.m_contactCount
    };

    b2.ContactManager.prototype.Collide=function(){
    for(var a=this.m_world.m_contactList;
        a;
       ){
        var b=a.GetFixtureA(),c=a.GetFixtureB(),d=b.GetBody(),e=c.GetBody();
        if(d.IsAwake()==!1&&e.IsAwake()==!1)a=a.GetNext();
        else{
        if(a.m_flags&b2.Contact.e_filterFlag){
            if(e.ShouldCollide(d)==!1){
            b=a;
            a=b.GetNext();
            this.Destroy(b);
            continue}if(this.m_contactFilter.ShouldCollide(b,c)==!1){
                b=a;
                a=b.GetNext();
                this.Destroy(b);
                continue}a.m_flags&=~b2.Contact.e_filterFlag}this.m_broadPhase.TestOverlap(b.m_proxy,c.m_proxy)==!1?
            (b=a,a=b.GetNext(),this.Destroy(b)):(a.Update(this.m_contactListener),a=a.GetNext())}}
    };
    b2.ContactManager.prototype.m_world=null;
    b2.ContactManager.prototype.m_broadPhase=null;
    b2.ContactManager.prototype.m_contactList=null;
    b2.ContactManager.prototype.m_contactCount=0;
    b2.ContactManager.prototype.m_contactFilter=null;
    b2.ContactManager.prototype.m_contactListener=null;
    b2.ContactManager.prototype.m_contactFactory=null;
    b2.ContactManager.prototype.m_allocator=null;

    b2.DebugDraw=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DebugDraw.prototype.__constructor=function(){
    this.m_drawFlags=0
    };
    b2.DebugDraw.prototype.__varz=function(){

    };
    b2.DebugDraw.e_shapeBit=1;
    b2.DebugDraw.e_jointBit=2;
    b2.DebugDraw.e_aabbBit=4;
    b2.DebugDraw.e_pairBit=8;
    b2.DebugDraw.e_centerOfMassBit=16;
    b2.DebugDraw.e_controllerBit=32;
    b2.DebugDraw.prototype.SetFlags=function(a){
    this.m_drawFlags=a
    };
    b2.DebugDraw.prototype.GetFlags=function(){
    return this.m_drawFlags
    };

    b2.DebugDraw.prototype.AppendFlags=function(a){
    this.m_drawFlags|=a
    };
    b2.DebugDraw.prototype.ClearFlags=function(a){
    this.m_drawFlags&=~a
    };
    b2.DebugDraw.prototype.SetSprite=function(a){
    this.m_sprite=a
    };
    b2.DebugDraw.prototype.GetSprite=function(){
    return this.m_sprite
    };
    b2.DebugDraw.prototype.SetDrawScale=function(a){
    this.m_drawScale=a
    };
    b2.DebugDraw.prototype.GetDrawScale=function(){
    return this.m_drawScale
    };
    b2.DebugDraw.prototype.SetLineThickness=function(a){
    this.m_lineThickness=a
    };

    b2.DebugDraw.prototype.GetLineThickness=function(){
    return this.m_lineThickness
    };
    b2.DebugDraw.prototype.SetAlpha=function(a){
    this.m_alpha=a
    };
    b2.DebugDraw.prototype.GetAlpha=function(){
    return this.m_alpha
    };
    b2.DebugDraw.prototype.SetFillAlpha=function(a){
    this.m_fillAlpha=a
    };
    b2.DebugDraw.prototype.GetFillAlpha=function(){
    return this.m_fillAlpha
    };
    b2.DebugDraw.prototype.SetXFormScale=function(a){
    this.m_xformScale=a
    };
    b2.DebugDraw.prototype.GetXFormScale=function(){
    return this.m_xformScale
    };

    b2.DebugDraw.prototype.Clear=function(){
    this.m_sprite.clearRect(0,0,this.m_sprite.canvas.width,this.m_sprite.canvas.height)
    };
    b2.DebugDraw.prototype.Y=function(a){
    return this.m_sprite.canvas.height-a
    };
    b2.DebugDraw.prototype.ToWorldPoint=function(a){
    return new b2.Vec2(a.x/this.m_drawScale,this.Y(a.y)/this.m_drawScale)
    };
    b2.DebugDraw.prototype.ColorStyle=function(a,b){
    return"rgba("+a.r+", "+a.g+", "+a.b+", "+b+")"
    };

    b2.DebugDraw.prototype.DrawPolygon=function(a,b,c){
    this.m_sprite.graphics.lineStyle(this.m_lineThickness,c.color,this.m_alpha);
    this.m_sprite.graphics.moveTo(a[0].x*this.m_drawScale,a[0].y*this.m_drawScale);
    for(c=1;
        c<b;
        c++)this.m_sprite.graphics.lineTo(a[c].x*this.m_drawScale,a[c].y*this.m_drawScale);
    this.m_sprite.graphics.lineTo(a[0].x*this.m_drawScale,a[0].y*this.m_drawScale)
    };

    b2.DebugDraw.prototype.DrawSolidPolygon=function(a,b,c){
    this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.fillStyle=this.ColorStyle(c,this.m_fillAlpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a[0].x*this.m_drawScale,this.Y(a[0].y*this.m_drawScale));
    for(c=1;
        c<b;
        c++)this.m_sprite.lineTo(a[c].x*this.m_drawScale,this.Y(a[c].y*this.m_drawScale));
    this.m_sprite.lineTo(a[0].x*this.m_drawScale,this.Y(a[0].y*this.m_drawScale));
    this.m_sprite.fill();

    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };
    b2.DebugDraw.prototype.DrawCircle=function(a,b,c){
    this.m_sprite.graphics.lineStyle(this.m_lineThickness,c.color,this.m_alpha);
    this.m_sprite.graphics.drawCircle(a.x*this.m_drawScale,a.y*this.m_drawScale,b*this.m_drawScale)
    };

    b2.DebugDraw.prototype.DrawSolidCircle=function(a,b,c,d){
    this.m_sprite.strokeSyle=this.ColorStyle(d,this.m_alpha);
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.fillStyle=this.ColorStyle(d,this.m_fillAlpha);
    this.m_sprite.beginPath();
    this.m_sprite.arc(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale),b*this.m_drawScale,0,Math.PI*2,!0);
    this.m_sprite.fill();
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };

    b2.DebugDraw.prototype.DrawSegment=function(a,b,c){
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale));
    this.m_sprite.lineTo(b.x*this.m_drawScale,this.Y(b.y*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };

    b2.DebugDraw.prototype.DrawTransform=function(a){
    this.m_sprite.lineWidth=this.m_lineThickness;
    this.m_sprite.strokeSyle=this.ColorStyle(new b2.Color(255,0,0),this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.position.x*this.m_drawScale,this.Y(a.position.y*this.m_drawScale));
    this.m_sprite.lineTo((a.position.x+this.m_xformScale*a.R.col1.x)*this.m_drawScale,this.Y((a.position.y+this.m_xformScale*a.R.col1.y)*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath();
    this.m_sprite.strokeSyle=
        this.ColorStyle(new b2.Color(0,255,0),this.m_alpha);
    this.m_sprite.beginPath();
    this.m_sprite.moveTo(a.position.x*this.m_drawScale,this.Y(a.position.y*this.m_drawScale));
    this.m_sprite.lineTo((a.position.x+this.m_xformScale*a.R.col2.x)*this.m_drawScale,this.Y((a.position.y+this.m_xformScale*a.R.col2.y)*this.m_drawScale));
    this.m_sprite.stroke();
    this.m_sprite.closePath()
    };
    b2.DebugDraw.prototype.m_drawFlags=0;
    b2.DebugDraw.prototype.m_sprite=null;
    b2.DebugDraw.prototype.m_drawScale=1;

    b2.DebugDraw.prototype.m_lineThickness=1;
    b2.DebugDraw.prototype.m_alpha=1;
    b2.DebugDraw.prototype.m_fillAlpha=1;
    b2.DebugDraw.prototype.m_xformScale=1;
    b2.DestructionListener=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.DestructionListener.prototype.__constructor=function(){

    };
    b2.DestructionListener.prototype.__varz=function(){

    };
    b2.DestructionListener.prototype.SayGoodbyeJoint=function(){

    };
    b2.DestructionListener.prototype.SayGoodbyeFixture=function(){

    };

    b2.FilterData=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.FilterData.prototype.__constructor=function(){

    };
    b2.FilterData.prototype.__varz=function(){
    this.categoryBits=1;
    this.maskBits=65535
    };
    b2.FilterData.prototype.Copy=function(){
    var a=new b2.FilterData;
    a.categoryBits=this.categoryBits;
    a.maskBits=this.maskBits;
    a.groupIndex=this.groupIndex;
    return a
    };
    b2.FilterData.prototype.categoryBits=1;
    b2.FilterData.prototype.maskBits=65535;
    b2.FilterData.prototype.groupIndex=0;

    b2.Fixture=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Fixture.prototype.__constructor=function(){
    this.m_aabb=new b2.AABB;
    this.m_shape=this.m_next=this.m_body=this.m_userData=null;
    this.m_restitution=this.m_friction=this.m_density=0
    };
    b2.Fixture.prototype.__varz=function(){
    this.m_filter=new b2.FilterData
    };

    b2.Fixture.prototype.Create=function(a,b,c){
    this.m_userData=c.userData;
    this.m_friction=c.friction;
    this.m_restitution=c.restitution;
    this.m_body=a;
    this.m_next=null;
    this.m_filter=c.filter.Copy();
    this.m_isSensor=c.isSensor;
    this.m_shape=c.shape.Copy();
    this.m_density=c.density
    };
    b2.Fixture.prototype.Destroy=function(){
    this.m_shape=null
    };
    b2.Fixture.prototype.CreateProxy=function(a,b){
    this.m_shape.ComputeAABB(this.m_aabb,b);
    this.m_proxy=a.CreateProxy(this.m_aabb,this)
    };

    b2.Fixture.prototype.DestroyProxy=function(a){
    if(this.m_proxy!=null)a.DestroyProxy(this.m_proxy),this.m_proxy=null
    };
    b2.Fixture.prototype.Synchronize=function(a,b,c){
    if(this.m_proxy){
        var d=new b2.AABB,e=new b2.AABB;
        this.m_shape.ComputeAABB(d,b);
        this.m_shape.ComputeAABB(e,c);
        this.m_aabb.Combine(d,e);
        b=b2.Math.SubtractVV(c.position,b.position);
        a.MoveProxy(this.m_proxy,this.m_aabb,b)}
    };
    b2.Fixture.prototype.GetType=function(){
    return this.m_shape.GetType()
    };
    b2.Fixture.prototype.GetShape=function(){
    return this.m_shape
    };

    b2.Fixture.prototype.SetSensor=function(a){
    if(this.m_isSensor!=a&&(this.m_isSensor=a,this.m_body!=null))for(a=this.m_body.GetContactList();
                                     a;
                                    ){
        var b=a.contact,c=b.GetFixtureA(),d=b.GetFixtureB();
        if(c==this||d==this)b.SetSensor(c.IsSensor()||d.IsSensor());
        a=a.next}
    };
    b2.Fixture.prototype.IsSensor=function(){
    return this.m_isSensor
    };

    b2.Fixture.prototype.SetFilterData=function(a){
    this.m_filter=a.Copy();
    if(!this.m_body)for(a=this.m_body.GetContactList();
                a;
               ){
        var b=a.contact,c=b.GetFixtureA(),d=b.GetFixtureB();
        (c==this||d==this)&&b.FlagForFiltering();
        a=a.next}
    };
    b2.Fixture.prototype.GetFilterData=function(){
    return this.m_filter.Copy()
    };
    b2.Fixture.prototype.GetBody=function(){
    return this.m_body
    };
    b2.Fixture.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Fixture.prototype.GetUserData=function(){
    return this.m_userData
    };

    b2.Fixture.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Fixture.prototype.TestPoint=function(a){
    return this.m_shape.TestPoint(this.m_body.GetTransform(),a)
    };
    b2.Fixture.prototype.RayCast=function(a,b){
    return this.m_shape.RayCast(a,b,this.m_body.GetTransform())
    };
    b2.Fixture.prototype.GetMassData=function(a){
    a==null&&(a=new b2.MassData);
    this.m_shape.ComputeMass(a,this.m_density);
    return a
    };
    b2.Fixture.prototype.SetDensity=function(a){
    this.m_density=a
    };
    b2.Fixture.prototype.GetDensity=function(){
    return this.m_density
    };

    b2.Fixture.prototype.GetFriction=function(){
    return this.m_friction
    };
    b2.Fixture.prototype.SetFriction=function(a){
    this.m_friction=a
    };
    b2.Fixture.prototype.GetRestitution=function(){
    return this.m_restitution
    };
    b2.Fixture.prototype.SetRestitution=function(a){
    this.m_restitution=a
    };
    b2.Fixture.prototype.GetAABB=function(){
    return this.m_aabb
    };
    b2.Fixture.prototype.m_massData=null;
    b2.Fixture.prototype.m_aabb=null;
    b2.Fixture.prototype.m_density=null;
    b2.Fixture.prototype.m_next=null;

    b2.Fixture.prototype.m_body=null;
    b2.Fixture.prototype.m_shape=null;
    b2.Fixture.prototype.m_friction=null;
    b2.Fixture.prototype.m_restitution=null;
    b2.Fixture.prototype.m_proxy=null;
    b2.Fixture.prototype.m_filter=new b2.FilterData;
    b2.Fixture.prototype.m_isSensor=null;
    b2.Fixture.prototype.m_userData=null;
    b2.FixtureDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.FixtureDef.prototype.__constructor=function(){
    this.userData=this.shape=null;
    this.friction=0.2;
    this.density=this.restitution=0;
    this.filter.categoryBits=1;
    this.filter.maskBits=65535;
    this.filter.groupIndex=0;
    this.isSensor=!1
    };
    b2.FixtureDef.prototype.__varz=function(){
    this.filter=new b2.FilterData
    };
    b2.FixtureDef.prototype.shape=null;
    b2.FixtureDef.prototype.userData=null;
    b2.FixtureDef.prototype.friction=null;
    b2.FixtureDef.prototype.restitution=null;
    b2.FixtureDef.prototype.density=null;

    b2.FixtureDef.prototype.isSensor=null;
    b2.FixtureDef.prototype.filter=new b2.FilterData;
    b2.Island=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Island.prototype.__constructor=function(){
    this.m_bodies=[];
    this.m_contacts=[];
    this.m_joints=[]
    };
    b2.Island.prototype.__varz=function(){

    };
    b2.Island.s_impulse=new b2.ContactImpulse;

    b2.Island.prototype.Initialize=function(a,b,c,d,e,h){
    var g=0;
    this.m_bodyCapacity=a;
    this.m_contactCapacity=b;
    this.m_jointCapacity=c;
    this.m_jointCount=this.m_contactCount=this.m_bodyCount=0;
    this.m_allocator=d;
    this.m_listener=e;
    this.m_contactSolver=h;
    for(g=this.m_bodies.length;
        g<a;
        g++)this.m_bodies[g]=null;
    for(g=this.m_contacts.length;
        g<b;
        g++)this.m_contacts[g]=null;
    for(g=this.m_joints.length;
        g<c;
        g++)this.m_joints[g]=null
    };

    b2.Island.prototype.Clear=function(){
    this.m_jointCount=this.m_contactCount=this.m_bodyCount=0
    };

    b2.Island.prototype.Solve=function(a,b,c){
    for(var d=0,e=0,h,d=0;
        d<this.m_bodyCount;
        ++d)e=this.m_bodies[d],e.GetType()==b2.Body.b2_dynamicBody&&(e.m_linearVelocity.x+=a.dt*(b.x+e.m_invMass*e.m_force.x),e.m_linearVelocity.y+=a.dt*(b.y+e.m_invMass*e.m_force.y),e.m_angularVelocity+=a.dt*e.m_invI*e.m_torque,e.m_linearVelocity.Multiply(b2.Math.Clamp(1-a.dt*e.m_linearDamping,0,1)),e.m_angularVelocity*=b2.Math.Clamp(1-a.dt*e.m_angularDamping,0,1));
    this.m_contactSolver.Initialize(a,this.m_contacts,this.m_contactCount,
                    this.m_allocator);
    b=this.m_contactSolver;
    b.InitVelocityConstraints(a);
    for(d=0;
        d<this.m_jointCount;
        ++d)h=this.m_joints[d],h.InitVelocityConstraints(a);
    for(d=0;
        d<a.velocityIterations;
        ++d){
        for(e=0;
        e<this.m_jointCount;
        ++e)h=this.m_joints[e],h.SolveVelocityConstraints(a);
        b.SolveVelocityConstraints()}for(d=0;
                         d<this.m_jointCount;
                         ++d)h=this.m_joints[d],h.FinalizeVelocityConstraints();
    b.FinalizeVelocityConstraints();
    for(d=0;
        d<this.m_bodyCount;
        ++d)if(e=this.m_bodies[d],e.GetType()!=b2.Body.b2_staticBody){
        var g=
            a.dt*e.m_linearVelocity.x,f=a.dt*e.m_linearVelocity.y;
        g*g+f*f>b2.Settings.b2_maxTranslationSquared&&(e.m_linearVelocity.Normalize(),e.m_linearVelocity.x*=b2.Settings.b2_maxTranslation*a.inv_dt,e.m_linearVelocity.y*=b2.Settings.b2_maxTranslation*a.inv_dt);
        g=a.dt*e.m_angularVelocity;
        if(g*g>b2.Settings.b2_maxRotationSquared)e.m_angularVelocity=e.m_angularVelocity<0?-b2.Settings.b2_maxRotation*a.inv_dt:b2.Settings.b2_maxRotation*a.inv_dt;
        e.m_sweep.c0.SetV(e.m_sweep.c);
        e.m_sweep.a0=e.m_sweep.a;
        e.m_sweep.c.x+=
        a.dt*e.m_linearVelocity.x;
        e.m_sweep.c.y+=a.dt*e.m_linearVelocity.y;
        e.m_sweep.a+=a.dt*e.m_angularVelocity;
        e.SynchronizeTransform()}for(d=0;
                         d<a.positionIterations;
                         ++d){
            g=b.SolvePositionConstraints(b2.Settings.b2_contactBaumgarte);
            f=!0;
            for(e=0;
            e<this.m_jointCount;
            ++e)h=this.m_joints[e],h=h.SolvePositionConstraints(b2.Settings.b2_contactBaumgarte),f=f&&h;
            if(g&&f)break}this.Report(b.m_constraints);
    if(c){
        c=Number.MAX_VALUE;
        b=b2.Settings.b2_linearSleepTolerance*b2.Settings.b2_linearSleepTolerance;
        g=b2.Settings.b2_angularSleepTolerance*
        b2.Settings.b2_angularSleepTolerance;
        for(d=0;
        d<this.m_bodyCount;
        ++d)if(e=this.m_bodies[d],e.GetType()!=b2.Body.b2_staticBody){
            if((e.m_flags&b2.Body.e_allowSleepFlag)==0)c=e.m_sleepTime=0;
            (e.m_flags&b2.Body.e_allowSleepFlag)==0||e.m_angularVelocity*e.m_angularVelocity>g||b2.Math.Dot(e.m_linearVelocity,e.m_linearVelocity)>b?c=e.m_sleepTime=0:(e.m_sleepTime+=a.dt,c=b2.Math.Min(c,e.m_sleepTime))}if(c>=b2.Settings.b2_timeToSleep)for(d=0;
                                                                                                                                     d<this.m_bodyCount;
                                                                                                                                     ++d)e=this.m_bodies[d],e.SetAwake(!1)}
    };

    b2.Island.prototype.SolveTOI=function(a){
    var b=0,c=0;
    this.m_contactSolver.Initialize(a,this.m_contacts,this.m_contactCount,this.m_allocator);
    for(var d=this.m_contactSolver,b=0;
        b<this.m_jointCount;
        ++b)this.m_joints[b].InitVelocityConstraints(a);
    for(b=0;
        b<a.velocityIterations;
        ++b){
        d.SolveVelocityConstraints();
        for(c=0;
        c<this.m_jointCount;
        ++c)this.m_joints[c].SolveVelocityConstraints(a)}for(b=0;
                                     b<this.m_bodyCount;
                                     ++b)if(c=this.m_bodies[b],c.GetType()!=b2.Body.b2_staticBody){
                                     var e=a.dt*c.m_linearVelocity.x,
                                     h=a.dt*c.m_linearVelocity.y;
                                     e*e+h*h>b2.Settings.b2_maxTranslationSquared&&(c.m_linearVelocity.Normalize(),c.m_linearVelocity.x*=b2.Settings.b2_maxTranslation*a.inv_dt,c.m_linearVelocity.y*=b2.Settings.b2_maxTranslation*a.inv_dt);
                                     e=a.dt*c.m_angularVelocity;
                                     if(e*e>b2.Settings.b2_maxRotationSquared)c.m_angularVelocity=c.m_angularVelocity<0?-b2.Settings.b2_maxRotation*a.inv_dt:b2.Settings.b2_maxRotation*a.inv_dt;
                                     c.m_sweep.c0.SetV(c.m_sweep.c);
                                     c.m_sweep.a0=c.m_sweep.a;
                                     c.m_sweep.c.x+=a.dt*c.m_linearVelocity.x;

                                     c.m_sweep.c.y+=a.dt*c.m_linearVelocity.y;
                                     c.m_sweep.a+=a.dt*c.m_angularVelocity;
                                     c.SynchronizeTransform()}for(b=0;
                                                      b<a.positionIterations;
                                                      ++b){
                                         e=d.SolvePositionConstraints(0.75);
                                         h=!0;
                                         for(c=0;
                                         c<this.m_jointCount;
                                         ++c)var g=this.m_joints[c].SolvePositionConstraints(b2.Settings.b2_contactBaumgarte),h=h&&g;
                                         if(e&&h)break}this.Report(d.m_constraints)
    };

    b2.Island.prototype.Report=function(a){
    if(this.m_listener!=null)for(var b=0;
                     b<this.m_contactCount;
                     ++b){
        for(var c=this.m_contacts[b],d=a[b],e=0;
        e<d.pointCount;
        ++e)b2.Island.s_impulse.normalImpulses[e]=d.points[e].normalImpulse,b2.Island.s_impulse.tangentImpulses[e]=d.points[e].tangentImpulse;
        this.m_listener.PostSolve(c,b2.Island.s_impulse)}
    };
    b2.Island.prototype.AddBody=function(a){
    a.m_islandIndex=this.m_bodyCount;
    this.m_bodies[this.m_bodyCount++]=a
    };

    b2.Island.prototype.AddContact=function(a){
    this.m_contacts[this.m_contactCount++]=a
    };
    b2.Island.prototype.AddJoint=function(a){
    this.m_joints[this.m_jointCount++]=a
    };
    b2.Island.prototype.m_allocator=null;
    b2.Island.prototype.m_listener=null;
    b2.Island.prototype.m_contactSolver=null;
    b2.Island.prototype.m_bodies=null;
    b2.Island.prototype.m_contacts=null;
    b2.Island.prototype.m_joints=null;
    b2.Island.prototype.m_bodyCount=0;
    b2.Island.prototype.m_jointCount=0;
    b2.Island.prototype.m_contactCount=0;

    b2.Island.prototype.m_bodyCapacity=0;
    b2.Island.prototype.m_contactCapacity=0;
    b2.Island.prototype.m_jointCapacity=0;
    b2.TimeStep=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.TimeStep.prototype.__constructor=function(){

    };
    b2.TimeStep.prototype.__varz=function(){

    };
    b2.TimeStep.prototype.Set=function(a){
    this.dt=a.dt;
    this.inv_dt=a.inv_dt;
    this.positionIterations=a.positionIterations;
    this.velocityIterations=a.velocityIterations;
    this.warmStarting=a.warmStarting
    };

    b2.TimeStep.prototype.dt=null;
    b2.TimeStep.prototype.inv_dt=null;
    b2.TimeStep.prototype.dtRatio=null;
    b2.TimeStep.prototype.velocityIterations=0;
    b2.TimeStep.prototype.positionIterations=0;
    b2.TimeStep.prototype.warmStarting=null;
    b2.World=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.World.prototype.__constructor=function(a,b){
    this.m_controllerList=this.m_jointList=this.m_contactList=this.m_bodyList=this.m_debugDraw=this.m_destructionListener=null;
    this.m_controllerCount=this.m_jointCount=this.m_contactCount=this.m_bodyCount=0;
    b2.World.m_warmStarting=!0;
    b2.World.m_continuousPhysics=!0;
    this.m_allowSleep=b;
    this.m_gravity=a;
    this.m_inv_dt0=0;
    this.m_contactManager.m_world=this;
    this.m_groundBody=this.CreateBody(new b2.BodyDef)
    };

    b2.World.prototype.__varz=function(){
    this.s_stack=[];
    this.m_contactManager=new b2.ContactManager;
    this.m_contactSolver=new b2.ContactSolver;
    this.m_island=new b2.Island
    };
    b2.World.s_timestep2=new b2.TimeStep;
    b2.World.s_backupA=new b2.Sweep;
    b2.World.s_backupB=new b2.Sweep;
    b2.World.s_timestep=new b2.TimeStep;
    b2.World.s_queue=[];
    b2.World.e_newFixture=1;
    b2.World.e_locked=2;
    b2.World.s_xf=new b2.Transform;
    b2.World.s_jointColor=new b2.Color(0.5,0.8,0.8);
    b2.World.m_warmStarting=null;

    b2.World.m_continuousPhysics=null;

    b2.World.prototype.Solve=function(a){
    for(var b,c=this.m_controllerList;
        c;
        c=c.m_next)c.Step(a);
    c=this.m_island;
    c.Initialize(this.m_bodyCount,this.m_contactCount,this.m_jointCount,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
    for(b=this.m_bodyList;
        b;
        b=b.m_next)b.m_flags&=~b2.Body.e_islandFlag;
    for(var d=this.m_contactList;
        d;
        d=d.m_next)d.m_flags&=~b2.Contact.e_islandFlag;
    for(d=this.m_jointList;
        d;
        d=d.m_next)d.m_islandFlag=!1;
    for(var d=this.s_stack,e=this.m_bodyList;
        e;
        e=e.m_next)if(!(e.m_flags&
                b2.Body.e_islandFlag)&&!(e.IsAwake()==!1||e.IsActive()==!1)&&e.GetType()!=b2.Body.b2_staticBody){
        c.Clear();
        var h=0;
        d[h++]=e;
        for(e.m_flags|=b2.Body.e_islandFlag;
            h>0;
           )if(b=d[--h],c.AddBody(b),b.IsAwake()==!1&&b.SetAwake(!0),b.GetType()!=b2.Body.b2_staticBody){
               for(var g,f=b.m_contactList;
               f;
               f=f.next)if(!(f.contact.m_flags&b2.Contact.e_islandFlag)&&!(f.contact.IsSensor()==!0||f.contact.IsEnabled()==!1||f.contact.IsTouching()==!1))c.AddContact(f.contact),f.contact.m_flags|=b2.Contact.e_islandFlag,g=f.other,
               g.m_flags&b2.Body.e_islandFlag||(d[h++]=g,g.m_flags|=b2.Body.e_islandFlag);
               for(b=b.m_jointList;
               b;
               b=b.next)if(b.joint.m_islandFlag!=!0&&(g=b.other,g.IsActive()!=!1))c.AddJoint(b.joint),b.joint.m_islandFlag=!0,g.m_flags&b2.Body.e_islandFlag||(d[h++]=g,g.m_flags|=b2.Body.e_islandFlag)}c.Solve(a,this.m_gravity,this.m_allowSleep);
        for(h=0;
            h<c.m_bodyCount;
            ++h)b=c.m_bodies[h],b.GetType()==b2.Body.b2_staticBody&&(b.m_flags&=~b2.Body.e_islandFlag)}for(h=0;
                                                           h<d.length;
                                                           ++h){
            if(!d[h])break;
            d[h]=null}for(b=this.m_bodyList;
                      b;
                      b=
                      b.m_next)b.IsAwake()==!1||b.IsActive()==!1||b.GetType()!=b2.Body.b2_staticBody&&b.SynchronizeFixtures();
    this.m_contactManager.FindNewContacts()
    };

    b2.World.prototype.SolveTOI=function(a){
    var b,c,d,e=this.m_island;
    e.Initialize(this.m_bodyCount,b2.Settings.b2_maxTOIContactsPerIsland,b2.Settings.b2_maxTOIJointsPerIsland,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
    var h=b2.World.s_queue;
    for(b=this.m_bodyList;
        b;
        b=b.m_next)b.m_flags&=~b2.Body.e_islandFlag,b.m_sweep.t0=0;
    for(d=this.m_contactList;
        d;
        d=d.m_next)d.m_flags&=~(b2.Contact.e_toiFlag|b2.Contact.e_islandFlag);
    for(d=this.m_jointList;
        d;
        d=d.m_next)d.m_islandFlag=!1;
    for(;
        ;
       ){
        var g=
        null,f=1;
        for(d=this.m_contactList;
        d;
        d=d.m_next)if(!(d.IsSensor()==!0||d.IsEnabled()==!1||d.IsContinuous()==!1)){
            b=1;
            if(d.m_flags&b2.Contact.e_toiFlag)b=d.m_toi;
            else{
            b=d.m_fixtureA;
            c=d.m_fixtureB;
            b=b.m_body;
            c=c.m_body;
            if((b.GetType()!=b2.Body.b2_dynamicBody||b.IsAwake()==!1)&&(c.GetType()!=b2.Body.b2_dynamicBody||c.IsAwake()==!1))continue;
            var i=b.m_sweep.t0;
            if(b.m_sweep.t0<c.m_sweep.t0)i=c.m_sweep.t0,b.m_sweep.Advance(i);
            else if(c.m_sweep.t0<b.m_sweep.t0)i=b.m_sweep.t0,c.m_sweep.Advance(i);
            b=d.ComputeTOI(b.m_sweep,
                       c.m_sweep);
            b2.Settings.b2Assert(0<=b&&b<=1);
            b>0&&b<1&&(b=(1-b)*i+b,b>1&&(b=1));
            d.m_toi=b;
            d.m_flags|=b2.Contact.e_toiFlag}Number.MIN_VALUE<b&&b<f&&(g=d,f=b)}if(g==null||1-100*Number.MIN_VALUE<f)break;
        b=g.m_fixtureA;
        c=g.m_fixtureB;
        b=b.m_body;
        c=c.m_body;
        b2.World.s_backupA.Set(b.m_sweep);
        b2.World.s_backupB.Set(c.m_sweep);
        b.Advance(f);
        c.Advance(f);
        g.Update(this.m_contactManager.m_contactListener);
        g.m_flags&=~b2.Contact.e_toiFlag;
        if(g.IsSensor()==!0||g.IsEnabled()==!1)b.m_sweep.Set(b2.World.s_backupA),
        c.m_sweep.Set(b2.World.s_backupB),b.SynchronizeTransform(),c.SynchronizeTransform();
        else if(g.IsTouching()!=!1){
        b.GetType()!=b2.Body.b2_dynamicBody&&(b=c);
        e.Clear();
        g=d=0;
        h[d+g++]=b;
        for(b.m_flags|=b2.Body.e_islandFlag;
            g>0;
           )if(b=h[d++],--g,e.AddBody(b),b.IsAwake()==!1&&b.SetAwake(!0),b.GetType()==b2.Body.b2_dynamicBody){
               for(c=b.m_contactList;
               c;
               c=c.next){
               if(e.m_contactCount==e.m_contactCapacity)break;
               if(!(c.contact.m_flags&b2.Contact.e_islandFlag)&&!(c.contact.IsSensor()==!0||c.contact.IsEnabled()==
                                          !1||c.contact.IsTouching()==!1))e.AddContact(c.contact),c.contact.m_flags|=b2.Contact.e_islandFlag,i=c.other,i.m_flags&b2.Body.e_islandFlag||(i.GetType()!=b2.Body.b2_staticBody&&(i.Advance(f),i.SetAwake(!0)),h[d+g]=i,++g,i.m_flags|=b2.Body.e_islandFlag)}for(b=b.m_jointList;
                                                                                                                                                                        b;
                                                                                                                                                                        b=b.next)if(e.m_jointCount!=e.m_jointCapacity&&b.joint.m_islandFlag!=!0&&(i=b.other,i.IsActive()!=!1))e.AddJoint(b.joint),b.joint.m_islandFlag=!0,i.m_flags&b2.Body.e_islandFlag||(i.GetType()!=b2.Body.b2_staticBody&&(i.Advance(f),
                                                                                                                                                                                                                                                                                    i.SetAwake(!0)),h[d+g]=i,++g,i.m_flags|=b2.Body.e_islandFlag)}d=b2.World.s_timestep;
        d.warmStarting=!1;
        d.dt=(1-f)*a.dt;
        d.inv_dt=1/d.dt;
        d.dtRatio=0;
        d.velocityIterations=a.velocityIterations;
        d.positionIterations=a.positionIterations;
        e.SolveTOI(d);
        for(f=f=0;
            f<e.m_bodyCount;
            ++f)if(b=e.m_bodies[f],b.m_flags&=~b2.Body.e_islandFlag,b.IsAwake()!=!1&&b.GetType()==b2.Body.b2_dynamicBody){
            b.SynchronizeFixtures();
            for(c=b.m_contactList;
                c;
                c=c.next)c.contact.m_flags&=~b2.Contact.e_toiFlag}for(f=0;
                                          f<e.m_contactCount;
                                          ++f)d=
            e.m_contacts[f],d.m_flags&=~(b2.Contact.e_toiFlag|b2.Contact.e_islandFlag);
        for(f=0;
            f<e.m_jointCount;
            ++f)d=e.m_joints[f],d.m_islandFlag=!1;
        this.m_contactManager.FindNewContacts()}}
    };

    b2.World.prototype.DrawJoint=function(a){
    var b=a.GetBodyA(),c=a.GetBodyB(),d=b.m_xf.position,e=c.m_xf.position,h=a.GetAnchorA(),g=a.GetAnchorB(),f=b2.World.s_jointColor;
    switch(a.m_type){
    case b2.Joint.e_distanceJoint:this.m_debugDraw.DrawSegment(h,g,f);
        break;
    case b2.Joint.e_pulleyJoint:b=a.GetGroundAnchorA();
        a=a.GetGroundAnchorB();
        this.m_debugDraw.DrawSegment(b,h,f);
        this.m_debugDraw.DrawSegment(a,g,f);
        this.m_debugDraw.DrawSegment(b,a,f);
        break;
    case b2.Joint.e_mouseJoint:this.m_debugDraw.DrawSegment(h,
                                g,f);
        break;
    default:b!=this.m_groundBody&&this.m_debugDraw.DrawSegment(d,h,f),this.m_debugDraw.DrawSegment(h,g,f),c!=this.m_groundBody&&this.m_debugDraw.DrawSegment(e,g,f)}
    };

    b2.World.prototype.DrawShape=function(a,b,c){
    switch(a.m_type){
    case b2.Shape.e_circleShape:this.m_debugDraw.DrawSolidCircle(b2.Math.MulX(b,a.m_p),a.m_radius,b.R.col1,c);
        break;
    case b2.Shape.e_polygonShape:for(var d=0,e=a.GetVertexCount(),a=a.GetVertices(),h=Array(e),d=0;
                     d<e;
                     ++d)h[d]=b2.Math.MulX(b,a[d]);
        this.m_debugDraw.DrawSolidPolygon(h,e,c);
        break;
    case b2.Shape.e_edgeShape:this.m_debugDraw.DrawSegment(b2.Math.MulX(b,a.GetVertex1()),b2.Math.MulX(b,a.GetVertex2()),c)}
    };

    b2.World.prototype.SetDestructionListener=function(a){
    this.m_destructionListener=a
    };
    b2.World.prototype.SetContactFilter=function(a){
    this.m_contactManager.m_contactFilter=a
    };
    b2.World.prototype.SetContactListener=function(a){
    this.m_contactManager.m_contactListener=a
    };
    b2.World.prototype.SetDebugDraw=function(a){
    this.m_debugDraw=a
    };

    b2.World.prototype.SetBroadPhase=function(a){
    var b=this.m_contactManager.m_broadPhase;
    this.m_contactManager.m_broadPhase=a;
    for(var c=this.m_bodyList;
        c;
        c=c.m_next)for(var d=c.m_fixtureList;
               d;
               d=d.m_next)d.m_proxy=a.CreateProxy(b.GetFatAABB(d.m_proxy),d)
    };
    b2.World.prototype.Validate=function(){
    this.m_contactManager.m_broadPhase.Validate()
    };
    b2.World.prototype.GetProxyCount=function(){
    return this.m_contactManager.m_broadPhase.GetProxyCount()
    };

    b2.World.prototype.CreateBody=function(a){
    if(this.IsLocked()==!0)return null;
    a=new b2.Body(a,this);
    a.m_prev=null;
    if(a.m_next=this.m_bodyList)this.m_bodyList.m_prev=a;
    this.m_bodyList=a;
    ++this.m_bodyCount;
    return a
    };

    b2.World.prototype.DestroyBody=function(a){
    if(this.IsLocked()!=!0){
        for(var b=a.m_jointList;
        b;
           ){
        var c=b,b=b.next;
        this.m_destructionListener&&this.m_destructionListener.SayGoodbyeJoint(c.joint);
        this.DestroyJoint(c.joint)}for(b=a.m_controllerList;
                           b;
                          )c=b,b=b.nextController,c.controller.RemoveBody(a);
        for(b=a.m_contactList;
        b;
           )c=b,b=b.next,this.m_contactManager.Destroy(c.contact);
        a.m_contactList=null;
        for(b=a.m_fixtureList;
        b;
           )c=b,b=b.m_next,this.m_destructionListener&&this.m_destructionListener.SayGoodbyeFixture(c),
        c.DestroyProxy(this.m_contactManager.m_broadPhase),c.Destroy();
        a.m_fixtureList=null;
        a.m_fixtureCount=0;
        if(a.m_prev)a.m_prev.m_next=a.m_next;
        if(a.m_next)a.m_next.m_prev=a.m_prev;
        if(a==this.m_bodyList)this.m_bodyList=a.m_next;
        --this.m_bodyCount}
    };

    b2.World.prototype.CreateJoint=function(a){
    var b=b2.Joint.Create(a,null);
    b.m_prev=null;
    if(b.m_next=this.m_jointList)this.m_jointList.m_prev=b;
    this.m_jointList=b;
    ++this.m_jointCount;
    b.m_edgeA.joint=b;
    b.m_edgeA.other=b.m_bodyB;
    b.m_edgeA.prev=null;
    if(b.m_edgeA.next=b.m_bodyA.m_jointList)b.m_bodyA.m_jointList.prev=b.m_edgeA;
    b.m_bodyA.m_jointList=b.m_edgeA;
    b.m_edgeB.joint=b;
    b.m_edgeB.other=b.m_bodyA;
    b.m_edgeB.prev=null;
    if(b.m_edgeB.next=b.m_bodyB.m_jointList)b.m_bodyB.m_jointList.prev=b.m_edgeB;
    b.m_bodyB.m_jointList=
        b.m_edgeB;
    var c=a.bodyA,d=a.bodyB;
    if(a.collideConnected==!1)for(a=d.GetContactList();
                      a;
                     )a.other==c&&a.contact.FlagForFiltering(),a=a.next;
    return b
    };

    b2.World.prototype.DestroyJoint=function(a){
    var b=a.m_collideConnected;
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a==this.m_jointList)this.m_jointList=a.m_next;
    var c=a.m_bodyA,d=a.m_bodyB;
    c.SetAwake(!0);
    d.SetAwake(!0);
    if(a.m_edgeA.prev)a.m_edgeA.prev.next=a.m_edgeA.next;
    if(a.m_edgeA.next)a.m_edgeA.next.prev=a.m_edgeA.prev;
    if(a.m_edgeA==c.m_jointList)c.m_jointList=a.m_edgeA.next;
    a.m_edgeA.prev=null;
    a.m_edgeA.next=null;
    if(a.m_edgeB.prev)a.m_edgeB.prev.next=a.m_edgeB.next;

    if(a.m_edgeB.next)a.m_edgeB.next.prev=a.m_edgeB.prev;
    if(a.m_edgeB==d.m_jointList)d.m_jointList=a.m_edgeB.next;
    a.m_edgeB.prev=null;
    a.m_edgeB.next=null;
    b2.Joint.Destroy(a,null);
    --this.m_jointCount;
    if(b==!1)for(a=d.GetContactList();
             a;
            )a.other==c&&a.contact.FlagForFiltering(),a=a.next
    };
    b2.World.prototype.AddController=function(a){
    a.m_next=this.m_controllerList;
    a.m_prev=null;
    this.m_controllerList=a;
    a.m_world=this;
    this.m_controllerCount++;
    return a
    };

    b2.World.prototype.RemoveController=function(a){
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(this.m_controllerList==a)this.m_controllerList=a.m_next;
    this.m_controllerCount--
    };
    b2.World.prototype.CreateController=function(a){
    if(a.m_world!=this)throw Error("Controller can only be a member of one world");
    a.m_next=this.m_controllerList;
    a.m_prev=null;
    if(this.m_controllerList)this.m_controllerList.m_prev=a;
    this.m_controllerList=a;
    ++this.m_controllerCount;
    a.m_world=this;
    return a
    };

    b2.World.prototype.DestroyController=function(a){
    a.Clear();
    if(a.m_next)a.m_next.m_prev=a.m_prev;
    if(a.m_prev)a.m_prev.m_next=a.m_next;
    if(a==this.m_controllerList)this.m_controllerList=a.m_next;
    --this.m_controllerCount
    };
    b2.World.prototype.SetWarmStarting=function(a){
    b2.World.m_warmStarting=a
    };
    b2.World.prototype.SetContinuousPhysics=function(a){
    b2.World.m_continuousPhysics=a
    };
    b2.World.prototype.GetBodyCount=function(){
    return this.m_bodyCount
    };
    b2.World.prototype.GetJointCount=function(){
    return this.m_jointCount
    };

    b2.World.prototype.GetContactCount=function(){
    return this.m_contactCount
    };
    b2.World.prototype.SetGravity=function(a){
    this.m_gravity=a
    };
    b2.World.prototype.GetGravity=function(){
    return this.m_gravity
    };
    b2.World.prototype.GetGroundBody=function(){
    return this.m_groundBody
    };

    b2.World.prototype.Step=function(a,b,c){
    this.m_flags&b2.World.e_newFixture&&(this.m_contactManager.FindNewContacts(),this.m_flags&=~b2.World.e_newFixture);
    this.m_flags|=b2.World.e_locked;
    var d=b2.World.s_timestep2;
    d.dt=a;
    d.velocityIterations=b;
    d.positionIterations=c;
    d.inv_dt=a>0?1/a:0;
    d.dtRatio=this.m_inv_dt0*a;
    d.warmStarting=b2.World.m_warmStarting;
    this.m_contactManager.Collide();
    d.dt>0&&this.Solve(d);
    b2.World.m_continuousPhysics&&d.dt>0&&this.SolveTOI(d);
    if(d.dt>0)this.m_inv_dt0=d.inv_dt;
    this.m_flags&=
        ~b2.World.e_locked
    };
    b2.World.prototype.ClearForces=function(){
    for(var a=this.m_bodyList;
        a;
        a=a.m_next)a.m_force.SetZero(),a.m_torque=0
    };

    b2.World.prototype.DrawDebugData=function(){
    if(this.m_debugDraw!=null){
        this.m_debugDraw.Clear();
        var a=this.m_debugDraw.GetFlags(),b,c,d;
        new b2.Vec2;
        new b2.Vec2;
        new b2.Vec2;
        var e;
        new b2.AABB;
        new b2.AABB;
        e=[new b2.Vec2,new b2.Vec2,new b2.Vec2,new b2.Vec2];
        var h=new b2.Color(0,0,0);
        if(a&b2.DebugDraw.e_shapeBit)for(b=this.m_bodyList;
                         b;
                         b=b.m_next){
        e=b.m_xf;
        for(c=b.GetFixtureList();
            c;
            c=c.m_next)d=c.GetShape(),b.IsActive()==!1?h.Set(0.5,0.5,0.3):b.GetType()==b2.Body.b2_staticBody?h.Set(0.5,0.9,0.5):b.GetType()==
            b2.Body.b2_kinematicBody?h.Set(0.5,0.5,0.9):b.IsAwake()==!1?h.Set(0.6,0.6,0.6):h.Set(0.9,0.7,0.7),this.DrawShape(d,e,h)}if(a&b2.DebugDraw.e_jointBit)for(b=this.m_jointList;
                                                                                         b;
                                                                                         b=b.m_next)this.DrawJoint(b);
        if(a&b2.DebugDraw.e_controllerBit)for(b=this.m_controllerList;
                          b;
                          b=b.m_next)b.Draw(this.m_debugDraw);
        if(a&b2.DebugDraw.e_pairBit){
        h.Set(0.3,0.9,0.9);
        for(b=this.m_contactManager.m_contactList;
            b;
            b=b.GetNext())d=b.GetFixtureA(),c=b.GetFixtureB(),d=d.GetAABB().GetCenter(),c=c.GetAABB().GetCenter(),this.m_debugDraw.DrawSegment(d,
                                                                               c,h)}if(a&b2.DebugDraw.e_aabbBit){
                                                                               d=this.m_contactManager.m_broadPhase;
                                                                               e=[new b2.Vec2,new b2.Vec2,new b2.Vec2,new b2.Vec2];
                                                                               for(b=this.m_bodyList;
                                                                                   b;
                                                                                   b=b.GetNext())if(b.IsActive()!=!1)for(c=b.GetFixtureList();
                                                                                                     c;
                                                                                                     c=c.GetNext()){
                                                                                   var g=d.GetFatAABB(c.m_proxy);
                                                                                   e[0].Set(g.lowerBound.x,g.lowerBound.y);
                                                                                   e[1].Set(g.upperBound.x,g.lowerBound.y);
                                                                                   e[2].Set(g.upperBound.x,g.upperBound.y);
                                                                                   e[3].Set(g.lowerBound.x,g.upperBound.y);
                                                                                   this.m_debugDraw.DrawPolygon(e,4,h)}}if(a&b2.DebugDraw.e_centerOfMassBit)for(b=this.m_bodyList;
                                                                                                                        b;
                                                                                                                        b=
                                                                                                                        b.m_next)e=b2.World.s_xf,e.R=b.m_xf.R,e.position=b.GetWorldCenter(),this.m_debugDraw.DrawTransform(e)}
    };
    b2.World.prototype.QueryAABB=function(a,b){
    var c=this.m_contactManager.m_broadPhase;
    c.Query(function(b){
        return a(c.GetUserData(b))},b)
    };

    b2.World.prototype.QueryShape=function(a,b,c){
    c==null&&(c=new b2.Transform,c.SetIdentity());
    var d=this.m_contactManager.m_broadPhase,e=new b2.AABB;
    b.ComputeAABB(e,c);
    d.Query(function(e){
        e=d.GetUserData(e);
        if(b2.Shape.TestOverlap(b,c,e.GetShape(),e.GetBody().GetTransform()))return a(e);
        return!0},e)
    };

    b2.World.prototype.QueryPoint=function(a,b){
    var c=this.m_contactManager.m_broadPhase,d=new b2.AABB;
    d.lowerBound.Set(b.x-b2.Settings.b2_linearSlop,b.y-b2.Settings.b2_linearSlop);
    d.upperBound.Set(b.x+b2.Settings.b2_linearSlop,b.y+b2.Settings.b2_linearSlop);
    c.Query(function(d){
        d=c.GetUserData(d);
        if(d.TestPoint(b))return a(d);
        return!0},d)
    };

    b2.World.prototype.RayCast=function(a,b,c){
    var d=this.m_contactManager.m_broadPhase,e=new b2.RayCastOutput,h=new b2.RayCastInput(b,c);
    d.RayCast(function(g,f){
        var h=d.GetUserData(f);
        if(h.RayCast(e,g)){
        var j=e.fraction,k=new b2.Vec2((1-j)*b.x+j*c.x,(1-j)*b.y+j*c.y);
        return a(h,k,e.normal,j)}return g.maxFraction},h)
    };
    b2.World.prototype.RayCastOne=function(a,b){
    var c;
    this.RayCast(function(a,b,h,g){
        c=a;
        return g},a,b);
    return c
    };

    b2.World.prototype.RayCastAll=function(a,b){
    var c=[];
    this.RayCast(function(a){
        c[c.length]=a;
        return 1},a,b);
    return c
    };
    b2.World.prototype.GetBodyList=function(){
    return this.m_bodyList
    };
    b2.World.prototype.GetJointList=function(){
    return this.m_jointList
    };
    b2.World.prototype.GetContactList=function(){
    return this.m_contactList
    };
    b2.World.prototype.IsLocked=function(){
    return(this.m_flags&b2.World.e_locked)>0
    };
    b2.World.prototype.s_stack=[];
    b2.World.prototype.m_flags=0;
    b2.World.prototype.m_contactManager=new b2.ContactManager;

    b2.World.prototype.m_contactSolver=new b2.ContactSolver;
    b2.World.prototype.m_island=new b2.Island;
    b2.World.prototype.m_bodyList=null;
    b2.World.prototype.m_jointList=null;
    b2.World.prototype.m_contactList=null;
    b2.World.prototype.m_bodyCount=0;
    b2.World.prototype.m_contactCount=0;
    b2.World.prototype.m_jointCount=0;
    b2.World.prototype.m_controllerList=null;
    b2.World.prototype.m_controllerCount=0;
    b2.World.prototype.m_gravity=null;
    b2.World.prototype.m_allowSleep=null;
    b2.World.prototype.m_groundBody=null;

    b2.World.prototype.m_destructionListener=null;
    b2.World.prototype.m_debugDraw=null;
    b2.World.prototype.m_inv_dt0=null;
    b2.CircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.CircleContact.prototype,b2.Contact.prototype);
    b2.CircleContact.prototype._super=b2.Contact.prototype;
    b2.CircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.CircleContact.prototype.__varz=function(){

    };

    b2.CircleContact.Create=function(){
    return new b2.CircleContact
    };
    b2.CircleContact.Destroy=function(){

    };
    b2.CircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    b2.Collision.CollideCircles(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.CircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };
    b2.Contact=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Contact.prototype.__constructor=function(){

    };
    b2.Contact.prototype.__varz=function(){
    this.m_nodeA=new b2.ContactEdge;
    this.m_nodeB=new b2.ContactEdge;
    this.m_manifold=new b2.Manifold;
    this.m_oldManifold=new b2.Manifold
    };
    b2.Contact.s_input=new b2.TOIInput;
    b2.Contact.e_sensorFlag=1;
    b2.Contact.e_continuousFlag=2;
    b2.Contact.e_islandFlag=4;
    b2.Contact.e_toiFlag=8;
    b2.Contact.e_touchingFlag=16;
    b2.Contact.e_enabledFlag=32;
    b2.Contact.e_filterFlag=64;

    b2.Contact.prototype.Reset=function(a,b){
    this.m_flags=b2.Contact.e_enabledFlag;
    if(!a||!b)this.m_fixtureB=this.m_fixtureA=null;
    else{
        if(a.IsSensor()||b.IsSensor())this.m_flags|=b2.Contact.e_sensorFlag;
        var c=a.GetBody(),d=b.GetBody();
        if(c.GetType()!=b2.Body.b2_dynamicBody||c.IsBullet()||d.GetType()!=b2.Body.b2_dynamicBody||d.IsBullet())this.m_flags|=b2.Contact.e_continuousFlag;
        this.m_fixtureA=a;
        this.m_fixtureB=b;
        this.m_manifold.m_pointCount=0;
        this.m_next=this.m_prev=null;
        this.m_nodeA.contact=null;
        this.m_nodeA.prev=
        null;
        this.m_nodeA.next=null;
        this.m_nodeA.other=null;
        this.m_nodeB.contact=null;
        this.m_nodeB.prev=null;
        this.m_nodeB.next=null;
        this.m_nodeB.other=null}
    };

    b2.Contact.prototype.Update=function(a){
    var b=this.m_oldManifold;
    this.m_oldManifold=this.m_manifold;
    this.m_manifold=b;
    this.m_flags|=b2.Contact.e_enabledFlag;
    var c=!1,b=(this.m_flags&b2.Contact.e_touchingFlag)==b2.Contact.e_touchingFlag,d=this.m_fixtureA.m_body,e=this.m_fixtureB.m_body,h=this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
    if(this.m_flags&b2.Contact.e_sensorFlag)h&&(c=this.m_fixtureA.GetShape(),h=this.m_fixtureB.GetShape(),d=d.GetTransform(),e=e.GetTransform(),c=b2.Shape.TestOverlap(c,
                                                                                       d,h,e)),this.m_manifold.m_pointCount=0;
    else{
        d.GetType()!=b2.Body.b2_dynamicBody||d.IsBullet()||e.GetType()!=b2.Body.b2_dynamicBody||e.IsBullet()?this.m_flags|=b2.Contact.e_continuousFlag:this.m_flags&=~b2.Contact.e_continuousFlag;
        if(h){
        this.Evaluate();
        c=this.m_manifold.m_pointCount>0;
        for(h=0;
            h<this.m_manifold.m_pointCount;
            ++h){
            var g=this.m_manifold.m_points[h];
            g.m_normalImpulse=0;
            g.m_tangentImpulse=0;
            for(var f=g.m_id,i=0;
            i<this.m_oldManifold.m_pointCount;
            ++i){
            var j=this.m_oldManifold.m_points[i];

            if(j.m_id.key==f.key){
                g.m_normalImpulse=j.m_normalImpulse;
                g.m_tangentImpulse=j.m_tangentImpulse;
                break}}}}else this.m_manifold.m_pointCount=0;
        c!=b&&(d.SetAwake(!0),e.SetAwake(!0))}c?this.m_flags|=b2.Contact.e_touchingFlag:this.m_flags&=~b2.Contact.e_touchingFlag;
    b==!1&&c==!0&&a.BeginContact(this);
    b==!0&&c==!1&&a.EndContact(this);
    (this.m_flags&b2.Contact.e_sensorFlag)==0&&a.PreSolve(this,this.m_oldManifold)
    };
    b2.Contact.prototype.Evaluate=function(){

    };

    b2.Contact.prototype.ComputeTOI=function(a,b){
    b2.Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
    b2.Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
    b2.Contact.s_input.sweepA=a;
    b2.Contact.s_input.sweepB=b;
    b2.Contact.s_input.tolerance=b2.Settings.b2_linearSlop;
    return b2.TimeOfImpact.TimeOfImpact(b2.Contact.s_input)
    };
    b2.Contact.prototype.GetManifold=function(){
    return this.m_manifold
    };

    b2.Contact.prototype.GetWorldManifold=function(a){
    var b=this.m_fixtureA.GetBody(),c=this.m_fixtureB.GetBody(),d=this.m_fixtureA.GetShape(),e=this.m_fixtureB.GetShape();
    a.Initialize(this.m_manifold,b.GetTransform(),d.m_radius,c.GetTransform(),e.m_radius)
    };
    b2.Contact.prototype.IsTouching=function(){
    return(this.m_flags&b2.Contact.e_touchingFlag)==b2.Contact.e_touchingFlag
    };
    b2.Contact.prototype.IsContinuous=function(){
    return(this.m_flags&b2.Contact.e_continuousFlag)==b2.Contact.e_continuousFlag
    };

    b2.Contact.prototype.SetSensor=function(a){
    a?this.m_flags|=b2.Contact.e_sensorFlag:this.m_flags&=~b2.Contact.e_sensorFlag
    };
    b2.Contact.prototype.IsSensor=function(){
    return(this.m_flags&b2.Contact.e_sensorFlag)==b2.Contact.e_sensorFlag
    };
    b2.Contact.prototype.SetEnabled=function(a){
    a?this.m_flags|=b2.Contact.e_enabledFlag:this.m_flags&=~b2.Contact.e_enabledFlag
    };
    b2.Contact.prototype.IsEnabled=function(){
    return(this.m_flags&b2.Contact.e_enabledFlag)==b2.Contact.e_enabledFlag
    };

    b2.Contact.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Contact.prototype.GetFixtureA=function(){
    return this.m_fixtureA
    };
    b2.Contact.prototype.GetFixtureB=function(){
    return this.m_fixtureB
    };
    b2.Contact.prototype.FlagForFiltering=function(){
    this.m_flags|=b2.Contact.e_filterFlag
    };
    b2.Contact.prototype.m_flags=0;
    b2.Contact.prototype.m_prev=null;
    b2.Contact.prototype.m_next=null;
    b2.Contact.prototype.m_nodeA=new b2.ContactEdge;
    b2.Contact.prototype.m_nodeB=new b2.ContactEdge;

    b2.Contact.prototype.m_fixtureA=null;
    b2.Contact.prototype.m_fixtureB=null;
    b2.Contact.prototype.m_manifold=new b2.Manifold;
    b2.Contact.prototype.m_oldManifold=new b2.Manifold;
    b2.Contact.prototype.m_toi=null;
    b2.ContactConstraint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactConstraint.prototype.__constructor=function(){
    this.points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.points[a]=new b2.ContactConstraintPoint
    };

    b2.ContactConstraint.prototype.__varz=function(){
    this.localPlaneNormal=new b2.Vec2;
    this.localPoint=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.normalMass=new b2.Mat22;
    this.K=new b2.Mat22
    };
    b2.ContactConstraint.prototype.points=null;
    b2.ContactConstraint.prototype.localPlaneNormal=new b2.Vec2;
    b2.ContactConstraint.prototype.localPoint=new b2.Vec2;
    b2.ContactConstraint.prototype.normal=new b2.Vec2;
    b2.ContactConstraint.prototype.normalMass=new b2.Mat22;
    b2.ContactConstraint.prototype.K=new b2.Mat22;

    b2.ContactConstraint.prototype.bodyA=null;
    b2.ContactConstraint.prototype.bodyB=null;
    b2.ContactConstraint.prototype.type=0;
    b2.ContactConstraint.prototype.radius=null;
    b2.ContactConstraint.prototype.friction=null;
    b2.ContactConstraint.prototype.restitution=null;
    b2.ContactConstraint.prototype.pointCount=0;
    b2.ContactConstraint.prototype.manifold=null;
    b2.ContactConstraintPoint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactConstraintPoint.prototype.__constructor=function(){

    };

    b2.ContactConstraintPoint.prototype.__varz=function(){
    this.localPoint=new b2.Vec2;
    this.rA=new b2.Vec2;
    this.rB=new b2.Vec2
    };
    b2.ContactConstraintPoint.prototype.localPoint=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.rA=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.rB=new b2.Vec2;
    b2.ContactConstraintPoint.prototype.normalImpulse=null;
    b2.ContactConstraintPoint.prototype.tangentImpulse=null;
    b2.ContactConstraintPoint.prototype.normalMass=null;
    b2.ContactConstraintPoint.prototype.tangentMass=null;

    b2.ContactConstraintPoint.prototype.equalizedMass=null;
    b2.ContactConstraintPoint.prototype.velocityBias=null;
    b2.ContactEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactEdge.prototype.__constructor=function(){

    };
    b2.ContactEdge.prototype.__varz=function(){

    };
    b2.ContactEdge.prototype.other=null;
    b2.ContactEdge.prototype.contact=null;
    b2.ContactEdge.prototype.prev=null;
    b2.ContactEdge.prototype.next=null;

    b2.ContactFactory=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactFactory.prototype.__constructor=function(){

    };
    b2.ContactFactory.prototype.__varz=function(){
    this.InitializeRegisters()
    };
    b2.ContactFactory.prototype.AddType=function(a,b,c,d){
    this.m_registers[c][d].createFcn=a;
    this.m_registers[c][d].destroyFcn=b;
    this.m_registers[c][d].primary=!0;
    if(c!=d)this.m_registers[d][c].createFcn=a,this.m_registers[d][c].destroyFcn=b,this.m_registers[d][c].primary=!1
    };

    b2.ContactFactory.prototype.InitializeRegisters=function(){
    this.m_registers=Array(b2.Shape.e_shapeTypeCount);
    for(var a=0;
        a<b2.Shape.e_shapeTypeCount;
        a++){
        this.m_registers[a]=Array(b2.Shape.e_shapeTypeCount);
        for(var b=0;
        b<b2.Shape.e_shapeTypeCount;
        b++)this.m_registers[a][b]=new b2.ContactRegister}this.AddType(b2.CircleContact.Create,b2.CircleContact.Destroy,b2.Shape.e_circleShape,b2.Shape.e_circleShape);
    this.AddType(b2.PolyAndCircleContact.Create,b2.PolyAndCircleContact.Destroy,b2.Shape.e_polygonShape,
             b2.Shape.e_circleShape);
    this.AddType(b2.PolygonContact.Create,b2.PolygonContact.Destroy,b2.Shape.e_polygonShape,b2.Shape.e_polygonShape);
    this.AddType(b2.EdgeAndCircleContact.Create,b2.EdgeAndCircleContact.Destroy,b2.Shape.e_edgeShape,b2.Shape.e_circleShape);
    this.AddType(b2.PolyAndEdgeContact.Create,b2.PolyAndEdgeContact.Destroy,b2.Shape.e_polygonShape,b2.Shape.e_edgeShape)
    };

    b2.ContactFactory.prototype.Create=function(a,b){
    var c=a.GetType(),d=b.GetType(),c=this.m_registers[c][d];
    if(c.pool)return d=c.pool,c.pool=d.m_next,c.poolCount--,d.Reset(a,b),d;
    d=c.createFcn;
    return d!=null?(c.primary?(d=d(this.m_allocator),d.Reset(a,b)):(d=d(this.m_allocator),d.Reset(b,a)),d):null
    };

    b2.ContactFactory.prototype.Destroy=function(a){
    a.m_manifold.m_pointCount>0&&(a.m_fixtureA.m_body.SetAwake(!0),a.m_fixtureB.m_body.SetAwake(!0));
    var b=a.m_fixtureA.GetType(),c=a.m_fixtureB.GetType(),b=this.m_registers[b][c];
    b.poolCount++;
    a.m_next=b.pool;
    b.pool=a;
    b=b.destroyFcn;
    b(a,this.m_allocator)
    };
    b2.ContactFactory.prototype.m_registers=null;
    b2.ContactFactory.prototype.m_allocator=null;
    b2.ContactRegister=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.ContactRegister.prototype.__constructor=function(){

    };
    b2.ContactRegister.prototype.__varz=function(){

    };
    b2.ContactRegister.prototype.createFcn=null;
    b2.ContactRegister.prototype.destroyFcn=null;
    b2.ContactRegister.prototype.primary=null;
    b2.ContactRegister.prototype.pool=null;
    b2.ContactRegister.prototype.poolCount=0;
    b2.ContactResult=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactResult.prototype.__constructor=function(){

    };

    b2.ContactResult.prototype.__varz=function(){
    this.position=new b2.Vec2;
    this.normal=new b2.Vec2;
    this.id=new b2.ContactID
    };
    b2.ContactResult.prototype.shape1=null;
    b2.ContactResult.prototype.shape2=null;
    b2.ContactResult.prototype.position=new b2.Vec2;
    b2.ContactResult.prototype.normal=new b2.Vec2;
    b2.ContactResult.prototype.normalImpulse=null;
    b2.ContactResult.prototype.tangentImpulse=null;
    b2.ContactResult.prototype.id=new b2.ContactID;

    b2.ContactSolver=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.ContactSolver.prototype.__constructor=function(){

    };
    b2.ContactSolver.prototype.__varz=function(){
    this.m_step=new b2.TimeStep;
    this.m_constraints=[]
    };
    b2.ContactSolver.s_worldManifold=new b2.WorldManifold;
    b2.ContactSolver.s_psm=new b2.PositionSolverManifold;

    b2.ContactSolver.prototype.Initialize=function(a,b,c,d){
    var e;
    this.m_step.Set(a);
    this.m_allocator=d;
    a=0;
    for(this.m_constraintCount=c;
        this.m_constraints.length<this.m_constraintCount;
       )this.m_constraints[this.m_constraints.length]=new b2.ContactConstraint;
    for(a=0;
        a<c;
        ++a){
        e=b[a];
        var d=e.m_fixtureA,h=e.m_fixtureB,g=d.m_shape.m_radius,f=h.m_shape.m_radius,i=d.m_body,j=h.m_body,k=e.GetManifold(),l=b2.Settings.b2MixFriction(d.GetFriction(),h.GetFriction()),n=b2.Settings.b2MixRestitution(d.GetRestitution(),
                                                                                                                h.GetRestitution()),m=i.m_linearVelocity.x,o=i.m_linearVelocity.y,p=j.m_linearVelocity.x,q=j.m_linearVelocity.y,r=i.m_angularVelocity,y=j.m_angularVelocity;
        b2.Settings.b2Assert(k.m_pointCount>0);
        b2.ContactSolver.s_worldManifold.Initialize(k,i.m_xf,g,j.m_xf,f);
        h=b2.ContactSolver.s_worldManifold.m_normal.x;
        e=b2.ContactSolver.s_worldManifold.m_normal.y;
        d=this.m_constraints[a];
        d.bodyA=i;
        d.bodyB=j;
        d.manifold=k;
        d.normal.x=h;
        d.normal.y=e;
        d.pointCount=k.m_pointCount;
        d.friction=l;
        d.restitution=n;
        d.localPlaneNormal.x=
        k.m_localPlaneNormal.x;
        d.localPlaneNormal.y=k.m_localPlaneNormal.y;
        d.localPoint.x=k.m_localPoint.x;
        d.localPoint.y=k.m_localPoint.y;
        d.radius=g+f;
        d.type=k.m_type;
        for(g=0;
        g<d.pointCount;
        ++g){
        l=k.m_points[g];
        f=d.points[g];
        f.normalImpulse=l.m_normalImpulse;
        f.tangentImpulse=l.m_tangentImpulse;
        f.localPoint.SetV(l.m_localPoint);
        var l=f.rA.x=b2.ContactSolver.s_worldManifold.m_points[g].x-i.m_sweep.c.x,n=f.rA.y=b2.ContactSolver.s_worldManifold.m_points[g].y-i.m_sweep.c.y,v=f.rB.x=b2.ContactSolver.s_worldManifold.m_points[g].x-
            j.m_sweep.c.x,x=f.rB.y=b2.ContactSolver.s_worldManifold.m_points[g].y-j.m_sweep.c.y,s=l*e-n*h,u=v*e-x*h;
        s*=s;
        u*=u;
        f.normalMass=1/(i.m_invMass+j.m_invMass+i.m_invI*s+j.m_invI*u);
        var w=i.m_mass*i.m_invMass+j.m_mass*j.m_invMass;
        w+=i.m_mass*i.m_invI*s+j.m_mass*j.m_invI*u;
        f.equalizedMass=1/w;
        u=e;
        w=-h;
        s=l*w-n*u;
        u=v*w-x*u;
        s*=s;
        u*=u;
        f.tangentMass=1/(i.m_invMass+j.m_invMass+i.m_invI*s+j.m_invI*u);
        f.velocityBias=0;
        l=d.normal.x*(p+-y*x-m- -r*n)+d.normal.y*(q+y*v-o-r*l);
        l<-b2.Settings.b2_velocityThreshold&&(f.velocityBias+=
                              -d.restitution*l)}if(d.pointCount==2)q=d.points[0],p=d.points[1],k=i.m_invMass,i=i.m_invI,m=j.m_invMass,j=j.m_invI,o=q.rA.x*e-q.rA.y*h,q=q.rB.x*e-q.rB.y*h,r=p.rA.x*e-p.rA.y*h,p=p.rB.x*e-p.rB.y*h,h=k+m+i*o*o+j*q*q,e=k+m+i*r*r+j*p*p,j=k+m+i*o*r+j*q*p,h*h<100*(h*e-j*j)?(d.K.col1.Set(h,j),d.K.col2.Set(j,e),d.K.GetInverse(d.normalMass)):d.pointCount=1}
    };

    b2.ContactSolver.prototype.InitVelocityConstraints=function(a){
    for(var b=0;
        b<this.m_constraintCount;
        ++b){
        var c=this.m_constraints[b],d=c.bodyA,e=c.bodyB,h=d.m_invMass,g=d.m_invI,f=e.m_invMass,i=e.m_invI,j=c.normal.x,k=c.normal.y,l=k,n=-j,m=0,o=0;
        if(a.warmStarting){
        o=c.pointCount;
        for(m=0;
            m<o;
            ++m){
            var p=c.points[m];
            p.normalImpulse*=a.dtRatio;
            p.tangentImpulse*=a.dtRatio;
            var q=p.normalImpulse*j+p.tangentImpulse*l,r=p.normalImpulse*k+p.tangentImpulse*n;
            d.m_angularVelocity-=g*(p.rA.x*r-p.rA.y*q);
            d.m_linearVelocity.x-=
            h*q;
            d.m_linearVelocity.y-=h*r;
            e.m_angularVelocity+=i*(p.rB.x*r-p.rB.y*q);
            e.m_linearVelocity.x+=f*q;
            e.m_linearVelocity.y+=f*r}}else{
            o=c.pointCount;
            for(m=0;
                m<o;
                ++m)d=c.points[m],d.normalImpulse=0,d.tangentImpulse=0}}
    };

    b2.ContactSolver.prototype.SolveVelocityConstraints=function(){
    for(var a=0,b,c,d,e,h,g,f,i,j,k=0;
        k<this.m_constraintCount;
        ++k){
        e=this.m_constraints[k];
        var l=e.bodyA,n=e.bodyB,m=l.m_angularVelocity,o=n.m_angularVelocity,p=l.m_linearVelocity,q=n.m_linearVelocity,r=l.m_invMass,y=l.m_invI,v=n.m_invMass,x=n.m_invI;
        f=e.normal.x;
        var s=i=e.normal.y;
        j=-f;
        g=e.friction;
        for(a=0;
        a<e.pointCount;
        a++)b=e.points[a],c=q.x-o*b.rB.y-p.x+m*b.rA.y,d=q.y+o*b.rB.x-p.y-m*b.rA.x,c=c*s+d*j,c=b.tangentMass*-c,d=g*b.normalImpulse,
        d=b2.Math.Clamp(b.tangentImpulse+c,-d,d),c=d-b.tangentImpulse,h=c*s,c*=j,p.x-=r*h,p.y-=r*c,m-=y*(b.rA.x*c-b.rA.y*h),q.x+=v*h,q.y+=v*c,o+=x*(b.rB.x*c-b.rB.y*h),b.tangentImpulse=d;
        if(e.pointCount==1)b=e.points[0],c=q.x+-o*b.rB.y-p.x- -m*b.rA.y,d=q.y+o*b.rB.x-p.y-m*b.rA.x,e=c*f+d*i,c=-b.normalMass*(e-b.velocityBias),d=b.normalImpulse+c,d=d>0?d:0,c=d-b.normalImpulse,h=c*f,c*=i,p.x-=r*h,p.y-=r*c,m-=y*(b.rA.x*c-b.rA.y*h),q.x+=v*h,q.y+=v*c,o+=x*(b.rB.x*c-b.rB.y*h),b.normalImpulse=d;
        else{
        b=e.points[0];
        a=
            e.points[1];
        c=b.normalImpulse;
        g=a.normalImpulse;
        var u=(q.x-o*b.rB.y-p.x+m*b.rA.y)*f+(q.y+o*b.rB.x-p.y-m*b.rA.x)*i,w=(q.x-o*a.rB.y-p.x+m*a.rA.y)*f+(q.y+o*a.rB.x-p.y-m*a.rA.x)*i;
        d=u-b.velocityBias;
        h=w-a.velocityBias;
        j=e.K;
        d-=j.col1.x*c+j.col2.x*g;
        for(h-=j.col1.y*c+j.col2.y*g;
            ;
           ){
            j=e.normalMass;
            s=-(j.col1.x*d+j.col2.x*h);
            j=-(j.col1.y*d+j.col2.y*h);
            if(s>=0&&j>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*
                  c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}s=-b.normalMass*d;
            j=0;
            w=e.K.col1.y*s+h;
            if(s>=0&&w>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}s=0;
            j=-a.normalMass*h;
            u=e.K.col2.x*j+d;
            if(j>=0&&u>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*
                (e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}j=s=0;
            u=d;
            w=h;
            if(u>=0&&w>=0){
            c=s-c;
            g=j-g;
            e=c*f;
            c*=i;
            f*=g;
            i*=g;
            p.x-=r*(e+f);
            p.y-=r*(c+i);
            m-=y*(b.rA.x*c-b.rA.y*e+a.rA.x*i-a.rA.y*f);
            q.x+=v*(e+f);
            q.y+=v*(c+i);
            o+=x*(b.rB.x*c-b.rB.y*e+a.rB.x*i-a.rB.y*f);
            b.normalImpulse=s;
            a.normalImpulse=j;
            break}break}}l.m_angularVelocity=m;
        n.m_angularVelocity=o}
    };

    b2.ContactSolver.prototype.FinalizeVelocityConstraints=function(){
    for(var a=0;
        a<this.m_constraintCount;
        ++a)for(var b=this.m_constraints[a],c=b.manifold,d=0;
            d<b.pointCount;
            ++d){
        var e=c.m_points[d],h=b.points[d];
        e.m_normalImpulse=h.normalImpulse;
        e.m_tangentImpulse=h.tangentImpulse}
    };

    b2.ContactSolver.prototype.SolvePositionConstraints=function(a){
    for(var b=0,c=0;
        c<this.m_constraintCount;
        c++){
        var d=this.m_constraints[c],e=d.bodyA,h=d.bodyB,g=e.m_mass*e.m_invMass,f=e.m_mass*e.m_invI,i=h.m_mass*h.m_invMass,j=h.m_mass*h.m_invI;
        b2.ContactSolver.s_psm.Initialize(d);
        for(var k=b2.ContactSolver.s_psm.m_normal,l=0;
        l<d.pointCount;
        l++){
        var n=d.points[l],m=b2.ContactSolver.s_psm.m_points[l],o=b2.ContactSolver.s_psm.m_separations[l],p=m.x-e.m_sweep.c.x,q=m.y-e.m_sweep.c.y,r=m.x-h.m_sweep.c.x,
        m=m.y-h.m_sweep.c.y,b=b<o?b:o,o=b2.Math.Clamp(a*(o+b2.Settings.b2_linearSlop),-b2.Settings.b2_maxLinearCorrection,0);
        o*=-n.equalizedMass;
        n=o*k.x;
        o*=k.y;
        e.m_sweep.c.x-=g*n;
        e.m_sweep.c.y-=g*o;
        e.m_sweep.a-=f*(p*o-q*n);
        e.SynchronizeTransform();
        h.m_sweep.c.x+=i*n;
        h.m_sweep.c.y+=i*o;
        h.m_sweep.a+=j*(r*o-m*n);
        h.SynchronizeTransform()}}return b>-1.5*b2.Settings.b2_linearSlop
    };
    b2.ContactSolver.prototype.m_step=new b2.TimeStep;
    b2.ContactSolver.prototype.m_allocator=null;

    b2.ContactSolver.prototype.m_constraints=[];
    b2.ContactSolver.prototype.m_constraintCount=0;
    b2.EdgeAndCircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.EdgeAndCircleContact.prototype,b2.Contact.prototype);
    b2.EdgeAndCircleContact.prototype._super=b2.Contact.prototype;
    b2.EdgeAndCircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.EdgeAndCircleContact.prototype.__varz=function(){

    };

    b2.EdgeAndCircleContact.Create=function(){
    return new b2.EdgeAndCircleContact
    };
    b2.EdgeAndCircleContact.Destroy=function(){

    };
    b2.EdgeAndCircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    this.b2CollideEdgeAndCircle(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle=function(){

    };

    b2.EdgeAndCircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };
    b2.NullContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.NullContact.prototype,b2.Contact.prototype);
    b2.NullContact.prototype._super=b2.Contact.prototype;
    b2.NullContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.NullContact.prototype.__varz=function(){

    };
    b2.NullContact.prototype.Evaluate=function(){

    };

    b2.PolyAndCircleContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolyAndCircleContact.prototype,b2.Contact.prototype);
    b2.PolyAndCircleContact.prototype._super=b2.Contact.prototype;
    b2.PolyAndCircleContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.PolyAndCircleContact.prototype.__varz=function(){

    };
    b2.PolyAndCircleContact.Create=function(){
    return new b2.PolyAndCircleContact
    };

    b2.PolyAndCircleContact.Destroy=function(){

    };
    b2.PolyAndCircleContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.m_body,b=this.m_fixtureB.m_body;
    b2.Collision.CollidePolygonAndCircle(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolyAndCircleContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b]);
    b2.Settings.b2Assert(a.GetType()==b2.Shape.e_polygonShape);
    b2.Settings.b2Assert(b.GetType()==b2.Shape.e_circleShape)
    };

    b2.PolyAndEdgeContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolyAndEdgeContact.prototype,b2.Contact.prototype);
    b2.PolyAndEdgeContact.prototype._super=b2.Contact.prototype;
    b2.PolyAndEdgeContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.PolyAndEdgeContact.prototype.__varz=function(){

    };
    b2.PolyAndEdgeContact.Create=function(){
    return new b2.PolyAndEdgeContact
    };

    b2.PolyAndEdgeContact.Destroy=function(){

    };
    b2.PolyAndEdgeContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    this.b2CollidePolyAndEdge(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };
    b2.PolyAndEdgeContact.prototype.b2CollidePolyAndEdge=function(){

    };

    b2.PolyAndEdgeContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b]);
    b2.Settings.b2Assert(a.GetType()==b2.Shape.e_polygonShape);
    b2.Settings.b2Assert(b.GetType()==b2.Shape.e_edgeShape)
    };
    b2.PolygonContact=function(){
    b2.Contact.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PolygonContact.prototype,b2.Contact.prototype);
    b2.PolygonContact.prototype._super=b2.Contact.prototype;

    b2.PolygonContact.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.PolygonContact.prototype.__varz=function(){

    };
    b2.PolygonContact.Create=function(){
    return new b2.PolygonContact
    };
    b2.PolygonContact.Destroy=function(){

    };
    b2.PolygonContact.prototype.Evaluate=function(){
    var a=this.m_fixtureA.GetBody(),b=this.m_fixtureB.GetBody();
    b2.Collision.CollidePolygons(this.m_manifold,this.m_fixtureA.GetShape(),a.m_xf,this.m_fixtureB.GetShape(),b.m_xf)
    };

    b2.PolygonContact.prototype.Reset=function(a,b){
    this._super.Reset.apply(this,[a,b])
    };
    b2.PositionSolverManifold=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.PositionSolverManifold.prototype.__constructor=function(){
    this.m_normal=new b2.Vec2;
    this.m_separations=Array(b2.Settings.b2_maxManifoldPoints);
    this.m_points=Array(b2.Settings.b2_maxManifoldPoints);
    for(var a=0;
        a<b2.Settings.b2_maxManifoldPoints;
        a++)this.m_points[a]=new b2.Vec2
    };

    b2.PositionSolverManifold.prototype.__varz=function(){

    };
    b2.PositionSolverManifold.circlePointA=new b2.Vec2;
    b2.PositionSolverManifold.circlePointB=new b2.Vec2;

    b2.PositionSolverManifold.prototype.Initialize=function(a){
    b2.Settings.b2Assert(a.pointCount>0);
    var b=0,c,d,e,h,g;
    switch(a.type){
    case b2.Manifold.e_circles:e=a.bodyA.m_xf.R;
        d=a.localPoint;
        b=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        c=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        e=a.bodyB.m_xf.R;
        d=a.points[0].localPoint;
        h=a.bodyB.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        e=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        d=h-b;
        g=e-c;
        var f=d*d+g*g;
        f>Number.MIN_VALUE*Number.MIN_VALUE?
        (f=Math.sqrt(f),this.m_normal.x=d/f,this.m_normal.y=g/f):(this.m_normal.x=1,this.m_normal.y=0);
        this.m_points[0].x=0.5*(b+h);
        this.m_points[0].y=0.5*(c+e);
        this.m_separations[0]=d*this.m_normal.x+g*this.m_normal.y-a.radius;
        break;
    case b2.Manifold.e_faceA:e=a.bodyA.m_xf.R;
        d=a.localPlaneNormal;
        this.m_normal.x=e.col1.x*d.x+e.col2.x*d.y;
        this.m_normal.y=e.col1.y*d.x+e.col2.y*d.y;
        e=a.bodyA.m_xf.R;
        d=a.localPoint;
        h=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y);
        g=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*
                       d.y);
        e=a.bodyB.m_xf.R;
        for(b=0;
        b<a.pointCount;
        ++b)d=a.points[b].localPoint,c=a.bodyB.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y),d=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y),this.m_separations[b]=(c-h)*this.m_normal.x+(d-g)*this.m_normal.y-a.radius,this.m_points[b].x=c,this.m_points[b].y=d;
        break;
    case b2.Manifold.e_faceB:e=a.bodyB.m_xf.R;
        d=a.localPlaneNormal;
        this.m_normal.x=e.col1.x*d.x+e.col2.x*d.y;
        this.m_normal.y=e.col1.y*d.x+e.col2.y*d.y;
        e=a.bodyB.m_xf.R;
        d=a.localPoint;
        h=a.bodyB.m_xf.position.x+
        (e.col1.x*d.x+e.col2.x*d.y);
        g=a.bodyB.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y);
        e=a.bodyA.m_xf.R;
        for(b=0;
        b<a.pointCount;
        ++b)d=a.points[b].localPoint,c=a.bodyA.m_xf.position.x+(e.col1.x*d.x+e.col2.x*d.y),d=a.bodyA.m_xf.position.y+(e.col1.y*d.x+e.col2.y*d.y),this.m_separations[b]=(c-h)*this.m_normal.x+(d-g)*this.m_normal.y-a.radius,this.m_points[b].Set(c,d);
        this.m_normal.x*=-1;
        this.m_normal.y*=-1}
    };
    b2.PositionSolverManifold.prototype.m_normal=null;
    b2.PositionSolverManifold.prototype.m_points=null;

    b2.PositionSolverManifold.prototype.m_separations=null;
    b2.BuoyancyController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.BuoyancyController.prototype,b2.Controller.prototype);
    b2.BuoyancyController.prototype._super=b2.Controller.prototype;
    b2.BuoyancyController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };

    b2.BuoyancyController.prototype.__varz=function(){
    this.normal=new b2.Vec2(0,-1);
    this.velocity=new b2.Vec2(0,0)
    };

    b2.BuoyancyController.prototype.Step=function(){
    if(m_bodyList){
        if(this.useWorldGravity)this.gravity=this.GetWorld().GetGravity().Copy();
        for(var a=m_bodyList;
        a;
        a=a.nextBody){
        var b=a.body;
        if(b.IsAwake()!=!1){
            for(var c=new b2.Vec2,d=new b2.Vec2,e=0,h=0,g=b.GetFixtureList();
            g;
            g=g.GetNext()){
            var f=new b2.Vec2,i=g.GetShape().ComputeSubmergedArea(this.normal,this.offset,b.GetTransform(),f);
            e+=i;
            c.x+=i*f.x;
            c.y+=i*f.y;
            h+=i*1;
            d.x+=i*f.x*1;
            d.y+=i*f.y*1}c.x/=e;
            c.y/=e;
            d.x/=h;
            d.y/=h;
            e<Number.MIN_VALUE||(h=this.gravity.GetNegative(),
                     h.Multiply(this.density*e),b.ApplyForce(h,d),d=b.GetLinearVelocityFromWorldPoint(c),d.Subtract(this.velocity),d.Multiply(-this.linearDrag*e),b.ApplyForce(d,c),b.ApplyTorque(-b.GetInertia()/b.GetMass()*e*b.GetAngularVelocity()*this.angularDrag))}}}
    };

    b2.BuoyancyController.prototype.Draw=function(a){
    var b=new b2.Vec2,c=new b2.Vec2;
    b.x=this.normal.x*this.offset+this.normal.y*1E3;
    b.y=this.normal.y*this.offset-this.normal.x*1E3;
    c.x=this.normal.x*this.offset-this.normal.y*1E3;
    c.y=this.normal.y*this.offset+this.normal.x*1E3;
    var d=new b2.Color(0,0,1);
    a.DrawSegment(b,c,d)
    };
    b2.BuoyancyController.prototype.normal=new b2.Vec2(0,-1);
    b2.BuoyancyController.prototype.offset=0;
    b2.BuoyancyController.prototype.density=0;

    b2.BuoyancyController.prototype.velocity=new b2.Vec2(0,0);
    b2.BuoyancyController.prototype.linearDrag=2;
    b2.BuoyancyController.prototype.angularDrag=1;
    b2.BuoyancyController.prototype.useDensity=!1;
    b2.BuoyancyController.prototype.useWorldGravity=!0;
    b2.BuoyancyController.prototype.gravity=null;
    b2.ConstantAccelController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.ConstantAccelController.prototype,b2.Controller.prototype);

    b2.ConstantAccelController.prototype._super=b2.Controller.prototype;
    b2.ConstantAccelController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.ConstantAccelController.prototype.__varz=function(){
    this.A=new b2.Vec2(0,0)
    };

    b2.ConstantAccelController.prototype.Step=function(a){
    for(var a=new b2.Vec2(this.A.x*a.dt,this.A.y*a.dt),b=m_bodyList;
        b;
        b=b.nextBody){
        var c=b.body;
        c.IsAwake()&&c.SetLinearVelocity(new b2.Vec2(c.GetLinearVelocity().x+a.x,c.GetLinearVelocity().y+a.y))}
    };
    b2.ConstantAccelController.prototype.A=new b2.Vec2(0,0);
    b2.ConstantForceController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.ConstantForceController.prototype,b2.Controller.prototype);

    b2.ConstantForceController.prototype._super=b2.Controller.prototype;
    b2.ConstantForceController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.ConstantForceController.prototype.__varz=function(){
    this.F=new b2.Vec2(0,0)
    };
    b2.ConstantForceController.prototype.Step=function(){
    for(var a=m_bodyList;
        a;
        a=a.nextBody){
        var b=a.body;
        b.IsAwake()&&b.ApplyForce(this.F,b.GetWorldCenter())}
    };
    b2.ConstantForceController.prototype.F=new b2.Vec2(0,0);

    b2.Controller=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.Controller.prototype.__constructor=function(){

    };
    b2.Controller.prototype.__varz=function(){

    };
    b2.Controller.prototype.Step=function(){

    };
    b2.Controller.prototype.Draw=function(){

    };

    b2.Controller.prototype.AddBody=function(a){
    var b=new b2.ControllerEdge;
    b.controller=this;
    b.body=a;
    b.nextBody=m_bodyList;
    b.prevBody=null;
    m_bodyList=b;
    if(b.nextBody)b.nextBody.prevBody=b;
    m_bodyCount++;
    b.nextController=a.m_controllerList;
    b.prevController=null;
    a.m_controllerList=b;
    if(b.nextController)b.nextController.prevController=b;
    a.m_controllerCount++
    };

    b2.Controller.prototype.RemoveBody=function(a){
    for(var b=a.m_controllerList;
        b&&b.controller!=this;
       )b=b.nextController;
    if(b.prevBody)b.prevBody.nextBody=b.nextBody;
    if(b.nextBody)b.nextBody.prevBody=b.prevBody;
    if(b.nextController)b.nextController.prevController=b.prevController;
    if(b.prevController)b.prevController.nextController=b.nextController;
    if(m_bodyList==b)m_bodyList=b.nextBody;
    if(a.m_controllerList==b)a.m_controllerList=b.nextController;
    a.m_controllerCount--;
    m_bodyCount--
    };

    b2.Controller.prototype.Clear=function(){
    for(;
        m_bodyList;
       )this.RemoveBody(m_bodyList.body)
    };
    b2.Controller.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Controller.prototype.GetWorld=function(){
    return this.m_world
    };
    b2.Controller.prototype.GetBodyList=function(){
    return m_bodyList
    };
    b2.Controller.prototype.m_next=null;
    b2.Controller.prototype.m_prev=null;
    b2.Controller.prototype.m_world=null;
    b2.ControllerEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.ControllerEdge.prototype.__constructor=function(){

    };
    b2.ControllerEdge.prototype.__varz=function(){

    };
    b2.ControllerEdge.prototype.controller=null;
    b2.ControllerEdge.prototype.body=null;
    b2.ControllerEdge.prototype.prevBody=null;
    b2.ControllerEdge.prototype.nextBody=null;
    b2.ControllerEdge.prototype.prevController=null;
    b2.ControllerEdge.prototype.nextController=null;
    b2.GravityController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.GravityController.prototype,b2.Controller.prototype);
    b2.GravityController.prototype._super=b2.Controller.prototype;
    b2.GravityController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.GravityController.prototype.__varz=function(){

    };

    b2.GravityController.prototype.Step=function(){
    var a=null,b=null,c=null,d=0,e=null,h=null,g=null,f=0,i=0,j=0,f=null;
    if(this.invSqr)for(a=m_bodyList;
               a;
               a=a.nextBody){
        b=a.body;
        c=b.GetWorldCenter();
        d=b.GetMass();
        for(e=m_bodyList;
        e!=a;
        e=e.nextBody)h=e.body,g=h.GetWorldCenter(),f=g.x-c.x,i=g.y-c.y,j=f*f+i*i,j<Number.MIN_VALUE||(f=new b2.Vec2(f,i),f.Multiply(this.G/j/Math.sqrt(j)*d*h.GetMass()),b.IsAwake()&&b.ApplyForce(f,c),f.Multiply(-1),h.IsAwake()&&h.ApplyForce(f,g))}else for(a=m_bodyList;
                                                                                                                                    a;
                                                                                                                                    a=a.nextBody){
            b=
            a.body;
            c=b.GetWorldCenter();
            d=b.GetMass();
            for(e=m_bodyList;
            e!=a;
            e=e.nextBody)h=e.body,g=h.GetWorldCenter(),f=g.x-c.x,i=g.y-c.y,j=f*f+i*i,j<Number.MIN_VALUE||(f=new b2.Vec2(f,i),f.Multiply(this.G/j*d*h.GetMass()),b.IsAwake()&&b.ApplyForce(f,c),f.Multiply(-1),h.IsAwake()&&h.ApplyForce(f,g))}
    };
    b2.GravityController.prototype.G=1;
    b2.GravityController.prototype.invSqr=!0;
    b2.TensorDampingController=function(){
    b2.Controller.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.TensorDampingController.prototype,b2.Controller.prototype);
    b2.TensorDampingController.prototype._super=b2.Controller.prototype;
    b2.TensorDampingController.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments)
    };
    b2.TensorDampingController.prototype.__varz=function(){
    this.T=new b2.Mat22
    };
    b2.TensorDampingController.prototype.SetAxisAligned=function(a,b){
    this.T.col1.x=-a;
    this.T.col1.y=0;
    this.T.col2.x=0;
    this.T.col2.y=-b;
    this.maxTimestep=a>0||b>0?1/Math.max(a,b):0
    };

    b2.TensorDampingController.prototype.Step=function(a){
    a=a.dt;
    if(!(a<=Number.MIN_VALUE)){
        if(a>this.maxTimestep&&this.maxTimestep>0)a=this.maxTimestep;
        for(var b=m_bodyList;
        b;
        b=b.nextBody){
        var c=b.body;
        if(c.IsAwake()){
            var d=c.GetWorldVector(b2.Math.MulMV(this.T,c.GetLocalVector(c.GetLinearVelocity())));
            c.SetLinearVelocity(new b2.Vec2(c.GetLinearVelocity().x+d.x*a,c.GetLinearVelocity().y+d.y*a))}}}
    };
    b2.TensorDampingController.prototype.T=new b2.Mat22;
    b2.TensorDampingController.prototype.maxTimestep=0;

    b2.DistanceJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.DistanceJoint.prototype,b2.Joint.prototype);
    b2.DistanceJoint.prototype._super=b2.Joint.prototype;

    b2.DistanceJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_length=a.length;
    this.m_frequencyHz=a.frequencyHz;
    this.m_dampingRatio=a.dampingRatio;
    this.m_bias=this.m_gamma=this.m_impulse=0
    };
    b2.DistanceJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_u=new b2.Vec2
    };

    b2.DistanceJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchor1.x-d.m_sweep.localCenter.x,g=this.m_localAnchor1.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchor2.x-e.m_sweep.localCenter.x,i=this.m_localAnchor2.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    this.m_u.x=e.m_sweep.c.x+f-d.m_sweep.c.x-h;
    this.m_u.y=e.m_sweep.c.y+i-d.m_sweep.c.y-
        g;
    c=Math.sqrt(this.m_u.x*this.m_u.x+this.m_u.y*this.m_u.y);
    c>b2.Settings.b2_linearSlop?this.m_u.Multiply(1/c):this.m_u.SetZero();
    b=h*this.m_u.y-g*this.m_u.x;
    var j=f*this.m_u.y-i*this.m_u.x;
    b=d.m_invMass+d.m_invI*b*b+e.m_invMass+e.m_invI*j*j;
    this.m_mass=b!=0?1/b:0;
    if(this.m_frequencyHz>0){
        c-=this.m_length;
        var j=2*Math.PI*this.m_frequencyHz,k=this.m_mass*j*j;
        this.m_gamma=a.dt*(2*this.m_mass*this.m_dampingRatio*j+a.dt*k);
        this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0;
        this.m_bias=c*a.dt*k*this.m_gamma;

        this.m_mass=b+this.m_gamma;
        this.m_mass=this.m_mass!=0?1/this.m_mass:0}a.warmStarting?(this.m_impulse*=a.dtRatio,a=this.m_impulse*this.m_u.x,b=this.m_impulse*this.m_u.y,d.m_linearVelocity.x-=d.m_invMass*a,d.m_linearVelocity.y-=d.m_invMass*b,d.m_angularVelocity-=d.m_invI*(h*b-g*a),e.m_linearVelocity.x+=e.m_invMass*a,e.m_linearVelocity.y+=e.m_invMass*b,e.m_angularVelocity+=e.m_invI*(f*b-i*a)):this.m_impulse=0
    };

    b2.DistanceJoint.prototype.SolveVelocityConstraints=function(){
    var a,b=this.m_bodyA,c=this.m_bodyB;
    a=b.m_xf.R;
    var d=this.m_localAnchor1.x-b.m_sweep.localCenter.x,e=this.m_localAnchor1.y-b.m_sweep.localCenter.y,h=a.col1.x*d+a.col2.x*e,e=a.col1.y*d+a.col2.y*e,d=h;
    a=c.m_xf.R;
    var g=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,h=a.col1.x*g+a.col2.x*f,f=a.col1.y*g+a.col2.y*f,g=h,h=-this.m_mass*(this.m_u.x*(c.m_linearVelocity.x+-c.m_angularVelocity*f-(b.m_linearVelocity.x+
                                                                                                                     -b.m_angularVelocity*e))+this.m_u.y*(c.m_linearVelocity.y+c.m_angularVelocity*g-(b.m_linearVelocity.y+b.m_angularVelocity*d))+this.m_bias+this.m_gamma*this.m_impulse);
    this.m_impulse+=h;
    a=h*this.m_u.x;
    h*=this.m_u.y;
    b.m_linearVelocity.x-=b.m_invMass*a;
    b.m_linearVelocity.y-=b.m_invMass*h;
    b.m_angularVelocity-=b.m_invI*(d*h-e*a);
    c.m_linearVelocity.x+=c.m_invMass*a;
    c.m_linearVelocity.y+=c.m_invMass*h;
    c.m_angularVelocity+=c.m_invI*(g*h-f*a)
    };

    b2.DistanceJoint.prototype.SolvePositionConstraints=function(){
    var a;
    if(this.m_frequencyHz>0)return!0;
    var b=this.m_bodyA,c=this.m_bodyB;
    a=b.m_xf.R;
    var d=this.m_localAnchor1.x-b.m_sweep.localCenter.x,e=this.m_localAnchor1.y-b.m_sweep.localCenter.y,h=a.col1.x*d+a.col2.x*e,e=a.col1.y*d+a.col2.y*e,d=h;
    a=c.m_xf.R;
    var g=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,h=a.col1.x*g+a.col2.x*f,f=a.col1.y*g+a.col2.y*f,g=h,h=c.m_sweep.c.x+g-b.m_sweep.c.x-d,i=c.m_sweep.c.y+
        f-b.m_sweep.c.y-e;
    a=Math.sqrt(h*h+i*i);
    h/=a;
    i/=a;
    a-=this.m_length;
    a=b2.Math.Clamp(a,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection);
    var j=-this.m_mass*a;
    this.m_u.Set(h,i);
    h=j*this.m_u.x;
    i=j*this.m_u.y;
    b.m_sweep.c.x-=b.m_invMass*h;
    b.m_sweep.c.y-=b.m_invMass*i;
    b.m_sweep.a-=b.m_invI*(d*i-e*h);
    c.m_sweep.c.x+=c.m_invMass*h;
    c.m_sweep.c.y+=c.m_invMass*i;
    c.m_sweep.a+=c.m_invI*(g*i-f*h);
    b.SynchronizeTransform();
    c.SynchronizeTransform();
    return b2.Math.Abs(a)<b2.Settings.b2_linearSlop
    };

    b2.DistanceJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.DistanceJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2.DistanceJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_u.x,a*this.m_impulse*this.m_u.y)
    };
    b2.DistanceJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.DistanceJoint.prototype.GetLength=function(){
    return this.m_length
    };

    b2.DistanceJoint.prototype.SetLength=function(a){
    this.m_length=a
    };
    b2.DistanceJoint.prototype.GetFrequency=function(){
    return this.m_frequencyHz
    };
    b2.DistanceJoint.prototype.SetFrequency=function(a){
    this.m_frequencyHz=a
    };
    b2.DistanceJoint.prototype.GetDampingRatio=function(){
    return this.m_dampingRatio
    };
    b2.DistanceJoint.prototype.SetDampingRatio=function(a){
    this.m_dampingRatio=a
    };
    b2.DistanceJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.DistanceJoint.prototype.m_localAnchor2=new b2.Vec2;

    b2.DistanceJoint.prototype.m_u=new b2.Vec2;
    b2.DistanceJoint.prototype.m_frequencyHz=null;
    b2.DistanceJoint.prototype.m_dampingRatio=null;
    b2.DistanceJoint.prototype.m_gamma=null;
    b2.DistanceJoint.prototype.m_bias=null;
    b2.DistanceJoint.prototype.m_impulse=null;
    b2.DistanceJoint.prototype.m_mass=null;
    b2.DistanceJoint.prototype.m_length=null;
    b2.DistanceJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.DistanceJointDef.prototype,b2.JointDef.prototype);
    b2.DistanceJointDef.prototype._super=b2.JointDef.prototype;
    b2.DistanceJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_distanceJoint;
    this.length=1;
    this.dampingRatio=this.frequencyHz=0
    };
    b2.DistanceJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };

    b2.DistanceJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
    a=d.x-c.x;
    c=d.y-c.y;
    this.length=Math.sqrt(a*a+c*c);
    this.dampingRatio=this.frequencyHz=0
    };
    b2.DistanceJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.DistanceJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.DistanceJointDef.prototype.length=null;
    b2.DistanceJointDef.prototype.frequencyHz=null;

    b2.DistanceJointDef.prototype.dampingRatio=null;
    b2.FrictionJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.FrictionJoint.prototype,b2.Joint.prototype);
    b2.FrictionJoint.prototype._super=b2.Joint.prototype;

    b2.FrictionJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_linearMass.SetZero();
    this.m_angularMass=0;
    this.m_linearImpulse.SetZero();
    this.m_angularImpulse=0;
    this.m_maxForce=a.maxForce;
    this.m_maxTorque=a.maxTorque
    };
    b2.FrictionJoint.prototype.__varz=function(){
    this.m_localAnchorA=new b2.Vec2;
    this.m_localAnchorB=new b2.Vec2;
    this.m_linearImpulse=new b2.Vec2;
    this.m_linearMass=new b2.Mat22
    };

    b2.FrictionJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchorA.x-d.m_sweep.localCenter.x,g=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchorB.x-e.m_sweep.localCenter.x,i=this.m_localAnchorB.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    b=d.m_invMass;
    c=e.m_invMass;
    var j=d.m_invI,k=e.m_invI,l=new b2.Mat22;
    l.col1.x=
        b+c;
    l.col2.x=0;
    l.col1.y=0;
    l.col2.y=b+c;
    l.col1.x+=j*g*g;
    l.col2.x+=-j*h*g;
    l.col1.y+=-j*h*g;
    l.col2.y+=j*h*h;
    l.col1.x+=k*i*i;
    l.col2.x+=-k*f*i;
    l.col1.y+=-k*f*i;
    l.col2.y+=k*f*f;
    l.GetInverse(this.m_linearMass);
    this.m_angularMass=j+k;
    if(this.m_angularMass>0)this.m_angularMass=1/this.m_angularMass;
    a.warmStarting?(this.m_linearImpulse.x*=a.dtRatio,this.m_linearImpulse.y*=a.dtRatio,this.m_angularImpulse*=a.dtRatio,a=this.m_linearImpulse,d.m_linearVelocity.x-=b*a.x,d.m_linearVelocity.y-=b*a.y,d.m_angularVelocity-=
            j*(h*a.y-g*a.x+this.m_angularImpulse),e.m_linearVelocity.x+=c*a.x,e.m_linearVelocity.y+=c*a.y,e.m_angularVelocity+=k*(f*a.y-i*a.x+this.m_angularImpulse)):(this.m_linearImpulse.SetZero(),this.m_angularImpulse=0)
    };

    b2.FrictionJoint.prototype.SolveVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB,h=d.m_linearVelocity,g=d.m_angularVelocity,f=e.m_linearVelocity,i=e.m_angularVelocity,j=d.m_invMass,k=e.m_invMass,l=d.m_invI,n=e.m_invI;
    b=d.m_xf.R;
    var m=this.m_localAnchorA.x-d.m_sweep.localCenter.x,o=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*m+b.col2.x*o;
    o=b.col1.y*m+b.col2.y*o;
    m=c;
    b=e.m_xf.R;
    var p=this.m_localAnchorB.x-e.m_sweep.localCenter.x,q=this.m_localAnchorB.y-e.m_sweep.localCenter.y;

    c=b.col1.x*p+b.col2.x*q;
    q=b.col1.y*p+b.col2.y*q;
    p=c;
    c=-this.m_angularMass*(i-g);
    var r=this.m_angularImpulse;
    b=a.dt*this.m_maxTorque;
    this.m_angularImpulse=b2.Math.Clamp(this.m_angularImpulse+c,-b,b);
    c=this.m_angularImpulse-r;
    g-=l*c;
    i+=n*c;
    b=b2.Math.MulMV(this.m_linearMass,new b2.Vec2(-(f.x-i*q-h.x+g*o),-(f.y+i*p-h.y-g*m)));
    c=this.m_linearImpulse.Copy();
    this.m_linearImpulse.Add(b);
    b=a.dt*this.m_maxForce;
    this.m_linearImpulse.LengthSquared()>b*b&&(this.m_linearImpulse.Normalize(),this.m_linearImpulse.Multiply(b));

    b=b2.Math.SubtractVV(this.m_linearImpulse,c);
    h.x-=j*b.x;
    h.y-=j*b.y;
    g-=l*(m*b.y-o*b.x);
    f.x+=k*b.x;
    f.y+=k*b.y;
    i+=n*(p*b.y-q*b.x);
    d.m_angularVelocity=g;
    e.m_angularVelocity=i
    };
    b2.FrictionJoint.prototype.SolvePositionConstraints=function(){
    return!0
    };
    b2.FrictionJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2.FrictionJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };

    b2.FrictionJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_linearImpulse.x,a*this.m_linearImpulse.y)
    };
    b2.FrictionJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_angularImpulse
    };
    b2.FrictionJoint.prototype.SetMaxForce=function(a){
    this.m_maxForce=a
    };
    b2.FrictionJoint.prototype.GetMaxForce=function(){
    return this.m_maxForce
    };
    b2.FrictionJoint.prototype.SetMaxTorque=function(a){
    this.m_maxTorque=a
    };
    b2.FrictionJoint.prototype.GetMaxTorque=function(){
    return this.m_maxTorque
    };

    b2.FrictionJoint.prototype.m_localAnchorA=new b2.Vec2;
    b2.FrictionJoint.prototype.m_localAnchorB=new b2.Vec2;
    b2.FrictionJoint.prototype.m_linearImpulse=new b2.Vec2;
    b2.FrictionJoint.prototype.m_angularImpulse=null;
    b2.FrictionJoint.prototype.m_maxForce=null;
    b2.FrictionJoint.prototype.m_maxTorque=null;
    b2.FrictionJoint.prototype.m_linearMass=new b2.Mat22;
    b2.FrictionJoint.prototype.m_angularMass=null;

    b2.FrictionJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.FrictionJointDef.prototype,b2.JointDef.prototype);
    b2.FrictionJointDef.prototype._super=b2.JointDef.prototype;
    b2.FrictionJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_frictionJoint;
    this.maxTorque=this.maxForce=0
    };

    b2.FrictionJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };
    b2.FrictionJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c))
    };
    b2.FrictionJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.FrictionJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.FrictionJointDef.prototype.maxForce=null;
    b2.FrictionJointDef.prototype.maxTorque=null;

    b2.GearJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GearJoint.prototype,b2.Joint.prototype);
    b2.GearJoint.prototype._super=b2.Joint.prototype;

    b2.GearJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    var b=a.joint1.m_type,c=a.joint2.m_type;
    this.m_prismatic2=this.m_revolute2=this.m_prismatic1=this.m_revolute1=null;
    this.m_ground1=a.joint1.GetBodyA();
    this.m_bodyA=a.joint1.GetBodyB();
    b==b2.Joint.e_revoluteJoint?(this.m_revolute1=a.joint1,this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1),this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2),b=this.m_revolute1.GetJointAngle()):(this.m_prismatic1=
                                                                                                             a.joint1,this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1),this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2),b=this.m_prismatic1.GetJointTranslation());
    this.m_ground2=a.joint2.GetBodyA();
    this.m_bodyB=a.joint2.GetBodyB();
    c==b2.Joint.e_revoluteJoint?(this.m_revolute2=a.joint2,this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1),this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2),c=this.m_revolute2.GetJointAngle()):(this.m_prismatic2=a.joint2,this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1),
                                                                                                             this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2),c=this.m_prismatic2.GetJointTranslation());
    this.m_ratio=a.ratio;
    this.m_constant=b+this.m_ratio*c;
    this.m_impulse=0
    };
    b2.GearJoint.prototype.__varz=function(){
    this.m_groundAnchor1=new b2.Vec2;
    this.m_groundAnchor2=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_J=new b2.Jacobian
    };

    b2.GearJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_ground1,c=this.m_ground2,d=this.m_bodyA,e=this.m_bodyB,h,g,f,i,j,k=0;
    this.m_J.SetZero();
    this.m_revolute1?(this.m_J.angularA=-1,k+=d.m_invI):(i=b.m_xf.R,h=this.m_prismatic1.m_localXAxis1,b=i.col1.x*h.x+i.col2.x*h.y,h=i.col1.y*h.x+i.col2.y*h.y,i=d.m_xf.R,g=this.m_localAnchor1.x-d.m_sweep.localCenter.x,f=this.m_localAnchor1.y-d.m_sweep.localCenter.y,j=i.col1.x*g+i.col2.x*f,f=i.col1.y*g+i.col2.y*f,i=j*h-f*b,this.m_J.linearA.Set(-b,
                                                                                                                                                                                -h),this.m_J.angularA=-i,k+=d.m_invMass+d.m_invI*i*i);
    this.m_revolute2?(this.m_J.angularB=-this.m_ratio,k+=this.m_ratio*this.m_ratio*e.m_invI):(i=c.m_xf.R,h=this.m_prismatic2.m_localXAxis1,b=i.col1.x*h.x+i.col2.x*h.y,h=i.col1.y*h.x+i.col2.y*h.y,i=e.m_xf.R,g=this.m_localAnchor2.x-e.m_sweep.localCenter.x,f=this.m_localAnchor2.y-e.m_sweep.localCenter.y,j=i.col1.x*g+i.col2.x*f,f=i.col1.y*g+i.col2.y*f,i=j*h-f*b,this.m_J.linearB.Set(-this.m_ratio*b,-this.m_ratio*h),this.m_J.angularB=-this.m_ratio*i,k+=
                                                  this.m_ratio*this.m_ratio*(e.m_invMass+e.m_invI*i*i));
    this.m_mass=k>0?1/k:0;
    a.warmStarting?(d.m_linearVelocity.x+=d.m_invMass*this.m_impulse*this.m_J.linearA.x,d.m_linearVelocity.y+=d.m_invMass*this.m_impulse*this.m_J.linearA.y,d.m_angularVelocity+=d.m_invI*this.m_impulse*this.m_J.angularA,e.m_linearVelocity.x+=e.m_invMass*this.m_impulse*this.m_J.linearB.x,e.m_linearVelocity.y+=e.m_invMass*this.m_impulse*this.m_J.linearB.y,e.m_angularVelocity+=e.m_invI*this.m_impulse*this.m_J.angularB):this.m_impulse=
        0
    };

    b2.GearJoint.prototype.SolveVelocityConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=-this.m_mass*this.m_J.Compute(a.m_linearVelocity,a.m_angularVelocity,b.m_linearVelocity,b.m_angularVelocity);
    this.m_impulse+=c;
    a.m_linearVelocity.x+=a.m_invMass*c*this.m_J.linearA.x;
    a.m_linearVelocity.y+=a.m_invMass*c*this.m_J.linearA.y;
    a.m_angularVelocity+=a.m_invI*c*this.m_J.angularA;
    b.m_linearVelocity.x+=b.m_invMass*c*this.m_J.linearB.x;
    b.m_linearVelocity.y+=b.m_invMass*c*this.m_J.linearB.y;
    b.m_angularVelocity+=b.m_invI*
        c*this.m_J.angularB
    };

    b2.GearJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c,d;
    c=this.m_revolute1?this.m_revolute1.GetJointAngle():this.m_prismatic1.GetJointTranslation();
    d=this.m_revolute2?this.m_revolute2.GetJointAngle():this.m_prismatic2.GetJointTranslation();
    c=-this.m_mass*(this.m_constant-(c+this.m_ratio*d));
    a.m_sweep.c.x+=a.m_invMass*c*this.m_J.linearA.x;
    a.m_sweep.c.y+=a.m_invMass*c*this.m_J.linearA.y;
    a.m_sweep.a+=a.m_invI*c*this.m_J.angularA;
    b.m_sweep.c.x+=b.m_invMass*c*this.m_J.linearB.x;

    b.m_sweep.c.y+=b.m_invMass*c*this.m_J.linearB.y;
    b.m_sweep.a+=b.m_invI*c*this.m_J.angularB;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return 0<b2.Settings.b2_linearSlop
    };
    b2.GearJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.GearJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.GearJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_J.linearB.x,a*this.m_impulse*this.m_J.linearB.y)
    };
    b2.GearJoint.prototype.GetReactionTorque=function(a){
    var b=this.m_bodyB.m_xf.R,c=this.m_localAnchor1.x-this.m_bodyB.m_sweep.localCenter.x,d=this.m_localAnchor1.y-this.m_bodyB.m_sweep.localCenter.y,e=b.col1.x*c+b.col2.x*d,d=b.col1.y*c+b.col2.y*d;
    return a*(this.m_impulse*this.m_J.angularB-e*this.m_impulse*this.m_J.linearB.y+d*this.m_impulse*this.m_J.linearB.x)
    };

    b2.GearJoint.prototype.GetRatio=function(){
    return this.m_ratio
    };
    b2.GearJoint.prototype.SetRatio=function(a){
    this.m_ratio=a
    };
    b2.GearJoint.prototype.m_ground1=null;
    b2.GearJoint.prototype.m_ground2=null;
    b2.GearJoint.prototype.m_revolute1=null;
    b2.GearJoint.prototype.m_prismatic1=null;
    b2.GearJoint.prototype.m_revolute2=null;
    b2.GearJoint.prototype.m_prismatic2=null;
    b2.GearJoint.prototype.m_groundAnchor1=new b2.Vec2;
    b2.GearJoint.prototype.m_groundAnchor2=new b2.Vec2;

    b2.GearJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.GearJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.GearJoint.prototype.m_J=new b2.Jacobian;
    b2.GearJoint.prototype.m_constant=null;
    b2.GearJoint.prototype.m_ratio=null;
    b2.GearJoint.prototype.m_mass=null;
    b2.GearJoint.prototype.m_impulse=null;
    b2.GearJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.GearJointDef.prototype,b2.JointDef.prototype);

    b2.GearJointDef.prototype._super=b2.JointDef.prototype;
    b2.GearJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_gearJoint;
    this.joint2=this.joint1=null;
    this.ratio=1
    };
    b2.GearJointDef.prototype.__varz=function(){

    };
    b2.GearJointDef.prototype.joint1=null;
    b2.GearJointDef.prototype.joint2=null;
    b2.GearJointDef.prototype.ratio=null;
    b2.Jacobian=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Jacobian.prototype.__constructor=function(){

    };
    b2.Jacobian.prototype.__varz=function(){
    this.linearA=new b2.Vec2;
    this.linearB=new b2.Vec2
    };
    b2.Jacobian.prototype.SetZero=function(){
    this.linearA.SetZero();
    this.angularA=0;
    this.linearB.SetZero();
    this.angularB=0
    };
    b2.Jacobian.prototype.Set=function(a,b,c,d){
    this.linearA.SetV(a);
    this.angularA=b;
    this.linearB.SetV(c);
    this.angularB=d
    };

    b2.Jacobian.prototype.Compute=function(a,b,c,d){
    return this.linearA.x*a.x+this.linearA.y*a.y+this.angularA*b+(this.linearB.x*c.x+this.linearB.y*c.y)+this.angularB*d
    };
    b2.Jacobian.prototype.linearA=new b2.Vec2;
    b2.Jacobian.prototype.angularA=null;
    b2.Jacobian.prototype.linearB=new b2.Vec2;
    b2.Jacobian.prototype.angularB=null;
    b2.Joint=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    b2.Joint.prototype.__constructor=function(a){
    b2.Settings.b2Assert(a.bodyA!=a.bodyB);
    this.m_type=a.type;
    this.m_next=this.m_prev=null;
    this.m_bodyA=a.bodyA;
    this.m_bodyB=a.bodyB;
    this.m_collideConnected=a.collideConnected;
    this.m_islandFlag=!1;
    this.m_userData=a.userData
    };
    b2.Joint.prototype.__varz=function(){
    this.m_edgeA=new b2.JointEdge;
    this.m_edgeB=new b2.JointEdge;
    this.m_localCenterA=new b2.Vec2;
    this.m_localCenterB=new b2.Vec2
    };

    b2.Joint.Create=function(a){
    var b=null;
    switch(a.type){
    case b2.Joint.e_distanceJoint:b=new b2.DistanceJoint(a);
        break;
    case b2.Joint.e_mouseJoint:b=new b2.MouseJoint(a);
        break;
    case b2.Joint.e_prismaticJoint:b=new b2.PrismaticJoint(a);
        break;
    case b2.Joint.e_revoluteJoint:b=new b2.RevoluteJoint(a);
        break;
    case b2.Joint.e_pulleyJoint:b=new b2.PulleyJoint(a);
        break;
    case b2.Joint.e_gearJoint:b=new b2.GearJoint(a);
        break;
    case b2.Joint.e_lineJoint:b=new b2.LineJoint(a);
        break;
    case b2.Joint.e_weldJoint:b=new b2.WeldJoint(a);

        break;
    case b2.Joint.e_frictionJoint:b=new b2.FrictionJoint(a)}return b
    };
    b2.Joint.Destroy=function(){

    };
    b2.Joint.e_unknownJoint=0;
    b2.Joint.e_revoluteJoint=1;
    b2.Joint.e_prismaticJoint=2;
    b2.Joint.e_distanceJoint=3;
    b2.Joint.e_pulleyJoint=4;
    b2.Joint.e_mouseJoint=5;
    b2.Joint.e_gearJoint=6;
    b2.Joint.e_lineJoint=7;
    b2.Joint.e_weldJoint=8;
    b2.Joint.e_frictionJoint=9;
    b2.Joint.e_inactiveLimit=0;
    b2.Joint.e_atLowerLimit=1;
    b2.Joint.e_atUpperLimit=2;
    b2.Joint.e_equalLimits=3;

    b2.Joint.prototype.InitVelocityConstraints=function(){

    };
    b2.Joint.prototype.SolveVelocityConstraints=function(){

    };
    b2.Joint.prototype.FinalizeVelocityConstraints=function(){

    };
    b2.Joint.prototype.SolvePositionConstraints=function(){
    return!1
    };
    b2.Joint.prototype.GetType=function(){
    return this.m_type
    };
    b2.Joint.prototype.GetAnchorA=function(){
    return null
    };
    b2.Joint.prototype.GetAnchorB=function(){
    return null
    };
    b2.Joint.prototype.GetReactionForce=function(){
    return null
    };

    b2.Joint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.Joint.prototype.GetBodyA=function(){
    return this.m_bodyA
    };
    b2.Joint.prototype.GetBodyB=function(){
    return this.m_bodyB
    };
    b2.Joint.prototype.GetNext=function(){
    return this.m_next
    };
    b2.Joint.prototype.GetUserData=function(){
    return this.m_userData
    };
    b2.Joint.prototype.SetUserData=function(a){
    this.m_userData=a
    };
    b2.Joint.prototype.IsActive=function(){
    return this.m_bodyA.IsActive()&&this.m_bodyB.IsActive()
    };
    b2.Joint.prototype.m_type=0;

    b2.Joint.prototype.m_prev=null;
    b2.Joint.prototype.m_next=null;
    b2.Joint.prototype.m_edgeA=new b2.JointEdge;
    b2.Joint.prototype.m_edgeB=new b2.JointEdge;
    b2.Joint.prototype.m_bodyA=null;
    b2.Joint.prototype.m_bodyB=null;
    b2.Joint.prototype.m_islandFlag=null;
    b2.Joint.prototype.m_collideConnected=null;
    b2.Joint.prototype.m_userData=null;
    b2.Joint.prototype.m_localCenterA=new b2.Vec2;
    b2.Joint.prototype.m_localCenterB=new b2.Vec2;
    b2.Joint.prototype.m_invMassA=null;
    b2.Joint.prototype.m_invMassB=null;

    b2.Joint.prototype.m_invIA=null;
    b2.Joint.prototype.m_invIB=null;
    b2.JointDef=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.JointDef.prototype.__constructor=function(){
    this.type=b2.Joint.e_unknownJoint;
    this.bodyB=this.bodyA=this.userData=null;
    this.collideConnected=!1
    };
    b2.JointDef.prototype.__varz=function(){

    };
    b2.JointDef.prototype.type=0;
    b2.JointDef.prototype.userData=null;
    b2.JointDef.prototype.bodyA=null;
    b2.JointDef.prototype.bodyB=null;

    b2.JointDef.prototype.collideConnected=null;
    b2.JointEdge=function(){
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    b2.JointEdge.prototype.__constructor=function(){

    };
    b2.JointEdge.prototype.__varz=function(){

    };
    b2.JointEdge.prototype.other=null;
    b2.JointEdge.prototype.joint=null;
    b2.JointEdge.prototype.prev=null;
    b2.JointEdge.prototype.next=null;
    b2.LineJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.LineJoint.prototype,b2.Joint.prototype);

    b2.LineJoint.prototype._super=b2.Joint.prototype;

    b2.LineJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x=-this.m_localXAxis1.y;
    this.m_localYAxis1.y=this.m_localXAxis1.x;
    this.m_impulse.SetZero();
    this.m_motorImpulse=this.m_motorMass=0;
    this.m_lowerTranslation=a.lowerTranslation;
    this.m_upperTranslation=a.upperTranslation;
    this.m_maxMotorForce=a.maxMotorForce;
    this.m_motorSpeed=
        a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
    };
    b2.LineJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_localXAxis1=new b2.Vec2;
    this.m_localYAxis1=new b2.Vec2;
    this.m_axis=new b2.Vec2;
    this.m_perp=new b2.Vec2;
    this.m_K=new b2.Mat22;
    this.m_impulse=new b2.Vec2
    };

    b2.LineJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    this.m_localCenterA.SetV(b.GetLocalCenter());
    this.m_localCenterB.SetV(c.GetLocalCenter());
    var h=b.GetTransform();
    c.GetTransform();
    d=b.m_xf.R;
    var g=this.m_localAnchor1.x-this.m_localCenterA.x,f=this.m_localAnchor1.y-this.m_localCenterA.y;
    e=d.col1.x*g+d.col2.x*f;
    f=d.col1.y*g+d.col2.y*f;
    g=e;
    d=c.m_xf.R;
    var i=this.m_localAnchor2.x-this.m_localCenterB.x,j=this.m_localAnchor2.y-this.m_localCenterB.y;
    e=d.col1.x*
        i+d.col2.x*j;
    j=d.col1.y*i+d.col2.y*j;
    i=e;
    d=c.m_sweep.c.x+i-b.m_sweep.c.x-g;
    e=c.m_sweep.c.y+j-b.m_sweep.c.y-f;
    this.m_invMassA=b.m_invMass;
    this.m_invMassB=c.m_invMass;
    this.m_invIA=b.m_invI;
    this.m_invIB=c.m_invI;
    this.m_axis.SetV(b2.Math.MulMV(h.R,this.m_localXAxis1));
    this.m_a1=(d+g)*this.m_axis.y-(e+f)*this.m_axis.x;
    this.m_a2=i*this.m_axis.y-j*this.m_axis.x;
    this.m_motorMass=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_a1*this.m_a1+this.m_invIB*this.m_a2*this.m_a2;
    this.m_motorMass=this.m_motorMass>
        Number.MIN_VALUE?1/this.m_motorMass:0;
    this.m_perp.SetV(b2.Math.MulMV(h.R,this.m_localYAxis1));
    this.m_s1=(d+g)*this.m_perp.y-(e+f)*this.m_perp.x;
    this.m_s2=i*this.m_perp.y-j*this.m_perp.x;
    h=this.m_invMassA;
    g=this.m_invMassB;
    f=this.m_invIA;
    i=this.m_invIB;
    this.m_K.col1.x=h+g+f*this.m_s1*this.m_s1+i*this.m_s2*this.m_s2;
    this.m_K.col1.y=f*this.m_s1*this.m_a1+i*this.m_s2*this.m_a2;
    this.m_K.col2.x=this.m_K.col1.y;
    this.m_K.col2.y=h+g+f*this.m_a1*this.m_a1+i*this.m_a2*this.m_a2;
    if(this.m_enableLimit)if(d=this.m_axis.x*
                 d+this.m_axis.y*e,b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop)this.m_limitState=b2.Joint.e_equalLimits;
    else if(d<=this.m_lowerTranslation){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_limitState=b2.Joint.e_atLowerLimit,this.m_impulse.y=0}else if(d>=this.m_upperTranslation){
        if(this.m_limitState!=b2.Joint.e_atUpperLimit)this.m_limitState=b2.Joint.e_atUpperLimit,this.m_impulse.y=0}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.y=0;

    else this.m_limitState=b2.Joint.e_inactiveLimit;
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=a.dtRatio,a=this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.x,d=this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.y,e=this.m_impulse.x*this.m_s1+(this.m_motorImpulse+this.m_impulse.y)*this.m_a1,h=this.m_impulse.x*this.m_s2+(this.m_motorImpulse+this.m_impulse.y)*
            this.m_a2,b.m_linearVelocity.x-=this.m_invMassA*a,b.m_linearVelocity.y-=this.m_invMassA*d,b.m_angularVelocity-=this.m_invIA*e,c.m_linearVelocity.x+=this.m_invMassB*a,c.m_linearVelocity.y+=this.m_invMassB*d,c.m_angularVelocity+=this.m_invIB*h):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.LineJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d=b.m_linearVelocity,e=b.m_angularVelocity,h=c.m_linearVelocity,g=c.m_angularVelocity,f,i,j;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)j=this.m_motorMass*(this.m_motorSpeed-(this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e)),f=this.m_motorImpulse,a=a.dt*this.m_maxMotorForce,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+j,-a,a),j=this.m_motorImpulse-f,f=
        j*this.m_axis.x,a=j*this.m_axis.y,i=j*this.m_a1,j*=this.m_a2,d.x-=this.m_invMassA*f,d.y-=this.m_invMassA*a,e-=this.m_invIA*i,h.x+=this.m_invMassB*f,h.y+=this.m_invMassB*a,g+=this.m_invIB*j;
    a=this.m_perp.x*(h.x-d.x)+this.m_perp.y*(h.y-d.y)+this.m_s2*g-this.m_s1*e;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        i=this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e;
        f=this.m_impulse.Copy();
        j=this.m_K.Solve(new b2.Vec2,-a,-i);
        this.m_impulse.Add(j);
        if(this.m_limitState==
           b2.Joint.e_atLowerLimit)this.m_impulse.y=b2.Math.Max(this.m_impulse.y,0);
        else if(this.m_limitState==b2.Joint.e_atUpperLimit)this.m_impulse.y=b2.Math.Min(this.m_impulse.y,0);
        a=-a-(this.m_impulse.y-f.y)*this.m_K.col2.x;
        this.m_impulse.x=this.m_K.col1.x!=0?a/this.m_K.col1.x+f.x:f.x;
        j.x=this.m_impulse.x-f.x;
        j.y=this.m_impulse.y-f.y;
        f=j.x*this.m_perp.x+j.y*this.m_axis.x;
        a=j.x*this.m_perp.y+j.y*this.m_axis.y;
        i=j.x*this.m_s1+j.y*this.m_a1;
        j=j.x*this.m_s2+j.y*this.m_a2}else j=this.m_K.col1.x!=0?-a/this.m_K.col1.x:
        0,this.m_impulse.x+=j,f=j*this.m_perp.x,a=j*this.m_perp.y,i=j*this.m_s1,j*=this.m_s2;
    d.x-=this.m_invMassA*f;
    d.y-=this.m_invMassA*a;
    e-=this.m_invIA*i;
    h.x+=this.m_invMassB*f;
    h.y+=this.m_invMassB*a;
    g+=this.m_invIB*j;
    b.m_linearVelocity.SetV(d);
    b.m_angularVelocity=e;
    c.m_linearVelocity.SetV(h);
    c.m_angularVelocity=g
    };

    b2.LineJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.m_sweep.c,d=a.m_sweep.a,e=b.m_sweep.c,h=b.m_sweep.a,g,f,i,j,k,l=0,n=0;
    i=!1;
    var m=0,o=b2.Mat22.FromAngle(d);
    j=b2.Mat22.FromAngle(h);
    g=o;
    var n=this.m_localAnchor1.x-this.m_localCenterA.x,p=this.m_localAnchor1.y-this.m_localCenterA.y;
    f=g.col1.x*n+g.col2.x*p;
    p=g.col1.y*n+g.col2.y*p;
    n=f;
    g=j;
    j=this.m_localAnchor2.x-this.m_localCenterB.x;
    k=this.m_localAnchor2.y-this.m_localCenterB.y;
    f=g.col1.x*j+g.col2.x*k;
    k=
        g.col1.y*j+g.col2.y*k;
    j=f;
    g=e.x+j-c.x-n;
    f=e.y+k-c.y-p;
    if(this.m_enableLimit){
        this.m_axis=b2.Math.MulMV(o,this.m_localXAxis1);
        this.m_a1=(g+n)*this.m_axis.y-(f+p)*this.m_axis.x;
        this.m_a2=j*this.m_axis.y-k*this.m_axis.x;
        var q=this.m_axis.x*g+this.m_axis.y*f;
        b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop?(m=b2.Math.Clamp(q,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection),l=b2.Math.Abs(q),i=!0):q<=this.m_lowerTranslation?(m=b2.Math.Clamp(q-
                                                                                                                                   this.m_lowerTranslation+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),l=this.m_lowerTranslation-q,i=!0):q>=this.m_upperTranslation&&(m=b2.Math.Clamp(q-this.m_upperTranslation+b2.Settings.b2_linearSlop,0,b2.Settings.b2_maxLinearCorrection),l=q-this.m_upperTranslation,i=!0)}this.m_perp=b2.Math.MulMV(o,this.m_localYAxis1);
    this.m_s1=(g+n)*this.m_perp.y-(f+p)*this.m_perp.x;
    this.m_s2=j*this.m_perp.y-k*this.m_perp.x;
    o=new b2.Vec2;
    p=this.m_perp.x*g+this.m_perp.y*f;
    l=b2.Math.Max(l,b2.Math.Abs(p));

    n=0;
    i?(i=this.m_invMassA,j=this.m_invMassB,k=this.m_invIA,g=this.m_invIB,this.m_K.col1.x=i+j+k*this.m_s1*this.m_s1+g*this.m_s2*this.m_s2,this.m_K.col1.y=k*this.m_s1*this.m_a1+g*this.m_s2*this.m_a2,this.m_K.col2.x=this.m_K.col1.y,this.m_K.col2.y=i+j+k*this.m_a1*this.m_a1+g*this.m_a2*this.m_a2,this.m_K.Solve(o,-p,-m)):(i=this.m_invMassA,j=this.m_invMassB,k=this.m_invIA,g=this.m_invIB,m=i+j+k*this.m_s1*this.m_s1+g*this.m_s2*this.m_s2,o.x=m!=0?-p/m:0,o.y=0);
    m=o.x*this.m_perp.x+o.y*this.m_axis.x;
    i=o.x*
        this.m_perp.y+o.y*this.m_axis.y;
    p=o.x*this.m_s1+o.y*this.m_a1;
    o=o.x*this.m_s2+o.y*this.m_a2;
    c.x-=this.m_invMassA*m;
    c.y-=this.m_invMassA*i;
    d-=this.m_invIA*p;
    e.x+=this.m_invMassB*m;
    e.y+=this.m_invMassB*i;
    h+=this.m_invIB*o;
    a.m_sweep.a=d;
    b.m_sweep.a=h;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return l<=b2.Settings.b2_linearSlop&&n<=b2.Settings.b2_angularSlop
    };
    b2.LineJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };

    b2.LineJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2.LineJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*(this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.x),a*(this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.y)*this.m_axis.y))
    };
    b2.LineJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.y
    };

    b2.LineJoint.prototype.GetJointTranslation=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.GetWorldPoint(this.m_localAnchor1),d=b.GetWorldPoint(this.m_localAnchor2),b=d.x-c.x,c=d.y-c.y,a=a.GetWorldVector(this.m_localXAxis1);
    return a.x*b+a.y*c
    };

    b2.LineJoint.prototype.GetJointSpeed=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h;
    c=b.m_sweep.c.x+g-(a.m_sweep.c.x+d);
    var h=b.m_sweep.c.y+f-(a.m_sweep.c.y+e),i=a.GetWorldVector(this.m_localXAxis1),
    j=a.m_linearVelocity,k=b.m_linearVelocity,a=a.m_angularVelocity,b=b.m_angularVelocity;
    return c*-a*i.y+h*a*i.x+(i.x*(k.x+-b*f-j.x- -a*e)+i.y*(k.y+b*g-j.y-a*d))
    };
    b2.LineJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };
    b2.LineJoint.prototype.EnableLimit=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit=a
    };
    b2.LineJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerTranslation
    };
    b2.LineJoint.prototype.GetUpperLimit=function(){
    return this.m_upperTranslation
    };

    b2.LineJoint.prototype.SetLimits=function(a,b){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation=a;
    this.m_upperTranslation=b
    };
    b2.LineJoint.prototype.IsMotorEnabled=function(){
    return this.m_enableMotor
    };
    b2.LineJoint.prototype.EnableMotor=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor=a
    };
    b2.LineJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };

    b2.LineJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.LineJoint.prototype.SetMaxMotorForce=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce=a
    };
    b2.LineJoint.prototype.GetMaxMotorForce=function(){
    return this.m_maxMotorForce
    };
    b2.LineJoint.prototype.GetMotorForce=function(){
    return this.m_motorImpulse
    };
    b2.LineJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.LineJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.LineJoint.prototype.m_localXAxis1=new b2.Vec2;

    b2.LineJoint.prototype.m_localYAxis1=new b2.Vec2;
    b2.LineJoint.prototype.m_axis=new b2.Vec2;
    b2.LineJoint.prototype.m_perp=new b2.Vec2;
    b2.LineJoint.prototype.m_s1=null;
    b2.LineJoint.prototype.m_s2=null;
    b2.LineJoint.prototype.m_a1=null;
    b2.LineJoint.prototype.m_a2=null;
    b2.LineJoint.prototype.m_K=new b2.Mat22;
    b2.LineJoint.prototype.m_impulse=new b2.Vec2;
    b2.LineJoint.prototype.m_motorMass=null;
    b2.LineJoint.prototype.m_motorImpulse=null;
    b2.LineJoint.prototype.m_lowerTranslation=null;

    b2.LineJoint.prototype.m_upperTranslation=null;
    b2.LineJoint.prototype.m_maxMotorForce=null;
    b2.LineJoint.prototype.m_motorSpeed=null;
    b2.LineJoint.prototype.m_enableLimit=null;
    b2.LineJoint.prototype.m_enableMotor=null;
    b2.LineJoint.prototype.m_limitState=0;
    b2.LineJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.LineJointDef.prototype,b2.JointDef.prototype);
    b2.LineJointDef.prototype._super=b2.JointDef.prototype;

    b2.LineJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_lineJoint;
    this.localAxisA.Set(1,0);
    this.enableLimit=!1;
    this.upperTranslation=this.lowerTranslation=0;
    this.enableMotor=!1;
    this.motorSpeed=this.maxMotorForce=0
    };
    b2.LineJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2;
    this.localAxisA=new b2.Vec2
    };

    b2.LineJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.localAxisA=this.bodyA.GetLocalVector(d)
    };
    b2.LineJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.LineJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.LineJointDef.prototype.localAxisA=new b2.Vec2;
    b2.LineJointDef.prototype.enableLimit=null;
    b2.LineJointDef.prototype.lowerTranslation=null;

    b2.LineJointDef.prototype.upperTranslation=null;
    b2.LineJointDef.prototype.enableMotor=null;
    b2.LineJointDef.prototype.maxMotorForce=null;
    b2.LineJointDef.prototype.motorSpeed=null;
    b2.MouseJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.MouseJoint.prototype,b2.Joint.prototype);
    b2.MouseJoint.prototype._super=b2.Joint.prototype;

    b2.MouseJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_target.SetV(a.target);
    var b=this.m_target.x-this.m_bodyB.m_xf.position.x,c=this.m_target.y-this.m_bodyB.m_xf.position.y,d=this.m_bodyB.m_xf.R;
    this.m_localAnchor.x=b*d.col1.x+c*d.col1.y;
    this.m_localAnchor.y=b*d.col2.x+c*d.col2.y;
    this.m_maxForce=a.maxForce;
    this.m_impulse.SetZero();
    this.m_frequencyHz=a.frequencyHz;
    this.m_dampingRatio=a.dampingRatio;
    this.m_gamma=this.m_beta=0
    };

    b2.MouseJoint.prototype.__varz=function(){
    this.K=new b2.Mat22;
    this.K1=new b2.Mat22;
    this.K2=new b2.Mat22;
    this.m_localAnchor=new b2.Vec2;
    this.m_target=new b2.Vec2;
    this.m_impulse=new b2.Vec2;
    this.m_mass=new b2.Mat22;
    this.m_C=new b2.Vec2
    };

    b2.MouseJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyB,c=b.GetMass(),d=2*Math.PI*this.m_frequencyHz,e=c*d*d;
    this.m_gamma=a.dt*(2*c*this.m_dampingRatio*d+a.dt*e);
    this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0;
    this.m_beta=a.dt*e*this.m_gamma;
    var e=b.m_xf.R,c=this.m_localAnchor.x-b.m_sweep.localCenter.x,d=this.m_localAnchor.y-b.m_sweep.localCenter.y,h=e.col1.x*c+e.col2.x*d,d=e.col1.y*c+e.col2.y*d,c=h,e=b.m_invMass,h=b.m_invI;
    this.K1.col1.x=e;
    this.K1.col2.x=0;
    this.K1.col1.y=0;
    this.K1.col2.y=
        e;
    this.K2.col1.x=h*d*d;
    this.K2.col2.x=-h*c*d;
    this.K2.col1.y=-h*c*d;
    this.K2.col2.y=h*c*c;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.col1.x+=this.m_gamma;
    this.K.col2.y+=this.m_gamma;
    this.K.GetInverse(this.m_mass);
    this.m_C.x=b.m_sweep.c.x+c-this.m_target.x;
    this.m_C.y=b.m_sweep.c.y+d-this.m_target.y;
    b.m_angularVelocity*=0.98;
    this.m_impulse.x*=a.dtRatio;
    this.m_impulse.y*=a.dtRatio;
    b.m_linearVelocity.x+=e*this.m_impulse.x;
    b.m_linearVelocity.y+=e*this.m_impulse.y;
    b.m_angularVelocity+=h*(c*this.m_impulse.y-
                d*this.m_impulse.x)
    };

    b2.MouseJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyB,c,d,e;
    c=b.m_xf.R;
    var h=this.m_localAnchor.x-b.m_sweep.localCenter.x,g=this.m_localAnchor.y-b.m_sweep.localCenter.y;
    d=c.col1.x*h+c.col2.x*g;
    g=c.col1.y*h+c.col2.y*g;
    h=d;
    d=b.m_linearVelocity.x+-b.m_angularVelocity*g;
    var f=b.m_linearVelocity.y+b.m_angularVelocity*h;
    c=this.m_mass;
    d=d+this.m_beta*this.m_C.x+this.m_gamma*this.m_impulse.x;
    e=f+this.m_beta*this.m_C.y+this.m_gamma*this.m_impulse.y;
    f=-(c.col1.x*d+c.col2.x*e);
    e=-(c.col1.y*
        d+c.col2.y*e);
    c=this.m_impulse.x;
    d=this.m_impulse.y;
    this.m_impulse.x+=f;
    this.m_impulse.y+=e;
    a=a.dt*this.m_maxForce;
    this.m_impulse.LengthSquared()>a*a&&this.m_impulse.Multiply(a/this.m_impulse.Length());
    f=this.m_impulse.x-c;
    e=this.m_impulse.y-d;
    b.m_linearVelocity.x+=b.m_invMass*f;
    b.m_linearVelocity.y+=b.m_invMass*e;
    b.m_angularVelocity+=b.m_invI*(h*e-g*f)
    };
    b2.MouseJoint.prototype.SolvePositionConstraints=function(){
    return!0
    };
    b2.MouseJoint.prototype.GetAnchorA=function(){
    return this.m_target
    };

    b2.MouseJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    };
    b2.MouseJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.MouseJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.MouseJoint.prototype.GetTarget=function(){
    return this.m_target
    };
    b2.MouseJoint.prototype.SetTarget=function(a){
    this.m_bodyB.IsAwake()==!1&&this.m_bodyB.SetAwake(!0);
    this.m_target=a
    };
    b2.MouseJoint.prototype.GetMaxForce=function(){
    return this.m_maxForce
    };

    b2.MouseJoint.prototype.SetMaxForce=function(a){
    this.m_maxForce=a
    };
    b2.MouseJoint.prototype.GetFrequency=function(){
    return this.m_frequencyHz
    };
    b2.MouseJoint.prototype.SetFrequency=function(a){
    this.m_frequencyHz=a
    };
    b2.MouseJoint.prototype.GetDampingRatio=function(){
    return this.m_dampingRatio
    };
    b2.MouseJoint.prototype.SetDampingRatio=function(a){
    this.m_dampingRatio=a
    };
    b2.MouseJoint.prototype.K=new b2.Mat22;
    b2.MouseJoint.prototype.K1=new b2.Mat22;
    b2.MouseJoint.prototype.K2=new b2.Mat22;

    b2.MouseJoint.prototype.m_localAnchor=new b2.Vec2;
    b2.MouseJoint.prototype.m_target=new b2.Vec2;
    b2.MouseJoint.prototype.m_impulse=new b2.Vec2;
    b2.MouseJoint.prototype.m_mass=new b2.Mat22;
    b2.MouseJoint.prototype.m_C=new b2.Vec2;
    b2.MouseJoint.prototype.m_maxForce=null;
    b2.MouseJoint.prototype.m_frequencyHz=null;
    b2.MouseJoint.prototype.m_dampingRatio=null;
    b2.MouseJoint.prototype.m_beta=null;
    b2.MouseJoint.prototype.m_gamma=null;

    b2.MouseJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.MouseJointDef.prototype,b2.JointDef.prototype);
    b2.MouseJointDef.prototype._super=b2.JointDef.prototype;
    b2.MouseJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_mouseJoint;
    this.maxForce=0;
    this.frequencyHz=5;
    this.dampingRatio=0.7
    };
    b2.MouseJointDef.prototype.__varz=function(){
    this.target=new b2.Vec2
    };

    b2.MouseJointDef.prototype.target=new b2.Vec2;
    b2.MouseJointDef.prototype.maxForce=null;
    b2.MouseJointDef.prototype.frequencyHz=null;
    b2.MouseJointDef.prototype.dampingRatio=null;
    b2.PrismaticJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PrismaticJoint.prototype,b2.Joint.prototype);
    b2.PrismaticJoint.prototype._super=b2.Joint.prototype;

    b2.PrismaticJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x=-this.m_localXAxis1.y;
    this.m_localYAxis1.y=this.m_localXAxis1.x;
    this.m_refAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse=this.m_motorMass=0;
    this.m_lowerTranslation=a.lowerTranslation;
    this.m_upperTranslation=a.upperTranslation;
    this.m_maxMotorForce=
        a.maxMotorForce;
    this.m_motorSpeed=a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
    };
    b2.PrismaticJoint.prototype.__varz=function(){
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_localXAxis1=new b2.Vec2;
    this.m_localYAxis1=new b2.Vec2;
    this.m_axis=new b2.Vec2;
    this.m_perp=new b2.Vec2;
    this.m_K=new b2.Mat33;
    this.m_impulse=new b2.Vec3
    };

    b2.PrismaticJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    this.m_localCenterA.SetV(b.GetLocalCenter());
    this.m_localCenterB.SetV(c.GetLocalCenter());
    var h=b.GetTransform();
    c.GetTransform();
    d=b.m_xf.R;
    var g=this.m_localAnchor1.x-this.m_localCenterA.x,f=this.m_localAnchor1.y-this.m_localCenterA.y;
    e=d.col1.x*g+d.col2.x*f;
    f=d.col1.y*g+d.col2.y*f;
    g=e;
    d=c.m_xf.R;
    var i=this.m_localAnchor2.x-this.m_localCenterB.x,j=this.m_localAnchor2.y-this.m_localCenterB.y;
    e=d.col1.x*
        i+d.col2.x*j;
    j=d.col1.y*i+d.col2.y*j;
    i=e;
    d=c.m_sweep.c.x+i-b.m_sweep.c.x-g;
    e=c.m_sweep.c.y+j-b.m_sweep.c.y-f;
    this.m_invMassA=b.m_invMass;
    this.m_invMassB=c.m_invMass;
    this.m_invIA=b.m_invI;
    this.m_invIB=c.m_invI;
    this.m_axis.SetV(b2.Math.MulMV(h.R,this.m_localXAxis1));
    this.m_a1=(d+g)*this.m_axis.y-(e+f)*this.m_axis.x;
    this.m_a2=i*this.m_axis.y-j*this.m_axis.x;
    this.m_motorMass=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_a1*this.m_a1+this.m_invIB*this.m_a2*this.m_a2;
    if(this.m_motorMass>Number.MIN_VALUE)this.m_motorMass=
        1/this.m_motorMass;
    this.m_perp.SetV(b2.Math.MulMV(h.R,this.m_localYAxis1));
    this.m_s1=(d+g)*this.m_perp.y-(e+f)*this.m_perp.x;
    this.m_s2=i*this.m_perp.y-j*this.m_perp.x;
    h=this.m_invMassA;
    g=this.m_invMassB;
    f=this.m_invIA;
    i=this.m_invIB;
    this.m_K.col1.x=h+g+f*this.m_s1*this.m_s1+i*this.m_s2*this.m_s2;
    this.m_K.col1.y=f*this.m_s1+i*this.m_s2;
    this.m_K.col1.z=f*this.m_s1*this.m_a1+i*this.m_s2*this.m_a2;
    this.m_K.col2.x=this.m_K.col1.y;
    this.m_K.col2.y=f+i;
    this.m_K.col2.z=f*this.m_a1+i*this.m_a2;
    this.m_K.col3.x=
        this.m_K.col1.z;
    this.m_K.col3.y=this.m_K.col2.z;
    this.m_K.col3.z=h+g+f*this.m_a1*this.m_a1+i*this.m_a2*this.m_a2;
    if(this.m_enableLimit)if(d=this.m_axis.x*d+this.m_axis.y*e,b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop)this.m_limitState=b2.Joint.e_equalLimits;
    else if(d<=this.m_lowerTranslation){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_limitState=b2.Joint.e_atLowerLimit,this.m_impulse.z=0}else if(d>=this.m_upperTranslation){
        if(this.m_limitState!=
           b2.Joint.e_atUpperLimit)this.m_limitState=b2.Joint.e_atUpperLimit,this.m_impulse.z=0}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.z=0;
    else this.m_limitState=b2.Joint.e_inactiveLimit;
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=a.dtRatio,a=this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.x,d=this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.z)*
            this.m_axis.y,e=this.m_impulse.x*this.m_s1+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a1,h=this.m_impulse.x*this.m_s2+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a2,b.m_linearVelocity.x-=this.m_invMassA*a,b.m_linearVelocity.y-=this.m_invMassA*d,b.m_angularVelocity-=this.m_invIA*e,c.m_linearVelocity.x+=this.m_invMassB*a,c.m_linearVelocity.y+=this.m_invMassB*d,c.m_angularVelocity+=this.m_invIB*h):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.PrismaticJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d=b.m_linearVelocity,e=b.m_angularVelocity,h=c.m_linearVelocity,g=c.m_angularVelocity,f,i,j;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)j=this.m_motorMass*(this.m_motorSpeed-(this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e)),f=this.m_motorImpulse,a=a.dt*this.m_maxMotorForce,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+j,-a,a),j=this.m_motorImpulse-
        f,f=j*this.m_axis.x,a=j*this.m_axis.y,i=j*this.m_a1,j*=this.m_a2,d.x-=this.m_invMassA*f,d.y-=this.m_invMassA*a,e-=this.m_invIA*i,h.x+=this.m_invMassB*f,h.y+=this.m_invMassB*a,g+=this.m_invIB*j;
    i=this.m_perp.x*(h.x-d.x)+this.m_perp.y*(h.y-d.y)+this.m_s2*g-this.m_s1*e;
    a=g-e;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        j=this.m_axis.x*(h.x-d.x)+this.m_axis.y*(h.y-d.y)+this.m_a2*g-this.m_a1*e;
        f=this.m_impulse.Copy();
        j=this.m_K.Solve33(new b2.Vec3,-i,-a,-j);
        this.m_impulse.Add(j);

        if(this.m_limitState==b2.Joint.e_atLowerLimit)this.m_impulse.z=b2.Math.Max(this.m_impulse.z,0);
        else if(this.m_limitState==b2.Joint.e_atUpperLimit)this.m_impulse.z=b2.Math.Min(this.m_impulse.z,0);
        i=-i-(this.m_impulse.z-f.z)*this.m_K.col3.x;
        a=-a-(this.m_impulse.z-f.z)*this.m_K.col3.y;
        a=this.m_K.Solve22(new b2.Vec2,i,a);
        a.x+=f.x;
        a.y+=f.y;
        this.m_impulse.x=a.x;
        this.m_impulse.y=a.y;
        j.x=this.m_impulse.x-f.x;
        j.y=this.m_impulse.y-f.y;
        j.z=this.m_impulse.z-f.z;
        f=j.x*this.m_perp.x+j.z*this.m_axis.x;
        a=j.x*this.m_perp.y+
        j.z*this.m_axis.y;
        i=j.x*this.m_s1+j.y+j.z*this.m_a1;
        j=j.x*this.m_s2+j.y+j.z*this.m_a2}else j=this.m_K.Solve22(new b2.Vec2,-i,-a),this.m_impulse.x+=j.x,this.m_impulse.y+=j.y,f=j.x*this.m_perp.x,a=j.x*this.m_perp.y,i=j.x*this.m_s1+j.y,j=j.x*this.m_s2+j.y;
    d.x-=this.m_invMassA*f;
    d.y-=this.m_invMassA*a;
    e-=this.m_invIA*i;
    h.x+=this.m_invMassB*f;
    h.y+=this.m_invMassB*a;
    g+=this.m_invIB*j;
    b.m_linearVelocity.SetV(d);
    b.m_angularVelocity=e;
    c.m_linearVelocity.SetV(h);
    c.m_angularVelocity=g
    };

    b2.PrismaticJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.m_sweep.c,d=a.m_sweep.a,e=b.m_sweep.c,h=b.m_sweep.a,g,f,i,j,k=0,l=0;
    i=!1;
    var n=0,m=b2.Mat22.FromAngle(d),o=b2.Mat22.FromAngle(h);
    g=m;
    var l=this.m_localAnchor1.x-this.m_localCenterA.x,p=this.m_localAnchor1.y-this.m_localCenterA.y;
    f=g.col1.x*l+g.col2.x*p;
    p=g.col1.y*l+g.col2.y*p;
    l=f;
    g=o;
    o=this.m_localAnchor2.x-this.m_localCenterB.x;
    j=this.m_localAnchor2.y-this.m_localCenterB.y;
    f=g.col1.x*o+g.col2.x*
        j;
    j=g.col1.y*o+g.col2.y*j;
    o=f;
    g=e.x+o-c.x-l;
    f=e.y+j-c.y-p;
    if(this.m_enableLimit){
        this.m_axis=b2.Math.MulMV(m,this.m_localXAxis1);
        this.m_a1=(g+l)*this.m_axis.y-(f+p)*this.m_axis.x;
        this.m_a2=o*this.m_axis.y-j*this.m_axis.x;
        var q=this.m_axis.x*g+this.m_axis.y*f;
        b2.Math.Abs(this.m_upperTranslation-this.m_lowerTranslation)<2*b2.Settings.b2_linearSlop?(n=b2.Math.Clamp(q,-b2.Settings.b2_maxLinearCorrection,b2.Settings.b2_maxLinearCorrection),k=b2.Math.Abs(q),i=!0):q<=this.m_lowerTranslation?(n=b2.Math.Clamp(q-
                                                                                                                                   this.m_lowerTranslation+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),k=this.m_lowerTranslation-q,i=!0):q>=this.m_upperTranslation&&(n=b2.Math.Clamp(q-this.m_upperTranslation+b2.Settings.b2_linearSlop,0,b2.Settings.b2_maxLinearCorrection),k=q-this.m_upperTranslation,i=!0)}this.m_perp=b2.Math.MulMV(m,this.m_localYAxis1);
    this.m_s1=(g+l)*this.m_perp.y-(f+p)*this.m_perp.x;
    this.m_s2=o*this.m_perp.y-j*this.m_perp.x;
    m=new b2.Vec3;
    p=this.m_perp.x*g+this.m_perp.y*f;
    o=h-d-this.m_refAngle;

    k=b2.Math.Max(k,b2.Math.Abs(p));
    l=b2.Math.Abs(o);
    i?(i=this.m_invMassA,j=this.m_invMassB,g=this.m_invIA,f=this.m_invIB,this.m_K.col1.x=i+j+g*this.m_s1*this.m_s1+f*this.m_s2*this.m_s2,this.m_K.col1.y=g*this.m_s1+f*this.m_s2,this.m_K.col1.z=g*this.m_s1*this.m_a1+f*this.m_s2*this.m_a2,this.m_K.col2.x=this.m_K.col1.y,this.m_K.col2.y=g+f,this.m_K.col2.z=g*this.m_a1+f*this.m_a2,this.m_K.col3.x=this.m_K.col1.z,this.m_K.col3.y=this.m_K.col2.z,this.m_K.col3.z=i+j+g*this.m_a1*this.m_a1+f*this.m_a2*this.m_a2,
       this.m_K.Solve33(m,-p,-o,-n)):(i=this.m_invMassA,j=this.m_invMassB,g=this.m_invIA,f=this.m_invIB,n=g*this.m_s1+f*this.m_s2,q=g+f,this.m_K.col1.Set(i+j+g*this.m_s1*this.m_s1+f*this.m_s2*this.m_s2,n,0),this.m_K.col2.Set(n,q,0),n=this.m_K.Solve22(new b2.Vec2,-p,-o),m.x=n.x,m.y=n.y,m.z=0);
    n=m.x*this.m_perp.x+m.z*this.m_axis.x;
    i=m.x*this.m_perp.y+m.z*this.m_axis.y;
    p=m.x*this.m_s1+m.y+m.z*this.m_a1;
    m=m.x*this.m_s2+m.y+m.z*this.m_a2;
    c.x-=this.m_invMassA*n;
    c.y-=this.m_invMassA*i;
    d-=this.m_invIA*p;
    e.x+=this.m_invMassB*
        n;
    e.y+=this.m_invMassB*i;
    h+=this.m_invIB*m;
    a.m_sweep.a=d;
    b.m_sweep.a=h;
    a.SynchronizeTransform();
    b.SynchronizeTransform();
    return k<=b2.Settings.b2_linearSlop&&l<=b2.Settings.b2_angularSlop
    };
    b2.PrismaticJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.PrismaticJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.PrismaticJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*(this.m_impulse.x*this.m_perp.x+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.x),a*(this.m_impulse.x*this.m_perp.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis.y))
    };
    b2.PrismaticJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.y
    };

    b2.PrismaticJoint.prototype.GetJointTranslation=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c=a.GetWorldPoint(this.m_localAnchor1),d=b.GetWorldPoint(this.m_localAnchor2),b=d.x-c.x,c=d.y-c.y,a=a.GetWorldVector(this.m_localXAxis1);
    return a.x*b+a.y*c
    };

    b2.PrismaticJoint.prototype.GetJointSpeed=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h;
    c=b.m_sweep.c.x+g-(a.m_sweep.c.x+d);
    var h=b.m_sweep.c.y+f-(a.m_sweep.c.y+e),i=a.GetWorldVector(this.m_localXAxis1),
    j=a.m_linearVelocity,k=b.m_linearVelocity,a=a.m_angularVelocity,b=b.m_angularVelocity;
    return c*-a*i.y+h*a*i.x+(i.x*(k.x+-b*f-j.x- -a*e)+i.y*(k.y+b*g-j.y-a*d))
    };
    b2.PrismaticJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };
    b2.PrismaticJoint.prototype.EnableLimit=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit=a
    };
    b2.PrismaticJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerTranslation
    };
    b2.PrismaticJoint.prototype.GetUpperLimit=function(){
    return this.m_upperTranslation
    };

    b2.PrismaticJoint.prototype.SetLimits=function(a,b){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation=a;
    this.m_upperTranslation=b
    };
    b2.PrismaticJoint.prototype.IsMotorEnabled=function(){
    return this.m_enableMotor
    };
    b2.PrismaticJoint.prototype.EnableMotor=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor=a
    };
    b2.PrismaticJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };

    b2.PrismaticJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.PrismaticJoint.prototype.SetMaxMotorForce=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce=a
    };
    b2.PrismaticJoint.prototype.GetMotorForce=function(){
    return this.m_motorImpulse
    };
    b2.PrismaticJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localXAxis1=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_localYAxis1=new b2.Vec2;

    b2.PrismaticJoint.prototype.m_refAngle=null;
    b2.PrismaticJoint.prototype.m_axis=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_perp=new b2.Vec2;
    b2.PrismaticJoint.prototype.m_s1=null;
    b2.PrismaticJoint.prototype.m_s2=null;
    b2.PrismaticJoint.prototype.m_a1=null;
    b2.PrismaticJoint.prototype.m_a2=null;
    b2.PrismaticJoint.prototype.m_K=new b2.Mat33;
    b2.PrismaticJoint.prototype.m_impulse=new b2.Vec3;
    b2.PrismaticJoint.prototype.m_motorMass=null;
    b2.PrismaticJoint.prototype.m_motorImpulse=null;

    b2.PrismaticJoint.prototype.m_lowerTranslation=null;
    b2.PrismaticJoint.prototype.m_upperTranslation=null;
    b2.PrismaticJoint.prototype.m_maxMotorForce=null;
    b2.PrismaticJoint.prototype.m_motorSpeed=null;
    b2.PrismaticJoint.prototype.m_enableLimit=null;
    b2.PrismaticJoint.prototype.m_enableMotor=null;
    b2.PrismaticJoint.prototype.m_limitState=0;
    b2.PrismaticJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };

    extend(b2.PrismaticJointDef.prototype,b2.JointDef.prototype);
    b2.PrismaticJointDef.prototype._super=b2.JointDef.prototype;
    b2.PrismaticJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_prismaticJoint;
    this.localAxisA.Set(1,0);
    this.referenceAngle=0;
    this.enableLimit=!1;
    this.upperTranslation=this.lowerTranslation=0;
    this.enableMotor=!1;
    this.motorSpeed=this.maxMotorForce=0
    };

    b2.PrismaticJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2;
    this.localAxisA=new b2.Vec2
    };
    b2.PrismaticJointDef.prototype.Initialize=function(a,b,c,d){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.localAxisA=this.bodyA.GetLocalVector(d);
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };
    b2.PrismaticJointDef.prototype.localAnchorA=new b2.Vec2;

    b2.PrismaticJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.PrismaticJointDef.prototype.localAxisA=new b2.Vec2;
    b2.PrismaticJointDef.prototype.referenceAngle=null;
    b2.PrismaticJointDef.prototype.enableLimit=null;
    b2.PrismaticJointDef.prototype.lowerTranslation=null;
    b2.PrismaticJointDef.prototype.upperTranslation=null;
    b2.PrismaticJointDef.prototype.enableMotor=null;
    b2.PrismaticJointDef.prototype.maxMotorForce=null;
    b2.PrismaticJointDef.prototype.motorSpeed=null;

    b2.PulleyJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PulleyJoint.prototype,b2.Joint.prototype);
    b2.PulleyJoint.prototype._super=b2.Joint.prototype;

    b2.PulleyJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_ground=this.m_bodyA.m_world.m_groundBody;
    this.m_groundAnchor1.x=a.groundAnchorA.x-this.m_ground.m_xf.position.x;
    this.m_groundAnchor1.y=a.groundAnchorA.y-this.m_ground.m_xf.position.y;
    this.m_groundAnchor2.x=a.groundAnchorB.x-this.m_ground.m_xf.position.x;
    this.m_groundAnchor2.y=a.groundAnchorB.y-this.m_ground.m_xf.position.y;
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);

    this.m_ratio=a.ratio;
    this.m_constant=a.lengthA+this.m_ratio*a.lengthB;
    this.m_maxLength1=b2.Math.Min(a.maxLengthA,this.m_constant-this.m_ratio*b2.PulleyJoint.b2_minPulleyLength);
    this.m_maxLength2=b2.Math.Min(a.maxLengthB,(this.m_constant-b2.PulleyJoint.b2_minPulleyLength)/this.m_ratio);
    this.m_limitImpulse2=this.m_limitImpulse1=this.m_impulse=0
    };

    b2.PulleyJoint.prototype.__varz=function(){
    this.m_groundAnchor1=new b2.Vec2;
    this.m_groundAnchor2=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_u1=new b2.Vec2;
    this.m_u2=new b2.Vec2
    };
    b2.PulleyJoint.b2_minPulleyLength=2;

    b2.PulleyJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d;
    d=b.m_xf.R;
    var e=this.m_localAnchor1.x-b.m_sweep.localCenter.x,h=this.m_localAnchor1.y-b.m_sweep.localCenter.y,g=d.col1.x*e+d.col2.x*h,h=d.col1.y*e+d.col2.y*h,e=g;
    d=c.m_xf.R;
    var f=this.m_localAnchor2.x-c.m_sweep.localCenter.x,i=this.m_localAnchor2.y-c.m_sweep.localCenter.y,g=d.col1.x*f+d.col2.x*i,i=d.col1.y*f+d.col2.y*i,f=g;
    d=c.m_sweep.c.x+f;
    var g=c.m_sweep.c.y+i,j=this.m_ground.m_xf.position.x+this.m_groundAnchor2.x,
    k=this.m_ground.m_xf.position.y+this.m_groundAnchor2.y;
    this.m_u1.Set(b.m_sweep.c.x+e-(this.m_ground.m_xf.position.x+this.m_groundAnchor1.x),b.m_sweep.c.y+h-(this.m_ground.m_xf.position.y+this.m_groundAnchor1.y));
    this.m_u2.Set(d-j,g-k);
    d=this.m_u1.Length();
    g=this.m_u2.Length();
    d>b2.Settings.b2_linearSlop?this.m_u1.Multiply(1/d):this.m_u1.SetZero();
    g>b2.Settings.b2_linearSlop?this.m_u2.Multiply(1/g):this.m_u2.SetZero();
    this.m_constant-d-this.m_ratio*g>0?(this.m_state=b2.Joint.e_inactiveLimit,this.m_impulse=
                        0):this.m_state=b2.Joint.e_atUpperLimit;
    d<this.m_maxLength1?(this.m_limitState1=b2.Joint.e_inactiveLimit,this.m_limitImpulse1=0):this.m_limitState1=b2.Joint.e_atUpperLimit;
    g<this.m_maxLength2?(this.m_limitState2=b2.Joint.e_inactiveLimit,this.m_limitImpulse2=0):this.m_limitState2=b2.Joint.e_atUpperLimit;
    d=e*this.m_u1.y-h*this.m_u1.x;
    g=f*this.m_u2.y-i*this.m_u2.x;
    this.m_limitMass1=b.m_invMass+b.m_invI*d*d;
    this.m_limitMass2=c.m_invMass+c.m_invI*g*g;
    this.m_pulleyMass=this.m_limitMass1+this.m_ratio*this.m_ratio*
        this.m_limitMass2;
    this.m_limitMass1=1/this.m_limitMass1;
    this.m_limitMass2=1/this.m_limitMass2;
    this.m_pulleyMass=1/this.m_pulleyMass;
    a.warmStarting?(this.m_impulse*=a.dtRatio,this.m_limitImpulse1*=a.dtRatio,this.m_limitImpulse2*=a.dtRatio,a=(-this.m_impulse-this.m_limitImpulse1)*this.m_u1.x,d=(-this.m_impulse-this.m_limitImpulse1)*this.m_u1.y,g=(-this.m_ratio*this.m_impulse-this.m_limitImpulse2)*this.m_u2.x,j=(-this.m_ratio*this.m_impulse-this.m_limitImpulse2)*this.m_u2.y,b.m_linearVelocity.x+=b.m_invMass*
            a,b.m_linearVelocity.y+=b.m_invMass*d,b.m_angularVelocity+=b.m_invI*(e*d-h*a),c.m_linearVelocity.x+=c.m_invMass*g,c.m_linearVelocity.y+=c.m_invMass*j,c.m_angularVelocity+=c.m_invI*(f*j-i*g)):this.m_limitImpulse2=this.m_limitImpulse1=this.m_impulse=0
    };

    b2.PulleyJoint.prototype.SolveVelocityConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c;
    c=a.m_xf.R;
    var d=this.m_localAnchor1.x-a.m_sweep.localCenter.x,e=this.m_localAnchor1.y-a.m_sweep.localCenter.y,h=c.col1.x*d+c.col2.x*e,e=c.col1.y*d+c.col2.y*e,d=h;
    c=b.m_xf.R;
    var g=this.m_localAnchor2.x-b.m_sweep.localCenter.x,f=this.m_localAnchor2.y-b.m_sweep.localCenter.y,h=c.col1.x*g+c.col2.x*f,f=c.col1.y*g+c.col2.y*f,g=h,i,j;
    if(this.m_state==b2.Joint.e_atUpperLimit)c=a.m_linearVelocity.x+-a.m_angularVelocity*
        e,h=a.m_linearVelocity.y+a.m_angularVelocity*d,i=b.m_linearVelocity.x+-b.m_angularVelocity*f,j=b.m_linearVelocity.y+b.m_angularVelocity*g,c=-(this.m_u1.x*c+this.m_u1.y*h)-this.m_ratio*(this.m_u2.x*i+this.m_u2.y*j),j=this.m_pulleyMass*-c,c=this.m_impulse,this.m_impulse=b2.Math.Max(0,this.m_impulse+j),j=this.m_impulse-c,c=-j*this.m_u1.x,h=-j*this.m_u1.y,i=-this.m_ratio*j*this.m_u2.x,j=-this.m_ratio*j*this.m_u2.y,a.m_linearVelocity.x+=a.m_invMass*c,a.m_linearVelocity.y+=a.m_invMass*h,a.m_angularVelocity+=
    a.m_invI*(d*h-e*c),b.m_linearVelocity.x+=b.m_invMass*i,b.m_linearVelocity.y+=b.m_invMass*j,b.m_angularVelocity+=b.m_invI*(g*j-f*i);
    if(this.m_limitState1==b2.Joint.e_atUpperLimit)c=a.m_linearVelocity.x+-a.m_angularVelocity*e,h=a.m_linearVelocity.y+a.m_angularVelocity*d,c=-(this.m_u1.x*c+this.m_u1.y*h),j=-this.m_limitMass1*c,c=this.m_limitImpulse1,this.m_limitImpulse1=b2.Math.Max(0,this.m_limitImpulse1+j),j=this.m_limitImpulse1-c,c=-j*this.m_u1.x,h=-j*this.m_u1.y,a.m_linearVelocity.x+=a.m_invMass*c,
    a.m_linearVelocity.y+=a.m_invMass*h,a.m_angularVelocity+=a.m_invI*(d*h-e*c);
    if(this.m_limitState2==b2.Joint.e_atUpperLimit)i=b.m_linearVelocity.x+-b.m_angularVelocity*f,j=b.m_linearVelocity.y+b.m_angularVelocity*g,c=-(this.m_u2.x*i+this.m_u2.y*j),j=-this.m_limitMass2*c,c=this.m_limitImpulse2,this.m_limitImpulse2=b2.Math.Max(0,this.m_limitImpulse2+j),j=this.m_limitImpulse2-c,i=-j*this.m_u2.x,j=-j*this.m_u2.y,b.m_linearVelocity.x+=b.m_invMass*i,b.m_linearVelocity.y+=b.m_invMass*j,b.m_angularVelocity+=
    b.m_invI*(g*j-f*i)
    };

    b2.PulleyJoint.prototype.SolvePositionConstraints=function(){
    var a=this.m_bodyA,b=this.m_bodyB,c,d=this.m_ground.m_xf.position.x+this.m_groundAnchor1.x,e=this.m_ground.m_xf.position.y+this.m_groundAnchor1.y,h=this.m_ground.m_xf.position.x+this.m_groundAnchor2.x,g=this.m_ground.m_xf.position.y+this.m_groundAnchor2.y,f,i,j,k,l,n,m,o=0;
    if(this.m_state==b2.Joint.e_atUpperLimit)c=a.m_xf.R,f=this.m_localAnchor1.x-a.m_sweep.localCenter.x,i=this.m_localAnchor1.y-a.m_sweep.localCenter.y,l=c.col1.x*f+c.col2.x*
        i,i=c.col1.y*f+c.col2.y*i,f=l,c=b.m_xf.R,j=this.m_localAnchor2.x-b.m_sweep.localCenter.x,k=this.m_localAnchor2.y-b.m_sweep.localCenter.y,l=c.col1.x*j+c.col2.x*k,k=c.col1.y*j+c.col2.y*k,j=l,c=a.m_sweep.c.x+f,l=a.m_sweep.c.y+i,n=b.m_sweep.c.x+j,m=b.m_sweep.c.y+k,this.m_u1.Set(c-d,l-e),this.m_u2.Set(n-h,m-g),c=this.m_u1.Length(),l=this.m_u2.Length(),c>b2.Settings.b2_linearSlop?this.m_u1.Multiply(1/c):this.m_u1.SetZero(),l>b2.Settings.b2_linearSlop?this.m_u2.Multiply(1/l):this.m_u2.SetZero(),c=this.m_constant-
        c-this.m_ratio*l,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_pulleyMass*c,c=-m*this.m_u1.x,l=-m*this.m_u1.y,n=-this.m_ratio*m*this.m_u2.x,m=-this.m_ratio*m*this.m_u2.y,a.m_sweep.c.x+=a.m_invMass*c,a.m_sweep.c.y+=a.m_invMass*l,a.m_sweep.a+=a.m_invI*(f*l-i*c),b.m_sweep.c.x+=b.m_invMass*n,b.m_sweep.c.y+=b.m_invMass*m,b.m_sweep.a+=b.m_invI*(j*m-k*n),a.SynchronizeTransform(),b.SynchronizeTransform();
    if(this.m_limitState1==b2.Joint.e_atUpperLimit)c=
        a.m_xf.R,f=this.m_localAnchor1.x-a.m_sweep.localCenter.x,i=this.m_localAnchor1.y-a.m_sweep.localCenter.y,l=c.col1.x*f+c.col2.x*i,i=c.col1.y*f+c.col2.y*i,f=l,c=a.m_sweep.c.x+f,l=a.m_sweep.c.y+i,this.m_u1.Set(c-d,l-e),c=this.m_u1.Length(),c>b2.Settings.b2_linearSlop?(this.m_u1.x*=1/c,this.m_u1.y*=1/c):this.m_u1.SetZero(),c=this.m_maxLength1-c,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_limitMass1*c,c=-m*this.m_u1.x,l=-m*this.m_u1.y,
    a.m_sweep.c.x+=a.m_invMass*c,a.m_sweep.c.y+=a.m_invMass*l,a.m_sweep.a+=a.m_invI*(f*l-i*c),a.SynchronizeTransform();
    if(this.m_limitState2==b2.Joint.e_atUpperLimit)c=b.m_xf.R,j=this.m_localAnchor2.x-b.m_sweep.localCenter.x,k=this.m_localAnchor2.y-b.m_sweep.localCenter.y,l=c.col1.x*j+c.col2.x*k,k=c.col1.y*j+c.col2.y*k,j=l,n=b.m_sweep.c.x+j,m=b.m_sweep.c.y+k,this.m_u2.Set(n-h,m-g),l=this.m_u2.Length(),l>b2.Settings.b2_linearSlop?(this.m_u2.x*=1/l,this.m_u2.y*=1/l):this.m_u2.SetZero(),c=this.m_maxLength2-
        l,o=b2.Math.Max(o,-c),c=b2.Math.Clamp(c+b2.Settings.b2_linearSlop,-b2.Settings.b2_maxLinearCorrection,0),m=-this.m_limitMass2*c,n=-m*this.m_u2.x,m=-m*this.m_u2.y,b.m_sweep.c.x+=b.m_invMass*n,b.m_sweep.c.y+=b.m_invMass*m,b.m_sweep.a+=b.m_invI*(j*m-k*n),b.SynchronizeTransform();
    return o<b2.Settings.b2_linearSlop
    };
    b2.PulleyJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.PulleyJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.PulleyJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse*this.m_u2.x,a*this.m_impulse*this.m_u2.y)
    };
    b2.PulleyJoint.prototype.GetReactionTorque=function(){
    return 0
    };
    b2.PulleyJoint.prototype.GetGroundAnchorA=function(){
    var a=this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor1);
    return a
    };
    b2.PulleyJoint.prototype.GetGroundAnchorB=function(){
    var a=this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor2);
    return a
    };

    b2.PulleyJoint.prototype.GetLength1=function(){
    var a=this.m_bodyA.GetWorldPoint(this.m_localAnchor1),b=a.x-(this.m_ground.m_xf.position.x+this.m_groundAnchor1.x),a=a.y-(this.m_ground.m_xf.position.y+this.m_groundAnchor1.y);
    return Math.sqrt(b*b+a*a)
    };
    b2.PulleyJoint.prototype.GetLength2=function(){
    var a=this.m_bodyB.GetWorldPoint(this.m_localAnchor2),b=a.x-(this.m_ground.m_xf.position.x+this.m_groundAnchor2.x),a=a.y-(this.m_ground.m_xf.position.y+this.m_groundAnchor2.y);
    return Math.sqrt(b*b+a*a)
    };

    b2.PulleyJoint.prototype.GetRatio=function(){
    return this.m_ratio
    };
    b2.PulleyJoint.prototype.m_ground=null;
    b2.PulleyJoint.prototype.m_groundAnchor1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_groundAnchor2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_u1=new b2.Vec2;
    b2.PulleyJoint.prototype.m_u2=new b2.Vec2;
    b2.PulleyJoint.prototype.m_constant=null;
    b2.PulleyJoint.prototype.m_ratio=null;

    b2.PulleyJoint.prototype.m_maxLength1=null;
    b2.PulleyJoint.prototype.m_maxLength2=null;
    b2.PulleyJoint.prototype.m_pulleyMass=null;
    b2.PulleyJoint.prototype.m_limitMass1=null;
    b2.PulleyJoint.prototype.m_limitMass2=null;
    b2.PulleyJoint.prototype.m_impulse=null;
    b2.PulleyJoint.prototype.m_limitImpulse1=null;
    b2.PulleyJoint.prototype.m_limitImpulse2=null;
    b2.PulleyJoint.prototype.m_state=0;
    b2.PulleyJoint.prototype.m_limitState1=0;
    b2.PulleyJoint.prototype.m_limitState2=0;

    b2.PulleyJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.PulleyJointDef.prototype,b2.JointDef.prototype);
    b2.PulleyJointDef.prototype._super=b2.JointDef.prototype;

    b2.PulleyJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_pulleyJoint;
    this.groundAnchorA.Set(-1,1);
    this.groundAnchorB.Set(1,1);
    this.localAnchorA.Set(-1,0);
    this.localAnchorB.Set(1,0);
    this.maxLengthB=this.lengthB=this.maxLengthA=this.lengthA=0;
    this.ratio=1;
    this.collideConnected=!0
    };

    b2.PulleyJointDef.prototype.__varz=function(){
    this.groundAnchorA=new b2.Vec2;
    this.groundAnchorB=new b2.Vec2;
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };

    b2.PulleyJointDef.prototype.Initialize=function(a,b,c,d,e,h,g){
    this.bodyA=a;
    this.bodyB=b;
    this.groundAnchorA.SetV(c);
    this.groundAnchorB.SetV(d);
    this.localAnchorA=this.bodyA.GetLocalPoint(e);
    this.localAnchorB=this.bodyB.GetLocalPoint(h);
    a=e.x-c.x;
    c=e.y-c.y;
    this.lengthA=Math.sqrt(a*a+c*c);
    c=h.x-d.x;
    d=h.y-d.y;
    this.lengthB=Math.sqrt(c*c+d*d);
    this.ratio=g;
    g=this.lengthA+this.ratio*this.lengthB;
    this.maxLengthA=g-this.ratio*b2.PulleyJoint.b2_minPulleyLength;
    this.maxLengthB=(g-b2.PulleyJoint.b2_minPulleyLength)/
        this.ratio
    };
    b2.PulleyJointDef.prototype.groundAnchorA=new b2.Vec2;
    b2.PulleyJointDef.prototype.groundAnchorB=new b2.Vec2;
    b2.PulleyJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.PulleyJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.PulleyJointDef.prototype.lengthA=null;
    b2.PulleyJointDef.prototype.maxLengthA=null;
    b2.PulleyJointDef.prototype.lengthB=null;
    b2.PulleyJointDef.prototype.maxLengthB=null;
    b2.PulleyJointDef.prototype.ratio=null;

    b2.RevoluteJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.RevoluteJoint.prototype,b2.Joint.prototype);
    b2.RevoluteJoint.prototype._super=b2.Joint.prototype;

    b2.RevoluteJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_referenceAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse=0;
    this.m_lowerAngle=a.lowerAngle;
    this.m_upperAngle=a.upperAngle;
    this.m_maxMotorTorque=a.maxMotorTorque;
    this.m_motorSpeed=a.motorSpeed;
    this.m_enableLimit=a.enableLimit;
    this.m_enableMotor=a.enableMotor;
    this.m_limitState=b2.Joint.e_inactiveLimit
    };

    b2.RevoluteJoint.prototype.__varz=function(){
    this.K=new b2.Mat22;
    this.K1=new b2.Mat22;
    this.K2=new b2.Mat22;
    this.K3=new b2.Mat22;
    this.impulse3=new b2.Vec3;
    this.impulse2=new b2.Vec2;
    this.reduced=new b2.Vec2;
    this.m_localAnchor1=new b2.Vec2;
    this.m_localAnchor2=new b2.Vec2;
    this.m_impulse=new b2.Vec3;
    this.m_mass=new b2.Mat33
    };
    b2.RevoluteJoint.tImpulse=new b2.Vec2;

    b2.RevoluteJoint.prototype.InitVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e;
    d=b.m_xf.R;
    var h=this.m_localAnchor1.x-b.m_sweep.localCenter.x,g=this.m_localAnchor1.y-b.m_sweep.localCenter.y;
    e=d.col1.x*h+d.col2.x*g;
    g=d.col1.y*h+d.col2.y*g;
    h=e;
    d=c.m_xf.R;
    var f=this.m_localAnchor2.x-c.m_sweep.localCenter.x,i=this.m_localAnchor2.y-c.m_sweep.localCenter.y;
    e=d.col1.x*f+d.col2.x*i;
    i=d.col1.y*f+d.col2.y*i;
    f=e;
    d=b.m_invMass;
    e=c.m_invMass;
    var j=b.m_invI,k=c.m_invI;
    this.m_mass.col1.x=d+
        e+g*g*j+i*i*k;
    this.m_mass.col2.x=-g*h*j-i*f*k;
    this.m_mass.col3.x=-g*j-i*k;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=d+e+h*h*j+f*f*k;
    this.m_mass.col3.y=h*j+f*k;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=j+k;
    this.m_motorMass=1/(j+k);
    if(this.m_enableMotor==!1)this.m_motorImpulse=0;
    if(this.m_enableLimit){
        var l=c.m_sweep.a-b.m_sweep.a-this.m_referenceAngle;
        if(b2.Math.Abs(this.m_upperAngle-this.m_lowerAngle)<2*b2.Settings.b2_angularSlop)this.m_limitState=
        b2.Joint.e_equalLimits;
        else if(l<=this.m_lowerAngle){
        if(this.m_limitState!=b2.Joint.e_atLowerLimit)this.m_impulse.z=0;
        this.m_limitState=b2.Joint.e_atLowerLimit}else if(l>=this.m_upperAngle){
            if(this.m_limitState!=b2.Joint.e_atUpperLimit)this.m_impulse.z=0;
            this.m_limitState=b2.Joint.e_atUpperLimit}else this.m_limitState=b2.Joint.e_inactiveLimit,this.m_impulse.z=0}else this.m_limitState=b2.Joint.e_inactiveLimit;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_motorImpulse*=
            a.dtRatio,a=this.m_impulse.x,l=this.m_impulse.y,b.m_linearVelocity.x-=d*a,b.m_linearVelocity.y-=d*l,b.m_angularVelocity-=j*(h*l-g*a+this.m_motorImpulse+this.m_impulse.z),c.m_linearVelocity.x+=e*a,c.m_linearVelocity.y+=e*l,c.m_angularVelocity+=k*(f*l-i*a+this.m_motorImpulse+this.m_impulse.z)):(this.m_impulse.SetZero(),this.m_motorImpulse=0)
    };

    b2.RevoluteJoint.prototype.SolveVelocityConstraints=function(a){
    var b=this.m_bodyA,c=this.m_bodyB,d,e,h,g,f,i=b.m_linearVelocity,j=b.m_angularVelocity,k=c.m_linearVelocity,l=c.m_angularVelocity,n=b.m_invMass,m=c.m_invMass,o=b.m_invI,p=c.m_invI;
    if(this.m_enableMotor&&this.m_limitState!=b2.Joint.e_equalLimits)h=this.m_motorMass*-(l-j-this.m_motorSpeed),g=this.m_motorImpulse,a=a.dt*this.m_maxMotorTorque,this.m_motorImpulse=b2.Math.Clamp(this.m_motorImpulse+h,-a,a),h=this.m_motorImpulse-g,j-=o*h,l+=p*
        h;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        d=b.m_xf.R;
        h=this.m_localAnchor1.x-b.m_sweep.localCenter.x;
        g=this.m_localAnchor1.y-b.m_sweep.localCenter.y;
        e=d.col1.x*h+d.col2.x*g;
        g=d.col1.y*h+d.col2.y*g;
        h=e;
        d=c.m_xf.R;
        a=this.m_localAnchor2.x-c.m_sweep.localCenter.x;
        f=this.m_localAnchor2.y-c.m_sweep.localCenter.y;
        e=d.col1.x*a+d.col2.x*f;
        f=d.col1.y*a+d.col2.y*f;
        a=e;
        e=k.x+-l*f-i.x- -j*g;
        var q=k.y+l*a-i.y-j*h;
        this.m_mass.Solve33(this.impulse3,-e,-q,-(l-j));
        if(this.m_limitState==
           b2.Joint.e_equalLimits)this.m_impulse.Add(this.impulse3);
        else if(this.m_limitState==b2.Joint.e_atLowerLimit){
        if(d=this.m_impulse.z+this.impulse3.z,d<0)this.m_mass.Solve22(this.reduced,-e,-q),this.impulse3.x=this.reduced.x,this.impulse3.y=this.reduced.y,this.impulse3.z=-this.m_impulse.z,this.m_impulse.x+=this.reduced.x,this.m_impulse.y+=this.reduced.y,this.m_impulse.z=0}else if(this.m_limitState==b2.Joint.e_atUpperLimit&&(d=this.m_impulse.z+this.impulse3.z,d>0))this.m_mass.Solve22(this.reduced,-e,
                                                                                                                                                                                                    -q),this.impulse3.x=this.reduced.x,this.impulse3.y=this.reduced.y,this.impulse3.z=-this.m_impulse.z,this.m_impulse.x+=this.reduced.x,this.m_impulse.y+=this.reduced.y,this.m_impulse.z=0;
        i.x-=n*this.impulse3.x;
        i.y-=n*this.impulse3.y;
        j-=o*(h*this.impulse3.y-g*this.impulse3.x+this.impulse3.z);
        k.x+=m*this.impulse3.x;
        k.y+=m*this.impulse3.y;
        l+=p*(a*this.impulse3.y-f*this.impulse3.x+this.impulse3.z)}else d=b.m_xf.R,h=this.m_localAnchor1.x-b.m_sweep.localCenter.x,g=this.m_localAnchor1.y-b.m_sweep.localCenter.y,
    e=d.col1.x*h+d.col2.x*g,g=d.col1.y*h+d.col2.y*g,h=e,d=c.m_xf.R,a=this.m_localAnchor2.x-c.m_sweep.localCenter.x,f=this.m_localAnchor2.y-c.m_sweep.localCenter.y,e=d.col1.x*a+d.col2.x*f,f=d.col1.y*a+d.col2.y*f,a=e,this.m_mass.Solve22(this.impulse2,-(k.x+-l*f-i.x- -j*g),-(k.y+l*a-i.y-j*h)),this.m_impulse.x+=this.impulse2.x,this.m_impulse.y+=this.impulse2.y,i.x-=n*this.impulse2.x,i.y-=n*this.impulse2.y,j-=o*(h*this.impulse2.y-g*this.impulse2.x),k.x+=m*this.impulse2.x,k.y+=m*this.impulse2.y,l+=p*(a*this.impulse2.y-
                                                                                                                                                                                                                                                            f*this.impulse2.x);
    b.m_linearVelocity.SetV(i);
    b.m_angularVelocity=j;
    c.m_linearVelocity.SetV(k);
    c.m_angularVelocity=l
    };

    b2.RevoluteJoint.prototype.SolvePositionConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB,e=0;
    b=0;
    var h,g,f;
    if(this.m_enableLimit&&this.m_limitState!=b2.Joint.e_inactiveLimit){
        a=d.m_sweep.a-c.m_sweep.a-this.m_referenceAngle;
        var i=0;
        this.m_limitState==b2.Joint.e_equalLimits?(a=b2.Math.Clamp(a-this.m_lowerAngle,-b2.Settings.b2_maxAngularCorrection,b2.Settings.b2_maxAngularCorrection),i=-this.m_motorMass*a,e=b2.Math.Abs(a)):this.m_limitState==b2.Joint.e_atLowerLimit?(a-=this.m_lowerAngle,
                                                                                                                             e=-a,a=b2.Math.Clamp(a+b2.Settings.b2_angularSlop,-b2.Settings.b2_maxAngularCorrection,0),i=-this.m_motorMass*a):this.m_limitState==b2.Joint.e_atUpperLimit&&(a-=this.m_upperAngle,e=a,a=b2.Math.Clamp(a-b2.Settings.b2_angularSlop,0,b2.Settings.b2_maxAngularCorrection),i=-this.m_motorMass*a);
        c.m_sweep.a-=c.m_invI*i;
        d.m_sweep.a+=d.m_invI*i;
        c.SynchronizeTransform();
        d.SynchronizeTransform()}b=c.m_xf.R;
    i=this.m_localAnchor1.x-c.m_sweep.localCenter.x;
    a=this.m_localAnchor1.y-c.m_sweep.localCenter.y;
    h=b.col1.x*
        i+b.col2.x*a;
    a=b.col1.y*i+b.col2.y*a;
    i=h;
    b=d.m_xf.R;
    var j=this.m_localAnchor2.x-d.m_sweep.localCenter.x,k=this.m_localAnchor2.y-d.m_sweep.localCenter.y;
    h=b.col1.x*j+b.col2.x*k;
    k=b.col1.y*j+b.col2.y*k;
    j=h;
    g=d.m_sweep.c.x+j-c.m_sweep.c.x-i;
    f=d.m_sweep.c.y+k-c.m_sweep.c.y-a;
    var l=g*g+f*f;
    b=Math.sqrt(l);
    h=c.m_invMass;
    var n=d.m_invMass,m=c.m_invI,o=d.m_invI,p=10*b2.Settings.b2_linearSlop;
    l>p*p&&(l=1/(h+n),g=l*-g,f=l*-f,c.m_sweep.c.x-=0.5*h*g,c.m_sweep.c.y-=0.5*h*f,d.m_sweep.c.x+=0.5*n*g,d.m_sweep.c.y+=
        0.5*n*f,g=d.m_sweep.c.x+j-c.m_sweep.c.x-i,f=d.m_sweep.c.y+k-c.m_sweep.c.y-a);
    this.K1.col1.x=h+n;
    this.K1.col2.x=0;
    this.K1.col1.y=0;
    this.K1.col2.y=h+n;
    this.K2.col1.x=m*a*a;
    this.K2.col2.x=-m*i*a;
    this.K2.col1.y=-m*i*a;
    this.K2.col2.y=m*i*i;
    this.K3.col1.x=o*k*k;
    this.K3.col2.x=-o*j*k;
    this.K3.col1.y=-o*j*k;
    this.K3.col2.y=o*j*j;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Solve(b2.RevoluteJoint.tImpulse,-g,-f);
    g=b2.RevoluteJoint.tImpulse.x;
    f=b2.RevoluteJoint.tImpulse.y;
    c.m_sweep.c.x-=
        c.m_invMass*g;
    c.m_sweep.c.y-=c.m_invMass*f;
    c.m_sweep.a-=c.m_invI*(i*f-a*g);
    d.m_sweep.c.x+=d.m_invMass*g;
    d.m_sweep.c.y+=d.m_invMass*f;
    d.m_sweep.a+=d.m_invI*(j*f-k*g);
    c.SynchronizeTransform();
    d.SynchronizeTransform();
    return b<=b2.Settings.b2_linearSlop&&e<=b2.Settings.b2_angularSlop
    };
    b2.RevoluteJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2.RevoluteJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };

    b2.RevoluteJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.RevoluteJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.z
    };
    b2.RevoluteJoint.prototype.GetJointAngle=function(){
    return this.m_bodyB.m_sweep.a-this.m_bodyA.m_sweep.a-this.m_referenceAngle
    };
    b2.RevoluteJoint.prototype.GetJointSpeed=function(){
    return this.m_bodyB.m_angularVelocity-this.m_bodyA.m_angularVelocity
    };
    b2.RevoluteJoint.prototype.IsLimitEnabled=function(){
    return this.m_enableLimit
    };

    b2.RevoluteJoint.prototype.EnableLimit=function(a){
    this.m_enableLimit=a
    };
    b2.RevoluteJoint.prototype.GetLowerLimit=function(){
    return this.m_lowerAngle
    };
    b2.RevoluteJoint.prototype.GetUpperLimit=function(){
    return this.m_upperAngle
    };
    b2.RevoluteJoint.prototype.SetLimits=function(a,b){
    this.m_lowerAngle=a;
    this.m_upperAngle=b
    };
    b2.RevoluteJoint.prototype.IsMotorEnabled=function(){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    return this.m_enableMotor
    };

    b2.RevoluteJoint.prototype.EnableMotor=function(a){
    this.m_enableMotor=a
    };
    b2.RevoluteJoint.prototype.SetMotorSpeed=function(a){
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed=a
    };
    b2.RevoluteJoint.prototype.GetMotorSpeed=function(){
    return this.m_motorSpeed
    };
    b2.RevoluteJoint.prototype.SetMaxMotorTorque=function(a){
    this.m_maxMotorTorque=a
    };
    b2.RevoluteJoint.prototype.GetMotorTorque=function(){
    return this.m_maxMotorTorque
    };
    b2.RevoluteJoint.prototype.K=new b2.Mat22;

    b2.RevoluteJoint.prototype.K1=new b2.Mat22;
    b2.RevoluteJoint.prototype.K2=new b2.Mat22;
    b2.RevoluteJoint.prototype.K3=new b2.Mat22;
    b2.RevoluteJoint.prototype.impulse3=new b2.Vec3;
    b2.RevoluteJoint.prototype.impulse2=new b2.Vec2;
    b2.RevoluteJoint.prototype.reduced=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_localAnchor1=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_localAnchor2=new b2.Vec2;
    b2.RevoluteJoint.prototype.m_impulse=new b2.Vec3;
    b2.RevoluteJoint.prototype.m_motorImpulse=null;

    b2.RevoluteJoint.prototype.m_mass=new b2.Mat33;
    b2.RevoluteJoint.prototype.m_motorMass=null;
    b2.RevoluteJoint.prototype.m_enableMotor=null;
    b2.RevoluteJoint.prototype.m_maxMotorTorque=null;
    b2.RevoluteJoint.prototype.m_motorSpeed=null;
    b2.RevoluteJoint.prototype.m_enableLimit=null;
    b2.RevoluteJoint.prototype.m_referenceAngle=null;
    b2.RevoluteJoint.prototype.m_lowerAngle=null;
    b2.RevoluteJoint.prototype.m_upperAngle=null;
    b2.RevoluteJoint.prototype.m_limitState=0;

    b2.RevoluteJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.RevoluteJointDef.prototype,b2.JointDef.prototype);
    b2.RevoluteJointDef.prototype._super=b2.JointDef.prototype;

    b2.RevoluteJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_revoluteJoint;
    this.localAnchorA.Set(0,0);
    this.localAnchorB.Set(0,0);
    this.motorSpeed=this.maxMotorTorque=this.upperAngle=this.lowerAngle=this.referenceAngle=0;
    this.enableMotor=this.enableLimit=!1
    };
    b2.RevoluteJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };

    b2.RevoluteJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA=this.bodyA.GetLocalPoint(c);
    this.localAnchorB=this.bodyB.GetLocalPoint(c);
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };
    b2.RevoluteJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.RevoluteJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.RevoluteJointDef.prototype.referenceAngle=null;
    b2.RevoluteJointDef.prototype.enableLimit=null;
    b2.RevoluteJointDef.prototype.lowerAngle=null;

    b2.RevoluteJointDef.prototype.upperAngle=null;
    b2.RevoluteJointDef.prototype.enableMotor=null;
    b2.RevoluteJointDef.prototype.motorSpeed=null;
    b2.RevoluteJointDef.prototype.maxMotorTorque=null;
    b2.WeldJoint=function(){
    b2.Joint.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.WeldJoint.prototype,b2.Joint.prototype);
    b2.WeldJoint.prototype._super=b2.Joint.prototype;

    b2.WeldJoint.prototype.__constructor=function(a){
    this._super.__constructor.apply(this,[a]);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_referenceAngle=a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_mass=new b2.Mat33
    };
    b2.WeldJoint.prototype.__varz=function(){
    this.m_localAnchorA=new b2.Vec2;
    this.m_localAnchorB=new b2.Vec2;
    this.m_impulse=new b2.Vec3;
    this.m_mass=new b2.Mat33
    };

    b2.WeldJoint.prototype.InitVelocityConstraints=function(a){
    var b,c,d=this.m_bodyA,e=this.m_bodyB;
    b=d.m_xf.R;
    var h=this.m_localAnchorA.x-d.m_sweep.localCenter.x,g=this.m_localAnchorA.y-d.m_sweep.localCenter.y;
    c=b.col1.x*h+b.col2.x*g;
    g=b.col1.y*h+b.col2.y*g;
    h=c;
    b=e.m_xf.R;
    var f=this.m_localAnchorB.x-e.m_sweep.localCenter.x,i=this.m_localAnchorB.y-e.m_sweep.localCenter.y;
    c=b.col1.x*f+b.col2.x*i;
    i=b.col1.y*f+b.col2.y*i;
    f=c;
    b=d.m_invMass;
    c=e.m_invMass;
    var j=d.m_invI,k=e.m_invI;
    this.m_mass.col1.x=b+c+g*
        g*j+i*i*k;
    this.m_mass.col2.x=-g*h*j-i*f*k;
    this.m_mass.col3.x=-g*j-i*k;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=b+c+h*h*j+f*f*k;
    this.m_mass.col3.y=h*j+f*k;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=j+k;
    a.warmStarting?(this.m_impulse.x*=a.dtRatio,this.m_impulse.y*=a.dtRatio,this.m_impulse.z*=a.dtRatio,d.m_linearVelocity.x-=b*this.m_impulse.x,d.m_linearVelocity.y-=b*this.m_impulse.y,d.m_angularVelocity-=j*(h*this.m_impulse.y-g*this.m_impulse.x+
                                                                                                              this.m_impulse.z),e.m_linearVelocity.x+=c*this.m_impulse.x,e.m_linearVelocity.y+=c*this.m_impulse.y,e.m_angularVelocity+=k*(f*this.m_impulse.y-i*this.m_impulse.x+this.m_impulse.z)):this.m_impulse.SetZero()
    };

    b2.WeldJoint.prototype.SolveVelocityConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB,e=c.m_linearVelocity,h=c.m_angularVelocity,g=d.m_linearVelocity,f=d.m_angularVelocity,i=c.m_invMass,j=d.m_invMass,k=c.m_invI,l=d.m_invI;
    a=c.m_xf.R;
    var n=this.m_localAnchorA.x-c.m_sweep.localCenter.x,m=this.m_localAnchorA.y-c.m_sweep.localCenter.y;
    b=a.col1.x*n+a.col2.x*m;
    m=a.col1.y*n+a.col2.y*m;
    n=b;
    a=d.m_xf.R;
    var o=this.m_localAnchorB.x-d.m_sweep.localCenter.x,p=this.m_localAnchorB.y-d.m_sweep.localCenter.y;

    b=a.col1.x*o+a.col2.x*p;
    p=a.col1.y*o+a.col2.y*p;
    o=b;
    a=g.x-f*p-e.x+h*m;
    b=g.y+f*o-e.y-h*n;
    var q=f-h,r=new b2.Vec3;
    this.m_mass.Solve33(r,-a,-b,-q);
    this.m_impulse.Add(r);
    e.x-=i*r.x;
    e.y-=i*r.y;
    h-=k*(n*r.y-m*r.x+r.z);
    g.x+=j*r.x;
    g.y+=j*r.y;
    f+=l*(o*r.y-p*r.x+r.z);
    c.m_angularVelocity=h;
    d.m_angularVelocity=f
    };

    b2.WeldJoint.prototype.SolvePositionConstraints=function(){
    var a,b,c=this.m_bodyA,d=this.m_bodyB;
    a=c.m_xf.R;
    var e=this.m_localAnchorA.x-c.m_sweep.localCenter.x,h=this.m_localAnchorA.y-c.m_sweep.localCenter.y;
    b=a.col1.x*e+a.col2.x*h;
    h=a.col1.y*e+a.col2.y*h;
    e=b;
    a=d.m_xf.R;
    var g=this.m_localAnchorB.x-d.m_sweep.localCenter.x,f=this.m_localAnchorB.y-d.m_sweep.localCenter.y;
    b=a.col1.x*g+a.col2.x*f;
    f=a.col1.y*g+a.col2.y*f;
    g=b;
    a=c.m_invMass;
    b=d.m_invMass;
    var i=c.m_invI,j=d.m_invI,k=d.m_sweep.c.x+g-c.m_sweep.c.x-
        e,l=d.m_sweep.c.y+f-c.m_sweep.c.y-h,n=d.m_sweep.a-c.m_sweep.a-this.m_referenceAngle,m=10*b2.Settings.b2_linearSlop,o=Math.sqrt(k*k+l*l),p=b2.Math.Abs(n);
    o>m&&(i*=1,j*=1);
    this.m_mass.col1.x=a+b+h*h*i+f*f*j;
    this.m_mass.col2.x=-h*e*i-f*g*j;
    this.m_mass.col3.x=-h*i-f*j;
    this.m_mass.col1.y=this.m_mass.col2.x;
    this.m_mass.col2.y=a+b+e*e*i+g*g*j;
    this.m_mass.col3.y=e*i+g*j;
    this.m_mass.col1.z=this.m_mass.col3.x;
    this.m_mass.col2.z=this.m_mass.col3.y;
    this.m_mass.col3.z=i+j;
    m=new b2.Vec3;
    this.m_mass.Solve33(m,-k,
                -l,-n);
    c.m_sweep.c.x-=a*m.x;
    c.m_sweep.c.y-=a*m.y;
    c.m_sweep.a-=i*(e*m.y-h*m.x+m.z);
    d.m_sweep.c.x+=b*m.x;
    d.m_sweep.c.y+=b*m.y;
    d.m_sweep.a+=j*(g*m.y-f*m.x+m.z);
    c.SynchronizeTransform();
    d.SynchronizeTransform();
    return o<=b2.Settings.b2_linearSlop&&p<=b2.Settings.b2_angularSlop
    };
    b2.WeldJoint.prototype.GetAnchorA=function(){
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2.WeldJoint.prototype.GetAnchorB=function(){
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };

    b2.WeldJoint.prototype.GetReactionForce=function(a){
    return new b2.Vec2(a*this.m_impulse.x,a*this.m_impulse.y)
    };
    b2.WeldJoint.prototype.GetReactionTorque=function(a){
    return a*this.m_impulse.z
    };
    b2.WeldJoint.prototype.m_localAnchorA=new b2.Vec2;
    b2.WeldJoint.prototype.m_localAnchorB=new b2.Vec2;
    b2.WeldJoint.prototype.m_referenceAngle=null;
    b2.WeldJoint.prototype.m_impulse=new b2.Vec3;
    b2.WeldJoint.prototype.m_mass=new b2.Mat33;

    b2.WeldJointDef=function(){
    b2.JointDef.prototype.__varz.call(this);
    this.__varz();
    this.__constructor.apply(this,arguments)
    };
    extend(b2.WeldJointDef.prototype,b2.JointDef.prototype);
    b2.WeldJointDef.prototype._super=b2.JointDef.prototype;
    b2.WeldJointDef.prototype.__constructor=function(){
    this._super.__constructor.apply(this,arguments);
    this.type=b2.Joint.e_weldJoint;
    this.referenceAngle=0
    };
    b2.WeldJointDef.prototype.__varz=function(){
    this.localAnchorA=new b2.Vec2;
    this.localAnchorB=new b2.Vec2
    };

    b2.WeldJointDef.prototype.Initialize=function(a,b,c){
    this.bodyA=a;
    this.bodyB=b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c));
    this.referenceAngle=this.bodyB.GetAngle()-this.bodyA.GetAngle()
    };
    b2.WeldJointDef.prototype.localAnchorA=new b2.Vec2;
    b2.WeldJointDef.prototype.localAnchorB=new b2.Vec2;
    b2.WeldJointDef.prototype.referenceAngle=null;

    (function(){
    var a={
        log:function(){
        }},b=a.log;
    a.Helper={

    };
    a.Helper.Canvas=function(a,b){
        var c=document.createElement("canvas");
        c.setAttribute("width",a);
        c.setAttribute("height",b);
        return c
    };
    a.FPSCounter=function(a){
        this.t=(new Date).getTime()/1E3;
        this.fps=this.n=0;
        this.draw=function(){
        this.n++;
        if(this.n==10)this.n=0,t=(new Date).getTime()/1E3,this.fps=Math.round(10/(t-this.t)),this.t=t;
        a.fillText("FPS: "+this.fps,1,25)}
    };
    a.Helper.fillTextMultiline=function(a,b,c,g,f){
        $.isArray(b)||(b=b.split("\n"));

        for(var i=0;
        i<b.length;
        i++)a.fillText(b[i],c,g),g+=f
    };
    a.Worker=function(a){
        var c=new Worker(a);
        this.output=null;
        c.onmessage=function(a){
        this.output=a.data
        };
        c.onerror=function(a){
        b("Worker Error "+a.filename+":"+a.lineno+" "+a.message)
        };
        this.tick=function(a){
        c.postMessage(a);
        return this.output}
    };
    a.FakeWorker=function(a){
        this.tick=a
    };
    a.Scheduler=function(a){
        this.ontick=function(){

        };
        this.last=(new Date).getTime()/1E3;
        var b=this;
        this.tick=function(){
        var a=(new Date).getTime()/1E3;
        b.ontick(a-b.last);
        b.last=
            a
        };
        this.setRate=function(a){
        this.rate=a;
        b.interval&&clearInterval(this.interval);
        if(a>0)b.interval=setInterval(this.tick,1E3/a)
        };
        this.setRate(a)
    };
    var c={
        32:"SPACE",13:"ENTER",9:"TAB",8:"BACKSPACE",16:"SHIFT",17:"CTRL",18:"ALT",20:"CAPS_LOCK",144:"NUM_LOCK",145:"SCROLL_LOCK",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",33:"PAGE_UP",34:"PAGE_DOWN",36:"HOME",35:"END",45:"INSERT",46:"DELETE",27:"ESCAPE",19:"PAUSE",222:"'"
    };
    a.KeyTracker=function(a){
        this.focus=!0;
        this.onfocus=function(){

        };
        this.onblur=function(){

        };

        var b=this;
        this.reset=function(){
        for(var a in c)this[c[a]]=!1
        };
        $(document).keydown(function(a){
        b[c[a.keyCode]]=!0;
        return!b.focus});
        $(document).keyup(function(a){
        b[c[a.keyCode]]=!1;
        return!b.focus});
        $(a).click(function(){
        b.focus=!0;
        $(a).addClass("keytracked");
        b.onfocus()});
        $(a).addClass("keytracked");
        $(window).click(function(c){
        if(c.originalEvent.target!=a)$(a).removeClass("keytracked"),b.focus=!1,b.onblur()})
    };
    a.MouseTracker=function(a){
        this.y=this.x=0;
        this.onclick=function(){

        };
        var b=this,c=$(a).offset();

        $(a).click(function(a){
        b.onclick(a,a.pageX-c.left,a.pageY-c.top)});
        $(a).mousemove(function(a){
        b.x=a.pageX-c.left;
        b.y=a.pageY-c.top})
    };
    html5av=document.createElement("video").load!=void 0;
    a.ResourceLoader=function(a,c,h){
        this.loaded=this.total=0;
        var g=this;
        this.load=function(a,d,f){
        var l=document.createElement(a);
        this[d]=l;
        $(l).one("error",h);
        d=function(){
            g.loaded++;
            b("ready",f,g.loaded,g.total);
            g.loaded==g.total&&c()
        };
        a=="video"||a=="audio"?($(l).one("canplaythrough",d),l.setAttribute("autobuffer",
                                            "autobuffer"),l.setAttribute("src",f),l.load()):(l.setAttribute("src",f),$(l).one("load",d));
        this.total++
        };
        for(var f=0;
        f<a.length;
        f++)this.load(a[f][0],a[f][1],a[f][2])
    };
    window.Engine=a})();

    if(typeof exports!=="undefined")exports.b2BoundValues=b2.BoundValues,exports.b2Math=b2.Math,exports.b2DistanceOutput=b2.DistanceOutput,exports.b2Mat33=b2.Mat33,exports.b2ContactPoint=b2.ContactPoint,exports.b2PairManager=b2.PairManager,exports.b2PositionSolverManifold=b2.PositionSolverManifold,exports.b2OBB=b2.OBB,exports.b2CircleContact=b2.CircleContact,exports.b2PulleyJoint=b2.PulleyJoint,exports.b2Pair=b2.Pair,exports.b2TimeStep=b2.TimeStep,exports.b2FixtureDef=b2.FixtureDef,exports.b2World=b2.World,
    exports.b2PrismaticJoint=b2.PrismaticJoint,exports.b2Controller=b2.Controller,exports.b2ContactID=b2.ContactID,exports.b2RevoluteJoint=b2.RevoluteJoint,exports.b2JointDef=b2.JointDef,exports.b2Transform=b2.Transform,exports.b2GravityController=b2.GravityController,exports.b2EdgeAndCircleContact=b2.EdgeAndCircleContact,exports.b2EdgeShape=b2.EdgeShape,exports.b2BuoyancyController=b2.BuoyancyController,exports.b2LineJointDef=b2.LineJointDef,exports.b2Contact=b2.Contact,exports.b2DistanceJoint=b2.DistanceJoint,
    exports.b2Body=b2.Body,exports.b2DestructionListener=b2.DestructionListener,exports.b2PulleyJointDef=b2.PulleyJointDef,exports.b2ContactEdge=b2.ContactEdge,exports.b2ContactConstraint=b2.ContactConstraint,exports.b2ContactImpulse=b2.ContactImpulse,exports.b2DistanceJointDef=b2.DistanceJointDef,exports.b2ContactResult=b2.ContactResult,exports.b2EdgeChainDef=b2.EdgeChainDef,exports.b2Vec2=b2.Vec2,exports.b2Vec3=b2.Vec3,exports.b2DistanceProxy=b2.DistanceProxy,exports.b2FrictionJointDef=b2.FrictionJointDef,
    exports.b2PolygonContact=b2.PolygonContact,exports.b2TensorDampingController=b2.TensorDampingController,exports.b2ContactFactory=b2.ContactFactory,exports.b2WeldJointDef=b2.WeldJointDef,exports.b2ConstantAccelController=b2.ConstantAccelController,exports.b2GearJointDef=b2.GearJointDef,exports.ClipVertex=ClipVertex,exports.b2SeparationFunction=b2.SeparationFunction,exports.b2ManifoldPoint=b2.ManifoldPoint,exports.b2Color=b2.Color,exports.b2PolygonShape=b2.PolygonShape,exports.b2DynamicTreePair=b2.DynamicTreePair,
    exports.b2ContactConstraintPoint=b2.ContactConstraintPoint,exports.b2FrictionJoint=b2.FrictionJoint,exports.b2ContactFilter=b2.ContactFilter,exports.b2ControllerEdge=b2.ControllerEdge,exports.b2Distance=b2.Distance,exports.b2Fixture=b2.Fixture,exports.b2DynamicTreeNode=b2.DynamicTreeNode,exports.b2MouseJoint=b2.MouseJoint,exports.b2DistanceInput=b2.DistanceInput,exports.b2BodyDef=b2.BodyDef,exports.b2DynamicTreeBroadPhase=b2.DynamicTreeBroadPhase,exports.b2Settings=b2.Settings,exports.b2Proxy=b2.Proxy,
    exports.b2Point=b2.Point,exports.b2BroadPhase=b2.BroadPhase,exports.b2Manifold=b2.Manifold,exports.b2WorldManifold=b2.WorldManifold,exports.b2PrismaticJointDef=b2.PrismaticJointDef,exports.b2RayCastOutput=b2.RayCastOutput,exports.b2ConstantForceController=b2.ConstantForceController,exports.b2TimeOfImpact=b2.TimeOfImpact,exports.b2CircleShape=b2.CircleShape,exports.b2MassData=b2.MassData,exports.b2Joint=b2.Joint,exports.b2GearJoint=b2.GearJoint,exports.b2DynamicTree=b2.DynamicTree,exports.b2JointEdge=
    b2.JointEdge,exports.b2LineJoint=b2.LineJoint,exports.b2NullContact=b2.NullContact,exports.b2ContactListener=b2.ContactListener,exports.b2RayCastInput=b2.RayCastInput,exports.b2TOIInput=b2.TOIInput,exports.Features=Features,exports.b2FilterData=b2.FilterData,exports.b2Island=b2.Island,exports.b2ContactManager=b2.ContactManager,exports.b2ContactSolver=b2.ContactSolver,exports.b2Simplex=b2.Simplex,exports.b2AABB=b2.AABB,exports.b2Jacobian=b2.Jacobian,exports.b2Bound=b2.Bound,exports.b2RevoluteJointDef=
    b2.RevoluteJointDef,exports.b2PolyAndEdgeContact=b2.PolyAndEdgeContact,exports.b2SimplexVertex=b2.SimplexVertex,exports.b2WeldJoint=b2.WeldJoint,exports.b2Collision=b2.Collision,exports.b2Mat22=b2.Mat22,exports.b2SimplexCache=b2.SimplexCache,exports.b2PolyAndCircleContact=b2.PolyAndCircleContact,exports.b2MouseJointDef=b2.MouseJointDef,exports.b2Shape=b2.Shape,exports.b2Segment=b2.Segment,exports.b2ContactRegister=b2.ContactRegister,exports.b2DebugDraw=b2.DebugDraw,exports.b2Sweep=b2.Sweep;

    function extend(a,b){
    for(var c in b)a[c]=b[c]}function isInstanceOf(a,b){
        for(;
        typeof a==="object";
           ){
        if(a.constructor===b)return!0;
        a=a._super}return!1
    };


    ig.global.b2 = b2;

});
