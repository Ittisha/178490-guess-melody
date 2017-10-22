import {getRandomInteger} from "../utils";
import {ArtistLevel} from "../classes/artist-level-class";
import {GenreLevel} from "../classes/genre-level-class";

const MIN_ONE_TYPE_LEVEL_NUMBER = 1;

const createGameTasks = (audioData, levelsNumber) => {
  const artistLevelNumber = getRandomInteger(MIN_ONE_TYPE_LEVEL_NUMBER, levelsNumber - MIN_ONE_TYPE_LEVEL_NUMBER);

  const games = Array.from({length: artistLevelNumber}, () => {
    const artistLevel = new ArtistLevel();
    artistLevel.addAnswers(audioData);
    return artistLevel;
  });

  while (games.length < levelsNumber) {
    const genreLevel = new GenreLevel();
    genreLevel.addAnswers(audioData);
    games.push(genreLevel);
  }

  return games;
};

export {createGameTasks};


