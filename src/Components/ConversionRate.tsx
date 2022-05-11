import React from 'react';

import { observer } from 'mobx-react-lite';
import CurrencyStore from '../stores/CurrencyStore';

import { Menu, Dropdown, Row, Col } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { DownOutlined } from '@ant-design/icons';


import { ConversionRateList, CurrencyEnum } from '../utils/ConversionRateList';

interface Props {
  currency: CurrencyStore;
}

const ConversionRate: React.FC<Props> = ({ currency }): JSX.Element => {
  const menu = () => {
    const getItems = () => {
      return Object.keys(ConversionRateList).map((currencyKey) => {
        return {
          key: currencyKey,
          label: (
            <div id={currencyKey} onClick={() => currency.setValue(currencyKey as CurrencyEnum)}>
              {currencyKey}
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
              {`1${currency.value} = ${ConversionRateList[currency.value]} PLN`} <DownOutlined />
            </h3>
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default observer(ConversionRate);
