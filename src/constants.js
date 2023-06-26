export const messageTypes = {
  none: {
    type: 'none',
    priority: 0,
    label: 'None',
    color: '#505050'
  },
  error: {
    type: 'error',
    priority: 1,
    label: 'Error',
    color: '#f56236'
  },
  warning: {
    type: 'warning',
    priority: 2,
    label: 'Warning',
    color: '#fce788'
  },
  info: {
    type: 'info',
    priority: 3,
    label: 'Info',
    color: '#88fca3'
  },
};

// Indexes line up with priority values
export const messageTypeList = [
  'none', // filler since there is no '0' priority
  'error',
  'warning',
  'info',
];

export const messageTypeMap = new Map([
  ['none', {}],
  ['error', messageTypes.error],
  ['warning', messageTypes.warning],
  ['info', messageTypes.info],
]);
