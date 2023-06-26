import React from 'react';

export function MessageListHeader({ isStarted, setStarted, clearAll }) {
  const toggleStart = (e) => {
    console.log(e.target);
    setStarted(prev => !prev);
  };
  return (
    <div className={'message-list-header flex justify-center'}>
      <button type={'button'} onClick={toggleStart}>{isStarted ? 'Stop' : 'Start'}</button>
      <button type={'button'} onClick={clearAll}>Clear</button>
    </div>
  );
}

export default MessageListHeader;
