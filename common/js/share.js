var jweixin = require('jweixin-module') //npm安装的引用
import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
export default {
	//判断是否在微信中
	isWechat: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			// console.log('是微信客户端')
			return true;
		} else {
			// console.log('不是微信客户端')
			return false;
		}
	},
	wxShare(name,myLink){
		let title,link,surl;
		if(name){
			title=name;
		}else{
			title='就业码';
		};
		console.log(name);
		if(myLink){
			link =myLink.replace(window.location.search, '');
			surl = encodeURIComponent(myLink.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码，后台php解码
		}else{
			link = (window.location.href).replace(window.location.search, '');
			surl = encodeURIComponent(location.href.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码，后台php解码
		}
		 

		uni.request({
			url: 'http://jiuyema.youkhui.cn/works/api/wxShare',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: {
				url: surl
			},
			success: res => {
				jweixin.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
					appId: res.data.appId, // 必填，公众号的唯一标识  
					timestamp: res.data.timestamp, // 必填，生成签名的时间戳  
					nonceStr: res.data.nonceStr, // 必填，生成签名的随机串  
					signature: res.data.signature, // 必填，签名，见附录1  
					surl: surl, //自己添加的，debug为true的时候可以网页打印出对应的URL是否正确  
					jsApiList: ['onMenuShareAppMessage',
						'onMenuShareTimeline',
						'chooseWXPay',
						'showOptionMenu',
						"updateAppMessageShareData",
						"hideMenuItems",
						"showMenuItems",
						"onMenuShareTimeline",
						'onMenuShareAppMessage',
						'getLocation'
					]
				});

				jweixin.ready(function() {
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0） 
					if (jweixin.onMenuShareAppMessage) {
						jweixin.onMenuShareAppMessage({
							title: title, // 分享标题  
							desc: "一码在手,工作不愁", // 分享描述  
							link: link, // 分享链接  
							imgUrl: 'http://jiuyema.youkhui.cn/logo/logo-CN.png', // 分享图标                                
							success: function() {
								// 用户确认分享后执行的回调函数  
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数  
							}
						});
					} else {
						jweixin.updateAppMessageShareData({
							title:title, // 分享标题
							desc: "一码在手,工作不愁", // 分享描述  
							link: link, // 分享链接  
							imgUrl: 'http://jiuyema.youkhui.cn/logo/logo-CN.png', // 分享图标                              
							success: function() {
								// 用户确认分享后执行的回调函数  
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数  
							}
						});
					}
					if (jweixin.onMenuShareTimeline) {
						//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
						jweixin.onMenuShareTimeline({
							title:title, // 分享标题
							desc: "一码在手,工作不愁", // 分享描述  
							link: link, // 分享链接  
							imgUrl: 'http://jiuyema.youkhui.cn/logo/logo-CN.png', // 分享图标                               
							success: function() {
								// 用户确认分享后执行的回调函数  
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数  
							}
						});
					} else {
						//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
						jweixin.updateTimelineShareData({
							title:title, // 分享标题
							desc: "一码在手,工作不愁", // 分享描述  
							link: link, // 分享链接  
							imgUrl: 'http://jiuyema.youkhui.cn/logo/logo-CN.png', // 分享图标                                 
							success: function() {
								// 用户确认分享后执行的回调函数  
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数  
							}
						});
					}
				});
			},
			fail: (err) => {
				console.log('request fail', err);
			},
			complete: () => {}
		});
	},
	wxLocation(callback) {
		var surl = encodeURIComponent(location.href.split('#')[0]); //据说可以解决URL中带参数的问题，前台用的js编码
		uni.request({
			url: 'http://jiuyema.youkhui.cn/works/api/wxShare',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: {
				url: surl
			},
			success: res => {
				jweixin.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
					appId: res.data.appId, // 必填，公众号的唯一标识  
					timestamp: res.data.timestamp, // 必填，生成签名的时间戳  
					nonceStr: res.data.nonceStr, // 必填，生成签名的随机串  
					signature: res.data.signature, // 必填，签名，见附录1  
					surl: surl, //自己添加的，debug为true的时候可以网页打印出对应的URL是否正确  
					jsApiList: ['onMenuShareAppMessage',
						'onMenuShareTimeline',
						'chooseWXPay',
						'showOptionMenu',
						"updateAppMessageShareData",
						"hideMenuItems",
						"showMenuItems",
						"onMenuShareTimeline",
						'onMenuShareAppMessage',
						'getLocation',

					]
				});
	
				jweixin.ready(function() {
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0） 
					jweixin.getLocation({  
					                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
					                success: function (res) {  
					                    console.log(res);
					                    callback(res)  
					                },  
					                fail:function(res){  
					                    console.log(res)  
					                },  
					                // complete:function(res){  
					                //     console.log(res)  
					                // }  
					            });  
				});
			},
			fail: (err) => {
				console.log('request fail', err);
			},
			complete: () => {}
		});
	}
}
