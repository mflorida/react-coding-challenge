/**
 * Fire `fn` callback if 'devmode' string is in the URL hash.
 * Return boolean value for devmode status.
 * @param {Function} [fn] - optional (but recommended) callback to call
 * @returns {boolean}
 */
export function useDevMode(fn) {
  if (/devmode/i.test(window.location.hash)) {
    if (typeof fn === 'function') fn();
    return true;
  }
  return false;
}

export default useDevMode;
