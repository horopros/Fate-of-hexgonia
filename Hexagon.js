export default class Hexagon extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, image, hex) {
    super(scene, x, y, image);

    this.hex = hex;

    this.setPosition(x, y);
    this.setScale(0.43);

    scene.add.existing(this);
  }
}
