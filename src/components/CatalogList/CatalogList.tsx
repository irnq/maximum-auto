'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ICar } from '@/types';
import { FilterKey } from '@/consts';
import CatalogCard from '../CatalogCard/CatalogCard';
import css from './CatalogList.module.scss';

type TCatalogListProps = {
  carList: ICar[];
};

export default function CatalogList({ carList }: TCatalogListProps) {
  const searchParams = useSearchParams();
  const engineFilter = useMemo(() => {
    return searchParams.get(FilterKey.ENGINE) ? Number(searchParams.get(FilterKey.ENGINE)) : null;
  }, [searchParams]);

  const complectationFilter = useMemo(() => {
    return searchParams.get(FilterKey.COMPLECTATION)
      ? searchParams.get(FilterKey.COMPLECTATION)
      : null;
  }, [searchParams]);

  const filteredList = useMemo(
    () =>
      carList.filter(
        (car) =>
          (engineFilter ? car.EngineSize === engineFilter : true) &&
          (complectationFilter ? car.Complectation === complectationFilter : true),
      ),
    [carList, engineFilter, complectationFilter],
  );

  return (
    <ul className={css.wrapper}>
      {filteredList.map((car) => (
        <CatalogCard key={car.car_id} car={car} />
      ))}
    </ul>
  );
}

