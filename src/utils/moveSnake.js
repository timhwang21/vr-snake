import { BOUNDARIES } from '../constants';

export function move(position, direction) {
  return position.map((c, i) => c + direction[i]);
}

export function loop(position) {
  return position.map((c, i) => negMod(c, BOUNDARIES[i]));
}

export function negMod(x, y) {
  return (x % y + y) % y;
}

export default function moveSnake(snake, direction) {
  const head = snake[snake.length - 1];
  const nextSnake = snake.slice(1);
  const newHead = loop(move(head, direction));
  nextSnake.push(newHead);

  return nextSnake;
}
