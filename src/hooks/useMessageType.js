import { useState } from 'react';
import { devmode } from '../constants';

// Track message types to re-use
const messageTypeMap = new Map();

// Add state management to a message type
export function useMessageType(priority, obj) {
  const messageType = messageTypeMap.get(priority) || obj;

  const prevState = messageType.state;
  const prevSetState = messageType.setState;

  const [state, setState] = useState(messageType.state || []);

  devmode(() => {
    console.log(
      prevState === state
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

  messageTypeMap.set(priority, messageType);

  return messageTypeMap.get(priority);
}

export default useMessageType;
