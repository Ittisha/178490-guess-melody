/**
 * Delete node inner content
 * @param {Node} node
 */
const clearNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

/**
 * Returns index of correct noun form for the array [one, few, many] (e.g. [`день`, `дня`, `дней`])
 * @param {number} number - Integer
 * @return {number} Index of correct word form (0 - one, 1 - few, 2- many)
 */
const getNounFormIndex = (number) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return 0;
  }
  if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14)) {
    return 1;
  }
  return 2;
};

/**
 * Return correct noun plural form for the array [one, few, many] (e.g. [`день`, `дня`, `дней`])
 * @param {number} number - Integer
 * @param {Array} nounForms - Array of strings with length = 3 in specified order [one, few, many] (e.g. [`день`, `дня`, `дней`])
 * @return {string} Correct noun form
 */
const getNounPluralForm = (number, nounForms) => {
  return nounForms[getNounFormIndex(number)];
};

/**
 * Returns random integer between min and max inclusive
 * @param {number} min
 * @param{number} max
 * @return {number}
 */
const getRandomInteger = (min, max) => Math.floor(Math.random() *
  (max + 1 - min) + min);

/**
 * Returns unique random array item
 * @param {Array} array
 * @return {*}
 */
const getUniqueArrayItem = (array) => array.splice(getRandomInteger(0, array.length - 1), 1)[0];

/**
 * Returns random array item
 * @param {Array} array
 * @return {*}
 */
const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

/**
 * Make copy of an object
 * @param {Object} object to copy
 * @return {Object}
 */
const copyObject = (object) => Object.assign({}, object);

export {
  clearNode,
  getNounPluralForm,
  getUniqueArrayItem,
  getRandomArrayItem,
  getRandomInteger,
  copyObject
};
