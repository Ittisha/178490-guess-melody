import AbstractView from './abstract-view';

class ModalWindowView extends AbstractView {
  constructor(message) {
    super();
    this.message = message;
  }

  get template() {
    return `<div class="modal-window">${this.message}
  <button class="modal-window-close"></button>
</div>`;
  }

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

  addErrorClass() {
    this.element.classList.add(`modal-window--error`);
  }
}

export default ModalWindowView;
