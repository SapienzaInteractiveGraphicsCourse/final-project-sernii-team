import * as THREE from './node_modules/three/build/three.module.js';

const SPAWNDISTANCE=100;
const SEPARATIONDISTANCE=20;

const RIGHT_X_SPAWN=2.5;
const LEFT_X_SPAWN=-1.5;

const INITIAL_SPEED=10;

const Right=0;
const Left=1;
const Center=2;

class WorldObject{

  constructor(params) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    this.mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0x88FF88
      })
    );
    this.mesh.position.y+=0.5;
    this.mesh.position.x+=0.5;
  }
}

export class WorldManager {



  constructor(params) {
    this.objects = [[],[],[]];
    this.scene = params.scene;
    this.unused = [];
    this.speed = [INITIAL_SPEED, INITIAL_SPEED, INITIAL_SPEED];
    this.separation_distance = [SEPARATIONDISTANCE, SEPARATIONDISTANCE, SEPARATIONDISTANCE];
    this.spawn_distance = [SPAWNDISTANCE, SPAWNDISTANCE, SPAWNDISTANCE];

  }

  ShouldISpawn(type){

    switch (type) {
      case Right:
      if(this.objects[Right].length==0){
        this.SpawnObj(Right);
      }
      else{
        //distance between last spawned object and the spawn location
        var dist=Math.abs(
          this.objects[Right][this.objects[Right].length-1].mesh.position.z
          +
          this.spawn_distance[Right]
        );
        if(dist > this.separation_distance[Right]){
          this.SpawnObj(Right);
        }
      }
      break;
        break;

      case Center:
        if(this.objects[Center].length==0){
          this.SpawnObj(Center);
        }
        else{
          //distance between last spawned object and the spawn location
          var dist=Math.abs(
            this.objects[Center][this.objects[Center].length-1].mesh.position.z
            +
            this.spawn_distance[Center]
          );
          if(dist > this.separation_distance[Center]){
            this.SpawnObj(Center);
          }
        }
        break;

      case Left:
      if(this.objects[Left].length==0){
        this.SpawnObj(Left);
      }
      else{
        //distance between last spawned object and the spawn location
        var dist=Math.abs(
          this.objects[Left][this.objects[Left].length-1].mesh.position.z
          +
          this.spawn_distance[Left]
        );
        if(dist > this.separation_distance[Left]){
          this.SpawnObj(Left);
        }
      }
      break;



    }

  }

  SpawnObj(type){

    const obj=new WorldObject();
    obj.mesh.position.z-=100;


    switch (type) {
      case Right:
        obj.mesh.position.x=RIGHT_X_SPAWN;
        this.objects[Right].push(obj);
        break;

      case Center:
        this.objects[Center].push(obj);
        break;

      case Left:
        obj.mesh.position.x=LEFT_X_SPAWN;
        this.objects[Left].push(obj);
        break;


    }

    this.scene.add(obj.mesh);

  }

  Update(timeElapsed){

    this.ShouldISpawn(Center);
    for(let obj of this.objects[Center]){
      obj.mesh.position.z+=timeElapsed*this.speed[Center];

      if (obj.mesh.position.z>0){
        //invisible.push(obj);
        obj.mesh.visible =false;
      }
      else{
        //visible.push(obj);
      }
      //obj.Update(timeElapsed);
    }

    this.ShouldISpawn(Left);

    for(let obj of this.objects[Left]){
      obj.mesh.position.z+=timeElapsed*this.speed[Left];

      if (obj.mesh.position.z>0){
        //invisible.push(obj);
        obj.mesh.visible =false;
      }
      else{
        //visible.push(obj);
      }
      //obj.Update(timeElapsed);
    }

    this.ShouldISpawn(Right);

    for(let obj of this.objects[Right]){
      obj.mesh.position.z+=timeElapsed*this.speed[Right];

      if (obj.mesh.position.z>0){
        //invisible.push(obj);
        obj.mesh.visible =false;
      }
      else{
        //visible.push(obj);
      }
      //obj.Update(timeElapsed);
    }

    const invisible = [];
    const visible = [];





    //this.objects= visible;
    //this.unused.push(...invisible);

  }
}
