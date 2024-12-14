import { useEffect, useRef, useState } from "react";
import { fromEvent, ReplaySubject, takeUntil } from "rxjs";
import { search } from "./search";
import { Repo } from "./RepoRequest";
import './LiveSearch.css';

export const LiveSearch = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Repo[]>([]);

  useEffect(() => {
    const destroy$ = new ReplaySubject<void>();
    if (ref.current) {
      const input$ = fromEvent<KeyboardEvent>(ref.current, "input");
      search(input$).pipe(takeUntil(destroy$)).subscribe(setItems);
    }
    return () => {
      destroy$.next();
      destroy$.complete();
    };
  }, []);

  return <div className={'container'}>
    <input className={'search-box'} placeholder={'search'} ref={ref} />
    <ul className={'itemList'}>
      {items.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
  </div>;
};
