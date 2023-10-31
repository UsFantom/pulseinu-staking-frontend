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
  MINT_TIMEIN: 'Mint time has not ended yet'
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
