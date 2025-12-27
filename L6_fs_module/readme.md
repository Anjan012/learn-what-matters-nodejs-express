# Node.js File System (fs) Module - Complete Guide

## What is the fs Module?

The **File System (fs) module** is a built-in Node.js module that lets you interact with files and directories on your computer. Think of it as Node.js's way of reading, writing, and manipulating files—no external packages needed!

```javascript
const fs = require("fs");  // Built-in, no npm install required!
```

---

## Part 1: Basic File Operations (app.js)

### Reading Files - Two Approaches

#### 1. Asynchronous Reading (Non-Blocking) ✅ Recommended

**What "asynchronous" means:**
- Your code keeps running while the file is being read
- Like ordering food at a restaurant—you don't stand frozen waiting, you sit down and chat while the kitchen prepares your meal
- Uses a callback function that runs when the file is ready

```javascript
console.log("Reading file..."); // This runs FIRST

fs.readFile("./input.txt", "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);  // This runs THIRD (when file is ready)
});

console.log("File read initiated..."); // This runs SECOND (doesn't wait!)
```

**Parameters breakdown:**
1. `"./input.txt"` → Path to the file you want to read
2. `"utf-8"` → Encoding (makes sure you get readable text, not gibberish binary)
3. `(err, data) => {...}` → Callback function with two parameters:
   - `err` → If something goes wrong (file not found, no permissions, etc.)
   - `data` → The actual file content when successful

**Output order:**
```
Reading file...
File read initiated...
[content of input.txt appears here]
```

---

#### 2. Synchronous Reading (Blocking) ⚠️ Use Carefully

**What "synchronous" means:**
- Your code STOPS and WAITS until the file is completely read
- Like standing at a checkout counter—nothing else happens until the transaction is complete
- Code runs line by line, no skipping

```javascript
console.log("Reading file..."); // This runs FIRST

const data = fs.readFileSync("./input.txt", "utf-8"); // Code PAUSES here until file is read
console.log(data); // This runs SECOND

console.log("File read completed."); // This runs THIRD
```

**Output order:**
```
Reading file...
[content of input.txt appears here]
File read completed.
```

---

### 🤔 When to Use Which?

| Scenario | Use Async | Use Sync |
|----------|-----------|----------|
| Web servers (Express apps) | ✅ Yes | ❌ No |
| Reading config files at startup | Maybe | ✅ Yes |
| Processing user uploads | ✅ Yes | ❌ No |
| CLI tools / scripts | Either | ✅ Yes |
| Large files | ✅ Yes | ❌ No |

**Rule of thumb:** Use async (non-blocking) by default. Only use sync when your app is just starting up or in simple scripts where blocking is okay.

---

### Writing to Files

#### 1. `writeFile()` - Overwrite Everything

**What it does:**
- Creates a new file if it doesn't exist
- **COMPLETELY OVERWRITES** the file if it already exists
- Like using a new blank sheet of paper

```javascript
fs.writeFile("input.txt", "A joke about a sad JavaScript developer who didn't Node how to Express himself.", (err) => {
    if(err) throw err;
    console.log("File written successfully!");
});
```

**Parameters:**
1. `"input.txt"` → File path
2. `"A joke about..."` → Content to write
3. `(err) => {...}` → Callback when done

**Before:**
```
input.txt contains: "Hello world"
```

**After running writeFile:**
```
input.txt contains: "A joke about a sad JavaScript developer who didn't Node how to Express himself."
```
(The "Hello world" is gone!)

---

#### 2. `appendFile()` - Add to the End

**What it does:**
- Creates a new file if it doesn't exist
- **ADDS to the end** of the file if it exists
- Like writing more notes at the bottom of a page

```javascript
fs.appendFile("input.txt", "\nA joke about JavaScript programmers: Don't trust them because they only make promises and never callback.", (err) => {
    if(err) throw err;
    console.log("Content appended!");
});
```

**Before:**
```
input.txt contains: "First line"
```

**After running appendFile:**
```
input.txt contains: "First line
A joke about JavaScript programmers: Don't trust them because they only make promises and never callback."
```
(Original content is preserved!)

**Note:** `\n` adds a new line so content doesn't get squished together.

---

#### 3. `unlink()` - Delete a File

**What it does:**
- Permanently deletes a file
- "Unlink" is Unix terminology for removing a file reference

```javascript
fs.unlink("input.txt", (err) => {
    if(err) throw err;
    console.log("File deleted successfully.");
});
```

**Warning:** This is permanent! The file goes to the void, not the recycle bin.

---

### ⚠️ The Problem with Basic File Operations

```javascript
// Reading a 2GB video file
const data = fs.readFileSync("huge-movie.mp4"); // ❌ BAD!
// This tries to load the ENTIRE 2GB into memory at once!
```

**Problems:**
1. **Memory overflow** - Your app might crash
2. **Blocking** - Everything freezes while reading
3. **Inefficient** - You have to wait for the whole file before doing anything

**Solution:** Use **Streams** (covered in Part 2)!

---

## Part 2: Streams - The Better Way (app2.js)

### What Are Streams?

**Streams = Processing data in small chunks instead of all at once**

**Real-world analogy:**
- **Without streams:** Waiting for an entire 2-hour movie to download before you can watch any of it
- **With streams:** Netflix/YouTube starts playing after buffering just a few seconds (chunks)

**Benefits:**
1. **Memory efficient** - Only hold small pieces in memory
2. **Faster** - Start processing before the whole file is read
3. **Non-blocking** - Your app stays responsive

---

### Reading with Streams

```javascript
const fs = require("fs");

const readStream = fs.createReadStream("input.txt", "utf-8");

// Listen for data chunks
readStream.on("data", (chunk) => {
    console.log("----- New Chunk Received -----");
    console.log(chunk);  // Each piece of the file
});

// Listen for end of file
readStream.on("end", () => {
    console.log("----- No More Data to Read -----");
});
```

**How it works:**

```
input.txt: "Hello world, this is a longer file with lots of text..."

Chunk 1: "Hello world, th"
Chunk 2: "is is a longer "
Chunk 3: "file with lots "
Chunk 4: "of text..."
END
```

**What's happening:**
1. `createReadStream()` opens the file
2. Node.js reads small chunks (default ~64KB each)
3. The `'data'` event fires for each chunk
4. The `'end'` event fires when done

**Think of it as:** Reading a book page by page instead of trying to read the whole thing at once.

---

### Writing with Streams

```javascript
const writeStream = fs.createWriteStream("output.txt", "utf-8");

writeStream.write("This is the first line of the output file.\n");
writeStream.write("This is the second line.\n");
writeStream.write("This is the third line.\n");

writeStream.end();  // Signal we're done writing
```

**What's happening:**
- Each `write()` sends data to the file in chunks
- You can call `write()` multiple times
- Like writing with a pen—one stroke at a time instead of printing everything at once

---

### The Power of Pipes 🚰

**What is `pipe()`?**
- **Pipe = Transfer data from one stream to another**
- Like a physical pipe transferring water from tank A to tank B
- Automatically handles the flow of data

```javascript
const readStream2 = fs.createReadStream("input.txt", "utf-8");
const writeStream2 = fs.createWriteStream("output2.txt", "utf-8");

readStream2.pipe(writeStream2);  // Magic! Copies input.txt to output2.txt
```

**What this does:**
1. Reads a chunk from `input.txt`
2. Immediately writes that chunk to `output2.txt`
3. Repeats until the entire file is copied
4. Automatically handles backpressure (flow control)

**Without pipe (the hard way):**
```javascript
readStream.on("data", (chunk) => {
    writeStream.write(chunk);
});

readStream.on("end", () => {
    writeStream.end();
});
```

**With pipe (the easy way):**
```javascript
readStream.pipe(writeStream);  // That's it!
```

---

### Real-World Stream Use Cases

#### 1. Copying Large Files

```javascript
// Copy a 5GB video file without using 5GB of RAM
const source = fs.createReadStream("huge-video.mp4");
const destination = fs.createWriteStream("backup-video.mp4");

source.pipe(destination);
console.log("Copying in progress...");
```

#### 2. Processing CSV Files Line by Line

```javascript
const readStream = fs.createReadStream("million-users.csv", "utf-8");

readStream.on("data", (chunk) => {
    // Process this chunk (maybe 1000 users)
    processUsers(chunk);
    // Don't need to load all million users into memory!
});
```

#### 3. Serving Files in Express

```javascript
app.get("/download", (req, res) => {
    const fileStream = fs.createReadStream("large-file.pdf");
    fileStream.pipe(res);  // Stream file to user's browser
    // User can start downloading immediately!
});
```

---

## Quick Reference

### Basic Operations (Small Files)

```javascript
// Read (Async)
fs.readFile("file.txt", "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);
});

// Read (Sync)
const data = fs.readFileSync("file.txt", "utf-8");

// Write (Overwrite)
fs.writeFile("file.txt", "content", (err) => {
    if(err) throw err;
});

// Append
fs.appendFile("file.txt", "more content", (err) => {
    if(err) throw err;
});

// Delete
fs.unlink("file.txt", (err) => {
    if(err) throw err;
});
```

### Streams (Large Files)

```javascript
// Read Stream
const readStream = fs.createReadStream("file.txt", "utf-8");
readStream.on("data", (chunk) => console.log(chunk));
readStream.on("end", () => console.log("Done"));

// Write Stream
const writeStream = fs.createWriteStream("file.txt", "utf-8");
writeStream.write("content");
writeStream.end();

// Pipe (Copy)
const source = fs.createReadStream("input.txt");
const dest = fs.createWriteStream("output.txt");
source.pipe(dest);
```

---

## Decision Flow Chart

```
Need to work with files?
    ↓
Is the file small (< 10MB)?
    ↓ YES
Use fs.readFile() / fs.writeFile()
    ↓ NO
Is it a large file or do you need real-time processing?
    ↓ YES
Use Streams (createReadStream / createWriteStream)
    ↓
Need to copy/transfer data?
    ↓ YES
Use .pipe() method
```

---

## Key Takeaways

1. **fs module is built-in** - No installation needed
2. **Async vs Sync** - Use async for servers, sync for scripts
3. **Basic operations** - Good for small files (readFile, writeFile, appendFile)
4. **Streams** - Essential for large files (createReadStream, createWriteStream)
5. **Pipe** - Easy way to transfer data between streams
6. **Memory matters** - Streams use less memory by processing chunks
7. **UTF-8 encoding** - Always specify for text files to avoid gibberish

---

## Common Mistakes to Avoid

❌ **Using sync methods in web servers**
```javascript
app.get("/", (req, res) => {
    const data = fs.readFileSync("file.txt");  // Blocks all users!
});
```

❌ **Reading huge files with readFile**
```javascript
fs.readFile("10GB-file.txt", (err, data) => {
    // Crashes! Too much memory!
});
```

❌ **Forgetting error handling**
```javascript
fs.readFile("file.txt", (err, data) => {
    console.log(data);  // If file doesn't exist, app crashes!
});
```

✅ **Always handle errors**
```javascript
fs.readFile("file.txt", (err, data) => {
    if(err) {
        console.error("Error:", err);
        return;
    }
    console.log(data);
});
```

---

## Summary in One Sentence

**The fs module lets you read and write files—use basic methods for small files and streams for large files to avoid memory problems.**