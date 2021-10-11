export default class bootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  create() {
    this.scene.launch('menu').launch('ui').remove('boot');
  }
}
