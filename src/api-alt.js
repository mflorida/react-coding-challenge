import Chance from 'chance';
import random from 'lodash.random';
import devmode from './hooks/useDevMode';
import getHipsumMessage from './data/getHipsumMessage';

/**
 * This is a modified version of the original api.
 */
class MessageGenerator {
  constructor(options) {
    console.log('MessageGenerator');
    this.messageCallback = (
      options.messageCallback
      || ((...args) => console.warn('No callback function.', args))
    );
    this.stopGeneration = false;
    this.chance = new Chance();
  }

  stop() {
    this.stopGeneration = true;
    clearTimeout(this.generator);
  }

  start() {
    this.stopGeneration = false;
    this.generate();
  }

  isStarted() {
    return !this.stopGeneration;
  }

  isStopped() {
    return this.stopGeneration;
  }

  generate(timeout) {
    if (this.isStopped()) {
      clearTimeout(this.generator);
      return;
    }
    // priority from 1 to 3, 1 = error, 2 = warning, 3 = info
    const priority = random(1, 3);
    const data = getHipsumMessage(priority);
    const next = random(1, 6) * 500;

    this.messageCallback({
      ...data,
      // create fresh id to avoid conflicts if message data gets re-used
      id: this.chance.guid(),
    });

    this.generator = setTimeout(() => {
      devmode(() => console.log('[ generating ]'));
      this.generate(next);
    }, timeout || 1);
  }
}

export default MessageGenerator;
