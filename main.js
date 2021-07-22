import * as THREE from './libs/three.module.js';
import {Player} from './player.js';
import {WorldManager} from './world.js';
import {CollisionsDetector} from './collisions.js'
import {AnimationManager} from './animations.js'
import{ControlManager} from './controls.js'
import Stats from './libs/stats.module.js'
import * as GUI from './libs/dat.gui.module.js'
import {OrbitControls} from './libs/OrbitControls.js'


function main(){
// canvas
const canvas = document.getElementById('game-canvas');

//Scene
const scene = new THREE.Scene();
scene.background=new THREE.Color( 0x181818 );
//const texture = new THREE.TextureLoader().load( './assets/cave_background/back_cave.png' );
//const material = new THREE.MeshBasicMaterial( { map: texture } );
//scene.background=texture;

//camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.set(2.5,3,4.3);
camera.rotation.set(0,6.4,0);

//gui
/*
const gui = new GUI.GUI();
const cameraRotationFolder = gui.addFolder("cameraRotationFolder")
cameraRotationFolder.add(camera.rotation, "x", -10, Math.PI * 10);
cameraRotationFolder.add(camera.rotation, "y", -10, Math.PI * 10);
cameraRotationFolder.add(camera.rotation, "z", -10, Math.PI * 10);

const cameraPositionFolder = gui.addFolder("cameraPositionFolder");
cameraPositionFolder.add(camera.position, "x", -10, Math.PI * 10);
cameraPositionFolder.add(camera.position, "y", -10, Math.PI * 10);
cameraPositionFolder.add(camera.position, "z", -10, Math.PI * 10);
*/



const size = 100;
const divisions = 100;

/*
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
*/

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

const world_ = new WorldManager({
  scene: scene
});

/*
const player_= new Player({
  scene: scene,
});

//let parts=player_.getCharacterParts();
const animationManager_= new AnimationManager(
    player_.getCharacterParts()
);



const collisionsDetector_ = new CollisionsDetector({
    player: player_,
    world: world_,
    scene: scene,
    animationManager: animationManager_,
});

const controlManager_= new ControlManager({
    animationManager: animationManager_,
    player: player_,
})
*/

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff)
renderer.shadowMap.enabled = true;
//renderer.autoClear = true;
//document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true;

let prevTime = 0;
let aTime = 0;


const render= function(timeElapsed) {
    //renderer.clear()

    if (prevTime == null) {
        prevTime = timeElapsed;
    }
    if (timeElapsed == null) {
        timeElapsed = 0;
    }

    aTime = (timeElapsed - prevTime) * 0.001;
    prevTime = timeElapsed;

    TWEEN.update();

    //if(!collisionsDetector_.getgameOverFlag()){
        world_.Update(aTime);
        //player_.Update(aTime);
        //controlManager_.Update(timeElapsed);
        //collisionsDetector_.Update(aTime);
    //}
    renderer.render(scene, camera);
    requestAnimationFrame(render);

};

requestAnimationFrame(render);
}

main();
