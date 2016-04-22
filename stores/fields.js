import dispatcher from '../dispatcher'
import Store from './abstract-store'
import * as actionTypes from '../constants/action-types'

let fields = [
    {
        name: 'advertiser',
        label: 'Advertiser',
        placeholder: '',
        value: '',
        error: ''
    },
    {
        name: 'brand',
        label: 'Brand',
        placeholder: '',
        value: '',
        error: ''
    },
    {
        name: 'product',
        label: 'Product',
        placeholder: '',
        value: '',
        error: ''
    }
];

function setErrors(fields, errors) {

    const errorIndexes = Object.keys(errors).map((key) => {
        return fields.map((item) => item.name).indexOf(key);
    });

    return fields.map((item, index) => {
        if (errorIndexes.indexOf(index) < 0) {
            return Object.assign({}, {...item}, {error: ''});
        } else {
            return Object.assign({}, {...item}, {error: errors[item.name]});
        }
    });
}

function removeAllErrors(fields) {
    return fields.map((item) => {
        return Object.assign({}, {...item}, {error: ''});
    });
}

dispatcher.register((action) => {

    switch (action.type) {

        case actionTypes.VALIDATION_ERROR:
            fields = setErrors(fields, action.errors);
            FieldsStore.emitChange();
            break;

        case actionTypes.REMOVE_ALL_ERRORS:
            fields = removeAllErrors(fields);
            FieldsStore.emitChange();
            break;
    }
});

const FieldsStore = Object.assign({}, Store, {

    getState() {
        return {
            fields: fields
        };
    }
});

export default FieldsStore;
