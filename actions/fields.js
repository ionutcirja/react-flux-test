import dispatcher from '../dispatcher'
import * as actionTypes from '../constants/action-types'

export function setFieldValue(name, value) {

    dispatcher.dispatch({
        type: actionTypes.SET_FIELD_VALUE,
        field: {name: name, value: value}
    });
}
