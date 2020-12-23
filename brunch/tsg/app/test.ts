export default async function test(): Promise<number> {
  await new Promise((r) => setTimeout(r, 1000));
  console.log('??????');
  return 100;
}

console.log('我是 test.ts');
