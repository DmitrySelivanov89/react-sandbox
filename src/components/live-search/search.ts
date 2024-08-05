import {debounceTime, distinctUntilChanged, filter, map, Observable, switchMap,} from "rxjs";
import {ajax} from "rxjs/ajax";
import {Repo, RepoRequest} from "./RepoRequest";

const repoRequest = (text: string) => {
  return ajax
    .getJSON<RepoRequest>(
      `https://api.github.com/search/repositories?q=${text}`
    )
    .pipe(map((response) => response.items));
};

export const search = (
  source$: Observable<KeyboardEvent>
): Observable<Repo[]> => {
  return source$.pipe(
    debounceTime(300),
    map((event) => {
      const target = event.target as HTMLInputElement;
      return target ? target.value.trim() : "";
    }),
    filter((value: string) => value.length > 3),
    distinctUntilChanged(),
    switchMap(repoRequest),
  );
};
