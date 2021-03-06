const InternalService = require('./InternalService');
const log = require('./log');

class ExternalService {
  constructor() {
    this.internalEmitter = new InternalService(10000000);
  }

  start() {
    this.internalEmitter.on('data', this._onDataEvent);
    this.internalEmitter.start();
  }

  stop() {
    this.internalEmitter.stop();
  }

  _onDataEvent(data) {
    log('new data from InternalService');
  }
}

const extService = new ExternalService();

setInterval(() => {
  extService.start();
  setTimeout(() => {
    extService.stop();
  }, 150);
}, 200);
