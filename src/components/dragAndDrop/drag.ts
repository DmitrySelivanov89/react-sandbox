import { concatMap, map, Observable, takeUntil } from "rxjs";
import { Position } from "./Position";

export const drag = (
  mouseDown$: Observable<MouseEvent>,
  mouseMove$: Observable<MouseEvent>,
  mouseUp$: Observable<MouseEvent>
): Observable<Position> => mouseDown$.pipe(
  concatMap((startEvent: MouseEvent) => mouseMove$.pipe(
    map((moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      return {
        left: moveEvent.clientX - startEvent.offsetX,
        top: moveEvent.clientY - startEvent.offsetY,
      };
    }),
    takeUntil(mouseUp$)
  ))
);
