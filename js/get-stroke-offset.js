import {initialState} from "./data/initial-data";

/**
 * Get length for stroke-dashoffset
 * @param {number} timeleft - Player time left
 * @param {number} radius - Timer circle radius
 * @return {number} - Stroke-dashoffset length
 */
const getStrokeOffset = (timeleft, radius) => {
  const length = 2 * Math.PI * radius;
  const timeRatio = 1 - timeleft / initialState.timeLeft;

  return length * timeRatio;
};

export default getStrokeOffset;
