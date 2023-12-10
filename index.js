// @file    ./index.js

// Dependencies ----------------------------------------------------------------
const Utils = require("./Utils")

// Setup routes ----------------------------------------------------------------

// - Contact me route
exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body)

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

        // Send email
        const info = await Utils.sendEmail(email, `I got your message ${name}`, `Name: ${name}\nEmail: ${email}\nMessage: ${message}`)

        console.log(`Message sent: ${info.messageId}`);
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Email sent successfully!'})
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal server error.'})
        }
    }
}