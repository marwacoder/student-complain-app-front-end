const pattern =  (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const phone = (/^\+?\d{3}[- ]?\d{3}[- ]?\d{5}$/)

const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        isValid = pattern.test(value) && isValid;
    }
    if (rules.isPhone) {
        isValid = phone.test(value) && isValid
    }
    

    return isValid;
}

export default checkValidity;