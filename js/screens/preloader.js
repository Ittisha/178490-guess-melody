import PreloaderView from '../views/preloader-view';

class Preloader {
  constructor(parent, nodeAfter) {
    this.parent = parent;
    this.nodeAfter = nodeAfter;
  }

  init() {
    this.view = new PreloaderView();
    this.parent.insertBefore(this.view.element, this.nodeAfter);
  }

  remove() {
    this.parent.removeChild(this.view.element);
  }
}

export default Preloader;
