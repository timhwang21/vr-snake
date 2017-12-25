export default function createSnakePositionSet(snake) {
  return new Set(snake.map(String));
}
