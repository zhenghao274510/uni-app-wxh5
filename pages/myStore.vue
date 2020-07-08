<template>
	<view class="">
		<empty v-if="show"></empty>
		<view class="" v-else>
			<group-info-list :data="dataList"></group-info-list>
		    <uni-load-more :status="status"></uni-load-more>
		</view>
	</view>
	
</template>

<script>
	import groupInfoList from "@/components/mycom/groupInfoList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		components: {
			groupInfoList,
			uniLoadMore,
			empty
		},
		data() {
			return {
				dataList:[],
				page:1,
				totalPage:1,
				status:'loading',
				show:false,
				uid:''
			}
		},
		onLoad() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid')
			}
			if(this.uid!=''){
				this.loadData();
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
			loadData() {
				let parmas = {
					uid:this.uid,
					nowPage: this.page,
					pageCount: "10"
				};
				console.log(parmas,);
				this._reqw
					.ipost(parmas,'storeList')
					.then(res => {
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length==0?this.show=true:res.dataList.forEach(item=>{
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
</style>
