import React, { Component } from "react";

interface CounterState {
  counter: number;
}

interface CounterProps {
  counter: number;
}

export class CounterClass extends Component<CounterState, CounterProps> {
  state: Readonly<CounterState> = { counter: this.props.counter ?? 0 };

  constructor(props: CounterProps) {
    super(props);
    console.log('constructor');
  }

  componentDidMount(): void {
    console.log('componentDidMount');
  }

  componentDidUpdate(prevProps: Readonly<CounterProps>, prevState: Readonly<CounterState>): void {
    console.log('componentDidUpdate', prevProps, prevState);
  }

  componentWillUnmount(): void {
    console.log('componentWillUnmount');
  }

  add = (): void => this.setState(prevState => ({ counter: prevState.counter + 1 }));

  subtract = (): void => this.setState(prevState => ({ counter: prevState.counter - 1 }));

  reset = () => this.setState({ counter: 0 });

  render() {
    return <>
      <div>{this.state.counter}</div>
      <button onClick={this.add}>Increment</button>
      <button onClick={this.subtract}>Decrement</button>
      <button onClick={this.reset}>Reset</button>
    </>;
  }
}
