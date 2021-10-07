export default class Hexboard extends Phaser.GameObjects.Container {
  constructor(scene, x, y, layout, boardNumber, type) {
    super(scene, x, y);
    this.layout = layout;
    this.boardNumber = boardNumber;
    this.type = type;
    scene.add.existing(this);
  }

  setRectangle(rectangle) {
    this.rectangle = rectangle;
  }

  setPositionTopLeft(x, y) {
    this.x_top_left = x;
    this.y_top_left = y;
  }
}
