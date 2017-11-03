import {getPlayerResults} from '../game/game-utils';
import changeView from '../utils/render-screen';
import WinView from '../views/win-view';
import {getWinMessages} from '../results/get-result-data';
import App from '../application';
import ModalWindow from './modal-window';
import Loader from '../data/loader';
import {preprocessResult} from '../data/data-adapter';

/**
 * Enum for saving stats results
 * @readonly
 * @enum {string}
 */
const Messages = {
  SUCCESS: `Ваши результаты успешно отправлены на сервер`,
  ERROR: `Сожалеем, но ваш результат сохранить не удалось`
};

/**
 * Class representing win screen
 */
class WinScreen {
  /**
   * Initiate win screen
   * @param {Array} statistics
   * @param {Object} state
   *
   */
  init(statistics, state) {
    const stats = statistics.map((it) => it.score);

    this._result = getWinMessages(stats, getPlayerResults(state));
    this._view = new WinView(this._result);

    this._view.onReplay = () => {
      App.startGame();
    };

    changeView(this._view);

    Loader.saveResults(preprocessResult(state)).
        then(() => new ModalWindow(Messages.SUCCESS, false).init(),
            () => new ModalWindow(Messages.ERROR).init());
  }
}

export default new WinScreen();
