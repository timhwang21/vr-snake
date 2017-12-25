import createSnake from './createSnake';

describe('#createSnake', () => {
  it('returns a snake with the given length', () => {
    const expectation = [[0, 0, 0], [0, 1, 0], [0, 2, 0]];

    expect(createSnake(3)).toEqual(expectation);
  });
});
