import WelcomeView from '../views/welcome-view';
import {changeView} from '../render-screen';
import App from '../application';
import ModalWindow from "./modal-window";
import Preloader from "./preloader";

/**
 * Class representing welcome screen
 */
class WelcomeScreen {
  /**
   * Create new welcome screen
   */
  constructor() {
    this.view = new WelcomeView();
  }

  /**
   * Initiate welcome screen
   */
  init() {
    changeView(this.view);
    this.preloader = new Preloader(this.view.element, this.view.playButton);
    this.preloader.init();

    this.view.onStart = () => {
      App.startGame();
    };
  }

  letStart() {
    this.preloader.remove();
    this.view.showButton();
  }

  showWarning() {
    const message = `Сожалеем, у нас не получилось заранее
    загрузить все необходимые данные. Но вы можете начать игру на
    свой страх и риск.`;

    const preloaderResultModal = new ModalWindow(message);

    preloaderResultModal.init();
    this.letStart();
  }
}

export default new WelcomeScreen();
