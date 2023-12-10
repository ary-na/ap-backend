// @file ./Utils.js

// Setup dependencies for the Utils class.
require("dotenv").config()
const nodemailer = require('nodemailer')
const emailValidator = require('email-validator')

class Utils {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            },
        })
    }

    validateName(name) {
        const excludedNames = ['Test', 'test', 'Admin', 'admin', 'User', 'user']
        const nameRegexPattern = `^(?!${excludedNames.join('|')}$)[A-Za-z\\s'-]+$`
        return new RegExp(nameRegexPattern).test(name)
    }

    validateEmail(email) {
        return emailValidator.validate(email)
    }

    validateMessage(message) {
        const messageRegexPattern = /^[a-zA-Z0-9,.!?()\s]+$/
        return new RegExp(messageRegexPattern).test(message)
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to,
            subject,
            text,
        }

        return await this.transporter.sendMail(mailOptions)
    }
}

// Export the Utils class as a module.
module.exports = new Utils()
