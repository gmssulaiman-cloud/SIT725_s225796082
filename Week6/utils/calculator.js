function divideNumbers(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Inputs must be numbers');
  }

  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }

  return a / b;
}

module.exports = { divideNumbers };