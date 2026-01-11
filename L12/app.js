// const express = require('express'); // old way
import express from "express"; // change "type": "module" in package.json
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config(); // now we can access .env using process.env.name (always put it in top)

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true})); // whenever we send the data from the client side makes sure it is in the readable format

app.post("/api/v1/user/register", (req, res) => {
    // const {name, email, password} = req.body;
    const obj = req.body;
    console.log(obj);

    res.status(200).json({
        success: true,
        message:"Account created successfully"
    })
})

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
});




// The file which can be regenerate we don't push that in git/production
// .env contains sensetive data don't push in git

