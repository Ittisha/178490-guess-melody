import PreloaderView from '../views/preloader-view';

/**
 * Class representing preloader
 */
class Preloader {
  /**
   * Create new preloader
   * @param {Element} parent
   * @param {Element} nodeAfter
   */
  constructor(parent, nodeAfter) {
    this.parent = parent;
    this.nodeAfter = nodeAfter;
  }

  /**
   * Initiate preloader
   */
  init() {
    this.view = new PreloaderView();
    this.parent.insertBefore(this.view.element, this.nodeAfter);
  }

  /**
   * Remove preloader
   */
  remove() {
    this.parent.removeChild(this.view.element);
  }
}

export default Preloader;
