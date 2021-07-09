import * as THREE from './node_modules/three/build/three.module.js';
//import {assets} from  './loader.js'
/*
IMPORTANTE
il position serve ad aggiornare la posizione della mesh
per cui per spostare il cubo sopra l'asse delle y e a destra
dell'asse delle x gli ho sommato la metà della sua lunghezza e altezza.
ecco perchè compaiono i valori 0.5 e non 0
*/

//sull'asse delle x
const INITIAL_X_POS=0.5;
const INITIAL_Y_POS=0.5;
const RIGHT_DASH=2.5;
const LEFT_DASH=-1.5

//head
//const headWidth=0.3;
const headRadius=0.22;
//const headHeight=0.22;
//const headDepth=0.3;

//torso
const torsoWidth=0.6;
const torsoHeight=1;
const torsoDepth=0.2;

//upperArm
const upperArmWidth=0.15;
const upperArmHeight=0.25;
const upperArmDepth=0.1;

//lowerArm
const lowerArmWidth=0.1;
const lowerArmHeight=0.3;
const lowerArmDepth=0.1;

//upperLeg
const upperLegWidth=0.15;
const upperLegHeight=0.35;
const upperLegDepth=0.1;

//lowerLeg
const lowerLegWidth=0.1;
const lowerLegHeight=0.3;
const lowerLegDepth=0.1;

//feet
const feetWidth=0.18;
const feetHeight=0.1;
const feetDepth=0.2;

//hand
//const handWidth=0.12;
const handRadius=0.1;
//const handHeight=0.1;
//const handDepth=0.12;

//root
const rootRadius=0.08;

//neck
const neckRadius=0.15;



export class Player {

  constructor(params) {

    this.scene = params.scene;
    this.position = new THREE.Vector3(INITIAL_X_POS, INITIAL_Y_POS, 0.0);
    this.velocity = 0.0;

    this.buildCharacter();
    /*
    this.gui=params.GUI;
    let characterGui = this.gui.addFolder("characterControl");

    characterGui.add(this., "x", -10, Math.PI * 10);
    characterGui.add(camera.rotation, "y", -10, Math.PI * 10);
    characterGui.add(camera.rotation, "z", -10, Math.PI * 10);
    */


    /*var geometry = new THREE.BoxGeometry(1, 1, 1);
    this.mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0x80FF80
      })
    );*/

    // l'ho fatto direttamente nella funzione update
    //this.position.x+=0.5;
    //this.position.y+=0.5;


    //this.mesh.castShadow = true;
    //this.mesh.receiveShadow = true;
    this.scene.add(this.character);
    //this.scene.add(this.torso);

    this.runAnimation();

  }

  buildCharacter() {
    //BUILD CHARACTER
    //hierachical model
    this.neckMat = new THREE.MeshPhongMaterial({
      color: "Teal"
    });
    this.rootMat = new THREE.MeshPhongMaterial({
      color: "Chartreuse"
    });
    this.headMat = new THREE.MeshPhongMaterial({
      color: "LavenderBlush"
    });
    this.torsoMat = new THREE.MeshPhongMaterial({
      color: "LightCoral"
    });
    this.legMat = new THREE.MeshPhongMaterial({
      color: "green"
    });
    this.upperArmMat = new THREE.MeshPhongMaterial({
      color: "indigo"
    });
    this.lowerArmMat = new THREE.MeshPhongMaterial({
      color: "orange"
    });
    this.upperLegMat = new THREE.MeshPhongMaterial({
      color: "HotPink"
    });
    this.lowerLegMat = new THREE.MeshPhongMaterial({
      color: "skyblue"
    });
    this.handMat = new THREE.MeshPhongMaterial({
      color: "red"
    });
    this.feetMat = new THREE.MeshPhongMaterial({
      color: "brown"
    });

    //this.headGeo = new THREE.BoxBufferGeometry(headWidth, headRadius, headDepth);
    this.neckGeo = new THREE.CylinderGeometry(0.08, 0.08, neckRadius, 32);
    this.headGeo = new THREE.SphereGeometry(headRadius, 32, 32);
    this.torsoGeo = new THREE.BoxBufferGeometry(torsoWidth, torsoHeight, torsoDepth);
    this.lowerLegGeo = new THREE.BoxBufferGeometry(lowerLegWidth, lowerLegHeight, lowerLegDepth);
    this.lowerLegRootGeo = new THREE.SphereGeometry(rootRadius, 32, 32);
    this.upperLegGeo = new THREE.BoxBufferGeometry(upperLegWidth, upperLegHeight, upperLegDepth);
    this.upperLegRootGeo = new THREE.SphereGeometry(rootRadius, 32, 32);
    this.lowerArmGeo = new THREE.BoxBufferGeometry(lowerArmWidth, lowerArmHeight, lowerArmDepth);
    this.lowerArmRootGeo = new THREE.SphereGeometry(rootRadius, 32, 32);
    this.upperArmGeo = new THREE.BoxBufferGeometry(upperArmWidth, upperArmHeight, upperArmDepth);
    this.upperArmRootGeo = new THREE.SphereGeometry(rootRadius, 32, 32);
    this.feetGeo = new THREE.BoxBufferGeometry(feetWidth, feetHeight, feetDepth);
    //this.handGeo = new THREE.BoxBufferGeometry(handWidth, handRadius, handDepth);
    this.handGeo = new THREE.SphereGeometry(handRadius, 32, 32);

    this.character = new THREE.Object3D();
    this.waist = new THREE.Object3D();
    this.torsoRoot = new THREE.Object3D();
    this.neckRoot = new THREE.Mesh(this.neckGeo, this.neckMat);

    this.upperRightArmRoot = new THREE.Mesh(this.upperArmRootGeo, this.rootMat);
    this.lowerRightArmRoot = new THREE.Mesh(this.lowerArmRootGeo, this.rootMat);
    this.upperLeftArmRoot = new THREE.Mesh(this.upperArmRootGeo, this.rootMat);
    this.lowerLeftArmRoot = new THREE.Mesh(this.lowerArmRootGeo, this.rootMat);

    //this.upperRightLegRoot = new THREE.Mesh(this.upperLegRootGeo,this.upperLegMat);
    this.upperRightLegRoot = new THREE.Object3D();
    this.lowerRightLegRoot = new THREE.Mesh(this.lowerLegRootGeo, this.rootMat);
    //this.upperLeftLegRoot = new THREE.Mesh(this.upperLegRootGeo,this.upperLegMat);
    this.upperLeftLegRoot = new THREE.Object3D();
    this.lowerLeftLegRoot = new THREE.Mesh(this.lowerLegRootGeo, this.rootMat);

    /*    //this.upperRightArmRoot = new THREE.Object3D();
        this.upperRightArmRoot = new THREE.Mesh(this.upperArmRootGeo,this.rootMat);
        this.lowerRightArmRoot = new THREE.Object3D();
        this.upperLeftArmRoot = new THREE.Object3D();
        this.lowerLeftArmRoot = new THREE.Object3D();

        this.upperRightLegRoot = new THREE.Object3D();
        this.lowerRightLegRoot = new THREE.Object3D();
        this.upperLeftLegRoot = new THREE.Object3D();
        this.lowerLeftLegRoot = new THREE.Object3D();*/

    this.torso = new THREE.Mesh(this.torsoGeo, this.torsoMat);
    //this.torso.translateY(torsoHeight*0.5);

    this.head = new THREE.Mesh(this.headGeo, this.headMat);
    this.head.position.y = neckRadius * 0.5 + headRadius * 0.5
    //this.head.translateY(torsoHeight*0.5+headRadius*0.8);


    this.upperRightArm = new THREE.Mesh(this.upperArmGeo, this.upperArmMat);
    //this.upperRightArm.translateY(upperArmHeight*0.5);

    this.lowerRightArm = new THREE.Mesh(this.lowerArmGeo, this.lowerArmMat);
    //this.lowerRightArm.translateY(lowerArmHeight*0.5);

    this.upperLeftArm = new THREE.Mesh(this.upperArmGeo, this.upperArmMat);
    //this.upperLeftArm.translateY(upperArmHeight*0.5);

    this.lowerLeftArm = new THREE.Mesh(this.lowerArmGeo, this.lowerArmMat);
    //this.lowerLeftArm.translateY(lowerArmHeight*0.5);

    this.upperRightLeg = new THREE.Mesh(this.upperLegGeo, this.upperLegMat);
    //this.upperRightLeg.translateY(upperLegHeight*0.5);

    this.lowerRightLeg = new THREE.Mesh(this.lowerLegGeo, this.lowerLegMat);
    //this.lowerRightLeg.translateY(lowerLegHeight*0.5);

    this.upperLeftLeg = new THREE.Mesh(this.upperLegGeo, this.upperLegMat);
    //this.upperLeftLeg.translateY(upperLegHeight*0.5);

    this.lowerLeftLeg = new THREE.Mesh(this.lowerLegGeo, this.lowerLegMat);
    //this.lowerLeftLeg.translateY(lowerLegHeight*0.5);


    this.rightFeet = new THREE.Mesh(this.feetGeo, this.feetMat);
    //this.rightFeet.translateY(feetHeight*0.5);

    this.leftFeet = new THREE.Mesh(this.feetGeo, this.feetMat);
    //this.leftFeet.translateY(feetHeight*0.5);

    this.rightHand = new THREE.Mesh(this.handGeo, this.handMat);
    //this.rightHand.translateY(handRadius*0.5);

    this.leftHand = new THREE.Mesh(this.handGeo, this.handMat);
    //this.leftHand.translateY(handRadius*0.5);

    this.character.add(this.waist);
    this.waist.add(this.torso, this.upperLeftLegRoot, this.upperRightLegRoot);

    //torso route
    this.torso.add(this.neckRoot, this.upperLeftArmRoot, this.upperRightArmRoot);

    this.neckRoot.add(this.head);
    this.neckRoot.position.y += torsoHeight * 0.5 + neckRadius * 0.5;
    //this.neckRoot.position.y+=torsoHeight;

    this.upperLeftArmRoot.add(this.upperLeftArm);
    //this.upperLeftArmRoot.position.x+=-(torsoWidth*0.5+upperArmWidth*0.5);
    //this.upperLeftArmRoot.position.y+=torsoHeight*0.5-upperArmHeight*0.5-0.08*torsoHeight;
    this.upperLeftArmRoot.position.x += -(torsoWidth * 0.5 + rootRadius);
    this.upperLeftArmRoot.position.y += torsoHeight * 0.5 - rootRadius;

    this.upperLeftArm.add(this.lowerLeftArmRoot);
    this.upperLeftArm.position.y = -rootRadius * 0.5 - 0.5 * upperArmHeight;

    this.lowerLeftArmRoot.add(this.lowerLeftArm);
    //this.lowerLeftArmRoot.position.y+=-lowerArmHeight*0.5-upperArmHeight*0.5;
    this.lowerLeftArmRoot.position.y += -upperArmHeight * 0.5 - rootRadius * 0.5;

    this.lowerLeftArm.add(this.leftHand);
    this.lowerLeftArm.position.y += -lowerArmHeight * 0.5 - rootRadius * 0.5;

    this.leftHand.position.y += -handRadius * 0.5 - lowerArmHeight * 0.5;

    this.upperRightArmRoot.add(this.upperRightArm);
    //this.upperRightArmRoot.position.x+=(torsoWidth*0.5+upperArmWidth*0.5);
    //this.upperRightArmRoot.position.y+=torsoHeight*0.5-upperArmHeight*0.5-0.08*torsoHeight;
    this.upperRightArmRoot.position.x += torsoWidth * 0.5 + rootRadius;
    this.upperRightArmRoot.position.y += torsoHeight * 0.5 - rootRadius;

    this.upperRightArm.add(this.lowerRightArmRoot);
    this.upperRightArm.position.y = -rootRadius * 0.5 - 0.5 * upperArmHeight;

    this.lowerRightArmRoot.add(this.lowerRightArm);
    //this.lowerRightArmRoot.position.y+=-lowerArmHeight*0.5-upperArmHeight*0.5;
    this.lowerRightArmRoot.position.y += -upperArmHeight * 0.5 - rootRadius * 0.5;

    this.lowerRightArm.add(this.rightHand);
    this.lowerRightArm.position.y += -lowerArmHeight * 0.5 - rootRadius * 0.5;

    this.rightHand.position.y += -handRadius * 0.5 - lowerArmHeight * 0.5;;

    //upper left leg root

    this.upperLeftLegRoot.add(this.upperLeftLeg);
    this.upperLeftLegRoot.position.y += -upperLegHeight * 0.5 - torsoHeight * 0.5;
    this.upperLeftLegRoot.position.x += -torsoWidth * 0.5 + upperLegWidth * 0.5;

    this.upperLeftLeg.add(this.lowerLeftLegRoot);

    this.lowerLeftLegRoot.add(this.lowerLeftLeg);
    //this.lowerLeftLegRoot.position.y+=-lowerLegHeight*0.5-upperLegHeight*0.5;
    this.lowerLeftLegRoot.position.y += -rootRadius * 0.5 - upperLegHeight * 0.5;

    this.lowerLeftLeg.add(this.leftFeet);
    this.lowerLeftLeg.position.y += -lowerLegHeight * 0.5 - rootRadius * 0.5;

    this.leftFeet.position.y += -lowerLegHeight * 0.5 - feetHeight * 0.5;
    this.leftFeet.position.z += -feetDepth * 0.5;

    //this.leftFeet.position.y+=-feetHeight;

    //upper right leg root

    this.upperRightLegRoot.add(this.upperRightLeg);
    this.upperRightLegRoot.position.y += -upperLegHeight * 0.5 - torsoHeight * 0.5;
    this.upperRightLegRoot.position.x += torsoWidth * 0.5 - upperLegWidth * 0.5;

    this.upperRightLeg.add(this.lowerRightLegRoot);
    //this.upperRightLegRoot.position.y+=-upperLegHeight;
    //this.upperRightLegRoot.position.x+=torsoWidth*0.5-upperLegWidth*0.5;

    this.lowerRightLegRoot.add(this.lowerRightLeg);
    this.lowerRightLegRoot.position.y += -rootRadius * 0.5 - upperLegHeight * 0.5;

    this.lowerRightLeg.add(this.rightFeet);
    this.lowerRightLeg.position.y += -lowerLegHeight * 0.5 - rootRadius * 0.5;

    this.rightFeet.position.y += -lowerLegHeight * 0.5 - feetHeight * 0.5;
    this.rightFeet.position.z += -feetDepth * 0.5;
    //this.lowerRightLegRoot.position.y+=-lowerLegHeight;
    //this.rightFeet.position.y+=-feetHeight;

    //let quaternion = new THREE.Quaternion().setFromAxisAngle( this.waist.position, (10*Math.PI)/180 );
    //console.log(this.waist.position)
    //this.lowerRightArmRoot.rotation.x=((90*Math.PI)/180);
    //this.upperRightLegRoot.rotateOnAxis(new THREE.Vector3(0,0,0), (30*Math.PI)/180);

  }


  runAnimation() {

    let pos = this.upperRightArmRoot.rotation;
    let aux = this.upperRightArmRoot;
    let upperRightArmRootTween = new TWEEN.Tween({x: pos.x, y: pos.y, z: pos.z});
    upperRightArmRootTween.to({
      x: "-" + Math.PI  / 3
    }, 1000);
    //lowerRightArmRootTween.delay(3000)

    upperRightArmRootTween.onUpdate(function(object, elapsed) {
      aux.rotation.x = object.x;
      console.log(object.x);
    })
    /*upperRightLegRootTween.onComplete(function() {
            // Check that the full 360 degrees of rotation,
            // and calculate the remainder of the division to avoid overflow.

            if (Math.abs(aux.rotation.y)>=2*Math.PI) {
                this.upperRightLegRoot.rotation.y = this.upperRightLegRoot.rotation.y % (2*Math.PI);
            }
            aux.rotation.x=0;
        })*/

    upperRightArmRootTween.repeat(Infinity);
    //upperRightArmRootTween.start();
  }

  InitInput() {
    this.keys_ = {
      spacebar: false,
      arrowR_d: false,
      arrowL_a: false,
    };
    this.oldKeys = {
      ...this.keys_
    };

    document.addEventListener('keydown', (e) => this.OnKeyDown_(e), false);
    document.addEventListener('keyup', (e) => this.OnKeyUp_(e), false);
  }

  OnKeyDown_(event) {
    switch (event.keyCode) {
      //spacebar
      case 32:
        this.keys_.spacebar = true;
        break;

        //right arrow or d
      case 39:
      case 68:
        this.keys_.arrowR_d = true;
        break;

        //left arrow or a
      case 37:
      case 65:
        this.keys_.arrowL_a = true;
        break;
    }

  }

  OnKeyUp_(event) {
    switch (event.keyCode) {
      case 32:
        this.keys_.spacebar = false;
        break;

      case 39:
      case 68:
        this.keys_.arrowR_d = false;
        break;

        //left arrow or a
      case 37:
      case 65:
        this.keys_.arrowL_a = false;
        break;
    }
  }

  Update(timeElapsed) {

    if (this.keys_.spacebar && this.position.y == 0.5) {
      this.velocity = 30;

    }



    const acceleration = -100 * timeElapsed;

    this.position.y += timeElapsed * (
      this.velocity + acceleration * 0.5);
    this.position.y = Math.max(this.position.y, 0.5);

    this.velocity += acceleration;
    this.velocity = Math.max(this.velocity, -100);

    //se non si è in volo e neanche a destra o sinistra
    //quando in scivolatà servirà una condizione ulteriore
    if (this.position.y == INITIAL_Y_POS) {
      if (this.keys_.arrowR_d) {
        this.position.x = RIGHT_DASH;
      } else if (this.keys_.arrowL_a) {
        this.position.x = LEFT_DASH;
      } else {
        this.position.x = INITIAL_X_POS;
      }

    }

    this.mesh.position.copy(this.position);






  }



};
