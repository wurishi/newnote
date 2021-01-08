const width = 320;
const height = 240;

const s = (p) => {
  let uNet;
  let video;
  let segmentationImage;

  p.preload = () => {
    ml5.p5Utils.setP5Instance(p);
    uNet = ml5.uNet('face');
  };

  p.setup = () => {
    p.createCanvas(width, height);

    video = p.createCapture(p.VIDEO);
    video.size(width, height);
    video.hide();

    segmentationImage = p.createImage(width, height);
    // console.log(video);
    // uNet.segment(video, gotResult);
    // console.log(video);
    setTimeout(() => {
      uNet.segment(video, gotResult);
    }, 1000);
  };

  function gotResult(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    segmentationImage = result.backgroundMask;
    uNet.segment(video, gotResult);
  }

  p.draw = () => {
    p.background(0);
    p.image(segmentationImage, 0, 0, width, height);
  };
};

export default function () {
  new p5(s);
}
