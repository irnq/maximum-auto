import cn from 'clsx';
import css from './Card.module.scss';

export type TCardProps = {
  children: React.ReactNode;
  className?: string;
  spaced?: boolean;
};

export default function Card({ children, className, spaced }: TCardProps) {
  return <div className={cn(css.wrapper, { [css.spaced]: spaced }, className)}>{children}</div>;
}

