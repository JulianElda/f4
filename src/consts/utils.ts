export const calculateRecast = function (
  input: number,
  base: number = 2500
): number {
  if (input < 400) input = 400;
  return (
    (100 * ((base * (1000 - (130 * (input - 400)) / 1900)) / 1000 / 1000)) / 100
  );
};
