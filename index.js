const defaultConfig = require('./lib/config');

module.exports = class MessageArrayBuffer {
  constructor(options = {maxTime: defaultConfig.maxTime, maxSize: defaultConfig.maxSize}) {
    this.maxTime = options.maxTime || defaultConfig.maxTime;
    this.maxSize = options.maxSize || defaultConfig.maxSize;

    this.startTime = null;
    this.elems = [];
    this.savedElems_ = []; // Only for `popAllIfFull()` and `isFull()`
  }

  push(elem) {
    this.elems.push(elem);

    if (!this.startTime)
      this.startTime = new Date();

    // Return the whole array if any is true: maxTime or maxSize attained
    if ((new Date() - this.startTime) > this.maxTime) {
      this.startTime = null;
      return this.popAll_();
    }
    if (this.maxSize <= this.elems.length)
      return this.popAll_();

    return null;
  }

  lookupAll() {
    return this.elems;
  }

  popAll() {
    const ret = this.popAll_();
    this.savedElems_ = [];

    return ret;
  }

  popAllIfFull() {
    if (false === this.isFull())
      return null;

    const ret = this.savedElems_;
    this.savedElems_ = [];

    return ret;
  }

  isFull() {
    return this.maxSize === this.savedElems_.length;
  }

  // private:

  popAll_() {
    this.savedElems_ = this.elems;
    this.elems = [];

    return this.savedElems_;
  }
};
