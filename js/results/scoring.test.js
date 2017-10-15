import assert from 'assert';
import {countUpScores, getQuickAnswersScore} from './scoring';

suite(`Scoring`, () => {
  test(`Should return -1 if answers number is less than 10`, () => {
    const answers = [
      {isRightAnswer: true, time: 20000},
      {isRightAnswer: true, time: 10000},
      {isRightAnswer: true, time: 5000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 40000},
      {isRightAnswer: true, time: 50000},
      {isRightAnswer: true, time: 80000}
    ];

    assert.strictEqual(countUpScores(answers, 3), -1);
  });

  test(`Should return -1 if remaining notes are less than 0`, () => {
    const answers = [
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: false, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: false, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: false, time: 30000},
      {isRightAnswer: false, time: 30000}
    ];

    assert.strictEqual(countUpScores(answers, -1), -1);
  });

  test(`Answers are right and slow`, () => {
    const answers = [
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000}
    ];

    assert.strictEqual(countUpScores(answers, 3), 10);
  });

  test(`Answers are right and fast`, () => {
    const answers = [
      {isRightAnswer: true, time: 25000},
      {isRightAnswer: true, time: 10000},
      {isRightAnswer: true, time: 5000},
      {isRightAnswer: true, time: 28000},
      {isRightAnswer: true, time: 29000},
      {isRightAnswer: true, time: 29999},
      {isRightAnswer: true, time: 500},
      {isRightAnswer: true, time: 1000},
      {isRightAnswer: true, time: 3000},
      {isRightAnswer: true, time: 15000}
    ];

    assert.strictEqual(countUpScores(answers, 3), 20);
  });

  test(`No notes are left, slow answers`, () => {
    const answers = [
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: false, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: false, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: false, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 30000}
    ];

    assert.strictEqual(countUpScores(answers, 0), 1);
  });

  test(`No notes are left, fast answers`, () => {
    const answers = [
      {isRightAnswer: true, time: 29000},
      {isRightAnswer: false, time: 10000},
      {isRightAnswer: true, time: 4000},
      {isRightAnswer: true, time: 28000},
      {isRightAnswer: true, time: 23000},
      {isRightAnswer: true, time: 25000},
      {isRightAnswer: true, time: 15000},
      {isRightAnswer: true, time: 10000},
      {isRightAnswer: false, time: 20000},
      {isRightAnswer: false, time: 8000}
    ];

    assert.strictEqual(countUpScores(answers, 0), 8);
  });

  test(`2 notes are left, fast and slow answers`, () => {
    const answers = [
      {isRightAnswer: true, time: 29000},
      {isRightAnswer: true, time: 35000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 27000},
      {isRightAnswer: true, time: 23000},
      {isRightAnswer: true, time: 25000},
      {isRightAnswer: true, time: 36000},
      {isRightAnswer: true, time: 19000},
      {isRightAnswer: true, time: 38000},
      {isRightAnswer: false, time: 19000}
    ];

    assert.strictEqual(countUpScores(answers, 2), 12);
  });
});

suite(`Test getQuickAnswersScore`, () => {
  test(`Should return 0 if there are no quick answers`, () => {
    const answers = [
      {isRightAnswer: true, time: 36000},
      {isRightAnswer: true, time: 40000},
      {isRightAnswer: true, time: 50000},
      {isRightAnswer: true, time: 37000},
      {isRightAnswer: true, time: 40000},
      {isRightAnswer: true, time: 50000},
      {isRightAnswer: true, time: 80000}
    ];

    assert.strictEqual(getQuickAnswersScore(answers), 0);
  });

  test(`Should return 20 if all anwers are quick`, () => {
    const answers = [
      {isRightAnswer: true, time: 25000},
      {isRightAnswer: true, time: 10000},
      {isRightAnswer: true, time: 5000},
      {isRightAnswer: true, time: 28000},
      {isRightAnswer: true, time: 29000},
      {isRightAnswer: true, time: 29999},
      {isRightAnswer: true, time: 500},
      {isRightAnswer: true, time: 1000},
      {isRightAnswer: true, time: 3000},
      {isRightAnswer: true, time: 15000}
    ];

    assert.strictEqual(getQuickAnswersScore(answers), 20);
  });

  test(`fast and slow answers (one fast answer is slow)`, () => {
    const answers = [
      {isRightAnswer: true, time: 29000},
      {isRightAnswer: true, time: 35000},
      {isRightAnswer: true, time: 30000},
      {isRightAnswer: true, time: 27000},
      {isRightAnswer: true, time: 23000},
      {isRightAnswer: true, time: 25000},
      {isRightAnswer: true, time: 36000},
      {isRightAnswer: true, time: 19000},
      {isRightAnswer: true, time: 38000},
      {isRightAnswer: false, time: 19000}
    ];

    assert.strictEqual(getQuickAnswersScore(answers), 10);
  });
});
