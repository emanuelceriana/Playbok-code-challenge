import { shallow, mount } from 'enzyme';

import { Dropdown } from 'antd';

import ConversionRate from '../ConversionRate';
import { ConversionRateList, CurrencyEnum } from '../../utils/ConversionRateList';

describe('Test Case Conversion Rate component', () => {
  test('Test Conversion Rate text', () => {
    const wrapper = shallow(
      <ConversionRate currency={CurrencyEnum.EUR} setCurrency={new Function()} />
    );
    const currencyText = '1EUR = 4.66 PLN';

    expect(wrapper.contains(currencyText)).toEqual(true);
  });

  test('Test conversion rate with CurrencyEnum', () => {
    const currency = CurrencyEnum.ARS;
    const currencyRate = ConversionRateList[currency];

    const currencyText = `1${currency} = ${currencyRate} PLN`;
    const wrapper = shallow(<ConversionRate currency={currency} setCurrency={new Function()} />);

    expect(wrapper.contains(currencyText)).toEqual(true);
  });

  test('Test Conversion Rate setCurrency prop ', () => {
    const setCurrency = jest.fn();

    const currency = CurrencyEnum.EUR;

    const wrapper = mount(<ConversionRate currency={currency} setCurrency={setCurrency} />);

    const overlay = wrapper.find(Dropdown).prop('overlay') as any;

    //For each item in the dropdown list check if setCurrency is called with the correct key
    overlay.props.items[0].children.forEach((itemMenu: any) => {
      itemMenu.label.props.onClick();
      expect(setCurrency).toBeCalledWith(itemMenu.key);
    });
  });
});
