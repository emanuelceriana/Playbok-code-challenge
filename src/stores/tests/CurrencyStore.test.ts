import { CurrencyEnum } from "../../utils/ConversionRateList";
import CurrencyStore from "../CurrencyStore";

let currency = new CurrencyStore();

describe("CurrencyStore MobX", () => {
    beforeEach(() => {
        currency = new CurrencyStore();
    });

    test("Default Value should be EUR", () => {
        expect(currency.value).toBe('EUR');
    });

    test("Test constructor initialization with USD", () => {
        currency = new CurrencyStore(CurrencyEnum.USD)
        expect(currency.value).toBe('USD');
    });

    test("setCurrency Value to USD", () => {
        currency.setValue(CurrencyEnum.USD);
        expect(currency.value).toBe('USD');
    });

    test("setCurrency Value to ARS", () => {
        currency.setValue(CurrencyEnum.ARS);
        expect(currency.value).toBe('ARS');
    });
    
})