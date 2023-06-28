import React, {useCallback} from 'react';
import { messageTypes } from '../../constants';
import MessageCard from '../MessageCard';
import './style.css';

export function MessageColumn({ type, messages, update }) {
  // Get constant values for column of `type`
  const {
    label,
    priority,
    color,
  } = messageTypes[type];

  // Set css variable for cards' background in this column
  const style = {
    '--card-bg-color': color,
  };

  const clear = useCallback((e) => {
    const messageId = e.target.dataset.id;
    update(messages => messages.filter(msg => msg.id !== messageId))
  }, [update]);

  return (
    <section className={'message-column w-full flex-col'} style={style}>
      <header>
        <h2>{label} Type {priority}</h2>
        <h3>Count {messages.length}</h3>
      </header>
      {messages.map(msg => (
        <MessageCard key={msg.id} message={msg} id={msg.id} clear={clear} />
      ))}
    </section>
  );
}

export default MessageColumn;
