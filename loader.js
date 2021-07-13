import * as THREE from './node_modules/three/build/three.module.js';
import {OBJLoader} from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from './node_modules/three/examples/jsm/loaders/MTLLoader.js';

export const ninjaHead = {
    manager: new THREE.LoadingManager(),

    loaded: false,

    objHref: "./assets/ninjaHead.obj",

    mtlHref: "./assets/ninjaHead.mtl",

    load: function(mesh) {

        this.manager.onLoad=function(){
            this.loaded=true;
            console.log("done!");
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
