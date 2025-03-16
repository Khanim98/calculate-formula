import styles from './DropDown.module.scss';

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({ children, className }: DropdownProps) {
  return <div className={`${styles.dropdown} ${className ?? ''}`}>{children}</div>;
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function DropdownItem({ children, onClick }: DropdownItemProps) {
  return (
    <div className={styles.dropdownItem} onClick={onClick}>
      {children}
    </div>
  );
}
