<template>
	<view class="">
		<view class="list-con" v-for="(item,index) in data" :key="index" @click="skillDetails(item.id)">
			<view class="list-con-item">
				<view class="list-con-item-top">
					<view class="list-con-item-top-title">
						{{item.title}}
					</view>
					<view class="list-con-item-top-right">
						{{item.money}}
					</view>
				</view>
				<view class="list-con-item-one">
					<text class="list-con-item-one-text" v-for="(v,k) in item.childList" :key="k">{{v.name}}</text>
				</view>
				<view class="list-con-item-two">
					{{item.groupName}}
				</view>
				<view class="list-con-item-bottom">
					<view class="list-con-item-bottom-one uni-ellipsis" v-if="item.bonusType==1">
						推荐奖金：{{item.bonusMoney}}元
					</view>
					<view class="list-con-item-bottom-one" v-else>
					</view>
					<view class="list-con-item-bottom-two uni-ellipsis">
						{{item.address}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			data:{
				type:Array,
				default:[]
			}
		},
		methods:{
			skillDetails(id){
				this.$api.navTo(`/pages/zhiweiDetails?id=${id}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-con {
		padding:0 30upx;
		background-color: #FFFFFF;
		border-bottom:2upx solid #f6f6f6;
	}

	.list-con-item {
		padding: 20upx 0;
	}

	.list-con-item-two {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin: 16upx 0;
	}


	.list-con-item-top,
	.list-con-item-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-con-item-top-title {
		font-size: 32upx;
		font-weight: bold;
	}

	.list-con-item-top-right {
		font-size: 30upx;
		font-weight: bold;
		color: rgba(0, 164, 159, 1);
	}

	.list-con-item-one {
		margin-top: 16upx;
		display: flex;
		flex-wrap: wrap;
	}
	
	.list-con-item-one-text {
		padding: 10upx 20upx;
		background: rgba(245, 245, 245, 1);
		border-radius: 6upx;
		font-size: 24upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin:0 10upx 10upx 0;
	}
	.list-con-item-bottom-one{
		font-size:24upx;
		font-weight:500;
		color:rgba(255,70,70,1);
		width: 35%;
	}
	.list-con-item-bottom-two{
		font-size:20upx;
		font-weight:500;
		color:rgba(153,153,153,1);
		width: 65%;
		text-align:right;
	}
	
</style>
