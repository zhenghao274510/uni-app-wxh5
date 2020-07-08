import unireq from './request.js'
const bassUrl=require('@/common/js/config.js').bass;
const api = {
	tip(a) {
		uni.showToast({
			title: a,
			icon: "none",
			duration: 1500
		})
	},

	formPhone(val) {
		var mphone = val.substring(0, 3) + '****' + val.substring(7);
		return mphone;
	},
	reLaunch(url) {
		uni.reLaunch({
			url: url
		})
	},
	switchTab(url) {
		uni.switchTab({
			url: url
		})
	},
	navTo(url) {
		uni.navigateTo({
			url: url
		})
	},
	back() {
		setTimeout(() => {
			uni.navigateBack()
		}, 500)

	},
	setNav(e) {
		uni.setNavigationBarTitle({
			title: e
		})
	},
	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		return prePage.$vm;
	},
	loading(e) {
		uni.showLoading({
			mask: false,
			title: e
		})
	},
	hideLoading() {
		uni.hideLoading()
	},
	regPhone(v) {
		var re = new RegExp(/^[1][3456789]\d{9}$/)
		if (re.test(v)) {
			return true;
		} else {
			return false;
		}
	},
	getCode() { // 非静默授权，第一次有弹框
		var local = window.location.href // 获取页面url
		var appid = 'wxd7a3f397ab773b03';
		var uid;
		if (uni.getStorageSync('uid')) {
			uid = uni.getStorageSync('uid')
		}
		window.location.href =
			`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(`${bassUrl}/h5/#/pages/resgin/shareLogin?&inverteUid=${uid}`)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
	},
	regName(v) {
		var re = new RegExp(/^[1][3456789]\d{9}$/)
		if (re.test(v)) {
			return true;
		} else {
			return false;
		}
	},
	PayBywx(data) {
		uni.requestPayment({
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success(res) {
				uni.redirectTo({
					url: '/pages/order/paySuccess'
				})
			},
			fail(res) {

			}
		});
	},
	callPhone(num) {
		uni.makePhoneCall({
			phoneNumber: num
		})
	},
	formText(str) {
		var s = "";
		let width = uni.getStorageSync('screen').screenWidth;
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "'");
		s = s.replace(/&quot;/g, '"');
		s = s.replace(/<br\/>/g, "\n");
		s = s.replace(/style="[^"]+"/gi, '');
		s = s.replace(/width="[^"]+"/gi, '');
		s = s.replace(/height="[^"]+"/gi, '');
		s = s.replace(/\<img/gi, '<img style=width:' + width + "px;height:auto;display:block;");
		return s;
	},
	formatTime(unixtime) {
		if (typeof unixtime == undefined) {
			return;
		} else {
			var date = new Date(unixtime);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			var d = date.getDate();
			d = d < 10 ? "0" + d : d;
			var h = date.getHours();
			h = h < 10 ? "0" + h : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			return y + "-" + m + "-" + d;
		}
	},
	parsePrice(money) {
		var n = 2;
		money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = money.split(".")[0].split("");
		var r = money.split(".")[1];
		var t = "";
		for (let i = 0; i < l.length; i++) {
			t += l[i];
		}
		return t + "." + r;
	},
	formCard(val) {
		var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
		if (isIdCard2.test(val)) {
			return true
		} else {
			return false
		}
	},
	//   日期   间距
	datedifference(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式 
		var dateSpan,
			tempDate,
			iDays;
		sDate1 = Date.parse(sDate1);
		sDate2 = Date.parse(sDate2);
		dateSpan = sDate2 - sDate1;
		dateSpan = Math.abs(dateSpan);
		iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
		return iDays
	}
}
export default api;
