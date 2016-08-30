// simulates http GET requests
const httpGet = (url) =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(url),
      Math.floor(Math.random() * 3000)
    )
  );


const race = (xs, diagnostics = false) => {
  const t0 = performance.now();
  let resolveThyself;
  
  xs.forEach(x =>
      Promise.resolve(x).then(response => resolveThyself(
        diagnostics
          ? {resolveTime: performance.now() - t0, response}
          : response
      ))
  );

  return new Promise(resolve => {
    resolveThyself = (val) => resolve(val);
  });
};


race(
  [
    httpGet('https://google.com'),
    httpGet('https://stackoverflow.com'),
    httpGet('http://ycombinator.com')
  ],
  false
)
.then(
  (response) => console.log(response)
