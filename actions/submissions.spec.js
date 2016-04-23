import dispatcher from '../dispatcher'
import * as submissions from './submissions'
import * as validations from '../validation'
import fieldsStore from '../stores/fields'

describe('Submissions actions', () => {

    beforeEach(() => {
        spyOn(dispatcher, 'dispatch');
    });

    describe('addSubmission', () => {

        it('should dispatch a VALIDATION_ERROR action if submission is invalid', () => {
            const fields = [{name: 'field', value: ''}];
            spyOn(fieldsStore, 'getState').and.returnValue({fields: fields});
            const invalidFields = {field: 'Invalid'};
            spyOn(validations, 'validate').and.returnValue({isValid: false, invalidFields: invalidFields});

            submissions.addSubmission();
            expect(fieldsStore.getState).toHaveBeenCalled();
            expect(validations.validate).toHaveBeenCalledWith({field: ''});
            expect(dispatcher.dispatch).toHaveBeenCalledWith({type: 'VALIDATION_ERROR', errors: invalidFields});
        });

        it('should dispatch a CLEAN_FIELDS and a ADD_SUBMISSION action if submission is valid', () => {
            const fields = [{name: 'field', value: 'some value'}];
            spyOn(fieldsStore, 'getState').and.returnValue({fields: fields});
            spyOn(validations, 'validate').and.returnValue({isValid: true});

            submissions.addSubmission();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(2);
            expect(dispatcher.dispatch.calls.argsFor(0)).toEqual([{type: 'ADD_SUBMISSION', submission: {field: 'some value'}}]);
            expect(dispatcher.dispatch.calls.argsFor(1)).toEqual([{type: 'CLEAN_FIELDS'}]);
        });
    });
});
