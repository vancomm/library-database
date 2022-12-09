import { useState } from 'react';
import cn from 'classnames';
import styles from './Calculator.module.css';

export default function Calculator() {
  const ops = {
    '': (a, b) => b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '×': (a, b) => a * b,
    '÷': (a, b) => a / b,
  };

  const calculate = (op, a, b) => ops[op](parseFloat(a), parseFloat(b));

  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState('');

  const handleAllClearClick = (e) => {
    setPreviousOperand('');
    setOperation('');
    setCurrentOperand('0');
  };

  const handleDeleteClick = () => {
    const shortened = /[^\d.]/.test(currentOperand)
      ? '0'
      : currentOperand.slice(0, -1);
    const res = shortened.length > 0 ? shortened : '0';
    setCurrentOperand(res);
  };

  const handleOperationClick = (op) => () => {
    setPreviousOperand(calculate(operation, previousOperand, currentOperand).toString());
    setOperation(op);
    setCurrentOperand('0');
  };

  const handleNumberClick = (num) => () => {
    setCurrentOperand(currentOperand.concat(num).replace(/^0(?!\.)/, ''));
  };

  const handlePointClick = () => {
    if (!currentOperand.includes('.')) setCurrentOperand(currentOperand.concat('.'));
  };

  const handleEqualsClick = () => {
    setPreviousOperand('');
    setOperation('');
    setCurrentOperand(calculate(operation, previousOperand, currentOperand).toString());
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.screen}>
        <div className={styles['previous-operand']}>{[previousOperand, operation].join(' ')}</div>
        <div className={styles['current-operand']}>{currentOperand}</div>
      </div>
      <button type="button" className={cn('action-btn', styles['span-2'])} onClick={handleAllClearClick}>
        AC
      </button>
      <button type="button" className="action-btn" onClick={handleDeleteClick}>
        DEL
      </button>
      <button type="button" className={styles['op-btn']} onClick={handleOperationClick('÷')}>
        ÷
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(1)}>
        1
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(2)}>
        2
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(3)}>
        3
      </button>
      <button type="button" className={styles['op-btn']} onClick={handleOperationClick('×')}>
        ×
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(4)}>
        4
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(5)}>
        5
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(6)}>
        6
      </button>
      <button type="button" className={styles['op-btn']} onClick={handleOperationClick('+')}>
        +
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(7)}>
        7
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(8)}>
        8
      </button>
      <button type="button" className={styles['num-btn']} onClick={handleNumberClick(9)}>
        9
      </button>
      <button type="button" className={styles['op-btn']} onClick={handleOperationClick('-')}>
        -
      </button>
      <button type="button" className={cn(styles['num-btn'], styles['span-2'])} onClick={handleNumberClick(0)}>
        0
      </button>
      <button type="button" className={styles['num-btn']} onClick={handlePointClick}>
        .
      </button>
      <button type="button" className={styles['op-btn']} onClick={handleEqualsClick}>
        =
      </button>
    </div>
  );
}
