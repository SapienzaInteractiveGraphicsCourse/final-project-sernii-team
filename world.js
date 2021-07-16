import * as THREE from './libs/three/build/three.module.js';
import {lavaGround} from "./loader.js";
import {SpikeBall} from "./loader.js"


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
        //this.mesh=new THREE.Object3D();
        /*this.mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshPhongMaterial({
            color: 0x88FF88
          })
        );*/
        this.mesh=new THREE.Mesh();
        //this.mesh.position.y+=0.5;
        this.mesh.position.x+=0.5;
        //this.mesh.add(cube);
        this.spikeBall=new SpikeBall({scene: this.mesh});
        this.spikeBall.load();
        this.boxHelper=new THREE.BoxHelper(this.mesh, 0xf400a1);
        this.scene=params.scene;
        this.scene.add(this.boxHelper);

        this.collider=new THREE.Box3();
        //this.collider.setFromObject(this.mesh);
        //this.mesh.add(this.collider);
    }

    getMesh(){
        return this.mesh;
    }

    getCollider(){
        return this.collider;
    }

    updateCollider(){
        this.collider.setFromObject(this.mesh);
        this.boxHelper.update();
    }

    Update(timeElapsed){
        this.updateCollider();
    }
};

export class WorldManager {

  constructor(params) {
    this.objects = [[],[],[]];
    this.scene = params.scene;
    this.unused = [];
    this.speed = [INITIAL_SPEED, INITIAL_SPEED, INITIAL_SPEED];
    this.separation_distance = [SEPARATIONDISTANCE, SEPARATIONDISTANCE, SEPARATIONDISTANCE];
    this.spawn_distance = [SPAWNDISTANCE, SPAWNDISTANCE, SPAWNDISTANCE];

    const geometry = new THREE.PlaneGeometry( 6, 54);
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    this.worldMesh=new THREE.Mesh(geometry,material);
    this.worldMesh.rotation.x=Math.PI/2;
    this.worldMesh.position.z+=-25;
    this.scene.add(this.worldMesh);

    lavaGround.load(this.scene);
    /*const lavaGeometry = new THREE.PlaneGeometry( 1000, 1000);

    const lavaDisplacementMap = new THREE.TextureLoader().load( "./assets/DisplacementMapLava.png" );
    const lavaNormalMap = new THREE.TextureLoader().load( "./assets/NormalMapLava.png" );

    const lavaTexture = new THREE.TextureLoader().load( "./assets/lava.jpg" );
    lavaTexture.wrapS = THREE.RepeatWrapping;
    lavaTexture.wrapT = THREE.RepeatWrapping;
    lavaTexture.repeat.set( 200, 200 );
    lavaTexture.magFilter= THREE.NearestFilter;
    lavaTexture.minFilter= THREE.NearestFilter;
    const lavaMaterial = new THREE.MeshStandardMaterial(
        {
            map: lavaTexture,
            normalMap:lavaNormalMap,
            //bumpMap:lavaNormalMap,
            displacementMap: lavaDisplacementMap,
            side: THREE.DoubleSide,
            //emissive: 0xe56520,
        });

    //const lavaMaterial = new THREE.MeshBasicMaterial( {color: "black", side: THREE.DoubleSide} );
    const lava=new THREE.Mesh(lavaGeometry,lavaMaterial);
    lava.position.y-=5;
    lava.rotation.x=Math.PI/2;
    this.scene.add(lava);
    */
  }

  getObjects(){

      return (this.objects);

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
        //break;

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

    const obj=new WorldObject({scene: this.scene});
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
    }

    //preferisco farlo nel collider manager
    /*
    for(let obj of this.objects[Right]){
        obj.Update(timeElapsed);
        //this.boxHelper.update();
    }
    for(let obj of this.objects[Left]){
        obj.Update(timeElapsed);
        //this.boxHelper.update();
    }
    for(let obj of this.objects[Center]){
        obj.Update(timeElapsed);
        //this.boxHelper.update();
    }
    */


    const invisible = [];
    const visible = [];
    //this.objects= visible;
    //this.unused.push(...invisible);

  }

};
