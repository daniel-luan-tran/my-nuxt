import getters from './getters';
import actions from './actions';
import state from './state';

// defineStore
export default defineStore('counter', {
  state: () => state,
  getters,
  actions,
});