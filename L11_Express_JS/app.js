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
// open web: http://localhost:8000/api/v1/home
app.get("/api/v1/user/home", (req,res) => { // first arg: is string route and second arg: is callback function
 
    res.send("<h1> Home Page </h1>")
});

// open web: http://localhost:8000/api/v1/about
app.get("/api/v1/user/about", (req,res) => {
 
    res.send("<h1> About Page </h1>")
});


// open web: http://localhost:8000/api/v1/profile
app.get("/api/v1/user/profile", (req, res) => {
    res.status(200).json({
        success: true,
        user: {
            Username: "Anjan012",
            email: "anjan@example.com"
        }
    })
});

// lets says i want a single product--------
// in frontend we call it a dynamic route but in here we call it /api/ - api and productId a variable
app.use("/api/v1/user/product/:productId/comment/:commentId", (req, res) => {

    // req.params is an object 
    // const productId = req.params.productId; // params is provided by express, here we are extracting the productId from url
    const {productId, commentId} = req.params; // destructuring 
    console.log(productId, commentId);

    const product = {
        id : "123",
        name: "Macbook M1 pro"
    }

    res.status(200).json({
        success: true,
        product
    })
    

});

// open web: http://localhost:8000/api/v1/user/product/5676/comment/321

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Sever is listening at port ${PORT}`);
})