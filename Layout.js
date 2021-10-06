class Layout {
  static pointy = new Orientation(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    0.5,
  );
  static flat = new Orientation(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0,
  );

  constructor(orientation, size, origin) {
    this.orientation = orientation;
    this.size = size;
    this.origin = origin;
  }

  hexToPixel(h) {
    let M = this.orientation;
    let size = this.size;
    let origin = this.origin;
    let x = (M.f0 * h.q + M.f1 * h.r) * size.x;
    let y = (M.f2 * h.q + M.f3 * h.r) * size.y;
    return { x: x + origin.x, y: y + origin.y };
  }

  pixelToHex(p) {
    let M = this.orientation;
    let size = this.size;
    let origin = this.origin;
    let pt = { x: (p.x - origin.x) / size.x, y: (p.y - origin.y) / size.y };
    let q = M.b0 * pt.x + M.b1 * pt.y;
    let r = M.b2 * pt.x + M.b3 * pt.y;
    return new Hex(q, r, -q - r);
  }

  hexCornerOffset(corner) {
    var M = this.orientation;
    var size = this.size;
    var angle = (2.0 * Math.PI * (M.start_angle - corner)) / 6.0;
    return { x: size.x * Math.cos(angle), y: size.y * Math.sin(angle) };
  }

  polygonCorners(h) {
    let corners = [];
    let center = this.hexToPixel(h);
    for (let i = 0; i < 6; i++) {
      let offset = this.hexCornerOffset(i);
      corners.push({ x: center.x + offset.x, y: center.y + offset.y });
    }
    return corners;
  }
}
