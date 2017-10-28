import welcomeScreen from './screens/welcome-screen';
import gameScreen from './screens/game-screen';
import {initialState} from './data/initial-data';
import loseGameScreen from './screens/loss-screen';
import winGameScreen from './screens/win-screen';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};
const saveState = (state) => {
  return window.btoa(encodeURIComponent(JSON.stringify(state)));
};

const loadState = (dataString) => {
  try {
    return JSON.parse(decodeURIComponent(window.atob(dataString)));
  } catch (e) {
    return initialState;
  }
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: gameScreen,
  [ControllerId.RESULT]: winGameScreen
};

/**
 * Class representing application
 */
class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, state) {
    const controller = routes[id];
    if (controller) {
      controller.init(loadState(state));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialState) {
    location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static loseGame(state) {
    loseGameScreen.init(state);
  }

  static winScreen(state) {
    location.hash = `${ControllerId.RESULT}?${saveState(state)}`;
  }
}

Application.init();

export default Application;
