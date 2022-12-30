<template>
	<div class="menu-wrapper">
		<div v-if="paused && !terminated">
			<button @click="$emit('menu-resume')" class="menu-button">Resume</button>
		</div>
		<div v-if="paused || terminated">
			<button @click="$emit('menu-restart')" class="menu-button">Restart</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['paused', 'terminated']
	}
</script>

<style>
	.menu-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}
</style>