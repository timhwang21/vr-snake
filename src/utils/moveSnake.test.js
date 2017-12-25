import moveSnake, { move, loop, negMod } from './moveSnake';
import { BOUNDARIES } from '../constants';

describe('#move', () => {
  it('returns a new location given position and a direction', () => {
    const position = [1, 2, 3];
    const direction = [4, 5, 6];
    const expectation = [5, 7, 9];

    expect(move(position, direction)).toEqual(expectation);
  });
});

describe('#loop', () => {
  describe('when new position are within bounds', () => {
    it('returns position unchanged', () => {
      const position = [1, 2, 3];

      expect(loop(position)).toEqual(position);
    });
  });

  describe('when new position overlap bounds', () => {
    it('returns a new location given position and a direction', () => {
      const offset = 5;
      const position = BOUNDARIES.map(c => c + offset);
      const expectation = [offset, offset, offset];

      expect(loop(position)).toEqual(expectation);
    });
  });
});

describe('#negMod', () => {
  it('returns the modulo of a number', () => {
    const input = 7;
    const modulo = 5;
    const expectation = 2;

    expect(negMod(input, modulo)).toBe(expectation);
  });

  it('returns the positive modulo of negative numbers', () => {
    const input = -7;
    const modulo = 5;
    const expectation = 3;

    expect(negMod(input, modulo)).toBe(expectation);
  });
});

describe('moveSnake', () => {
  it('returns the new position of a snake given a snake and a direction', () => {
    const snake = [[0, 0, 0], [1, 0, 0], [2, 0, 0]];
    const direction = [1, 1, 1];
    const expectation = [[1, 0, 0], [2, 0, 0], [3, 1, 1]];

    expect(moveSnake(snake, direction)).toEqual(expectation);
  });
});
