import React, { useCallback, useEffect, useState } from 'react';
import devmode from '../../hooks/useDevMode';
import MessageGenerator from '../../api-alt';
import { messageTypeMap, useMessageType } from '../../hooks/useMessageType';
import MessageListHeader from '../MessageListHeader';
import MessageColumn from '../MessageColumn';

const messageGenerator = new MessageGenerator({});

// Prefer named exports
export function MessageList() {

  const errorMessages = useMessageType({
    priority: 1,
    type: 'error',
    label: 'Error',
    color: '#f56236',
  });

  const warningMessages = useMessageType({
    priority: 2,
    type: 'warning',
    label: 'Warning',
    color: '#fce788',
  });

  const infoMessages = useMessageType({
    priority: 3,
    type: 'info',
    label: 'Info',
    color: '#88fca3',
  });

  function clearAll() {
    messageTypeMap.forEach(messageType => {
      messageType.clearMessages();
    });
  }

  messageGenerator.messageCallback = useCallback((data) => {
    devmode(() => console.log('messageCallback'));
    const priority = data.priority;
    const messageType = messageTypeMap.get(priority);
    messageType.setState(prevMessages => [
      { ...data, type: messageType.type },
      ...prevMessages
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
        <MessageColumn key={'error'} messageType={errorMessages} />
        <MessageColumn key={'warning'} messageType={warningMessages} />
        <MessageColumn key={'info'} messageType={infoMessages} />
      </div>
    </div>
  );
}
