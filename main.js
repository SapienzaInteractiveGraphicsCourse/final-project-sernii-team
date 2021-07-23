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
        //pauseTime+=clock.getElapsedTime()*1000;
        clock.start();
        for(let obj of tweensTemp){
            obj.start();
        }
        requestAnimationFrame(render);
    };

    let menuButtonPause = document.getElementById("pause-menu-button");
    menuButtonPause.onclick= function(){
        window.location.replace('./index.html')
    };
    // canvas
    //const canvas = document.getElementById('game-canvas');

    //SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x181818);

    //CAMERA
    let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 300);
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
    //renderer.shadowMap.renderSingleSided = false;
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

    //CLOCK
    let clock=new THREE.Clock(false);
    //clock.start();
    let pauseTime=0

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
    let hearts = document.createElement('div');
    hearts.style.position = 'absolute';
    //hearts.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    hearts.style.position="fixed";
    hearts.style.top=70+"px";
    hearts.style.left=0+"px";
    hearts.style.fontSize=50+"px";
    hearts.style.color="white";
    hearts.innerHTML = "HEARTS: 0 ";

    let score = document.createElement('div');
    score.style.position = 'absolute';
    //score.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    score.style.position="fixed";
    score.style.top=0+"px";
    score.style.left=0+"px";
    score.style.fontSize=50+"px";
    score.style.color="white";
    score.innerHTML = "SCORE: 0";

    loadingManager.onLoad = function() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.remove();
        document.body.appendChild(renderer.domElement);
        document.body.appendChild(score);
        document.body.appendChild(hearts);
        //score.appendChild(hearts);
        requestAnimationFrame(render);
        clock.start();
    }



    let prevTime = 0;
    let aTime = 0;
    let deltaTime=0;
    let timeElapsed_=0;
    let tweensTemp;

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


        //aTime = (timeElapsed - prevTime);
        //let aTime2 = aTime*0.001;
        //prevTime = timeElapsed;
        deltaTime=clock.getDelta();

        //timeElapsed_=clock.getElapsedTime();
        //deltaTime=clock.getDelta();
        //let timeElapsedMS=timeElapsed_*1000;
        //console.log("render clock: "+timeElapsed);
        //console.log("my clock: " +timeElapsedMS);
        //let totalTimePassed=clock.getElapsedTime();
        //console.log(pauseTime);
        //console.log(timeElapsed);


        if (!collisionsDetector_.getgameOverFlag()) {
            if(escFlag){
                clock.stop();
                tweensTemp=TWEEN.getAll();
                for(let obj of tweensTemp){
                    //console.log(obj);
                    obj.stop();
                }
                document.getElementById("pause-menu").style.display = "block";
                return
            }

            TWEEN.update();
            world_.Update(deltaTime);
            player_.Update();
            controlManager_.Update();
            collisionsDetector_.Update();

        }
        else{
            document.getElementById("gameOver").style.display = "block";
            TWEEN.update();
            setInterval(function(){TWEEN.removeAll(); }, 2500);

        }
        hearts.innerHTML = "HEARTS: " + collisionsDetector_.getHearts();
        score.innerHTML = "SCORE: " + collisionsDetector_.getScore();
        renderer.render(scene, camera);
        requestAnimationFrame(render);

    };

}

init();
