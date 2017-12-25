export const BOX_SIZE = 0.1;

export const DIRECTIONS = {
	up: [0, 1, 0],
	down: [0, -1, 0],
	left: [-1, 0, 0],
	right: [1, 0, 0],
	forwards: [0, 0, -1],
	back: [0, 0, 1],
	stop: [0, 0, 0],
};

export const KEY_TO_DIRECTION = {
	KeyW: DIRECTIONS.up,
	KeyA: DIRECTIONS.left,
	KeyS: DIRECTIONS.down,
	KeyD: DIRECTIONS.right,
	KeyQ: DIRECTIONS.back,
	KeyE: DIRECTIONS.forwards,
}

export const BOUNDARIES = [80, 40, 60];

export const START_POS = BOUNDARIES
	.map(c => c / 2)
	.map((c, i) => i == 2 ? 3 * c : c);

export const START_SNAKE = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 2, 0],
  [0, 3, 0],
  [0, 4, 0],
];