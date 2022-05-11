import React, { useEffect, useState } from 'react';

import { Table, Button, Row, Col, Tooltip } from 'antd';

import { ConversionRateList } from '../utils/ConversionRateList';
import { DeleteOutlined, ControlOutlined } from '@ant-design/icons';
import useWindowSize from '../Hooks/useWindowSize';
import CurrencyStore from '../stores/CurrencyStore';
import { observer } from 'mobx-react-lite';
import TransactionStore, { Transaction } from '../stores/TransactionStore';

interface Props {
  transactions: TransactionStore;
  currency: CurrencyStore;
  handleTransactionsRemove: Function;
}

const ExpensesDetail: React.FC<Props> = ({
  transactions,
  currency,
  handleTransactionsRemove
}): JSX.Element => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { width } = useWindowSize();

  const isMobile = () => {
    return width <= 450;
  }

  const getConversionValue = (amount: number) => {
    return (amount / ConversionRateList[currency.value]).toFixed(2);
  };

  useEffect(() => {
    const calcTotalAmount = () => {
      const totalAmountCalculated = transactions.list.reduce((totalAmount, transaction) => {
        return (totalAmount += Number(transaction.amount));
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
      title: isMobile() ? `(${currency.value})` : `Amount (${currency.value})`,
      dataIndex: 'amount',
      id: 'Conversion-Row',
      columnTitle: 'Conversion-Row',
      render: (amount: number) => {
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
              handleTransactionsRemove(record);
            }}
          />
        ) : (
          <Button
            id="Delete-Action"
            onClick={() => {
              handleTransactionsRemove(record);
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
            )} ${currency.value})`}</h3>
          )}
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={22} sm={24} md={24} lg={24}>
          <Table
            columns={columns}
            dataSource={transactions.list.length ? transactions.list : []}
            rowKey={(record) => `${record.title}:${record.amount}`}
            bordered
            pagination={{
              position: ['bottomRight'],
              defaultPageSize: 5,
              total: transactions.list.length
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default observer(ExpensesDetail);
