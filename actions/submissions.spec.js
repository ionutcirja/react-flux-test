import dispatcher from '../dispatcher'
import * as submissions from './submissions'
import * as validations from '../validation'

describe('Submissions actions', () => {

    beforeEach(() => {
        spyOn(dispatcher, 'dispatch');
    });

    describe('addSubmission', () => {

        it('should dispatch a VALIDATION_ERROR action if submission is invalid', () => {
            const invalidFields = {brand: 'Invalid'};
            spyOn(validations, 'validate').and.returnValue({isValid: false, invalidFields: invalidFields});

            submissions.addSubmission({brand: 'some brand'});
            expect(dispatcher.dispatch).toHaveBeenCalledWith({type: 'VALIDATION_ERROR', errors: invalidFields});
        });

        it('should dispatch a REMOVE_ALL_ERRORS and a ADD_SUBMISSION action if submission is valid', () => {
            const submission = {brand: 'some brand'};
            spyOn(validations, 'validate').and.returnValue({isValid: true});

            submissions.addSubmission(submission);
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(2);
            expect(dispatcher.dispatch.calls.argsFor(0)).toEqual([{type: 'REMOVE_ALL_ERRORS'}]);
            expect(dispatcher.dispatch.calls.argsFor(1)).toEqual([{type: 'ADD_SUBMISSION', submission: submission}]);
        });
    });
});
