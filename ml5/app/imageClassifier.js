const s = (p) => {
  let video;
  let classifier;
  let div;

  p.preload = () => {
    div = document.createElement('div');
    document.body.appendChild(div);

    video = p.createCapture(p.VIDEO, {
      video: {
        width: 280,
        height: 280,
        aspectRatio: 1,
      },
    });
    classifier = ml5.imageClassifier('DoodleNet', video, () => {
      classifyVideo();
    });
  };

  p.setup = () => {};
  // p.draw = () => {
  //   p.background(0);
  //   p.fill(255);
  //   p.rect(100, 100, 50, 50);
  // };

  function classifyVideo() {
    classifier.classify((error, results) => {
      if (error) {
        div.textContent = JSON.stringify(textContent);
      }
      if (Array.isArray(results)) {
        // console.log(results);
        // label: "lighthouse", confidence
        div.textContent = results
          .map(
            (item) =>
              item.label + ' ' + (item.confidence * 100).toFixed(2) + '%'
          )
          .join(';');
      }
      classifyVideo();
    });
  }
};

export default function () {
  new p5(s);
}
