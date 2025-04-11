import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, } from "rxjs";
import { Repo } from "./RepoRequest";
import { repoRequest } from "./repo-request";

export const search = (
  source$: Observable<KeyboardEvent>
): Observable<Repo[]> => {
  return source$.pipe(
    debounceTime(300),
    map((event) => (event.target as HTMLInputElement).value.trim()),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    switchMap(repoRequest),
  );
};
