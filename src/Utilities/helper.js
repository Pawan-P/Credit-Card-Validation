export const validateCreditCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '').split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validateCVV = (cvv, creditCardNumber) => {
    const cvvLength = getCVVLength(creditCardNumber);
    return cvv.length === cvvLength;
};

export const validateExpirationDate = (date) => {
    const currentDate = new Date();
    const enteredDate = new Date(date);
    return enteredDate > currentDate;
};

export const getCVVLength = (cardNumber) => {
    return cardNumber.startsWith('3') ? 4 : 3;
};

export const getCardNetwork = (cardNumber) => {
    if (cardNumber.startsWith('4')) {
      return 'Visa';
    } else if (cardNumber.match(/^5[1-5]/)) {
      return 'MasterCard';
    } else if (cardNumber.match(/^3[47]/)) {
      return 'AmericanExpress';
    }
    return 'Unknown';
  };