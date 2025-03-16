import styles from './Tag.module.scss';

interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'mainTag' | 'subTag';
}

export function Tag({ children, onClick, variant = 'mainTag' }: TagProps) {
  return (
    <span className={`${styles.tag} ${variant === 'subTag' ? styles.subTag : styles.mainTag}`} onClick={onClick}>
      {children}
    </span>
  );
}
