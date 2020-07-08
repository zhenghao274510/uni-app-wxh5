<template>
	<view class="workers_con">
		<banner-swiper :dataList="imgList"></banner-swiper>
		<view class="workers_desc">
			<jyf-parser :html="content" ref="article"></jyf-parser>
		</view>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			bannerSwiper,
			jyfParser
		},
		data() {
			return {
               imgList:[],
			   content:'',
			   id:''
			}
		},
		onLoad(options) {
           this.id=options.id;
		   this.loadData()
		},
		methods:{
			loadData(){
				let parmas={
					id:this.id
				}
				this._reqw.ipost(parmas,'workerDetails').then(res=>{
					res.result==0?(this.imgList=res.imgList,this.content= this.$api.formText(res.content)):this.$api.tip(res.resultNote)
				}).catch(err=>{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.workers_con {
		padding: 50upx 30upx;
	}

	.workers_desc {
		font-size: 24upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 40upx;
		margin-top: 50upx;
	}
</style>
