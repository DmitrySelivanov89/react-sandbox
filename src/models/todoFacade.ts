import { Observable } from "rxjs";
import { Todo } from "./todo";

export interface TodoFacade {
  readonly todos$: Observable<Todo[]>;
}
