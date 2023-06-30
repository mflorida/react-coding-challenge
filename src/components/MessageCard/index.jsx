import React from 'react';
import './style.css';

export function MessageCard({ message, clear, id }) {
  return (
    <div className={`message-card flex items-top justify-between rounded-sm shadow`}>
      <h4 className={'message-text w-full m-0'}>{message.message}</h4>
      <h5 className={'clear-message w-full m-0 text-right'}>
        <button
          type={'button'}
          className={'rounded-xs'}
          data-id={id}
          onClick={clear}
        >
          <span>&times;</span>
        </button>
      </h5>
    </div>
  );
}

export default MessageCard;
