/*
  Encode strings as image files and decode the image files back into strings.
*/

import { remap } from 'ramda-helpers';
import { last } from 'ramda';


const LOWEST_CHAR_CODE = 'A'.charCodeAt();
const HIGHEST_CHAR_CODE = 'z'.charCodeAt();
const LOWEST_RGB_VAL = 0;
const HIGHEST_RGB_VAL = 255;

// charCode --> RGB
const mapCharCode = remap(
  [LOWEST_CHAR_CODE, HIGHEST_CHAR_CODE],
  [LOWEST_RGB_VAL, HIGHEST_RGB_VAL]
);

// RGB --> charCode
const mapRGBVal = remap(
  [LOWEST_RGB_VAL, HIGHEST_RGB_VAL],
  [LOWEST_CHAR_CODE, HIGHEST_CHAR_CODE]
);


// Pixel factory
const Pixel = () => [null, null, null];


const isPixelFull = pixel =>
  pixel.filter(val => val !== null).length === 3;


const createPixels = (result, char) => {
  let currentPixel = last(result);
  
  if (isPixelFull(currentPixel)) {
    result.push(Pixel());
  }
  else {
    let i = currentPixel.indexOf(null);
    currentPixel[i] = mapCharCode(char);
  }
  
  return result;
};


const encode = string =>
  string.split('')
  .map(char => char.charCodeAt())
  .reduce(createPixels, [Pixel()]);
