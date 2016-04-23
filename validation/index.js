const EMPTY_SPACES_REGEX = /^\s+$|^$/gi;
const EMPTY_SPACES_ERROR = 'Field is empty';

export function validate(data) {

    const errors = {};
    Object.keys(data).forEach((key) => {

        if (data[key].match(EMPTY_SPACES_REGEX)) {
            errors[key] = EMPTY_SPACES_ERROR;
        }
    });

    return {
        isValid: !Object.keys(errors).length,
        invalidFields: errors
    };
}
