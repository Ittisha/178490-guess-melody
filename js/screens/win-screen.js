import {getPlayerResult} from '../game/game-utils';
import {changeView} from '../render-screen';
import statistics from '../data/statistics';
import WinView from '../views/win-view';
import {getWinMessages} from '../results/get-result-data';
import App from '../application';

/**
 * Class representing win screen
 */
class WinScreen {
  /**
   * Initiate win screen
   * @param {Object} state
   */
  init(state) {
    this.result = getWinMessages(statistics, getPlayerResult(state));
    this.view = new WinView(this.result);

    this.view.onReplay = (evt) => {
      evt.preventDefault();
      App.startGame();
    };

    changeView(this.view);
  }
}

export default new WinScreen();
