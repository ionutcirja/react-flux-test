import dispatcher from '../dispatcher'
import { validate } from '../validation'
import * as actionTypes from '../constants/action-types'

export function addSubmission(data) {

    const validateFields = validate(data);

    if (validateFields.isValid) {

        dispatcher.dispatch({
            type: actionTypes.REMOVE_ALL_ERRORS
        });

        dispatcher.dispatch({
            type: actionTypes.ADD_SUBMISSION,
            submission: data
        });
    } else {

        dispatcher.dispatch({
            type: actionTypes.VALIDATION_ERROR,
            errors: validateFields.invalidFields
        });
    }
}
