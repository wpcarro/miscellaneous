/**
 * This file hosts functions intended to stress-test my understanding of ES6
 * generator functions. The goal is to discover an expressive coding style
 * for asynchronous behavior.
 */

function run() {

  function httpGet(g) {
    fetch('https://api.icndb.com/jokes/random')
      .then(res => res.json())
      .then(json => g.next(json));
  }
  
  function* logApiCall() {
    var json = yield httpGet(generator);
    console.log(JSON.stringify(json, null, 2));
  }

  const generator = logApiCall();
  generator.next();
}
