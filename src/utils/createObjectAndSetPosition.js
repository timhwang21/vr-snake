import createRandomPosition from './createRandomPosition';

/**
 * Create a new object. Mutatively adds new object position to trackers.
 * Again, this is mutative. Be careful!
 *
 * @param  {Map}    positionMap
 * @param  {Object} objectType
 * @return {void}
 */
export default function createObjectAndSetPosition(positionMap, object) {
  const objectPos = createRandomPosition({
    fixedValues: [null, null, 0],
    positionMap,
  });

  positionMap.set(String(objectPos), object);

  return objectPos;
}
