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
    this.inputFlag = false;
    this.rectServers = [];

    this.popUp = this.add.container(640, 360);

    let image = this.add.image(0, 0, 'popup').setOrigin(0.5);
    this.popUp.add(image);

    this.rect = this.popUp.getBounds();
    this.input.on('pointerdown', (pointer) => {
      if (this.popUp.visible && !this.rect.contains(pointer.x, pointer.y) && this.inputFlag) {
        this.popUp.setVisible(false);
        this.inputFlag = false;
      } else {
        this.inputFlag = true;
      }
    });

    this.popUp.on('pointerdown', (pointer) => {}, this);

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

    this.previous;
    for (let i = 0; i < this.listOfGames.length; i += 1) {
      this.rectServers[i] = this.add.container(0, -230 + i * 50);
      this.rectServers[i].name = this.listOfGames[i].toString();
      this.rectServers[i].setSize(400, 50);
      this.rectServers[i].setInteractive();
      this.input.topOnly = true;
      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
        if (gameObject.name !== '' && this.previous !== gameObject.name) {
          const { scene } = gameObject;
          scene.registry.set(
            'game',
            gameObject.name
              .split(',')
              .map((child, index) => (index > 0 ? parseInt(child, 10) : child)),
          );
          this.previous = gameObject.name;
          this.scene.switch('hexagonals');
        }
        // this.scene.switch('hexagonals');
      });
      this.popUp.add(this.rectServers[i]);
      image = this.add.image(0, 30, 'line').setScale(0.8, 0.7).setOrigin(0.5);
      this.rectServers[i].add(image);
      this.rectServers[i].add(
        this.add
          .text(-150, -10, `${this.listOfGames[i][0]}`, {
            fontSize: 18,
            fontFamily: 'medieval',
            color: 'black',
          })
          .setOrigin(0),
      );
      this.rectServers[i].add(
        this.add
          .text(-20, -10, `${this.listOfGames[i][1]}`, {
            fontSize: 18,
            fontFamily: 'medieval',
            color: 'black',
          })
          .setOrigin(0),
      );
      this.rectServers[i].add(
        this.add
          .text(110, -10, `${this.listOfGames[i][2]}`, {
            fontSize: 18,
            fontFamily: 'medieval',
            color: 'black',
          })
          .setOrigin(0),
      );
    }

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

    const hostButton = this.add.container(200, 400);
    image = this.add.image(0, 0, 'button').setOrigin(0);

    hostButton.add(image);
    hostButton.add(
      this.add
        .text(image.displayWidth / 2, image.displayHeight / 2, 'Host', {
          fontSize: 48,
          fontFamily: 'medieval',
          color: 'black',
        })
        .setOrigin(0.5),
    );

    hostButton.setInteractive(
      new Phaser.Geom.Rectangle(image.x, image.y, image.displayWidth, image.displayHeight),
      Phaser.Geom.Rectangle.Contains,
    );

    hostButton.on('pointerdown', this.hostMenu, this);
  }

  update() {
    const pointer = this.input.activePointer;
    const x = pointer.worldX;
    const y = pointer.worldY;
    // console.log(x, y);
    // const check = this.popUp.visible && pointer.isDown;
    // console.log(this.popUp.visible && !this.rect.contains(x, y));
    /* if (this.popUp.visible) {
      if (this.rectServers[0].contains(x, y)) {
        console.log('mamma');
      }
    } */
  }

  popUpMenu() {
    this.popUp.setDepth(10);
    this.popUp.setVisible(true);
    // this.scene.switch('hexagonals');
  }

  hostMenu() {
    console.log('host');
  }
}
