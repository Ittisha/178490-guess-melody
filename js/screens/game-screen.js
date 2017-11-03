import GameModel from '../game/game-model';
import ArtistLevelView from '../views/artist-level-view';
import {initialState} from '../data/initial-data';
import changeView from '../utils/render-screen';
import GenreLevelView from '../views/genre-level-view';
import PlayerAnswer from '../utils/player-answer-class';
import App from '../application';
import Timer from '../utils/timer-class';

/** @constant {number} */
const TIMER_INTERVAL = 1000;
/**
 * Class representing game presenter
 */
class GameScreen {
  /**
   * Create new game presenter
   * @param {Array} data - Contains games data
   */
  constructor(data) {
    this._model = new GameModel(data);
  }

  /**
   * Initiate game screen
   * @param {Object} state
   */
  init(state = initialState) {
    this._model.update(state);
    this._timer = new Timer(this._model.state.timeLeft);

    /**
     * Start game timer
     */
    const startTimer = () => {
      this._gameTimer = setTimeout(() => {
        const newTime = this._timer.tick();
        this._model.updateTime(newTime);

        if (newTime === -1) {
          App.loseGame(this._model.state);
          this._resetTimer();
        }

        this._level.updateTime(newTime);

        startTimer();
      }, TIMER_INTERVAL);
    };

    if (!this._gameTimer) {
      startTimer();
    }

    this._changeLevel();
  }

  /**
   * Change game levels
   */
  _changeLevel() {
    this._model.startTime = this._model.state.timeLeft;

    const levelData = this._model.getQuestion();
    const GameView = levelData.type === `artist` ? ArtistLevelView : GenreLevelView;
    this._level = new GameView(this._model);

    this._level.onMistake = () => {
      this._model.addPlayerAnswer(new PlayerAnswer(false, this._model.startTime - this._model.state.timeLeft));
      this._model.reduceLives();

      if (!this._model.canPlay()) {
        App.loseGame(this._model.state);
        this._resetTimer();
        return;
      }

      if (this._model.state.questionsLeftNumber === 1) {
        App.winScreen(this._model.state);
        this._resetTimer();
        return;
      }

      this._model.defineNextQuestion();
      App.startGame(this._model.state);

    };

    this._level.onSuccess = () => {
      this._model.addPlayerAnswer(new PlayerAnswer(true, this._model.startTime - this._model.state.timeLeft));

      if (this._model.state.questionsLeftNumber === 1) {
        App.winScreen(this._model.state);
        this._resetTimer();
        return;
      }

      this._model.defineNextQuestion();
      App.startGame(this._model.state);

    };

    changeView(this._level);
  }

  _resetTimer() {
    clearTimeout(this._gameTimer);
    this._gameTimer = void (0);
  }

}

export default GameScreen;
