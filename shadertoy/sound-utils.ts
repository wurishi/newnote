let audioContext: AudioContext;
let sourceNode: AudioBufferSourceNode;
let analyserNode: AnalyserNode;
let javascriptNode: ScriptProcessorNode;
let amplitudeArray: Uint8Array;

let soundPlay = false;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

window.AudioContext = (function () {
  return (
    (window as any).webkitAudioContext ||
    window.AudioContext ||
    (window as any).mozAudioContext
  );
})();

export function startSound() {
  soundPlay = true;
  if (!audioContext) {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');

    audioContext = new AudioContext();
    sourceNode = audioContext.createBufferSource();
    analyserNode = audioContext.createAnalyser();
    javascriptNode = audioContext.createScriptProcessor(1024, 1, 1);
    amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
    sourceNode.connect(audioContext.destination);
    sourceNode.connect(analyserNode);
    analyserNode.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    javascriptNode.onaudioprocess = (evt) => {
      analyserNode.getByteTimeDomainData(amplitudeArray);

      if (soundPlay) {
        draw();
      }
    };

    const request = new XMLHttpRequest();
    request.open('GET', './media/sound.mp3');
    request.responseType = 'arraybuffer';
    request.onload = () => {
      audioContext.decodeAudioData(request.response, (buffer) => {
        sourceNode.buffer = buffer;
        sourceNode.start();
        sourceNode.loop = true;
      });
    };
    request.send();
  }
  audioContext.resume();
  return canvas;
}

export function stopSound() {
  soundPlay = false;
  audioContext.suspend();
}

function draw() {
  const len = amplitudeArray.length;
  console.log(len);
}
