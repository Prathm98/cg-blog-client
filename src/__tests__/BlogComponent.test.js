import React from 'react';
import { shallow } from 'enzyme';
import BlogComponent from '../components/pages/BlogComponent';

describe("BlogComponent test suite", function(){
    let mountedComponent;
    beforeEach(() => {
        mountedComponent = shallow(<BlogComponent />)
    })

    it("Check if component contains Card", function(){
        const img = mountedComponent.find('Card');
        expect(img.length).toBe(1)
    })
})