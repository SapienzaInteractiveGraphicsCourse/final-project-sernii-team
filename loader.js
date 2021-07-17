import * as THREE from './libs/three.module.js';
import {OBJLoader} from './libs/OBJLoader.js';
import {MTLLoader} from './libs/MTLLoader.js';
import {GLTFLoader} from './libs/GLTFLoader.js';

export const ninjaHead = {
    manager: new THREE.LoadingManager(),

    loaded: false,

    objHref: "./assets/ninja/ninjaHead.obj",

    mtlHref: "./assets/ninja/ninjaHead.mtl",

    load: function(mesh) {

        this.manager.onLoad=function(){
            this.loaded=true;
            console.log("ninjaHead loaded!");
        }
        this.manager.onProgress= function(url, itemsLoaded, itemsTotal){
            console.log("loaded: " + url);
            //console.log("left: "+ itemsTotal-itemsLoaded);
        }
        const mtlLoader = new MTLLoader(this.manager);
        mtlLoader.load(ninjaHead.mtlHref, (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader(this.manager);
            objLoader.setMaterials(mtl);
            objLoader.load(ninjaHead.objHref, (obj) => {
                this.obj=obj;
                mesh.add(obj);
                //obj.position.set(0,0,0.1);
                obj.position.x+=0.05;
                obj.position.z+=0.1;
                obj.scale.set(0.2,0.2,0.2);
                obj.rotation.y=(Math.PI/2);
                //const box = new THREE.Box3().setFromObject(obj);
                //const boxSize = box.getSize(new THREE.Vector3());
                //const boxCenter = box.getCenter(new THREE.Vector3());
                //console.log(boxSize);
                //console.log(boxCenter);
                //console.log(scene.position);
            });
        });

    },

}

export const lavaGround={
    loader: new GLTFLoader(),

    gltfHref: "./assets/lavaModel/scene.gltf",

    onLoadFunction: function(gltf){

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },

    onProgressFunction: function(xhr){

    },

    load: function(scene){

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( "assets/lava3/textures/Terrain_baseColor.png" );
        var roughTexture = textureLoader.load( "assets/lava3/textures/Terrain_normal.png" );
        texture.flipY = false;

        this.loader.load( this.gltfHref, (gltf)=>{
            //gltf.scene.scale.set(0.3,0,0.3);
            //console.log(gltf.scene);
            scene.add(gltf.scene);
            gltf.scene.scale.set(0.6,0.6,0.6);
            //gltf.scene.position.x-=200;
            gltf.scene.position.y+=700;
            //gltf.scene.rotation.x=Math.PI;
            var model = gltf.scene;
            model.traverse ( ( o ) => {
                if ( o.isMesh ) {
                    // note: for a multi-material mesh, `o.material` may be an array,
                    // in which case you'd need to set `.map` on each value.
                    o.material.map = texture;
                    //o.material.roughnessMap = roughTexture;
                    o.material.normalMap = roughTexture;

                }
            });

            //gltf.animations; // Array<THREE.AnimationClip>
            //gltf.scene); // THREE.Group
            //gltf.scenes; // Array<THREE.Group>
            //gltf.cameras; // Array<THREE.Camera>
            //gltf.asset; // Object

        }, this.onProgressFunction );
    }

}

export class SpikeBall{
    constructor(params){

        this.mesh=params.scene;
        this.manager=new THREE.LoadingManager();
        //this.loaded=false;
        this.objHref="./assets/spikeBall/spikeball.obj";
        this.mtlHref="./assets/spikeBall/spikeball.mtl";
        this.obj=0;

    }

    load(){
        this.manager.onLoad=function(){
            this.loaded=true;
            //console.log("spikeBall loaded!");
        }
        this.manager.onProgress= function(url, itemsLoaded, itemsTotal){
            //console.log("loaded: " + url);
            //console.log("left: "+ itemsTotal-itemsLoaded);
        }
        const mtlLoader = new MTLLoader(this.manager);
        mtlLoader.load(this.mtlHref, (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader(this.manager);
            objLoader.setMaterials(mtl);
            objLoader.load(this.objHref, (obj) => {
                this.obj=obj;
                this.mesh.add(obj);
                //obj.position.set(0,0,0.1);
                //obj.position.x+=0.05;
                //obj.position.z+=0.1;
                //obj.scale.set(0.2,0.2,0.2);
                //obj.rotation.y=(Math.PI/2);
                //const box = new THREE.Box3().setFromObject(obj);
                //const boxSize = box.getSize(new THREE.Vector3());
                //const boxCenter = box.getCenter(new THREE.Vector3());
                //console.log(boxSize);
                //console.log(boxCenter);
                //console.log(scene.position);
            });
        });
    }
}
