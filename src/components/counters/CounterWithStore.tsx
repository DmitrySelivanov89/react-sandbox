import {createStore} from '../../hooks/useStore';

interface CounterState {
  count: number;
}

const store = createStore<CounterState>({count: 0});

const CounterComponent = () => {
  const count = store.useStore(state => state.count);

  const increment = () => store.setState({count: count + 1});
  const decrement = () => store.setState({count: count - 1});

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
