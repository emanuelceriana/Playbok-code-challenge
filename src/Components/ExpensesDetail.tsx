import React, { useEffect, useState } from 'react';

import { Table, Button, Row, Col, Tooltip } from 'antd';

import { Transaction } from '../types/TransactionTypes';
import { ConversionRateList } from '../utils/ConversionRateList';
import { DeleteOutlined, ControlOutlined } from '@ant-design/icons';
import useWindowSize from '../Hooks/useWindowSize';

interface Props {
  transactions: Transaction[];
  currency: string;
  handleTransactionDelete: Function;
}

const ExpensesDetail: React.FC<Props> = ({
  transactions,
  currency,
  handleTransactionDelete
}): JSX.Element => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { width } = useWindowSize();

  const isMobile = () => {
    return width <= 450;
  }

  const getConversionValue = (amount: number) => {
    return (amount / ConversionRateList[currency]).toFixed(2);
  };

  useEffect(() => {
    const calcTotalAmount = () => {
      const totalAmountCalculated = transactions.reduce((totalAmount, transaction) => {
        return (totalAmount += transaction.amount);
      }, 0);

      setTotalAmount(totalAmountCalculated);
    };

    calcTotalAmount();
  }, [transactions]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => {
        return isMobile() ? (
          <Tooltip title={title} color="blue" key="blue">
            <span>{`${title.slice(0, 2)}..`}</span>
          </Tooltip>
        ) : (
          <span>{title}</span>
        );
      }
    },
    {
      title: isMobile() ? '(PLN)' : 'Amount (PLN)',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: isMobile() ? `(${currency})` : `Amount (${currency})`,
      dataIndex: 'amount',
      id: 'Conversion-Row',
      columnTitle: 'Conversion-Row',
      render: (amount: number, record: Transaction) => {
        return <span>{getConversionValue(amount)}</span>;
      }
    },
    {
      title: isMobile() ? <ControlOutlined /> : 'Options',
      key: 'action',
      width: 20,
      render: (_: any, record: Transaction) =>
      isMobile() ? (
          <DeleteOutlined
            id="Delete-Action"
            onClick={() => {
              handleTransactionDelete(record);
            }}
          />
        ) : (
          <Button
            id="Delete-Action"
            onClick={() => {
              handleTransactionDelete(record);
            }}>
            <a>Delete</a>
          </Button>
        )
    }
  ];

  return (
    <>
      <Row style={{ marginTop: '2vh' }} justify="center" align="middle">
        <Col>
          {totalAmount > 0 && (
            <h3 id="Total-Amount">{`Sum: ${totalAmount} PLN (${getConversionValue(
              totalAmount
            )} ${currency})`}</h3>
          )}
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={22} sm={24} md={24} lg={24}>
          <Table
            columns={columns}
            dataSource={transactions.length ? transactions : []}
            rowKey={(record) => `${record.title}:${record.amount}`}
            bordered
            pagination={{
              position: ['bottomRight'],
              defaultPageSize: 5,
              total: transactions.length
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExpensesDetail;
