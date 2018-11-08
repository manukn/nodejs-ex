/**
 * Task model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Task = require('./task.model');
var TaskEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
TaskEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Task.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    TaskEvents.emit(event + ':' + doc._id, doc);
    TaskEvents.emit(event, doc);
  };
}

exports.default = TaskEvents;
//# sourceMappingURL=task.events.js.map
