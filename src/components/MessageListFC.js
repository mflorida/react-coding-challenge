import React, { useEffect, useState } from 'react';
import useGenerator from '../hooks/useGenerator';

// Implement only functionality from 'message-list-class.js'

export function MessageListFC() {
  const messageStore = {
    error: useState([]),
    warning: useState([]),
    info: useState([])
  }

  // const [messages, setMessages] = useState([]);
  const generator = useGenerator(messageStore);

  console.log({...generator.messages});

  // useEffect(() => {
  //   console.log(generator.messages);
  // }, [
  //   messageStore.error[0],
  //   messageStore.warning[0],
  //   messageStore.info[0],
  // ]);

  useEffect(() => {
    generator.start();
    return () => {
      generator.stop();
    };
    // eslint-disable-next-line
  }, []);

  const [isStarted, setIsStarted] = useState(generator.isStarted());

  const handleClick = () => {
    if (isStarted) {
      console.log('stopping…');
      generator.stop();
    } else {
      console.log('starting…');
      generator.start();
    }
    setIsStarted(generator.isStarted());
  };

  return (
    <div style={{ width: 800, margin: '0 auto', textAlign: 'center' }}>
      <button type={'button'} onClick={handleClick}>
        {isStarted ? 'Stop' : 'Start'}
      </button>
      {isStarted ? ' Running...' : ' Stopped'}
    </div>
  );
}

export default MessageListFC;
