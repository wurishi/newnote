const width = 640;
const height = 480;

const s = (p) => {
  let facemesh;
  let video;
  let predictions = [];

  p.setup = () => {
    p.createCanvas(width, height);

    video = p.createCapture(p.VIDEO);
    video.size(width, height);
    video.hide();

    facemesh = ml5.facemesh(video, () => {
      facemesh.on('predict', (results) => (predictions = results));
    });
  };

  p.draw = () => {
    p.image(video, 0, 0, width, height);

    drawKeypoints();
  };

  function drawKeypoints() {
    for (let i = 0, len = predictions.length; i < len; i++) {
      const keypoints = predictions[i].scaledMesh;
      for (let j = 0, jlen = keypoints.length; j < jlen; j++) {
        const [x, y] = keypoints[j];
        p.fill(0, 255, 0);
        p.ellipse(x, y, 5, 5);
      }
    }
  }
};

export default function () {
  new p5(s);
}
