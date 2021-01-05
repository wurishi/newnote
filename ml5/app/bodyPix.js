const width = 320;
const height = 240;

const options = {
  outputStride: 8,
  segmentationThreshold: 0.3,
};

const s = (p) => {
  let bodypix;
  let video;
  let segmentation;

  p.setup = () => {
    ml5.p5Utils.setP5Instance(p);

    p.createCanvas(width, height);

    video = p.createCapture(p.VIDEO);
    video.size(width, height);
    video.hide();

    bodypix = ml5.bodyPix(video, () => {
      bodypix.segment(gotResults, options);
    });
  };

  function gotResults(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    segmentation = result;
    p.background(0);
    p.image(segmentation.backgroundMask, 0, 0, width, height);

    bodypix.segment(gotResults, options);
  }
};

export default function () {
  new p5(s);
}
