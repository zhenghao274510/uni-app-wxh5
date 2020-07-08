<template>
	<view class="biographical-con">
		<view class="share_con" v-if="down">
			<view class="biographical-title d-flex d-items-center biographical-pad">
				<image src="/static/img/bitian.png" mode="" class="biographical-img"></image>
				<view class="biographical-title-info">基本信息</view>
			</view>
			<view class="biographical-title d-flex d-items-center d-between biographical-pad d-border-bottom">
				<view class="biographical-list-title target">头像</view>
				<image :src="dataObject.userIcon" mode="" class="biographical-icon"></image>
			</view>
			<view class="biographical-title biographical-pad d-border-bottom" @click="meritDesc(0)">
				<view class="biographical-list-desc target">姓名</view>
				<input type="text" value="" v-model="dataObject.nickName" disabled="true" class="biographical-list-input"
				 placeholder="请输入" placeholder-class="placeClass" />
			</view>
			<view class="biographical-title biographical-pad d-border-bottom">
				<view class="biographical-list-desc target">性别</view>
				<xfl-select :list="sexList" ref="sexSelect" :clearable="false" :listShow="false" :isCanInput="false" initValue="请选择"
				 :selectHideType="'hideAll'" @click="changeSex"></xfl-select>
			</view>
			<view class="biographical-title biographical-pad d-border-bottom" @tap="choseStar">
				<view class="biographical-list-desc target">出生年月日</view>
				<input type="text" value="" class="biographical-list-input" disabled="true" v-model="dataObject.birthDay"
				 placeholder="请选择" placeholder-class="placeClass" />
			</view>
			<view class="biographical-title biographical-pad d-border-bottom">
				<view class="biographical-list-desc target">手机号</view>
				<input type="text" value="" class="biographical-list-input" v-model="dataObject.phoneNum" placeholder="请输入"
				 placeholder-class="placeClass" />
			</view>
			<view class="biographical-title biographical-pad d-border-bottom" @tap="choseAddress(0)">
				<view class="biographical-list-desc target">当前居住地</view>
				<input type="text" value="" v-model="dataObject.leaveaddress" class="biographical-list-input" disabled="true"
				 placeholder="请选择" placeholder-class="placeClass" />
			</view>
			<view class="biographical-title biographical-pad d-border-bottom">
				<view class="biographical-list-desc target">详细地址</view>
				<input type="text" value="" v-model="dataObject.leaveaddressDetails" class="biographical-list-input" placeholder="请输入"
				 placeholder-class="placeClass" />
			</view>
			<view class="biographical-title biographical-pad d-border-bottom" @click="JobIntention">
				<view class="biographical-list-desc target">求职意向工种</view>
				<input type="text" value="" placeholder-class="placeClass" v-model="dataObject.expectedWork" class="biographical-list-input"
				 disabled="true" placeholder="请选择" />
			</view>
			<view class="" v-if="showPicker">
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc splice-line">求职信息 (选填)</view>
				</view>
				<view class="biographical-title biographical-pad d-border-bottom" @click="choseAddress(1)">
					<view class="biographical-list-desc">期望工作地点</view>
					<input type="text" value="" v-model="dataObject.expectedWorkAddress" class="biographical-list-input" disabled="true"
					 placeholder="请选择" placeholder-class="placeClass" />
				</view>
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc">找工类型</view>
					<xfl-select :list="sillkedClassList" ref="worksSelect" :clearable="false" :listShow="false" :isCanInput="false"
					 initValue="请选择" :selectHideType="'hideAll'" @click="changeWorkClass"></xfl-select>
				</view>
				<view class="biographical-title biographical-pad d-border-bottom" @click="choseWorksMoney">
					<view class="biographical-list-desc">期望薪资</view>
					<input type="text" value="" v-model="dataObject.money" class="biographical-list-input" disabled="true" placeholder="请选择"
					 placeholder-class="placeClass" />
				</view>
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc">最高学历</view>
					<xfl-select :list="educationalList" ref="educationalSelect" :clearable="false" :listShow="false" :isCanInput="false"
					 initValue="请选择" :selectHideType="'hideAll'" @click="changeEd"></xfl-select>
				</view>
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc">曾做过的岗位</view>
					<input type="text" value="" v-model="dataObject.worksList" class="biographical-list-input" placeholder="请输入岗位"
					 placeholder-class="placeClass" />
				</view>
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc">工龄</view>
					<input type="text" value="" v-model="dataObject.worksYear" class="biographical-list-input" placeholder="请输入"
					 placeholder-class="placeClass" />
				</view>
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc">曾就业过的企业</view>
					<input type="text" value="" v-model="dataObject.worksGroupList" class="biographical-list-input" placeholder="请输入"
					 placeholder-class="placeClass" />
				</view>
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc">职称技能证书</view>
					<input type="text" value="" v-model="dataObject.siklledBook" class="biographical-list-input" placeholder="请输入"
					 placeholder-class="placeClass" />
				</view>
				<view class="biographical-title biographical-pad d-border-bottom">
					<view class="biographical-list-desc">我的获奖</view>
					<input type="text" value="" class="biographical-list-input" v-model="dataObject.bounsSinge" placeholder="请输入"
					 placeholder-class="placeClass" />
				</view>
				<view class="biographical-title biographical-pad d-border-bottom" @click="meritDesc(1)">
					<view class="biographical-list-desc">一句话优点</view>
					<input type="text" value="" class="biographical-list-input" v-model="dataObject.oneSinge" placeholder="请输入"
					 disabled="true" placeholder-class="placeClass" />
				</view>
			</view>

		</view>
		<view class="biographical-bottom" v-if="down">
			<view class="biographical-bottom-upLoad d-flex d-items-center" v-if="showPicker" @click="toUp">
				<text>点我上传简历</text>
				<image src="/static/img/xiangyou.png" mode="" class="rightImg"></image>
			</view>
			<view class="biographical-bottom-upLoad d-flex d-items-center" @click.stop="showMore" v-else>
				<text>点击完善下载简历</text>
				<image src="/static/img/zhankai.png" mode="" class="rightImg"></image>
			</view>

			<view class="btn-one btn" hover-class="btnHover" @click.stop="subInfo">保 存</view>
		</view>
		<!-- <view class="biographical-bottom" v-else>
			
		</view> -->
		<!-- //  pdf 部分 -->
		<view class="uni-pdf" v-else>
			<!-- //   个人简历信息部分 -->
			<view class="pdf-pageOne" v-if="pageOne">
				<view class="uni-title">
					个人简历
				</view>
				<view class="uni-name">
					{{dataObject.nickName}}
				</view>
				<view class="uni-desc uni-flex d-items-center">
					<text v-if="dataObject.sex==0">男</text> <text v-if="dataObject.sex==1">女</text> <text>({{dataObject.birthDay}})</text>
				</view>
				<view class="uni-phone">
					<text>手机:{{dataObject.phoneNum}}</text>
				</view>
				<view class="uni-phone">
					<text>现居住地:{{dataObject.leaveaddress}}{{dataObject.leaveaddressDetails}}</text>
				</view>
				<view class="uni-splace">

				</view>
				<view class="uni-name">
					求职意向
				</view>
				<view class="uni-phone">
					{{dataObject.expectedWork}}
				</view>
				<view class="uni-splace">
				</view>
				<view class="uni-name">
					求职信息
				</view>
				<view class="uni-phone" v-if="dataObject.expectedWorkAddress!=''">
					<view class="uni-phone-title">期望工作地点:</view><text>{{dataObject.expectedWorkAddress}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.money!=''">
					<view class="uni-phone-title">期望工薪资:</view><text>{{dataObject.money}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.findWorksClass!=''">
					<view class="uni-phone-title">找工作类型:</view><text>{{dataObject.findWorksClass}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.educational!=''">
					<view class="uni-phone-title">最高学历:</view><text>{{dataObject.educational}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.worksList!=''">
					<view class="uni-phone-title">曾做过的岗位:</view> <text>{{dataObject.worksList}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.worksYear!=''">
					<view class="uni-phone-title">工龄:</view><text>{{dataObject.worksYear}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.worksGroupList!=''">
					<view class="uni-phone-title">曾就业过的企业:</view><text>{{dataObject.worksGroupList}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.siklledBook!=''">
					<view class="uni-phone-title">职称技能证书:</view><text>{{dataObject.siklledBook}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.bounsSinge!=''">
					<view class="uni-phone-title">我的获奖:</view><text>{{dataObject.bounsSinge}}</text>
				</view>
				<view class="uni-phone" v-if="dataObject.oneSinge!=''">
					<view class="uni-phone-title">一句话优点:</view><text class="oneSinge">{{dataObject.oneSinge}}</text>
				</view>
			</view>
			<!-- 推荐信部分 -->
			<view class="pdf-pageTwo" v-else>
				<view class="uni-title-info">
					推荐介绍信
				</view>
				<view class="uni-phone">
					<text>尊敬的用人单位</text>:
				</view>
				<view class="info-tui">
					<span>现将</span> <span class="red-line span-name">{{dataObject.nickName}}</span>
					<text v-if="dataObject.sex==0">先生</text> <text v-if="dataObject.sex==1">女士</text>
					推荐给贵单位
					该人选基本信息已初步审核,
					<!-- <text class=""> -->
					请接洽,详细资料见附件简历
					<!-- </text> -->
				</view>
				<view class="uni-phone info">
					特此证明
				</view>
				<view class="uni-phone uni-flex d-between">
					<view class="">

					</view>
					<view class="group">
						安徽灵珠人才服务有限公司
					</view>
				</view>
				<view class="gong-img-con">
					<view class="">
					</view>
					<image src="/static/gongzhang.png" mode="" class="gong-img"></image>
				</view>
			</view>
		</view>
		<mpvue-city-picker ref="mpvueCityPicker" themeColor="#37C2BC" @onConfirm='addressConfirm'></mpvue-city-picker>
		<w-picker mode="date" :current="true" :endYear="endYear" @confirm="onConfirm" ref="date" themeColor="#37C2BC"></w-picker>
		<m-picker @confirm="onMoneyConfirm" ref="mPicker"></m-picker>
		<view @click="UPload" v-if="showPicker">
			<view class="tip-title">
				你也可点击右上…在浏览器中打开下载
			</view>
			<view class="biographical-bottom">
				<view class="btn-two btn" hover-class="btnHover">下载简历</view>
			</view>
		</view>
	</view>
</template>
<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	import wPicker from '@/components/w-picker/w-picker.vue';
	import mPicker from '@/components/w-picker/sb-picker.vue';
	import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
	import html2canvas from "html2canvas";
	import jsPDF from 'jspdf';
	import bassUrl from "@/common/js/config.js"
	export default {
		components: {
			xflSelect,
			mpvueCityPicker,
			wPicker,
			mPicker
		},
		data() {
			return {
				showPicker: false,
				endYear: new Date(),
				pageOne: true,
				active: 0,
				down: true,
				downLoadTime: '',
				dataObject: {
					userIcon: '', //用户头像、
					nickName: '', //用户昵称
					phoneNum: '', //用户电话
					money: '', //期望薪资
					birthDay: '', //出生年月日
					sex: '', //性别
					leaveaddress: '', //当前居住地
					leaveaddressDetails: '', //当前居住地详细地址
					expectedWorkAddress: '', //期望工作地
					educational: '', // 最高学历
					worksGroupList: '', // 曾就业过的企业
					worksYear: '', // 工龄
					siklledBook: '', //职称技能证书
					bounsSinge: '', //我的获奖
					oneSinge: '', //一句话优点
					showPhone: 1, // 是否显示电话 0 否  1 是
					showName: 1, //是否显示姓名 0 否  1 是
					showAddress: 1, //是否显示地址 0 否  1 是
					findWorksClass: '', //  找工作类型
					expectedWork: '',
					worksList: ''
				},
				expectedWork: [],
				sillkedClassList: [{
						value: '全职'
					},
					{
						value: '兼职'
					},
					{
						value: '学生工'
					}
				],
				sexList: [{
						value: '男'
					},
					{
						value: '女'
					}
				],
				educationalList: [{
						value: '小学'
					},
					{
						value: '初中'
					},
					{
						value: '高中'
					},
					{
						value: '专科'
					},
					{
						value: '本科'
					}
				],
				dataUrl: '',
				uid: '',
				showPicker: false
			};
		},
		onLoad(options) {
			this.uid = options.id;
			this.loadData();
		},
		onShow() {
			if (this.$wechat.isWechat()) {
				this.$wechat.wxShare('就业码个人简历');
			}
		},
		watch: {
			expectedWork(newVal) {
				if (newVal) {
					this.$forceUpdate();
					let arry = [];
					newVal.forEach(item => {
						arry.push(item.name)
					})
					this.dataObject.expectedWork = arry.join(',')
				}
				console.log(this.dataObject.expectedWork)
			}
		},
		methods: {
			toUp() {
				this.$api.navTo(`/pages/downLoad?id=${this.uid}`)
			},
			showMore() {
				this.showPicker = true;
				this.$nextTick(function() {
					if (this.dataObject.educational != '') {
						this.$refs.educationalSelect.setInput(this.dataObject.educational)
					}
					if (this.dataObject.findWorksClass != '') {
						this.$refs.worksSelect.setInput(this.dataObject.findWorksClass)
					}
				})
			},
			html2canvasCon(arry, pdf) {
				let self = this;
				setTimeout(() => {
					html2canvas(document.querySelector('.pdf-pageTwo')).then(canvas => {
						var pageDataTwo = canvas.toDataURL('image/jpeg', 1.0);
						console.log(pageDataTwo);
						arry.push(pageDataTwo);
						var contentWidth = canvas.width;
						var contentHeight = canvas.height;
						//一页pdf显示html页面生成的canvas高度;
						var pageHeight = contentWidth / 592.28 * 841.89;
						//未生成pdf的html页面高度
						var leftHeight = contentHeight;
						//页面偏移
						var position = 0;
						//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
						var imgWidth = 595.28;
						var imgHeight = 592.28 / contentWidth * contentHeight;
						//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
						//当内容未超过pdf一页显示的范围，无需分页
						pdf.addPage();
						pdf.addImage(pageDataTwo, 'JPEG',20, 20, imgWidth-40, imgHeight-40);
						uni.previewImage({
							urls: arry
						});
						self.pageOne=true;
						this.down=true;
						var buffer = pdf.output("datauristring");
						var myfile = self.dataURLtoFile(buffer, "个人简历.pdf");
						self._reqw.iupfile(pageDataTwo, myfile).then(res => {
							let r = JSON.parse(res);
							if (r.result == 0) {
								// self.$api.tip(r.resultNote);
								self.upmine(r.dataList[0]);
							} else {
								self.$api.tip(r.resultNote);
							}
							console.log(res)
						}).catch(err => {})
					});
				})


			},
			UPload() {
				this.down = false;
				this.showPicker = false;
				uni.showLoading({
					title: '下载中...',
					icon: "none",
					duration: 1000
				})
				uni.pageScrollTo({
					scrollTop: 0
				})
				setTimeout(() => {
					let self = this;
					var pdf = new jsPDF('', 'pt', 'a4');
					let arry = [];
					html2canvas(document.querySelector(".pdf-pageOne")).then(canvas => {
						var pageDataOne = canvas.toDataURL('image/jpeg', 1.0);
						arry.push(pageDataOne);
						var contentWidth = canvas.width;
						var contentHeight = canvas.height;
						//一页pdf显示html页面生成的canvas高度;
						var pageHeight = contentWidth / 592.28 * 841.89;
						//未生成pdf的html页面高度
						var leftHeight = contentHeight;
						//页面偏移
						var position = 0;
						//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
						var imgWidth = 595.28;
						var imgHeight = 592.28 / contentWidth * contentHeight;

						//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
						//当内容未超过pdf一页显示的范围，无需分页
						if (leftHeight < pageHeight) {
							pdf.addImage(pageDataOne, 'JPEG',20, 20, imgWidth-40, imgHeight-40);
						} else {
							while (leftHeight > 0) {
								pdf.addImage(pageDataOne, 'JPEG', 20, position, imgWidth-40, imgHeight)
								leftHeight -= pageHeight;
								position -= 841.89;
								//避免添加空白页
								if (leftHeight > 0) {
									pdf.addPage();
								}
							}
						}
						uni.hideLoading();
						self.pageOne = false;
						self.html2canvasCon(arry, pdf);
					});

				}, 500)

			},
			upBloe(url) {
				let urls = bassUrl.bass + url;
				setTimeout(() => {
					this.$api.navTo(`/pages/webView?url=${urls}`)
				}, 300)
			},
			dataURLtoFile(dataurl, filename) {
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {
					type: mime
				});
			},
			loadData() {
				let parmas = {
					uid: this.uid
				};
				this._reqw
					.ipost(parmas, 'mybiographical')
					.then(res => {
						res.result == 0 ? (this.dataObject = res, this.fromData(res)) : this.$api.tip(res.resultNote);
					})
					.catch(err => []);
			},
			fromData(res) {
				if (res.sex != '') {
					let text = ''
					res.sex == 0 ? text = '男' : text = "女"
					this.$refs.sexSelect.setInput(text)
				}
			},
			changeWorkClass(e) {
				console.log(e)
				this.dataObject.findWorksClass = this.sillkedClassList[e].value;
			},
			changeEd(e) {
				console.log(e)
				this.dataObject.educational = this.educationalList[e].value;
			},
			onMoneyConfirm(e) {
				console.log(e);
				this.dataObject.money = e.join('-') + 'k';
			},
			choseStar() {
				this.$refs.date.show();
			},
			choseWorksMoney() {
				this.$refs.mPicker.open();
			},
			choseAddress(k) {
				console.log(k)
				this.active = k;
				this.$refs.mpvueCityPicker.show();
			},
			addressConfirm(e) {
				console.log(e)
				this.active == 0 ? this.dataObject.leaveaddress = e.label : this.dataObject.expectedWorkAddress = e.label
			},
			onConfirm(e) {
				// console.log(e);
				this.dataObject.birthDay = e.result;
			},
			JobIntention() {
				this.$api.navTo('/pages/choseClass');
			},
			changeSex(e) {
				console.log(e)
				this.dataObject.sex = e
			},
			meritDesc(type) {
				if (type == 1) {
					this.$api.navTo(`/pages/befault?id=${this.dataObject.oneSinge}`);
				} else if (type == 0) {
					this.$api.navTo(`/pages/userName?id=${this.dataObject.nickName}`);
				}
			},
			endSub(parmas) {
				this._reqw
					.ipost(parmas, 'subBiographical')
					.then(r => {
						r.result == 0 ? (this.$api.tip('保存成功')) :
							this.$api.tip(r.resultNote);
					})
					.catch(err => {});
			},
			upmine(url) {
				let parmas = {
					uid: this.uid,
					jlFile: url
				}
				this._reqw.ipost(parmas, 'edmitPersonInfo').then(res => {
					res.result == 0 ? (this.upBloe(url)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			subInfo() {
				let dataObject = this.dataObject;
				if (dataObject.nickName == '') {
					this.$api.tip('用户名称不能为空');
				} else if (dataObject.phoneNum == '') {
					this.$api.tip('手机号码不能为空');
				} else if (dataObject.birthDay == '') {
					this.$api.tip('出生日期不能为空');
				} else if (dataObject.sex === '') {
					this.$api.tip('请选择性别');
				} else if (dataObject.leaveaddress == '') {
					this.$api.tip('当前居住地不能为空');
				} else if (dataObject.leaveaddressDetails == '') {
					this.$api.tip('请输入详细地址!');
				} else if (dataObject.expectedWork == '') {
					this.$api.tip('请选择求职意向工种');
				} else {
					let parmas = {
						uid: this.uid,
						nickName: dataObject.nickName,
						phoneNum: dataObject.phoneNum,
						sex: dataObject.sex,
						birthDay: dataObject.birthDay,
						leaveaddress: dataObject.leaveaddress,
						leaveaddressDetails: dataObject.leaveaddressDetails,
						findWorksClass: dataObject.findWorksClass,
						expectedWork: dataObject.expectedWork,
						money: dataObject.money,
						worksaddress: dataObject.expectedWorkAddress,
						worksYear: dataObject.worksYear,
						siklledBook: dataObject.siklledBook,
						bounsSinge: dataObject.bounsSinge,
						oneSinge: dataObject.oneSinge,
						educational: dataObject.educational,
						worksList: dataObject.worksList,
						worksGroupList: dataObject.worksGroupList
					};
					this.endSub(parmas);
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.splice-line {
		font-size: 32upx !important;
		color: rgba(25, 173, 169, 1) !important;
	}
   .tip-title{
	   color: red;
	   font-size: 24upx;
	   text-align: center;
   }
	.oneSinge {
		width: 400upx;
		flex-wrap: wrap;
	}

	//  生成个人简历
	.uni-pdf {
		padding: 0 30upx;
	}

	.spna-one {
		width: 100upx;
	}

	.span-name {
		padding: 0 10upx;
		height: 50upx;
		color: red;
	}

	.info-tui {
		display: table;
	}

	.uni-phone-title {
		width: 240upx;
	}

	.gong-img {
		width: 176upx;
		height: 176upx;
		margin-right: 60upx;
	}

	.gong-img-con {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30upx;
	}

	.uni-title-info {
		font-size: 36upx;
		font-weight: bold;
		text-align: center;
	}

	.group {
		text-align: right;
		position: relative;
	}

	.info {
		font-size: 24upx;
	}

	.uni-splace {
		height: 20upx;
	}

	.uni-flex {
		display: flex;
	}

	.mar {
		margin: 10upx;
	}

	.uni-desc {
		font-size: 24upx;
		font-weight: bold;

		text {
			margin-right: 20upx;
		}
	}

	.uni-phone {
		display: flex;

		text {
			font-size: 24upx;
		}
	}

	.uni-title {
		font-size: 40upx;
		font-weight: bold;
		text-align: center;
	}

	.uni-name {
		font-size: 26upx;
		font-weight: bold;
	}

	.BG-img {
		width: 90%;
		position: fixed;
		top: 10%;
		left: 5%;
	}

	.share_con {
		padding: 30upx 30upx 0 30upx;
	}

	.rightImg {
		width: 31upx;
		height: 25upx;
	}

	.placeClass {
		font-size: 22upx;
		color: #bbb;
	}

	.biographical-pad {
		padding: 20upx 0;
	}

	.biographical-img {
		width: 12upx;
		height: 12upx;
		margin-right: 30upx;
	}

	.biographical-icon {
		width: 110upx;
		height: 110upx;
		border-radius: 50%;
	}

	.biographical-list-title {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.biographical-title-info {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(25, 173, 169, 1);
	}

	.biographical-list-desc {
		font-size: 22upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.biographical-list-input {
		width: 100%;
		// height: 35upx;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-top: 10upx;
	}

	.position {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.biographical-bottom {
		background-color: #ffffff;
		z-index: 9;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
	}

	.biographical-bottom-upLoad text {
		font-size: 30upx;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
	}

	.btn-one {
		background-color: #37c1bb;
		margin-top: 30upx;
		width: 80%;
		height: 88upx;
		line-height: 88upx;
		background: rgba(55, 193, 187, 1);
		box-shadow: 0px 5upx 8upx 0px rgba(55, 193, 187, 0.3);
		border-radius: 10upx;
		text-align: center;
		font-size: 32upx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1)
	}

	.btn-two {
		background-color: #fe5063;
		width: 80%;
		height: 88upx;
		line-height: 88upx;
		box-shadow: 0px 5upx 8upx 0px rgba(55, 193, 187, 0.3);
		border-radius: 10upx;
		text-align: center;
		font-size: 32upx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}
</style>
