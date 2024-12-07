import { useEffect, useRef } from "react";
import { fromEvent, ReplaySubject, takeUntil } from "rxjs";
import './Drag.css';
import React from 'react';
import { drag } from "./drag";

export const Drag = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const destroy$ = new ReplaySubject<void>();
    if (ref.current) {
      const mouseDown$ = fromEvent<MouseEvent>(ref.current, "mousedown");
      const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
      const mouseUp$ = fromEvent<MouseEvent>(ref.current, "mouseup");

      drag(mouseDown$, mouseMove$, mouseUp$).pipe(
        takeUntil(destroy$),
      ).subscribe((position) => {
        if (ref.current) {
          ref.current.style.left = `${position.left}px`;
          ref.current.style.top = `${position.top}px`;
        }
      });
    }
    return () => {
      destroy$.next();
      destroy$.complete();
    };
  }, []);

  return <div className={'draggable'} ref={ref}></div>;
};
