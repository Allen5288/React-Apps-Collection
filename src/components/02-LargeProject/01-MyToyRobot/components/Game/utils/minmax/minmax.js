// minmax function
const minmax = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
export default minmax;