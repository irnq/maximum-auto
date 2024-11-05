import Image from 'next/image';
import Link from 'next/link';
import css from './CatalogCard.module.scss';
import { ICar } from '@/types';
import Title from '@/ui/Title/Title';
import Button from '@/ui/Button/Button';

type TCatalogCardProps = {
  car: ICar;
};

export default function CatalogCard({ car }: TCatalogCardProps) {
  const { photos, brandName, modelName, EngineSize, Power, Transmission, car_id } = car;

  return (
    <li className={css.wrapper}>
      <Image
        src={photos.imgs[0].urlThumb}
        alt={`${brandName} ${modelName} photo`}
        width={440}
        height={292}
        className={css.img}
      />
      <div className={css.info}>
        <Title level={3}>
          {brandName} {modelName}
        </Title>
        <p className={css.subtitle}>
          {EngineSize} / {Power} л.с./ {Transmission}
        </p>
      </div>

      <Link href={`/${brandName.toLowerCase()}/${car_id}`}>
        <Button size='large' fullWidth>
          Подробнее
        </Button>
      </Link>
    </li>
  );
}

