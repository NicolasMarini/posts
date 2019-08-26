import React from 'react';
import ReactDOM from 'react-dom';
import PhotoGrid from './components/PhotoGrid';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });

// test file


it('renders a list of photos', () => {
  const component = mount(
    <PhotoGrid isLoading data={{}} />
  )
  
  expect(component.prop("isLoading")).toBe(true)
  expect(component.prop("data")).toEqual({})

component.unmount()
});
