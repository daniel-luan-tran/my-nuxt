<template>
  <v-data-table
    :items="filteredBlogList"
    :headers="headers"
    :sort-by="[{ key: 'id', order: 'asc' }]"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.summary }}</td>
        <td>{{ item.createdDate }}</td>
        <td>
          <a :href="`${item.link}/${item.id}`">
            <v-icon
              icon="mdi-arrow-right-bold"
              color="var(--dark-theme)"
            />
          </a>
        </td>
        <td>
          <v-icon class="me-2" size="small" @click="editItem(item)" icon="mdi-pencil" />
          <v-icon size="small" @click="deleteItem(item)" icon="mdi-delete" />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Blog } from '~/types';

const blogListData = ref<Blog[]>([]);
const fetchBlogList = async () => {
  const { data: blogList } = await useFetch<Blog[]>('/api/blog-list');
  blogListData.value = blogList.value ?? [];
};
fetchBlogList();

const filteredBlogList = computed(() => blogListData.value ?? []);

const headers = [
  {
    title: 'Id',
    key: 'id',
  },
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Summary',
    key: 'summary',
  },
  {
    title: 'Created date',
    key: 'createdDate',
  },
  {
    title: 'Link',
    key: 'link',
    sortable: false,
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
];

const editItem = async (item: Blog) => {
  console.log('edit item', item);
}

const deleteItem = async (item: Blog) => {
  console.log('delete item', item);
  const { data: updatedBlogList } = await useFetch<Blog[]>('/api/blog-list', {
    method: 'DELETE',
    body: {
      id: item.id,
    },
  });

  blogListData.value = updatedBlogList.value ?? [];
}
</script>