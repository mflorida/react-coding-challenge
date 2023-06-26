import React from 'react';

export function MessageListHeader({ isStarted, setStarted, clearAll }) {
  const toggleStart = (e) => {
    console.log(e.target);
    setStarted(prev => !prev);
  };
  const style = {
    margin: '24px auto 36px',
  };
  return (
    <div className={'message-list-header flex justify-center'} style={style}>
      <button type={'button'} onClick={toggleStart}>{isStarted ? 'Stop' : 'Start'}</button>
      <button type={'button'} onClick={clearAll}>Clear</button>
    </div>
  );
}

export default MessageListHeader;
