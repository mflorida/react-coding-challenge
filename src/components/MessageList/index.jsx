import React, { useEffect, useState } from 'react';
import MessageGenerator from '../../api';
import { messageTypeList } from '../../constants';
import MessageListHeader from '../MessageListHeader';
import MessageColumn from '../MessageColumn';

// Prefer named exports
export function MessageList() {
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [warningMsgs, setWarningMsgs] = useState([]);
  const [infoMsgs, setInfoMsgs] = useState([]);

  const messageSetters = [
    () => {},
    setErrorMsgs,
    setWarningMsgs,
    setInfoMsgs,
  ];

  function clearAll() {
    messageSetters.forEach(setter => setter([]))
  }

  const [messageGenerator] = useState(new MessageGenerator({
    messageCallback: (data) => {
      // add 'type' property
      const message = {
        ...data,
        type: messageTypeList[data.priority],
      };

      messageSetters[data.priority](prevMessages => [
        message,
        ...prevMessages,
      ]);
    },
  }));

  const [isStarted, setStarted] = useState(messageGenerator.isStarted());

  useEffect(() => {
    messageGenerator.start();
    return () => {
      messageGenerator.stop();
    };
  }, [messageGenerator]);

  const toggleStart = (e) => {
    console.log('toggler');
    if (isStarted) {
      messageGenerator.stop();
    } else {
      messageGenerator.start();
    }
    setStarted(messageGenerator.isStarted());
  };

  const colsStyle = { width: '80%', minWidth: 900, maxWidth: 1500 };

  return (
    <div className={'message-list'}>
      <MessageListHeader {...{ clearAll, isStarted, toggleStart }} />
      <div className={'m-0-auto flex justify-between'} style={colsStyle}>
        <MessageColumn type={'error'} messages={errorMsgs} update={setErrorMsgs} />
        <MessageColumn type={'warning'} messages={warningMsgs} update={setWarningMsgs} />
        <MessageColumn type={'info'} messages={infoMsgs} update={setInfoMsgs} />
      </div>
    </div>
  );

}
