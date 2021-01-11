const size = 200;

const s = (p) => {
  let cvae;
  let button;
  let dropdown;

  p.preload = () => {
    ml5.p5Utils.setP5Instance(p);

    window.loadImage = p.loadImage;

    button = p.createButton('generate');
  };

  p.setup = () => {
    p.createCanvas(size, size);
    cvae = ml5.CVAE('cvae/manifest.json', () => {
      dropdown && dropdown.remove();
      dropdown = p.createSelect();
      for (const label of cvae.labels) {
        dropdown.option(label);
      }
    });

    button.mousePressed(() => {
      const label = dropdown.value();
      cvae.generate(label, gotImage);
    });

    p.background(0);
  };

  function gotImage(error, result) {
    if (error) return console.log(error);
    p.image(result.image, 0, 0, size, size)
  }
};

export default function () {
  new p5(s);
}
