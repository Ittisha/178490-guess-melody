import welcomeScreen from './screens/welcome-screen';
import gameScreen from './screens/game-screen';
import {initialState} from "./data/initial-data";
import loseGameScreen from './screens/loss-screen';
import winGameScreen from './screens/win-screen';

class Application {
  static showWelcome() {
    welcomeScreen.init();
  }

  static startGame(state = initialState) {
    gameScreen.init(state);
  }

  static loseGame(state) {
    loseGameScreen.init(state);
  }

  static winScreen(state) {
    winGameScreen.init(state);
  }
}

export default Application;
