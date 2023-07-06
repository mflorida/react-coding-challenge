import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { devmode } from '../../constants';
import MessageCard from '../MessageCard';
import './style.css';

// Duration in ms for animations/transitions
const DURATION = 100;

export function MessageColumn({ messageType: obj }) {

  // Is this useRef() necessary?
  const messageType = useRef(obj).current;

  // This one is. Maybe?
  const colRef = useRef();

  const colClass = `${messageType.type}-messages`;

  // Set css variables for card background and animation duration
  const style = {
    '--card-bg-color': messageType.color,
    '--duration': `${DURATION}ms`,
  };

  useLayoutEffect(() => {
    devmode(() => console.log(colRef));
    colRef.current.classList.remove('fade-out');
  }, [colRef]);

  const clearColumn = () => {
    colRef.current.classList.add('fade-out');
    setTimeout(() => {
      messageType.clearMessages();
      colRef.current.classList.remove('fade-out');
    }, DURATION + 20);
  };

  // `e` is the event object from the clicked <button> on the card
  const clearCard = useCallback((e) => {
    // We handle the button click, but work with the '.message-card' ancestor
    const card = e.target.closest('.message-card');
    // Add 'fade-out' class to trigger a transition
    card.classList.add('fade-out');
    // Message id is stored in card's `data-id` attribute
    const id = card.dataset.id;
    // Wait `${DURATION + 20}` ms for transition to finish
    setTimeout(() => {
      messageType.clearMessage(id);
    }, DURATION + 20);
  }, [messageType]);

  return (
    <section className={'message-column w-full flex-col'} style={style}>
      <header className={'rounded-sm flex-col justify-between'}>
        <h2>{messageType.label}: <small><i>type {messageType.priority}</i></small></h2>
        <h3 className={'flex items-center justify-between'}>
          <small>Count: {messageType.state.length}</small>
          <button type={'button'} onClick={clearColumn} style={{ padding: '6px 12px' }}>
            <>↓ clear</>
          </button>
        </h3>
      </header>
      <div ref={colRef} className={`${colClass} message-cards flex-col`}>
        {messageType.state.map(data => (
          <MessageCard key={data.id} id={data.id} message={data.message} clear={clearCard} />
        ))}
      </div>
    </section>
  );
}

export default MessageColumn;
