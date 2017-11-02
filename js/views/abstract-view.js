import getHtmlFromTemplate from '../utils/get-html-from-template';

/** Class representing welcome view*/
class AbstractView {

  /**
   * Method for getting string template
   */
  get template() {
    throw new Error(`Method should be defined in subclasses`);
  }

  /**
   * Creates DOM-element from template
   * @return {Element}
   */
  _render() {
    return getHtmlFromTemplate(this.template);
  }

  /**
   * Bind callback
   */
  bind() {}

  /**
   * Get DOM-element (external API)
   * @return {Element}
   */
  get element() {
    if (!this._element) {
      this._getMarkup();
    }
    return this._element;

  }

  /**
   * Method for getting node and binding listeners
   */
  _getMarkup() {
    this._element = this._render();
    this.bind();
  }
}

export default AbstractView;

