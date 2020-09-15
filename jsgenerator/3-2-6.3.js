function* countUp(start = 0) {
  while (true) {
    start++;
    yield* displayCounter(start);
  }
}

function* displayCounter(counter) {
  const counterSpan = document.querySelector('#counter');
  counterSpan.textContent = String(counter);
  yield;
}

function run(generatorObject) {
  if (!generatorObject.next().done) {
    setTimeout(() => {
      run(generatorObject);
    }, 1000);
  }
}

run(countUp());
