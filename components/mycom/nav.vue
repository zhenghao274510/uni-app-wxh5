<template>
	<view class="list-con d-flex d-items-center one">
		<view class="list-con-item" v-for="(v,k) in dataList" :key="k" :class="{active:currentIndex==k}" @click="onClick(v,k)">
			{{v.value}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataList:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				currentIndex:0,
			}
		},
		methods:{
			onClick(v,k){
				if(this.currentIndex==k){
					return
				}else{
					this.currentIndex=k;
					this.$emit('click',{
						type:v.type
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-con{
		position: relative;
		padding:30upx 60upx;
		background-color: #FFFFFF;
	}
	.list-con::after{
		content: '';
		width:92%;
		height:2upx;
		background:rgba(242,242,242,1);
		border-radius:1upx;
		position: absolute;
		bottom: 0;
		left: 30upx;
		transform: translateY(-50%);
	}
	.list-con-item{
		margin-right: 25upx;
		font-size:26upx;
		font-weight:500;
		color:rgba(102,102,102,1);
	}
	.one::before{
		content: '';
		width:8upx;
		height:34upx;
		background:rgba(55,193,187,1);
		border-radius:4upx;
		position: absolute;
		top: 50%;
		left: 30upx;
		transform: translateY(-50%);
	}
	.active{
		font-size:30upx !important;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1) !important;
	}
</style>
