function run(flag, lang, ...args) {
  if (flag === '-p' || flag === '--platform') {
    switch (lang) {
      case 'csharp':
        break;
      case 'vala':
        break;
      case 'nim':
        break;
      default:
        break;
    }
  } else {
    require('./generators/html5.js').run(...args);
  }
}

module.exports.run = run;
