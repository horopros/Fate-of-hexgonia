/* eslint-disable import/extensions */
import MapCreation from './MapCreation.js';

const config = {
  type: Phaser.AUTO,
  width: window.screen.width,
  height: window.screen.height,
  backgroundColor: 0xff0000,
  parent: 'phaser-game',
  scene: [MapCreation],
  // pixelArt : true,
  // physics : {default : "arcade", arcade : {debug : false, debugShowVelocity: false}},
};

const game = new Phaser.Game(config);
