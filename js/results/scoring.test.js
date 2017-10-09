import assert from 'assert';
import countUpScores from './scoring';

suite(`Scoring`, () => {
  test(`Answers number is less than 10`, () => {
    const answers = [
      {truthfulness: true, time: 20000},
      {truthfulness: true, time: 10000},
      {truthfulness: true, time: 5000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 40000},
      {truthfulness: true, time: 50000},
      {truthfulness: true, time: 80000}
    ];

    assert.strictEqual(countUpScores(answers, 3), -1);
  });

  test(`Remaining notes are less than 0`, () => {
    const answers = [
      {truthfulness: true, time: 30000},
      {truthfulness: false, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: false, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: false, time: 30000},
      {truthfulness: false, time: 30000}
    ];

    assert.strictEqual(countUpScores(answers, -1), -1);
  });

  test(`Answers are right and slow`, () => {
    const answers = [
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000}
    ];

    assert.strictEqual(countUpScores(answers, 3), 10);
  });

  test(`Answers are right and fast`, () => {
    const answers = [
      {truthfulness: true, time: 25000},
      {truthfulness: true, time: 10000},
      {truthfulness: true, time: 5000},
      {truthfulness: true, time: 28000},
      {truthfulness: true, time: 29000},
      {truthfulness: true, time: 29999},
      {truthfulness: true, time: 500},
      {truthfulness: true, time: 1000},
      {truthfulness: true, time: 3000},
      {truthfulness: true, time: 15000}
    ];

    assert.strictEqual(countUpScores(answers, 3), 20);
  });

  test(`No notes are left, slow answers`, () => {
    const answers = [
      {truthfulness: true, time: 30000},
      {truthfulness: false, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: false, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: false, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 30000}
    ];

    assert.strictEqual(countUpScores(answers, 0), 1);
  });

  test(`No notes are left, fast answers`, () => {
    const answers = [
      {truthfulness: true, time: 29000},
      {truthfulness: false, time: 10000},
      {truthfulness: true, time: 4000},
      {truthfulness: true, time: 28000},
      {truthfulness: true, time: 23000},
      {truthfulness: true, time: 25000},
      {truthfulness: true, time: 15000},
      {truthfulness: true, time: 10000},
      {truthfulness: false, time: 20000},
      {truthfulness: false, time: 8000}
    ];

    assert.strictEqual(countUpScores(answers, 0), 8);
  });

  test(`2 notes are left, fast and slow answers`, () => {
    const answers = [
      {truthfulness: true, time: 29000},
      {truthfulness: true, time: 35000},
      {truthfulness: true, time: 30000},
      {truthfulness: true, time: 27000},
      {truthfulness: true, time: 23000},
      {truthfulness: true, time: 25000},
      {truthfulness: true, time: 36000},
      {truthfulness: true, time: 19000},
      {truthfulness: true, time: 38000},
      {truthfulness: false, time: 19000}
    ];

    assert.strictEqual(countUpScores(answers, 2), 12);
  });
});
