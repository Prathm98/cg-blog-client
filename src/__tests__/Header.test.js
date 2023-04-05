import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/layout/Header';

describe("Header test suite", function(){
    let mountedComponent;
    beforeEach(() => {
        mountedComponent = shallow(<Header />)
    })

    it("Check if header contains img", function(){
        const img = mountedComponent.find('img.logo');
        expect(img.length).toBe(1)
    })

    it("Check if header 2 Navlinks", function(){
        const navLinks = mountedComponent.find('NavLink');
        expect(navLinks.length).toBe(2)
    })

    it("Check if header 2 Links", function(){
        const Links = mountedComponent.find('Link');
        expect(Links.length).toBe(2)
    })
})