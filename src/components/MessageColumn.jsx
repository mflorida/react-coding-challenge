import React from 'react';
import { messageTypes } from '../constants';
import MessageCard from './MessageCard';

import './MessageColumn.css'

export function MessageColumn(props) {
  // Destructure multilple props and set default values
  const {
    type = 'none',
    messages = [{ id: '', message: '', priority: 0, type: '' }],
  } = props;

  const {
    label,
    priority,
    color
  } = messageTypes[type]

  // Set css variable for cards' background in this column
  const style = {
    '--card-bg-color': color
  }

  return (
    <section className={'message-column w-full flex-col'} style={style}>
      <header>
        <h2>{label} Type {priority}</h2>
        <h3>Count {messages.length}</h3>
      </header>
      {messages.map(msg => <MessageCard key={msg.id} message={msg} />)}
    </section>
  );
}

export default MessageColumn;
