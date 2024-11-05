'use client';
import React, { Children, useState, useEffect, useRef, useCallback } from 'react';
import cn from 'clsx';
import css from './Slider.module.scss';

type TSliderProps = {
  children: React.ReactNode;
  className?: string;
};

const CHANGE_TIME = 4000;

export default function Slider({ children, className }: TSliderProps) {
  const childrenCount = Children.count(children);

  const [active, setActive] = useState(0);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const slide = useRef<HTMLDivElement>(null);

  const setTimerHandler = useCallback(() => {
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % childrenCount);
    }, CHANGE_TIME);
  }, [childrenCount]);

  const clearTimerHandler = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }, []);

  const wheelHandler = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        setActive((prev) => (prev + 1) % childrenCount);
      } else {
        setActive((prev) => (prev - 1 + childrenCount) % childrenCount);
      }
    },
    [childrenCount],
  );

  const setWheelHandler = useCallback(() => {
    wrapper.current?.addEventListener('wheel', wheelHandler);
  }, [wheelHandler]);

  const removeWheelHandler = useCallback(() => {
    wrapper.current?.removeEventListener('wheel', wheelHandler);
  }, [wheelHandler]);

  useEffect(() => {
    setTimerHandler();

    return clearTimerHandler;
  }, [setTimerHandler, clearTimerHandler]);

  useEffect(() => {
    const { current } = wrapper;
    if (current) {
      current.addEventListener('mouseenter', clearTimerHandler);
      current.addEventListener('mouseleave', setTimerHandler);

      current.addEventListener('mouseenter', setWheelHandler);
      current.addEventListener('mouseleave', removeWheelHandler);
    }

    return () => {
      if (current) {
        current.removeEventListener('mouseenter', clearTimerHandler);
        current.removeEventListener('mouseleave', setTimerHandler);

        current.removeEventListener('mouseenter', setWheelHandler);
        current.removeEventListener('mouseleave', removeWheelHandler);
      }
    };
  }, [setTimerHandler, clearTimerHandler, removeWheelHandler, setWheelHandler]);

  useEffect(() => {
    if (slide.current) {
      slide.current.style.transform = `translateX(calc(-${active * 100}% - ${active}px))`;
    }
  }, [active]);

  const controls = Array.from({ length: childrenCount }, (_, index) => (
    <div
      key={index}
      className={cn(css.control, { [css.active]: index === active })}
      onClick={() => setActive(index)}
    ></div>
  ));

  return (
    <div ref={wrapper} className={cn(css.wrapper, className)}>
      <div className={css.slider}>
        <div ref={slide} className={css.slide}>
          {children}
        </div>
      </div>
      <div className={css.controlBlock}>{controls}</div>
    </div>
  );
}

