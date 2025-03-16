import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onKeyDown, placeholder, className }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${className ?? ''}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    );
  }
);
