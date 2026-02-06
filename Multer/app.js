import express from 'express';
import crypto from "crypto";
import path from "path";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true})); // urlencoded extended true used for handing the form data in jsobject format 
app.use(cookieParser()); 
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    // crypto is the built in nodejs module
    crypto.randomBytes(12, (err, bytes) => {
        console.log(bytes) // bytes gives us the buffer 
        // path.extname takes out the extension from file
        const fn = bytes.toString("hex") + path.extname(file.originalname);
        cb(null, fn); // first is the error sencond is the fn is file name
    })
  }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpg', 'image/jpeg'];

    if(allowedMimeTypes.includes(file.mimetype)){

        cb(null, true);
    }else {
        cb(new Error("Only .jpg and .jpeg files are allowed!"), false);
    }
}

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 *1024,
        files: 1
    }
});

app.get("/", (req, res) => {
    res.status(200).json({
        message: "hello"
    })
})

app.get("/test", (req, res) => {
    res.render("test");
});

app.post("/upload", upload.single("image"), (req, res) => {
    res.render("test");
});

app.listen(3000, () => {
    console.log(`Server is running at port: 3000`);
});