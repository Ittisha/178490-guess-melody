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
    this._view = new ModalWindowView(message);
    this._isError = isErrorDisplaying;
  }

  /**
   * Initiate modal window
   */
  init() {
    if (this._isError) {
      this._view.addErrorClass();
    }
    document.body.appendChild(this._view.element);
  }
}

export default ModalWindow;
