import type { CounterState } from "~/types";

export default {
  increment: (state: CounterState) => {
    state.count++;
  },
  decrement: (state: CounterState) => {
    state.count--;
  },
}