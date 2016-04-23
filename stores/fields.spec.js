import Store from './fields'
import dispatcher from '../dispatcher'

describe('Fields Store', () => {

    beforeEach(() => {
        spyOn(Store, 'emitChange');
    });

    it('should have all the methods of the Abstract Store', () => {
        expect(typeof Store.emitChange).toEqual('function');
        expect(typeof Store.addChangeListener).toEqual('function');
        expect(typeof Store.removeChangeListener).toEqual('function');
    });

    it('should have a default state containing three fields', () => {
        const state = Store.getState().fields;
        expect(state[0].name).toEqual('advertiser');
        expect(state[1].name).toEqual('brand');
        expect(state[2].name).toEqual('product');
    });

    it('should set fields error if a VALIDATION_ERROR action is dispatched and emit the change', () => {
        const expectedState = [
            {
                name: 'advertiser',
                label: 'Advertiser',
                placeholder: '',
                value: '',
                error: 'Some error'
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
                error: 'Another error'
            }
        ];
        dispatcher.dispatch({
            type: 'VALIDATION_ERROR',
            errors: {
                advertiser: 'Some error',
                product: 'Another error'
            }
        });
        expect(Store.getState().fields).toEqual(expectedState);
        expect(Store.emitChange).toHaveBeenCalled();
    });

    it('should set a field value if a SET_FIELD_VALUE action is dispatched and emit the change', () => {
        const expectedState = [
            {
                name: 'advertiser',
                label: 'Advertiser',
                placeholder: '',
                value: 'some value',
                error: 'Some error'
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
                error: 'Another error'
            }
        ];
        dispatcher.dispatch({
            type: 'SET_FIELD_VALUE',
            field: {
                name: 'advertiser',
                value: 'some value'
            }
        });
        expect(Store.getState().fields).toEqual(expectedState);
        expect(Store.emitChange).toHaveBeenCalled();
    });

    it('should reset all fields errors and values if a CLEAN_FIELDS action is dispatched and emit the change', () => {
        const expectedState = [
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
        dispatcher.dispatch({
            type: 'CLEAN_FIELDS'
        });
        expect(Store.getState().fields).toEqual(expectedState);
        expect(Store.emitChange).toHaveBeenCalled();
    });
});
