/**
 * Delete node inner content
 * @param {Node} node
 */
const clearNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export {clearNode};
