// if you still don't get it, It's allright this is not used that much we understand it for learning purpose, creating custom events and if needed we can use and answer interviews questions on it.
// If you understand it just chill.
// If you don't understand it, just chill and move on to next topic L6 (FS module).


// const Emitter = require("./emitter"); // This is my custom emitter module
const Emitter = require("events") // this is core node js module you don't need to install it
const events = require("./config").events;

const emitr = new Emitter();

// console.log(obj); 
// console.log(emitr); // Emitter { events: {} }

emitr.on(events.GREET, function () {
    console.log("Hello !");
})// adding an event listener/callback function

emitr.on(events.FILEOPENED, function () {
    console.log("file opened event occurred");
})

emitr.on(events.FILESAVED, function () {
    console.log("file saved event occurred");
})

emitr.on("my-age", function () { 
    console.log("My age is 22");
})

emitr.emit(events.FILEOPENED); // triggering the event
emitr.emit(events.FILESAVED);
emitr.emit(events.GREET);


