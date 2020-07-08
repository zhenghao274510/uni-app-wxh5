<script>
	export default {
		// 857465a294fe47b6a7289845329dd63e
		globalData: {
			uid:''
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					uni.setStorageSync('screen', res)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/uni.css";
	view,text{
		font-size: 28upx;
		color: #333333;
		
	}
	page{
		width: 100%;
		min-width: 640upx !important;
		max-width: 1024upx !important;
		min-height: 100%;
		overflow-x:hidden;
		margin: 0 auto;
		font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
	}
	.d-flex{
		display: flex;
	}
	.d-items-center{
		align-items: center;
	}
	.d-between{
		justify-content: space-between;
	}
	/* scroll-view   去滚动条 */
	::-webkit-scrollbar {
	  width:0;
	  height: 0;
	  color: transparent;
	}
	.btnHover{
		opacity: .7;
	}
	.d-border-bottom{
		border-bottom: 2upx solid #F2F2F2;
	}
	.target{
		position: relative;
	}
	.target::before{
		content:'*';
		color:red;
		font-size: 26upx;
		margin-right: 20upx;
	}
</style>
