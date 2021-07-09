import * as THREE from './node_modules/three/build/three.module.js';
import {OBJLoader2} from './node_modules/wwobjloader2/src/loaders/OBJLoader2.js';
import {MTLLoader} from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from './node_modules/wwobjloader2/src/loaders/utils/MtlObjBridge.js';


const obj={

  ninjaHead:{objHref:"./assets/ninjaHead.obj", mtlHref:"./assets/ninjaHead.mtl"}

}

const mtlLoader = new MTLLoader();
mtlLoader.load("./assets/ninjaHead.mtl", mtlParseResult => {
    const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    const objLoader = new OBJLoader2();
    objLoader.addMaterials(materials);
    objLoader.load("model.obj", obj => scene.add(obj));
});
