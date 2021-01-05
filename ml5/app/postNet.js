const width = 400 || window.innerWidth;
const height = 400 || window.innerHeight;

const s = (p) => {
  let video;
  let poseNet;
  let poses = [];

  p.setup = () => {
    p.createCanvas(width, height);
    video = p.createCapture(p.VIDEO, {
      video: {
        width,
        height,
        aspectRatio: 1,
      },
    });
    video.hide();

    poseNet = ml5.poseNet(video, () => {
      poseNet.on('pose', (results) => (poses = results));
    });
  };

  p.draw = () => {
    p.image(video, 0, 0, width, height);
    drawKeypoints();
    drawSkeleton();
  };

  function drawKeypoints() {
    for (let i = 0, len = poses.length; i < len; i++) {
      const pose = poses[i].pose;
      for (let j = 0, jlen = pose.keypoints.length; j < jlen; j++) {
        const keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
          p.fill(255, 0, 0);
          p.noStroke();
          p.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
    }
  }

  function drawSkeleton() {
    for (let i = 0, len = poses.length; i < len; i++) {
      const skeleton = poses[i].skeleton;
      for (let j = 0, jlen = skeleton.length; j < jlen; j++) {
        const [partA, partB] = skeleton[j];
        p.stroke(255, 0, 0);
        p.line(
          partA.position.x,
          partA.position.y,
          partB.position.x,
          partB.position.y
        );
      }
    }
  }
};

export default function () {
  new p5(s);
}
