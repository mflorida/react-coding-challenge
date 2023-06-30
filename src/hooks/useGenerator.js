import MessageGenerator from '../api';
import { getMessageType } from '../constants';

class ExtendedGenerator extends MessageGenerator {
  // constructor() {
  //   super();
  // }

  messages = {
    error: [],
    warning: [],
    info: [],
  };

  addMessage(message) {
    const type = getMessageType(message.priority);
    return (
      this.messages[type] = [
        message,
        ...this.messages[type],
      ]
    );
  }

  setMessages(type){

  }

  getMessages(type) {
    if (type != null) {
      return this.messages[type];
    }
    return this.messages;
  }

}

// Create single instance outside of hook for reuse
const messageGenerator = new ExtendedGenerator({});

export function useGenerator(updaters, tick) {
  // console.log('useGenerator');
  messageGenerator.messageCallback = (message) => {
    // console.log('messageCallback', message);
    const type = getMessageType(message.priority);

    const [messages, setMessages] = updaters[type];
    setMessages(messageGenerator.addMessage(message));

    messageGenerator.messages[type] = messages;

  };

  return messageGenerator;
}

export default useGenerator;
