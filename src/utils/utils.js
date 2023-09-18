export const formatNumber = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  try {
    return parseFloat(value)
      .toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      })
      .replace(/\.?0+$/, '');
  } catch (error) {
    return '-';
  }
};
