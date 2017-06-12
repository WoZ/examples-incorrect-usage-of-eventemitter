const util = require('util');
const InternalService = require('./InternalService');
const log = require('./log');

class ExternalService {
  constructor() {
    this._bytesReceived = 0;
  }

  getBytesReceived() {
    return this._bytesReceived;
  }

  start() {
    this.internalEmitter = new InternalService(10000000, true);
    this.internalEmitter.on('data', this._onDataEvent.bind(this));
    this.internalEmitter.start();
  }

  stop() {
    this.internalEmitter.stop();
  }

  _onDataEvent(data) {
    this._bytesReceived += data.length;
  }
}

const extService = new ExternalService();

setInterval(() => {
  log(util.format('heapUsed = %d, bytes received = %d', process.memoryUsage().heapUsed, extService.getBytesReceived()));
}, 1000);

setInterval(() => {
  extService.start();
  setTimeout(() => {
    extService.stop();
  }, 150);
}, 200);
