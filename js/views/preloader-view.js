import AbstractView from './abstract-view';

/**
 * Class representing preloader
 * @extends AbstractView
 */
class PreloaderView extends AbstractView {
  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    return `<div class="main-preloader"></div>`;
  }
}

export default PreloaderView;
