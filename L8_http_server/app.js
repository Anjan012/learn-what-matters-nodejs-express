// http is also a core module, so we can require it
const http = require("http");

// creating a server
const server = http.createServer((req, res) => { // createServer method takes a callback function with request and response objects

    // setting up the response header
    res.writeHead(200, {"content-type": "text/plain"}); // writeHead method to write the response header with status code and content type
    res.end("Hello World! i am coming from a server"); // end method to send the response body and end the response

});

// we have created a server, now we need to make it listen to a specific port and hostname
const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// go to browser and type localhost:8000 to see the response from the server