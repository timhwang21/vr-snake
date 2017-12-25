import { OBJECTS } from '../constants';

export function hasCollision(map, head) {
  return map.has(head);
}

export function collidedWithObstacle(map, head) {
  const type = map.get(head);

  return OBJECTS[type].isObstacle;
}
