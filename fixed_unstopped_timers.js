const InternalService = require('./InternalService');
const log = require('./log');

class ExternalService {
  constructor() {
  }

  start() {
    this.internalEmitter = new InternalService(10000000);
    this.internalEmitter.on('data', this._onDataEvent);
    this.internalEmitter.start();
  }

  stop() {
    this.internalEmitter.removeListener('data', this._onDataEvent);
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
