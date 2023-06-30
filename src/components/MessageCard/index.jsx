import React from 'react';
import './style.css';

export function MessageCard({ message, clear }) {
  const classes = [
    'message-card',
    `${message.type}-message`,
    'flex',
    'items-top',
    'justify-between',
    'rounded-sm',
    'shadow',
  ];

  return (
    <div data-id={message.id} className={classes.join(' ').trim()}>
      <h4 className={'message-text w-full m-0'}>{message.message}</h4>
      <button
        type={'button'}
        className={'flex items-center justify-center rounded-xs'}
        onClick={clear}
      >
        <span>&times;</span>
      </button>
    </div>
  );
}

export default MessageCard;
