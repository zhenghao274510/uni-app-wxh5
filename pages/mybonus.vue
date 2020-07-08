<template>
	<view class="">
		<view class="bouns-content bouns-pad">
			<view class="bouns-content-title">
				温馨提示
			</view>
			<view class="">
				以下是通过您在微信中转发的岗位后，成功注册就业码平台的用户。
				本平台中所有分类为“推荐有奖”的岗位，均可在微信中转发该岗位后，引导朋友注册或就职后获得推荐奖金，具体奖励金额各岗位不同，奖金的发放请联系相关企业
			</view>
		</view>
		<view class="">

		</view>
		<view class="bouns-content bouns-pad-two" v-if="dataList.length!=0">
			<view class="bouns-content-item d-border-bottom" v-for="(item,index) in dataList" :key="index">
				<view class="bouns-content-item-title">
					<text>{{item.nikeName}}</text> <text>{{item.phone}}</text> <text>已成功注册</text> <text v-if="item.isRz==0">尚未入职</text><text
					 v-else>已入职</text>
				</view>
				<view class="d-flex d-between d-items-center">
					<view class="d-flex d-items-center" v-if="item.zcReward!=''">
						<view class="bouns-content-item-left">
							<text>注册奖励金{{item.zcReward}}元</text>
						</view>
						<view class="bouns-btn" v-if="item.zctx==0" @click="subGet(item,0)">
							提现
						</view>
						<view class="bouns-btn" v-if="item.zctx==1">
							已提
						</view>
						<view class="bouns-btn" v-if="item.zctx==2">
							已申请
						</view>
					</view>
					<view  v-else></view>
					<view class="d-flex d-items-center" v-if="item.rzReward!=''">
						<view class="bouns-content-item-left">
							<text>入职奖励金{{item.rzReward}}元</text>
						</view>
						<view class="" v-if="item.isRz==1">
							<view class="bouns-btn" v-if="item.rztx==0" @click="subGet(item,1)">
								提现
							</view>
							<view class="bouns-btn" v-if="item.rztx==2">
								已申请
							</view>
							<view class="bouns-btn" v-if="item.rztx==1">
								已提
							</view>
						</view>
					</view>
					<view v-else></view>
				</view>

			</view>
		</view>
		<uni-load-more :status="status" style="margin-top:30px;"></uni-load-more>
	</view>

</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading',
				uid:''
			}
		},
		onLoad() {
			
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid')
			}
			if(this.uid!=''){
				this.loadData()
			}
		},
		onShow() {
			if (this.$wechat.isWechat()) {
				this.$wechat.wxShare();
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
			subGet(v, type) {
				let parmas = {
					uid:this.uid,
					type: type,
					id: v.id
				}
				this._reqw.ipost(parmas, 'applyWithdraw').then(res => {
					res.result == 0 ? (this.$api.tip(res.resultNote), this.clear()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			clear() {
				this.page = 1;
				this.totalPage = 1;
				this.dataList = [];
				this.loadData();
			},
			loadData() {
				let parmas = {
					uid: this.uid,
					nowPage: this.page,
					pageCount: "10"
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'Recommendation')
					.then(res => {
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								res.dataList.forEach(item => {
									this.dataList.push(item)
								})
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
		background-color: #fcfcfc;
	}

	.bouns-pad {
		padding: 46upx 30upx 76upx;
	}

	.bouns-pad-two {
		padding: 46upx 30upx 0;
	}

	.bouns-content {
		width: 85%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 30upx 0px rgba(225, 225, 225, 0.6);
		border-radius: 10upx;
		margin: 30upx auto 0;
	}

	.bouns-content-title {
		font-size: 32upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		position: relative;
		margin-bottom: 30upx;
	}

	.bouns-content-title::after {
		content: '';
		height: 2upx;
		width: 24%;
		position: absolute;
		bottom: 0;
		left: 38%;
		background-color: #37C2BC;
	}

	.bouns-btn {
		padding: 3upx 20upx;
		text-align: center;
		background: rgba(254, 80, 99, 1);
		border-radius: 20upx;
		font-size: 26upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	.bouns-content-item {
		padding: 30upx 0;
	}

	.bouns-content-item-title text {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-right: 10upx;
	}

	.bouns-content-item-left text {
		color: #FE5063;
		margin-right: 10upx;
	}
</style>
