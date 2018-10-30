import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from './index';

configure({ adapter: new Adapter() });

const component = shallow(<Pagination/>);

const instance = component.instance();

it('Pagination renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pagination />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Check CSS classes', () => {
    expect(component.find('.container').length).toEqual(1);
    expect(component.find('.pagination').length).toEqual(1);

    component.setProps({ currentPage: 1 });
    expect(component.find('.move-btn').length).toEqual(1);

    component.setProps({ currentPage: 2 });
    expect(component.find('.move-btn').length).toEqual(2);
});

it('getArrayOfPages method', () => {
  expect(instance.state).toEqual({ numberOfPages: 0, pages: [] });
  
  component.setProps({
    itemsCount: 100,
    itemsPerPage: 10,
    currentPage: 1
  });
  instance.getArrayOfPages();
  expect(instance.state).toEqual({ numberOfPages: 10, pages: [1, 2] });


  component.setProps({
    itemsCount: 100,
    itemsPerPage: 9,
    currentPage: 5
  });
  instance.getArrayOfPages();
  expect(instance.state).toEqual({ numberOfPages: 12, pages: [4, 5, 6] });


  component.setState({
    numberOfPages: 0,
    pages: []
  });


  component.setProps({
    itemsCount: undefined,
    itemsPerPage: undefined,
    currentPage: undefined
  });
  instance.getArrayOfPages();
  expect(instance.state).toEqual({ numberOfPages: 0, pages: [] });


  component.setProps({
    itemsCount: 100,
    itemsPerPage: 9,
    currentPage: undefined
  });
  instance.getArrayOfPages();
  expect(instance.state).toEqual({ numberOfPages: 0, pages: [] });

  component.setProps({
    itemsCount: 100,
    itemsPerPage: 0,
    currentPage: 1
  });
  instance.getArrayOfPages();
  expect(instance.state).toEqual({ numberOfPages: 0, pages: [] });

  component.setProps({
    itemsCount: 100,
    itemsPerPage: 0,
    currentPage: 0
  });
  instance.getArrayOfPages();
  expect(instance.state).toEqual({ numberOfPages: 0, pages: [] });
});