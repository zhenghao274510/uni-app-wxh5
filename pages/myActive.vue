<template>
	<view class="">
		<empty v-if="show"></empty>
		<view class="active-list-con" v-else>
			<view class="active-list-round" v-for="(v,k) in dataList" :key="k" @click="seeDetails(v,k)">
				<view class="active-list-item">
					<view class="active-list d-flex d-between d-items-center">
						<view class="active-title uni-ellipsis">
							{{v.groupName}}
						</view>
						<view class="right-text">
							<view v-if="v.active==0" class="tip-active uni-ellipsis">简历已投递</view>
							<view v-if="v.active==1" class="tip-active uni-ellipsis">企业已查看</view>
							<view v-if="v.active==2" class="tip-active uni-ellipsis">企业已收藏</view>
							<view v-if="v.active==3" class="tip-active uni-ellipsis">邀请面试</view>
							<view v-if="v.active==4" class="tip-active uni-ellipsis">面试已通过</view>
							<view v-if="v.active==5" class="tip-active uni-ellipsis">面试未通过</view>
							<view v-if="v.active==6" class="tip-active uni-ellipsis">已入职</view>
							<view v-if="v.active==7" class="tip-active uni-ellipsis">已离职</view>
							<view class="uni-icon uni-icon-arrowup" v-if="v.checked">
							</view>
							<view class="uni-icon uni-icon-arrowdown" v-else>
							</view>
						</view>
					</view>
					<uni-steps :options="v.childList" direction="column" deactiveColor="#333333" activeColor="#19ADA9" v-if="v.checked"></uni-steps>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</view>
	</view>


</template>

<script>
	import uniSteps from "@/components/uni-steps/uni-steps.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		components: {
			uniSteps,
			uniLoadMore,
			empty
		},
		data() {
			return {
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading',
				show: false,
				uid:''
			}
		},
		onLoad() {
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid')
			}
			if(this.uid!=""){
				this.loadData()
			}
			
		},
		onReachBottom() {
			this.status = 'loading';
			this.totalPage > this.page ?
				((this.page += 1), this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			seeDetails(e, ind) {
				// e.checked=!e.checked;
				this.dataList.forEach((item, index) => {
					if (ind == index) {
						e.checked = !e.checked;
					} else {
						item.checked = false;
					}
				})
			},
			loadData() {
				let parmas = {
					uid: this.uid,
					nowPage: this.page,
					pageCount: "10"
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'jobProgress')
					.then(res => {
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? this.show = true : res.dataList.forEach(item => {
									item.checked = false,
										this.dataList.push(item)
								}))
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F6F6F6;
	}
	.tip-active{
		width: 60%;
	}

	.active-list-con {
		padding: 30upx;

	}
	.active-title{
		width:70%;
	}
	.right-text{
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.active-list-round {
		border-radius: 10upx;
		background: rgba(255, 255, 255, 1);
		border-bottom: 2upx solid #F2F2F2;
	}

	.active-list {
		background: rgba(255, 255, 255, 1);
		padding: 40upx 30upx;
		
	}
	.uni-icon{
		font-size: 26upx;
		color: #c1c1c1;
		margin-left: 20upx;
	}
</style>
