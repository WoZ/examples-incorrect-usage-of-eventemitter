const util = require('util');
const EventEmitter = require('events').EventEmitter;
const log = require('./log');

class PatchedEventEmitter extends EventEmitter {
  emit(eventName, ...args) {
    log(util.format(
      'emitting event "%s" to %d listeners with args = %s',
      eventName,
      this.listenerCount(eventName),
      util.inspect(args)
    ));

    this.listeners(eventName).forEach(function(handler, index) {
      log(util.format('going to call handler #%j with code:\n%s', index, handler));
    });

    super.emit(eventName, ...args);
  }
}

class InternalService extends PatchedEventEmitter {
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

const intService = new InternalService(10, true);

intService.on('data', () => {
  log('handler1 was called');
});

intService.on('data', () => {
  log('handler2 was called');
});

intService.start();

setTimeout(() => {
  intService.stop();
}, 1000);
