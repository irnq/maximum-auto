import Title from '@/ui/Title/Title';
import css from './FilterBlock.module.scss';
import { TFilterOption } from './types';
import Button from '@/ui/Button/Button';

type TFilterBlockProps<T extends string | number> = {
  title: string;
  options: TFilterOption<T>[];
  value?: T | null;
  onChange?: (value: T) => void;
};
export default function FilterBlock<T extends string | number>({
  title,
  options,
  value,
  onChange,
}: TFilterBlockProps<T>) {
  return (
    <div className={css.wrapper}>
      <Title level={4} className={css.title}>
        {title}
      </Title>

      <div className={css.options}>
        {options.map((option) => (
          <Button
            key={option.value}
            type='outline'
            active={option.value === value}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

