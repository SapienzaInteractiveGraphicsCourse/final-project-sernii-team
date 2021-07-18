import * as THREE from './libs/three.module.js';


export class AnimationManager{

    constructor(params) {

        this.character= params.character;
        this.waist= params.waist;

        this.neckRoot= params.neckRoot;
        this.torso= params.torso;
        this.head=params.head;

        this.upperRightArmRoot =params.upperRightArmRoot;
        this.lowerRightArmRoot= params.lowerRightArmRoot;
        this.upperRightArm= params.upperRightArm;
        this.lowerRightArm= params.lowerRightArm;
        this.rightHand= params.rightHand;

        this.upperLeftArmRoot= params.upperLeftArmRoot;
        this.lowerLeftArmRoot= params.lowerLeftArmRoot;
        this.upperLeftArm= params.upperLeftArm;
        this.lowerLeftArm= params.lowerLeftArm;
        this.leftHand= params.leftHand;

        this.upperRightLegRoot= params.upperRightLegRoot;
        this.lowerRightLegRoot= params.lowerRightLegRoot;
        this.upperRightLeg= params.upperRightLeg;
        this.lowerRightLeg= params.lowerRightLeg;
        this.rightFeetRoot= params.rightFeetRoot;
        this.rightFeet= params.rightFeet;

        this.upperLeftLegRoot= params.upperLeftLegRoot;
        this.lowerLeftLegRoot= params.lowerLeftLegRoot;
        this.upperLeftLeg= params.upperLeftLeg;
        this.lowerLeftLeg= params.lowerLeftLeg;
        this.leftFeetRoot= params.leftFeetRoot;
        this.leftFeet= params.leftFeet;

        this.jumpingFlag=false;
        this.runninFlag=false;

        this.loadRunAnimation();
        //this.initialRunTween= new TWEEN.Tween();

    }

    stopRunning(){
        this.initialRunTween.stop();
    }

    startRunning(){
        this.initialRunTween.start();
    }

    getJumpingFlag(){

        return this.jumpingFlag;

    }

    getRunnintFlag(){
        return this.runninFlag;
    }

    /*
    basicPosAnimation(){
        let initialPos= new TWEEN.Tween([
                                this.neckRoot.rotation,
                                this.waist.position,
                                this.waist.rotation,

                                this.torso.position,

                                this.upperLeftArmRoot.rotation,
                                this.lowerLeftArmRoot.rotation,

                                this.upperRightArmRoot.rotation,
                                this.lowerRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{x:0, y: 0, z:0},{x:0, y: 0, z:0},{x:0, y: 0, z:0},{x:0, y: 0, z:0} ,{x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0},
        {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}], 100)
        .easing(TWEEN.Easing.Linear.None)
        .start();
    }
    */

    jumpAnimation(){
        this.jumpingFlag=true;
        this.runninFlag=false;

        let standardPos= new TWEEN.Tween([
                                this.neckRoot.rotation,
                                this.waist.position,
                                this.waist.rotation,

                                this.torso.position,

                                this.upperLeftArmRoot.rotation,
                                this.lowerLeftArmRoot.rotation,

                                this.upperRightArmRoot.rotation,
                                this.lowerRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{x:0, y: 0, z:0},{x:0, y: 0, z:0},{x:0, y: 0, z:0},{x:0, y: 0, z:0} ,{x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0},
        {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}, {x:0, y: 0, z:0}], 100)
        .easing(TWEEN.Easing.Linear.None);

        let initialPos= new TWEEN.Tween([
                                this.waist.position,
                                this.torso.position,
                                this.upperLeftArmRoot.rotation,
                                this.lowerLeftArmRoot.rotation,

                                this.upperRightArmRoot.rotation,
                                this.lowerRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{y: -0.1},{y: -0.1},{x: Math.PI/3}, {x: Math.PI/3}, {x: Math.PI/3}, {x: Math.PI/3},
        {x: Math.PI/6}, {x: -Math.PI/3}, {x: Math.PI/6}, {x: -Math.PI/3},{x: Math.PI/7},{x: Math.PI/7}], 300)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(()=>{
            this.jumpingFlag=true;
            console.log(this.jumpingFlag);
        })
        //.delay(200)

        let jump= new TWEEN.Tween([
                                this.waist.position,
                                this.torso.position,
                                this.upperLeftArmRoot.rotation,
                                this.lowerLeftArmRoot.rotation,

                                this.upperRightArmRoot.rotation,
                                this.lowerRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{y: 3.5},{y: 0},{x: 0}, {x: 0}, {x: 0}, {x: 0},
        {x: 0}, {x: 0}, {x: 0}, {x: 0},{x: 0},{x: 0}], 400)
        .easing(TWEEN.Easing.Cubic.Out);
        //.delay(200);

        let fallInitialPos= new TWEEN.Tween([
                                this.upperLeftArmRoot.rotation,
                                this.lowerLeftArmRoot.rotation,

                                this.upperRightArmRoot.rotation,
                                this.lowerRightArmRoot.rotation,
                            ])
        .to([{z: -Math.PI/4},{x: Math.PI/3}, {z: Math.PI/4}, {x: Math.PI/3}], 300)
        .easing(TWEEN.Easing.Cubic.Out);

        let gravitiFall= new TWEEN.Tween([
                                this.waist.position,
                            ])
        .to([{y:0}], 300)
        .easing(TWEEN.Easing.Quartic.In);

        let finalPos= new TWEEN.Tween([
                                this.waist.position,
                                this.torso.position,
                                this.upperLeftArmRoot.rotation,
                                this.lowerLeftArmRoot.rotation,

                                this.upperRightArmRoot.rotation,
                                this.lowerRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{y: -0.1},{y: -0.1},{x: Math.PI/3}, {x: Math.PI/3}, {x: Math.PI/3}, {x: Math.PI/3},
        {x: Math.PI/6}, {x: -Math.PI/3}, {x: Math.PI/6}, {x: -Math.PI/3},{x: Math.PI/7},{x: Math.PI/7}], 100)
        .easing(TWEEN.Easing.Linear.None);

        let normalPos=  new TWEEN.Tween([
                                this.waist.position,
                                this.torso.position,
                                this.upperLeftArmRoot.rotation,
                                this.lowerLeftArmRoot.rotation,

                                this.upperRightArmRoot.rotation,
                                this.lowerRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{y: 0},{y: 0},{x: 0,z:0}, {x: 0}, {x: 0,z:0}, {x: 0},
        {x: 0}, {x: 0}, {x: 0}, {x: 0}, {x: 0}, {x: 0}], 200)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(()=>{
            console.log(this.jumpingFlag);
            this.jumpingFlag=false;
        });

        standardPos.chain(initialPos);
        initialPos.chain(jump);
        jump.chain(fallInitialPos);
        fallInitialPos.chain(gravitiFall);
        gravitiFall.chain(finalPos);
        finalPos.chain(normalPos);
        //normalPos.chain(initialPos);

        standardPos.start();
        //jump.start();




    }

    loadRunAnimation(){
        this.initialRunTween= new TWEEN.Tween([

                                this.neckRoot.rotation,

                                this.waist.position,
                                this.waist.rotation,

                                this.upperLeftArmRoot.rotation,
                                this.upperRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{x: Math.PI/4},
            {y: -0.1}, {x: -Math.PI/4},
            {x: -Math.PI/5}, {x: -Math.PI/5},
            {x: Math.PI/4},{x: 0},
            {x: Math.PI/4}, {x: 0},
            {x: 0},{x: 0}], 300)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(()=>{
            this.runninFlag=true;
        });

        let runPos1=new TWEEN.Tween([

                                this.waist.rotation,

                                this.upperLeftArmRoot.rotation,
                                this.upperRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{y: -Math.PI/26},
            {x: -Math.PI/6},{x:-Math.PI/5},
            {x: Math.PI/2},{x: -Math.PI/4},
            {x: -Math.PI/6}, {x: 0},
            {x: -Math.PI/10},{x: -Math.PI/6}], 300)
        .easing(TWEEN.Easing.Sinusoidal.Out);

        let runPos2=new TWEEN.Tween([

                                this.waist.rotation,

                                this.upperLeftArmRoot.rotation,
                                this.upperRightArmRoot.rotation,

                                this.upperLeftLegRoot.rotation,
                                this.lowerLeftLegRoot.rotation,

                                this.upperRightLegRoot.rotation,
                                this.lowerRightLegRoot.rotation,

                                this.leftFeetRoot.rotation,
                                this.rightFeetRoot.rotation,
                            ])
        .to([{y: Math.PI/26},
            {x: -Math.PI/5},{x: -Math.PI/6},
            {x: -Math.PI/6},{x: 0},
             {x: Math.PI/2}, {x: -Math.PI/4},
            {x:  -Math.PI/6},{x: -Math.PI/10}], 300)
        .easing(TWEEN.Easing.Sinusoidal.Out);
        //initialPos.chain(runPos1);
        //runPos1.chain(initialPos2);
        //initialPos2.chain(runPos2);
        this.initialRunTween.chain(runPos1);
        runPos1.chain(runPos2);
        runPos2.chain(runPos1);

    }


}
