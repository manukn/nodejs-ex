/**
 * Category model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Category = require('./category.model');
var CategoryEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CategoryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Category.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CategoryEvents.emit(event + ':' + doc._id, doc);
    CategoryEvents.emit(event, doc);
  };
}

exports.default = CategoryEvents;
//# sourceMappingURL=category.events.js.map
