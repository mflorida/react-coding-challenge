import React, { useState } from 'react';
// import MessageGenerator from '../api';
import MessageListHeader from './MessageListHeader';
import MessageColumn from './MessageColumn';

// Bring in fake data to get columns rendering
import { getMockData } from '../data/getMockData';

// Prefer named exports
export function MessageList() {
  const [isStarted, setStarted] = useState(true)
  const [errorMsgs, setErrorMsgs] = useState(getMockData(1));
  const [warningMsgs, setWarningMsgs] = useState(getMockData(2));
  const [infoMsgs, setInfoMsgs] = useState(getMockData(3));

  function clearAll(){
    setErrorMsgs(() => []);
    setWarningMsgs(() => []);
    setInfoMsgs(() => []);
  }

  const colsStyle = { width: '80%', minWidth: 900, maxWidth: 1500 };

  return (
    <div className={'message-list'}>
      <MessageListHeader clearAll={clearAll} {...{isStarted, setStarted}} />
      <div className={'m-0-auto flex justify-between'} style={colsStyle}>
        <MessageColumn type={'error'} messages={errorMsgs} update={setErrorMsgs} />
        <MessageColumn type={'warning'} messages={warningMsgs} update={setWarningMsgs} />
        <MessageColumn type={'info'} messages={infoMsgs} update={setInfoMsgs} />
      </div>
    </div>
  );

}
