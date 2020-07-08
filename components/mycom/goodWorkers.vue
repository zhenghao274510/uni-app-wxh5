<template>
	<view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view class="item-wrapper" :style="{width:parentsWidth}">
				<view class="item uni-flex uni-column" v-for="(item,index) of list" :key="index" @tap="detail(item,index)">
					<image class="icon" lazy-load :src="item.userIcon" />
					<view class="tip-title uni-ellipsis">
						{{item.name}}
					</view>
					<view class="tip uni-ellipsis">
						{{item.text}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: [],
				parentsWidth: '',
				active: 0
			}
		},
		methods: {
			set(val) {
				console.log(val)
				this.list = val;
				this.list.forEach((item, index) => {
					if (item.cid == getApp().globalData.cid) {
						this.active = index
					}
				})
				console.log(this.active)
				this.parentsWidth = val.length * 290 + 'rpx'
			},
			detail(e,k) {
				console.log(e)
				this.$api.navTo(`/pages/Outstanding?id=${e.id}`)
			}
		}
	}
</script>

<style scoped>
	.uni-flex {
		align-items: center;
	}

	.img-tip {
		font-size: 34upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.scroll-x {
		padding: 20upx;
	}

	.item-wrapper {
		overflow: hidden;
	}

	.scroll-x .item {
		float: left;
		width: 280upx;
		/* height: 314upx; */
		background: rgba(255, 255, 255, 1);
		border-radius: 0px 0px 8upx 8upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	.icon {
		width: 248upx;
		height: 212upx;
		border-radius: 8upx 8upx 0px 0px;

	}

	.tip-title {
		font-size: 30upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 67upx;
	}

	.tip {
		font-size: 24upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		width: 100%;
		text-align: center;
	}
</style>
