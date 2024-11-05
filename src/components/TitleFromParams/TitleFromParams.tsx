'use client';
import Title from '@/ui/Title/Title';
import { usePathname } from 'next/navigation';
import capitalize from '../../utils/capitalize';

export default function TitleFromParams() {
  const pathname = usePathname();

  const brandName = capitalize(pathname.split('/')[1].toLowerCase());

  return <Title>Автомобили {brandName} в СПб</Title>;
}

