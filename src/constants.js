// Use to check for #devmode url hash to conditionally
export const devmode = (fn) => {
  if (/devmode/i.test(window.location.hash)) {
    if (typeof fn === 'function') fn();
    return true;
  }
  return false;
};

// No-op
export const nope = () => {};

// Dictionary map for all message types (uses priority as the key).
// Add any new message types here to automatically be displayed in
// the UI. The order below is the display order.
export const messageTypeMap = new Map([
  [1, {
    priority: 1,
    type: 'error',
    label: 'Error',
    color: '#f56236',
  }],
  [2, {
    priority: 2,
    type: 'warning',
    label: 'Warning',
    color: '#fce788',
  }],
  [3, {
    priority: 3,
    type: 'info',
    label: 'Info',
    color: '#88fca3',
  }],
  // [4, {
  //   priority: 4,
  //   type: 'misc',
  //   label: 'Misc.',
  //   color: 'cornflowerblue',
  // }],
]);

// Array of message type objects
export const messageTypeList = Array.from(messageTypeMap.values());

// Object of message types, to easily access using priority as the key
export const messageTypes = messageTypeList.reduce((out, obj) => ({
  ...out,
  [obj.priority]: obj,
}), {});
