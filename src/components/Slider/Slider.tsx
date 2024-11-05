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

  const wheelHandler = (event: WheelEvent) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      setActive((prev) => (prev + 1) % childrenCount);
    } else {
      setActive((prev) => (prev - 1 + childrenCount) % childrenCount);
    }
  };

  const setWheelHandler = () => {
    wrapper.current?.addEventListener('wheel', wheelHandler);
  };

  const removeWheelHandler = (event: MouseEvent) => {
    wrapper.current?.removeEventListener('wheel', wheelHandler);
  };

  useEffect(() => {
    setTimerHandler();

    return clearTimerHandler;
  }, [setTimerHandler, clearTimerHandler]);

  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.addEventListener('mouseenter', clearTimerHandler);
      wrapper.current.addEventListener('mouseleave', setTimerHandler);

      wrapper.current.addEventListener('mouseenter', setWheelHandler);
      wrapper.current.addEventListener('mouseleave', removeWheelHandler);
    }

    return () => {
      if (wrapper.current) {
        wrapper.current.removeEventListener('mouseenter', clearTimerHandler);
        wrapper.current.removeEventListener('mouseleave', setTimerHandler);

        wrapper.current.removeEventListener('mouseenter', setWheelHandler);
        wrapper.current.removeEventListener('mouseleave', removeWheelHandler);
      }
    };
  }, [setTimerHandler, clearTimerHandler]);

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

