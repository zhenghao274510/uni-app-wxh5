<template>
	<view class="">
		<view class="group-item-desc group-pad-top">
			公司信息
		</view>
		<view class="group-title group-pad-bottom uni-ellipsis">
			{{dataObject.groupName}}
		</view>
		<view class="spacle">
		</view>
		<group-nav :dataList="navList" @click="navClick"></group-nav>

		<view class="group-info-con" v-if="active==0">
			<view class="group-title-item group-pad">
				公司简介
			</view>
			<view class="group-item-desc group-pad">
				<!-- <rich-text :nodes="desc"></rich-text> -->
				<jyf-parser :html="desc" ref="article"></jyf-parser>
				<!-- {{desc}} -->
			</view>
			<view class="group-title-item group-pad">
				公司地址
			</view>
			<view class="group-item-desc group-pad-bottom">
				{{dataObject.address}} {{dataObject.details}}
			</view>
			<map :latitude="dataObject.lat" :longitude="dataObject.lng" :markers="markers" scale='18' show-location class="myMap"
			 id='myMap'></map>
			<!-- <map :latitude="dataObject.lat" :longitude="dataObject.lng"  class="myMap"></map> -->

			<view class="group-title-item group-pad" v-if="showWorks">
				优秀员工
			</view>
			<group-scoll-x ref="groupScollX"></group-scoll-x>
			<view class="group-title-item group-pad" v-if="showSend">
				发布人
			</view>
			<group-send ref="groupSend"></group-send>
		</view>
		<group-info-list :data="activeList" v-else></group-info-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import groupNav from "@/components/mycom/groupNav.vue"
	import groupInfoList from "@/components/mycom/groupInfoList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import groupScollX from "@/components/mycom/goodWorkers.vue"
	import groupSend from "@/components/mycom/groupSend.vue"
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			groupNav,
			groupInfoList,
			uniLoadMore,
			groupScollX,
			groupSend,
			jyfParser
		},
		data() {
			return {
				id: '',
				uid:'',
				desc: '',
				map: null,
				markers: [],
				navList: [{
						type: 1,
						value: '公司信息'
					},
					{
						type: 2,
						value: '在招职位'
					}
				],
				activeList: [],
				dataObject: {
					groupName: "", //商品名称
					desc: "", //公司描述
					address: "", //位置
					details: "", //  详细地址
					lng: "", //维度
					lat: "", //经度
					sendPerson: [{ //发布人列表
						id: "", //发布人id
						name: "", // 发布人名称
						works: "", // 职位
						phone: "", //  联系方式
					}],
					dataList: [{ //优秀员工列表
						id: "", //优秀员工id
						name: "", // 优秀员工名称
						works: "" // 职位
					}]
				},
				page: 1,
				totalPage: 1,
				active: 0,
				status: 'noMore',
				showWorks:true,
				showSend:true
			}
		},
		onLoad(options) {
			this.id = options.id;
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			this.$nextTick(function() {
				this.loadGroupData();
				this.loadData();
			})
		},
		onReachBottom() {
			if (this.active == 1) {
				this.totalPage > this.page ?
					((this.page += 1), this.status = 'loading', this.loadData()) :
					setTimeout(() => {
						this.status = 'noMore';
					}, 300);
			}
		},
		onShow() {
			if(this.dataObject.groupName!=''){
				this.share()
			}
		},
		methods: {
			share(){
				if (this.$wechat.isWechat()) {
					this.$wechat.wxShare(this.dataObject.groupName);
				}
			},
			loadGroupData() {
				let parmas = {
					id: this.id,
					uid:this.uid
				}
				this._reqw.ipost(parmas, 'groupDetail').then(res => {
					res.result == 0 ? (this.status = 'noMore', this.dataObject = res, res.dataList.length==0?this.showWorks=false:this.$refs.groupScollX.set(res.dataList),
						res.sendPerson.length==0?this.showSend=false:this.$refs.groupSend.set(res.sendPerson),
						this.desc =
						this.$api.formText(res.desc), this.fromData(res)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			fromData(res) {
				let mapCtx = uni.createMapContext("myMap", this)
				this.markers = [{
					id: this.id,
					latitude: res.lat,
					longitude: res.lng,
					iconPath: '/static/img/dingwei.png', //图标路径
					width: 25,
					height: 25,
					callout: {
						content: res.groupName,
						textAlign: "center",
						color: '#000',
						bgColor: "#FFFFFF",
						display: 'ALWAYS',
						borderRadius: 10

					}
				}]
				setTimeout(function() {
					mapCtx.moveToLocation();
				}, 1000);
				this.share();
			},
			loadData() {
				let parmas = {
					id: this.id,
					pageNo: this.page,
					pageCount: "10",
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'worksList')
					.then(res => {
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								res.dataList.forEach(item => {
									this.activeList.push(item)
								})
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			navClick(e) {
				console.log(e)
				if (this.active != e) {
					this.active = e
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	//   公司在招职位
	page {
		background-color: #F6F6F6;
	}
	.group-info-con{
		background-color: #FFFFFF;
	}
	.spacle {
		height: 30upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #FFFFFF;
	}

	.myMap {
		height: 437upx;
		width: 678upx;
		margin: 0 auto;
	}

	.group-title-item {
		height: 34upx;
		font-size: 36upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 67upx;
		
	}

	.group-title {
		font-size: 40upx;
		font-weight: bold;
		color: #333333;
		line-height: 67upx;
	}

	.group-pad {
		padding: 30upx;
	}

	.group-pad-top {
		padding: 30upx 30upx 0 30upx;
	}

	.group-pad-bottom {
		padding: 0 30upx 30upx 30upx;
	}

	.group-item-desc {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 50upx;
		text-align: left;
	}
</style>
