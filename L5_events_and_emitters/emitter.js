// an event is a signal from the browser that something significant has happened, while an event listener is a function that waits for and responds to a specific event.

function Emitter() {
    this.events = {} // When we create a new Emitter, we initialize an empty object to hold our events
    // this.events ={ greet: [cb, cb], my-age: [cb]} // example structure
}

// We can add our methods to a function using portotype
// on is used to add callbacks/event listeners for a specific event type
Emitter.prototype.on = function(type, eventListener) {
    this.events[type] = this.events[type] || []; // if the event type does not exist, create an empty array
    this.events[type].push(eventListener); // add the callback to the array of callbacks for this event type
}

// emit is used to trigger an event
Emitter.prototype.emit = function(type) {
    if(this.events[type]) {
        this.events[type].forEach(listner => {
            listner();
        });
    }
}

module.exports = Emitter;