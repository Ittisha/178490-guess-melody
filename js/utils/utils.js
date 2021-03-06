/**
 * Enum time converting
 * @readonly
 * @enum {number}
 */
const TimeConverting = {
  SECONDS_IN_ONE_MINUTE: 60,
  MILLISECONDS_IN_ONE_SECOND: 1000,
  MILLISECONDS_IN_ONE_MINUTE: 60000
};

/**
 * Enum for russian words plural forms rule
 * @readonly
 * @enum {Object}
 */
const RussianPluralsRule = {
  ONE: {
    '%10 =': 1,
    '%100 !=': 11,
    'arrayIndex': 0
  },
  FEW: {
    '%10 >=': 2,
    '%10 <=': 4,
    '%100 >': 14,
    '%100 <': 12,
    'arrayIndex': 1
  },
  MANY: {
    'arrayIndex': 2
  }
};
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
  const remainderTen = number % 10;
  const remainderHundred = number % 100;

  if (remainderTen === RussianPluralsRule.ONE[`%10 =`] &&
    remainderHundred !== RussianPluralsRule.ONE[`%100 !=`]) {
    return RussianPluralsRule.ONE[`arrayIndex`];
  }
  if (remainderTen >= RussianPluralsRule.FEW[`%10 >=`] && remainderTen <= RussianPluralsRule.FEW[`%10 <=`] &&
    (remainderHundred < RussianPluralsRule.FEW[`%100 <`] || remainderHundred > RussianPluralsRule.FEW[`%100 >`])) {
    return RussianPluralsRule.FEW[`arrayIndex`];
  }
  return RussianPluralsRule.MANY[`arrayIndex`];
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
 * Check if all right answers are chosen
 * @param {Array} inputsChecked
 * @return {boolean}
 */
const isRightGenreChecked = (inputsChecked) => {
  return inputsChecked.every((input) => input.hasAttribute(`data-isrightanswer`));
};

/**
 * Find the right song
 * @param {Array} songs
 * @return {Object}
 */
const findRightSong = (songs) => {
  return songs.find((it) => it.isRightAnswer === true);
};

/**
 * Format time representation
 * @param {number} milliseconds
 * @return {Object} Time object with minutes and seconds
 */
const formatTime = (milliseconds) => ({
  minutes: Math.floor(milliseconds / TimeConverting.MILLISECONDS_IN_ONE_MINUTE),
  seconds: milliseconds % TimeConverting.MILLISECONDS_IN_ONE_MINUTE / TimeConverting.MILLISECONDS_IN_ONE_SECOND
});

/**
 * Add leading zero
 * @param {number} value
 * @return {string}
 */
const addZeroInFront = (value) => value < 10 ? `0${value}` : `${value}`;

/**
 * Pause playing audio if control isn't target button
 * @param {Array} buttons - Controls of all audio tags
 * @param {Element} targetButton - Clicked audio control
 */
const pauseAudio = (buttons, targetButton) => {
  const playButton = buttons.find((it) => it.classList.contains(`player-control--pause`)
  && it !== targetButton);
  if (playButton) {
    playButton.parentNode.querySelector(`audio`).pause();
    playButton.classList.toggle(`player-control--pause`);
    playButton.classList.toggle(`player-control--play`);
  }
};

/**
 * Switch play and pause
 * @param {Element} player - Tag audio
 */
const switchPlayPause = (player) => {
  if (player.paused) {
    player.play();
    return;
  }
  player.pause();
};

export {
  clearNode,
  getNounPluralForm,
  findRightSong,
  isRightGenreChecked,
  addZeroInFront,
  formatTime,
  pauseAudio,
  switchPlayPause
};
