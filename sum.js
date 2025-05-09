function add(a, b) {
<<<<<<< HEAD
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
  
  module.exports = { add, subtract, multiply, divide };
  
=======
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
>>>>>>> ae87aadae8984caeff002c638574c89ecacf4f4b
