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
m.forEach((tmp, idx) => {
  const folder = gui.addFolder(tmp.label);
  tmp.children.forEach((n: string) => {
    const link = keys.find((key: string) => key.indexOf(n + '.ts') >= 0);
    const p: any = {};
    if (link) {
      p[n] = () => {
        removePIXI();
        const fn = context(link).default;
        fn();
      };
    } else {
      p[n] = () => {
        alert(n + '尚未实现');
        removePIXI();
      };
    }
    folder.add(p, n);
  });
  idx === m.length - 1 && folder.open();
});

function removePIXI() {
  document.body.querySelectorAll('canvas').forEach((canvas) => {
    canvas.parentElement.removeChild(canvas);
  });
}
