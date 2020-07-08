<template>
	<view class="cell-con">
		<view class="cell-con-item" v-for="(v,k) in dataList" :key="k" @tap.top="onClick(v)" @longtap="delItem(v,k)">
			<image src="/static/img/xitongtongzhi-3.png" mode="" class="cell-con-item-left-img"></image>
			<view class="uni-flex-item">
				<view class="cell-con-item-left d-between">
					<text class="cell-con-item-text">{{v.title}}</text>
					<view class="uni-right-text">
						{{v.cdate}}
					</view>
				</view>
				<view class="" style="color: #666666;">
					{{v.desc}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props:{
			dataList:{
				type:Array,
				default:[]
			}
		},
		methods:{
			onClick(v){
				this.$api.navTo(`/pages/messageDetails?id=${v.id}`)
			},
			delItem(v,k){
				console.log('长按')
				let self=this;
				uni.showModal({
					cancelText:'取消',
					confirmText:'确定',
					title:'确定删除吗?',
					success(res) {
						if(res.confirm){
							let parmas={
								id:v.id
							}
							self._reqw.ipost(parmas,'delMessage').then(res=>{
								res.result==0?(self.dataList.splice(k,1),self.$api.tip('删除成功')):self.$api.tip(res.resultNote)
							}).catch(err=>{})
						}
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cell-con {
		padding: 30upx 20upx;
	}

	.cell-con-item {
		display: flex;
		align-items: center;
		border-bottom: 2upx solid rgba(242, 242, 242, 1);
		padding: 30upx 0;
	}

	.cell-con-item-left {
		display: flex;
		// align-items: center;
	}

	.cell-con-item-left-img {
		width: 90upx;
		height: 90upx;
		margin-right: 10upx;
	}

	.cell-con-item-text {
		font-size: 28upx;
	}

	.uni-right-text {
		color: #C3C3C3;
		font-size: 22upx;
		width: 45%;
	}
</style>
