import rescale from './rescale';
import { BOX_SIZE } from '../constants';

describe('#rescale', () => {
	it('returns coordinates scaled by box size', () => {
		const coordinates = [1, 2, 3];
		const expectation = coordinates.map(c => c * BOX_SIZE);

		expect(rescale(coordinates)).toEqual(expectation);
	});
});