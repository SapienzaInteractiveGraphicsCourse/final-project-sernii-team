import * as THREE from './node_modules/three/build/three.module.js';
import {Player} from './player.js';
import {WorldManager} from './world.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js'
import * as GUI from './node_modules/three/examples/jsm/libs/dat.gui.module.js'



// canvas
const canvas = document.getElementById('game-canvas');

//Scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 7);
//camera.up.set(0,0,1);
//camera.lookAt(0,0,1);

//gui
var gui = new GUI.GUI();
const cameraRotationFolder = gui.addFolder("cameraRotationFolder")
cameraRotationFolder.add(camera.rotation, "x", -1, Math.PI * 2);
cameraRotationFolder.add(camera.rotation, "y", -1, Math.PI * 2);
cameraRotationFolder.add(camera.rotation, "z", -1, Math.PI * 2);

const cameraPositionFolder = gui.addFolder("cameraPositionFolder");
cameraPositionFolder.add(camera.position, "x", -1, Math.PI * 2);
cameraPositionFolder.add(camera.position, "y", -1, Math.PI * 2);
cameraPositionFolder.add(camera.position, "z", -1, Math.PI * 2);


//lights
//const ambientLight = new THREE.AmbientLight(0x282828, 0.6);
const ambientLight = new THREE.AmbientLight(0x000000, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(200, -200, 300);
scene.add(dirLight);

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

/*var geometry = new THREE.BoxGeometry(1, 1, 1);
var mesh = new THREE.Mesh(
	geometry,
	new THREE.MeshPhongMaterial({
		color: 0x80FF80
	})
);*/

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
  requestAnimationFrame(animate);

  player.Update(aTime);
  world.Update(aTime);
	//cube.translateOnAxis(new THREE.Vector3(1,0,0), 0.1);

  renderer.render(scene, camera);


};
var player;
var world;
const geometry2 = new THREE.BoxGeometry(1,1,1);
const material2 = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry2, material2 );

window.onload = function init() {


  //document.body.appendChild(canvas);
  player = new Player({
    scene: scene
  });

 world=new WorldManager({
   scene: scene
 });

  player.InitInput();
  const geometry = new THREE.PlaneGeometry(1000, 1000);
  const material = new THREE.MeshBasicMaterial({
    color: 0x808080,
    side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(geometry, material);

  //scene.add( plane );

	//scene.add(cube);



  animate();
}
