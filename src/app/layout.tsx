import type { Metadata } from 'next';
import cn from 'clsx';
import localFont from 'next/font/local';
import './normalize.css';
import './globals.css';
import Header from '@/components/Header/Header';
import css from './layout.module.scss';

const TacticRegular = localFont({
  src: './fonts/TacticSans-Reg.woff2',
  variable: '--font-tactic-sans',
  weight: '400',
});
const TacticMd = localFont({
  src: './fonts/TacticSans-Med.woff2',
  variable: '--font-tactic-md',
  weight: '500',
});
const TacticBold = localFont({
  src: './fonts/TacticSans-Bld.woff2',
  variable: '--font-tactic-bold',
  weight: '600',
});
const TacticBlack = localFont({
  src: './fonts/TacticSans-Blk.woff2',
  variable: '--font-tactic-black',
  weight: '700',
});
const TacticUltra = localFont({
  src: './fonts/TacticSans-Ult.woff2',
  variable: '--font-tactic-ultra',
  weight: '900',
});
const RobotoBold = localFont({
  src: './fonts/Roboto-Bold.woff2',
  variable: '--font-roboto-bold',
  weight: '700',
});

export const metadata: Metadata = {
  title: 'Maximum Auto',
  description: 'Официальный дилер Maximum',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body
        className={cn(
          TacticRegular.variable,
          TacticMd.variable,
          TacticBold.variable,
          TacticBlack.variable,
          TacticUltra.variable,
          RobotoBold.variable,
          css.page,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

