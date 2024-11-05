import cn from 'clsx';
import css from './Title.module.scss';

type TTitleProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};
export default function Title({ children, level = 1, className }: TTitleProps) {
  const TitleTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <TitleTag className={cn(css.title, css[`level-${level}`], className)}>{children}</TitleTag>
  );
}

