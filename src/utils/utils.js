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
  dialogContainer.style.position = 'fixed';
  dialogContainer.style.top = '0';
  dialogContainer.style.left = '0';
  dialogContainer.style.width = '100%';
  dialogContainer.style.height = '100%';
  dialogContainer.style.display = 'flex';
  dialogContainer.style.justifyContent = 'center';
  dialogContainer.style.alignItems = 'center';
  dialogContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  dialogContainer.style.zIndex = '9999';

  const dialogContent = document.createElement('div');
  dialogContent.className = 'dialog-content';
  dialogContent.style.position = 'relative';
  dialogContent.style.textAlign = 'center';
  dialogContent.style.backgroundColor = '#fff';
  dialogContent.style.padding = '20px';
  dialogContent.style.borderRadius = '4px';
  dialogContent.style.textAlign = 'center';
  dialogContent.style.width = '80%'; // Adjust the width to 80% on mobile
  dialogContent.style.maxWidth = '500px'; // Adjust the maximum width to 500 pixels on desktop
  dialogContent.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click events from propagating to the dialog container
  });

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.border = 'none';
  closeButton.style.backgroundColor = 'transparent';
  closeButton.style.fontSize = '24px';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', hideDialog);

  const messageElement = document.createElement('p');
  messageElement.style.margin = '0';
  messageElement.textContent = message;

  dialogContent.appendChild(closeButton);
  dialogContent.appendChild(messageElement);

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.marginTop = '20px';
  spinner.style.border = '4px solid #f3f3f3';
  spinner.style.borderTop = '4px solid #3498db';
  spinner.style.borderRadius = '50%';
  spinner.style.width = '30px';
  spinner.style.height = '30px';
  spinner.style.animation = 'spin 1s linear infinite';
  spinner.style.transformOrigin = 'center';
  spinner.style.display = 'none';
  spinner.style.position = 'relative';
  spinner.style.transform = 'translateX(-50%)';
  spinner.style.left = '50%';
  if (type === DIALOG_TYPES.PROGRESS) {
    spinner.style.display = 'block';
  }
  dialogContent.appendChild(spinner);

  dialogContainer.appendChild(dialogContent);

  // Close the dialog when clicking outside of it
  dialogContainer.addEventListener('click', hideDialog);

  document.body.appendChild(dialogContainer);
}

function updateDialog(type, message) {
  const messageElement = document.querySelector('.dialog-content p');
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
