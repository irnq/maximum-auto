import { ICar } from '@/types';

export function getCarsByBrand(brand: string): Promise<ICar[]> {
  return fetch(`https://test2.maximum-haval.ru/public/test-task/v1/brand/${brand}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function getCarById(brand: string, id: string): Promise<ICar> {
  return fetch(`https://test2.maximum-haval.ru/public/test-task/v1/brand/${brand}?car_id=${id}`)
    .then((res) => res.json())
    .then((res) => res[0])
    .catch((err) => console.log(err));
}

