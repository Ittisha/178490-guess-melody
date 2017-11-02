import GameModel from '../game/game-model';
import ArtistLevelView from '../views/artist-level-view';
import {initialState} from '../data/initial-data';
import {changeView} from '../utils/render-screen';
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
    this.model = new GameModel(data);
  }

  /**
   * Initiate game screen
   * @param {Object} state
   */
  init(state = initialState) {
    this.model.update(state);
    this.timer = new Timer(this.model.state.timeLeft);

    /**
     * Start game timer
     */
    const startTimer = () => {
      this.gameTimer = setTimeout(() => {
        const newTime = this.timer.tick();
        this.model.updateTime(newTime);

        if (newTime === -1) {
          App.loseGame(this.model.state);
          this._resetTimer();
        }

        this.level.updateTime(newTime);

        startTimer();
      }, TIMER_INTERVAL);
    };

    if (!this.gameTimer) {
      startTimer();
    }

    this._changeLevel();
  }

  /**
   * Change game levels
   */
  _changeLevel() {
    this.model.startTime = this.model.state.timeLeft;

    const levelData = this.model.getQuestion();
    const GameView = levelData.type === `artist` ? ArtistLevelView : GenreLevelView;
    this.level = new GameView(this.model);

    this.level.onMistake = () => {
      this.model.addPlayerAnswer(new PlayerAnswer(false, this.model.startTime - this.model.state.timeLeft));
      this.model.reduceLives();

      if (!this.model.canPlay()) {
        App.loseGame(this.model.state);
        this._resetTimer();
        return;
      }

      if (this.model.state.questionsLeftNumber === 1) {
        App.winScreen(this.model.state);
        this._resetTimer();
        return;
      }

      this.model.defineNextQuestion();
      App.startGame(this.model.state);

    };

    this.level.onSuccess = () => {
      this.model.addPlayerAnswer(new PlayerAnswer(true, this.model.startTime - this.model.state.timeLeft));

      if (this.model.state.questionsLeftNumber === 1) {
        App.winScreen(this.model.state);
        this._resetTimer();
        return;
      }

      this.model.defineNextQuestion();
      App.startGame(this.model.state);

    };

    changeView(this.level);
  }

  _resetTimer() {
    clearTimeout(this.gameTimer);
    this.gameTimer = void (0);
  }

}

export default GameScreen;
