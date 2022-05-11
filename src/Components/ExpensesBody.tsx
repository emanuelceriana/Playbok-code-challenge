import React, { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import { Button, Col, Row } from 'antd';

import './styles/ExpensesBody.css';

import GenericInput from './GenericInput';
import TransactionModal from './TransactionModal';
import ExpensesDetail from './ExpensesDetail';

import CurrencyStore from '../stores/CurrencyStore';

import TransactionStore, { Transaction } from '../stores/TransactionStore';
import { observer } from 'mobx-react-lite';

interface Props {
  currency: CurrencyStore
}

type InputHandle = React.ElementRef<typeof GenericInput>;

const ExpensesBody: React.FC<Props> = ({ currency }): JSX.Element => {

  const [cookies, setCookie] = useCookies();

  const initialState = (): Transaction[] => {
    return cookies['transactions'] ? cookies['transactions'] : [];
  };

  const persistState = (state: Transaction[]): void => {
    setCookie('transactions', state);
  };

  const transactions = new TransactionStore(initialState());

  const clearInputs = (): void => {
    setTransactionTitleInput('');
    setTransactionAmountInput('');
  };

  const [transactionTitleInput, setTransactionTitleInput] = useState('');
  const [transactionAmountInput, setTransactionAmountInput] = useState('');
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [previousTransactionAmount, setPreviousTransactionAmount] = useState('');

  const transactionTitleRef = useRef<InputHandle>(null);
  const transactionAmountRef = useRef<InputHandle>(null);

  const handleTransactionsRemove = (expense: Transaction): void => {
    transactions.remove(expense);
    persistState(transactions.list);
  };

  const handleTransactionModal = (transaction?: Transaction): void => {
    setTransactionModalVisible(false);
    if(transaction) {
      transactions.replace(transaction);
      persistState(transactions.list);
      clearInputs();
    }
  };

  const handleValidation = (): void => {
    const isTitleInputValid = transactionTitleRef.current?.validate();
    const isAmountInputValid = transactionAmountRef.current?.validate();

    if (isTitleInputValid && isAmountInputValid) {
      const transaction: Transaction = {
        title: transactionTitleInput,
        amount: Number(transactionAmountInput.replace(',', '.'))
      };

      //If return true add transaction, if not show replace modal
      if(transactions.add(transaction)) {
        persistState(transactions.list);
        clearInputs();
      } else {
        const previousTransaction = transactions.get(transaction.title) as Transaction;
        setPreviousTransactionAmount(previousTransaction?.amount.toString());
        setTransactionModalVisible(true);
      }

    }
  };

  const transactionTitle = 'Title of Transaction*';
  const transactionAmountTitle = 'Amount (in PLN)*';

  return (
    <>
      <Row className="Expenses-body" align="bottom" justify="space-between">
        <Col xs={24} sm={18} md={18} lg={18}>
          <GenericInput
            id="TitleOfTransactionInput"
            ref={transactionTitleRef}
            title={transactionTitle}
            value={transactionTitleInput}
            type="title"
            onChange={setTransactionTitleInput}
          />

          <GenericInput
            id="AmountOfTransactionInput"
            ref={transactionAmountRef}
            title={transactionAmountTitle}
            value={transactionAmountInput}
            type="amount"
            onChange={setTransactionAmountInput}
          />
        </Col>
        <Col xs={16} sm={4} md={4} lg={4} className="Button-column">
          <Button id="AddButton" block onClick={handleValidation}>
            Add
          </Button>
          <TransactionModal
            visible={transactionModalVisible}
            handleModal={handleTransactionModal}
            title={transactionTitleInput}
            amount={transactionAmountInput}
            prevAmount={previousTransactionAmount}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '4vh' }} justify="center" align="middle">
        <Col xs={22} sm={24} md={24} lg={24}>
          <ExpensesDetail
            transactions={transactions}
            currency={currency}
            handleTransactionsRemove={handleTransactionsRemove}
          />
        </Col>
      </Row>
    </>
  );
};

export default observer(ExpensesBody);
