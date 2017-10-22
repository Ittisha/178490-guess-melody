import assert from 'assert';
import Timer from '../classes/timer-class';

suite(`Timer test`, () => {
  test(`Should create new timer with given remaining time`, () => {
    const timer = new Timer(1000);
    assert.strictEqual(timer.time, 1000);
  });

  test(`Should tick countdown`, () => {
    const timer = new Timer(100000);
    for (let i = 0; i < 99; i++) {
      timer.tick();
    }
    assert.strictEqual(timer.time, 1000);
  });

  test(`Should return -1 if time ends`, () => {
    const timer = new Timer(0);
    assert.strictEqual(timer.tick(), -1);
  });
});
