<template>
	<v-toolbar>
		<span class="hidden-sm-and-up" @click="toggleSidebar">
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</span>
		<NuxtLink to="/">
			<v-img aspect-ratio="1/1" :height="70" :width="70" src="/assets/images/icon-green.svg"></v-img>
		</NuxtLink>
		<v-toolbar-title link to="/">
			<h3>Nuxt - Typescript</h3>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-xs">
			<v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
				<v-icon left dark>{{ item.icon }}</v-icon>
				{{ item.title }}
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>
	<v-navigation-drawer location="left" v-model="sidebar" :width="150">
		<v-list>
			<v-list-item title="My Nuxt 3" subtitle="Vuetify"></v-list-item>
			<v-divider></v-divider>
			<v-list-item v-for="item in menuItems" link :key="item.title" :to="item.path">
				<template v-slot:prepend>
					<v-icon :icon="item.icon" />
				</template>
				<v-list-item-title>{{ item.title }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts" setup>
import type { MenuItem } from '~/types';
import { ref, defineComponent } from 'vue';

const sidebar = ref(false);

const data = [
	{
		title: 'Home',
		path: '/',
		icon: 'mdi-home',
	},
	{
		title: 'Page 2',
		path: '/page-2',
		icon: 'mdi-book',
	},
	{
		title: 'Page 3',
		path: '/page-3',
		icon: 'mdi-flag',
	},
	{
		title: 'Blog',
		path: '/blog',
		icon: 'mdi-post',
	},
] as MenuItem[];

const toggleSidebar = async () => {
	sidebar.value = !sidebar.value;
}

defineComponent({
	name: 'Navbar',
})
const menuItems = ref(data);
</script>

<style lang="scss">
</style>