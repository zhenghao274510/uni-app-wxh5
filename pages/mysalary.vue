<template>
	<view class="active-list-con">
		<empty v-if="show"></empty>
		<view class="active-list-round" v-else>
			<view class="active-list-item" v-for="(v,k) in dataList" :key="k" @click="seeDetails(v,k)">
				<view class="active-list d-flex d-between d-items-center">
					<view class="active-list-title">
						{{v.groupName}}
					</view>
					<view class="d-flex d-items-center">
						<image src="/static/img/riqi.png" mode="" class="salay-img"></image>
						<text class="active-list-date">{{v.sendTime}}</text>
						<view class="uni-icon uni-icon-arrowright">
						</view>
					</view>
				</view>
				<view class="item-details" v-if="v.checked">
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">职务/岗位</text>
						<text class="item-price">{{v.zhiwu}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">发薪月份</text>
						<text class="item-price">{{v.fxyf}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">基本工资</text>
						<text class="item-price">{{v.jbgz}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">绩效工资</text>
						<text class="item-price">{{v.jx}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">补 贴</text>
						<text class="item-price">{{v.bt}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">加 班</text>
						<text class="item-price">{{v.jb}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">绩 效</text>
						<text class="item-price">{{v.jx}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">应发工资</text>
						<text class="item-price">{{v.yfgz}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">迟 到</text>
						<text class="item-price">{{v.cd}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">其它增扣</text>
						<text class="item-price">{{v.qt}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">子女教育</text>
						<text class="item-price">{{v.znjy}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">继续教育</text>
						<text class="item-price">{{v.jxjy}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">住房贷款</text>
						<text class="item-price">{{v.zfdk}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">租房租金</text>
						<text class="item-price">{{v.zfzj}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">赡养老人</text>
						<text class="item-price">{{v.sylr}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">个人社保</text>
						<text class="item-price">{{v.grsb}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">公积金</text>
						<text class="item-price">{{v.gjj}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">个人所得税</text>
						<text class="item-price">{{v.sds}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">税后实发工资</text>
						<text class="item-price">{{v.sfgz}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">应出勤天数</text>
						<text class="item-price">{{v.yccts}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">实际出勤天数</text>
						<text class="item-price">{{v.sjcqts}}</text>
					</view>
					<view class="d-flex d-between d-items-center item-list">
						<text class="item-left">计薪天数</text>
						<text class="item-price">{{v.jxts}}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty.vue"
	export default {
		components: {
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
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			if(this.uid!=''){
				this.loadData();
			}
			
		},
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1),this.status = 'loading',this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			seeDetails(e,ind){
				// e.checked=!e.checked;
				this.dataList.forEach((item,index)=>{
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
					.ipost(parmas, 'bounsList')
					.then(res => {
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? this.show = true : res.dataList.forEach(item => {
									item.checked=false,
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
		// background-color: #F6F6F6;
	}

	.item-details {
		padding: 0 30upx;
	}

	.salay-img {
		width: 28upx;
		height: 26upx;
		margin-right: 10upx;
	}

	.uni-icon-arrowright {
		font-size: 15upx;
		color: #999999;
		margin-left: 10upx;
	}

	.item-list {
		padding: 15upx 0;
	}

	.item-left {
		padding: 5upx 20upx;
		background: rgba(245, 245, 245, 1);
		border-radius: 6upx;
		font-size: 24upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);

	}

	.item-price {
		font-size: 26upx;
		font-weight: bold;
		color: rgba(254, 80, 99, 1);
	}

	.active-list-con {
		padding: 30upx;

	}

	.active-list-round {
		border-radius: 10upx;
		background: rgba(255, 255, 255, 1);
	}

	.active-list {
		background: rgba(255, 255, 255, 1);
		padding: 40upx 30upx;
		border-bottom: 2upx solid #F2F2F2;
	}

	.active-list-title {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.active-list-date {
		font-size: 24upx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1)
	}
</style>
