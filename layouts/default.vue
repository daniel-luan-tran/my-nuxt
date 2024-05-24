<template>
	<div>
		<Navbar />
		<slot />
	</div>
</template>

<script lang="ts" setup>
import Navbar from '~/components/layout/navbar.vue'
</script>
