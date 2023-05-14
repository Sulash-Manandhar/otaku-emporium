export const MINIMUM_VALUE = 10000;
export const MAXIMUM_VALUE = 99999;

export const generateOPT = () => {
  return Math.floor(Math.random() * MINIMUM_VALUE) + MAXIMUM_VALUE;
};
