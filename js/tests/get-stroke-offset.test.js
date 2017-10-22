import assert from 'assert';
import {initialState} from "../data/initial-data";
import getStrokeOffset from '../get-stroke-offset';

describe(`Function should correctly calculate stroke offset`, () => {
  describe(`Normal cases`, () => {
    it(`Should return 0 in initial state`, () => {

      assert.equal(getStrokeOffset(initialState.timeLeft, 100), 0);
    });

    it(`Should return  full length in the final state`, () => {
      const length = 2 * Math.PI * 100;

      assert.equal(getStrokeOffset(0, 100), length);
    });

    it(`Should return half of the circle length`, () => {
      const halfLength = 2 * Math.PI * 100 / 2;

      assert.equal(getStrokeOffset(initialState.timeLeft / 2, 100), halfLength);
    });
  });
});
