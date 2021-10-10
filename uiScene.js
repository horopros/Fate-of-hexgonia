export default class uiScene extends Phaser.Scene {
  constructor() {
    super('ui');
  }

  create() {
    this.currentPlayer = this.add.text(520, 0, '', {
      fontSize: 24,
      fontFamily: 'sans-serif',
      fill: 'white',
    });
    this.registry.events.on('changedata-player', this.onPlayerChange, this);
  }

  onPlayerChange(parent, value) {
    this.currentPlayer.setText(`Player: ${value}`);
  }
}
