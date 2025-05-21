function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  // This is a comment
  // This is another comment
  // This is a third comment
  // This is a fourth comment
  // This is a fifth comment
  // This is a sixth comment
  
  function multiply(a, b) {
    return a * b;
  }
  
  
  function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
  
  module.exports = { add, subtract, multiply, divide };
  