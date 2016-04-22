import Store from './submissions'
import dispatcher from '../dispatcher'

describe('Submissions Store', () => {

    beforeEach(() => {
        spyOn(Store, 'emitChange');
    });

    it('should have all the methods of the Abstract Store', () => {
        expect(typeof Store.emitChange).toEqual('function');
        expect(typeof Store.addChangeListener).toEqual('function');
        expect(typeof Store.removeChangeListener).toEqual('function');
    });

    it('should have a default state', () => {
        expect(Store.getState().submissions).toEqual([]);
    });

    it('should add a new submission if an ADD_SUBMISSION action is dispatched and the current state is empty and emit the change', () => {
        dispatcher.dispatch({
            type: 'ADD_SUBMISSION',
            submission: {
                advertiser: 'a',
                brand: 'b',
                product: 'p'
            }
        });
        const state = Store.getState().submissions;
        expect(state.length).toEqual(1);
        expect(state[0].advertiser).toEqual('a');
        expect(state[0].brand).toEqual('b');
        expect(state[0].product).toEqual('p');
        expect(state[0].dates.length).toEqual(1);
        expect(Store.emitChange).toHaveBeenCalled();
    });

    it('should add a new submission if an ADD_SUBMISSION action is dispatched and ' +
    'current state does not contain a submission with the same values for the advertiser, brand and product fields and ' +
    'emit the change', () => {
        dispatcher.dispatch({
            type: 'ADD_SUBMISSION',
            submission: {
                advertiser: 'a1',
                brand: 'b1',
                product: 'p1'
            }
        });
        const state = Store.getState().submissions;
        expect(state.length).toEqual(2);
        expect(state[1].advertiser).toEqual('a1');
        expect(state[1].brand).toEqual('b1');
        expect(state[1].product).toEqual('p1');
        expect(state[1].dates.length).toEqual(1);
        expect(Store.emitChange).toHaveBeenCalled();
    });

    it('should add a new date to an existent submission if an ADD_SUBMISSION action is dispatched and ' +
    'current state contains already a submission with the same values for the advertiser, brand and product fields and ' +
    'emit the change', () => {
        dispatcher.dispatch({
            type: 'ADD_SUBMISSION',
            submission: {
                advertiser: 'a',
                brand: 'b',
                product: 'p'
            }
        });
        const state = Store.getState().submissions;
        expect(state.length).toEqual(2);
        expect(state[0].advertiser).toEqual('a');
        expect(state[0].brand).toEqual('b');
        expect(state[0].product).toEqual('p');
        expect(state[0].dates.length).toEqual(2);
        expect(Store.emitChange).toHaveBeenCalled();
    });
});
