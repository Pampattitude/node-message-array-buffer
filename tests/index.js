const delay = require('delay');
const expect = require('chai').expect;

const config = require('../lib/config');
const MessageBuffer = require('../index');

describe('MessageBuffer class', () => {
  it('should be set to default configuration', () => {
    const mb = new MessageBuffer();

    expect(mb.maxTime).to.be.equal(config.maxTime);
    expect(mb.maxSize).to.be.equal(config.maxSize);
  });

  it('should be set to default configuration with empty configuration', () => {
    const mb = new MessageBuffer({});

    expect(mb.maxTime).to.be.equal(config.maxTime);
    expect(mb.maxSize).to.be.equal(config.maxSize);
  });

  it('should be set to custom configuration', () => {
    const mb = new MessageBuffer({maxTime: 1, maxSize: 1});

    expect(mb.maxTime).to.not.be.equal(config.maxTime);
    expect(mb.maxSize).to.not.be.equal(config.maxSize);
  });

  it('should `push()` a message to the buffer and return `null` with default configuration', () => {
    const mb = new MessageBuffer({maxTime: 1000, maxSize: 1024});

    expect(mb.push({key: 'value'})).to.be.null;
  });

  it('should `push()` a message to the buffer and return the whole buffer with `maxSize === 1`', () => {
    const mb = new MessageBuffer({maxTime: 1000, maxSize: 1});

    expect(mb.push({key: 'value'})).to.have.lengthOf(1);
  });

  it('should `push()` two message to the buffer and return the whole buffer with `maxSize === 2`', () => {
    const mb = new MessageBuffer({maxTime: 1000, maxSize: 2});

    expect(mb.push({key1: 'value1'})).to.be.null;
    expect(mb.push({key2: 'value2'})).to.have.lengthOf(2);
  });

  it('should `push()` a message, wait 10ms, push again and return the whole buffer with `maxSize === 2` and `maxTime === 1`', async () => {
    const mb = new MessageBuffer({maxTime: 1, maxSize: 2});

    expect(mb.push({key1: 'value1'})).to.be.null;
    await delay(10);
    expect(mb.push({key2: 'value2'})).to.have.lengthOf(2);
  });

  it('should `push()` a message and return `null`, then return the whole buffer with `popAll()` only once', () => {
    const mb = new MessageBuffer({maxTime: 1000, maxSize: 1024});

    expect(mb.push({key: 'value'})).to.be.null;
    expect(mb.popAll()).to.have.lengthOf(1);
    expect(mb.popAll()).to.have.lengthOf(0);
  });
});
