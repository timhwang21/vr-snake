import rescale from './rescale';
import { BOX_SIZE } from '../constants';

describe('#rescale', () => {
  it('returns position scaled by box size', () => {
    const position = [1, 2, 3];
    const expectation = position.map(c => c * BOX_SIZE);

    expect(rescale(position)).toEqual(expectation);
  });
});
