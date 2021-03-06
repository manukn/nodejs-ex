/**
 * Broadcast updates to client when the model changes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
var CustomerEvents = require('./customer.events');

// Model events to emit
var events = ['save', 'remove'];

function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('customer:' + event, socket);

    CustomerEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

function createListener(event, socket) {
  return function (doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    CustomerEvents.removeListener(event, listener);
  };
}
//# sourceMappingURL=customer.socket.js.map
