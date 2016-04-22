import React, { Component } from 'react'
import { connectToStores } from './index'
import { shallow } from 'enzyme'

describe('connectToStores', () => {

    class View extends Component {

        render() {
            return(
                <div></div>
            );
        }
    }

    const store = {
        state: {
            someProp: 'some value',
            otherProp: 'another value'
        },
        addChangeListener: jasmine.createSpy().and.callFake(function(cb) {
            this.state = {
                someProp: 'changed value',
                otherProp: 'changed value'
            };

            cb();
        }),
        removeChangeListener: jasmine.createSpy(),
        getState: function() {
            return this.state;
        }
    };
    const Connected = connectToStores(View, [store]);
    let wrapper;

    it('should pass the props and the state of the store to the child component', () => {
        wrapper = shallow(<Connected higherOrderProp="parent prop value"/>);
        const props = wrapper.props();
        expect(props.higherOrderProp).toEqual('parent prop value');
        expect(props.someProp).toEqual('some value');
        expect(props.otherProp).toEqual('another value');
    });

    it('should add listeners for stores change on componentDidMount', () => {
        wrapper = shallow(<Connected />);
        wrapper.instance().componentDidMount();
        expect(store.addChangeListener).toHaveBeenCalled();
        const state = wrapper.state();
        expect(state.someProp).toEqual('changed value');
        expect(state.otherProp).toEqual('changed value');
    });

    it('should remove listeners for stores change on componentWillUnmount', () => {
        wrapper = shallow(<Connected />);
        wrapper.instance().componentWillUnmount();
        expect(store.removeChangeListener).toHaveBeenCalled();
    });
});
