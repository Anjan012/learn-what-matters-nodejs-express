let a = 10;
let b = 20;

// if no nodejs run in browser console JS uses js engine of browser -> js engine is v8 in chrome and spider monkey in firefox
// V8 is Google's open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node. js, among others. It implements ECMAScript and WebAssembly, and runs on Windows, macOS, and Linux systems that use x64, IA-32, or ARM processors.
console.log(a+b); 

// nodejs run in terminal using v8 engine
// to run this file use command "node app.js" in terminal