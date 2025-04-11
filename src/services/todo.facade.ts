import { ajax } from "rxjs/ajax";
import { Todo } from "../models/todo";
import { Observable } from "rxjs";
import { API_URL } from "../constants";

// export const todos$ = ajax.getJSON<Todo[]>(`${API_URL}/todos`);

interface ITodoFacade {
  readonly todos$: Observable<Todo[]>;
}

class TodoFacade implements ITodoFacade {
  private static instance: TodoFacade;

  static getTodoFacadeInstance() {
    if (!TodoFacade.instance) {
      TodoFacade.instance = new TodoFacade();
    }
    return TodoFacade.instance;
  }
  readonly todos$ = ajax.getJSON<Todo[]>(`${API_URL}/todos`);
}

export const todoFacade = TodoFacade.getTodoFacadeInstance()

