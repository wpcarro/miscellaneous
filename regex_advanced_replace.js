import { pipe } from 'helpers';


/**
 * Maps over a provided string, char-by-char.
 * @param {function} iterator The canonical iterator function.
 * @param {string} string The string being mapped.
 * @return {string} A new string with each character passing through
 *     the iterator function.
 */
const stringMap = iterator => string =>
  string.split('').map(iterator).join('');


'112388989743666266448885959959993332222'.replace(/(\d)\1/g, pipe(
  stringMap(char => '_')
));
// => "__23__989743__62______8595__5__9__3____"
