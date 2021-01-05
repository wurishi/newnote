const s = (p) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };
  p.draw = () => {
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
  };
};

export default function () {
  new p5(s);
}
