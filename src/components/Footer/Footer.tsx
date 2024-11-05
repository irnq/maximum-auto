import Title from '@/ui/Title/Title';
import css from './Footer.module.scss';
import Button from '@/ui/Button/Button';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrapper}>
        <Title>Кредит на новый Chery Tiggo</Title>
        <div className={css.description}>
          Оформите кредит на любой автомобиль ассортимента дилерского центра «Максимум»
        </div>
        <Button size='large' className={css.button}>
          Оформить
        </Button>
      </div>
    </footer>
  );
}

