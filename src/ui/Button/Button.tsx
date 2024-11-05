import cn from 'clsx';
import css from './Button.module.scss';

type TButtonProps = {
  children: React.ReactNode;
  type?: 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  type = 'primary',
  size = 'medium',
  fullWidth,
  active,
  className,
  onClick,
}: TButtonProps) {
  return (
    <button
      className={cn(
        css.button,
        css[`${type}`],
        css[`${size}`],
        { [css.fullwidth]: fullWidth },
        { [css.active]: active },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

