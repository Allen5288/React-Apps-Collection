import minmax from './minmax';

test('minmax function', () => {
  expect(minmax(5, 1, 10)).toBe(5);
  expect(minmax(0, 1, 10)).toBe(1);
  expect(minmax(15, 1, 10)).toBe(10);
  expect(minmax(-5, -10, -1)).toBe(-5);
  expect(minmax(-15, -10, -1)).toBe(-10);
});