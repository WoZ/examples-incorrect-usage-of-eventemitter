const util = require('util');
const EventEmitter = require('events').EventEmitter;
const log = require('./log');

class InternalService extends EventEmitter {
  constructor(dataLength, disableLogging = false) {
    super();
    this._disableLogging = disableLogging;
    this._data = '-'.repeat(dataLength);
  }

  start() {
    this._intervalId = setInterval(() => {
      if (!this._disableLogging) {
        log(util.format('emits data to %s listeners', this.listenerCount('data')));
      }
      this.emit('data', this._data);
    }, 100);
  }

  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }
}

module.exports = InternalService;
