import {clearNode} from './utils';

const appScreen = document.querySelector(`.app .main`);

/**
 * Change view
 * @param {Object} view
 * @param {Node} parentNode
 */
const changeView = (view, parentNode = appScreen) => {
  clearNode(parentNode);
  parentNode.appendChild(view.element);
};
export {changeView};
