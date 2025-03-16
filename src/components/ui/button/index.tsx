import styles from './Button.module.scss';

interface ButtonProps {
  variant?: "ghost" | "primary";
  onClick?: () => void;
  children: React.ReactNode;
  className?:string;
}

export function Button({ variant = "primary", onClick, children, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${variant === "ghost" ? styles.ghost : styles.primary} ${className && className}`}
    >
      {children}
    </button>
  );
}
