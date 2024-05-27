import type { CounterState } from "~/types";

export default {
  getCount: (state: CounterState) => state.count,
}