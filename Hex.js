export default class Hex {
  constructor(q, r, s) {
    this.q = q;
    this.r = r;
    this.s = s;
    if (Math.round(q + r + s) !== 0)
      throw 'q + r + s must be 0 (q : ' + q + ' - r : ' + r + ' - s : ' + s + ')';
  }

  add(b) {
    return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
  }

  subtract(b) {
    return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
  }

  multiply(b) {
    return new Hex(this.q * b.q, this.r * b.r, this.s * b.s);
  }

  len() {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  distance(b) {
    return this.subtract(b).len();
  }

  neighbor(direction) {
    return this.add(Hex.direction(direction));
  }

  round() {
    let qi = Math.round(this.q);
    let ri = Math.round(this.r);
    let si = Math.round(this.s);
    let q_diff = Math.abs(qi - this.q);
    let r_diff = Math.abs(ri - this.r);
    let s_diff = Math.abs(si - this.s);
    if (q_diff > r_diff && q_diff > s_diff) qi = -ri - si;
    else if (r_diff > s_diff) ri = -qi - si;
    else si = -qi - ri;
    return new Hex(qi, ri, si);
  }

  static direction(direction) {
    const directions = [
      new Hex(1, 0, -1),
      new Hex(1, -1, 0),
      new Hex(0, -1, 1),
      new Hex(-1, 0, 1),
      new Hex(-1, 1, 0),
      new Hex(0, 1, -1),
    ];
    return directions[direction];
  }
}
