export const messageTypes = {
  0: {
    type: 'none',
    priority: 0,
    label: 'None',
    color: '#505050',
  },
  1: {
    type: 'error',
    priority: 1,
    label: 'Error',
    color: '#f56236',
  },
  2: {
    type: 'warning',
    priority: 2,
    label: 'Warning',
    color: '#fce788',
  },
  3: {
    type: 'info',
    priority: 3,
    label: 'Info',
    color: '#88fca3',
  },
};

// Map key matches priority
export const messageTypeMap = new Map([
  [0, {
    type: 'none',
    priority: 0,
    label: 'None',
    color: '#505050',
  }],
  [1, {
    type: 'error',
    priority: 1,
    label: 'Error',
    color: '#f56236',
  }],
  [2, {
    type: 'warning',
    priority: 2,
    label: 'Warning',
    color: '#fce788',
  }],
  [3, {
    type: 'info',
    priority: 3,
    label: 'Info',
    color: '#88fca3',
  }],
]);

// Indexes line up with priority values
export const messageTypeList = [...messageTypeMap.values()].map(o => o.type);

console.log('messageTypeList', messageTypeList);
