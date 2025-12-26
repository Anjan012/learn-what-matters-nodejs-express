const object = require("./greeting.json");

function greet() {
    console.log(object.spanish);
}

module.exports = greet;