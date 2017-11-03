import WelcomeView from '../views/welcome-view';
import changeView from '../utils/render-screen';
import App from '../application';
import ModalWindow from "./modal-window";
import Preloader from "./preloader";

/** @constant {string} */
const MESSAGE = `Сожалеем, у нас не получилось заранее
    загрузить все необходимые данные. Но вы можете начать игру на
    свой страх и риск.`;

/**
 * Class representing welcome screen
 */
class WelcomeScreen {
  /**
   * Create new welcome screen
   */
  constructor() {
    this._view = new WelcomeView();
  }

  /**
   * Initiate welcome screen
   */
  init() {
    changeView(this._view);
    this._preloader = new Preloader(this._view.element, this._view.playButton);
    this._preloader.init();

    this._view.onStart = () => {
      App.startGame();
    };
  }

  /**
   * Remove preloader activate start button
   */
  letStart() {
    this._preloader.remove();
    this._view.showButton();
  }

  /**
   * Show warning message
   */
  showWarning() {
    const preloaderResultModal = new ModalWindow(MESSAGE);

    preloaderResultModal.init();
    this.letStart();
  }
}

export default new WelcomeScreen();
