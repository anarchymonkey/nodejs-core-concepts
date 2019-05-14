// requiring the events package so we can invoke it whenever our custom event is emitted
let eventEmitter = require('events');

//we are making an object of the eventEmitter class
let emitter = new eventEmitter();


// defining the custom event
emitter.on('onConnect',()=>{
    console.log("This is a trial of emitter , so lets see");

    setTimeout(()=>{
        console.log("this event is emitted after 2 seconds, thus giving us en example of the async code");
    },2000);
    console.log("finished?..");
});

emitter.emit('onConnect');