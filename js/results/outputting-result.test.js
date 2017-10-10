import assert from 'assert';
import outputResultMessage from './outputting-result';

suite(`Output current player result`, () => {
  test(`Time is over`, () => {
    const othersPlayersScores = [8, 6, 12];

    const currentPlayerStats = {
      score: -1,
      remainingNotes: 3,
      remainingTime: 0
    };

    const expectedOutput = `Время вышло! Вы не успели отгадать все мелодии`;

    assert.strictEqual(outputResultMessage(othersPlayersScores, currentPlayerStats),
        expectedOutput);
  });

  test(`Attempts are over`, () => {
    const othersPlayersScores = [7, 1, 10];

    const currentPlayerStats = {
      score: -1,
      remainingNotes: 0,
      remainingTime: 50000
    };

    const expectedOutput = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

    assert.strictEqual(outputResultMessage(othersPlayersScores, currentPlayerStats),
        expectedOutput);
  });

  test(`Player win`, () => {
    const othersPlayersScores = [12, 20, 10];

    const currentPlayerStats = {
      score: 7,
      remainingNotes: 2,
      remainingTime: 0
    };

    const expectedOutput = `Вы заняли 4-е место из 4 игроков. Это лучше чем у 0% игроков`;

    assert.strictEqual(outputResultMessage(othersPlayersScores, currentPlayerStats),
        expectedOutput);
  });

  test(`Player win, success percentage should  be integer`, () => {
    const othersPlayersScores = [12, 14];

    const currentPlayerStats = {
      score: 20,
      remainingNotes: 3,
      remainingTime: 50000
    };

    const expectedOutput = `Вы заняли 1-е место из 3 игроков. Это лучше чем у 67% игроков`;

    assert.strictEqual(outputResultMessage(othersPlayersScores, currentPlayerStats),
        expectedOutput);
  });

  test(`Player win, someone has the same score, current player place should be higher`, () => {
    const othersPlayersScores = [1, 10, 12, 4, 5];

    const currentPlayerStats = {
      score: 10,
      remainingNotes: 3,
      remainingTime: 0
    };

    const expectedOutput = `Вы заняли 2-е место из 6 игроков. Это лучше чем у 50% игроков`;

    assert.strictEqual(outputResultMessage(othersPlayersScores, currentPlayerStats),
        expectedOutput);
  });

  test(`Should give the first place to current player  if he wins and array of other players is empty`, () => {
    const othersPlayersScores = [];

    const currentPlayerStats = {
      score: 10,
      remainingNotes: 3,
      remainingTime: 0
    };

    const expectedOutput = `Вы заняли 1-е место из 1 игроков. Это лучше чем у 0% игроков`;

    assert.strictEqual(outputResultMessage(othersPlayersScores, currentPlayerStats),
        expectedOutput);
  });
});
