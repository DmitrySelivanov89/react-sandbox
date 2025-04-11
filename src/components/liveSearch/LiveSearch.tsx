import { useEffect, useRef, useState } from "react";
import { fromEvent, Subscription } from "rxjs";
import { search } from "./search";
import { Repo } from "./RepoRequest";
import './LiveSearch.css';

export const LiveSearch = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Repo[]>([]);

  useEffect(() => {
    let subscription: Subscription;
    if (ref.current) {
      subscription = search(fromEvent<KeyboardEvent>(ref.current, "input")).subscribe(setItems);
    }
    return () => subscription.unsubscribe();
  }, []);

  return <div className={'container'}>
    <input className={'search-box'} placeholder={'search'} ref={ref} />
    <ul className={'itemList'}>
      {items.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
  </div>;
};
