import { ajax } from "rxjs/ajax";
import { RepoRequest } from "./RepoRequest";
import { map } from "rxjs";

export function repoRequest(text: string) {
  return ajax
    .getJSON<RepoRequest>(
      `https://api.github.com/search/repositories?q=${text}`
    )
    .pipe(map((response) => response.items));
}