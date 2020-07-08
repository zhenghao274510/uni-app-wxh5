<template>
	<view class="message-details-con">
		<view class="message-title">
			{{title}}
		</view>

		<view class="message-time">
			发布时间：{{date}}
		</view>
		<view class="message-name">
			消息内容
		</view>
		<view class="message-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"", //标题
				date:"", //发布时间
				content:"",//内容
				id:''
			}
		},
		onLoad(options) {
            this.id=options.id
			this.loadData()
		},
		methods:{
			loadData(){
				let parmas={
					id:this.id
				}
				console.log(parmas)
			   this._reqw.ipost(parmas,'messageDetails').then(res=>{
				   res.result==0?(this.title=res.title,this.date=res.date,this.content=this.$api.formText(res.content)):this.$api.tip(res.resultNote)
			   }).catch(err=>{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message-details-con {
		padding: 80upx 30upx;
	}

	.message-title {
		font-size: 32upx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
	}

	.message-time {
		font-size: 24upx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		padding: 30upx 0;
	}

	.message-name {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-bottom: 20upx;
	}

	.message-content {
		background-color: #F6F6F6;
		padding: 20upx;
		min-height: 218upx;
		border-radius: 10upx;
	}
</style>
