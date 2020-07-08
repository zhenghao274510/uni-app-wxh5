<template>
	<view class="home-con">
		<banner-swiper :dataList="bannerList"></banner-swiper>
		<view class="search-con-all">
			<view class="search-con">
				<view class="">{{city}}</view>
				<view class="uni-flex-item search">
					<uni-search-bar @confirm="onConfirm" @focus="focus" @blur="blur" ref="searchBar"></uni-search-bar>
				</view>
			</view>
		</view>
		<nav-title @click="navTitleClick" :dataList="navList"></nav-title>
		<com-list :dataList="dataList" :type="type" ref="homeComList"></com-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import bannerSwiper from '@/components/mycom/swiper.vue';
	import comList from '@/components/mycom/list.vue';
	import navTitle from '@/components/mycom/nav.vue';
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	const bassUrl = require('@/common/js/config.js').bass;
	export default {
		components: {
			bannerSwiper,
			comList,
			navTitle,
			uniSearchBar,
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
						value: '附近职位'
					},
					{
						type: 2,
						value: '最新职位'
					}
				],
				point: {
					latitude: '',
					longitude: ''
				},
				keyWords: '',
				bannerList: [],
				dataList: [],
				type: 0,
				page: 1,
				totalPage: 1,
				status: 'loading',
				city: '',
				uid:''
			};
		},

		onLoad(options) {
			if(options.id){
				this.keyWords=options.id;
				setTimeout(()=>{
					this.$refs.searchBar.setInput(this.keyWords);
					this.$forceUpdate();
				},500)
			}
			if(options.inverteUid){
				getApp().globalData.inverteUid=options.inverteUid;
			}
			this.loadData();
			this.getBanner();
			this.getPosition();

		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				this.uid=uni.getStorageSync('uid');
			}
			if(this.uid!=''){
				this.getMessage();
			}
		},
		onReachBottom() {
			this.totalPage > this.page ?
				(this.status = 'loading', this.page += 1, this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			share() {
				if (this.$wechat.isWechat()) {
					this.$wechat.wxShare('就业码',
						`${bassUrl}/h5/#/pages/tabbar/home?id=${this.keyWords}&inverteUid=${this.uid}`);
				}
			},
			getMessage() {
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
						if (res.result == 0) {
							let num = 0;
							res.dataList.forEach(item => {
								if (item.status == 0) {
									num += 1;
									uni.setTabBarBadge({
										index: 2,
										text: ""
									});
								}
							})
							if (num == 0) {
								uni.removeTabBarBadge({
									index: 2
								})
							}
						} else {
							this.$api.tip(res.resultNote);
						}


					})
					.catch(err => {});
			},
			focus() {
				uni.hideTabBar();
			},
			blur() {
				uni.showTabBar();
			},
			getPosition() {
				if (this.$wechat.isWechat()) {
					this.$wechat.wxLocation(res => {
						uni.showLoading({
							title: '定位中...'
						})
						this.point = res;
						uni.setStorageSync('point', res)
						let str = res.longitude + ',' + res.latitude;
						uni.request({
							url: `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${str}&key=c6f76c6dc10ff6fce5724d27adaa00fe&radius=1000&extensions=all`,
							method: "GET",
							success: res => {
								uni.hideLoading();
								console.log(res)
								this.city = res.data.regeocode.addressComponent.city
							}
						})
					});
				}
			},
			onConfirm(e) {
				console.log(e);
				this.keyWords = e.value;
				this.share();
				this.clear();
			},
			clear() {
				this.page = 1;
				this.totalPage = 1
				this.status = 'loading';
				this.$refs.homeComList.initData();
				this.loadData();
			},
			navTitleClick(e) {
				this.$forceUpdate();
				console.log(e);
				this.type = e.type;
				this.keyWords = '';
				this.clear();
			},
			getBanner() {
				this._reqw
					.ipost({}, 'banner')
					.then(res => {
						console.log(res)
						res.result == 0 ? (this.bannerList = res.dataList) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			loadData() {
				let n = this.type;
				let parmas = {
					pageNo: this.page,
					pageCount: '10'
				};
				if (this.keyWords != '') {
					parmas.keyWords = this.keyWords;
				} else {
					parmas.type = this.type;
					this.type == 1 ? (parmas.lat = this.point.latitude, parmas.lng = this.point.longitude) : '';
				}
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'worksList')
					.then(res => {
						res.result == 0 ?
							(res.totalPage > 1 ? (this.status = 'more') : (this.status = 'noMore'), (this.totalPage = res.totalPage), this.$refs
								.homeComList.setData(res.dataList)) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.home-con {
		height: 100%;
		background-color: #f6f6f6;
	}

	.search-con {
		width: 706upx;
		height: 99upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 40upx 0px rgba(204, 204, 204, 0.3);
		border-radius: 8upx;
		// margin:-30upx auto 30upx ;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 30upx;
		box-sizing: border-box;
		z-index: 999 !important;
		position: absolute;
		top: -20upx;
		left: 30upx;
	}

	.search-con-all {
		width: 100%;
		background-color: #ffffff;
		padding: 0 0 65upx;
		position: relative;
	}

	.search {
		position: relative;
		margin-left: 30upx;
	}

	.search::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 2upx;
		height: 21upx;
		background-color: #e7e7e7;
	}
</style>
