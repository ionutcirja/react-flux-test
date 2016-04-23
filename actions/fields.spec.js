import dispatcher from '../dispatcher'
import * as fields from './fields'

describe('Fields actions', () => {

    beforeEach(() => {
        spyOn(dispatcher, 'dispatch');
    });

    describe('setFieldValue', () => {

        it('should dispatch a SET_FIELD_VALUE action', () => {
            fields.setFieldValue('field', 'value');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({type: 'SET_FIELD_VALUE', field: {name: 'field', value: 'value'}});
        });
    });
});

