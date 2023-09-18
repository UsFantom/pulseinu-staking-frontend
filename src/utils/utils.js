export const formatNumber = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  try {
    return parseFloat(value)
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      .replace(/\.?0+$/, '');
  } catch (error) {
    return '-';
  }
};
