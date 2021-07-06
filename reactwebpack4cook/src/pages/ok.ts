export function ok(name: string): string {
  fn();
  return `${name} is ok.`;
}

function p(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function fn() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
    await p(1000);
  }
}
