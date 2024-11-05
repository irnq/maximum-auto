import { BRAND_OPTIONS } from '@/consts';
import { getCarById, getCarsByBrand } from '@/lib/api';
import Title from '@/ui/Title/Title';
import css from './page.module.scss';
import Card from '@/components/Card/Card';
import Image from 'next/image';
import Slider from '@/components/Slider/Slider';

export async function generateStaticParams() {
  const brands = BRAND_OPTIONS.map(({ value }) => ({ brand: value }));
  const list = await Promise.all(brands.map(({ brand }) => getCarsByBrand(brand)));

  return list.flat().map((car) => ({
    brand: car.brandName.toLowerCase(),
    id: car.car_id,
  }));
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string; id: string }>;
}) {
  const { brand, id } = await params;
  const {
    brandName,
    modelName,
    Year,
    photos,
    vin,
    price,
    EngineSize,
    Power,
    FuelType,
    transmissionRu,
  } = await getCarById(brand, id);

  return (
    <section className={css.wrapper}>
      <header className={css.header}>
        <Title className={css.mb4}>
          {brandName} {modelName} {Year} года
        </Title>
        <p className={css.subtitle}>VIN {vin}</p>
      </header>
      <main className={css.main}>
        <div className={css.features}>
          <Card className={css.mb4}>
            <p className={css.price}>
              {price.toLocaleString('ru-RU')}&nbsp;<span className={css.currency}>₽</span>
            </p>
          </Card>
          <Card className={css.mb12}>
            <p className={css.text}>
              <Image
                src='/red-ok.svg'
                alt='Подтверждение гарантии юр. чистоты'
                width={26}
                height={37}
                className={css.icon}
              />
              Гарантия юр. чистоты
            </p>
          </Card>
          <Title className={css.mb6}>Характеристики</Title>
          <Card spaced>
            <p className={css.text}>
              <Image
                src='/year-icon.svg'
                alt='Пиктограмма производства машины'
                width={90}
                height={90}
                className={css.graph}
              />
              {Year} год выпуска
            </p>
            <p className={css.text}>
              <Image
                src='/engine-icon.svg'
                alt='Пиктограмма двигателя'
                width={90}
                height={90}
                className={css.graph}
              />
              {EngineSize} л / {Power} л.с. / {FuelType}
            </p>
            <p className={css.text}>
              <Image
                src='/transmission-icon.svg'
                alt='Пиктограмма коробки передач'
                width={90}
                height={90}
                className={css.graph}
              />
              КП - {transmissionRu}
            </p>
          </Card>
        </div>
        <Slider className={css.slider}>
          {photos.imgs.map((img) => (
            <Image
              key={img._id}
              src={img.url}
              alt='Фотография машины'
              width={876}
              height={719}
              className={css.img}
            />
          ))}
        </Slider>
      </main>
    </section>
  );
}

