import Store from './abstract-store'

describe('Abstract Store', () => {

    it('should emit a change when emitChange method is called', () => {
        spyOn(Store, 'emit');

        Store.emitChange();
        expect(Store.emit).toHaveBeenCalledWith('change');
    });

    it('should listen for a change event when addChangeListener method is called', () => {
        const listener = jasmine.createSpy();
        spyOn(Store, 'on');

        Store.addChangeListener(listener);
        expect(Store.on).toHaveBeenCalledWith('change', listener);
    });

    it('should remove the listener for a change event when removeChangeListener method is called', () => {
        const listener = jasmine.createSpy();
        spyOn(Store, 'removeListener');

        Store.removeChangeListener(listener);
        expect(Store.removeListener).toHaveBeenCalledWith('change', listener);
    });
});
