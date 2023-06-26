import React from 'react';
import MessageCard from './MessageCard';

export function MessageColumn(props) {
  // Destructure multilple props inside function body for readability
  const {
    messages = [{ id: '', message: '', priority: 0, type: '' }],
  } = props;

  // const colStyle = {
  //   grid
  // }

  return (
    <section className={'w-full flex-col'}>
      {messages.map(msg => <MessageCard key={msg.id} message={msg} />)}
    </section>
  );
}

export default MessageColumn;
