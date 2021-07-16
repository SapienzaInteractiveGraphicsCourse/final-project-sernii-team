import * as THREE from './libs/three/build/three.module.js';
const Right=0;
const Left=1;
const Center=2;



export class CollisionsDetector{

    constructor(params){

        this.player=params.player;
        this.world=params.world;
        this.detected={};
        this.gameOverFlag=false;
        this.invulnerableFlag=false;
    }

    getgameOverFlag(){
        return this.gameOverFlag;
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

        if(Object.keys(this.detected).length==3){
            this.gameOverFlag=true;
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
                                setTimeout(()=>{
                                    this.invulnerableFlag=false,
                                    console.log("not invulnerabile")
                                    ;}, 1000);
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
                                setTimeout(()=>{
                                    this.invulnerableFlag=false,
                                    console.log("not invulnerabile")
                                    ;}, 1000);
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
                                setTimeout(()=>{
                                    this.invulnerableFlag=false,
                                    console.log("not invulnerabile")
                                    ;}, 1000);
                                console.log("invulnerabile")
                                break;
                            }
                        }


                    }
                }
            }
        }

    }
};
