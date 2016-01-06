// Function that takes as its input a string and returns an array of 
// arrays as shown below sorted in descending order by frequency and 
// then by ascending order by character.

// This solution illustrates a solution using Array built-ins
// that are often used in functional programming environments

function characterFrequency (string) {
  var result = string
    .split('')
    .reduce(function(acc, next) {
      if(acc.hasOwnProperty(next)) {
        acc[next]++;
      } else {
        acc[next] = 1;
      }
      return acc;
    }, {});
  
  var toArr = [];
  var tuple;
  for (var key in result) {
    tuple = [];
    tuple.push(key);
    tuple.push(result[key]);
    toArr.push(tuple);
  }
  return toArr
    .map(function(tuple) {
      return tuple.concat(tuple[1] *  127 - tuple[0].charCodeAt());
    })
    .sort(function(a, b) {
      return b[2] - a[2];
    })
    .map(function(tuple) {
      return tuple.slice(0, 2);
    });
}
