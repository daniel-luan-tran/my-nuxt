<template>
  <div>
    <h1>{{ getCount }}</h1>
  </div>
</template>

<script lang="ts" setup>
import useCounterStore from '~/stores/counter';

const counterStore = useCounterStore();
const { getCount } = storeToRefs(counterStore);
</script>