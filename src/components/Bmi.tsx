import { combineLatest, map, Subject } from "rxjs";
import { useObservable } from "../hooks/useObservable";

const weight = new Subject<number>();
const height = new Subject<number>();

const calculateBmi = (weight: number, height: number) => {
  return (weight / (height / 100 * height / 100)).toFixed(2);
};

const bmi$ = combineLatest([weight.asObservable(), height.asObservable()]).pipe(
  map(([weight, height]) => calculateBmi(weight, height))
);

export const Bmi = () => {
  const bmi = useObservable(bmi$);

  return <div>
    {bmi}
    <input type="text" onChange={(e) => weight.next(+e.target.value)} />
    <input type="text" onChange={(e) => height.next(+e.target.value)} />
  </div>;
};
