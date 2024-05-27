<template>
	<div>
		This the blog number - {{ blogId }}
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const blogId = route.params.id;
</script>