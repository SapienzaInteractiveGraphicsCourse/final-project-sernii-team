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

//lights
//const ambientLight = new THREE.AmbientLight(0x404040);
const ambientLight = new THREE.AmbientLight(0xff4e01);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(0, 100, 0);
scene.add(dirLight);

const spotLight = new THREE.SpotLight( 0xcf6010 );
spotLight.position.set( 10, 30, 0 );
//scene.add( spotLight );

//const light = new THREE.PointLight( 0xff0000, 1, 100 );
//light.position.set( 0, 0, 0 );
//scene.add( light );

const skyColor = 0x333333;  // light blue
const groundColor = 0xF56801;  // brownish orange
const intensity = 1;
const hemispherelight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
//scene.add(hemispherelight);

const size = 100;
const divisions = 100;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

const player_= new Player({
  scene: scene
});


//let parts=player_.getCharacterParts();
const animationManager_= new AnimationManager(
    player_.getCharacterParts()
);

const world_ = new WorldManager({
  scene: scene
});

const collisionsDetector_ = new CollisionsDetector({
    player: player_,
    world: world_,
    scene: scene,
});

const controlManager_= new ControlManager({
    animationManager: animationManager_,
})


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
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

    if(!collisionsDetector_.getgameOverFlag()){
        //world_.Update(aTime);
        player_.Update(aTime);
        controlManager_.Update(timeElapsed);
        //collisionsDetector_.Update(aTime);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);

};

requestAnimationFrame(render);

}

main();
