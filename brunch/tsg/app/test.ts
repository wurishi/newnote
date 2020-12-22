export default async function test(): Promise<number> {
  await new Promise((r) => setTimeout(r, 1000));
  console.log('??????');
  return 100;
}
