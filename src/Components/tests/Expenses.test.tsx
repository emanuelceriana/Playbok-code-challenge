import { mount, ReactWrapper } from 'enzyme';
import { act } from '@testing-library/react';

import { Dropdown, Table } from 'antd';

import { ConversionRateList, CurrencyEnum } from '../../utils/ConversionRateList';

import Expenses from '../Expenses';

interface Transaction {
  title: string,
  amount: string
}

const clearTest = (wrapper: ReactWrapper): void => {
  wrapper.unmount();
  //Clear cookies to have clean unit tests
  document.cookie = `transactions=1; expires=1 Jan 1970 00:00:00 GMT;`;
};

const AddTransaction = (wrapper: ReactWrapper, transaction: Transaction): void => {
  const TitleOfTransactionInput = wrapper.find('#TitleOfTransactionInput').last();
  TitleOfTransactionInput.simulate('change', { target: { value: transaction.title } });

  const AmountOfTransactionInput = wrapper.find('#AmountOfTransactionInput').last();
  AmountOfTransactionInput.simulate('change', { target: { value: transaction.amount } });

  //Simulate addButton click
  wrapper.find('#AddButton').first().simulate('click');
};

const testConversionRateByCurrencyOption = (currency: CurrencyEnum): any => {
  const currencyRate = ConversionRateList[currency];

  const wrapper = mount(<Expenses />);
  const overlay = wrapper.find(Dropdown).prop('overlay') as any;

  //Find currency for conversionRate and simulate click to update rate
  const currencyOption = overlay.props.items[0].children.find(
    (itemMenu: any) => itemMenu.key === currency
  );

  act(() => {
    currencyOption.label.props.onClick();
  });

  expect(wrapper.find(Dropdown).text().includes(currencyRate.toString())).toEqual(true);

  clearTest(wrapper);
};

describe('Test Case Expenses component', () => {

  describe('Test Case Conversion Rate behavior in Expenses context', () => {

    test('Test Conversion when click on EUR option', () => {
      testConversionRateByCurrencyOption(CurrencyEnum.EUR);
    });

    test('Test Conversion when click on USD option', () => {
      testConversionRateByCurrencyOption(CurrencyEnum.USD);
    });

    test('Test Conversion when click on ARS option', () => {
      testConversionRateByCurrencyOption(CurrencyEnum.ARS);
    });

  });

  test('Test update all components when change Conversion Rate (USD)', () => {
    const currency = CurrencyEnum.USD;
    const transaction = {title: 'Test1', amount: '10'}

    const wrapper = mount(<Expenses />);
    const overlay = wrapper.find(Dropdown).prop('overlay') as any;
    
    AddTransaction(wrapper, transaction);

    //Find currency for conversionRate and simulate click to update rate
    const currencyOption = overlay.props.items[0].children.find(
      (itemMenu: any) => itemMenu.key === currency
    );

    act(() => {
      currencyOption.label.props.onClick();
    });

    expect(wrapper.find('#Total-Amount').text().includes(CurrencyEnum.USD));
    expect(wrapper.find('th.ant-table-cell').at(2).text().includes(CurrencyEnum.USD));

    clearTest(wrapper);
  });
  
  
});
