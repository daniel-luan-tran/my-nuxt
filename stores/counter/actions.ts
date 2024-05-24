export default {
  increment: (state: CounterState) => {
    state.count++;
  },
  decrement: (state: CounterState) => {
    state.count--;
  },
}