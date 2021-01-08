const width = 320;
const height = 240;

const s = (p) => {
  let style;
  let video;
  let isTransferring = false;
  let resultImg;

  p.preload = () => {
    const btn = document.createElement('button');
    btn.id = 'startStop';
    btn.textContent = 'Wait';
    document.body.appendChild(btn);
  };

  p.setup = () => {
    p.createCanvas(width, height);

    video = p.createCapture(p.VIDEO);
    video.hide();

    resultImg = p.createImg('');
    resultImg.hide();

    p.select('#startStop').mousePressed(() => {
      if (!style) return;
      if (isTransferring) {
        p.select('#startStop').html('Start');
      } else {
        p.select('#startStop').html('Stop');
        setTimeout(() => {
          style.transfer(gotResult);
        }, 1);
      }
      isTransferring = !isTransferring;
    });

    style = ml5.styleTransfer('styletransfer/udnie', video, () => {
      p.select('#startStop').html('Start');
    });
  };

  p.draw = () => {
    if (isTransferring) {
      p.image(resultImg, 0, 0, width, height);
    } else {
      p.image(video, 0, 0, 320, 240);
    }
  };

  function gotResult(err, img) {
    if (err) return console.log(err);
    resultImg.attribute('src', img.src);
    if (isTransferring) {
      style.transfer(gotResult);
    }
  }
};

const img = (p) => {
  let inputImg;
  let statusMsg;
  let transferBtn;
  let style1;
  let style2;
  let style3;

  function addP(div, msg) {
    const p = document.createElement('p');
    p.textContent = msg;
    div.appendChild(p);
  }

  (function () {
    const statusMsg = document.createElement('div');
    statusMsg.id = 'statusMsg';
    document.body.appendChild(statusMsg);

    const transferBtn = document.createElement('button');
    transferBtn.id = 'transferBtn';
    document.body.appendChild(transferBtn);
    transferBtn.textContent = 'Transfer!';

    const inputImg = document.createElement('img');
    inputImg.id = 'inputImg';
    inputImg.src = 'styletransfer/inputm.jpg';
    document.body.appendChild(inputImg);

    const styleA = document.createElement('div');
    styleA.id = 'styleA';
    addP(styleA, 'Style A');
    const imgA = document.createElement('img');
    imgA.src = 'styletransfer/wave.jpg';
    styleA.appendChild(imgA);
    document.body.appendChild(styleA);

    const styleB = document.createElement('div');
    styleB.id = 'styleB';
    addP(styleB, 'Style B');
    const imgB = document.createElement('img');
    imgB.src = 'styletransfer/udnie.jpg';
    styleB.appendChild(imgB);
    document.body.appendChild(styleB);

    const styleC = document.createElement('div');
    styleC.id = 'styleC';
    addP(styleC, 'Style C');
    document.body.appendChild(styleC);
  })();

  p.setup = () => {
    p.noCanvas();

    statusMsg = p.select('#statusMsg');

    inputImg = p.select('#inputImg');

    transferBtn = p.select('#transferBtn');
    transferBtn.mousePressed(transferImages);
    transferBtn.hide();

    style1 = ml5.styleTransfer('styletransfer/wave', modelLoaded);
    style2 = ml5.styleTransfer('styletransfer/udnie', modelLoaded);
    style3 = ml5.styleTransfer('styletransfer/mathura', modelLoaded);
  };

  function modelLoaded() {
    if (style1.ready && style2.ready && style3.ready) {
      statusMsg.html('Ready!');
      transferBtn.show();
    }
  }

  function transferImages() {
    statusMsg.html('开始...');

    setTimeout(() => {
      style1.transfer(inputImg, (err, result) => {
        p.createImg(result.src).parent('styleA');
      });

      style2.transfer(inputImg, (err, result) => {
        p.createImg(result.src).parent('styleB');
      });

      style3.transfer(inputImg, (err, result) => {
        p.createImg(result.src).parent('styleC');
      });

      statusMsg.html('Done!');
    }, 10);
  }
};

export default function () {
  new p5(img);
}
