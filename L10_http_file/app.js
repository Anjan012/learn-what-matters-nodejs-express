const http = require("http");

const fs = require("fs");

const server = http.createServer((req, res) => {

    res.writeHead (
        200,
        {
            'Content-Type': "text/html"
        }
    )

    const filePath = __dirname + "/index.html"; 
    // console.log(filePath);

    const htmlContent = fs.readFileSync(filePath);

    res.end(htmlContent);

});

server.listen(3000);