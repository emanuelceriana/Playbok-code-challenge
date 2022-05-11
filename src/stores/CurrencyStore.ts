import { makeObservable, observable, action } from 'mobx';
import { CurrencyEnum } from '../utils/ConversionRateList';

class CurrencyStore {
    value: CurrencyEnum;

    constructor(initialValue: CurrencyEnum = CurrencyEnum.EUR) {
        this.value = initialValue;
        makeObservable(this, {
            value: observable,
            setValue: action
        })
    }

    setValue(currency: CurrencyEnum) {
        this.value = currency;
    }

}

export default CurrencyStore;