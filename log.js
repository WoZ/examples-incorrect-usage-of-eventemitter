const util = require('util');

module.exports = function log(msg) {
  const curTime = (new Date()).getTime();
  const seconds = Math.floor(curTime / 1000).toString();
  const milliseconds = ('00' + (curTime % 1000)).slice(-3);
  console.log(util.format('[%s.%s] %s', seconds, milliseconds, msg));
};
