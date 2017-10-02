/**
 * Get html markup from string template
 * @param {string} templateString
 * @return {Element}
 */
const getHtmlFromTemplate = (templateString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(templateString, `text/html`);
  return doc.body.firstElementChild;
};

export default getHtmlFromTemplate;
