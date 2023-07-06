import React, { useEffect, useState } from 'react';
import MessageGenerator from '../../api-alt';
import MessageListHeader from '../MessageListHeader';
import MessageColumn from '../MessageColumn';
import useMessageType from '../../hooks/useMessageType';
import { devmode } from '../../constants';

const messageGenerator = new MessageGenerator({});

// Prefer named exports
export function MessageList() {

  const errorMessages = useMessageType(1, {
    priority: 1,
    type: 'error',
    label: 'Error',
    color: '#f56236',
  });

  const warningMessages = useMessageType(2, {
    priority: 2,
    type: 'warning',
    label: 'Warning',
    color: '#fce788',
  });

  const infoMessages = useMessageType(3, {
    priority: 3,
    type: 'info',
    label: 'Info',
    color: '#88fca3',
  });

  function clearAll() {
    errorMessages.setState([]);
    warningMessages.setState([]);
    infoMessages.setState([]);
  }

  messageGenerator.messageCallback = (data) => {
    devmode(() => console.log('messageCallback'));

    const priority = data.priority;

    if (priority === 1) {
      errorMessages.setState(prevMessages => [
        { ...data, type: 'error' },
        ...prevMessages
      ]);
      return;
    }

    if (priority === 2) {
      warningMessages.setState(prevMessages => [
        { ...data, type: 'warning' },
        ...prevMessages
      ]);
      return;
    }

    if (priority === 3) {
      infoMessages.setState(prevMessages => [
        { ...data, type: 'info' },
        ...prevMessages
      ]);
      return;
    }

    return null;
  };

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
