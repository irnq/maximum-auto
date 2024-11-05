import Footer from '@/components/Footer/Footer';
import css from './layout.module.scss';

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.page}>
      {children}
      <Footer />
    </div>
  );
}

