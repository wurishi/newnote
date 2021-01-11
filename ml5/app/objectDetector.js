const width = 640;
const height = 480;

const s = (p) => {
  let video;
  let detector;
  let detections = [];

  p.setup = () => {
    p.createCanvas(width, height);
    video = p.createCapture(p.VIDEO);
    video.size(width, height);
    video.hide();

    detector = ml5.objectDetector('cocossd/model.json', modelReady); // cocossd, yolo, url
  };

  function modelReady() {
    setTimeout(() => {
      detector.detect(video, gotDetections);
    }, 1000);
  }

  function gotDetections(err, results) {
    if (err) return console.log(err);
    detections = results;
    detector.detect(video, gotDetections);
  }

  p.draw = () => {
    p.image(video, 0, 0);

    for (let i = 0, len = detections.length; i < len; i++) {
      let object = detections[i];
      p.stroke(0, 255, 0);
      p.strokeWeight(4);
      p.noFill();
      p.rect(object.x, object.y, object.width, object.height);
      p.noStroke();
      p.fill(255);
      p.textSize(24);
      p.text(object.label, object.x + 10, object.y + 24);
    }
  };
};

export default function () {
  new p5(s);
}
