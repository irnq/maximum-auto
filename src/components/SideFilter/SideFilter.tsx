'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { BRAND_OPTIONS, ENGINE_OPTIONS, COMPLECTATION_OPTIONS, FilterKey } from '@/consts';
import FilterBlock from '../FilterBlock/FilterBlock';
import css from './SideFilter.module.scss';
import { INITIAL_STATE, TFilterState } from './const';
import Button from '@/ui/Button/Button';

type THandleChangeFilter = ((value: string, key: Exclude<keyof TFilterState, 'engine'>) => void) &
  ((value: number, key: 'engine') => void);

export default function SideFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterState, setFilterState] = useState<TFilterState>({
    brand: pathname.toLowerCase().split('/')[1] || 'chery',
    complectation: searchParams.get(FilterKey.COMPLECTATION) || null,
    engine: searchParams.get(FilterKey.ENGINE) ? Number(searchParams.get(FilterKey.ENGINE)) : null,
  });
  const [width, setWidth] = useState(0);
  console.log('width: ', width);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setWidth(rect.width);
    });
    observer.observe(document.documentElement);

    return () => {
      observer.unobserve(document.documentElement);
    };
  }, []);

  const handleChangeFilter: THandleChangeFilter = (value, key) => {
    setFilterState({ ...filterState, [key]: value });
    const params = new URLSearchParams(searchParams.toString());

    if (key === FilterKey.ENGINE || key === FilterKey.COMPLECTATION) {
      if (value && value !== filterState[key]) {
        params.set(key, String(value));
      } else {
        params.delete(key);
        setFilterState({ ...filterState, [key]: null });
      }
      router.push(`/${filterState.brand}?${params.toString()}`);
    } else {
      router.push(`/${value}?${params.toString()}`);
    }
  };

  const handleResetFilter = () => {
    setFilterState((prevState) => ({ ...INITIAL_STATE, brand: prevState.brand }));

    const params = new URLSearchParams(searchParams.toString());
    params.delete(FilterKey.ENGINE);
    params.delete(FilterKey.COMPLECTATION);

    router.push(`/${filterState.brand}?${params.toString()}`);
  };

  return (
    <div className={css.wrapper}>
      <FilterBlock
        title='Бренд'
        options={BRAND_OPTIONS}
        value={filterState.brand}
        onChange={(value) => handleChangeFilter(value, FilterKey.BRAND)}
      />
      {width > 960 && (
        <>
          <FilterBlock
            title='Объем двигателя'
            options={ENGINE_OPTIONS}
            value={filterState.engine}
            onChange={(value) => handleChangeFilter(value, FilterKey.ENGINE)}
          />
          <FilterBlock
            title='Комплектация'
            options={COMPLECTATION_OPTIONS}
            value={filterState.complectation}
            onChange={(value) => handleChangeFilter(value, FilterKey.COMPLECTATION)}
          />
          <Button fullWidth type='outline' size='large' onClick={handleResetFilter}>
            Сбросить фильтр
          </Button>
        </>
      )}
    </div>
  );
}

