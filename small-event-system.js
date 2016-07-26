// A small, simple implementation of an pub-sub event system
// This example embraces the mix-in design pattern.

/**
 * @param {Object} obj The object being extended with the
 *     mixins defined within the function body.
 * @return {Object} The same reference to the object that
 *     was initially passed in with two additional
 *     methods: trigger and on.
 */
var mixEvents = obj => {
  /** @private {Object} */
  var events = {};
  
  /**
   * @param {string} event Name of the event to trigger.
   * @return {(Array<*>|false)} Returns an array of the
   *     values returned from each cb stored on the events
   *     hash. If there is no event registered, then this
   *     function returns false.
   */
  const trigger = event => 
    !events[event]
      ? false
      : events[event].map(cb => cb());
  
  /**
   * @param {string} event Name of the event being registered.
   * @param {function} cb The callback function to fire when
   *     the event is triggered.
   */
  const on = (event, cb) => 
    !events[event]
      ? events[event] = [cb]
      : events[event].push(cb);
  

  return Object.assign(obj, {
    trigger,
    on
  });
};
