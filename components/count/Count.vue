<template>
  <div>
    <v-btn @click="decrement">Decrement</v-btn>
    <v-btn @click="increment">Increment</v-btn>
  </div>
</template>

<script lang="ts" setup>
import useCounterStore from '~/stores/counter';

const counterStore = useCounterStore();

const increment = () => {
  counterStore.increment(counterStore);
};
const decrement = () => {
  counterStore.decrement(counterStore);
};
</script>