class MapShapes {
  static parallelogram(row, col) {
    let map = new Map();
    for (let q = 0; q < row; q++)
      for (let r = 0; r < col; r++) {
        let hex = new Hex(q, r, -q - r);
        map.set([q, r, -q - r].toString(), hex);
      }
    return map;
  }

  static triangle(size) {
    let map = new Map();
    for (let q = 0; q < size; q++)
      for (let r = 0; r < size - q; r++) {
        let hex = new Hex(q, r, -q - r);
        map.set([q, r, -q - r].toString(), hex);
      }
    return map;
  }

  static hexagon(radius) {
    let map = new Map();
    for (let q = -(--radius); q <= radius; q++) {
      let r1 = Math.max(-radius, -q - radius);
      let r2 = Math.min(radius, -q + radius);
      for (let r = r1; r <= r2; r++) {
        let hex = new Hex(q, r, -q - r);
        map.set([q, r, -q - r].toString(), hex);
      }
    }
    return map;
  }

  static rectangle(height, width) {
    let map = new Map();
    for (let r = 0; r < height; r++) {
      let offset = Math.floor(r / 2);
      for (let q = -offset; q < width - offset; q++) {
        let hex = new Hex(q, r, -q - r);
        map.set([q, r, -q - r].toString(), hex);
      }
    }
    return map;
  }
}
