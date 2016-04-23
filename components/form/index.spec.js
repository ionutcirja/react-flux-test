import React from 'react'
import Form from './index'
import * as actions from '../../actions/submissions'
import { shallow } from 'enzyme'

describe('Form Controller', () => {

    const fields = [
        {
            name: 'advertiser'
        },
        {
            name: 'brand'
        },
        {
            name: 'product'
        }
    ];
    let wrapper;

    it('should render a form', () => {
        wrapper = shallow(<Form fields={fields}/>);
        expect(wrapper.find('form').length).toEqual(1);
        expect(wrapper.find('form').find('input[type="submit"]').length).toEqual(1);
        const formFields = wrapper.find('form').find('TextInputField');
        expect(formFields.length).toEqual(3);
        fields.forEach((field, index) => {
            expect(formFields.at(index).props().name).toEqual(fields[index].name);
        });
    });

    it('should call addSubmission action when form is submitted', () => {
        spyOn(actions, 'addSubmission');

        wrapper = shallow(<Form fields={fields}/>);
        const submit = wrapper.find('form').props().onSubmit;
        expect(typeof submit).toEqual('function');
        submit();
        expect(actions.addSubmission).toHaveBeenCalled();
    });
});
