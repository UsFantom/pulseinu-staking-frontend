export const CONTRACT_ERROR_MAP = {
  ACTION_REJECTED: `User rejected transaction`,
  'transfer amount exceeds balance': `Insufficient balance`,
  'StakingPool::stake: amount = 0': 'Invalid staking amount',
  'StakingPool::stake: stakeDays <= 1': 'Invalid stake days',
  'StakingPool::stake: stakeDays > MAX_STAKING_DAYS': 'Invalid stake days',
  'StakingPool::stake: incorrect fee amount': 'Invalid stake fee amount',
  'StakingPool::stake: caller is referrer': 'Invalid Referrer Address',
  'StakingPool::stake: max stakes reached': 'Reached maximum stakes',
  'StakingPool::unstake: invalid stake number': 'Invalid stake number',
  'StakingPool::unstake: stake not matured': 'Unable to unstake',
  'Failed to transfer PLS to address': 'Failed to transfer PLS to address',
  'unknown account': 'You are not eligible for claiming',
  MINT_TIMEIN: 'Mint time has not ended yet',
  NOT_REFERRER_CLAIMABLE_ADDR_PERCENT: 'You are not eligible for claiming as a referrer',
  NOT_FIRST_ADOPTER_CLAIMABLE_ADDR: 'You are not eligible for claiming as an early adopter'
};

export const DIALOG_TYPES = {
  SUCCESS: 0,
  FAIL: 1,
  PROGRESS: 2
};

export const formatBigNumber = (value, count) => {
  if (value < 1e6) {
    return formatNumber(value, count);
  } else if (value < 1e9) {
    return `${formatNumber(value / 1e6, count)}M`;
  } else if (value < 1e12) {
    return `${formatNumber(value / 1e9, count)}B`;
  } else {
    return `${formatNumber(value / 1e12, count)}T`;
  }
};

export const eToNumber = (num) => {
  let sign = '';
  (num += '').charAt(0) == '-' && ((num = num.substring(1)), (sign = '-'));
  let arr = num.split(/[e]/gi);
  if (arr.length < 2) return sign + num;
  let dot = (0.1).toLocaleString().substr(1, 1),
    n = arr[0],
    exp = +arr[1],
    w = (n = n.replace(/^0+/, '')).replace(dot, ''),
    pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
    L = pos - w.length,
    s = '' + BigInt(w);
  w =
    exp >= 0
      ? L >= 0
        ? s + '0'.repeat(L)
        : r()
      : pos <= 0
      ? '0' + dot + '0'.repeat(Math.abs(pos)) + s
      : r();
  L = w.split(dot);
  if ((L[0] == 0 && L[1] == 0) || (+w == 0 && +s == 0)) w = 0; //** added 9/10/2021
  return sign + w;
  function r() {
    return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`);
  }
};

export const formatSmallNumber = (value) => {
  if (isNaN(value) || !value || Math.abs(value) >= 1) {
    return ''; // Return an empty string for non-small numbers or non-numeric values
  }

  const decimalPart = eToNumber(value).split('.')[1];

  if (!decimalPart || decimalPart === '0') {
    return '0.0';
  }

  const count_zeros = decimalPart.match(/^0*/)[0].length;

  if (count_zeros > 1) {
    const subscript_zeros = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    const formatted_value = `0.0${subscript_zeros[count_zeros]}`;
    const nonZeroDigits = decimalPart.toString().slice(count_zeros, count_zeros + 4);
    return `${formatted_value}${nonZeroDigits}`;
  } else {
    return formatNumber(value, 4);
  }
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

export const getParameterCaseInsensitive = (object, key) => {
  const asLowercase = key.toLowerCase();
  return object[Object.keys(object).find((k) => k.toLowerCase() === asLowercase)];
};

export const makeTimeString = (time) => {
  if (time < 0) {
    return '00:00:00';
  }
  let seconds = Math.floor(time / 1000);
  let days = Math.floor(seconds / 3600 / 24);
  let hours = Math.floor((seconds - days * 3600 * 24) / 3600);
  let mins = Math.floor((seconds - days * 3600 * 24 - hours * 3600) / 60);
  seconds = seconds - days * 3600 * 24 - hours * 3600 - mins * 60;
  return (
    (days > 1 ? days + ' days ' : days == 1 ? days + ' day ' : '') +
    (hours < 10 ? '0' + hours : hours) +
    ':' +
    (mins < 10 ? '0' + mins : mins) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds)
  );
};

export const showDialog = (type, message) => {
  if (isDialogOpened()) {
    updateDialog(type, message);
  } else {
    createDialog(type, message);
  }
};

function isDialogOpened() {
  const dialogContainer = document.querySelector('.dialog-container');
  return Boolean(dialogContainer);
}

function createDialog(type, message) {
  const dialogContainer = document.createElement('div');
  dialogContainer.className = 'dialog-container';

  const dialogContent = document.createElement('div');
  dialogContent.className = 'dialog-content';
  dialogContent.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click events from propagating to the dialog container
  });

  const closeButton = document.createElement('button');
  closeButton.className = 'dialog-close-btn';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', hideDialog);

  const messageElement = document.createElement('p');
  messageElement.className = 'dialog-content-label';
  messageElement.textContent = message;

  dialogContent.appendChild(closeButton);
  dialogContent.appendChild(messageElement);

  const spinnerDiv = document.createElement('div');
  spinnerDiv.className = 'spinner-wrap';

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  if (type === DIALOG_TYPES.PROGRESS) {
    spinner.style.display = 'block';
  }
  spinnerDiv.appendChild(spinner);

  dialogContent.appendChild(spinnerDiv);
  dialogContainer.appendChild(dialogContent);

  // Close the dialog when clicking outside of it
  dialogContainer.addEventListener('click', hideDialog);

  document.body.appendChild(dialogContainer);
}

function updateDialog(type, message) {
  const messageElement = document.querySelector('.dialog-content-label');
  const spinnerElement = document.querySelector('.dialog-content .spinner');

  messageElement.textContent = message;

  if (type === DIALOG_TYPES.PROGRESS) {
    spinnerElement.style.display = 'block';
  } else {
    spinnerElement.style.display = 'none';
  }
}

function hideDialog() {
  const dialogContainer = document.querySelector('.dialog-container');
  if (dialogContainer) {
    dialogContainer.parentNode.removeChild(dialogContainer);
  }
}
