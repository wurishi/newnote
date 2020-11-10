module.exports.hello = function (param) {
  return 'Hello, ' + param;
};

module.exports.getWorkerId = function getWorkerId() {
  return process.env.JEST_WORKER_ID;
};
