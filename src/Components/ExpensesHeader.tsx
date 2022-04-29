import React from 'react';

import { Col, Row } from 'antd';

import './styles/ExpensesHeader.css';

interface Props {
  title: React.ReactNode;
  conversionRate: React.ReactNode;
}

const ExpensesHeader: React.FC<Props> = ({ title, conversionRate }): JSX.Element => {
  return (
    <Row className="Expenses-row">
      <Col xs={24} sm={16} md={16} lg={16}>
        {title}
      </Col>
      <Col xs={24} sm={8} md={8} lg={8} className="Dropdown">
        {conversionRate}
      </Col>
    </Row>
  );
};

export default ExpensesHeader;
