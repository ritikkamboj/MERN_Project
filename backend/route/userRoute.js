const mongoose = require('mongoose');
const express = require('express')
const app = express();

const User = require('./../models/userModel');

app.use(express.json())



const router = express.Router();

router.get("/getAllUsers", async (req, res) => {
    try {
        const allUsers = await User.find();

        res.status(200).json({
            success: true,
            results: allUsers.length,
            data: allUsers
        })

    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.messages
        })

    }

});

router.post('/newUser', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newUser = await User.create({ name: name, email: email, age: age });

        res.status(201).json({
            success: true,
            data: newUser
        })

    }
    catch (err) {
        res.status(500).json({
            message: false,
            message: err.message
        })

    }


});

router.get('/getUser/:id', async (req, res) => {

    const { id } = req.params;
    try {

        const singleUser = await User.findById({ _id: id });

        res.status(200).json({
            success: true,
            data: singleUser
        });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

})

router.delete('/delUser/:id', async (req, res) => {

    const { id } = req.params;
    try {

        const delUser = await User.findByIdAndDelete({ _id: id })

        res.status(200).json({
            success: true,
            data: delUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
})


router.patch('/updateUser/:id', async (req, res) => {

    const { id } = req.params;
    const { name, email, age } = req.body;
    try {

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        res.status(200).json({
            success: true,
            data: updatedUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
})

module.exports = router;
