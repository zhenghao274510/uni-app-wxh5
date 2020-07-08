<template>
	<web-view :src="url"></web-view>
</template>

<script>
	import bassUrl from "@/common/js/config.js"
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			this.url =options.url
		}
	}
</script>

<style>
</style>
