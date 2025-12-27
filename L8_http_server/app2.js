const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "content-type": "text/plain",
    });
    return res.end("Home"); // if you don't return anything the server keeps loading
  }
  else if(req.url === "/api/user") {
    const user = {
        name: "Anjan",
        age: 22,
        email: "anjan@example.com"
    }
    res.writeHead(200, {
      "content-type": "application/json", // setting content type as json
    });

    const data = JSON.stringify(user); // stringify method to convert js object to json string

    return res.end(data); 
  } else if(req.url === "/login") {
    res.writeHead(200, {
      "content-type": "text/plain",
    });
    return res.end("Login Page");
  } else if(req.url === "signup") {
    res.writeHead(200, {
      "content-type": "text/plain",
    });
    return res.end("Signup Page");
  }else {
     res.writeHead(404, {
      "content-type": "text/html",
    });
    return res.end("<h1>404 Page Not Found</h1>");
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
