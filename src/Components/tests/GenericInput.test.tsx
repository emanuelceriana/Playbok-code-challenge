import { mount, ReactWrapper } from 'enzyme';

import Input from 'antd/lib/input/Input';

import GenericInput from '../GenericInput';
import ExpensesBody from '../ExpensesBody';
import CurrencyStore from '../../stores/CurrencyStore';

const currency = new CurrencyStore();

const changeInputWithValidation = (
  wrapper: ReactWrapper,
  selector: string,
  value: string
): ReactWrapper => {
  //Last child is input
  let input = wrapper.find(selector).last();

  //Message with length 4
  input.simulate('change', { target: { value: value } });

  //First child is parent
  input = wrapper.find(selector).first();

  const addButton = wrapper.find('#AddButton').first();

  //Simulate click
  addButton.simulate('click');

  return input;
};

describe('Test Case Generic Input component', () => {
  test('Test onChange function', () => {
    const setValue = jest.fn();

    const wrapper = mount(<GenericInput title="Test" value="" type="title" onChange={setValue} />);

    wrapper
      .find(Input)
      .last()
      .simulate('change', { target: { value: 'test' } });

    expect(setValue).toBeCalledWith('test');
  });

  describe('Test Case Title Of Transaction input', () => {
    test('Show Required Field message', () => {
      const wrapper = mount(<ExpensesBody currency={currency} />);

      const titleOfTransactionInput = changeInputWithValidation(
        wrapper,
        '#TitleOfTransactionInput',
        ''
      );

      expect(titleOfTransactionInput.text().includes('Required Field')).toEqual(true);
    });

    test('Show Minimum length is 5 message when lenght < 5', () => {
      const wrapper = mount(<ExpensesBody currency={currency} />);

      const titleOfTransactionInput = changeInputWithValidation(
        wrapper,
        '#TitleOfTransactionInput',
        '1234'
      );

      expect(titleOfTransactionInput.text().includes('Minimum length is 5')).toEqual(true);
    });

    test('Do not show error message when lenght >= 5.', () => {
      const wrapper = mount(<ExpensesBody currency={currency} />);

      const titleOfTransactionInput = changeInputWithValidation(
        wrapper,
        '#TitleOfTransactionInput',
        '12345'
      );

      expect(titleOfTransactionInput.text().includes('Required Field')).toEqual(false);
      expect(titleOfTransactionInput.text().includes('Minimum length is 5')).toEqual(false);
    });
  });

  describe('Test Case Amount Of Transaction input', () => {
    test('Show Required Field message.', () => {
      const wrapper = mount(<ExpensesBody currency={currency} />);

      const amountOfTransactionInput = changeInputWithValidation(
        wrapper,
        '#AmountOfTransactionInput',
        ''
      );

      expect(amountOfTransactionInput.text().includes('Required Field')).toEqual(true);
    });

    test('Show Amount is not a valid number message.', () => {
      const wrapper = mount(<ExpensesBody currency={currency} />);

      const amountOfTransactionInput = changeInputWithValidation(
        wrapper,
        '#AmountOfTransactionInput',
        'test'
      );

      expect(amountOfTransactionInput.text().includes('Amount is not a valid number')).toEqual(
        true
      );
    });

    test('Show Max digits quantity after comma is 2 message.', () => {
      const wrapper = mount(<ExpensesBody currency={currency} />);

      const amountOfTransactionInput = changeInputWithValidation(
        wrapper,
        '#AmountOfTransactionInput',
        '33,333'
      );

      expect(
        amountOfTransactionInput.text().includes('Max digits quantity after comma is 2')
      ).toEqual(true);
    });

    test('Do not show error message when amount is a number and has not more than 2 digits after comma.', () => {
      const wrapper = mount(<ExpensesBody currency={currency} />);

      const amountOfTransactionInput = changeInputWithValidation(
        wrapper,
        '#AmountOfTransactionInput',
        '33,33'
      );

      expect(amountOfTransactionInput.text().includes('Required Field')).toEqual(false);
      expect(
        amountOfTransactionInput.text().includes('Max digits quantity after comma is 2')
      ).toEqual(false);
      expect(amountOfTransactionInput.text().includes('Amount is not a valid number')).toEqual(
        false
      );
    });
  });
});
