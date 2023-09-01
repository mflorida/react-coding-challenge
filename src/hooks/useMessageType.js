import { useState } from 'react';
import { nope } from '../constants';
import useDevMode from './useDevMode';

// Track message types to re-use
export const messageTypeMap = new Map();

// Add state management to a message type
export function useMessageType(obj) {
  const priority = obj.priority ?? 0;
  const messageType = messageTypeMap.get(priority) || obj;

  const prevState = messageType.state;
  const prevSetState = messageType.setState;

  const [state, setState] = useState(messageType.state || []);

  useDevMode(() => {
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

  // Add method to clear entire column (message type)
  // ...or just a single message (by id)
  messageType.clear = messageType.clear || ((id) => {
    messageType.setState((messages) => (
      id != null
        ? messages.filter((msg) => msg.id !== id)
        : []
    ));
  });

  messageType.clearMessage = messageType.clearMessage || ((id) => id != null ? messageType.clear(id) : nope);

  // Alias a `clearMessages()` method
  messageType.clearMessages = messageType.clearMessages || (() => messageType.clear());

  useDevMode(() => {
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
