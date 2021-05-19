const system = new entitas.Systems();
system.initialize();

setInterval(() => {
  system.execute();
}, 100);
