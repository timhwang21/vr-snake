import { BOX_SIZE } from '../constants';

export default function rescale(location) {
  return location.map(c => (c * BOX_SIZE).toFixed(2));
}
