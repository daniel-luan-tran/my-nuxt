<template>
  <v-data-table :items="blogList">
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
const blogList = await $fetch('/api/blog-list');
</script>