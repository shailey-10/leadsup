import React from 'react';
import styles from './Button.module.css';

interface Props {
  text: string;
  type: string;
}

const Button = ({ text, type }: Props) => {
  return (
    <button
      type={type === 'Primary' ? 'button' : 'submit'}
      className={type === 'Primary' ? styles.primary : styles.cta}
    >
      {text}
    </button>
  );
};

export default Button;
