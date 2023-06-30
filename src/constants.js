export const devmode = () => /devmode/i.test(window.location.hash);

// Map key matches priority
export const messageTypeMap = new Map([
  // [0, {
  //   type: 'none',
  //   priority: 0,
  //   label: 'None',
  //   color: '#505050',
  // }],
  [1, {
    type: 'error',
    priority: 1,
    label: 'Error',
    // color: '#f56236',
    color: '#ff6969',
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

// Create object using 'type' as the keys
export const messageTypes = Array.from(messageTypeMap).reduce((types, [i, def]) => {
  return {
    ...types,
    [def.type]: def
  }
}, {});

export function getMessageType(priority) {
  return messageTypeMap.get(priority).type;
}

export function getMessageTypeLabel(priority) {
  return messageTypeMap.get(priority).label;
}

export const nope = (...args) => [...args];

export const messageStoreMap = new Map([
  [1, {
    priority: 1,
    type: 'error',
    label: 'Error',
    // color: '#f56236',
    color: '#ffa098',
    messages: [],
    setMessages: nope,
  }],
  [2, {
    priority: 2,
    type: 'warning',
    label: 'Warning',
    color: '#fce788',
    messages: [],
    setMessages: nope,
  }],
  [3, {
    priority: 3,
    type: 'info',
    label: 'Info',
    color: '#88fca3',
    messages: [],
    setMessages: nope,
  }],
  [4, {
    priority: 4,
    type: 'other',
    label: 'Other',
    color: '#d0d0d0',
    messages: [],
    setMessages: nope,
  }],
]);
