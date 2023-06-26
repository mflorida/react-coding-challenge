import React from 'react';
import './MessageCard.css';

export function MessageCard({ message: msg }) {
  return (
    <div className={`message-card ${msg.type}-message flex items-top justify-between rounded-sm shadow`}>
      <h4 className={'message-text w-full m-0'}>{msg.message}</h4>
      <h5 className={'clear-message w-full m-0 text-right'}>
        <button type={'button'} className={'rounded-xs'}>clear</button>
      </h5>
    </div>
  );
}

export default MessageCard;
