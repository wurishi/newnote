const size = 400;

const s = (p) => {
  let model;
  let previous_pen = 'down';
  let x, y;
  let strokePath;
  let seedStrokes = [];
  let canvas;
  let button;

  p.setup = () => {
    canvas = p.createCanvas(size, size);
    canvas.hide();

    p.background(220);

    model = ml5.sketchRNN('cat', modelReady);

    button = p.createButton('clear');
  };

  function modelReady() {
    canvas.show();

    canvas.mouseReleased(startSketchRNN);
    button.mousePressed(clearDrawing);
  }
  function clearDrawing() {
    p.background(220);
    seedStrokes = [];
    model.reset();
  }
  function startSketchRNN() {
    x = p.mouseX;
    y = p.mouseY;
    model.generate(seedStrokes, gotStroke);
  }
  function gotStroke(err, s) {
    if (err) return console.log(err);
    strokePath = s;
  }

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.stroke(0);
      p.strokeWeight(3.0);
      const { pmouseX, pmouseY, mouseX, mouseY } = p;
      p.line(pmouseX, pmouseY, mouseX, mouseY);

      seedStrokes.push({
        dx: mouseX - pmouseX,
        dy: mouseY - pmouseY,
        pen: 'down',
      });
    }

    if (strokePath) {
      if (previous_pen === 'down') {
        p.stroke(0);
        p.strokeWeight(3.0);
        p.line(x, y, x + strokePath.dx, y + strokePath.dy);
      }
      x += strokePath.dx;
      y += strokePath.dy;
      previous_pen = strokePath.pen;

      if (strokePath.pen !== 'end') {
        strokePath = null;
        model.generate(gotStroke);
      }
    }
  };
};

export default function () {
  new p5(s);
}
