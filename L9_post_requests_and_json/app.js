// handling a form data submission using HTTP server in Node.js
// handle POST request to receive form data
// you can test this using Postman or any API testing tool by sending a POST request to http://localhost:8000/submit with raw JSON body

const http = require("http");

const server = http.createServer((req, res) => {
  
    // GET, POST, PUT, DELETE, PATCH
    if(req.method === "POST" && req.url === "/submit") {
        let body = ""; // i have to receive data from client, since we are using normal node js http module we will receive data in chunks

        req.on("data", (chunk) => { // using on event listener to receive data in chunks
            body += chunk.toString(); // append each chunk to body => Example: Hello => ascii value we use toString() to convert buffer to string
        })

        // End event triggered when all data is received
        req.on("end", () => {
            console.log("Received form data:", body);
            console.log(JSON.parse(body));
            res.writeHead(
                200,
                {
                    "Content-Type": "application/json"
                }
            )
            res.end(JSON.stringify({ success: true, message: "Form data received successfully", data: body }));
        })
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({
            message: "Not Found",
            success: false
        }));
    }

});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
