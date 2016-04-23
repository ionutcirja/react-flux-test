import React from 'react'
import App from './index'
import FieldsStore from '../../stores/fields'
import SubmissionsStore from '../../stores/submissions'
import { shallow } from 'enzyme'

describe('App Controller', () => {

    const fields = [{name: 'product'}];
    const submissions = [{product: 'product name'}];

    beforeEach(() => {
        spyOn(FieldsStore, 'getState').and.returnValue({fields: fields});
    });

    it('should be connected to the fields and submissions store', () => {
        spyOn(SubmissionsStore, 'getState').and.returnValue({submissions: submissions});

        const wrapper = shallow(<App />);
        const props = wrapper.props();
        expect(props.fields).toEqual(fields);
        expect(props.submissions).toEqual(submissions);
    });

    it('should render a Form component', () => {
        spyOn(SubmissionsStore, 'getState').and.returnValue({submissions: []});

        const wrapper = shallow(<App />);
        const child = wrapper.find('App').shallow().find('Form');
        expect(child.length).toEqual(1);
        expect(child.props().fields).toEqual(fields);
    });

    it('should render a Submissions component if submission list length is bigger than zero', () => {
        spyOn(SubmissionsStore, 'getState').and.returnValue({submissions: submissions});

        const wrapper = shallow(<App />);
        const child = wrapper.find('App').shallow().find('SubmittedList');
        expect(child.length).toEqual(1);
        expect(child.props().submissions).toEqual(submissions);
    });

    it('should not render a Submissions component if submission list is empty', () => {
        spyOn(SubmissionsStore, 'getState').and.returnValue({submissions: []});

        const wrapper = shallow(<App />);
        expect(wrapper.find('App').shallow().find('SubmittedList').length).toEqual(0);
    });
});
