import createSnakePositionSet from './createSnakePositionSet';
import createSnake from './createSnake';

describe('#createSnakePositionSet', () => {
  it("returns a set of the positions of a snake's segments", () => {
    const snake = createSnake(3, [0, 0, 0]);
    const expectation = new Set(['0,0,0', '0,1,0', '0,2,0']);

    expect(createSnakePositionSet(snake)).toEqual(expectation);
  });
});
