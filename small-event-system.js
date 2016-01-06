// A small, simple implementation of an event-system
var mixEvents = function(obj) {
  var events = {};

  // trigger event-handlers
  obj.trigger = function (event) {
    var args = [].slice.call(arguments, 1)
    if (!events[event]) {
      return;
    }
    events[event].forEach(function(cb) {
      cb.apply(this, args);
    });
  };

  // register events
  obj.on = function (event, callback) {
    if (!events[event]) {
      events[event] = [callback];
      return obj;
    }
    events[event].push(callback);
    return obj;
  };
  
  return obj;
};