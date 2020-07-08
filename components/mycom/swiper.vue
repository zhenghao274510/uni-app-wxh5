<template>
	<view class="swiper-content">
		<view class="search-wrapper">
			<view class="swiper-wrapper">
				<swiper class="swiper" circular="true" autoplay="true" duration="500">
					<swiper-item class="swiper-item" v-for="(item,index) of dataList" :key="index" @tap="gotoDetails(item)">
						<img :src="item.image" />
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {}
		},
		methods: {
			gotoDetails(v) {
				console.log(v)
                this.$api.navTo(`/pages/textView?url=${v.url}`)
			}
		}
	}
</script>

<style scoped>
	.swiper-content {
		position: relative;
	}

	.uni-icon-location-filled {
		color: #FFFFFF;
		font-size: 28upx;
	}

	.img {
		width: 50upx;
		height: 50upx;
	}

	.swiper {
		width: 100%;
		height: 338upx;
	}

	.swiper-item {
		width: 100%;
		display: block;
	}

	.swiper-item img {
		width: 100%;
		display: block;
		height: 338upx;
	}
</style>
