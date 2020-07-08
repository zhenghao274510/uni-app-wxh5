<template>
	<view class="">
		<view class="user-info-content">
			<image :src="dataObject.userIcon" mode="" class="user-icon" @click="personClick()"></image>
			<view class="user-name" @click="personClick()">{{ dataObject.nickName }}</view>
			<view class="user-interve uni-flex-item">邀请码:{{ dataObject.inverteCode }}<text class="copy-btn" v-if="dataObject.inverteCode"
				 @tap="copyma">复制</text></view>
			<view class="user-qrcode">
				<tki-qrcode cid="qrcode2307" :val="text" :size="size" icon="/static/img/logo.png" loadMake ref="qrcode2307" class="qrcode"
				 @result="qrcodeComplete"></tki-qrcode>
			</view>
			<view class="user-active" v-if="dataObject.worksType == 1">求职中</view>
			<view class="user-share">长按二维码保存手机或转发好友</view>
		</view>
		<cell-icon-list @click="cellClick"></cell-icon-list>
	</view>
</template>

<script>
	import cellIconList from '@/components/mycom/cellIconList.vue';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	import bassUrl from '@/common/js/config.js';
	import h5Copy from '@/common/js/junyi-h5-copy.js'
	export default {
		components: {
			cellIconList,
			tkiQrcode
		},
		data() {
			return {
				dataObject: {
					userIcon: '', //头像
					nickName: '', //昵称
					worksType: '', //是否求职:0-否，1-是
					qrcode: '', //二维码
					indoor: 0, //是否内部员工:0-否，1-是
					inverteCode: '' //邀请码
				},
				image: '',
				text: '',
				size: 314,
				uid: ''
			};
		},
		onLoad() {
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid');
			}
			this.text = `${bassUrl.bass}/share/h5/#/?id=${this.uid}`;

		},
		onShow() {
			if (this.uid != '') {
				this.loadData();
			}

		},
		methods: {
			qrcodeComplete(e) {
				this.image = e;
			},
			share() {
				if (this.$wechat.isWechat()) {
					this.$wechat.wxShare();
				}
			},
			copyma() {
				let content = this.dataObject.inverteCode // 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					uni.showToast({
						title: '不支持',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					})
				}
			},
			loadData() {
				let parmas = {
					uid: this.uid
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'personInfo')
					.then(res => {
						res.result == 0 ? (this.dataObject = res, this.share(), console.log(this.dataObject)) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});

			},
			personClick() {
				this.$api.navTo(`/pages/personInfo?name=${this.dataObject.nickName}&icon=${this.dataObject.userIcon}`);
			},
			cellClick(e) {
				console.log(e);
				if (this.uid == '') {
					this.$api.getCode()
				} else {
					switch (e) {
						case 0:
							this.$api.navTo(`/pages/myActive`);
							break;
						case 1:
							this.$api.navTo(`/pages/mybiographical?id=${getApp().globalData.uid}`);
							break;
						case 2:
							this.$api.navTo('/pages/myStore');
							break;
						case 3:
							this.$api.navTo(`/pages/mysalary`);
							break;
						case 4:
							// 我的奖金
							this.$api.navTo('/pages/mybonus');
							break;
							//  个人资料
						case 5:
							this.$api.navTo('/pages/mySetUp');
							break;
					}

				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.user-info-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 50upx;
	}

	.copy-btn {
		font-size: 22upx;
		background: rgba(116, 207, 204, 1);
		border-radius: 25upx;
		text-align: center;
		color: #FFFFFF;
		margin-left: 30upx;
		padding: 2upx 15upx;
	}

	.user-active {
		width: 145upx;
		height: 50upx;
		line-height: 50upx;
		background: rgba(116, 207, 204, 1);
		border-radius: 25upx;
		font-size: 32upx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
	}

	.qrcode-img {
		width: 314upx;
		height: 314upx;
	}

	.qrcode {
		width: 314upx;
		height: 314upx;
	}

	.user-qrcode {
		margin: 40upx 0;
		position: relative;
	}

	.pos {
		position: absolute;
		top: 0;
		left: 0;
		width: 314upx;
		height: 314upx;
	}

	.user-icon {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.user-name {
		font-size: 40upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.user-interve {
		font-size: 26upx;
		color: #999999;
		position: relative;
		width: 100%;
		text-align: center;
	}

	.user-interve::after {
		content: '';
		position: absolute;
		left: 5%;
		bottom: -10upx;
		height: 2upx;
		width: 90%;
		background-color: #f2f2f2;
	}

	.user-share {
		font-size: 24upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-top: 20upx;
	}
</style>
