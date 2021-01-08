const width = 640;
const height = 480;

const s = (p) => {
  let handpose;
  let video;
  let predictions = [];

  p.setup = () => {
    p.createCanvas(width, height);

    video = p.createCapture(p.VIDEO);
    video.size(width, height);
    video.hide();

    handpose = ml5.handpose(video, () => {
      handpose.on('predict', (results) => (predictions = results));
    });
  };

  p.draw = () => {
    p.image(video, 0, 0, width, height);

    drawKeypoints();
  };

  function drawKeypoints() {
    for (let i = 0, len = predictions.length; i < len; i++) {
      const prediction = predictions[i];

      for (let j = 0, jlen = prediction.landmarks.length; j < jlen; j++) {
        const keypoint = prediction.landmarks[j];
        p.fill(0, 255, 0);
        p.noStroke();
        p.ellipse(keypoint[0], keypoint[1], 10, 10);
      }
    }
  }
};

export default function () {
  new p5(s);
}
