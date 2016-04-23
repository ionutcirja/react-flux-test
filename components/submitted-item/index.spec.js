import React from 'react'
import SubmittedItem from './index'
import { shallow } from 'enzyme'

describe('SubmittedItem Component', () => {

    let wrapper;

    it('should render advertiser, brand and product divs and a list of dates', () => {
        wrapper = shallow(
            <SubmittedItem
                advertiser="advertiser"
                brand="brand"
                product="product"
                dates={['date1', 'date2']}
            />
        );
        const divs = wrapper.find('div');
        const list = wrapper.find('ul').find('li');
        expect(divs.length).toEqual(3);
        expect(divs.at(0).text()).toContain('advertiser');
        expect(divs.at(1).text()).toContain('brand');
        expect(divs.at(2).text()).toContain('product');
        expect(list.length).toEqual(2);
        expect(list.at(0).text()).toContain('date1');
        expect(list.at(1).text()).toContain('date2');
    });
});
