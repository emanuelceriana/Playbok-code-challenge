interface ConversionRateListInterface {
  [key: string]: number;
}

//TO-DO Implement async fetching to get rates in real time from a banking API
export const ConversionRateList: ConversionRateListInterface = {
  EUR: 4.66,
  USD: 4.35,
  ARS: 0.038
};

export enum CurrencyEnum {
  'EUR' = 'EUR',
  'USD' = 'USD',
  'ARS' = 'ARS'
}
