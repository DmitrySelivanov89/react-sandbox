import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, } from "rxjs";
import { Repo } from "./RepoRequest";
import { repoRequest } from "./repo-request";

export const search = (
  source$: Observable<KeyboardEvent>
): Observable<Repo[]> => {
  return source$.pipe(
    debounceTime(300),
    map((event) => {
      const target = event.target as HTMLInputElement;
      return target ? target.value.trim() : "";
    }),
    filter((value: string) => value.length >= 3),
    distinctUntilChanged(),
    switchMap(repoRequest),
  );
};
