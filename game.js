/* eslint-disable import/extensions */
import MapCreation from './MapCreation.js';
import bootScene from './bootScene.js';
import menuScene from './menuScene.js';
import uiScene from './uiScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: 0xff0000,
  parent: 'phaser-game',
  scene: [bootScene, menuScene, uiScene, MapCreation],
  // pixelArt : true,
  // physics : {default : "arcade", arcade : {debug : false, debugShowVelocity: false}},
};

const game = new Phaser.Game(config);
