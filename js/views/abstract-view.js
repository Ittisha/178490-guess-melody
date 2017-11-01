import getHtmlFromTemplate from '../utils/get-html-from-template';

/** Class representing welcome view*/
class AbstractView {

  get template() {
    throw new Error(`Method should be defined in subclasses`);
  }

  /**
   * Creates DOM-element from template
   * @return {Element}
   */
  render() {
    return getHtmlFromTemplate(this.template);
  }

  bind() {}

  /**
   * Get DOM-element (external API)
   * @return {Element}
   */
  get element() {
    if (!this._element) {
      this.getMarkup();
    }
    return this._element;

  }

  /**
   * Method for getting node and binding listeners
   */
  getMarkup() {
    this._element = this.render();
    this.bind();
  }
}

export default AbstractView;

