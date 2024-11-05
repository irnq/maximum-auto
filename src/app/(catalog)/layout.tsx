import { Suspense } from 'react';
import SideFilter from '@/components/SideFilter/SideFilter';
import TitleFromParams from '@/components/TitleFromParams/TitleFromParams';
import css from './layout.module.scss';

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={css.main}>
      <TitleFromParams />
      <div className={css.content}>
        <Suspense>
          <SideFilter />
        </Suspense>
        {children}
      </div>
    </main>
  );
}

