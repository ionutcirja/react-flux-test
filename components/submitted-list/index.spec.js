import React from 'react'
import SubmittedList from './index'
import { shallow } from 'enzyme'

describe('SubmittedList Component', () => {

    const submissions = [
        {
            advertiser: 'a',
            brand: 'b',
            product: 'p',
            dates: ['d']
        },
        {
            advertiser: 'a1',
            brand: 'b1',
            product: 'p2',
            dates: ['d1', 'd2']
        }
    ];
    let wrapper;

    it('should render a list of SubmittedItems', () => {
        wrapper = shallow(<SubmittedList submissions={submissions}/>);
        const list = wrapper.find('SubmittedItem');
        expect(list.length).toEqual(2);
        submissions.forEach((item, index) => {
            expect(list.at(index).props()).toEqual(submissions[index]);
        });
    });
});
