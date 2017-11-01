import statistics from '../data/statistics';
import LossView from '../views/loss-screen-view';
import {changeView} from '../render-screen';
import {getLossMessages} from '../results/get-result-data';
import {getPlayerResults} from '../game/game-utils';
import App from '../application';

/**
 * Class representing loss screen
 */
class LossScreen {

  /**
   * Initiate loss screen
   * @param {Object} state
   */
  init(state) {
    this.result = getLossMessages(statistics, getPlayerResults(state));
    this.view = new LossView(this.result);

    this.view.onReplay = () => {
      App.startGame();
    };

    changeView(this.view);
  }
}

export default new LossScreen();

