import { last, tail } from 'helpers';


/**
 * Parses markdown text into a consumable data structure.
 * @param {string} text Markdown text to be parsed.
 * @return {Object} An object with '#', '##', & '###' as its
 *     shallowest keys. Each shallow key contains a hash of 
 *     section headings mapped to their associated content.
 */
function parse_markdown(text) {

	/**
   * @param {Object} page_structure Data structure to store the
   *    parsed markdown text.
   * @param {string} section Consecutive lines of texts demarcated
   *     by newline characters.
   */
	const reducer = (page_structure, section) => {
    lines = section.split(/\n/g);
    const first_line = lines[0];
    const prefix = last(first_line.match(/(#+)\s/g));
    const heading = last(first_line.match(/^#+\s+(.+)$/));

    if (typeof page_structure[prefix] === 'undefined') {
      page_structure[prefix] = {};
    }
    page_structure[prefix][heading] = tail(lines).join('\n');

    return page_structure;
  };

  return sample_input.split(/\n{2,}/g).reduce(reducer, {});	
}
