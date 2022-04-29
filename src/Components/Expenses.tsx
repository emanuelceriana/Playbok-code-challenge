import React, { useState } from 'react';

import './styles/Expenses.css';

import Title from './Title';
import ConversionRate from './ConversionRate';
import ExpensesHeader from './ExpensesHeader';
import ExpensesBody from './ExpensesBody';
import { CurrencyEnum } from '../utils/ConversionRateList';

interface Props {}

export const Expenses: React.FC<Props> = (): JSX.Element => {
  const [currency, setCurrency] = useState(CurrencyEnum.EUR);

  const expensesListTitle = 'List of Expenses';

  return (
    <div className="Expenses-container">
      <ExpensesHeader
        title={<Title content={expensesListTitle} />}
        conversionRate={<ConversionRate currency={currency} setCurrency={setCurrency} />}
      />
      <ExpensesBody currency={currency} />
    </div>
  );
};

export default Expenses;
