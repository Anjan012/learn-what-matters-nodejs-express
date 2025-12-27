// multiple exports example

const greet1 = require("./greet1");
const greet2 = require("./greet2");

greet1();
// greet2(); // This will cause an error because greet2 is an object, not a function
// console.log(greet2);

greet2.greeteee(); 