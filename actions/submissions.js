import dispatcher from '../dispatcher'
import { validate } from '../validation'
import * as actionTypes from '../constants/action-types'
import fieldsStore from '../stores/fields'

export function addSubmission() {

    const fields = fieldsStore.getState().fields;
    const submission = fields.reduce((result, item) => {
        result[item.name] = item.value;
        return result;
    }, {});
    const validateFields = validate(submission);

    if (validateFields.isValid) {

        dispatcher.dispatch({
            type: actionTypes.ADD_SUBMISSION,
            submission: submission
        });

        dispatcher.dispatch({
            type: actionTypes.CLEAN_FIELDS
        });
    } else {

        dispatcher.dispatch({
            type: actionTypes.VALIDATION_ERROR,
            errors: validateFields.invalidFields
        });
    }
}
