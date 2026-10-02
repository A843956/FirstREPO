const display = document.querySelector("#display");
const status = document.querySelector("#status");
const keys = document.querySelector("#keys");

let currentInput = "0";
let storedValue = null;
let pendingMethod = null;
let replaceInput = false;

function showValue(value) {
  currentInput = String(value);
  display.textContent = currentInput;
}

function enterDigit(digit) {
  if (replaceInput || currentInput === "0" || currentInput === "Error") {
    currentInput = digit;
    replaceInput = false;
  } else {
    currentInput += digit;
  }
  status.textContent = "";
  display.textContent = currentInput;
}

function selectOperator(method) {
  const value = Number(currentInput);

  if (pendingMethod && !replaceInput) {
    if (!applyPending(value)) return;
  } else {
    storedValue = value;
  }

  pendingMethod = method;
  replaceInput = true;
  status.textContent = `${storedValue} ${operatorSymbol(method)}`;
}

function applyPending(rightValue) {
  const calculator = new Calculator();
  calculator.add(storedValue);

  try {
    calculator[pendingMethod](rightValue);
    storedValue = calculator.value;
    showValue(storedValue);
    status.textContent = "";
    return true;
  } catch (error) {
    showError(error);
    return false;
  }
}

function operatorSymbol(method) {
  return {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
    power: "^"
  }[method];
}

function equals() {
  if (!pendingMethod) return;
  if (applyPending(Number(currentInput))) {
    pendingMethod = null;
    storedValue = null;
    replaceInput = true;
  }
}

function runUnary(method) {
  const calculator = new Calculator();

  try {
    calculator.add(Number(currentInput));
    calculator[method]();
    showValue(calculator.value);
    status.textContent = "";
    replaceInput = true;
  } catch (error) {
    showError(error);
  }
}

function showError(error) {
  currentInput = "Error";
  display.textContent = currentInput;
  status.textContent = error.message;
  pendingMethod = null;
  storedValue = null;
  replaceInput = true;
}

function clear() {
  currentInput = "0";
  storedValue = null;
  pendingMethod = null;
  replaceInput = false;
  display.textContent = currentInput;
  status.textContent = "";
}

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.digit !== undefined) {
    enterDigit(button.dataset.digit);
    return;
  }

  switch (button.dataset.action) {
    case "clear":
      clear();
      break;
    case "decimal":
      if (replaceInput || currentInput === "Error") {
        currentInput = "0";
        replaceInput = false;
      }
      if (!currentInput.includes(".")) currentInput += ".";
      display.textContent = currentInput;
      status.textContent = "";
      break;
    case "sign":
      if (currentInput !== "0" && currentInput !== "Error") {
        showValue(-Number(currentInput));
      }
      break;
    case "operator":
      selectOperator(button.dataset.method);
      break;
    case "unary":
      runUnary(button.dataset.method);
      break;
    case "equals":
      equals();
      break;
  }
});
