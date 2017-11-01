import assert from 'assert';
import {getNounPluralForm} from '../utils/utils';

suite(`Test getNounPluralForm`, () => {
  test(`Should return correct plural word form`, () => {
    const numbers = [0, 1, 2, 3, 4, 5, 11, 19, 24, 51, 62, 100, 101, 102, 212, 214, 1005];
    const wordMinuteForms = [`минута`, `минуты`, `минут`];
    const generatingStrings = numbers.map((num) => `${num} ${getNounPluralForm(num, wordMinuteForms)}`);

    const expectedStrings = [
      `0 минут`,
      `1 минута`,
      `2 минуты`,
      `3 минуты`,
      `4 минуты`,
      `5 минут`,
      `11 минут`,
      `19 минут`,
      `24 минуты`,
      `51 минута`,
      `62 минуты`,
      `100 минут`,
      `101 минута`,
      `102 минуты`,
      `212 минут`,
      `214 минут`,
      `1005 минут`
    ];

    assert.deepStrictEqual(generatingStrings, expectedStrings);
  });
});
