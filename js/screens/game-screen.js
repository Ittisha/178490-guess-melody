import Game from '../game/game-class';
import ArtistLevelView from '../views/artist-level-view';
import {games, initialState} from "../data/initial-data";
import {changeView} from "../render-screen";
import GenreLevelView from "../views/genre-level-view";
import PlayerAnswer from "../classes/player-answer-class";
import App from '../application';
import Timer from "../classes/timer-class";

class GameScreen {
  constructor(data = games) {
    this.model = new Game(data);
  }
  init(state = initialState) {
    this.model.update(state);
    this.timer = new Timer(this.model.state.timeLeft);
    const startTimer = () => {
      this.gameTimer = setTimeout(() => {
        const newTime = this.timer.tick();
        this.model.updateTime(newTime);
        if (newTime === -1) {
          App.loseGame(this.model.state);
          clearTimeout(this.gameTimer);
        }
        this.level.updateTime(newTime);

        startTimer();
      }, 1000);
    };

    startTimer();
    this.changeLevel();
  }

  changeLevel() {
    this.model.startTime = this.model.state.timeLeft;

    const levelData = this.model.getQuestion(games);
    const GameView = levelData.type === `artist` ? ArtistLevelView : GenreLevelView;
    this.level = new GameView(this.model);

    this.level.onMistake = () => {
      this.model.addPlayerAnswer(new PlayerAnswer(false, this.model.startTime - this.model.state.timeLeft));
      this.model.reduceLives();

      if (!this.model.canPlay()) {
        App.loseGame(this.model.state);
        clearTimeout(this.gameTimer);
      } else if (this.model.state.questionsLeftNumber === 1) {
        App.winScreen(this.model.state);
        clearTimeout(this.gameTimer);
      } else {
        this.model.determineNextQuestion();
        this.changeLevel();
      }
    };

    this.level.onSuccess = () => {
      this.model.addPlayerAnswer(new PlayerAnswer(true, this.model.startTime - this.model.state.timeLeft));

      if (this.model.state.questionsLeftNumber === 1) {
        App.winScreen(this.model.state);
        clearTimeout(this.gameTimer);
      } else {

        this.model.determineNextQuestion();
        this.changeLevel();
      }
    };

    changeView(this.level);
  }

}

export default new GameScreen();
