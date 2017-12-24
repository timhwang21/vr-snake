import loop from './loop';
import { BOUNDARIES } from '../constants';

describe('#loop', () => {
	describe('when new coordinates are within bounds', () => {
		it('returns coordinates unchanged', () => {
			const	coordinates = [1, 2, 3];

			expect(loop(coordinates)).toEqual(coordinates);
		});
	});

	describe('when new coordinates overlap bounds', () => {
		it('returns a new location given coordinates and a direction', () => {
			const offset = 5;
			const coordinates = BOUNDARIES.map(c => c + offset);
			const expectation = [offset, offset, offset];

			expect(loop(coordinates)).toEqual(expectation);
		});
	});
});