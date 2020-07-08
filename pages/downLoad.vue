<template>
	<view class="biographical-con">
		<view class="biographical-bottom-con" ref="content">
			<view class="biographical-list-desc">
				简历模板
			</view>
			<view class="biographical-list d-flex d-items-center d-between" v-for="(v,k) in dataList" :key="k">
				<view class="biographical-list-title uni-flex d-items-center">
					<image :src="v.url" mode="" class="biographica-img"></image>
					<text class="">
						{{v.name}}
					</text>
				</view>
				<view class="loadBtn" hover-class="btnHover" @click="downLoad(v.url,k)">
					下载
				</view>
			</view>
		</view>
		<view class="biographical-bottom position">
			<view class="btn-two btn" hover-class="btnHover" ref='input'>
				上传附件
			</view>
		</view>
	</view>
</template>
<script>
	import bassUrl from "@/common/js/config.js"
	import jsPDF from 'jspdf';
	export default {
		data() {
			return {
				dataList: [],
				uid: ''
			}
		},
		onLoad(options) {
			this.uid = options.id;
			this.$nextTick(() => {
				let input = document.createElement('input');
				input.type = 'file';
				input.style.position = 'absolute';
				input.style.left = '0';
				input.style.right = '0';
				input.style.bottom = '0';
				input.style.top = '0';
				input.style.width = '100%';
				input.style.height = '100%';
				input.style.opacity = 0;
				this.$refs.input.$el.appendChild(input);
				input.onchange = (e) => {
					console.log(e)
					var file = e.target.files[0];
					this._reqw.iupfile(file.path,file).then(res => {
						let r = JSON.parse(res);
						if (r.result == 0) {
							this.upmine(r.dataList[0])
						} else {
							this.$api.tip(r.resultNote);
						}
						console.log(res)
					}).catch(err => {})
				}
			})
			this.loadData();
		},
		methods: {
			dataURLtoFile(dataurl) {
				 var arr = dataurl.split(','),
				   mime = arr[0].match(/:(.*?);/)[1],
				   bstr = atob(arr[1]),
				   n = bstr.length,
				   u8arr = new Uint8Array(n);
				   while(n--) {
				      u8arr[n] = bstr.charCodeAt(n);
				   }
				   return new Blob([u8arr], {type: mime});
			},
			downLoad(url) {
				uni.navigateTo({
					url: `/pages/webView?url=${url}`
				})
			},
			seeImg(url) {
				let arry = [];
				arry.push(url);
				uni.previewImage({
					url: arry
				})
			},
			upmine(url) {
				let parmas = {
					uid: this.uid,
					jlFile: url
				}
				this._reqw.ipost(parmas, 'edmitPersonInfo').then(res => {
					res.result == 0 ? (this.$api.tip("上传成功!")) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			loadData() {
				this._reqw.ipost({}, 'biographical').then(res => {
					res.result == 0 ? this.dataList = res.dataList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uploadInput {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}

	.biographical-pad {
		padding: 40upx 0;
	}

	.biographica-img {
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
	}

	.loadBtn {
		padding: 0 15upx;
		background: rgba(55, 194, 188, 1);
		border-radius: 20upx;
		font-size: 26upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
	}

	.biographical-con {
		padding: 30upx 30upx 120upx;
	}

	.biographical-bottom-con {
		position: fixed;
		bottom: 180upx;
		left: 30upx;
		width: calc(100% - 60upx);
		padding: 50upx 0;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 60upx 0px rgba(225, 225, 225, 0.6);
		border-radius: 20upx;

	}

	.biographical-list-title text {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.biographical-list {
		padding: 0 30upx 30upx;
	}

	.biographical-list-desc {
		font-size: 34upx;
		font-weight: 500;
		color: rgba(55, 194, 188, 1);
		padding: 0 30upx 30upx;
	}

	.position {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.biographical-bottom {
		background-color: #FFFFFF;
		z-index: 9;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
		width: 100%;
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
		position: relative;
	}

	.btn-one {
		background-color: #37C1BB;
		margin-top: 30upx;
		padding: 0 24upx;
	}
</style>
