export default class menuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('button', 'assets/button.png');
  }

  create() {
    const container = this.add.container(200, 100);
    const image = this.add.image(0, 0, 'button');
    image.setOrigin(0);
    const text = this.add.text(image.displayWidth / 2, image.displayHeight / 2, 'Play', {
      fontSize: 48,
    });
    text.setOrigin(0.5);
    container.add(image);
    container.add(text);
    container.setInteractive(
      new Phaser.Geom.Rectangle(image.x, image.y, image.displayWidth, image.displayHeight),
      Phaser.Geom.Rectangle.Contains,
    );
    this.input.enableDebug(container);
    container.on(
      'pointerdown',
      function () {
        this.scene.switch('hexagonals');
      },
      this,
    );
  }
}
