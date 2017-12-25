export function hasCollision(positionSet, head) {
  return positionSet.has(head);
}

export function updateCollisionSet(positionSet, head, last) {
  positionSet.add(head);
  positionSet.delete(last);

  return positionSet;
}
