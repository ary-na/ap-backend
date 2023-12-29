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
        const messageRegexPattern = /^[a-zA-Z0-9,.!?():'\s"-]+$/
        return new RegExp(messageRegexPattern).test(message)
    }

    async sendEmail(email, name, message) {
        const mailOptions = {
            from: `Arian N. Yamchelo<${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: `Automatic reply: I got your message, ${name}!`,
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
            <title>Automatic reply: I got your message, ${name}!</title>
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
    
                .main {
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
    
                svg {
                    width: 60px;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                    padding-top: 1em;
                }
    
                .footer {
                    display: flex;
                    justify-content: center;
                }
    
                @media screen and (min-width: 768px) {
                    main {
                        padding: 2.5em;
                    }
    
                    .main {
                        padding: 2.5em;
                    }
    
                    ul {
                        margin: 3em 0;
                    }
                    
                    svg {
                        padding-top: 0;
                    }
                }
            </style>
        </head>
        <body>
        <main>
            <div class="main">
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
            <div class="footer">
                <a href="https://ariannyamchelo.netlify.app" target="_blank" aria-label="Arian N. Yamchelo's website link">
                    <svg viewBox="0 0 13712 19801" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7655.25 12696.4C7793.73 12384.7 7763.74 12023.8 7575.7 11739.2L0.521484 273.535L13711.6 10589.6L4499.56 19800.5L7655.25 12696.4Z" fill="#197280"/>
                        <path d="M7666.05 12696.9C7773.94 12454.9 7781.35 12179.9 7686.66 11932.4L3121.57 0.464844L13711.6 10589.5L4499.57 19800.5L7666.05 12696.9Z" fill="#1D8596"/>
                        <path d="M7982.8 11959.3C8096.65 11703 8097.65 11410.6 7985.53 11153.5L3121.57 0.464844L13711.6 10589.5L4499.57 19800.5L7982.8 11959.3Z" fill="#15616D"/>
                        <path d="M12619.5 10730.1L12804.4 10545.2L12811.4 10550.2L12623.7 10737.9L12619.5 10730.1ZM12817.4 10910.4C12817.9 10910.9 12818.2 10911.6 12818.2 10912.5C12818.4 10913.3 12818.2 10914 12817.4 10914.7L12716 11016.1C12715.3 11016.8 12714.4 11017.2 12713.5 11017.2C12712.6 11017.2 12711.8 11017 12711.4 11016.5C12710.7 11015.8 12710.6 11015 12711 11014C12711 11013.1 12711.4 11012.2 12712.1 11011.5L12723.4 10990.3C12727.6 10981.8 12729.6 10971.4 12729.4 10958.9C12728.9 10946.1 12723.3 10929.9 12712.4 10910.1L12426.8 10380.4C12421.8 10371.3 12415.9 10365.8 12409.1 10364.2C12402.5 10362.3 12394.2 10364.2 12384.3 10369.8C12381.3 10370.5 12378.9 10371.3 12377.3 10372C12375.9 10372.4 12374.9 10372.4 12374.4 10372C12373.5 10371 12373.1 10370.2 12373.4 10369.5C12373.6 10368.8 12374.2 10368 12375.1 10367L12486.5 10255.6C12487.5 10254.7 12488.3 10254.1 12489 10253.9C12489.7 10253.6 12490.5 10254 12491.5 10254.9C12491.9 10255.4 12492.1 10256.5 12491.8 10258.1C12491.3 10259.5 12490.4 10261.7 12489 10264.5C12482.6 10271.8 12479.8 10277.2 12480.5 10280.7C12481.2 10283.8 12485.2 10287.1 12492.5 10290.6L13089.7 10597.2C13097.5 10601.2 13104.8 10602.6 13111.6 10601.4C13118.4 10600.2 13125.2 10596.8 13131.8 10591.2C13133.2 10590.2 13134.3 10589.7 13135.3 10589.7C13136 10589.5 13136.7 10589.7 13137.4 10590.5C13137.9 10590.9 13138.1 10591.6 13138.1 10592.6C13138.4 10593.3 13138 10594.1 13137.1 10595.1L13004.5 10727.6C13003.8 10728.3 13002.9 10728.7 13002 10728.7C13001.1 10728.7 13000.3 10728.5 12999.9 10728C12999.2 10727.3 12999.1 10726.5 12999.5 10725.5C13000 10724.6 13000.6 10723.5 13001.3 10722.3L13018.3 10701.1C13022.5 10694.5 13023.8 10689 13022.2 10684.5C13020.3 10679.8 13016 10675.8 13009.4 10672.5L12425.7 10370.9L12420.1 10351.1L12719.5 10905.1C12725.4 10916.2 12732.4 10923.9 12740.4 10928.1C12748.4 10932.3 12757.1 10933.8 12766.5 10932.3C12775.7 10930.7 12785.4 10926.9 12795.5 10921L12812.5 10911.1C12813.7 10910.4 12814.7 10910.1 12815.7 10910.1C12816.4 10909.8 12817 10910 12817.4 10910.4Z" fill="#1D8596"/>
                    </svg>
                    <h2>Arian N. Yamchelo</h2>
                </a>
            </div>
        </footer>
        </body>
        </html>
        `
    }
}

// Export the Utils class as a module.
module.exports = new Utils()
