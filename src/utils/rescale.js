import { BOX_SIZE } from '../constants';

export default function rescale(coordinates) {
  return coordinates.map(c => c * BOX_SIZE);
}
