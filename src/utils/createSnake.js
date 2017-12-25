export default function createSnake(length) {
  const snake = [];

  for (let i = 0; i < length; i++) {
    snake.push([0, i, 0]);
  }

  return snake;
}
