import React from 'react'
import TextInputField from './index'
import { shallow } from 'enzyme'

describe('TextInputField Component', () => {

    let wrapper;

    it('should render a label and an text input field', () => {
        wrapper = shallow(<TextInputField name="product" label="Product" placeholder="placeholder" value="p"/>);
        const label = wrapper.find('label');
        const input = wrapper.find('input');
        const inputProps = input.props();
        expect(label.length).toEqual(1);
        expect(label.text()).toEqual('Product');
        expect(label.props().htmlFor).toEqual('product');
        expect(input.length).toEqual(1);
        expect(inputProps.type).toEqual('text');
        expect(inputProps.name).toEqual('product');
        expect(inputProps.id).toEqual('product');
        expect(inputProps.placeholder).toEqual('placeholder');
        expect(inputProps.value).toEqual('p');
    });

    it('should not render a span containing an error message if an error property does not exist', () => {
        wrapper = shallow(<TextInputField name="product"/>);
        const child = wrapper.find('span');
        expect(child.length).toEqual(0);
    });

    it('should render a span containing an error message if an error property exists', () => {
        wrapper = shallow(<TextInputField name="product" error="error message"/>);
        const child = wrapper.find('span');
        expect(child.length).toEqual(1);
        expect(child.text()).toEqual('error message');
    });

    it('should set state value when input onChange handler is called', () => {
        wrapper = shallow(<TextInputField name="product" value="p"/>);
        const handler = wrapper.find('input').props().onChange;
        expect(typeof handler).toEqual('function');
        handler({target: {value: 'new product'}});
        expect(wrapper.state().value).toEqual('new product');
    });

    it('should clean state error when input onFocus handler is called', () => {
        wrapper = shallow(<TextInputField name="product" error="error"/>);
        const handler = wrapper.find('input').props().onFocus;
        expect(typeof handler).toEqual('function');
        handler();
        expect(wrapper.state().error).toEqual('');
    });

    it('should return state value when getData method is called', () => {
        wrapper = shallow(<TextInputField name="product" value="p"/>);
        expect(wrapper.instance().getData()).toEqual('p');
    });

    it('should set state error on componentWillReceiveProps', () => {
        wrapper = shallow(<TextInputField name="product" error=""/>);
        wrapper.instance().componentWillReceiveProps({error: 'message'});
        expect(wrapper.state().error).toEqual('message');
    });
});
