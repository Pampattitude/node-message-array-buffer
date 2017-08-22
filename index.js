const defaultConfig = require('./lib/config');

module.exports = class MessageBuffer {
  constructor(options = {maxTime: defaultConfig.maxTime, maxSize: defaultConfig.maxSize}) {
    this.maxTime = options.maxTime || defaultConfig.maxTime;
    this.maxSize = options.maxSize || defaultConfig.maxSize;

    this.elems = [];
    this.startTime = null;
  }

  push(elem) {
    this.elems.push(elem);

    if (!this.startTime)
      this.startTime = new Date();

    // Return the whole array if any is true: maxTime or maxSize attained
    if ((new Date() - this.startTime) > this.maxTime) {
      this.startTime = null;
      return this.popAll();
    }
    if (this.maxSize <= this.elems.length)
      return this.popAll();

    return null;
  }

  popAll() {
    const ret = this.elems;
    this.elems = [];

    return ret;
  }
};
