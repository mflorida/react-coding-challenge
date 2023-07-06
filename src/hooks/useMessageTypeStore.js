import { useState } from 'react';
import { useMessageType } from './useMessageType';

export const messageTypeStore = new Map();

export function useMessageTypeStore() {
  const [messageTypes] = useState([
    useMessageType(1, {
      priority: 1,
      type: 'error',
      label: 'Error',
      color: '#f56236',
    }),

    useMessageType(2, {
      priority: 2,
      type: 'warning',
      label: 'Warning',
      color: '#fce788',
    }),

    useMessageType(3, {
      priority: 3,
      type: 'info',
      label: 'Info',
      color: '#88fca3',
    })
  ]);

  return [
    messageTypes,
    useMessageType
  ];
}

export default useMessageTypeStore;
