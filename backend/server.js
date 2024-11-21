const express = require("express");

const app = express();

const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();


mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log("Connected Successfully")

        app.listen(process.env.PORT || 5000, (err) => {
            if (err)
                console.log(err.message);

            console.log("server is running ", process.env.PORT);
        });

    })
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.status(200).send("<h1> jai maata di </h1>");
});
