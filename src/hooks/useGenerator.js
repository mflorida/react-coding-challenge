import MessageGenerator from '../api';
import { messageTypes } from '../constants';

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
    const type = messageTypes[message.priority].type;
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

const messageGenerator = new ExtendedGenerator({});

export function useGenerator(updaters, tick) {
  // console.log('useGenerator');
  messageGenerator.messageCallback = (message) => {
    // console.log('messageCallback', message);
    const type = messageTypes[message.priority].type;

    const [messages, setMessages] = updaters[type];
    setMessages(messageGenerator.addMessage(message));

    messageGenerator.messages[type] = messages;

  };

  return messageGenerator;
}

export default useGenerator;
