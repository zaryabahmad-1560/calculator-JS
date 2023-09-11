function infixToPostfix(expression) {
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
  
    const output = [];
    const operatorStack = [];
  
    const tokens = expression.split(/\s+/);
  
    tokens.forEach(token => {
      if (!isNaN(token)) {
        output.push(token);
      } else if (token in precedence) {
        while (
          operatorStack.length &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
        ) {
          output.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    });
  
    while (operatorStack.length > 0) {
      output.push(operatorStack.pop());
    }
  
    return output.join(' ');
}

function evaluatePostfix(expression) {
    const stack = [];
  
    const tokens = expression.split(/\s+/);
  
    tokens.forEach(token => {
      if (!isNaN(token)) {
        // Operand, push onto the stack
        stack.push(parseFloat(token));
      } else if (token === '+' || token === '-' || token === '*' || token === '/') {
        // Operator, perform the operation
        if (stack.length < 2) {
          throw new Error("Invalid postfix expression");
        }
        const operand2 = stack.pop();
        const operand1 = stack.pop();
  
        let result;
        switch (token) {
          case '+':
            result = operand1 + operand2;
            break;
          case '-':
            result = operand1 - operand2;
            break;
          case '*':
            result = operand1 * operand2;
            break;
          case '/':
            if (operand2 === 0) {
              throw new Error("Division by zero");
            }
            result = operand1 / operand2;
            break;
        }
  
        stack.push(result);
      } else {
        throw new Error("Invalid token: " + token);
      }
    });
    
    if (stack.length !== 1) {
        throw new Error("Invalid postfix expression");
    }
    
    return stack[0];
}

function isValidInfix(expression) {
    const validTokenPattern = /^(\d+|\+|-|\*|\/|\(|\))+$/;
    const cleanedExpression = expression.replace(/\s/g, '');
    return validTokenPattern.test(cleanedExpression);
}

function buttonEventListener(param) {
    let button = param['target'].id;
    
    let display = document.getElementById("display");
    if (button === "cButton") {
        console.log("C button is pressed");
        display.value = "0";
        return;
    }
    else if (button === "resultButton") {
        if (!isValidInfix(display.value)) {
            display.value = "ERROR";
            return;
        }
        let postfix = infixToPostfix(display.value);
        display.value = evaluatePostfix(postfix);
        return;
    }

    if (display.value === "0")
        display.value = "";

    let flag = true;
    opButtons.forEach(element => {
        if (element + "Button" === button) {
            display.value += (" " + document.getElementById(button).innerText + " ");
            flag = false;
        }
    });

    if (flag)
        display.value += document.getElementById(button).innerText;
}


let opButtons = ['result', 'add', 'sub', 'multiply', 'divide', 'c']

opButtons.forEach(element => {
    document.getElementById(`${element}Button`).addEventListener('click', buttonEventListener)
});

for (let i = 0; i < 10; i++) {
    document.getElementById(`button${i}`).addEventListener('click', buttonEventListener)
}
