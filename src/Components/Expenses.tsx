import React, { useState } from 'react';

import './styles/Expenses.css';

import Title from './Title';
import ConversionRate from './ConversionRate';
import ExpensesHeader from './ExpensesHeader';
import ExpensesBody from './ExpensesBody';
import { CurrencyEnum } from '../utils/ConversionRateList';
import CurrencyStore from '../stores/CurrencyStore';

interface Props {}

const currency = new CurrencyStore();

export const Expenses: React.FC<Props> = (): JSX.Element => {
  // const [currency, setCurrency] = useState(CurrencyEnum.EUR);

  const expensesListTitle = 'List of Expenses';

  return (
    <div className="Expenses-container">
      <ExpensesHeader
        title={<Title content={expensesListTitle} />}
        conversionRate={<ConversionRate currency={currency} />}
      />
      <ExpensesBody currency={currency} />
    </div>
  );
};

export default Expenses;
