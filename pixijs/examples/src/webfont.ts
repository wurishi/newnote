export default function () {
  const app = new PIXI.Application({ backgroundColor: 0x1099bb });
  document.body.appendChild(app.view);

  (window as any).WebFontConfig = {
    google: {
      families: ['Snippet', 'Arvo:700italic', 'Podkova:700'],
    },
    active() {
      init();
    },
  };

  (function () {
    const oldWF = document.getElementById('webfont_script');
    if (oldWF) {
      oldWF.parentNode.removeChild(oldWF);
      console.log('remove old');
    }
    const wf = document.createElement('script');
    wf.id = 'webfont_script';
    const host = 'localhost:9000';
    wf.src = `${
      document.location.protocol === 'https:' ? 'https' : 'http'
    }://${host}/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = true;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  function init() {
    const textSample = new PIXI.Text(
      'Pixi.js text using the\ncustom "Snippet" Webfont',
      {
        fontFamily: 'Snippet',
        fontSize: 50,
        fill: 'white',
        align: 'left',
      }
    );
    textSample.position.set(50, 200);
    app.stage.addChild(textSample);
  }
}
