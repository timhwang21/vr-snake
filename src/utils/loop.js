import { BOUNDARIES } from '../constants';

function negMod(x, y) {
	return (x + y) % y;
}

export default function loop(coordinates) {
	return coordinates.map((c, i) => negMod(c, BOUNDARIES[i]));
}