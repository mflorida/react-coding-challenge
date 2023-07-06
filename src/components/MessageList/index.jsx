import React, { useCallback, useEffect, useState } from 'react';
import MessageGenerator from '../../api-alt';
import { messageTypeStore, useMessageTypeStore } from '../../hooks/useMessageTypeStore';
import MessageListHeader from '../MessageListHeader';
import MessageColumn from '../MessageColumn';

const messageGenerator = new MessageGenerator({});

// Prefer named exports
export function MessageList() {
  const [messageTypes] = useMessageTypeStore();

  function clearAll() {
    messageTypeStore.forEach(messageType => messageType.setState([]));
  }

  messageGenerator.messageCallback = useCallback((data) => {
    const priority = data.priority;
    // add 'type' property when storing the message data
    const message = {
      ...data,
      type: messageTypeStore.get(priority).type,
    };
    messageTypeStore.get(priority).setState(prevMessages => [
      message,
      ...prevMessages,
    ]);
  }, []);

  const [isStarted, setStarted] = useState(true);

  useEffect(() => {
    if (!isStarted) {
      messageGenerator.stop();
      console.log('[ stopped ]');
    } else {
      messageGenerator.start();
      console.log('[ running ]');
    }
    return () => {
      messageGenerator.stop();
    };
  }, [isStarted]);

  const toggleStart = () => {
    console.log('< toggle >');
    setStarted(!messageGenerator.isStarted());
  };

  const colsStyle = { width: '80%', minWidth: 800, maxWidth: 1600 };

  return (
    <div className={'message-list'}>
      <MessageListHeader {...{ clearAll, isStarted, toggleStart }} />
      <div className={'m-0-auto flex justify-between'} style={colsStyle}>
        {messageTypes.map(messageType => (
          <MessageColumn key={messageType.type} priority={messageType.priority} />
        ))}
      </div>
    </div>
  );
}
