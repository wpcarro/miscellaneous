// Lint: no-semis

/**
 * This file is an attempt to define cleaner, more concise
 * forms of Javascript code. It is inspired by this talk:
 * https://www.youtube.com/watch?v=OSGv2VnC0go
 */
 

// Loop through two lists at once.
const names = ['william', 'patrick', 'carroll'];
const colors = ['red', 'green', blue];

zip(names, colors).forEach(
  ([name, color]) => /* ... */
)

// ES6 destructuring syntax is similar to Python's
// tuple destructuring. Tuple / array unpacking


const makeIterator = arr => {
  let step = -1;

  return {
    next: () => !done ? {value: arr[step += 1], done} : {done}
  }
}


// generators
function* izip(r0, r1) {
  let i = 0
  
  while(typeof r0[i] !== 'undefined' && 
  typeof r1[i] !== 'undefined' &&) {
    yield [r0[i], r1[i]]
    i += 1;
  }
}


const tupleGenerator = izip(names, colors);


for (const [name, color] of tupleGenerator) {
  console.log(name, color)
}
