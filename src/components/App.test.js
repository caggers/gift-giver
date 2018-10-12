import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import { render } from 'react-testing-library';

// Basic test for checking the h2
it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome</h2>;
  expect(wrapper.contains(welcome)).toEqual(true);
});

// Using jest-enzyme sugar
it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome</h2>;
  expect(wrapper).toContainReact(welcome);
});

// Test using react-testing-library and jest-dom sugar
it('renders Welcome message', () => {
  const { getByText } = render(<App />);
  expect(getByText('Welcome')).toBeInTheDocument();
});

//Basic Testing from Udemy course
describe('App', () => {
  const app = shallow(<App />);
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('initialises the `state` with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([]);
  });

  describe('when clicking the `add-gift` button', () => {
    const id = 1;

    beforeEach(() => {
      app.find('.btn-add').simulate('click');
    });

    afterEach(() => {
      app.setState({ gifts: [] });
    });

    it('adds a new gift to `state`', () => {
      expect(app.state().gifts).toEqual([{ id }]);
    });

    it('adds a new gift to the rendered list', () => {
      expect(app.find('.gift-list').children().length).toEqual(1);
    });

    it('creates a Gift component', () => {
      expect(app.find('Gift').exists()).toBe(true);
    });

    describe('and the user wants to remove the added gift', () => {
      beforeEach(() => {
        app.instance().removeGift(id);
      });

      it('removes the gift from `state`', () => {
        expect(app.state().gifts).toEqual([]);
      });
    });
  });
});
