import createInitialPositionMap from './createInitialPositionMap';
import { OBJECTS } from '../constants';

describe('#createInitialPositionMap', () => {
  it('returns a map of serialized coordinates to segments', () => {
    const snake = [[0, 0, 0], [0, 1, 0], [0, 2, 0]];
    const output = createInitialPositionMap(snake);

    snake.forEach(segment => {
      expect(output.get(String(segment))).toBe(OBJECTS.segment);
    });
  });
});
