/**
 * Function that takes as its input a string and returns an array of 
 * arrays sorted first in descending order by frequency and 
 * secondly in ascending order by character.
 */

function setValue(obj, prop, value) {
  const clone = Object.assign({}, obj);
  clone[prop] = value;
  return clone;
}

function characterFrequency (string) {
  const freqTable = string.split('')
    .reduce((freqTable, char) => 
      setValue(freqTable, char, (freqTable[char] || 0) + 1), {});
  
  const toArr = [];
  let tuple;
  for (let char in freqTable) {
    tuple = [char, freqTable[char]];
    toArr.push(tuple);
  }
  return toArr
    .map(tuple =>
      tuple.concat(tuple[1] *  127 - tuple[0].charCodeAt()))
    .sort((a, b) => b[2] - a[2])
    .map(tuple => tuple.slice(0, 2));
}
