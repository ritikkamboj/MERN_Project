// const User = require('./models/userModel');

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const dotenv = require('dotenv');


dotenv.config();


app.use(express.json())


const userRouter = require('./route/userRoute');
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

app.use(userRouter);