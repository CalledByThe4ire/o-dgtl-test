export const formatNumber = (number) =>
  Math.floor(number).toLocaleString('en-US').replace(/,/g, ' ');

export const extractNumber = (value) => parseInt(value.split(' ').join(''));

export const getListEnding = (number) => {
  if (number.toString().endsWith('3')) {
    return 'ий';
  } else if (
    ['1', '4', '5', '9'].some((value) => value === number.toString()) ||
    (number >= 10 && number <= 20)
  ) {
    return 'ый';
  } else if (
    ['2', '6', '7', '8'].some((value) => value === number.toString())
  ) {
    return 'ой';
  }
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const getEarlyPaymentsList = (salary) => {
  const MAX = 260000;

  const taxDeductionPerYear = salary * 12 * 0.13;

  const iter = (value, acc) => {
    if (value < taxDeductionPerYear) {
      return [...acc, value];
    }

    return iter(value - taxDeductionPerYear, [...acc, taxDeductionPerYear]);
  };

  if (taxDeductionPerYear >= MAX) {
    return [MAX];
  }

  return iter(MAX, []);
};
