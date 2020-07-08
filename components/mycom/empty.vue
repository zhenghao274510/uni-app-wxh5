<template>
	<view class="empty-content">
		<image class="empty-content-image" src="/static/notFound.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: 'empty'
			},
		},

		data() {
			return {
			}
		}
	}
</script>

<style lang="scss">
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 40px;
		right: 0;
		bottom: 0;
		z-index: 999;
		// background: $page-color-base;
		// padding-top: 120upx;

		&-image {
			width: 374upx;
			height: 288upx;
		}
	}
</style>

