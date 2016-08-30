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
 * @param {Array<*>} xs
 * @ return {Boolean}
 */
const isFull = xs =>
  xs.filter(
    x => typeof x !== 'undefined' && x !== null
  ).length === xs.length;


/**
 * Returns a promise that resolves when all of the promises passed
 * to all(..) have been resolved.
 * @param {Array<*>} xs
 * @param {Boolean} diagnostics
 * @return {Promise} 
 */
const all = (xs, diagnostics = false) => {
  let counter = 0;
  const t0 = performance.now();

  const responses = xs.map(() => null);
  let resolveThyself;
  
  xs.forEach((x, i) => {
    Promise.resolve(x).then(response => {
      responses[i] = diagnostics ?
        {
          place: ++counter,
          response,
          resolveTime: performance.now() - t0
        } : response;
      
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

/**
 * 1.
 * All arguments are Promises
 */
all(
  [
    httpGet('https://google.com'),
    httpGet('https://stackoverflow.com'),
    httpGet('http://ycombinator.com')
  ],
  true
)
.then(
  (...responses) => console.log(responses)
);

/**
 * 2.
 * Arguments are a mixture of pending Promises,
 * resolved Promises, and raw values.
 */
all(
  [
    httpGet('https://google.com'),
    Promise.resolve('https://stackoverflow.com'),
    'http://ycombinator.com'
  ],
  true
)
.then(
  (...responses) => console.log(responses)
);
