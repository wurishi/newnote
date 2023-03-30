<script lang="ts">
  const allComponents = import.meta.glob("./pages/*/index.svelte");
  const componentList = new Array<{ name: string; key: string }>();
  Object.keys(allComponents).forEach((key) => {
    const arr = key.split("/");
    const num = arr.at(-2);
    componentList.push({
      name: num + "",
      key,
    });
  });

  const selectHandler = (evt) => {
    let target = document.getElementById('content');
    if(target) {
      document.body.removeChild(target);
    }
    const key = evt.target.value;
    const fn = allComponents[key];
    if(fn) {
      target = document.createElement('div');
      target.id = 'content';
      document.body.appendChild(target);

      fn().then(Module => {
        new Module.default({
          target
        })
      });
    }
  };
</script>

<main>
  <select on:change={selectHandler}>
    <option>选择一个</option>
    {#each componentList as page}
      <option value={page.key}>{page.name}</option>
    {/each}
  </select>
</main>

<style>
</style>
