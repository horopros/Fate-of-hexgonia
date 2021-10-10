export default class menuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('button', 'assets/button.png');
    this.load.image('background', 'assets/bkg.png');
  }

  create() {
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0);
    const container = this.add.container(200, 100);
    const image = this.add.image(0, 0, 'button');
    image.setOrigin(0);
    const text = this.add.text(image.displayWidth / 2, image.displayHeight / 2, 'Play', {
      fontSize: 48,
      fontFamily: 'TypeReg',
      color: 'black',
    });
    text.setOrigin(0.5);
    container.add(image);
    container.add(text);
    container.setInteractive(
      new Phaser.Geom.Rectangle(image.x, image.y, image.displayWidth, image.displayHeight),
      Phaser.Geom.Rectangle.Contains,
    );
    // this.input.enableDebug(container);
    container.on(
      'pointerdown',
      function () {
        this.scene.switch('hexagonals');
      },
      this,
    );
  }
}
