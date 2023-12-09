// @file    ./index.js

// Dependencies ----------------------------------------------------------------
require("dotenv").config()
const nodemailer = require('nodemailer')
const Utils = require("./Utils")

// Setup routes ----------------------------------------------------------------

// - Contact me route
exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);

        // Check if body is missing.
        if (!body.name || !body.email || !body.message)
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Body is missing!"})
            }

        // Validate body.
        if (!Utils.validateName(body.name) || !Utils.validateEmail(body.email) || !Utils.validateMessage(body.message))
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Invalid body provided!"})
            }

        const {name, email, message} = body
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
        }

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Message sent: ${info.messageId}`);
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Email sent successfully!'})
        }

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal server error.'})
        }
    }
}