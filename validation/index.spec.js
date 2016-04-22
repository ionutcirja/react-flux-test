import { validate } from './index'

describe('Form validation', () => {

    it('should return an object with a isValid property set to false and an object containing a list of errors if a field is invalid', () => {
        expect(validate({field: ''})).toEqual({isValid: false, invalidFields: {field: 'Field is empty'}});
        expect(validate({field: '  '})).toEqual({isValid: false, invalidFields: {field: 'Field is empty'}});
    });

    it('should return an object with a isValid property set to true and an object containing an empty list of errors if a field is valid', () => {
        expect(validate({field: 'non empty field'})).toEqual({isValid: true, invalidFields: {}});
    });
});
