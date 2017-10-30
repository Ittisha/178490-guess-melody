const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

/* const getUrlsArray = (data) => {
  const urls = data.map((question) => {
    if (question.src) {
      return question.src;
    }
    return question.answers.map((it) => it.src);
  });

  return urls.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);
};

const preloadAudio = (urls) => {
  urls = urls.filter((url, index, urls) => {
    return url !== `` && urls.indexOf(url) === index;
  });

  return Promise.all(urls.map((url) => {
    const watchWhatResolved = new Promise((resolve) => {
      const audio = new Audio();
      audio.addEventListener(`canplaythrough`, resolve, false);
      audio.preload = `auto`;
      audio.src = url;
      audio.load();
    });
    setInterval(() => {
      console.log(watchWhatResolved, url);
    }, 1000);
return watchWhatResolved;
  }));
};*/

const preprocessArtistAnswers = (answers) => {
  return answers.map((it) => ({
    artist: it.title,
    image: it.image.url,
    isRightAnswer: it.isCorrect
  }));
};

const preprocessGenreAnswers = (genre, answers) => {
  return answers.map((it) => ({
    src: it.src,
    genre: it.genre,
    isRightAnswer: it.genre === genre
  }));
};

const adaptData = (data) => {
  return data.map((it) => {
    const adaptedLevelData = {};

    switch (it.type) {
      case QuestionType.ARTIST:
        adaptedLevelData.type = it.type;
        adaptedLevelData.taskMessage = it.question;
        adaptedLevelData.src = it.src;
        adaptedLevelData.answers = preprocessArtistAnswers(it.answers);
        break;

      case QuestionType.GENRE:
        adaptedLevelData.type = it.type;
        adaptedLevelData.taskMessage = it.question;
        adaptedLevelData.answers = preprocessGenreAnswers(it.genre, it.answers);
        break;
    }

    return adaptedLevelData;
  });
};

export {adaptData/* , preloadAudio, getUrlsArray*/};
