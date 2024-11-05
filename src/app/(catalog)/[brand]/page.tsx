import { Suspense } from 'react';
import CatalogList from '@/components/CatalogList/CatalogList';
import { getCarsByBrand } from '@/lib/api';
import Loading from './loading';
import { BRAND_OPTIONS } from '@/consts';

export function generateStaticParams() {
  return BRAND_OPTIONS.map(({ value }) => ({ brand: value }));
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const cars = await getCarsByBrand(brand);

  return (
    <Suspense fallback={<Loading />}>
      <CatalogList carList={cars} />
    </Suspense>
  );
}

