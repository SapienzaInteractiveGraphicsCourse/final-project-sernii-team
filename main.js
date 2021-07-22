import * as THREE from './libs/three.module.js';
import {Player} from './player.js';
import {WorldManager} from './world.js';
import {CollisionsDetector} from './collisions.js'
import {AnimationManager} from './animations.js'
import{ControlManager} from './controls.js'
import {loadingManager} from './loader.js'
import Stats from './libs/stats.module.js'
import * as GUI from './libs/dat.gui.module.js'
import {OrbitControls} from './libs/OrbitControls.js'


function init() {
    // canvas
    const canvas = document.getElementById('game-canvas');

    //SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x181818);

    //CAMERA
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.001, 1000);
    camera.position.set(2.5, 3, 4.3);
    camera.rotation.set(0, 6.4, 0);

    //RENDER
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff)
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    //ORBIT
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;

    //CLASSES
    const world_ = new WorldManager({
        scene: scene
    });

    const player_ = new Player({
        scene: scene,
    });
    const animationManager_ = new AnimationManager(
        player_.getCharacterParts()
    );
    const collisionsDetector_ = new CollisionsDetector({
        player: player_,
        world: world_,
        scene: scene,
        animationManager: animationManager_,
    });
    const controlManager_ = new ControlManager({
        animationManager: animationManager_,
        player: player_,
    })

    //SETUP LOADER MANAGER
    loadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
        console.log("loaded: " + url);
    }
    loadingManager.onLoad = function() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.remove();
        requestAnimationFrame(render);
    }

    let prevTime = 0;
    let aTime = 0;
    const render = function(timeElapsed) {
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

        if (!collisionsDetector_.getgameOverFlag()) {
            world_.Update(aTime);
            player_.Update(aTime);
            controlManager_.Update(timeElapsed);
            collisionsDetector_.Update(aTime);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render);

    };

}

init();
