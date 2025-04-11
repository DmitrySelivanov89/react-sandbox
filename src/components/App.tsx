import './App.css';
import { BehaviorSubject, fromEvent, interval, map, merge, NEVER, scan, Subject, switchMap } from 'rxjs';
import { userFacade } from '../services/user.facade';
import { useObservable } from '../hooks/useObservable';
import { useState } from 'react';
import { Portal } from './modal/Portal';
import { ColumnType } from './table/ColumnType';
import { Table } from './table';
import { User } from '../models/user';
import { Drag } from "./dragAndDrop/Drag";
import { LiveSearch } from './liveSearch/LiveSearch';
import { Datepicker } from './Datepicker';
import { Calendar, ListTree, User as UserIcon, UsersRound, Table as TableIcon, List } from 'lucide-react';
import { ITreeNode, TreeView } from './tree-view/TreeView';
import { VirtualList } from './virtualList/VirtualList';
import { TabList } from './tabs/TabList';
import { DropdownMenu } from './dropdown/Dropdown';
import { StarRating } from './star-rating/StarRating';
import { Model, Param, ParamEditor } from './ParamEditor';

const reset = new Subject<void>();

const accumulationHandler =
  (event: PointerEvent) => (state: PointerEvent[]) => [...state, event];

const resetHandler = (_: void) => (state: PointerEvent[]) => [];

const clicks$ = merge(
  fromEvent<PointerEvent>(document, 'click').pipe(map(accumulationHandler)),
  reset.pipe(map(resetHandler)),
).pipe(
  scan((state: PointerEvent[], stateHandlerFn) => stateHandlerFn(state), []),
);

const interval$ = interval(1000);

const pause = new BehaviorSubject(false);
const pausable$ = pause.pipe(
  switchMap((paused) => (paused ? NEVER : interval$)),
  scan((n) => n + 1, 0),
);

const resetTimer$ = reset.pipe(switchMap(() => interval$));

// const source$ = fromEvent<MouseEvent>(document, 'mousemove');
// const toggle$ = fromEvent<MouseEvent>(document, 'click');
// toggle$.subscribe(() => pause.next(!pause.getValue()));
// pause
//   .pipe(switchMap((paused) => (paused ? NEVER : source$)))
//   .subscribe(console.log);

const columns: ColumnType<User>[] = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "username",
    title: "Username",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "address",
    title: "Address",
    render: (_, { address }) => <>{address.city} {address.street}</>,
  },
  {
    key: "phone",
    title: "Phone",
    width: 200,
  },
  {
    key: "website",
    title: "Website",
  },
  {
    key: "company",
    title: "Company",
    render: (_, { company }) => <>{company.name}</>,
  },
  {
    key: 'actions',
    title: '',
    render: (_, user) => <UserIcon size={16} onClick={() => userFacade.setSelectedUser(user)} />,
  }
];

// function recursiveTraversal<T>(
//   data: T,
//   cb: <ValueType>(value: ValueType, key?: T, data?: T) => void
// ): void;
// function recursiveTraversal<T>(
//   data: T,
//   cb: <ValueType>(value: ValueType, i?: number, data?: T) => void
// ): void {
//   if (typeof data !== 'object' || data === null) {
//     cb(data);
//     return;
//   }
//   if (Array.isArray(data)) {
//     for (let i = 0; i < data.length; i++) {
//       recursiveTraversal(data[i], (value) => cb(value, i, data));
//     }
//   } else {
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         recursiveTraversal(data[key], (value) => cb(value, key, data));
//       }
//     }
//   }
// }

// const myObject = {
//   a: 1,
//   b: 'hello',
//   c: {
//     d: true,
//     e: [10, 20, { f: 'world' }],
//   },
// };

// const myArray = [1, 'two', { a: 3 }, [4, 5]];

// recursiveTraversal(myObject, (value) => console.log(value));
// recursiveTraversal(myArray, (value) => console.log(value));

// recursiveTraversal(myObject, (value, key) =>
//   console.log(`Key: ${key}, Value: ${value}`)
// );
// recursiveTraversal(myArray, (value, index) =>
//   console.log(`Index: ${index}, Value: ${value}`)
// );

const treeData: ITreeNode = {
  id: 1,
  name: 'Root',
  description: 'This is the root node',
  isExpanded: true,
  children: [
    {
      id: 2,
      name: 'Child 1',
      description: 'This is the first child',
      isExpanded: false,
      children: [
        { id: 3, name: 'Grandchild 1', description: 'This is the first grandchild', isSelected: false },
        { id: 4, name: 'Grandchild 2', description: 'This is the second grandchild', isSelected: false },
      ],
    },
    {
      id: 5,
      name: 'Child 2',
      description: 'This is the second child',
      isExpanded: false,
      children: [
        { id: 6, name: 'Child 2.1', description: 'This is the 2.1 grandchild', isSelected: false },
      ],
    },
  ],
};

const usersVirtualList = Array.from({ length: 10000 }, (_, index) => ({
  id: crypto.randomUUID(),
  name: `User ${index}`,
  email: `user${index}@example.com`,
  username: `user${index}`,
}));


export const App = () => {
  // const count = useObservable(pausable$);
  // const clicks = useObservable(clicks$);
  const selectedUserTodo = useObservable(userFacade.selectedUserTodo$);
  const users = useObservable(userFacade.users$, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  // const usersTodo = useObservable(userFacade.todosForEachUser$);
  // const {loading, error, data} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')

  const renderUser = (user: { name: string, email: string; }) => (
    <div className="user-item">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );

  return <>
    {/*{loading && <div>...loading</div>}*/}
    {/*{ error && <div>{error}</div>}*/}
    {/*{data?.map((user) => (<div key={user.id}>{user.name}</div>))}*/}
    {/* <div>{count}</div> */}
    {/* {clicks?.length} */}
    {/*{usersTodo?.map((todo) => <li key={todo.id}>*/}
    {/*  {todo.title}*/}
    {/*  <input type='checkbox' readOnly checked={todo.completed}/>*/}
    {/*</li>)}*/}
    {/* <button onClick={() => reset.next()}>Reset</button> */}
    {/* <button onClick={() => pause.next(!pause.getValue())}>Toggle</button> */}

    {/* {users.map((user) => <li key={user.id} onClick={() => {
      toggleModal();
      userFacade.setSelectedUser(user);
    }}>{user.username}</li>)} */}

    {
      isOpen && <Portal>
        <div onClick={toggleModal} className='overlay'>
          <div className='modal-content'>
            <h2>User todo</h2>
            {selectedUserTodo && (
              <fieldset>
                <legend>Todo</legend>
                <label htmlFor={selectedUserTodo.id.toString()}>Ready</label>
                <input id={selectedUserTodo.id.toString()} type='checkbox' readOnly checked={selectedUserTodo.completed} />
                <p>{selectedUserTodo.title}</p>
              </fieldset>)
            }
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      </Portal>
    }

    <TabList tabs={[
      {
        icon: <UsersRound size={14} />,
        label: 'UserList',
        content: <>
          {users.map((user) => <li key={user.id} onClick={() => {
            toggleModal();
            userFacade.setSelectedUser(user);
          }}>{user.username}</li>)}
        </>
      },
      { icon: <ListTree size={14} />, label: 'TreeView', content: <TreeView data={treeData} /> },
      { icon: <Calendar size={14} />, label: 'DatePicker', content: <Datepicker /> },
      { icon: <TableIcon size={14} />, label: 'Table', content: <Table data={users} columns={columns} /> },
      {
        icon: <List size={14} />,
        label: 'VirtualList', content:
          <VirtualList
            items={usersVirtualList}
            itemHeight={80}
            height={400}
            renderItem={renderUser}
          />
      },
      { label: 'DropdownMenu', content: <DropdownMenu items={['Profile', 'Settings', 'Logout']} /> },
      { label: 'StarRating', content: <StarRating /> },
      { label: 'ParamEditor', content: <ParamEditor params={params} model={model} /> }
    ]} />
  </>;
};

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "text"
  },
  {
    id: 2,
    name: "Длина",
    type: "text"
  },
  {
    id: 3,
    name: "Назначение",
    type: "text"
  },
  {
    id: 4,
    name: "Длина",
    type: "text"
  }
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное"
    },
    {
      paramId: 2,
      value: "макси"
    },
    {
      paramId: 3,
      value: "вечернее"
    },
    {
      paramId: 4,
      value: "мини"
    }
  ],
  colors: ['red', 'green', 'blue']
};

