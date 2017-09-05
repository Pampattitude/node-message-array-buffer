# Example

```
const Mab = require('message-array-buffer');

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
