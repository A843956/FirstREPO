class Calculator {
  constructor() {
    this.value = 0;
  }

  add(num) {
    this.value += num;
    return this;
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  divide(num) {
    if (num === 0) {
      throw new Error("Cannot divide by zero");
    }

    this.value /= num;
    return this;
  }

  negate() {
    this.value = -this.value;
    return this;
  }

  clear() {
    this.value = 0;
    return this;
  }

  power(exponent) {
    this.value = this.value ** exponent;
    return this;
  }

  sqrt() {
    if (this.value < 0) {
      throw new Error("Cannot take the square root of a negative number");
    }
    this.value = Math.sqrt(this.value);
    return this;
  }

  reciprocal() {
    if (this.value === 0) {
      throw new Error("Cannot take the reciprocal of zero");
    }
    this.value = 1 / this.value;
    return this;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Calculator;
}

if (typeof window !== "undefined") {
  window.Calculator = Calculator;
}