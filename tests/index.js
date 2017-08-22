const delay = require('delay');
const expect = require('chai').expect;

const config = require('../lib/config');
const MessageArrayBuffer = require('../index');

describe('MessageArrayBuffer class', () => {
  it('should be set to default configuration', () => {
    const mb = new MessageArrayBuffer();

    expect(mb.maxTime).to.be.equal(config.maxTime);
    expect(mb.maxSize).to.be.equal(config.maxSize);
  });

  it('should be set to default configuration with empty configuration', () => {
    const mb = new MessageArrayBuffer({});

    expect(mb.maxTime).to.be.equal(config.maxTime);
    expect(mb.maxSize).to.be.equal(config.maxSize);
  });

  it('should be set to custom configuration', () => {
    const mb = new MessageArrayBuffer({maxTime: 1, maxSize: 1});

    expect(mb.maxTime).to.not.be.equal(config.maxTime);
    expect(mb.maxSize).to.not.be.equal(config.maxSize);
  });

  it('should `push()` a message to the buffer and return `null` with default configuration', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 1024});

    expect(mb.push({key: 'value'})).to.be.null;
  });

  it('should `push()` a message to the buffer and return the whole buffer with `maxSize === 1`', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 1});

    expect(mb.push({key: 'value'})).to.have.lengthOf(1);
  });

  it('should `push()` two message to the buffer and return the whole buffer with `maxSize === 2`', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 2});

    expect(mb.push({key1: 'value1'})).to.be.null;
    expect(mb.push({key2: 'value2'})).to.have.lengthOf(2);
  });

  it('should `push()` a message, wait 10ms, push again and return the whole buffer with `maxSize === 2` and `maxTime === 1`', async () => {
    const mb = new MessageArrayBuffer({maxTime: 1, maxSize: 2});

    expect(mb.push({key1: 'value1'})).to.be.null;
    await delay(10);
    expect(mb.push({key2: 'value2'})).to.have.lengthOf(2);
  });

  it('should `push()` a message and return `null`, then return the whole buffer with `popAll()` only once', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 1024});

    expect(mb.push({key: 'value'})).to.be.null;
    expect(mb.popAll()).to.have.lengthOf(1);
    expect(mb.popAll()).to.have.lengthOf(0);
  });

  it('should `push()` a message and return `null`, then return the whole buffer with `lookupAll()` more than once', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 1024});

    expect(mb.push({key: 'value'})).to.be.null;
    expect(mb.lookupAll()).to.have.lengthOf(1);
    expect(mb.lookupAll()).to.have.lengthOf(1);
  });

  it('should `push()` a message and return `null`, then return `true` with `isFull()` and an array of 1 with `popAllIfFull()` only once, with `maxSize === 1`', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 1});

    expect(mb.push({key: 'value'})).to.have.lengthOf(1);
    expect(mb.isFull()).to.be.equal(true);
    expect(mb.popAllIfFull()).to.have.lengthOf(1);
  });

  it('should `push()` a message and return `null`, then return `true` with `isFull()` more than once with `maxSize === 1`', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 1});

    expect(mb.push({key: 'value'})).to.have.lengthOf(1);
    expect(mb.isFull()).to.be.equal(true);
    expect(mb.isFull()).to.be.equal(true);
  });

  it('should `push()` a message and return `null`, then return `false` with `isFull()` and `null` with `popAllIfFull()` with `maxSize === 2`', () => {
    const mb = new MessageArrayBuffer({maxTime: 1000, maxSize: 2});

    expect(mb.push({key: 'value'})).to.be.null;
    expect(mb.isFull()).to.be.equal(false);
    expect(mb.popAllIfFull()).to.be.null;
  });
});
