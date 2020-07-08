<template>
	<view class="cell-con">
		<view class="cell-con-item" v-for="(v,k) in dataList" :key="k" @click="onClick(k)">
			<view class="cell-con-item-left">
				<image :src="v.img" mode="" class="cell-con-item-left-img"></image>
				<text class="cell-con-item-text">{{v.text}}</text>
			</view>
			<view class="uni-icon uni-icon-arrowright">
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
					img: '/static/img/qiuzhijindu.png',
					text: '求职进度'
				},
				{
					img: '/static/img/wdejianli.png',
					text: '我的简历'
				},
				{
					img: '/static/img/shoucang.png',
					text: '我的收藏'
				},
				{
					img: '/static/img/wdexinzi.png',
					text: '我的薪资'
				},
				{
					img: '/static/img/wdetuijianjiangjin.png',
					text: '我的推荐奖金'
				},
				{
					img: '/static/img/shezhi.png',
					text: '隐私设置'
				}]
			}
		},
		methods:{
			onClick(ind){
				this.$emit('click',ind)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cell-con {
		padding: 30upx;
	}
	.cell-con-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom:1px solid rgba(242,242,242,1);
		padding: 30upx 0;
	}
	.cell-con-item-left{
		display: flex;
		align-items: center;
	}
	.cell-con-item-left-img{
		width:32upx;
		height:32upx;
		margin-right: 10upx;
	}
	.cell-con-item-text{
		font-size:30upx;
		font-weight:bold;
	}
	.uni-icon-arrowright{
		color: #C3C3C3;
		font-size: 22upx;
	}
</style>
