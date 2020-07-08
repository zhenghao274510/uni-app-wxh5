<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="" v-if="showBind" style="width: 100%;">
			<view class="list-con">
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/img/shoujihao.png" mode="" class="reg-img"></image>
					<input type="number" class="reg-input" placeholder="请输入手机号" placeholder-style="color:#999999" v-model="phone" />
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/img/yanzhengma.png" mode="" class="reg-img"></image>
					<input type="number" value="" class="reg-input" placeholder="短信验证码" placeholder-style="color:#999999" v-model="YZM" />
					<text class="y-z-m" @click="getYZM">
						{{ rTime }}
						<text v-if="btnState">s后重发</text>
					</text>
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/img/yaoqingma.png" mode="" class="reg-img"></image>
					<input type="text" value="" class="reg-input" placeholder="请输入邀请码(选填)" placeholder-style="color:#999999" v-model="inverteCode" />
				</view>
			</view>
			<view class="reg-btn" hover-class="btnHover" @click="subOrder">绑 定</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				phone: '',
				rTime: '获取验证码',
				interval: null,
				btnState: false,
				YZM: '',
				code: '',
				inverteCode: '',
				uid: '',
				showBind: true,
				id: '',
				type:'',
				inverteUid:''  //  邀请人uid
			};
		},
		onLoad(options) {
			this.code = this.getUrlCode().code;
			
			if(this.getUrlCode().inverteUid){
				this.inverteUid=this.getUrlCode().inverteUid;
			}
			if(options.id){
				this.id = options.id;
			}
			if(options.type){
				this.type = options.type;
			}
			this.getUId();
		},
		methods: {
			getUrlCode() { // 截取url中的code方法
				var url = location.search
				this.winUrl = url
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
			getUId() {
				this._reqw.ipost({
					code: this.code
				}, 'callBack1').then(res => {
					console.log(res)
					if (res.result == 0) {
						this.uid = res.uid
					}
				}).catch(err => {})
			},
			getYZM() {
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!');
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!');
				} else {
					if (this.rTime == '获取验证码') {
						this.rTime = 60;
						this.btnState = true;
						this.interval = setInterval(() => {
							if (--this.rTime <= 0) {
								this.rTime = '获取验证码';
								clearInterval(this.interval);
								this.btnState = false;
							}
						}, 1000);
						let parmas = {
							phoneNum: this.phone
						};
						this._reqw
							.ipost(parmas, 'sendSmsCode')
							.then(res => {
								res.result == 0 ? this.$api.tip(res.resultNote) : this.$api.tip(res.resultNote);
							})
							.catch(err => {});
					}
				}
			},
			activeSub() {
				getApp().globalData.uid = this.uid;
				uni.setStorageSync('uid', this.uid);
				let parmas = {
					id: this.id,
					uid: this.uid,
					inverteUid:this.inverteUid
				}
				this._reqw.ipost(parmas, 'sendbiographical').then(res => {
					res.result == 0 ? (this.$api.tip('投递成功,请尽快前往个人中心完善个人简历!'), setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/home'
						})
					}, 500)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			collect() {
				let parmas = {
					id: this.id,
					uid: this.uid
				}
				this._reqw.ipost(parmas, 'collectionOrCancel').then(res => {
					res.result == 0 ? (this.$api.tip(`收藏成功!`), setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/home'
						})
					}, 500)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			subOrder() {
				uni.showLoading({
					title: '登录中...'
				});
				// let Y = this.YZM.trim();
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!');
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!');
				} else if (this.YZM == '') {
					this.$api.tip('请输入验证码');
				} else {
					let parmas = {
						phone: this.phone,
						uid: this.uid,
						code: this.YZM,
						inverteCode: this.inverteCode
					};
					console.log(parmas);
					this._reqw
						.ipost(parmas, 'bindPhone')
						.then(res => {
							res.result == 0 ?
								(uni.hideLoading(),
									this.$api.tip(res.resultNote),
									(this.type!=''?(this.type == 0?this.collect() : this.activeSub()):this.$api.switchTab('/pages/tabbar/home'))) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				}
			}
		},
		onHide() {
			if (this.interval) {
				clearInterval(this.interval);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.list-con {
		padding: 0 60rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.logo {
		height: 163rpx;
		width: 210rpx;
		margin: 100rpx auto;
	}

	.d-border {
		position: relative;
		border-bottom: 1px solid #f2f2f2;
		padding: 40upx 0;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.reg-img {
		width: 35upx;
		height: 43upx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.reg-input {
		padding-left: 50upx;
	}

	.y-z-m {
		font-weight: 500;
		color: rgba(255, 144, 0, 1);
		position: relative;
	}

	.y-z-m::before {
		content: '';
		width: 2upx;
		height: 22upx;
		background-color: #e7e7e7;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -30upx;
	}

	.reg-btn {
		width: 85%;
		height: 88upx;
		background: rgba(55, 193, 187, 1);
		box-shadow: 0px 5upx 8upx 0px rgba(55, 193, 187, 0.3);
		border-radius: 10upx;
		margin: 160upx auto 0;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
