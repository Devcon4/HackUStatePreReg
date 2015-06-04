/**
 * Created by Devyn on 3/25/2015.
 */

var c = document.getElementById("MainCanvas");
var ctx = c.getContext("2d");

var width = c.width, height = c.height;
var cWidth = width/2, cHeight = height/2;

var aspectRatio = 16/10;

var mainCamera = new Camera(new Vector3(0,0,0), new Quaternion(0,0,0,0), 25);

var FPS = 60;
var frames = 0;

//Array that holds all GameObjects in the game.
var gameObjects = [];

//resizeCanvas Function; resize's the screen to fit the browser.
function resizeCanvas(){
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    width = c.width;
    height = c.height;

    cWidth = width/2;
    cHeight = height/2;

    ctx.translate(cWidth,cHeight);
}

//The main clock of the engine.
//setInterval(function() {
//    update();
//    physics();
//    draw();
//    frames++;
//}, 1000/FPS);

function animloop(){
  requestAnimationFrame(animloop);
  update();
  physics();
  draw();
  //frames++;
};
requestAnimationFrame(animloop);

//physics function; A core function that handles the physics engine.
function physics(){
    for(var i = 0; i < gameObjects.length; i++){
        var pos = gameObjects[i].position;
        var vel = gameObjects[i].velocity;

        gameObjects[i].position = new Vector3(pos.x + vel.x, pos.y + vel.y, pos.z + vel.z);
    }
}

//draw Function; A core function that draws the screen.
function draw(){
    ctx.clearRect(-cWidth, -cHeight, width, height);

    for(var i = 0; i < gameObjects.length; i++){
        gameObjects[i].type.render(gameObjects[i]);
    }

/*
    ctx.strokeStyle = '#FF0000';
    ctx.globalAlpha = .5;
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(.5,.5);
    ctx.lineTo(.5,-.5);
    ctx.lineTo(-.5,-.5);
    ctx.lineTo(-.5,.5);
    ctx.lineTo(.5,.5);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
*/

/*    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#000';*/

    if(false){

      ctx.strokeStyle = '#FF0000';
      ctx.globalAlpha = .5;
      ctx.fillStyle = '#FF0000';

      ctx.beginPath();
      ctx.moveTo(mainCamera.nearPlane.rect.xx.x, mainCamera.nearPlane.rect.xx.y);
      ctx.lineTo(mainCamera.nearPlane.rect.xy.x, mainCamera.nearPlane.rect.xy.y);
      ctx.lineTo(mainCamera.nearPlane.rect.yy.x, mainCamera.nearPlane.rect.yy.y);
      ctx.lineTo(mainCamera.nearPlane.rect.yx.x, mainCamera.nearPlane.rect.yx.y);
      ctx.lineTo(mainCamera.nearPlane.rect.xx.x, mainCamera.nearPlane.rect.xx.y);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = '#0000FF';

      ctx.beginPath();
      ctx.moveTo(mainCamera.farPlane.rect.xx.x, mainCamera.farPlane.rect.xx.y);
      ctx.lineTo(mainCamera.farPlane.rect.xy.x, mainCamera.farPlane.rect.xy.y);
      ctx.lineTo(mainCamera.farPlane.rect.yy.x, mainCamera.farPlane.rect.yy.y);
      ctx.lineTo(mainCamera.farPlane.rect.yx.x, mainCamera.farPlane.rect.yx.y);
      ctx.lineTo(mainCamera.farPlane.rect.xx.x, mainCamera.farPlane.rect.xx.y);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.strokeStyle = '#000';
    }
}

//Rotation Function; takes vec (Vector3) and rot (Quaternion) and returns a rotated Vector3.
function Rotation(vec, rot){
    //if(Math.acos((vec.x + vec.y + vec.z -1)/2) === 0) { return vec; }
    var qVec = new Quaternion(vec.x, vec.y, vec.z, 0);
    qVec = Quaternions.multiply(rot, qVec);
    qVec = Quaternions.multiply(qVec, rot.conjugate());
    return new Vector3(qVec.x, qVec.y, qVec.z);
}

//Project Function; takes camera (Camera), and vec (Vector3) and returns a shifted Vector3.
function Project(camera, vec){
  if(camera.position.magnitude() + camera.rotation.magnitude() === 0){ return vec }
  vec = Rotation(vec, camera.rotation);
  return new Vector2(((camera.position.z / vec.z) * vec.x) - camera.plane.position.x,
                     ((camera.position.z / vec.z) * vec.y) - camera.plane.position.y);
}

//GameObject constructor; takes Position  (number), Rotation (number), Camera (camera), Type (number) to represent GameObjects.
function GameObject (Name, Position, Rotation, Camera, Type){
    this.name = Name;
    this.position = Position;
    this.rotation = Rotation;
    this.camera = Camera;
    this.velocity = new Vector3(0,0,0);
    this.type = Type;
    this.mesh = [];
}

// Camera constructor; takes Position(Vector3), Rotation (Quaternion), RenderDistance (number) and projects the scene onto a viewing face.
function Camera(Position, Rotation, RenderDistance){
  this.position = Position;
  this.rotation = Rotation;
  this.renderDistance = RenderDistance;
  this.active = true;
  this.fov = 90;
  this.plane = new Plane(new Vector3(0,0,0), new Rect(this.position.x-width, this.position.y-height));
}

//Plane constructor; takes Position(Vector3), Rect(Rect) and represents a 2D plane.
function Plane(Position, Rect){
  this.position = Position;
  this.rect = Rect;
}

//Rect constructor; takes Height (number), Width (number) to represent a plane.
function Rect(Height, Width){
  this.xx = new Vector3(Height/2, Width/2, 0);
  this.xy = new Vector3(Height/2, -Width/2, 0);
  this.yy = new Vector3(-Height/2, -Width/2, 0);
  this.yx = new Vector3(-Height/2, Width/2, 0);
}

//Vector4 constructor; takes x (number), y (number), z (number), w (number) to represent a coordinate in Four dimensional space.
function Vector4 (X,Y,Z,W) {
    this.x = X;
    this.y = Y;
    this.z = Z;
    this.w = W;
    this.magnitude = function(){
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
    };
    this.sqrMagnitude = function(){
        return (this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w);
    };
    this.normalize = function(){
        return new Vector4(this.x/this.magnitude(), this.y/this.magnitude(), this.z/this.magnitude(), this.w/this.magnitude());
    };
}

//Vector3 constructor; takes x (number), y (number), z (number) to represent a coordinate in Three dimensional space.
function Vector3 (X,Y,Z) {
    this.x = X;
    this.y = Y;
    this.z = Z;
    this.magnitude = function(){
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    };
    this.sqrMagnitude = function(){
        return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
    };
    this.normalize = function(){
        return new Vector3(this.x/this.magnitude(), this.y/this.magnitude(), this.z/this.magnitude());
    };
}

//Vector2 constructor; takes x (number), y (number) to represent a coordinate in Two dimensional space.
function Vector2 (X,Y) {
    this.x = X;
    this.y = Y;
    this.magnitude = function(){
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    this.sqrMagnitude = function(){
        return (this.x * this.x) + (this.y * this.y);
    };
    this.normalize = function(){
        return new Vector2(this.x/this.magnitude(), this.y/this.magnitude());
    };
}

//Vectors Object; contains many different classes useful for Vector3.
var Vectors = Vectors || {};
Vectors.angle = function(from, to){
    return Math.acos(Vectors.dotProduct(from.normalize(), to.normalize())) * (180 / Math.PI);
};
Vectors.dotProduct = function(VecA, VecB){
    return ((VecA.x * VecB.x) + (VecA.y * VecB.y) + (VecA.z * VecB.z));
};
Vectors.distance = function(VecA, VecB) {
    return new Vector3(VecA.x - VecB.x, VecA.y - VecB.y, VecA.z - VecB.z).magnitude();
};

//Quaternion Constructor; takes a x (number), y (number), z (number), w (number) to represent rotation.
function Quaternion (x, y, z, w){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.magnitude = function(){
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
    };
    this.sqrMagnitude = function(){
        return (this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w);
    };
    this.normalize = function(){
        return new Quaternion(this.x/this.magnitude(), this.y/this.magnitude(), this.z/this.magnitude(), this.w/this.magnitude());
    };
    this.eulerAngles = function(){
        var thisQua = this, heading = 0, attitude = 0, bank = 0;
        attitude = Math.asin((2 * thisQua.x * thisQua.y) + (2 * thisQua.z * thisQua.w));
        bank = Math.atan2((2 * thisQua.x * thisQua.w) - (2 * thisQua.y * thisQua.z), 1 - (2 * (thisQua.x * thisQua.x)) - (2 * (thisQua.z * thisQua.z)));
        if(thisQua.x * thisQua.y + thisQua.y * thisQua.z === .5){
          heading = 2 * Math.atan2(thisQua.x, thisQua.w);
          bank = 0;
        } else if(thisQua.x * thisQua.y + thisQua.y * thisQua.z === -.5){
          heading = -2 * Math.atan2(thisQua.x, thisQua.w);
          bank = 0;
        } else {
          heading = Math.atan2((2 * thisQua.y * thisQua.w) - (2 * thisQua.x * thisQua.z), 1 - 2*(thisQua.z * thisQua.z));
        }
        return new Vector3(heading, attitude, bank);
    };
    this.conjugate = function(){
        return new Quaternion(-this.x, -this.y, -this.z, this.w);
    };
}

//Quaternions Objects; contains many different classes useful for Quaternion.
var Quaternions = Quaternions || {};
Quaternions.identity = function(){
  return Quaternions.euler(new Vector3(0,0,0));
};
Quaternions.euler = function(Vec){
    var c1 = Math.cos(Vec.x/2), c2 = Math.cos(Vec.y/2), c3 = Math.cos(Vec.z/2);
    var s1 = Math.sin(Vec.x/2), s2 = Math.sin(Vec.y/2), s3 = Math.sin(Vec.z/2);
    return new Quaternion((c1 * c2 * c3) - (s1 * s2 * s3), (s1 * s2 * c3) + (c1 * c2 * s3),
        (s1 * c2 * c3) + (c2 * s1 * s3), (c1 * s2 * c3) - (s1 * c2 * s3));
};
Quaternions.multiply = function(Qua1, Qua2){
    return new Quaternion(Qua1.w * Qua2.w - Qua1.x * Qua2.x - Qua1.y * Qua2.y - Qua1.z * Qua2.z,
                          Qua1.w * Qua2.x + Qua1.x * Qua2.w + Qua1.y * Qua2.z - Qua1.z * Qua2.y,
                          Qua1.w * Qua2.y + Qua1.y * Qua2.w + Qua1.z * Qua2.w - Qua1.x * Qua2.z,
                          Qua1.w * Qua2.z + Qua1.z * Qua2.w + Qua1.x * Qua2.y - Qua1.y * Qua2.x);
};

//Converter Object; contains many different classes useful for Converter.
var Converter = Converter || {};
Converter.radToDeg = function(rad){
    return rad * (180 / Math.PI);
};
Converter.degToRad = function(deg){
    return deg * (Math.PI / 180);
};
