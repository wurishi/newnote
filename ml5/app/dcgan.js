const size = 200;

const s = (p) => {
  let dcgan;
  let button;
  let vector = [];

  p.preload = () => {
    button = p.createButton('generate');
    button.hide();
    dcgan = ml5.DCGAN('dcgan/geo/manifest.json', () => {
      button.show();
    });
  };

  p.setup = () => {
    p.createCanvas(size, size);

    for (let i = 0; i < 128; i++) {
      vector[i] = p.random(-1, 1);
    }

    button.mousePressed(generate);

    // generate();
  };

  function walk() {
    for (let i = 0; i < 128; i++) {
      vector[i] += p.random(-0.01, 0.01);
    }
  }

  function generate() {
    walk();
    dcgan.generate(displayImage, vector);
  }

  function displayImage(err, result) {
    if (err) return console.log(err);
    p.image(result.image, 0, 0, size, size);
  }
};

export default function () {
  new p5(s);
}
