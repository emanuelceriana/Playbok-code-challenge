import { shallow } from 'enzyme';

import Title from '../Title';

describe('Test Case Title component', () => {
  test('Test content attribute', () => {
    const wrapper = shallow(<Title content="Hola Mundo" />);
    expect(wrapper.contains('Hola Mundo')).toEqual(true);
  });

  test('Test default tag attribute (h1)', () => {
    const wrapper = shallow(<Title content="Test" />);
    expect(wrapper.contains(<h1>Test</h1>)).toEqual(true);
  });

  test('Test custom tag attribute', () => {
    const wrapper = shallow(<Title content="Test" tag="h3" />);
    expect(wrapper.contains(<h3>Test</h3>)).toEqual(true);
  });
});
