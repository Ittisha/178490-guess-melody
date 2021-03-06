import LossView from '../views/loss-screen-view';
import changeView from '../utils/render-screen';
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
    this._result = getLossMessages(getPlayerResults(state));
    this._view = new LossView(this._result);

    this._view.onReplay = () => {
      App.startGame();
    };

    changeView(this._view);
  }
}

export default new LossScreen();

