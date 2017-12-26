import { BOUNDARIES } from '../constants';
import randomRange from './randomRange';

/**
 * Create a new position. If the position created is occupied, creates another.
 *
 * @param  {Object} opts
 * @return {Array}  XYZ coordinates
 */
export default function createRandomPosition({
  buffer = 0,
  fixedValues = [null, null, null],
  positionMap = new Map(),
}) {
  const newPosition = BOUNDARIES.map(
    (c, i) =>
      fixedValues[i] == null ? randomRange(buffer, c - buffer) : fixedValues[i],
  );

  return positionMap.has(String(newPosition))
    ? createRandomPosition({ buffer, fixedValues, positionMap })
    : newPosition;
}
