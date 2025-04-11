import { useEffect, useRef } from "react";
import { fromEvent, map, Subscription } from "rxjs";
import './Drag.css';
import { drag } from "./drag";
import { useObservable } from "../../hooks/useObservable";

const keyboardKey$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  map((event) => event.key)
);

export const Drag = () => {
  const ref = useRef<HTMLDivElement>(null);
  const key = useObservable(keyboardKey$);

  useEffect(() => {
    let subscription: Subscription;

    if (ref.current) {
      const mouseDown$ = fromEvent<MouseEvent>(ref.current, "mousedown");
      const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
      const mouseUp$ = fromEvent<MouseEvent>(ref.current, "mouseup");

      subscription = drag(mouseDown$, mouseMove$, mouseUp$).subscribe((position) => {
        if (ref.current) {
          ref.current.style.left = `${position.left}px`;
          ref.current.style.top = `${position.top}px`;
        }
      });
    }
    return () => subscription.unsubscribe();
  }, []);

  return <div className={'draggable'} ref={ref}>{key}</div>;
};
