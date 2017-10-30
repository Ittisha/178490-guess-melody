import WelcomeView from '../views/welcome-view';
import {changeView} from '../render-screen';
import App from '../application';

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

    this.view.onStart = () => {
      App.startGame();
    };
  }

/*  letStart() {
    this.view.stopPreloader();
  }*/
}

export default new WelcomeScreen();
