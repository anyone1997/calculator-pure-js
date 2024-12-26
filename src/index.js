class Calculator {
    constructor() {
      this.currentValue = 0;
      this.storedValue = 0;
      this.operator = null;
      this.isNewInput = true;
    }

    handleNumber(value) {
      if (this.isNewInput) {
        this.currentValue = value;
        this.isNewInput = false;
      } else {
        this.currentValue = this.currentValue * 10 + value;
      }
      return this.currentValue;
    }

    handleOperator(operator) {
      if (this.operator) this.calculate();
      this.storedValue = this.currentValue;
      this.operator = operator;
      this.isNewInput = true;
    }

    calculate() {
      switch (this.operator) {
        case 'add':
          this.currentValue = this.storedValue + this.currentValue;
          break;
        case 'subtract':
          this.currentValue = this.storedValue - this.currentValue;
          break;
        case 'multiply':
          this.currentValue = this.storedValue * this.currentValue;
          break;
        case 'divide':
          if (this.currentValue === 0) {
            this.currentValue = 'Error';
          } else {
            this.currentValue = this.storedValue / this.currentValue;
          }
          break;
      }
      this.operator = null;
      this.storedValue = 0;
      return this.currentValue;
    }

    clear() {
      this.currentValue = 0;
      this.storedValue = 0;
      this.operator = null;
      this.isNewInput = true;
      return this.currentValue;
    }

    changeSign() {
      this.currentValue = -this.currentValue;
      return this.currentValue;
    }

    percentage() {
      this.currentValue = this.currentValue / 100;
      return this.currentValue;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    const display = document.getElementById('display');
    const themeToggle = document.getElementById('theme-toggle');
    let isDarkTheme = false;

    themeToggle.addEventListener('click', () => {
      isDarkTheme = !isDarkTheme;
      document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    });

    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.dataset.value ? parseFloat(button.dataset.value) : null;

        let result;

        switch (action) {
          case 'number':
            result = calculator.handleNumber(value);
            break;
          case 'add':
          case 'subtract':
          case 'multiply':
          case 'divide':
            calculator.handleOperator(action);
            result = calculator.currentValue;
            break;
          case 'equals':
            result = calculator.calculate();
            break;
          case 'clear':
            result = calculator.clear();
            break;
          case 'changeSign':
            result = calculator.changeSign();
            break;
          case 'percentage':
            result = calculator.percentage();
            break;
          case 'decimal':
            // Add decimal logic if needed
            break;
        }

        display.value = result;
      });
    });
  });