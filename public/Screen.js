/**
 * Created by Devyn on 6/3/2015.
 */

init();

function init(){
    var pinkColors = ['rgb(142, 43, 71)', 'rgb(142, 43, 71)'];
    var cyanColors = ['rgb(110, 215, 168)', 'rgb(110, 215, 168)'];
    var grayColors = ['rgb(104, 104, 104)', 'rgb(104, 104, 104)'];
    var tanColors = ["rgb(239, 232, 180)", "rgb(239, 232, 180)"];
    var colorPalettes = [grayColors, cyanColors, pinkColors];
    resizeCanvas();

    var screenArea = width/height;
    for(var k = 0; k < 25*screenArea; k++) {
        gameObjects[gameObjects.length] = new GameObject("poly-"+k, new Vector3((Math.random()*width+100)-cWidth, (Math.random()*height+100)-cHeight, 0), Quaternions.identity(), mainCamera, new Polygon(250, (Math.random()*6) + 3));
    }

    for(var i = 0; i < gameObjects.length; i++){
        gameObjects[i].velocity = new Vector3((Math.random() -.5) * 1, (Math.random() -.5) * 1, 0);

        var corners = [];
        for(var j = 0; j < gameObjects[i].type.pointCount; j++){
            corners[corners.length]= new Vector3(Math.random() -.5, Math.random() -.5, 0);
        }
        gameObjects[i].type.corners = corners;
        gameObjects[i].type.palette = colorPalettes[Math.floor(Math.random()*colorPalettes.length)].slice(0);
    }
}

function update(){
    for(var i = 0; i < gameObjects.length; i++){
        var pos = gameObjects[i].position;
        var vel = gameObjects[i].velocity;
        if(pos.x < -cWidth || pos.x > cWidth){vel.x = -vel.x}
        if(pos.y < -cHeight || pos.y > cHeight){vel.y = -vel.y}
        gameObjects[i].velocity = vel;
    }
}

function Polygon(size, pointCount){
    this.size = size;
    this.pointCount = pointCount;
    this.corners = [];
    this.palette = [];

    this.render = function (GameObject) {
        makePolygon(GameObject, this.size, this.corners);
    };
}

function makePolygon(GameObject, size, corners){

    for(var j = 0; j < corners.length; j++){
        GameObject.mesh[j] = new Vector3((corners[j].x * size) + (GameObject.position.x - (size / 2)), (corners[j].y * size) + (GameObject.position.y - (size / 2)), (corners[j].z * size) + (GameObject.position.z - (size / 2)));
    }

    //for(var k = 0; k < GameObject.mesh.length; k++){
        //if(GameObject.camera.active){
            //var rotV = Rotation(GameObject.mesh[k], GameObject.rotation);
            //rotV = Project(GameObject.camera, rotV);
            //GameObject.mesh[k] = new Vector2(rotV.x, rotV.y);
        //}
    //}

    if(corners.length > 0) {

        ctx.globalAlpha = .25;
        ctx.fillStyle = GameObject.type.palette[1];
        ctx.beginPath();
        ctx.moveTo(GameObject.mesh[0].x, GameObject.mesh[0].y);

        for (var v = 1; v < GameObject.mesh.length; v++) {
            ctx.lineTo(GameObject.mesh[v].x, GameObject.mesh[v].y);
        }
        
        ctx.lineTo(GameObject.mesh[0].x, GameObject.mesh[0].y);

        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = GameObject.type.palette[0];
        ctx.globalAlpha = .9;
        ctx.beginPath();
        ctx.moveTo(GameObject.mesh[0].x-10, GameObject.mesh[0].y-10);

        for (var w = 1; w < GameObject.mesh.length; w++) {
            ctx.lineTo(GameObject.mesh[w].x-10, GameObject.mesh[w].y-10);
        }
        
        ctx.lineTo(GameObject.mesh[0].x-10, GameObject.mesh[0].y-10);
        ctx.closePath();
        ctx.fill();
    }else{console.log("ERR: Corners is empty on GameObject "+GameObject.name);}

}