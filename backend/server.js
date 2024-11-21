const express = require("express");

const app = express();

const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/merndb")
    .then(() => {
        console.log("Connected Successfully")

        app.listen(4000, () => {
            console.log("server is running ");
        });

    })
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.status(200).send("<h1> jai maata di </h1>");
});
