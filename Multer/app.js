import express from 'express';
import cookieParser from "cookie-parser";
import { upload } from './config/multerconfig.js';

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true})); // urlencoded extended true used for handing the form data in jsobject format 
app.use(cookieParser()); 
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "hello"
    })
})

app.get("/test", (req, res) => {
    res.render("test");
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file);
});

app.listen(3000, () => {
    console.log(`Server is running at port: 3000`);
});