import ModalWindowView from '../views/modal-window-view';

/**
 * Class representing modal window
 */
class ModalWindow {
  /**
   * Create new modal window
   * @param {string} message - Message to be shown
   * @param {boolean} isErrorDisplaying - Is it error window or now
   */
  constructor(message, isErrorDisplaying = true) {
    this.view = new ModalWindowView(message);
    this.isError = isErrorDisplaying;
  }

  /**
   * Initiate modal window
   */
  init() {
    if (this.isError) {
      this.view.addErrorClass();
    }
    document.body.appendChild(this.view.element);
  }
}

export default ModalWindow;
