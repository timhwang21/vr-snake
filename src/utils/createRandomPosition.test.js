jest.mock('./randomRange');

import createRandomPosition from './createRandomPosition';
import { BOUNDARIES } from '../constants';

describe('#createRandomPosition', () => {
  it('returns a position between buffer and BOUNDARIES - buffer', () => {
    const output = createRandomPosition(5);
    const expectation = BOUNDARIES.map(c => c - 5);

    expect(output).toEqual(expectation);
  });

  it('accepts fixed values to fix certain positions', () => {
    const output1 = createRandomPosition(5, [-1, null, null]);
    const output2 = createRandomPosition(5, [null, -1, null]);
    const output3 = createRandomPosition(5, [null, null, -1]);

    expect(output1[0]).toBe(-1);
    expect(output2[1]).toBe(-1);
    expect(output3[2]).toBe(-1);
  });
});
