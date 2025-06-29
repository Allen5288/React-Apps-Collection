import modulo from './modulo';

test('calculate 1 % 2 to be 1', () => {
  expect(modulo(1, 2)).toBe(1);
});

test('calculate -1 % 2 to be 1', () => {
  expect(modulo(-1, 2)).toBe(1);
});