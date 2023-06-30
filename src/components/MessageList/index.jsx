import React, { useEffect, useState } from 'react';
import MessageGenerator from '../../api';
import { messageStoreMap } from '../../constants';
import MessageListHeader from '../MessageListHeader';
import MessageColumn from '../MessageColumn';

// Create single instance outside of component for reuse
const messageGenerator = new MessageGenerator({});

// Prefer named exports
export function MessageList() {
  [messageStoreMap.get(1).messages, messageStoreMap.get(1).setMessages] = useState([]);
  [messageStoreMap.get(2).messages, messageStoreMap.get(2).setMessages] = useState([]);
  [messageStoreMap.get(3).messages, messageStoreMap.get(3).setMessages] = useState([]);
  [messageStoreMap.get(4).messages, messageStoreMap.get(4).setMessages] = useState([]);

  function clearAll() {
    messageStoreMap.forEach(obj => obj.setMessages([]));
  }

  messageGenerator.messageCallback = ({ priority, ...data }) => {
    console.log('messageGenerator.messageCallback');
    // add 'type' property
    const message = {
      ...data,
      priority,
      type: messageStoreMap.get(priority).type,
    };

    messageStoreMap.get(priority).setMessages(prevMessages => {
      console.log(`setMessages:type=${message.type}`, prevMessages);
      return [
        message,
        ...prevMessages,
      ];
    });
  };

  useEffect(() => {
    console.log('useEffect:mount');
    messageGenerator.start();
    return () => {
      console.log('useEffect:unmount');
      messageGenerator.stop();
    };
  }, []);

  const [isStarted, setStarted] = useState(messageGenerator.isStarted());

  const toggleStart = (e) => {
    if (isStarted) {
      console.log('stopping…');
      messageGenerator.stop();
    } else {
      console.log('starting…');
      messageGenerator.start();
    }
    setStarted(messageGenerator.isStarted());
  };

  const colsStyle = { width: '80%', minWidth: 900, maxWidth: 1500 };

  return (
    <div className={'message-list'}>
      <MessageListHeader {...{ clearAll, isStarted, toggleStart }} />
      <div className={'m-0-auto flex justify-between'} style={colsStyle}>
        {/* Create a column for each message type defined in `messageStore` */}
        {[...messageStoreMap.values()].map(obj => (
          <MessageColumn
            key={obj.type}
            type={obj}
            messages={obj.messages}
            update={obj.setMessages}
          />
        ))}
        {/*<MessageColumn type={'error'} messages={errorMsgs} update={setErrorMsgs} />*/}
        {/*<MessageColumn type={'warning'} messages={warningMsgs} update={setWarningMsgs} />*/}
        {/*<MessageColumn type={'info'} messages={infoMsgs} update={setInfoMsgs} />*/}
      </div>
    </div>
  );
}
