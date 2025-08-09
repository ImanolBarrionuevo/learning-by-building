/** Calculator display element */
const display = document.querySelector('#display');

/** All calculator buttons */
const buttons = document.querySelectorAll('button');

/** Flag to track if the last action was an evaluation */
let justEvaluated = false;

/** Main dispatcher for button actions */
function handleButtonClick(value) {
    if (value === 'AC') {
        handleClear();
    } else if (value === 'DEL') {
        handleDelete();
    } else if (value === '=') {
        handleEvaluate();
    } else if (value === '()') {
        handleParenthesis();
    } else {
        handleInput(value);
    }
}

/** Clears the display and resets evaluation state */
function handleClear() {
    display.value = '';
    justEvaluated = false;
}

/** Deletes the last character from the display */
function handleDelete() {
    display.value = display.value.slice(0, -1);
    justEvaluated = false;
}

/** Evaluates the current expression and updates the display */
function handleEvaluate() {
    display.classList.add('flash');
    setTimeout(() => display.classList.remove('flash'), 400);
    display.value = evaluateExpression(display.value);
    justEvaluated = true;
}

/**
 * Inserts parentheses based on current expression context
 * Balances open/close or starts a new group
 */
function handleParenthesis() {
    if (justEvaluated) {
        display.value = '(';
    } else {
        const expr = display.value;
        const openCount = (expr.match(/\(/g) || []).length;
        const closeCount = (expr.match(/\)/g) || []).length;
        const lastChar = expr.slice(-1);

        if (
            openCount === closeCount ||
            lastChar === '(' ||
            ['+', '-', '*', '/', ''].includes(lastChar)
        ) {
            display.value += '(';
        } else if (openCount > closeCount) {
            display.value += ')';
        }
    }
    justEvaluated = false;
}

/**
 * Handles input of numbers and operators
 * Resets display if last action was evaluation
 */
function handleInput(value) {
    if (justEvaluated) {
        if (/[0-9.]/.test(value)) {
            display.value = value;
        } else if (/[\+\-\*\/\%]/.test(value)) {
            display.value += value;
        }
    } else {
        display.value += value;
    }
    justEvaluated = false;
}

/**
 * Safely evaluates a mathematical expression
 * 'expr' - The expression to evaluate
 * Result or 'Error' if invalid
 */
function evaluateExpression(expr) {
    try {
        return Function('"use strict"; return (' + expr + ')')();
    } catch (error) {
        return 'Error';
    }
}

/** Adds click event listeners to all calculator buttons */
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        handleButtonClick(btn.textContent);
    });
});
