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
            return Object.assign({}, {...item}, {error: errors[item.name]}, {value: ''});
        }
    });
}

function setFieldValue(fields, field) {
    return fields.map((item) => {
        return item.name === field.name ? Object.assign({}, {...item}, {value: field.value}) : item;
    });
}

function cleanFields(fields) {
    return fields.map((item) => {
        return Object.assign({}, {...item}, {error: ''}, {value: ''});
    });
}

dispatcher.register((action) => {

    switch (action.type) {

        case actionTypes.VALIDATION_ERROR:
            fields = setErrors(fields, action.errors);
            FieldsStore.emitChange();
            break;

        case actionTypes.CLEAN_FIELDS:
            fields = cleanFields(fields);
            FieldsStore.emitChange();
            break;

        case actionTypes.SET_FIELD_VALUE:
            fields = setFieldValue(fields, action.field);
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
