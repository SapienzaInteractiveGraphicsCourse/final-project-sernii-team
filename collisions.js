import * as THREE from './node_modules/three/build/three.module.js';
const Right=0;
const Left=1;
const Center=2;

export const collisionsDetector = (() => {

    class CollisionsDetector{

        constructor(params){

            this.player=params.player;
            this.world=params.world;
            //setInterval(()=>{console.log(this.world.getObjects());}, 500);
            //setInterval(()=>{console.log(this.world.getObjects());}, 500);

        }

        Update(timeElapsed){

            let objects=this.world.getObjects();
            let playerBox=this.player.getCharacterBox();
            console.log(this.world.objects);
            for(let obj of objects[Right]){
                obj.Update(timeElapsed);
                let col=obj.getCollider();

            }
            //console.log(this.playerBox);
            //console.log(this.collidersCollection);
        }
    };

    return {
        CollisionsDetector: CollisionsDetector,
    };
})();
