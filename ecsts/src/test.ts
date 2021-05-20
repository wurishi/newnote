/// <reference path="../lib/ext/test.d.ts"/>

export default function main() {
  const sys = new entitas.Systems();

  const update = () => {
    sys.execute();
    setTimeout(update, 0);
  };

  setTimeout(update, 0);
}
