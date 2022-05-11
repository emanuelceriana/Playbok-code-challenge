import { shallow } from 'enzyme';

import ConversionRate from '../ConversionRate';
import { ConversionRateList, CurrencyEnum } from '../../utils/ConversionRateList';
import CurrencyStore from '../../stores/CurrencyStore';

describe('Test Case Conversion Rate component', () => {
  test('Test Conversion Rate text', () => {

    const currency = new CurrencyStore();

    const wrapper = shallow(
      <ConversionRate currency={currency} />
    );
    const currencyText = '1EUR = 4.66 PLN';

    expect(wrapper.contains(currencyText)).toEqual(true);
  });

  test('Test conversion rate with CurrencyEnum', () => {

    const currency = new CurrencyStore(CurrencyEnum.ARS);

    const currencyRate = ConversionRateList[currency.value];

    const currencyText = `1${currency.value} = ${currencyRate} PLN`;
    const wrapper = shallow(<ConversionRate currency={currency} />);

    expect(wrapper.contains(currencyText)).toEqual(true);
  });

});
