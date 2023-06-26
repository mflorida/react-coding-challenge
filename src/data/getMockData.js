import Chance from 'chance';
import random from 'lodash.random';
import { messageTypeList } from '../constants';
import mock from './mock.json';

const chance = new Chance();

const mockModified = mock.map(msg => ({
  ...msg,
  // Generate messages with more varied lengths
  message: chance.sentence({ words: random(3, 12) }),
  type: messageTypeList[msg.priority],
}));

export function getMockData(priority) {
  return mockModified.filter(msg => msg.priority === priority);
}
