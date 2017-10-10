/**
 * Detect if player wins or loses
 * @param {number} playerScore - Current player score number
 * @return {boolean} If  player wins - true, if loses - false
 */
const isWin = (playerScore) => {
  return playerScore !== -1;
};

/**
 * Get amount of players with smaller score than current player
 * @param {Array} othersScores - Array of other players scores
 * @param {number} thisPlayerScore - Current player score number
 * @return {number} Number of players with smaller score than current player
 */
const getNumberOfSmallerScores = (othersScores, thisPlayerScore) => {
  othersScores.push(thisPlayerScore);

  return othersScores.filter((elem) => elem < thisPlayerScore).length;
};

/**
 * Get player place (if someone has the same score current player gets higher place)
 * @param {Array} othersScores - Array of other players scores
 * @param {number} thisPlayerScore - Current player score number
 * @return {number} Current player place
 */
const getPlayerPlace = (othersScores, thisPlayerScore) => {
  othersScores.push(thisPlayerScore);

  return othersScores.filter((currentScore) => currentScore > thisPlayerScore).length + 1;
};

/**
 * Return the result message for current player
 * @param {Array} otherPlayersScores - Array of other players scores
 * @param {Object} thisPlayerStats - Current player statistics
 * @return {string} - Result message
 */
const outputResultMessage = (otherPlayersScores, thisPlayerStats) => {
  if (isWin(thisPlayerStats.score)) {
    const playersNumber = otherPlayersScores.length + 1;

    const numberOfSmallerScores = getNumberOfSmallerScores(otherPlayersScores,
        thisPlayerStats.score);

    const successPercentage = numberOfSmallerScores / playersNumber * 100;

    const playerPlace = getPlayerPlace(otherPlayersScores, thisPlayerStats.score);

    return `Вы заняли ${playerPlace}-е место из ${playersNumber} игроков. Это лучше чем у ${successPercentage}% игроков`;
  }

  if (thisPlayerStats.remainingTime === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
};

export default outputResultMessage;
