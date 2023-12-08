// @file ./Utils.js

// Setup dependencies for the Utils class.
const emailValidator = require('email-validator')

class Utils {
    validateName(name) {
        const excludedNames = ['Test', 'test', 'Admin', 'admin', 'User', 'user']
        const nameRegexPattern = `^(?!${excludedNames.join('|')}$)[A-Za-z\\s'-]+$`
        const nameRegex = new RegExp(nameRegexPattern)

        return nameRegex.test(name)
    }

    validateEmail(email) {
        return emailValidator.validate(email)
    }

    validateMessage(message) {
        const messageRegexPattern = /^[a-zA-Z0-9,.!?()\s]+$/
        const messageRegex = new RegExp(messageRegexPattern)

        return messageRegex.test(message)
    }
}

// Export the Utils class as a module.
module.exports = new Utils()