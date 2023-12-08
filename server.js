// @file    ./server.js

// Dependencies ----------------------------------------------------------------
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const nodemailer = require('nodemailer')
const Utils = require("./Utils")
const port = process.env.PORT || 3000

// Express app setup and middleware --------------------------------------------
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("*", cors())

// Setup routes ----------------------------------------------------------------

// - Contact me route
app.post('/contact', async (req, res) => {
    try {
        // Check if body is missing.
        if (!req.body.name || !req.body.email || !req.body.message)
            return res.status(400).json({
                message: "Body is missing!"
            })

        // Validate body.
        if (!Utils.validateName(req.body.name) || !Utils.validateEmail(req.body.email) || !Utils.validateMessage(req.body.message))
            return res.status(400).json({
                message: "Invalid body provided!"
            })

        const {name, email, message} = req.body
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            },
        })

        // Setup email data
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: `I got your message ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Message sent: ${info.messageId}`);
        res.send('Email sent successfully!');

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error.');
    }
})

// Run app (Listen on port) ----------------------------------------------------
app.listen(port, () => {
    console.log(`The app is running on port ${port}.`)
})