import moveSnake, { move, loop, negMod } from './moveSnake';
import { BOUNDARIES } from '../constants';

describe('#move', () => {
	it('returns a new location given coordinates and a direction', () => {
		const coordinates = [1, 2, 3];
		const direction = [4, 5, 6];
		const expectation = [5, 7, 9];

		expect(move(coordinates, direction)).toEqual(expectation);
	});
});

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
		const snake = [
			[0, 0, 0],
			[1, 0, 0],
			[2, 0, 0],
		];
		const direction = [1, 1, 1];
		const expectation = [
			[1, 0, 0],
			[2, 0, 0],
			[3, 1, 1],
		];

		expect(moveSnake(snake, direction)).toEqual(expectation);
	});

});