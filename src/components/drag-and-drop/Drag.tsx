import { useEffect, useRef } from "react";
import { fromEvent } from "rxjs";
import './Drag.css';
import { drag } from "./drag-and-drop";

export const Drag = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const mouseDown$ = fromEvent<MouseEvent>(ref.current, "mousedown");
      const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
      const mouseUp$ = fromEvent<MouseEvent>(ref.current, "mouseup");

      drag(mouseDown$, mouseMove$, mouseUp$).subscribe((position) => {
        if (ref.current) {
          ref.current.style.left = `${position.left}px`;
          ref.current.style.top = `${position.top}px`;
        }
      });
    }
  }, []);

  return <div className={'draggable'} ref={ref}></div>;
};
