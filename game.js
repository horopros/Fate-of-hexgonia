var sceneMainSettings = {
  hexTileWidth: 32, // è la larghezza della singola immagine esagonale
  hexTileHeight: 32, // è l'altezza della singola immagine esagonale
};

var hexTileSettings = {
  hexList: [
    'water', // 0
    'snow', // 1
    'dirt', // 2
    'grass', // 3
    'grassland', // 4
  ],
};

var config = {
  type: Phaser.AUTO,
  width: window.screen.width,
  height: window.screen.height,
  backgroundColor: 0xff0000,
  parent: 'phaser-game',
  scene: [MapCreation],
  // pixelArt : true,
  // physics : {default : "arcade", arcade : {debug : false, debugShowVelocity: false}},
};

var game = new Phaser.Game(config);
