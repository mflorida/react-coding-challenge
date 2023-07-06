import React from 'react';
import './style.scss';

export function MessageCard({ id, message, clear }) {
  return (
    <div
      className={`message-card flex items-top justify-between rounded-sm shadow`}
      data-id={id}
    >
      <p className={'message-text w-full m-0'}>{message}</p>
      <div className={'clear-message w-full m-0 text-right'}>
        <button
          type={'button'}
          className={'rounded-xs'}
          onClick={clear}
        >
          <span>&times;</span>
        </button>
      </div>
    </div>
  );
}

export default MessageCard;
