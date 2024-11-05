import css from './loading.module.scss';

export default function Loading() {
  return (
    <div className={css.wrapper}>
      <div className={css.loader}></div>
    </div>
  );
}

