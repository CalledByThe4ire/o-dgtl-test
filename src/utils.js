export const formatNumber = (number) =>
  number.toLocaleString('en-US').replace(/,/g, ' ');

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
