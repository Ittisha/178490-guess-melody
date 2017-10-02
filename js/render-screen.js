const appScreen = document.querySelector(`.app .main`);

/**
 * Delete node inner content
 * @param {Node} node
 */
const clearNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const renderScreen = (screen, parentNode = appScreen) => {
  clearNode(parentNode);
  parentNode.appendChild(screen);
};

export default renderScreen;
