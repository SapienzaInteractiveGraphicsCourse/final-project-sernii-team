import * as THREE from './node_modules/three/build/three.module.js';
import {Player} from './player.js';
import {WorldManager} from './world.js';
import {CollisionsDetector} from './collisions.js'
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js'
import * as GUI from './node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js'


// canvas
const canvas = document.getElementById('game-canvas');

//Scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.001, 1000);
//camera.position.set(0.7,2.1,-3.4);
//camera.rotation.set(0,15.3,0);
camera.position.set(2.5,3,4.3);
camera.rotation.set(0,6.4,0);
//camera.position.set(3, 1.1, -2);
//camera.rotation.set(0, 2, 0);
//camera.position.set(4, 2.1, -2);
//camera.rotation.set(0,2,0);
//camera.position.set(0, 1,2.5);
//camera.position.set(-2, 0.2, 0.7);
//camera.rotation.set(0,-2,0);
//camera.rotation.set(0,2,0);
//camera.up.set(0,0,1);
//camera.lookAt(0,0,1);

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

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
//renderer.autoClear = true;
//document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true;

var prevTime = 0;
var aTime = 0;


const animate = function(timeElapsed) {
    //renderer.clear()

    if (prevTime == null) {
        prevTime = timeElapsed;
    }
    if (timeElapsed == null) {
        timeElapsed = 0;
    }

    aTime = (timeElapsed - prevTime) * 0.001;
    prevTime = timeElapsed;

    //TWEEN.update();

    if(!collisionsDetector_.getgameOverFlag()){
        world_.Update(aTime);
        player_.Update(aTime);
        collisionsDetector_.Update(aTime);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

};
const player_= new Player({
  scene: scene,
  //GUI: gui,
  //worldCollider: world.getColliderCollection,
});

const world_ = new WorldManager({
  scene: scene
});

const collisionsDetector_ = new CollisionsDetector({
    player: player_,
    world: world_,
    scene: scene,
});

window.onload = function init() {
    animate();
}
