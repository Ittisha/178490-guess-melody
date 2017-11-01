import AbstractView from './abstract-view';

class PreloaderView extends AbstractView {
  get template() {
    return `<div class="main-preloader"></div>`;
  }
}

export default PreloaderView;
