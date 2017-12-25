import { DIRECTIONS } from '../constants';
import moveSnake from './moveSnake';
import createRandomPosition from './createRandomPosition';

export default function createSnake(
  length,
  startPos,
  direction = DIRECTIONS.up,
) {
  let snakeHead = [
    startPos ||
      createRandomPosition({
        buffer: 5,
        fixedValues: [null, null, 0],
      }),
  ];
  const newSnake = [...snakeHead];

  for (let i = 1; i < length; i++) {
    snakeHead = moveSnake(snakeHead, direction);
    newSnake.push(snakeHead[0]);
  }

  return newSnake;
}
