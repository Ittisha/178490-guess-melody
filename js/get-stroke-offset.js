import {initialState} from './data/initial-data';

/**
 * Get length for stroke-dashoffset
 * @param {number} timeLeft - Player time left
 * @param {number} radius - Timer circle radius
 * @return {number} - Stroke-dashoffset length
 */
const getStrokeOffset = (timeLeft, radius) => {
  const length = 2 * Math.PI * radius;
  const timeRatio = 1 - timeLeft / initialState.timeLeft;

  return length * timeRatio;
};

export default getStrokeOffset;
