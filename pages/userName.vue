<template>
	<view class="">
		<view class="biographical-title biographical-pad d-border-bottom">
			<view class="biographical-list-desc">
				姓名
			</view>
			<input type="text" v-model="nickeName" class="biographical-list-input" placeholder="请输入"  placeholder-class="placeClass" />
		</view>
		<view class="btn-one btn" hover-class="btnHover" @click="subName">
			保 存
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nickeName:''
			}
		},
		onLoad(options) {
			if(options.id!=''){
				this.nickeName=options.id
			}
			if(uni.getStorageSync('uid')){
				getApp().globalData.uid=uni.getStorageSync('uid')
			}
		},
		methods:{
			subName(){
				if(this.nickeName==''){
					this.$api.tip('请输入您的名称!')
				}else{
					let parmas={
						uid:getApp().globalData.uid,
						nickeName:this.nickeName
					}
					this._reqw.ipost(parmas,'edmitPersonInfo').then(res=>{
						res.result==0?(this.$api.tip('修改成功!'),console.log(this.nickeName) ,this.$api.prePage().dataObject.nickName=this.nickeName,setTimeout(()=>{ this.$api.back()},30)):this.$api.tip(res.resultNote)
					}).catch(err=>{})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.biographical-list-title {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}
	.biographical-pad {
		padding: 60upx 40upx 40upx;
	}
	.placeClass {
		font-size: 22upx;
		color: #bbb;
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
		margin:70upx auto 0;
	}
	
	.btn-one {
		background-color: #37C1BB;
	}
	
</style>

