import ModalWindowView from '../views/modal-window-view';

class ModalWindow {
  constructor(message, boolean = true) {
    this.view = new ModalWindowView(message);
    this.isError = boolean;
  }

  init() {
    if (this.isError) {
      this.view.addErrorClass();
    }
    document.body.appendChild(this.view.element);
  }
}

export default ModalWindow;
