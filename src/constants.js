// Tweakable constants

export const GAME_SPEED = 250;
export const INITIAL_SNAKE_LENGTH = 8;
export const BOX_SIZE = 0.1;
export const BOUNDARIES = [40, 20, 30];
export const START_POS = BOUNDARIES.map(c => c / 2).map(
  (c, i) => (i == 2 ? 3 * c : c),
);
export const MOTION_THRESHOLD = 0.25;
export const MOTIONS_TO_TRACK = 4;
export const MOTION_EXPIRY_TIME = 500;

// Fixe constants
export const DIRECTIONS = {
  up: [0, 1, 0],
  down: [0, -1, 0],
  left: [-1, 0, 0],
  right: [1, 0, 0],
  forwards: [0, 0, -1],
  back: [0, 0, 1],
  stop: [0, 0, 0],
};

export const DIRECTIONS_TO_REVERSE = new WeakMap();

DIRECTIONS_TO_REVERSE.set(DIRECTIONS.up, DIRECTIONS.down);
DIRECTIONS_TO_REVERSE.set(DIRECTIONS.down, DIRECTIONS.up);
DIRECTIONS_TO_REVERSE.set(DIRECTIONS.left, DIRECTIONS.right);
DIRECTIONS_TO_REVERSE.set(DIRECTIONS.right, DIRECTIONS.left);

export const MOTION_DIRECTIONS = {
  up: -1,
  down: 1,
  left: 2,
  right: -2,
  stop: 0,
  upDown: 1,
  leftRight: 2,
};

export const KEY_TO_DIRECTION = {
  KeyW: DIRECTIONS.up,
  KeyA: DIRECTIONS.left,
  KeyS: DIRECTIONS.down,
  KeyD: DIRECTIONS.right,
  // KeyQ: DIRECTIONS.back,
  // KeyE: DIRECTIONS.forwards,
};

export const KEY_TO_DIRECTION_REVERSE = {
  KeyW: DIRECTIONS.down,
  KeyA: DIRECTIONS.right,
  KeyS: DIRECTIONS.up,
  KeyD: DIRECTIONS.left,
  // KeyQ: DIRECTIONS.forwards,
  // KeyE: DIRECTIONS.back,
};

// TODO: color config, etc. goes here?
export const OBJECTS = {
  segment: {
    type: 'segment',
    isObstacle: true,
  },
  apple: {
    type: 'apple',
    isObstacle: false,
  },
};
