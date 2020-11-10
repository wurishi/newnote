const JestWorker = require('jest-worker').default;

async function main() {
  const worker = new JestWorker(require.resolve('./1.6.work.js'));
  const result = await Promise.all([
    worker.hello('Bob'), //
    worker.getWorkerId(),
  ]);
  console.log(result);
}

main();
