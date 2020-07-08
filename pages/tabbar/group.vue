<template>
	<view class="home-con">
		<nav-title @click="navTitleClick" :dataList="navList"></nav-title>
		<group-list :type="type" ref="groupComList"></group-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import groupList from "@/components/mycom/groupList.vue"
	import navTitle from "@/components/mycom/nav.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			groupList,
			navTitle,
			uniLoadMore
		},
		data() {
			return {
				navList: [{
						type: 0,
						value: '有奖推荐'
					},
					{
						type: 1,
						value: '附近企业'
					},
					{
						type: 2,
						value: '最新企业'
					}
				],
				type:0,
				point: {
					latitude: '',
					longitude: ''
				},
				page: 1,
				totalPage: 1,
				status: 'loading'
			}
		},
		onShow() {
			if (this.$wechat.isWechat()) {
				this.$wechat.wxShare();
			}
		},
		onLoad() {
			this.loadData()
			if (uni.getStorageSync('point')) {
				this.point =uni.getStorageSync('point');
				console.log(this.point)
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
			navTitleClick(e) {
				console.log(e)
				this.type = e.type;
				this.clear();
			},
			clear() {
				this.page = this.totalPage = 1;
				this.status = 'loading';
				this.$refs.groupComList.initData();
				this.loadData()
			},
			loadData(){
				let parmas = {
					pageNo: this.page,
					pageCount: "10",
					type: this.type
				};
				this.type == 1 ? (parmas.lat = this.point.latitude, parmas.lng = this.point.longitude) : ''
				console.log(parmas);
				this._reqw
					.ipost(parmas,'groupList')
					.then(res => {
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								this.$refs.groupComList.setData(res.dataList)
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-con {
		height: 100%;
		background-color: #F6F6F6;
	}
</style>
