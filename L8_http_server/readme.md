# Node.js HTTP Server

## Creating Your First HTTP Server

### The HTTP Core Module

Node.js includes a built-in `http` module that provides all the functionality you need to create web servers without any external dependencies. This module is part of Node.js's core, meaning you don't need to install anything with npm—just require it and start building. The http module gives you low-level control over how your server handles requests and responses, which is both powerful and educational. While you'll eventually use frameworks like Express that build on top of this module, understanding the raw http module teaches you exactly how web servers work under the hood.

The http module abstracts away the complex networking details—TCP connections, socket management, packet handling—and presents you with a simple, high-level API. You don't need to worry about accepting TCP connections, parsing HTTP headers manually, or formatting HTTP responses according to specification. The module handles all of this, letting you focus on application logic: what should happen when someone requests `/home` versus `/api/users`? What status code should you return? What content should you send back?

When you create a server with the http module, you're creating a program that listens on a specific port, waiting for HTTP requests to arrive. Each time a request comes in, Node.js invokes your callback function with two objects: the request object containing information about what the client asked for, and the response object you use to send data back. This callback-based model fits perfectly with Node.js's event-driven architecture—your server doesn't block waiting for requests; it registers a handler and Node.js calls it whenever requests arrive.

### Creating a Basic Server

The simplest possible HTTP server can be created with just a few lines of code. The `http.createServer()` method is the entry point—you pass it a function that will handle all incoming requests, and it returns a server object. This request handler function receives two parameters that Node.js provides: `req` (the incoming request) and `res` (the outgoing response). Every time a browser or client makes an HTTP request to your server, this function runs, giving you the opportunity to examine the request and construct an appropriate response.

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "text/plain"});
    res.end("Hello World! i am coming from a server");
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
```

This code creates a server that responds to every request with "Hello World!" Let's break down what's happening here. The `http.createServer()` call creates the server object, but it doesn't start listening yet—the server exists but isn't active. The actual listening begins when you call `server.listen(PORT)`, which tells the server to start accepting connections on the specified port. The callback function passed to `listen()` runs once when the server successfully starts—this is your confirmation that the server is ready to accept requests.

Inside the request handler, `res.writeHead(200, {"content-type": "text/plain"})` sets the HTTP response status code to 200 (success) and specifies that the content being returned is plain text. This line must come before sending any response body because HTTP protocol requires headers to be sent before the body. Then `res.end("Hello World!")` sends the response body and signals that the response is complete. The `end()` method is crucial—it tells Node.js you're done writing the response and the connection can be closed. If you forget to call `end()`, the browser will hang, waiting indefinitely for the server to finish.

### The Request and Response Objects

The `req` (request) object contains everything the client sent to your server. It includes properties like `req.url` (the path being requested, like `/home` or `/api/users`), `req.method` (the HTTP method like GET, POST, PUT, DELETE), and `req.headers` (an object containing all HTTP headers the client sent). These properties let you understand what the client wants so you can respond appropriately. The request object is also a readable stream, which means for requests with bodies (like POST requests), you can read the body data in chunks as it arrives.

The `res` (response) object is how you send data back to the client. It has methods for setting response headers (`res.writeHead()` or `res.setHeader()`), writing response body content (`res.write()`), and completing the response (`res.end()`). You can call `res.write()` multiple times to send chunks of data, which is useful for streaming large responses, but every response must eventually call `res.end()` to signal completion. Many developers combine writing and ending in one call: `res.end(data)` sends the data and ends the response in one operation.

Understanding the lifecycle of request and response is important. When a request arrives, Node.js creates the `req` and `res` objects and calls your handler. Your code examines the request, performs whatever logic is needed (maybe query a database, read a file, or process data), and then uses the response object to send data back. Once you call `res.end()`, that request-response cycle is complete, and Node.js can close the connection. If you try to use the response object after calling `end()`, Node.js will throw an error because the response is already finished.

---

## Building a Routing System

### What is Routing?

Routing is the process of determining how your server responds to different URL paths. When a user visits `/home`, they should see the homepage. When they visit `/api/users`, they should get user data. When they visit `/about`, they should see an about page. Routing is the mechanism that maps URLs to specific pieces of code that generate the appropriate response. Without routing, your server would respond the same way to every request, which is rarely useful.

In a raw Node.js http server, you implement routing manually by checking the `req.url` property and using conditional logic to decide what to do. This is more tedious than using a framework like Express (which has elegant routing built in), but it teaches you exactly what routing is—just conditional logic based on the requested URL. As your application grows, manual routing becomes cumbersome, which is why frameworks exist. But understanding how to build routing from scratch helps you appreciate what frameworks do for you and gives you the knowledge to debug or customize routing behavior when needed.

The routing pattern typically follows this structure: check what URL was requested, match it against known routes, execute the corresponding logic, and send back an appropriate response. For unmatched routes, you return a 404 error indicating the resource wasn't found. This pattern scales from simple applications with a few routes to complex applications with hundreds of endpoints, though at scale you'd use a framework that provides better route organization and matching.

### Implementing Multiple Routes

Building on the basic server, you can implement routing by checking `req.url` and branching to different code paths based on what was requested. Each route typically sends a different response with potentially different content types and status codes.

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    return res.end("Home");
  }
  else if(req.url === "/api/user") {
    const user = {
        name: "Anjan",
        age: 22,
        email: "anjan@example.com"
    }
    res.writeHead(200, { "content-type": "application/json" });
    const data = JSON.stringify(user);
    return res.end(data);
  } 
  else if(req.url === "/login") {
    res.writeHead(200, { "content-type": "text/plain" });
    return res.end("Login Page");
  } 
  else if(req.url === "/signup") {
    res.writeHead(200, { "content-type": "text/plain" });
    return res.end("Signup Page");
  }
  else {
    res.writeHead(404, { "content-type": "text/html" });
    return res.end("<h1>404 Page Not Found</h1>");
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

This code implements a simple routing system with five routes. Let's examine each one and understand the patterns at work. The root route (`/`) responds with plain text saying "Home". The `/api/user` route returns JSON data representing a user object. The `/login` and `/signup` routes return plain text for those pages. Finally, the `else` clause catches any unmatched URLs and returns a 404 error with HTML content.

Notice the use of `return res.end()` instead of just `res.end()`. This is a defensive programming technique. The `return` keyword exits the function immediately after sending the response, preventing any code below from executing. Without the return, JavaScript would continue to the next `else if` condition. While this wouldn't cause errors in this specific structure (because the else-if chain would naturally stop), using `return` makes your intent explicit and prevents bugs if you later refactor the code. It's saying "I've handled this request, we're done here."

### Understanding Content Types

The `content-type` header tells the browser what kind of data you're sending so it knows how to interpret and display it. This header is crucial because the same data can be interpreted differently based on content type. If you send HTML but specify `text/plain`, the browser will display the HTML tags as text rather than rendering them. If you send JSON but don't specify `application/json`, the browser might display it poorly formatted.

Common content types you'll use in web development include:

**`text/plain`** for plain text responses. The browser displays this as-is, without any formatting or interpretation. Good for simple messages or debugging output.

**`text/html`** for HTML content. The browser parses and renders the HTML, displaying formatted web pages with all the styling, structure, and interactivity HTML provides.

**`application/json`** for JSON data. This is the standard for API responses. The browser knows this is structured data, and if you're using tools like Postman or making fetch requests from JavaScript, the data will be automatically parsed into objects.

**`text/css`** for stylesheets, **`application/javascript`** for JavaScript files, **`image/jpeg`**, **`image/png`**, **`image/gif`** for images, and many others for different file types.

When building APIs, you'll almost always use `application/json` for data responses because JSON is the lingua franca of web APIs—every programming language can parse it, it's human-readable, and it maps naturally to JavaScript objects. When serving HTML pages, you'll use `text/html`. For error messages, either plain text or HTML works depending on whether you want formatted error pages.

---

## Working with JSON Responses

### APIs and JSON

Modern web applications are often built as Single Page Applications (SPAs) where the frontend (React, Vue, Angular) communicates with the backend through JSON APIs. The server doesn't send complete HTML pages; instead, it sends data as JSON, and the frontend JavaScript code constructs the user interface from that data. This separation of concerns—backend provides data, frontend handles presentation—is the foundation of modern web architecture.

When you build an API endpoint, you're creating a URL that returns data rather than HTML. The `/api/user` route in our example demonstrates this pattern. Instead of sending HTML for a user profile page, it sends raw user data as JSON. A frontend application could fetch this data and display it however it wants—maybe as a profile card, maybe as a row in a table, maybe as part of a dropdown menu. The backend doesn't care; it just provides the data.

The API pattern also enables multiple clients to use the same backend. A web application, a mobile app, and a command-line tool could all make requests to `/api/user` and receive the same JSON data, then each renders it appropriately for their platform. This is more maintainable than building separate backends for each client type or having the backend generate platform-specific HTML.

### Converting Objects to JSON

JavaScript has built-in methods for working with JSON: `JSON.stringify()` converts JavaScript objects to JSON strings, and `JSON.parse()` converts JSON strings to JavaScript objects. When sending JSON responses from your server, you must use `JSON.stringify()` because HTTP responses are transmitted as text—you can't send a JavaScript object directly over the network.

```javascript
const user = {
    name: "Anjan",
    age: 22,
    email: "anjan@example.com"
}

const data = JSON.stringify(user);
// data is now: '{"name":"Anjan","age":22,"email":"anjan@example.com"}'

res.writeHead(200, { "content-type": "application/json" });
return res.end(data);
```

The `JSON.stringify()` method converts the JavaScript object into a JSON-formatted string. Notice the result is a string—you can see the quotes around it. This string is what gets sent over the HTTP connection. The client receives this string and, if it's making the request from JavaScript, will typically use `JSON.parse()` to convert it back into a JavaScript object for easy manipulation.

It's important to set the content type to `application/json` when sending JSON data. This tells the client "this response body is JSON-formatted data," allowing the client to automatically parse it correctly. Many HTTP client libraries (like the fetch API in browsers or axios in Node.js) will automatically parse JSON responses when they see this content type, converting the string back to an object for you.

### Handling Different Data Types

Your server will often need to return different types of data depending on the route. Text responses for simple pages, JSON for API endpoints, HTML for rendered pages, and potentially binary data for file downloads. Each data type needs the appropriate content type header and proper formatting.

For text and HTML, you can pass the string directly to `res.end()`. For JSON, you must stringify objects first. For binary data (like images or files), you'd read the file as a Buffer and send that. The http module is flexible enough to handle all these cases—you just need to set the right content type and provide the data in the correct format.

Error responses also deserve attention. When something goes wrong, you should return an appropriate HTTP status code (like 400 for bad requests, 401 for unauthorized, 500 for server errors) along with helpful error information. For APIs, this is often JSON with an error message:

```javascript
res.writeHead(500, { "content-type": "application/json" });
return res.end(JSON.stringify({ error: "Something went wrong" }));
```

For HTML pages, you might return a formatted error page:

```javascript
res.writeHead(404, { "content-type": "text/html" });
return res.end("<h1>404 - Page Not Found</h1>");
```

The key is consistency—choose a pattern for each type of response and stick to it throughout your application.

---

## HTTP Status Codes

### Understanding Status Codes

Every HTTP response includes a three-digit status code that indicates the result of the request. These codes are grouped into five classes based on their first digit: 1xx (informational), 2xx (success), 3xx (redirection), 4xx (client error), and 5xx (server error). Proper use of status codes helps clients understand what happened and how to handle the response. Browsers, API clients, and monitoring tools all rely on status codes to make decisions.

The most important status codes for web development are:

**200 OK** - The request succeeded and here's the response. This is what you return for successful GET requests, successful API calls, and successfully rendered pages. It's the "everything worked" status.

**201 Created** - Used for successful POST requests that create new resources. If a user submits a form to create a new account and it succeeds, you'd return 201 instead of 200 to specifically indicate that something new was created.

**204 No Content** - The request succeeded but there's no response body. Common for DELETE requests or updates where you don't need to send data back.

**400 Bad Request** - The client sent invalid data. Maybe a required field is missing, or data is in the wrong format. This is a client error—they need to fix their request.

**401 Unauthorized** - The request requires authentication and none was provided or the authentication failed. The client needs to log in or provide valid credentials.

**403 Forbidden** - The client is authenticated but doesn't have permission to access this resource. They're logged in but not authorized for this specific action.

**404 Not Found** - The requested resource doesn't exist. The URL doesn't match any route your server handles.

**500 Internal Server Error** - Something went wrong on the server. This is a server error—the client's request was fine, but your code encountered a problem (like a database error or an unhandled exception).

Using correct status codes makes your API well-behaved and predictable. Client code can check the status code to determine how to handle responses—retry on 500, redirect to login on 401, show a not-found page on 404, display the data on 200.

### Setting Status Codes

In the raw http module, you set status codes with `res.writeHead()`, providing the status code as the first argument. You typically combine this with headers in a single call:

```javascript
res.writeHead(200, { "content-type": "application/json" });
res.writeHead(404, { "content-type": "text/html" });
res.writeHead(500, { "content-type": "application/json" });
```

If you forget to call `writeHead()`, Node.js defaults to a status code of 200, which might not be accurate if an error occurred. Always explicitly set status codes to match the actual result of the request. This is especially important for error conditions—returning 200 when an error occurred misleads clients into thinking the request succeeded.

Modern frameworks like Express make this easier with methods like `res.status(404).send("Not found")`, but understanding the low-level approach helps you appreciate what frameworks do and gives you the knowledge to work with raw http when needed.

---

## Key Concepts Summary

**HTTP server basics:**
- `http.createServer()` creates a server with a request handler function
- The handler receives `req` (request) and `res` (response) objects
- `server.listen(PORT)` starts the server listening for connections
- Always call `res.end()` to complete responses

**Routing implementation:**
- Check `req.url` to determine what was requested
- Use conditional logic (if/else) to match routes
- Return appropriate responses for each route
- Return 404 for unmatched routes
- Use `return res.end()` to prevent further execution

**Content types and data formats:**
- Set `content-type` header to tell clients how to interpret data
- Use `text/plain` for simple text, `text/html` for HTML, `application/json` for JSON
- Call `JSON.stringify()` to convert objects to JSON strings before sending
- Different routes can return different content types

**HTTP status codes:**
- 200 = success, 404 = not found, 500 = server error
- Use appropriate codes to indicate request results
- Set status with `res.writeHead(statusCode, headers)`
- Status codes help clients handle responses correctly

---

## Why Raw HTTP Matters

While you'll likely use Express or another framework for real projects, understanding the raw http module is invaluable. It demystifies what frameworks do—Express is just a wrapper around this same http module that provides convenient methods for routing, middleware, and response handling. When you use `app.get('/users', handler)` in Express, it's ultimately calling `http.createServer()` and doing conditional URL matching just like we did manually.

Understanding raw HTTP also helps you debug issues. When an Express server behaves unexpectedly, knowing that it's just managing request and response objects helps you reason about what's happening. You can drop down to the raw req and res objects in Express to access lower-level functionality when needed. And in some cases—like building extremely high-performance servers or specialized protocols—you might actually want the low-level control that raw http provides.

Finally, this knowledge transfers to other platforms. The concepts of request handlers, routing, status codes, and content types are universal across web servers in any language. Whether you're working with Python's Flask, Ruby's Sinatra, or Go's net/http package, the patterns are similar. Master them in Node.js's http module, and you've learned principles that apply broadly to web development.