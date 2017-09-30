const getHtmlFromTemplate = (templateString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(templateString, `text/html`);
  return doc.body.firstElementChild;
};

export default getHtmlFromTemplate;
