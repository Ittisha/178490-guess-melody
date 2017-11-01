/**
 * Get html markup from string template
 * @param {string} templateString - Must have one parent element
 * @return {Element}
 */
const getHtmlFromTemplate = (templateString) => {
  const container = document.createElement(`div`);

  container.innerHTML = templateString;

  return container.firstElementChild;
};

export default getHtmlFromTemplate;
