import { useEffect, useLayoutEffect, useState } from "react";

type ActionType = 'INCREMENT' | 'DECREMENT' | 'RESET';

type CounterState = {
  counter: number;
};

const counterInitState: CounterState = {
  counter: 0
};

const counterReducer = (state = counterInitState, action: { type: ActionType; }) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter++,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter--,
      };
    case 'RESET':
      return {
        ...state,
        counter: 0,
      };
    default:
      return state;
  }
};

export const CounterFunc = () => {
  // const [state, dispatch] = useReducer(counterReducer, counterInitState);
  // console.log(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log('useEffect');
    return () => console.log('cleanUpEffect');
  }, []);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, []);

  const add = () => {
    // console.log('add);
    // setNum(num + 1);
    // setNum(num + 2);
    // setNum(num + 3);
    setNum(prev => prev + 1);
    setNum(prev => prev + 2);
    setNum(prev => prev + 3);
  };

  const subtract = () => {
    // console.log('subtract');
    setNum(num - 1);
    setNum(num - 2);
    setNum(num - 3);
    setNum(prev => prev - 1);
    setNum(prev => prev - 2);
    setNum(prev => prev - 3);
  };

  return <>
    {/* <div>{state.counter}</div> */}
    {/* <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
    <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button> */}
    <div>{num}</div>
    <button onClick={add}>Increment</button>
    <button onClick={subtract}>Decrement</button>
    <button onClick={() => setNum(0)}>Reset</button>
  </>;
};
