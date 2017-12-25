export function hasCollision(map, head) {
  return map.has(head);
}

export function collidedWithObstacle(map, head) {
  return map.get(head).isObstacle;
}
