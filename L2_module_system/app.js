// module ------------
// a piece of code that is used by accross application
// encapsulated unit of code that can be reused in different parts of the application or in different applications

// core module - built in modules that come with nodejs
// 3rd party module - modules that are created by the community and shared on npm
// local module - modules that we create ourselves in our application

const greet = require("./greet");  // require is function that is inside commonjs module system, a string argument is path to the module
// const greet = require("./greet").greet;  // to access greet function from the object

// console.log(greet);
// greet("Anjan");
// greet.greet("Anjan");
// greet('Anjan');

console.log(greet); // return an object with greet and sub functions { greet: [Function: greet], sub: [Function: sub] }
const result = greet.sub(10,5);
console.log("subtraction result is:", result);