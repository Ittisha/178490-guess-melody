import {getPlayerResults} from '../game/game-utils';
import {changeView} from '../render-screen';
import WinView from '../views/win-view';
import {getWinMessages} from '../results/get-result-data';
import App from '../application';
import ModalWindow from './modal-window';
import Loader from '../data/loader';
import {preprocessResult} from '../data/game-adapter';

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

    this.result = getWinMessages(stats, getPlayerResults(state));
    this.view = new WinView(this.result);

    this.view.onReplay = (evt) => {
      evt.preventDefault();
      App.startGame();
    };

    changeView(this.view);

    Loader.saveResults(preprocessResult(state)).
        then(() => new ModalWindow(Messages.SUCCESS, false).init(),
            () => new ModalWindow(Messages.ERROR).init());
  }
}

export default new WinScreen();
