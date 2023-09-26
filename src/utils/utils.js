export const CONTRACT_ERROR_MAP = {
  ACTION_REJECTED: `User rejected transaction`,
  'transfer amount exceeds balance': `Insufficient balance`,
  'StakingPool::stake: amount = 0': 'Invalid staking amount',
  'StakingPool::stake: stakeDays <= 1': 'Invalid stake days',
  'StakingPool::stake: stakeDays > 1000': 'Invalid stake days',
  'StakingPool::stake: incorrect fee amount': 'Invalid stake fee amount',
  'StakingPool::unstake: invalid stake number': 'Invalid stake number',
  'StakingPool::unstake: stake not matured': 'Unable to unstake',
  'Failed to transfer PLS to address': 'Failed to transfer PLS to address'
};

export const DIALOG_TYPES = {
  SUCCESS: 0,
  FAIL: 1,
  PROGRESS: 2
};

export const formatNumber = (value, count) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
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

export const handleContractErrors = (error) => {
  error = error?.message ? error.message : error;
  const keys = Object.keys(CONTRACT_ERROR_MAP);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    if (error.indexOf(key) > -1) {
      return showDialog(DIALOG_TYPES.FAIL, CONTRACT_ERROR_MAP[key]);
    }
  }
  return showDialog(DIALOG_TYPES.FAIL, error);
};

export const handleContractSuccess = (message) => {
  return showDialog(DIALOG_TYPES.SUCCESS, message);
};

export const showDialog = (type, message) => {
  console.log(type, message);
  const dialog = '';
  alert(message);
  return dialog;
};
