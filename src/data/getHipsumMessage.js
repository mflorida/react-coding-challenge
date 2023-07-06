import { devmode } from '../constants';
import { messages } from './hipsum-data';

// Get a fresh copy of messages for priority `p`
const getMessages = (p) => [...messages[p]];

// Temp data store to shift existing data from
const data = {
  1: getMessages(1),
  2: getMessages(2),
  3: getMessages(3),
};

export function getHipsumMessage(priority) {
  devmode(() => console.log(`Priority ${priority} message count: ${data[priority].length}`));
  return (
    data[priority].shift()
    // if everything has been shifted out, get another copy and shift the first element
    || (data[priority] = getMessages(priority)).shift()
  );
}

export default getHipsumMessage;
