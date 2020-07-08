<template>
	<view>
		<!-- 头部部分 -->
		<view class="class-top-info class-pad" @click="hideTwo">
			<view class="class-top-title">
				选择职位类型
			</view>
			<view class="class-top-desc">
				选择职位名称对应的类型
			</view>
		</view>
		<!-- <uni-search-bar @confirm="searchConfirm"></uni-search-bar> -->
		<!-- 一级列表 -->
		<scroll-view class="class-content" scroll-y="true">
			<view class="class-list-item d-flex d-items-center d-between" v-for="(item,index) in dataList" :key="index"
			 @click.stop="onClickItem(item.id)">
				<view class="class-list-item-title">
					{{item.name}}
				</view>
				<view class="uni-icon uni-icon-arrowright">
				</view>
			</view>
		</scroll-view>
		<!-- 二级列表部分 -->
		<uni-drawer class="d-flex" ref="drawer">
			<scroll-view class="d-class-left" scroll-y="true" style="background:#FFFFFF;">
				<view class="uni-title class-item-pad" v-for="(v,k) in childList" :key="k" @click.stop="choseSkilled(v)">{{v.name}}</view>
			</scroll-view>
		</uni-drawer>
	</view>

</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	export default {
		components: {
			uniDrawer,
			uniSearchBar
		},
		data() {
			return {
				dataList: [],
				keyWords: '',
				childList: []
			}
		},
		onLoad() {
			this.loadData();
			console.log(this.$api.prePage())
		},
		watch: {
			keyWords(newVal, oldVal) {
				if (oldVal != '') {
					this.clear()
				}
			}
		},
		methods: {
			clear() {
				this.dataList = [];
				this.loadData();
			},
			hideTwo() {
				this.$refs.drawer.close()
			},
			loadData() {
				let parmas = {};
				if (this.keyWords != '') {
					parmas.keyWords = this.keyWords;
				}
				this._reqw
					.ipost(parmas, 'jobClassification')
					.then(res => {
						res.result == 0 ? this.dataList = res.dataList : this.$api.tip(res.resultNote);
					})
					.catch(err => {});

			},
			searchConfirm(e) {
				console.log(e)
				this.keyWords = e.value;
				this.clear();
			},
			onClickItem(id) {
				let parmas = {
					id: id
				};
				console.log(parmas, 'CategoryListTwo')
				this._reqw
					.ipost(parmas, "CategoryListTwo")
					.then(res => {
						res.result == 0 ? (this.childList = res.dataList, this.$refs.drawer.open()) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			choseSkilled(e) {
				let arry =this.$api.prePage().expectedWork;
				
				if(arry.length!=0){
					let str=arry.join(',');
					if (str.indexOf(e.name) == -1) {
						this.$set(arry, arry.length, e);
					}
				}else{
					this.$set(arry, arry.length, e);
				}
				this.$api.prePage().expectedWork =arry;
				this.$refs.drawer.close();
				setTimeout(() => {
					this.$api.back()
				}, 100)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d-class-left {
		width: 100%;
		height: 100%;
	}

	.d-active {
		color: #37C2BC !important;
	}

	.d-flex {
		overflow: hidden;
	}

	.uni-icon-arrowright {
		font-size: 24upx;
	}
	.class-pad {
		padding: 30upx;
	}
	.class-item-pad {
		padding: 20upx 50upx;
		// line-height: 40upx;
	}

	.class-list-item {
		padding: 30upx 0;
	}

	.class-list-item-title {
		font-size: 28upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.class-content {
		padding: 0 30upx;
		box-sizing: border-box;
		height: calc(100% - 243upx);
		position: fixed;
		top: 160upx;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}

	.class-top-title {
		font-size: 42upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.class-top-desc {
		font-size: 26upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}
</style>
