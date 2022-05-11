import { shallow, mount, ReactWrapper } from 'enzyme';

import { Button, Table } from 'antd';

import Modal from 'antd/lib/modal/Modal';
import ExpensesBody from '../ExpensesBody';
import { CurrencyEnum } from '../../utils/ConversionRateList';
import CurrencyStore from '../../stores/CurrencyStore';

interface Transaction {
    title: string,
    amount: string
}

const currency = new CurrencyStore();

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

const ReplaceTransaction = (
  wrapper: ReactWrapper,
  beforeTransaction: Transaction,
  afterTransaction: Transaction,
  okButton: boolean = true
): void => {
  //Add first transaction
  AddTransaction(wrapper, beforeTransaction);

  //This second action shows TransactionModal
  AddTransaction(wrapper, afterTransaction);

  if (okButton) {
    //It represents Ok button
    wrapper.find(Modal).find(Button).last().simulate('click');
  } else {
    //It represents Cancel button
    wrapper.find(Modal).find(Button).first().simulate('click');
  }
};

const DeleteTransaction = (wrapper: ReactWrapper, transaction: Transaction): void => {
  //Simulate delete button on table row
  wrapper
    .find(Table)
    .find(`[data-row-key="${transaction.title}:${transaction.amount}"]`)
    .find('#Delete-Action')
    .first()
    .simulate('click');
};

const PopulateTransactionTable = (
  wrapper: ReactWrapper,
  transaction: Transaction,
  quantity: number
) => {
  Array(quantity)
    .fill(quantity)
    .map((_: any, idx: number) => {
      const { title } = transaction;
      AddTransaction(wrapper, { ...transaction, title: title + idx });
    });
};

describe('Test Case ExpensesBody component', () => {
  describe('Test Case Actions of transaction (Add, Replace, Delete)', () => {
    test('Test Add transaction to Expenses Table', () => {

      //Test always with dot instead of comma because the code logic change comma string to dot number
      const transaction = { title: 'Transaction Test', amount: '33.33' };

      const wrapper = mount(<ExpensesBody currency={currency} />);

      AddTransaction(wrapper, transaction);

      expect(wrapper.find(Table).text().includes(transaction.title)).toEqual(true);
      expect(wrapper.find(Table).text().includes(transaction.amount)).toEqual(true);

      clearTest(wrapper);
    });

    test('Test Replace transaction from Expenses Table when click OK button on TransactionModal', () => {

      //Test always with dot instead of comma because the code logic change comma string to dot number
      const beforeTransaction = { title: 'Transaction Test', amount: '33.33' };
      const afterTransaction = { title: 'Transaction Test', amount: '12.34' };

      const wrapper = mount(<ExpensesBody currency={currency} />);

      ReplaceTransaction(wrapper, beforeTransaction, afterTransaction);

      expect(wrapper.find(Table).text().includes(afterTransaction.amount)).toEqual(true);

      clearTest(wrapper);
    });

    test('Test do not Replace transaction from Expenses Table when click Cancel button on TransactionModal', () => {

      //Test always with dot instead of comma because the code logic change comma string to dot number
      const beforeTransaction = { title: 'Transaction Test', amount: '33.33' };

      const afterTransaction = { title: 'Transaction Test', amount: '12.34' };

      const wrapper = mount(<ExpensesBody currency={currency} />);

      //Send false to simulate click on cancel button
      ReplaceTransaction(wrapper, beforeTransaction, afterTransaction, false);

      expect(wrapper.find(Table).text().includes(afterTransaction.amount)).toEqual(false);

      clearTest(wrapper);
    });

    test('Test Delete transaction from Expenses Table', () => {

      //Test always with dot instead of comma because the code logic change comma string to dot number
      const transaction = { title: 'Transaction Test', amount: '33.33' };

      const wrapper = mount(<ExpensesBody currency={currency} />);

      //Send false to simulate click on cancel button
      AddTransaction(wrapper, transaction);

      DeleteTransaction(wrapper, transaction);

      expect(wrapper.find(Table).text().includes(transaction.title)).toEqual(false);
      expect(wrapper.find(Table).text().includes(transaction.amount)).toEqual(false);

      clearTest(wrapper);
    });
  });

  test('Test Total amount from many transactions in the Table', () => {

    const transaction = { title: 'Transaction', amount: '10' };
    const quantity = 5;

    const wrapper = mount(<ExpensesBody currency={currency} />);

    PopulateTransactionTable(wrapper, transaction, quantity);

    expect(
      wrapper
        .find('#Total-Amount')
        .text()
        .includes(`Sum: ${Number(transaction.amount) * quantity} PLN`)
    ).toEqual(true);

    clearTest(wrapper);
  });

  test('Test Pagination when transaction quantity is more than default pageSize (5) second page', () => {

    const transaction = { title: 'Transaction', amount: '10' };
    const quantity = 6;

    const wrapper = mount(<ExpensesBody currency={currency} />);

    PopulateTransactionTable(wrapper, transaction, quantity);

    expect(wrapper.find(Table).find('[title=2].ant-pagination-item').get(0)).toBeDefined();

    clearTest(wrapper);
  });

  test('Test Pagination when transaction quantity is less than default pageSize (5) one page', () => {

    const transaction = { title: 'Transaction', amount: '10' };
    const quantity = 4;

    const wrapper = mount(<ExpensesBody currency={currency} />);

    PopulateTransactionTable(wrapper, transaction, quantity);

    expect(wrapper.find(Table).find('[title=2].ant-pagination-item').get(0)).toBeUndefined();

    clearTest(wrapper);
  });

  test('Test Pagination change page when click', () => {

    const transaction = { title: 'Transaction', amount: '10' };
    const quantity = 6;

    const wrapper = mount(<ExpensesBody currency={currency} />);

    PopulateTransactionTable(wrapper, transaction, quantity);

    wrapper.find(Table).find('[title=2].ant-pagination-item').simulate('click');

    //We rest the default pageSize to get the rest of ocurrences
    expect(
      wrapper
        .find('Table')
        .text()
        .match(/Transaction/g)?.length
    ).toEqual(quantity - 5);

    clearTest(wrapper);
  });
});
