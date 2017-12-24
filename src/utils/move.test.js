import move from './move';

describe('#move', () => {
	it('returns a new location given coordinates and a direction', () => {
		const coordinates = [1, 2, 3];
		const direction = [4, 5, 6];
		const expectation = [5, 7, 9];

		expect(move(coordinates, direction)).toEqual(expectation);
	});
});