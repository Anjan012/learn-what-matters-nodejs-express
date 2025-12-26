const greet = require("./greet")

greet.spanish(); // since this is a property of object wqe use dot notation to access it
greet.english();

console.log(greet);

// destructuring assignment----------
const { spanish, english } = require("./greet");

spanish();
english();


// JSON stands for JavaScript Object Notation. 
// JSON is a lightweight format for storing and transporting data. 
// JSON is often used when data is sent from a server to a web page. 
// JSON is "self-describing" and easy to understand

// Syntax of JSON
// Data is in key/value pairs
// "Keys" are strings
// Values can be strings, numbers, arrays, booleans, objects, or null
// Data is separated by commas
// Curly braces hold objects
// Square brackets hold arrays