import { describe, expect, it } from 'vitest';
import { MAP_FIT, project, robinsonFactors, worldMap } from '../../src/lib/map-projection';

/**
 * Landmarks measured on the rendered map (Phase 0): the extreme land pixel of each coastline feature,
 * in % of map width (x) or height (y). West/east extremes only constrain x; north/south extremes only y.
 */
const X_LANDMARKS = [
  { name: 'Cabo da Roca', lat: 38.78, lon: -9.5, x: 42.22 },
  { name: 'Cap-Vert', lat: 14.73, lon: -17.53, x: 39.81 },
  { name: 'Ponta do Seixas', lat: -7.15, lon: -34.79, x: 34.21 },
  { name: 'Steep Point', lat: -26.15, lon: 113.15, x: 80.28 },
  { name: 'Punta Pariñas', lat: -4.68, lon: -81.33, x: 18.52 },
  { name: 'Cape Byron', lat: -28.64, lon: 153.64, x: 93.01 },
];
const Y_LANDMARKS = [
  { name: 'Cape Agulhas', lat: -34.83, lon: 20.0, y: 83.52 },
  { name: 'Cape Horn', lat: -55.98, lon: -67.27, y: 98.24 },
  { name: 'Tasmania (South East Cape)', lat: -43.64, lon: 146.83, y: 89.91 },
  { name: 'New Zealand (Slope Point)', lat: -46.67, lon: 168.8, y: 92.13 },
  { name: 'Greenland (Cape Farewell)', lat: 59.77, lon: -43.9, y: 15.37 },
  { name: 'Madagascar (Cap Sainte-Marie)', lat: -25.6, lon: 45.15, y: 77.04 },
];
/** One percentage point ≈ 11 px on the 1080 px wide source map. */
const TOLERANCE_PERCENT = 1;

describe('project() against measured map landmarks', () => {
  it.each(X_LANDMARKS)('$name lands within tolerance horizontally', ({ lat, lon, x }) => {
    expect(Math.abs(project(lat, lon)!.x - x)).toBeLessThan(TOLERANCE_PERCENT);
  });

  it.each(Y_LANDMARKS)('$name lands within tolerance vertically', ({ lat, lon, y }) => {
    expect(Math.abs(project(lat, lon)!.y - y)).toBeLessThan(TOLERANCE_PERCENT);
  });
});

describe('project() for the Phase 0 test cities', () => {
  const nijmegen = project(51.84, 5.85)!;
  const sydney = project(-33.87, 151.21)!;
  const santiago = project(-33.45, -70.67)!;

  it('places all three cities on the map', () => {
    expect([nijmegen, sydney, santiago].every(Boolean)).toBe(true);
  });

  it('keeps their relative geography', () => {
    expect(santiago.x).toBeLessThan(nijmegen.x);
    expect(nijmegen.x).toBeLessThan(sydney.x);
    expect(nijmegen.y).toBeLessThan(sydney.y);
    expect(Math.abs(sydney.y - santiago.y)).toBeLessThan(0.5);
  });
});

describe('project() edge cases', () => {
  it('maps the equator/prime meridian to the fitted origin', () => {
    expect(project(0, 0)).toEqual({ x: Math.round(MAP_FIT.x0 * 100) / 100, y: Math.round(MAP_FIT.y0 * 100) / 100 });
  });

  it('returns null for points outside the cropped map (e.g. Honolulu)', () => {
    expect(project(21.31, -157.86)).toBeNull();
  });

  it('places the North Pole at the top edge of the map', () => {
    expect(project(90, 0)!.y).toBeLessThan(1);
  });

  it.each([
    [91, 0],
    [-91, 0],
    [0, 181],
    [0, -181],
    [Number.NaN, 0],
    [0, Number.POSITIVE_INFINITY],
  ])('throws RangeError for invalid coordinates (%s, %s)', (lat, lon) => {
    expect(() => project(lat, lon)).toThrow(RangeError);
  });
});

describe('robinsonFactors', () => {
  it('matches the table at the equator and the poles', () => {
    expect(robinsonFactors(0)).toEqual({ X: 1, Y: 0 });
    expect(robinsonFactors(90)).toEqual({ X: 0.5322, Y: 1 });
    expect(robinsonFactors(-90)).toEqual({ X: 0.5322, Y: -1 });
  });

  it('interpolates between table rows', () => {
    const { X, Y } = robinsonFactors(2.5);
    expect(X).toBeCloseTo(0.9993, 4);
    expect(Y).toBeCloseTo(0.031, 4);
  });
});

describe('worldMap asset', () => {
  it('exposes image metadata used for the 2:1 aspect ratio', () => {
    expect(worldMap.width).toBe(1080);
    expect(worldMap.height).toBe(540);
  });
});
