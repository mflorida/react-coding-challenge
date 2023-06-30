import Chance from 'chance';
import random from 'lodash.random';
import { getMessageType } from '../constants';

const chance = new Chance();

// const mockModified = mock.map(msg => ({
//   ...msg,
//   // Generate messages with more varied lengths
//   message: chance.sentence({ words: random(3, 12) }),
//   type: messageTypes[msg.priority].type,
// }));

// Function that returns into the ether...
// Showing the structure of generated messages
// (prevents eslint 'unused variable' warnings)
(function template() {
  return {
    priority: 0,
    id: '00000000-0000-0000-000000000000',
    type: 'message',
    message: 'Message',
  }
})();

// Generate a mock dataset on script load
const mockData = (new Array(random(8, 25)).fill(null).map(() => {
  const id = chance.guid();
  const priority = random(1, 3);
  const type = getMessageType(priority);
  const message = chance.sentence({ words: random(3, 12) });
  return { id, priority, type, message };
}));

console.log('mockData', mockData);

// Get all messages for a specific type (by priority)
export function getMockData(priority) {
  return mockData.filter(msg => msg.priority === priority);
}
