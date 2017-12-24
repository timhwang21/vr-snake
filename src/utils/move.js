export default function calcDirection(coordinates, direction) {
	return coordinates.map((c, i) => c + direction[i]);
}