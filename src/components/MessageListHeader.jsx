import React from 'react';

import './MessageListHeader.css';

export function MessageListHeader({ isStarted, toggleStart, clearAll }) {
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
