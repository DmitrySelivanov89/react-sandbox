import { debounceTime, distinctUntilChanged, filter, Subject, switchMap, tap } from "rxjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { repoRequest } from "./repo-request";
import { Repo } from "./RepoRequest";

export const Search = () => {
  const searchSubjectRef = useRef<Subject<string> | null>(null);
  const [repo, setRepo] = useState<Repo[]>([]);

  useEffect(() => {
    searchSubjectRef.current = new Subject<string>();
    const sub = searchSubjectRef.current.pipe(
      tap(console.log),
      debounceTime(300),
      filter(value => value.length >= 3),
      distinctUntilChanged(),
      switchMap(repoRequest)
    ).subscribe(setRepo);
    return () => sub.unsubscribe();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchSubjectRef.current?.next(e.target.value);
  };

  const handleCopy = async (r: Repo) => {
    try {
      await navigator.clipboard.writeText(r.clone_url);
      console.log('Copied to clipboard!');
    } catch (err: unknown) {
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
    </ul>
  </>;
};
