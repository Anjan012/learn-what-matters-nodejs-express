// function prerequisite you should know before diving into nodejs----------

// function statement -----
function greet() {
    console.log("HHello World");
}

greet(); // function call or function invocation

// function are first class citizens in js which means we can pass function as argument to another function----
function logGreeting(fn){
    fn();
}

logGreeting(greet); // passing function as argument


// function expression : assigning function to a variable----
const fn = function() {
    console.log("Function Expression");
}

fn(); // calling function expression

// use the function expression on the fly-----
//  creating a function exactly where you need it, often without assigning it to a persistent variable first. This technique is highly useful for one-time tasks or passing logic as data.
// A persistent variable is a special variable in programming that retains its value in memory between function calls or even across program restarts, allowing data to persist over time. Persistent variables are often used to store configuration settings, user preferences, or any other information that needs to be maintained throughout the lifecycle of an application.
// we pass the function expression directly as an argument to another function that is called use the funtion expression on the fly
setTimeout(function() {
    console.log("Function expression in setTimeout");
}, 1000); // after 1 second it will print the message