<template>
	<view class="">
		<!-- 头部 -->
		<view class="d-flex d-between group-pad-top d-items-center">
			<view class="group-title uni-flex-item uni-ellipsis">
				{{dataObj.gostName}}
			</view>
			<view class="price">
				{{dataObj.money}}
			</view>
		</view>
		<view class="d-flex d-between d-items-center group-pad-bottom">
			<view class="d-flex d-items-center">
				<image src="/static/img/dizhi.png" mode="" class="dizhiImg"></image>
				<view class="group-item-desc">
					{{dataObj.address}}
				</view>
			</view>
			<image src="/static/img/shoucang.png" mode="" class="storeImg" v-if="dataObj.collte==0" @click="changeCollte"></image>
			<image src="/static/img/yishoucang.png" mode="" class="storeImg" @click="changeCollte" v-else></image>
		</view>
		<!-- 职位描述 -->
		<view class="group-pad d-border-bottom" style="position:relative;">
			<view class="group-title-item" style="padding-bottom: 30upx;">
				职位描述
			</view>
			<jyf-parser :html="desc" ref="article"></jyf-parser>
		</view>
		<!-- 公司信息 -->
		<view class="group-pad" style="position:relative;" @click="gotoGroup">
			<view class="group-item-desc">
				公司信息
			</view>
			<view class="d-flex ">
				<view class="group-title-item d-line">
					{{dataObj.groupName}}
				</view>
				<view class="uni-icon uni-icon-arrowright">
				
				</view>
			</view>
			
		</view>
		<map :latitude="dataObj.lat" :longitude="dataObj.lng" :markers="markers" scale='17' class="myMap" id="myMap"
		 @markertap="markertap" @callouttap='markertap'></map>
		<view class="">
			<view class="btn-one btn" hover-class="btnHover" @click="sendBlo" v-if="dataObj.send==0">
				投递简历
			</view>
			<view class="btn-one btn" hover-class="btnHover" v-else>
				已投递
			</view>
			<view class="btn-two btn" hover-class="btnHover">
				点击右上角转发好友获取奖金
			</view>
		</view>
	</view>
</template>

<script>
	const bassUrl = require('@/common/js/config.js').bass;
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				id: '',
				isSend: true,
				shareType:0,
				desc: '',
				qqMapSdk: null,
				markers: [],
				code: '',
				status:1,
				uid:'',
				inverteUid:'',//  邀请人uid
				dataObj: {
					groupName: "", //公司名称
					gostName: "", //职位名称
					groupId: '',
					money: "", //薪资
					desc: "", //职位职责
					address: "", //位置
					lng: "", //维度
					lat: "", //经度
					collte: 0, //  收藏   0  否   1  是
					send:0//  投递   0  否   1  是

				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			if(this.uid!=''){
				this.personInfo()
			}
			if(this.getUrlCode().inverteUid){
				this.inverteUid=this.getUrlCode().inverteUid;
				console.log(this.inverteUid)
			}
			this.LoadData();

		},
		onShow() {
			if(this.dataObj.groupName!=''&&this.uid!=''){
				this.share();
			}
		},
		methods: {
			share() {
				if (this.$wechat.isWechat()) {
					this.$wechat.wxShare(this.dataObj.groupName,`${bassUrl}/h5/#/pages/zhiweiDetails?id=${this.id}&inverteUid=${this.uid}`);
				}
			},
			personInfo() {
				let parmas = {
					uid:this.uid
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'personInfo')
					.then(res => {
						res.result == 0 ? (this.status=res.status) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			markertap(e) {
				console.log(e)
				this.$api.navTo(`/pages/groupInfo?id=${e.detail.markerId }`)
			},
			changeCollte() {
				if (this.uid=='') {
					this.getCode();
				} else {
					let text = '';
					let parmas = {
						id: this.id,
						uid: this.uid
					}
					this._reqw.ipost(parmas, 'collectionOrCancel').then(res => {
						res.result == 0 ? (this.dataObj.collte == 0 ? (this.dataObj.collte = 1, text = "收藏") : (this.dataObj.collte = 0,
							text = '取消'), this.$api.tip(`${text}成功!`)) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

			},
			getUrlCode() { // 截取url中的code方法
				var url = location.href;
				console.log(url)
				var theRequest = new Object()
				if (url.indexOf("?") != -1) {
					var str = url.substr(1)
					var strs = str.split("&")
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
					}
				}
				return theRequest
			},
			getCode() { // 非静默授权，第一次有弹框
				var local = window.location.href // 获取页面url
				var appid = 'wxd7a3f397ab773b03';
					window.location.href =
						`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(`${bassUrl}/h5/#/pages/resgin/shareLogin?id=${this.id}&type=${this.shareType}&inverteUid=${this.inverteUid}`)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
			},
			LoadData() {
				let parmas = {
					id: this.id,
					uid: this.uid
				}
				this._reqw.ipost(parmas, 'productDetail').then(res => {
					res.result == 0 ? (this.dataObj = res, this.desc = this.$api.formText(res.desc), this.fromData(res)) : this.$api
						.tip(res.resultNote)
				}).catch(err => {})
			},
			fromData(res) {
				let mapCtx = uni.createMapContext("myMap", this)
				this.markers = [{
					id: res.groupId,
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
						width: 250,
						display: 'ALWAYS',
						borderRadius: 10

					}
				}]
				setTimeout(function() {
					mapCtx.moveToLocation();
				}, 1000)
				this.share();

			},
			gotoGroup() {
				this.$api.navTo(`/pages/groupInfo?id=${this.dataObj.groupId}`)
			},
			activeSub(){
				let parmas = {
					id: this.id,
					uid: this.uid,
					inverteUid:this.inverteUid
				}
				this._reqw.ipost(parmas, 'sendbiographical').then(res => {
					res.result == 0 ? (this.$api.tip('投递成功!'),this.dataObj.send = 1) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			sendBlo() {
				if (this.uid == '') {
					this.shareType=1;
					this.getCode();
				} else {
					if(this.status==0){
						let self=this;
						uni.showModal({
							cancelText:'取消',
							confirmText:'确定',
							title:'温馨提示!',
							content:'你已入职,请谨慎投递,是否继续?',
							success(res) {
								if(res.confirm){
									self.activeSub()
								}else if(res.cancel){
									console.log('取消投递');
								}
							}
						})
					}else{
						this.activeSub();
					}
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d-line{
		width: 90%;
	}
	.dizhiImg {
		width: 27upx;
		height: 35upx;
		margin-right: 20upx;
	}

	.price {
		font-size: 30upx;
		font-weight: bold;
		color: rgba(0, 164, 159, 1);
	}

	.storeImg {
		width: 36upx;
		height: 36upx;
	}

	.uni-icon-arrowright {
		font-size: 30upx;
		color: #999999;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 50upx;
	}

	.myMap {
		height: 437upx;
		width: 678upx;
		margin: 0 auto;
	}

	.group-title-item {
		font-size: 36upx;
		color: rgba(51, 51, 51, 1);
	}

	.group-title {
		font-size: 40upx;
		font-weight: bold;
		color: #333333;
		line-height: 67upx;
		margin-right: 40upx;
	}

	.group-pad {
		padding: 30upx;
		// box-sizing: border-box;
	}

	.group-pad-top {
		padding: 30upx 30upx 0 30upx;
		// box-sizing: border-box;
	}

	.group-pad-bottom {
		padding: 0 30upx 30upx 30upx;
		// box-sizing: border-box;
	}

	.group-item-desc {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 50upx;
	}

	.btn {
		width: 80%;
		height: 88upx;
		line-height: 88upx;
		background: rgba(55, 193, 187, 1);
		box-shadow: 0px 5upx 8upx 0px rgba(55, 193, 187, 0.3);
		border-radius: 10upx;
		text-align: center;
		font-size: 32upx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.btn-one {
		background-color: #37C1BB;
		margin: 50upx auto;
	}

	.btn-two {
		background-color: #FE5063;
		margin: 0 auto 50upx;
	}
</style>
