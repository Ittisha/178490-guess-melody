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
    this._parent = parent;
    this._nodeAfter = nodeAfter;
  }

  /**
   * Initiate preloader
   */
  init() {
    this._view = new PreloaderView();
    this._parent.insertBefore(this._view.element, this._nodeAfter);
  }

  /**
   * Remove preloader
   */
  remove() {
    this._parent.removeChild(this._view.element);
  }
}

export default Preloader;
