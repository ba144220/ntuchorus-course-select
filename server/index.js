// imports
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;
const app = express();

console.log(__dirname);
app.get("/", (req, res) => {
    //res.send("Hello to ntuchorus");
    console.warn("connect");
    res.sendFile(__dirname + "/test/index.html");
});
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
