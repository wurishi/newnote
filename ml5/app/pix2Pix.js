const SIZE = 256;

const s = (p) => {
  let inputImg, inputCanvas, outputContainer, statusMsg, transferBtn, clearBtn;

  (function () {
    const tBtn = document.createElement('button');
    tBtn.id = 'transferBtn';
    tBtn.textContent = 'Transfer';
    document.body.appendChild(tBtn);

    const cBtn = document.createElement('button');
    cBtn.id = 'clearBtn';
    cBtn.textContent = 'Clear';
    document.body.appendChild(cBtn);
  })();

  p.setup = () => {
    inputCanvas = p.createCanvas(SIZE, SIZE);

    inputImg = p.loadImage('pix2pix/cat.jpg', drawImage);

    transferBtn = p.select('#transferBtn');

    clearBtn = p.select('#clearBtn');
    clearBtn.mousePressed(() => {
      clearCanvas();
    });

    p.stroke(0);
    p.pixelDensity(1);
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }
  };

  function drawImage() {
    p.image(inputImg, 0, 0);
    ml5.pix2pix('pix2pix/edges2handbags_AtoB.pict').then((model) => {
      transfer(model);

      transferBtn.mousePressed(() => {
        transfer(model);
      });
    });
  }

  function clearCanvas() {
    p.background(255);
  }

  function transfer(pix2pix) {
    const canvasElement = p.select('canvas').elt;
    pix2pix.transfer(canvasElement).then((result) => {
      if (p.select('.output')) {
        p.select('.output').remove();
      }
      p.createImg(result.src).class('output');
    });
  }
};

export default function () {
  new p5(s);
}
