// imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoute = require("./routes/users");
const coursesRoute = require("./routes/courses");

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", usersRoute);
app.use("/courses", coursesRoute);

app.get("/", (req, res) => {
    //res.send("Hello to ntuchorus");
    console.warn("connect");
    res.sendFile(__dirname + "/test/index.html");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
    )
    .catch((error) => console.log(`${error} did not connect`));
