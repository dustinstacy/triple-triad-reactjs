import validator from 'validator'

const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)

const validateRegisterInput = (data) => {
    let errors = {}
    const { username, email, password, confirmPassword } = data

    if (isEmpty(username)) {
        errors.username = 'Username field cannot be empty'
    } else if (!validator.isLength(username, { min: 2, max: 25 })) {
        errors.username = 'Username must be between 2 and 25 characters long'
    }

    if (isEmpty(email)) {
        errors.email = 'Email field cannot be empty'
    } else if (!validator.isEmail(email)) {
        errors.email = 'Email is invalid, please provide a valid email'
    }

    if (isEmpty(password)) {
        errors.password = 'Password field cannot be empty'
    } else if (!validator.isLength(password, { min: 6, max: 150 })) {
        errors.password = 'Password must be between 6 and 150 characters long'
    }

    if (isEmpty(confirmPassword)) {
        errors.confirmPassword = 'Confirm password field cannot be empty'
    } else if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword = 'Passwords do not match'
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}

export default validateRegisterInput
