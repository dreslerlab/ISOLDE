/**
 * The ONLY module that knows about the world map.
 * Swapping the map = replace the asset import below and, if its projection differs,
 * `project()` + MAP_FIT (and their tests in tests/unit/map-projection.test.ts).
 *
 * src/assets/world-map.svg is a cropped Robinson projection (not equirectangular).
 * MAP_FIT was least-squares fitted on 13 coastline landmarks measured on the rendered map
 * (RMS error: x 0.26 %, y 0.43 % of the map's width/height).
 * The map lacks some detail (no Japan, Iceland or Sri Lanka) and its west edge is ~140° W
 * at the equator, so e.g. Hawaii falls outside it: project() then returns null.
 */
import worldMap from '../assets/world-map.svg';

export { worldMap };

/** Robinson table (every 5° latitude): [parallel length X, normalized distance from equator Y]. */
const ROBINSON_TABLE: ReadonlyArray<readonly [number, number]> = [
  [1.0, 0.0], [0.9986, 0.062], [0.9954, 0.124], [0.99, 0.186], [0.9822, 0.248],
  [0.973, 0.31], [0.96, 0.372], [0.9427, 0.434], [0.9216, 0.4958], [0.8962, 0.5571],
  [0.8679, 0.6176], [0.835, 0.6769], [0.7986, 0.7346], [0.7597, 0.7903], [0.7186, 0.8435],
  [0.6732, 0.8936], [0.6213, 0.9394], [0.5722, 0.9761], [0.5322, 1.0],
];
const TABLE_STEP_DEGREES = 5;

/** Affine fit from Robinson coordinates to % of the map image. */
export const MAP_FIT = { x0: 45.1163, kx: 0.322849, y0: 58.4986, ky: 58.222087 } as const;

export interface MapPosition {
  /** Percent of map width, 0 = left edge. */
  x: number;
  /** Percent of map height, 0 = top edge. */
  y: number;
}

/** Robinson factors for a latitude (linear interpolation of the standard table). */
export function robinsonFactors(lat: number): { X: number; Y: number } {
  const steps = Math.abs(lat) / TABLE_STEP_DEGREES;
  const i = Math.min(ROBINSON_TABLE.length - 2, Math.floor(steps));
  const t = steps - i;
  const [x0, y0] = ROBINSON_TABLE[i]!;
  const [x1, y1] = ROBINSON_TABLE[i + 1]!;
  return { X: x0 + (x1 - x0) * t, Y: Math.sign(lat) * (y0 + (y1 - y0) * t) };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Converts latitude/longitude (decimal degrees) to a position on the map image in percent.
 * Returns null when the point falls outside the (cropped) map.
 */
export function project(lat: number, lon: number): MapPosition | null {
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) throw new RangeError(`Latitude out of range: ${lat}`);
  if (!Number.isFinite(lon) || lon < -180 || lon > 180) throw new RangeError(`Longitude out of range: ${lon}`);
  const { X, Y } = robinsonFactors(lat);
  const x = MAP_FIT.x0 + MAP_FIT.kx * X * lon;
  const y = MAP_FIT.y0 - MAP_FIT.ky * Y;
  if (x < 0 || x > 100 || y < 0 || y > 100) return null;
  return { x: round2(x), y: round2(y) };
}
