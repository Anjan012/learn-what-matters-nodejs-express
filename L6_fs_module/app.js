// FS module (File System) is built into Node.js, so no need to install it 

const fs = require("fs");

/*

//! Reading FILES------------------------
// utf-8 encoding ensures the file is read as a string

console.log("Reading file..."); // asynchronous read
fs.readFile("./input.txt", "utf-8", (err, data)=> { // first parameter is the path to the file, second is the encoding (optional), third is the callback function
    if(err) throw err;
    console.log(data);
});
console.log("File read initiated..."); // asynchronous nature means this line runs before the file is read


console.log("Reading file..."); // synchronous read
const data = fs.readFileSync("./input.txt", "utf-8"); // synchronous version of readFile means it blocks the execution until the file is read
console.log(data);
console.log("File read completed."); // this line runs after the file is read

// difference between readFile and readFileSync is that readFile is asynchronous and non-blocking, while readFileSync is synchronous and blocking

*/

//! Writing FILES------------------------
fs.writeFile("input.txt", "A joke about a sad JavaScript developer who didn't Node how to Express himself. ", (err) => { // first parameter is the path to the file, second is the data to write, third is the callback function

    if(err) throw err;

}); // This will overwrite the file if it already exists. if file doesn't exist it will create a new one

fs.appendFile("input.txt",
     "\nA joke about JavaScript programmers: Don't trust them because they only make promises and never callback.", 
     (err) => { // first parameter is the path to the file, second is the data to append, third is the callback function

    if(err) throw err;
}); // This will append to the file if it already exists

// remove a file
// fs.unlink("input.txt", (err) => { // first parameter is the path to the file, second is the callback function

//     if(err) throw err;
//     console.log("File deleted successfully.");
// });


// This is not recommended for large files as it blocks the event loop----------------------