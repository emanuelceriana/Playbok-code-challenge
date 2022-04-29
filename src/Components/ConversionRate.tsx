import React from 'react';

import { Menu, Dropdown, Row, Col } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { DownOutlined } from '@ant-design/icons';

import { ConversionRateList, CurrencyEnum } from '../utils/ConversionRateList';

interface Props {
  currency?: CurrencyEnum;
  setCurrency: Function;
}

const ConversionRate: React.FC<Props> = ({ currency = 'EUR', setCurrency }): JSX.Element => {
  const menu = () => {
    const getItems = () => {
      return Object.keys(ConversionRateList).map((currency) => {
        return {
          key: currency,
          label: (
            <div id={currency} onClick={() => setCurrency(currency)}>
              {currency}
            </div>
          )
        };
      });
    };

    const items: ItemType[] = [
      {
        type: 'group',
        children: getItems()
      }
    ];

    return <Menu items={items} />;
  };

  return (
    <Row justify="end">
      <Col>
        <Dropdown overlay={menu()}>
          <div id="dropdown" style={{ maxWidth: '180px' }}>
            <h3>
              {`1${currency} = ${ConversionRateList[currency]} PLN`} <DownOutlined />
            </h3>
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default ConversionRate;
