import React, { useState, useRef, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import { Button, Col, Row } from 'antd';

import './styles/ExpensesBody.css';

import GenericInput from './GenericInput';
import TransactionModal from './TransactionModal';
import ExpensesDetail from './ExpensesDetail';

import { Transaction, Action } from '../types/TransactionTypes';

interface Props {
  currency: string;
}

type InputHandle = React.ElementRef<typeof GenericInput>;

const ExpensesBody: React.FC<Props> = ({ currency }): JSX.Element => {
  const [cookies, setCookie] = useCookies();

  const transactionReducer = (state: Array<Transaction>, action: Action): Transaction[] => {
    switch (action.type) {
      case 'Add':
        const alreadyExist = state.find(
          (transaction) => transaction.title === action.transaction.title
        );

        if (alreadyExist) {
          setPreviousTransactionAmount(alreadyExist?.amount.toString());
          setTransactionModalVisible(true);
        } else {
          state = [...state, action.transaction];
          clearInputs();
          persistState(state);
        }
        break;
      case 'Replace':
        const indexReplace = state.findIndex(
          (transaction) => transaction.title === action.transaction.title
        );
        state[indexReplace].amount = action.transaction.amount;
        state = [...state];
        clearInputs();
        persistState(state);
        break;
      case 'Delete':
        const newState = state.filter(
          (transaction) => transaction.title !== action.transaction.title
        );
        state = [...newState];
        persistState(state);
        break;
      default:
        break;
    }
    return state;
  };

  const clearInputs = (): void => {
    setTransactionTitleInput('');
    setTransactionAmountInput('');
  };

  const persistState = (state: Transaction[]): void => {
    setCookie('transactions', state);
  };

  const initialState = (): Transaction[] => {
    return cookies['transactions'] ? cookies['transactions'] : [];
  };

  const [transactionTitleInput, setTransactionTitleInput] = useState('');
  const [transactionAmountInput, setTransactionAmountInput] = useState('');
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [previousTransactionAmount, setPreviousTransactionAmount] = useState('');
  const [transactionList, dispatch] = useReducer(transactionReducer, initialState());

  const transactionTitleRef = useRef<InputHandle>(null);
  const transactionAmountRef = useRef<InputHandle>(null);

  const addTransaction = (transaction: Transaction): Action => {
    return {
      type: 'Add',
      transaction
    };
  };

  const ReplaceTransaction = (transaction: Transaction): Action => {
    return {
      type: 'Replace',
      transaction
    };
  };

  const DeleteTransaction = (transaction: Transaction): Action => {
    return {
      type: 'Delete',
      transaction
    };
  };

  const handleTransactionDelete = (transaction: Transaction): void => {
    dispatch(DeleteTransaction(transaction));
  };

  const handleTransactionModal = (transaction: Transaction): void => {
    setTransactionModalVisible(false);
    transaction && dispatch(ReplaceTransaction(transaction));
  };

  const handleValidation = (): void => {
    const isTitleInputValid = transactionTitleRef.current?.validate();
    const isAmountInputValid = transactionAmountRef.current?.validate();

    if (isTitleInputValid && isAmountInputValid) {
      const transaction: Transaction = {
        title: transactionTitleInput,
        amount: Number(transactionAmountInput.replace(',', '.'))
      };

      dispatch(addTransaction(transaction));
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
            transactions={transactionList}
            currency={currency}
            handleTransactionDelete={handleTransactionDelete}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExpensesBody;
