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



//SETUP BUTTONS

//GAMEOVER MENU
let restartButtonGO = document.getElementById("gameOver-restart");
restartButtonGO.onclick= function(){
    window.location.reload();
};
let menuButtonGO = document.getElementById("gameOver-menu");
menuButtonGO.onclick= function(){
    window.location.replace('./index.html')
};

//PAUSE MENU
let escFlag=false;
document.addEventListener('keydown', (e) => onKeyPress_(e), false);
function onKeyPress_(event){
    switch (event.keyCode) {
        case 27:
            escFlag=true;
        break;

        default:
        break;
    }
}

let restartButtonPause = document.getElementById("pause-restart");
restartButtonPause.onclick= function(){
    window.location.reload();
};
let resumeButtonPause = document.getElementById("pause-resume");
resumeButtonPause.onclick= function(){
    document.getElementById("pause-menu").style.display = "none";
    escFlag=false;
};
let menuButtonPause = document.getElementById("pause-menu-button");
menuButtonPause.onclick= function(){
    window.location.replace('./index.html')
};

function init() {

    // canvas
    const canvas = document.getElementById('game-canvas');

    //SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x181818);

    //CAMERA
    let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
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
    window.addEventListener('resize', onWindowResize, false);

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

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
        document.body.appendChild(renderer.domElement);
        requestAnimationFrame(render);
    }

    let prevTime = 0;
    let aTime = 0;
    const render = function(timeElapsed) {
        //renderer.clear()
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }


        if (prevTime == null) {
            prevTime = timeElapsed;
        }
        if (timeElapsed == null) {
            timeElapsed = 0;
        }


        aTime = (timeElapsed - prevTime) * 0.001;
        prevTime = timeElapsed;



        if (!collisionsDetector_.getgameOverFlag()) {
            if(escFlag){
                document.getElementById("pause-menu").style.display = "block";
            }
            else{
                TWEEN.update(timeElapsed);
                world_.Update(aTime);
                player_.Update(aTime);
                controlManager_.Update(timeElapsed);
                collisionsDetector_.Update(aTime);
            }
        }
        else{
            document.getElementById("gameOver").style.display = "block";
            TWEEN.update(timeElapsed);
            setInterval(function(){TWEEN.removeAll(); }, 2500);

        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    };

}

init();
