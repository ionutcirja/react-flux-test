import { Dispatcher } from 'flux'
import dispatcher from './index'

describe('Dispatcher', () => {

    it('should be a instance of the flux dispatcher', () => {
        expect(dispatcher instanceof Dispatcher).toBeTruthy();
    })
});
