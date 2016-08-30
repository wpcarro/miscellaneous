// simulates http GET requests
const httpGet = (url) =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(url),
      Math.floor(Math.random() * 3000)
    )
  );


const isFull = array =>
  array.filter(Boolean).length === array.length;


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


all(
  httpGet('https://google.com'),
  httpGet('https://stackoverflow.com'),
  httpGet('http://ycombinator.com')
)
.then(
  (...responses) => console.log(responses)
);
