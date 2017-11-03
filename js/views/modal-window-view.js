import AbstractView from './abstract-view';

/**
 * Class representing modal window
 * @extends AbstractView
 */
class ModalWindowView extends AbstractView {
  /**
   * Create modal window view
   * @param {string} message - Message to show
   */
  constructor(message) {
    super();
    this._message = message;
  }

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    return `<div class="modal-window">${this._message}
  <button class="modal-window-close"></button>
</div>`;
  }

  /**
   * Bind callback to modal window close button
   */
  bind() {
    const modal = this.element;
    const modalCloseBtn = modal.querySelector(`.modal-window-close`);

    const modalCloseBtnClick = (evt) => {
      evt.preventDefault();
      document.body.removeChild(modal);
      modalCloseBtn.removeEventListener(`click`, modalCloseBtnClick);
    };

    modalCloseBtn.addEventListener(`click`, modalCloseBtnClick);
  }

  /**
   * Add error class to class list
   */
  addErrorClass() {
    this.element.classList.add(`modal-window--error`);
  }
}

export default ModalWindowView;
