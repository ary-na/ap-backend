// @file    ./index.js

// Dependencies ----------------------------------------------------------------
const Utils = require("./Utils")

// Contact me handler
exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body)

        // Check if body is missing.
        if (!body.name || !body.email || !body.message) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Body is missing!"})
            }
        }

        const {name, email, message} = body

        // Validate body.
        if (!Utils.validateName(name) || !Utils.validateEmail(email) || !Utils.validateMessage(message)) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: "Invalid body provided!"})
            }
        }

        // Send email
        await Utils.sendEmail(email, `I got your message ${name}`, `Name: ${name}\nEmail: ${email}\nMessage: ${message}`)

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Email sent successfully!'})
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal server error.'})
        }
    }
}