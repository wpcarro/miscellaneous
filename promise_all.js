// simulates http GET requests
const httpGet = (url) =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(url),
      Math.floor(Math.random() * 3000)
    )
  );

/**
 * Predicate to test if each element within an array is not
 * undefined or null.
 * @param {Array<*>}
 * @ return {Boolean}
 */
const isFull = xs =>
  xs.filter(
    x => typeof x !== 'undefined' && x !== null
  ).length === xs.length;


/**
 * Waits for all promises to resolve and passes each promise's resolve
 * value into the Promise returned by the initial call to all(..).
 * @param {Array<Promise>} promises
 * @return {Promise} 
 */
const all = (...promises) => {
  let counter = 0;
  const t0 = performance.now();

  const responses = promises.map(() => null);
  let resolveThyself;
  
  promises.forEach((promise, i) => {
    promise.then(response => {
      responses[i] = {
        place: ++counter,
        response,
        resolveTime: performance.now() - t0
      };
      
      if (isFull(responses)) {
        resolveThyself();
      }
    });
  });

  return new Promise(resolve => {
    resolveThyself = () => resolve(responses);
  });
};


// Test functionality
all(
  httpGet('https://google.com'),
  httpGet('https://stackoverflow.com'),
  httpGet('http://ycombinator.com')
)
.then(
  (...responses) => console.log(responses)
);
