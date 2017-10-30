import welcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import {initialState} from './data/initial-data';
import loseGameScreen from './screens/loss-screen';
import winGameScreen from './screens/win-screen';
import Loader from './data/loader';
import {adaptData, preloadAudio, getUrlsArray} from './data/game-adapter';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  LOSE: `lose`,
  RESULT: `result`
};

/**
 * Save encoding state
 * @param {Object} state
 * @return {string}
 */
const saveState = (state) => {
  return window.btoa(encodeURIComponent(JSON.stringify(state)));
};

/**
 * Load decoding state
 * @param {string} dataString
 * @return {Object}
 */
const loadState = (dataString) => {
  try {
    return JSON.parse(decodeURIComponent(window.atob(dataString)));
  } catch (e) {
    return initialState;
  }
};


/**
 * Class representing application
 */
class Application {
  static init(questData) {

    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questData),
      [ControllerId.LOSE]: loseGameScreen,
      [ControllerId.RESULT]: winGameScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      Application.changeHash(hashValue);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();

  }

  static changeHash(id, state) {
    const controller = Application.routes[id];
    if (controller) {
      controller.init(loadState(state));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialState) {
    Application.routes[ControllerId.GAME].init(state);
  }

  static loseGame(state) {
    Application.routes[ControllerId.LOSE].init(state);
  }

  static winScreen(state) {
    location.hash = `${ControllerId.RESULT}?${saveState(state)}`;
  }
}

Loader.loadData().
    then(adaptData).
    then((questData) => {
      Application.init(questData);
      preloadAudio(getUrlsArray(questData)).
          then(() => Application.routes[ControllerId.WELCOME].letStart(),
              () => Application.routes[ControllerId.WELCOME].showWarning()).
          catch(window.console.error);
    }).catch(window.console.error);

export default Application;
