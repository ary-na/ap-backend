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

    async sendEmail(email, name, message) {
        const mailOptions = {
            from: `Arian N. Yamchelo<${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: `I got your message, ${name}!`,
            html: this.createHtml(email, name, message),
        }

        return await this.transporter.sendMail(mailOptions)
    }

    createHtml(email, name, message) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="This is an automated email response you will receive after submitting the &ldquo;Contact Me&rdquo; form on Arian N. Yamchelo&apos;s portfolio website.">
            <meta name="author" content="Arian Najafi Yamchelo">
            <title>I got your message, ${name}!</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz@9..144&family=Open+Sans&display=swap" rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
        
                html {
                    background-color: #15616d;
                }
        
                body {
                    background-color: #f2f4f3;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 16px;
                    line-height: 2;
                    color: #001524;
                }
        
                main {
                    padding: 1em;
                }
        
                div {
                    background: rgba(242, 244, 243, 0.4);
                    border-radius: 10px;
                    padding: 1em;
                    margin: 0;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
        
                ul {
                    list-style: none;
                    margin: 1.5em 0;
                }
        
                span {
                    display: block;
                    text-align: center;
                    font-style: italic;
                    font-size: small;
                }
        
                h2 {
                    font-family: 'Fraunces', serif;
                    text-align: center;
                    padding: 1em;
                }
        
                a {
                    text-decoration: none;
                    color: #15616d;
                }
        
                @media screen and (min-width: 768px) {
                    main {
                        padding: 2.5em;
                    }
        
                    div {
                        padding: 2.5em;
                    }
        
                    ul {
                        margin: 3em 0;
                    }
                }
            </style>
        </head>
        <body>
        <main>
            <div>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for your message. I have received the following details from you:</p>
        
                <ul>
                    <li><strong>Name:</strong></li>
                    <li>${name}</li>
                </ul>
                <ul>
                    <li><strong>Email:</strong></li>
                    <li>${email}</li>
                </ul>
                <ul>
                    <li><strong>Message:</strong></li>
                    <li>${message}</li>
                </ul>
        
                <span>Feel free to reply to this email with any additional information, and I will be in touch with you as soon as possible.</span>
            </div>
        </main>
        <footer>
            <h2><a href="#">Arian N. Yamchelo</a></h2>
        </footer>
        </body>
        </html>
        `
    }
}

// Export the Utils class as a module.
module.exports = new Utils()
