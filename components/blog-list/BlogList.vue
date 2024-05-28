<template>
  <v-data-table :items="filteredBlogList">
    <template v-slot:header.id="{ column }">
      {{ column.title?.toUpperCase() }}
    </template>
    <template v-slot:item.link="{ item }">
      <a :href="`${item.link}/${item.id}`">
        <v-icon
          icon="mdi-arrow-right-bold"
          color="var(--dark-theme)"
        />
      </a>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
const { data: blogList } = await useFetch('/api/blog-list');
const filteredBlogList = computed(() => blogList.value ?? []);
</script>