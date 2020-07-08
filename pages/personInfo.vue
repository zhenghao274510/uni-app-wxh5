<template>
	<view class="person-con">
		<image :src="userIcon" mode="" class="person-img" @tap="upLoadImg"></image>
		<view class="d-flex d-between d-items-center person-pad ">
			<view class="person-name">
				姓名
			</view>
			<view class="person-nike">
				{{nickeName}}
			</view>
		</view>
	</view>
</template>

<script>
	import bassUrl  from "@/common/js/config.js"
	export default {
		data() {
			return {
				nickeName: '',
				userIcon: '',
				uid:''
			}
		},
		onLoad(options) {
			this.nickeName = options.name
			this.userIcon = options.icon;
			this.$api.prePage().loadData();
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid')
			}
			if (this.$wechat.isWechat()) {
				this.$wechat.wxShare();
			}
		},
		methods: {
			upLoadImg() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album", "camera"],
					success(result) {
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(result);
						_this._reqw.iupfile(result.tempFiles[0].path, result.tempFiles[0]).then(res => {
							console.log(res)
							let r = JSON.parse(res)
							r.result == 0 ?_this.subChange( r.dataList[0]) : _this.$api
								.tip(r.resultNote)
						}).catch(res => {});
					}
				});
			},
			subChange(icon){
				 this.userIcon =bassUrl.bass+icon;
				let parmas={
					uid:this.uid,
					userIcon:this.userIcon
				}
				this._reqw.ipost(parmas,'edmitPersonInfo').then(res=>{
					res.result==0?(this.$api.tip('修改成功!'),console.log(this.userIcon)):this.$api.tip(res.resultNote)
				}).catch(err=>{})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.person-con {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 50upx;
	}

	.person-img {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}

	.person-pad {
		padding: 30upx;
		width: 85%;
		border-bottom: 2upx solid rgba(242, 242, 242, 1);
	}

	.person-nike {
		font-weight: bold;
	}
</style>
