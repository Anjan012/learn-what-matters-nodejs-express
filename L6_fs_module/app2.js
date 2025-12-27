// recommended

const fs = require("fs");

const readStream = fs.createReadStream("input.txt", "utf-8"); // first parameter is the path to the file, second is the encoding (optional)
// console.log(readStream); // it returns a Readable Stream object


readStream.on("data", (chunk) => { // 'data' event is emitted when a chunk of data is available to read
    console.log("----- New Chunk Received -----");
    console.log(chunk); // chunk is a piece of data read from the stream
});

readStream.on("end", () => { // 'end' event is emitted when there is no more data to read
    console.log("----- No More Data to Read -----");
});

// ----------------------------------------------------------------------

writeStream = fs.createWriteStream("output.txt", "utf-8"); // first parameter is the path to the file

writeStream.write("This is the first line of the output file.\n");

// ----------------------------------------------------------------------

// pipe method to read from one stream and write to another
// pipe = transfer (like transfer water from one container to another using a pipe)

const readStream2 = fs.createReadStream("input.txt", "utf-8");
const writeStream2 = fs.createWriteStream("output2.txt", "utf-8");

readStream2.pipe(writeStream2); // pipe method reads data from readStream2 and writes it to writeStream2

