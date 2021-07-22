import * as THREE from './libs/three.module.js';

const Right=0;
const Left=1;
const Center=2;

const RED=new THREE.Color("red");
const BLACK=new THREE.Color("black");


export class CollisionsDetector{

    constructor(params){

        this.player=params.player;
        this.parts=this.player.getCharacterParts();
        //this.character=parts.character;
        this.waist=this.parts.waist;

        this.world=params.world;

        this.animationManager=params.animationManager;

        this.detected={};
        this.gameOverFlag=false;
        this.invulnerableFlag=false;
    }

    getgameOverFlag(){
        return this.gameOverFlag;
    }


    blink(){

        function recursiveBlink(timeWhenBlink, totalTime, timeOfBlink, color, group){
            if(timeOfBlink==0 || timeWhenBlink==0){
                return;
            }
            if(totalTime-timeWhenBlink<=0){
                setTimeout(()=>{
                    group.traverse((node)=>{
                        if(node.isMesh){
                                node.material.emissive=color;
                        }
                    });
                }, timeWhenBlink);
                return;
            }

            setTimeout(()=>{
                group.traverse((node)=>{
                    if(node.isMesh){
                            node.material.emissive=color;
                    }
                });
            }, timeWhenBlink);

            if(color.equals(BLACK)){
                recursiveBlink(timeWhenBlink+timeOfBlink, totalTime, timeOfBlink, RED, group);
            }
            else{
                recursiveBlink(timeWhenBlink+timeOfBlink, totalTime, timeOfBlink, BLACK, group);
            }
        }

        this.character=this.parts.waist;
        recursiveBlink(1, 1400, 1399, RED, this.character);
        recursiveBlink(1400, 2300, 50, RED, this.character);
        recursiveBlink(2300, 3000, 10, RED, this.character);
        setInterval(()=>{
            this.character.traverse((node)=>{
                if(node.isMesh){
                        node.material.emissive=BLACK;
                }
            });
        },3000);

    }

    /*
    quando è stata detectata una collisioni è inutile computare le altre -> collisionDetected
    se vengono detectate 3 collisioni il gioco termina ->gameOverFlag
    dopo che si è colpiti si ha del tempo di invulnerabilità -> invulnerableFlag
    */

    Update(timeElapsed){

        let objects=this.world.getObjects();
        let playerBox=this.player.getCharacterBox();
        let collisionDetected=false;

        let detectedLength=Object.keys(this.detected).length;
        if(detectedLength==3){
            this.gameOverFlag=true;
            this.animationManager.fallAnimation();

        }
        if(!this.invulnerableFlag){
            if(!this.gameOverFlag){
                if(!collisionDetected){
                    for(let obj of objects[Right]){
                        obj.Update(timeElapsed);
                        this.player.updateCharacterBox();
                        let col=obj.getCollider();
                        if(col.intersectsBox(playerBox)){

                            let mesh=obj.getMesh();
                            let id=mesh.id;

                            if(!(id in this.detected)){
                                this.detected[id]=1;
                                collisionDetected=true;
                                this.invulnerableFlag=true;
                                if(detectedLength<2){
                                    this.blink();
                                }
                                setTimeout(()=>{
                                    this.invulnerableFlag=false,
                                    console.log("not invulnerabile")
                                    ;}, 3000);
                                console.log("invulnerabile")
                                break;
                            }
                        }
                    }
                }

                if(!collisionDetected){
                    for(let obj of objects[Center]){
                        obj.Update(timeElapsed);
                        this.player.updateCharacterBox();

                        let col=obj.getCollider();

                        if(col.intersectsBox(playerBox)){

                            let mesh=obj.getMesh();
                            let id=mesh.id;

                            if(!(id in this.detected)){
                                this.detected[id]=1;
                                collisionDetected=true;
                                this.invulnerableFlag=true;
                                if(detectedLength<2){
                                    this.blink();
                                }
                                setTimeout(()=>{
                                    this.invulnerableFlag=false,
                                    console.log("not invulnerabile")
                                    ;}, 3000);
                                console.log("invulnerabile")
                                break;
                            }
                        }



                    }
                }
                if(!collisionDetected){
                    for(let obj of objects[Left]){
                        obj.Update(timeElapsed);
                        this.player.updateCharacterBox();

                        let col=obj.getCollider();

                        if(col.intersectsBox(playerBox)){

                            let mesh=obj.getMesh();
                            let id=mesh.id;

                            if(!(id in this.detected)){
                                this.detected[id]=1;
                                collisionDetected=true;
                                this.invulnerableFlag=true;
                                if(detectedLength<2){
                                    this.blink();
                                }
                                setTimeout(()=>{
                                    this.invulnerableFlag=false,
                                    console.log("not invulnerabile")
                                    ;}, 3000);
                                console.log("invulnerabile")
                                break;
                            }
                        }


                    }
                }

                if(collisionDetected){
                    this.waist.position.z+=1;
                }
            }
        }

    }
};
