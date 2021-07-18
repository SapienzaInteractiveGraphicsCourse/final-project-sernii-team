import * as THREE from './libs/three.module.js';

export class ControlManager{

    constructor(params){

        this.animationManager=params.animationManager;

        this.InitInput();

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

        if (!this.keys_.spacebar && !this.animationManager.getJumpingFlag()) {

            if(!this.animationManager.getRunnintFlag()){
                this.animationManager.startRunning();
            }
        }

        else if (this.keys_.spacebar && !this.animationManager.getJumpingFlag()) {
          //this.velocity = 30;
          this.animationManager.stopRunning();
          //this.animationManager.basicPosAnimation();
          this.animationManager.jumpAnimation();
        }

        /*
        const acceleration = -100 * timeElapsed;

        this.position.y += timeElapsed * (
          this.velocity + acceleration * 0.5);
        this.position.y = Math.max(this.position.y, INITIAL_Y_POS);

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

        //this.character.position.copy(this.position);
        //this.boxHelper.update();
        //preferisco farlo nel collider manager
        //this.characterBox.setFromObject(this.character);
        */
    }
}
