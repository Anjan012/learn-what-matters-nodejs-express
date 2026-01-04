// To get started with express open terminal change the directory where you want your express server
// Terminal: npm init -y  (a package.json will get create to manages the packages and keep their version as well) for custom npm init
// install express Terminal: npm i express (or) npm install express
// devdependencies: development mode
// dependencies: production mode 

const express = require("express");

// creating web server

const app = express(); // app will get all the api's .. of express

// app.get 
// app.post
// app.put
// app.patch
// app.delete

// building home route
app.get("/home", (req,res) => {
    
    const user = {
        name: "Anjan",
        age: 22, 
        email: "anjan@example.com"
    }
    res.send(user)
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Sever is listening at port ${PORT}`);
})