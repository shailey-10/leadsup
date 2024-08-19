import styles from './Button.module.css';

interface Props {
  text: string;
  type: string; 
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, type, onClick, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      type={type === 'Primary' ? 'button' : 'submit'}
      className={type === 'Primary' ? styles.primary : styles.cta}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
