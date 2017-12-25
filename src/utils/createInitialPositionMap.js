import { OBJECTS } from '../constants';

export default function createInitialPositionMap(snake) {
  const positionMap = new Map();

  snake.forEach(segment =>
    positionMap.set(String(segment), OBJECTS.segment.type),
  );

  return positionMap;
}
