import { ajax } from "rxjs/ajax";
import { User } from "../models/user";
import { combineLatest, distinctUntilChanged, forkJoin, map, mergeMap, Subject, switchMap } from "rxjs";
import { Todo } from "../models/todo";
import { todoFacade } from "./todo.facade";
import { TodoFacade } from "../models/todoFacade";
import { API_URL } from "../constants";

// ajax<User[]>({ url: `${API_URL}/users`, method: 'GET', responseType: 'json' }).pipe(map((res) => res.response)).subscribe(console.log);

// export const users$ = ajax.getJSON<User[]>(`${API_URL}/users`);
//
// const getUserTodo = (userId: number) => {
//   return ajax.getJSON<Todo>(`${API_URL}/todos/${userId}`)
// }
//
// const selectedUserTodoLookup$ = combineLatest([this.selectedUser$, this.todoFacade.todos$]).pipe(
//   map(([user, todos]) => todos.find((todo) => todo.userId === user.id))
// );
// const selectedUser = new Subject<User>();
//
// export const selectedUserTodo$ = selectedUser.pipe(
//   distinctUntilChanged(),
//   switchMap((user) => getUserTodo(user.id))
// );
//
// export const getTodosForEachUser$ = users$.pipe(
//   switchMap((users) => forkJoin(users.map((user) => ajax.getJSON<Todo>(`${API_URL}/todos/${user.id}`))))
// );
//
// export const usersWithTodos$ = forkJoin([users$, todos$]).pipe(
//   map(([users, todos]) => ({users, todos}))
// );

class UserFacade {
  private static instance: UserFacade;

  static getUserFacadeInstance() {
    if (!UserFacade.instance) {
      UserFacade.instance = new UserFacade(todoFacade);
    }
    return UserFacade.instance;
  }

  constructor(private readonly todoFacade: TodoFacade) {
  }

  private readonly selectedUser = new Subject<User>();

  readonly selectedUser$ = this.selectedUser.asObservable();

  readonly users$ = ajax.getJSON<User[]>(`${API_URL}/users`);

  readonly todosForEachUser$ = this.users$.pipe(
    mergeMap((users) => forkJoin(users.map((user) => ajax.getJSON<Todo>(`${API_URL}/todos/${user.id}`))))
  );

  readonly usersWithTodos$ = forkJoin([this.users$, this.todoFacade.todos$]).pipe(
    map(([users, todos]) => ({ users, todos }))
  );

  readonly selectedUserTodo$ = this.selectedUser$.pipe(
    distinctUntilChanged(),
    switchMap((user) => this.getUserTodo(user.id))
  );

  // TODO combineLatest example
  readonly selectedUserTodoLookup$ = combineLatest([this.selectedUser$, this.todoFacade.todos$]).pipe(
    map(([user, todos]) => todos.find((todo) => todo.userId === user.id))
  );


  setSelectedUser(user: User) {
    console.log(user);
    this.selectedUser.next(user);
  }

  private getUserTodo(userId: number) {
    return ajax.getJSON<Todo>(`${API_URL}/todos/${userId}`);
  }
}

export const userFacade = UserFacade.getUserFacadeInstance()


