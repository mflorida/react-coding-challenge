import { useState } from 'react';
import { devmode } from '../constants';
import { messageTypeStore } from './useMessageTypeStore';

// Add state management to a message type
export function useMessageType(priority, obj) {
  const messageType = messageTypeStore.get(priority) || obj;
  const [state, setState] = useState(messageType.state || []);

  // if (!messageType) return null;

  const prevSetState = messageType.setState;

  devmode(() => {
    console.log(
      state === messageType.state
        ? `same state (${priority})`
        : `new state (${priority})`
    );
  });

  // We're mutating the message type object!!! 😱
  Object.assign(messageType, {
    setState,
    ...messageType,
    state,
  });

  devmode(() => {
    console.log(
      prevSetState === messageType.setState
        ? `same setState (${priority})`
        : `new setState (${priority})`
    );
  });

  messageTypeStore.set(priority, messageType);

  return messageTypeStore.get(priority);
}

export default useMessageType;
