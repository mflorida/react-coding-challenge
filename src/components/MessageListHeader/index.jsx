import React from 'react';
import { button } from './style.module.css';

export function MessageListHeader({ isStarted, toggleStart, clearAll }) {
  const style = {
    margin: '24px auto 36px',
  };
  return (
    <div className={'message-list-header flex justify-center'} style={style}>
      <button className={button} type={'button'} onClick={toggleStart}>
          {isStarted ? 'Stop' : 'Start'}
      </button>
      <button className={button} type={'button'} onClick={clearAll}>Clear</button>
    </div>
  );
}

export default MessageListHeader;
