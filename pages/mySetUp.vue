<template>
	<view class="set-content">
		<view class="d-flex d-items-center d-between setUp-item" v-for="(v,k) in dataList" :key="k" :class="[k==0?'one':'two']">
			<view class="setUp-item-text">
				{{v.text}}
			</view>
			<switch :checked="v.checked" @change="changeActive(k)" color='#37C1BB' style="transform:scale(0.7)" />
		</view>
		<view class="setUp-btn" hover-class="btnHover" @click="loginOut">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				uid:"",
				dataList: [{
						text: '正在求职',
						checked: true
					},
					{
						text: '隐藏真实姓名',
						checked: false
					},
					{
						text: '隐藏手机号',
						checked: false
					},
					{
						text: '隐藏住址',
						checked: false
					}
				]
			}
		},
		onLoad() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid')
			}
			if(this.uid!=""){
				this.loadData()
			}
			
		},
		methods: {
			loadData() {
				let parmas = {
					uid: this.uid
				}
				this._reqw.ipost(parmas, 'mySet').then(res => {
					res.result == 0 ? this.formData(res) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			formData(res) {
				res.worksType ==0 ? this.dataList[0].checked=false : this.dataList[0].checked=true;
				res.nameType == 0 ? this.dataList[1].checked=false : this.dataList[1].checked=true;
				res.phoneType == 0 ? this.dataList[2].checked=false : this.dataList[2].checked=true;
				res.addressType == 0 ? this.dataList[3].checked=false : this.dataList[3].checked=true;

			},
			changeActive(e) {
				console.log(e)
				this.active = e;
				this.dataList[e].checked=!this.dataList[e].checked;
				let checked = this.dataList[e].checked,
					num;
					console.log(checked)
				if (!checked) {
					num =1
				} else {
					num =0
				}
				let parmas={
					uid:getApp().globalData.uid,
					type:e,
					currentType:num
				}
				console.log(parmas)
				this._reqw.ipost(parmas, 'edmitSet').then(res => {
					res.result == 0 ? this.$api.tip('修改成功') : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			edmitSet() {

			},
			loginOut() {
				document.addEventListener(
					"WeixinJSBridgeReady",
					function() {
						WeixinJSBridge.call("closeWindow");
					},
					false
				);
				WeixinJSBridge.call("closeWindow");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set-content {
		padding: 30upx;
		border-top: 18upx solid #F2F2F2;
	}

	.one {
		padding: 50upx 0;
		border-bottom: 2upx solid #F2F2F2;
	}

	.two {
		padding: 30upx 0;
	}

	.setUp-item-text {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.setUp-btn {
		width: 673upx;
		height: 88upx;
		line-height: 88upx;
		background: rgba(55, 193, 187, 1);
		box-shadow: 0px 5upx 8upx 0px rgba(55, 193, 187, 0.3);
		border-radius: 10upx;
		margin: 100upx auto 0;
		font-size: 36upx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
	}
</style>
