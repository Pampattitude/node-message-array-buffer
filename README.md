# Message Array Buffer

This library is used for buffering elements until either of two criteria are reached:

1. the time spent buffering since the last flush is greater than a maximum time (`maxTime`)
2. the number of elements in the buffer reaches a maximum (`maxSize`)

## TypeScript example

```
import { MessageArrayBuffer as Mab } from 'message-array-buffer';

const mab = new Mab<{key: string}>({maxTime: 1000 /*ms*/, maxSize: 1024});
const toPush = mab.push({key: 'value'});
if (null !== toPush) {
    if (0 !== toPush.length)
        ; // Do whatever you want with the data
    else // Timeout of 1000ms reached
        ;
}
else
    ; // Still buffering
```

## JavaScript example

```
const Mab = require('message-array-buffer').MessageArrayBuffer;

const mab = new Mab({maxTime: 1000 /*ms*/, maxSize: 1024});
const toPush = mab.push({key: 'value'});
if (null !== toPush) {
    if (0 !== toPush.length)
        ; // Do whatever you want with the data
    else // Timeout of 1000ms reached
        ;
}
else
    ; // Still buffering
```
