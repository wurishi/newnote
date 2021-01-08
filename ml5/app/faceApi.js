const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

const width = 360;
const height = 270;

const s = (p) => {
  let video;
  let faceapi;
  let detections = [];

  p.setup = () => {
    p.createCanvas(width, height);

    video = p.createCapture(p.VIDEO);
    video.size(width, height);
    video.hide();

    faceapi = ml5.faceApi(video, detection_options, () => {
      faceapi.detect(gotResult);
    });

    p.textAlign(p.RIGHT);
  };

  function gotResult(err, result) {
    if (err) {
      console.log(err);
      return;
    }

    detections = result;

    p.background(255);
    p.image(video, 0, 0, width, height);

    if (detections.length > 0) {
      drawBox(detections);
      drawLandmarks(detections);
    }
    faceapi.detect(gotResult);
  }

  function drawBox(detections) {
    for (let i = 0, len = detections.length; i < len; i++) {
      const alignedRect = detections[i].alignedRect;
      const x = alignedRect._box._x;
      const y = alignedRect._box._y;
      const boxWidth = alignedRect._box._width;
      const boxHeight = alignedRect._box._height;

      p.noFill();
      p.stroke(161, 95, 251);
      p.strokeWeight(2);
      p.rect(x, y, boxWidth, boxHeight);
    }
  }

  function drawLandmarks(detections) {
    p.noFill();
    p.stroke(161, 95, 251);
    p.strokeWeight(2);

    for (let i = 0, len = detections.length; i < len; i++) {
      const {
        mouth,
        nose,
        leftEye,
        rightEye,
        rightEyeBrow,
        leftEyeBrow,
      } = detections[i].parts;

      drawPart(mouth, true);
      drawPart(nose, false);
      drawPart(leftEye, true);
      drawPart(leftEyeBrow, false);
      drawPart(rightEye, true);
      drawPart(rightEyeBrow, false);
    }
  }

  function drawPart(feature, closed) {
    p.beginShape();
    for (let i = 0, len = feature.length; i < len; i++) {
      const { _x, _y } = feature[i];
      p.vertex(_x, _y);
    }
    if (closed) {
      p.endShape(p.CLOSE);
    } else {
      p.endShape();
    }
  }
};

export default function () {
  new p5(s);
}
