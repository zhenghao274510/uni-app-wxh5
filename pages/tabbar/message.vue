<template>
	<view class="">
		<empty v-if="show"></empty>
		<view class="" v-else>
			<message-list ref="messageList" :dataList="dataList"></message-list>
			<uni-load-more :status="status"></uni-load-more>

		</view>
	</view>

</template>

<script>
	import messageList from "@/components/mycom/messageList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		components: {
			messageList,
			uniLoadMore,
			empty
		},
		data() {
			return {
				page: 1,
				totalPage: 1,
				status: 'loading',
				dataList: [],
				show: false,
				uid:''
			}
		},
		onLoad() {
			// this.getShare();
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid')
			}
			if(this.uid!=''){
				this.loadData()
			}
		},
		onReachBottom() {
			this.totalPage > this.page ?
				(this.status = 'loading',(this.page += 1), this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			share(){
				if (this.$wechat.isWechat()) {
					this.$wechat.wxShare();
				}
			},
			loadData() {
				let parmas = {
					uid: this.uid,
					pageNo: this.page,
					pageCount: "10"
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'messageList')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? this.show = true : res.dataList.forEach(item => {
									this.dataList.push(item)
								}),this.share())
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
