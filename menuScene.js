export default class menuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('button', 'assets/button.png');
    this.load.image('background', 'assets/bkg.png');
    this.load.image('popup', 'assets/popup.png');
    this.load.image('line', 'assets/line.png');
  }

  create() {
    this.listOfGames = [
      ['test', 2, 20],
      ['test 1', 1, 20],
      ['test 2', 4, 40],
      ['test 3', 5, 10],
    ];

    this.popUp = this.add.container(640, 360);

    let image = this.add.image(0, 0, 'popup').setOrigin(0.5);
    this.popUp.add(image);
    this.popUp.setVisible(true);

    image = this.add.image(0, -250, 'line').setScale(0.8, 0.7).setOrigin(0.5);
    this.popUp.add(image);
    this.popUp.add(
      this.add
        .text(-150, -290, 'Name', {
          fontSize: 18,
          fontFamily: 'medieval',
          color: 'black',
        })
        .setOrigin(0),
    );
    this.popUp.add(
      this.add
        .text(-50, -290, 'Players', {
          fontSize: 18,
          fontFamily: 'medieval',
          color: 'black',
        })
        .setOrigin(0),
    );
    this.popUp.add(
      this.add
        .text(100, -290, 'Ping', {
          fontSize: 18,
          fontFamily: 'medieval',
          color: 'black',
        })
        .setOrigin(0),
    );
    this.rectServers = [];
    for (let i = 0; i < this.listOfGames.length; i += 1) {
      image = this.add
        .image(0, -250 + (i + 1) * 50, 'line')
        .setScale(0.8, 0.7)
        .setOrigin(0.5);
      this.popUp.add(image);
      this.popUp.add(
        this.add
          .text(-150, -240 + i * 50, `${this.listOfGames[i][0]}`, {
            fontSize: 18,
            fontFamily: 'medieval',
            color: 'black',
          })
          .setOrigin(0),
      );
      this.popUp.add(
        this.add
          .text(-20, -240 + i * 50, `${this.listOfGames[i][1]}`, {
            fontSize: 18,
            fontFamily: 'medieval',
            color: 'black',
          })
          .setOrigin(0),
      );
      this.popUp.add(
        this.add
          .text(110, -240 + i * 50, `${this.listOfGames[i][2]}`, {
            fontSize: 18,
            fontFamily: 'medieval',
            color: 'black',
          })
          .setOrigin(0),
      );
    }

    this.popUp.setInteractive(/*
      new Phaser.Geom.Rectangle(image.x, image.y, image.displayWidth, image.displayHeight),
      Phaser.Geom.Rectangle.Contains,
    */);
    this.rect = this.popUp.getBounds();
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0);

    const playButton = this.add.container(200, 100);
    image = this.add.image(0, 0, 'button').setOrigin(0);

    playButton.add(image);
    playButton.add(
      this.add
        .text(image.displayWidth / 2, image.displayHeight / 2, 'Play', {
          fontSize: 48,
          fontFamily: 'medieval',
          color: 'black',
        })
        .setOrigin(0.5),
    );

    playButton.setInteractive(
      new Phaser.Geom.Rectangle(image.x, image.y, image.displayWidth, image.displayHeight),
      Phaser.Geom.Rectangle.Contains,
    );

    playButton.on('pointerdown', this.popUpMenu, this);
    console.log(this.rect);
  }

  update() {
    const pointer = this.input.activePointer;
    const x = pointer.worldX;
    const y = pointer.worldY;
    const check = this.popUp.visible && !this.rect.contains(x, y) && pointer.isDown;
    if (check) {
      this.popUp.setVisible(false);
    }
  }

  popUpMenu() {
    console.log('help');
    this.popUp.setDepth(10);
    this.popUp.setVisible(true);
    // this.scene.switch('hexagonals');
  }
}
