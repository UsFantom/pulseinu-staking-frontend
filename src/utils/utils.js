export const formatNumber = (value, count) => {
  if (value === null || value === undefined) {
    return '';
  }
  try {
    return parseFloat(value)
      .toLocaleString(undefined, {
        minimumFractionDigits: count || 2,
        maximumFractionDigits: count || 2
      })
      .replace(/\.?0+$/, '');
  } catch (error) {
    return '-';
  }
};
