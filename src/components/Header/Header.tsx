import Image from 'next/image';
import Link from 'next/link';
import css from './Header.module.scss';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <Link href='/'>
          <Image className={css.logo} src='/logo.svg' alt='Maximum logo' width={154} height={42} />
        </Link>
        <div className={css.divider} />
        <span>Официальный дилер Максимум</span>
      </div>
    </header>
  );
}

