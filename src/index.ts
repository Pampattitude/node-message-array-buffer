import defaultConfig from './lib/config';

export class MessageArrayBuffer<Element> {
  public maxTime: number = defaultConfig.maxTime;
  public maxSize: number = defaultConfig.maxSize;

  private startTime: Date = null;
  private elems: Element[] = [];
  private savedElems: Element[] = [];

  constructor(options: MessageArrayBuffer.ConstructorOptions = {maxTime: defaultConfig.maxTime, maxSize: defaultConfig.maxSize}) {
    this.maxTime = options.maxTime || this.maxTime;
    this.maxSize = options.maxSize || this.maxSize;
  }

  public push(elem: Element): Element[] {
    this.elems.push(elem);

    if (!this.startTime) {
      this.startTime = new Date();
    }

    // Return the whole array if any is true: maxTime or maxSize attained
    if ((new Date().getTime() - this.startTime.getTime()) > this.maxTime) {
      this.startTime = null;
      return this.popAll_();
    }
    if (this.maxSize <= this.elems.length) {
      return this.popAll_();
    }

    return null;
  }

  public lookupAll(): Element[] {
    return this.elems;
  }

  public popAll(): Element[] {
    const ret = this.popAll_();
    this.savedElems = [];

    return ret;
  }

  public popAllIfFull(): Element[] {
    if (false === this.isFull()) {
      return null;
    }

    const ret = this.savedElems;
    this.savedElems = [];

    return ret;
  }

  public isFull(): boolean {
    return this.maxSize === this.savedElems.length;
  }

  private popAll_(): Element[] {
    this.savedElems = this.elems;
    this.elems = [];

    return this.savedElems;
  }
}

export namespace MessageArrayBuffer {
  export interface ConstructorOptions {
    maxTime?: number;
    maxSize?: number;
  }
}

export default MessageArrayBuffer;
