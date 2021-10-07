import MapShapes from './MapShapes.js';
import Layout from './Layout.js';
import Hexboard from './Hexboard.js';
import Hexagon from './Hexagon.js';

export default class MapCreation extends Phaser.Scene {
  constructor() {
    super('hexagonals');
  }

  preload() {
    this.load.image('grass', 'assets/grass.png');
  }

  create() {
    this.size_hex = { x: 52.4, y: 52.4 }; // dimensioni del singolo esagono
    this.hex_grids = [
      MapShapes.hexagon(3),
      MapShapes.hexagon(3),
      MapShapes.hexagon(3),
      MapShapes.hexagon(3),
    ]; // lista delle griglie
    this.can_drag = true; // variabile che indica se è possibile fare il drag oppure no
    this.width_cell = this.size_hex.x / 2; // larghezza della cella
    // altezza della cella
    this.height_cell = Math.sqrt(this.size_hex.x ** 2 - this.width_cell ** 2);
    this.boards = [];
    for (let player = 0; player < 4; player += 1) {
      // aggiunta prima figura (lo 0 indica il tipo che è l'esagono,
      // fosse stato 1 sarebbe stato triangolo)
      const board = this.addFigure(
        0,
        this.hex_grids[player],
        Layout.flat,
        this.size_hex,
        {
          x: Phaser.Math.Snap.To(Math.random() * 1000, this.width_cell),
          y: Phaser.Math.Snap.To(Math.random() * 600, this.height_cell),
        },
        player,
      );
      this.boards.push(board);
    }

    for (let i = 0; i < 4; i += 1) {
      this.boards[i].setInteractive();
      this.input.setDraggable(this.boards[i]);
      this.input.enableDebug(this.boards[i]);
    }

    this.grid_selected = 1; // indica la grglia selezionata e l'indice da mettere a this.hex_grids

    // questo metodo serve a dire che allo schiacciare di un tasto si cambia la griglia selezionata
    this.input.keyboard.on('keydown', this.pressButton);

    // this.input.on('pointerdown', this.checkHex);

    // prima di iniziare a muovere il container viene fatto un controllo sul puntatore
    // per stabilire se l'esagono puntato esista in una delle griglie oppure no
    this.input.on('dragstart', this.dragStart);

    // se il controllo ha esito positivo sin procede a muovere il container
    this.input.on('drag', this.drag);

    // in base alla figura si aggiorna il layout della griglia
    this.input.on('dragend', this.dragEnd);

    this.text = this.add.text(10, 10, '', { fill: '#00FF00' });
  }

  // in base alla posizione del puntatore si aggiorna il testo delle posizioni q, r, s, x, y
  update() {
    const pointer = this.input.activePointer;
    const layout = this.grid_selected === 0 ? this.boards[0].layout : this.boards[1].layout;
    this.hex = layout
      .pixelToHex({
        x: pointer.worldX,
        y: pointer.worldY,
      })
      .round();
    this.text.setText([
      `q: ${this.hex.q}`,
      `r: ${this.hex.r}`,
      `s: ${this.hex.s}`,
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`,
      `Overlapped: ${Phaser.Geom.Rectangle.Overlaps(
        this.boards[0].rectangle,
        this.boards[1].rectangle,
      )}`,
      `Grid Selected: ${this.grid_selected} `,
    ]);
  }

  // aggiunge una griglia come un contenitore di sprite
  addFigure(type, grid, layoutType, size, origin, player) {
    const map = grid; // assegnamo la griglia
    // creiamo il layout, impostando, inizialmente, le coordinate (0;0)
    const layout = new Layout(layoutType, size, {
      x: 0,
      y: 0,
    });
    // creiamo il container che conterrà tutti gli sprite
    const board = new Hexboard(this, origin.x, origin.y, layout, player, type);
    let xMin;
    let xMax = 0;
    let yMin;
    let yMax = 0; // coordiante massime/minime tra tutti gli esagoni

    /* eslint-disable no-restricted-syntax */
    for (const [key, hexMath] of map) {
      const point = layout.hexToPixel(hexMath);
      if (xMin > point.x || xMin == null) xMin = point.x;
      if (xMax < point.x) xMax = point.x;
      if (yMin > point.y || yMin == null) yMin = point.y;
      if (yMax < point.y) yMax = point.y;
      const hexSprite = new Hexagon(this, point.x, point.y, 'grass', hexMath); // trasformiamo un oggetto {r,s,q} in uno sprite
      // al posto dell'oggetto {r,s,q} aggiungiamo lo sprite precedentemente creato
      map.set(key, hexSprite);
    }
    /* eslint-enable */

    // impostiamo le dimensioni del container in base alle coordinate
    board.setSize(xMax - xMin + 52.4 * 2, yMax - yMin + 52.4 * 2);
    board.add(Array.from(map.values())); // aggiungiamo al container tutti gli hex
    const xTopLeft = board.x - board.width / 2; // coordianata x del vertice in alto a sinistra
    const yTopLeft = board.y - board.height / 2; // coordianata y del vertice in alto a sinistra
    // se il tipo di griglia è triangolare si devono correggere le coordinate degli sprite
    if (type === 1) {
      // distanza x dal centro del container al punto in alto a sinistra del container
      const distX = board.x - xTopLeft;
      // distanza y dal centro del container al punto in alto a sinistra del container
      const distY = board.y - yTopLeft;
      /* eslint-disable no-restricted-syntax */
      for (const t of Array.from(map.values())) {
        // aggiorniamo le coordinate degli sprite
        t.x = t.x - distX + 52.4;
        t.y = t.y - distY + 52.4;
      }
      /* eslint-enable */
    }
    // rettangolo che rappresenta il container nella sua dimensione e posizione
    const rect = new Phaser.Geom.Rectangle(xTopLeft, yTopLeft, board.width, board.height);
    board.setRectangle(rect); // aggiungere o impostare triangolo al layout

    // impostare le coordinate del punto in alto a sinistra del rettangolo
    board.setPositionTopLeft(xTopLeft, yTopLeft);
    return board; // ritorno del layout
  }

  pressButton(event) {
    this.scene.grid_selected = this.scene.grid_selected > 2 ? 0 : this.scene.grid_selected + 1;
  }

  dragStart(pointer, gameObject) {
    if (gameObject.type === 1) {
      this.scene.boards[this.scene.grid_selected].layout.origin.x = gameObject.x_top_left + 52.4;
      this.scene.boards[this.scene.grid_selected].layout.origin.y = gameObject.y_top_left + 52.4;
    } else {
      this.scene.boards[this.scene.grid_selected].layout.origin.x = gameObject.x;
      this.scene.boards[this.scene.grid_selected].layout.origin.y = gameObject.y;
    }
    const { layout } = this.scene.boards[this.scene.grid_selected];
    const hex = layout
      .pixelToHex({
        x: pointer.worldX,
        y: pointer.worldY,
      })
      .round();

    const coord = [hex.q, hex.r, hex.s];
    // prettier-ignore
    if (
      this.scene.hex_grids[this.scene.grid_selected].has(coord.toString())
      && gameObject.boardNumber === this.scene.grid_selected
    ) {
      this.scene.can_drag = true;
    } else {
      this.scene.can_drag = false;
    }
  }

  drag(pointer, gameObject, dragX, dragY) {
    if (this.scene.can_drag) {
      gameObject.x = Phaser.Math.Snap.To(dragX, this.scene.width_cell);
      gameObject.y = Phaser.Math.Snap.To(dragY, this.scene.height_cell);
    }
  }

  dragEnd(pointer, gameObject) {
    gameObject.x_top_left = gameObject.x - gameObject.width / 2;
    gameObject.y_top_left = gameObject.y - gameObject.height / 2;
    const distX = gameObject.x - gameObject.x_top_left;
    const distY = gameObject.y - gameObject.y_top_left;
    if (gameObject.type === 1) {
      this.scene.boards[this.scene.grid_selected].layout.origin.x = gameObject.x - distX + 52.4;
      this.scene.boards[this.scene.grid_selected].layout.origin.y = gameObject.y - distY + 52.4;
    } else {
      this.scene.boards[this.scene.grid_selected].layout.origin.x = gameObject.x;
      this.scene.boards[this.scene.grid_selected].layout.origin.y = gameObject.y;
    }
    gameObject.rectangle.x = gameObject.x_top_left;
    gameObject.rectangle.y = gameObject.y_top_left;

    /* let graphics = this.scene.add.graphics();
    graphics.lineStyle(3, '0xRRGGBB', 1);
    graphics.strokeRectShape(this.scene.boards[0].rectangle);
    graphics.strokeRectShape(this.scene.boards[1].rectangle); */

    const pairsOfContainers = this.scene.boards.flatMap((container, index, containerArray) => {
      const array = containerArray
        .slice(index + 1)
        .map((otherContainer) => [container, otherContainer]);
      return array;
    });
    const overlappedContainers = pairsOfContainers.filter((container) => {
      if (Phaser.Geom.Rectangle.Overlaps(container[0].rectangle, container[1].rectangle)) {
        return true;
      }
      return false;
    });
    const intersectedHexagons = overlappedContainers.flatMap((container) => {
      const hexs = [];
      const inters = Phaser.Geom.Rectangle.Intersection(
        container[0].rectangle,
        container[1].rectangle,
      );
      container[0].iterate((child) =>
        MapCreation.checkHex(child, inters, hexs, container[0], container[0].boardNumber),
      );
      container[1].iterate((child) =>
        MapCreation.checkHex(child, inters, hexs, container[1], container[1].boardNumber),
      );
      return hexs;
    });
    const pairsHex = intersectedHexagons
      .flatMap((hex, index, array) => {
        const newArray = array.slice(index + 1).map((otherHex) => [hex, otherHex]);
        return newArray;
      })
      .filter((child) => child[0][2] !== child[1][2]);
    let overlappedHex = pairsHex
      .filter((hex) => {
        let x = hex[0][1].x + hex[0][0].x;
        let y = hex[0][1].y + hex[0][0].y;
        let centerToVert = (hex[0][0].displayWidth / 2 / 2) * Math.sqrt(3);
        const circle1 = new Phaser.Geom.Circle(x, y, centerToVert);
        x = hex[1][1].x + hex[1][0].x;
        y = hex[1][1].y + hex[1][0].y;
        centerToVert = (hex[1][0].displayWidth / 2 / 2) * Math.sqrt(3);
        const circle2 = new Phaser.Geom.Circle(x, y, centerToVert);

        const distBtwHexs = Phaser.Math.Distance.Between(
          circle1.x,
          circle1.y,
          circle2.x,
          circle2.y,
        );

        const acceptedDistance = circle1.radius * 1.8;

        return distBtwHexs - acceptedDistance < 1;
      })
      .flatMap((hex) => [hex[0][0], hex[1][0]]);

    overlappedHex = [...new Set(overlappedHex)];

    overlappedHex.forEach((child) => child.setTint('0xFF0000'));

    this.scene.boards.forEach((container) => {
      const difference = container.list.filter((child) => !overlappedHex.includes(child));
      difference.forEach((child) => child.clearTint());
    });
  }

  static checkHex(child, inters, hexToCheck, container, index) {
    const result = Phaser.Geom.Intersects.RectangleToRectangle(child.getBounds(), inters);
    if (result) {
      hexToCheck.push([child, { x: container.x, y: container.y }, index]);
    }
  }
}
