// we can also do using path module

const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http.createServer((req, res) => {
    res.writeHead(
        200,
        {
            'Content-Type': "text/html"
        }
    );

    const dirPath = path.join(__dirname, '/index.html');
    const htmlContent = fs.readFileSync(dirPath);

    res.end(htmlContent);
});

server.listen(3000);