type ValidationRulesType = {
  [key: string]: (value: string) => void;
};

type ValidationMessagesType = {
  [key: string]: (value: string) => Array<string>;
};

const isEmpty = (value: string): boolean => {
  return !value.length;
};

const validateTitle = (value: string): boolean => {
  return value.length >= 5 ? true : false;
};

const errorMessagesTitle = (value: string): Array<string> => {
  let messages = [];

  if (isEmpty(value)) messages.push('Required Field');

  if (!validateTitle(value)) messages.push('Minimum length is 5');

  return messages;
};

const validateAmount = (value: string): boolean => {
  let validation = false;
  let parsedValue = Number(value.replace(',', '.'));

  if (parsedValue && parsedValue !== NaN) {
    let decimal = parsedValue.toString().split('.')[1];
    if (decimal) {
      validation = decimal.length <= 2 ? true : false;
    } else {
      validation = true;
    }
  }

  return validation;
};

const errorMessagesAmount = (value: string): Array<string> => {
  let messages = [];

  let parsedValue = Number(value.replace(',', '.'));

  if (parsedValue && parsedValue !== NaN) {
    let decimal = parsedValue.toString().split('.')[1];
    if (decimal && decimal.length > 2) messages.push('Max digits quantity after comma is 2');
  } else if (!isEmpty(value)) {
    messages.push('Amount is not a valid number');
  } else {
    messages.push('Required Field');
  }

  return messages;
};

export const ValidationRules: ValidationRulesType = {
  title: (value: string) => {
    return validateTitle(value);
  },
  amount: (value: string) => {
    return validateAmount(value);
  }
};

export const ValidationMessages: ValidationMessagesType = {
  title: (value: string) => {
    return errorMessagesTitle(value);
  },
  amount: (value: string) => {
    return errorMessagesAmount(value);
  }
};
