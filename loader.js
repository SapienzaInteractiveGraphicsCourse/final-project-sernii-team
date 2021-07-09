import * as THREE from './node_modules/three/build/three.module.js';
import {OBJLoader2} from 'node_modules/three/examples/jsm/loaders/OBJLoader2.js';
import {MTLLoader} from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from './node_modules/three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';


const assets={

  ninjaHead:{objHref:"./assets/ninjaHead.obj", mtlHref:"./assets/ninjaHead.mtl"}

}

const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader2();
mtlLoader.load(assets.ninjaHead.mtlHref, (mtlParseResult) => {
    const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    objLoader.addMaterials(materials);
    objLoader.load(assets.ninjaHead.objHref, (obj) => assets.ninjaHead.obj=obj);
});
