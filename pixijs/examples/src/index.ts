import { GUI } from 'dat.gui';
import config from './config';

const menu: any = config;

const m = Object.keys(menu)
  .map((key: string) => ({
    label: key,
    children: menu[key].children,
    sort: menu[key].sort,
  }))
  .sort((a, b) => a.sort - b.sort);

const context = (require as any).context('./', false, /.ts$/);
const keys = context.keys();

const gui = new GUI();
m.forEach((tmp) => {
  const folder = gui.addFolder(tmp.label);
  tmp.children.forEach((n: string) => {
    const link = keys.find((key: string) => key.indexOf(n) >= 0);
    const p: any = {};
    if (link) {
      p[n] = () => {
        removePIXI();
        const fn = context(link).default;
        fn();
      };
    } else {
      p[n] = () => {
        removePIXI();
      };
    }
    folder.add(p, n);
  });
  // folder.open();
});

function removePIXI() {
  document.body.querySelectorAll('canvas').forEach((canvas) => {
    canvas.parentElement.removeChild(canvas);
  });
}
