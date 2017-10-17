import getHtmlFromTemplate from '../get-html-from-template';

class AbstractView {

  get template() {
    throw new Error(`Method should be defined in subclasses`);
  }

  render() {
    return getHtmlFromTemplate(this.template);
  }

  bind() {}

  get element() {
    if (!this._element) {
      this.getMarkup();
    }
    return this._element;

  }

  getMarkup() {
    this._element = this.render();
    this.bind();
  }
}

export default AbstractView;

