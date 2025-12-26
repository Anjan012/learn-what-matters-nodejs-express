const object = require("./greeting.json"); // When we require a JSON file, it parses the JSON content and returns a JavaScript object
console.log(object);

function greet() {
    console.log(object.english);
}

module.exports = greet;