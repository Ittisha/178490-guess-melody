const SCREENS_ORDERED_CLASSES = [
  `main--welcome`,
  `main--level-genre`,
  `main--level-artist`,
  `main--result`
];

/**
 * Enum for key codes
 * @readonly
 * @enum {number}
 */
const keyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

const screenTemplates = document.querySelector(`#templates`).content.querySelectorAll(`.main`);
const appScreen = document.querySelector(`.app .main`);

/**
 * Line up screen templates in predetermined order
 * @param {Array} screensClassesArray
 * @return {Array}
 */
const sortScreens = (screensClassesArray) => {
  const screens = [];
  screensClassesArray.forEach((element) => {
    screens.push(...Array.prototype.filter.call(screenTemplates, (it) => {
      return it.classList.contains(element);
    }));
  });
  return screens;
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

let screenIndex = 0;

const renderAppScreen = (screens) => {
  if (screenIndex < 0) {
    screenIndex = screens.length - 1;
  } else if (screenIndex > screens.length - 1) {
    screenIndex = 0;
  }

  appScreen.appendChild(screens[screenIndex]);
};

const sortedScreenTemplates = sortScreens(SCREENS_ORDERED_CLASSES);

/**
 * Change screen on alt and arrow (left or right) press
 * @param {Object} evt
 */
const onScreenAltArrowPress = (evt) => {
  if (evt.altKey && evt.keyCode === keyCode.RIGHT_ARROW) {
    evt.preventDefault();
    screenIndex++;
    clearNode(appScreen);
    renderAppScreen(sortedScreenTemplates, screenIndex);
  }

  if (evt.altKey && evt.keyCode === keyCode.LEFT_ARROW) {
    evt.preventDefault();
    screenIndex--;
    clearNode(appScreen);
    renderAppScreen(sortedScreenTemplates, screenIndex);
  }
};

renderAppScreen(sortedScreenTemplates, screenIndex);

document.addEventListener(`keydown`, onScreenAltArrowPress);

