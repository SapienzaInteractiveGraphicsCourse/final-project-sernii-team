import * as THREE from './node_modules/three/build/three.module.js';
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

export class Player {

  constructor(params) {
    this.scene = params.scene;
    this.position = new THREE.Vector3(INITIAL_X_POS, INITIAL_Y_POS, 0.0);
    this.velocity = 0.0;

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    this.mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0x80FF80
      })
    );
    // l'ho fatto direttamente nella funzione update
    //this.position.x+=0.5;
    //this.position.y+=0.5;


    //this.mesh.castShadow = true;
    //this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
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
      }
      else if (this.keys_.arrowL_a) {
        this.position.x = LEFT_DASH;
      }
      else{
        this.position.x = INITIAL_X_POS;
      }

    }

    this.mesh.position.copy(this.position);






  }



};
