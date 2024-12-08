import { debounceTime, distinctUntilChanged, filter, Subject, switchMap, tap } from 'rxjs';
import './App.css';
import React, { useEffect, useMemo, useState } from "react";
import { repoRequest } from './live-search/repo-request';
import { Repo } from './live-search/RepoRequest';

export const App = () => {
  const searchSubject = useMemo(() => new Subject<string>(), []);
  const [repo, setRepo] = useState<Repo[]>([]);

  useEffect(() => {
    const sub = searchSubject.pipe(
      tap(console.log),
      debounceTime(300),
      filter(value => value.length >= 3),
      distinctUntilChanged(),
      switchMap(repoRequest)
    ).subscribe(setRepo);
    return () => sub.unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchSubject.next(e.target.value);
  };

  const handleCopy = async (r: Repo) => {
    try {
      await navigator.clipboard.writeText(r.clone_url);
      console.log('Copied to clipboard!');
    }
    catch (err: unknown) {
      console.error('Failed to copy: ', err);
    }
  };

  return <>
    <input onChange={handleInputChange} type="search" />
    <ul>
      {repo.map((r) => {
        return <li key={r.id}><h2>{r.name}</h2>
          <p>{r.clone_url}</p>
          <button onClick={() => handleCopy(r)}>Copy to clipboard</button>
        </li>;
      })}
    </ul >
  </>;
};
