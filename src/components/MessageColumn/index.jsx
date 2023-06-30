import React from 'react';
import MessageCard from '../MessageCard';
import './style.css';

export function MessageColumn({ type, messages, update }) {
  const {
    priority,
    label,
    color,
  } = type;

  const style = {
    '--card-color': color,
  };

  return (
    <section className={'message-column w-full flex-col'} style={style}>
      <header>
        <h2>{label} Type {priority}</h2>
        <h3>Count {messages.length}</h3>
      </header>
      <div className={'message-cards'}>
        {messages.map(msg => (
          <MessageCard key={msg.id} message={msg} clear={() => {
            update(prevMsgs => prevMsgs.filter(obj => obj.id !== msg.id));
          }}/>
        ))}
      </div>
    </section>
  );
}

export default MessageColumn;
