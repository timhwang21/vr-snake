import { BOUNDARIES } from '../constants';
import randomRange from './randomRange';

export default function createRandomPosition(
  buffer = 0,
  fixedValues = [null, null, null],
) {
  return BOUNDARIES.map(
    (c, i) =>
      fixedValues[i] == null ? randomRange(buffer, c - buffer) : fixedValues[i],
  );
}
