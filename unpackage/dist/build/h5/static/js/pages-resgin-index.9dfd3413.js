(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-resgin-index"],{"19ec":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{phone:"",rTime:"获取验证码",interval:null,btnState:!1,YZM:"",code:"",inverteCode:"",uid:"",showBind:!0,type:""}},onLoad:function(t){this.uid=t.uid,console.log(this.uid,t),"null"==t.phoneNum?this.showBind=!0:(this.showBind=!1,getApp().globalData.uid=this.uid,uni.setStorageSync("uid",this.uid),uni.switchTab({url:"/pages/tabbar/home"},1e3))},methods:{getYZM:function(){var t=this;if(""==this.phone)this.$api.tip("手机号不能为空!");else if(this.$api.regPhone(this.phone)){if("获取验证码"==this.rTime){this.rTime=60,this.btnState=!0,this.interval=setInterval((function(){--t.rTime<=0&&(t.rTime="获取验证码",clearInterval(t.interval),t.btnState=!1)}),1e3);var e={phoneNum:this.phone};this._reqw.ipost(e,"sendSmsCode").then((function(e){e.result,t.$api.tip(e.resultNote)})).catch((function(t){}))}}else this.$api.tip("请输入正确的手机号!")},toHome:function(){setTimeout((function(){uni.switchTab({url:"/pages/tabbar/home"})}),300)},subOrder:function(){var t=this;if(uni.showLoading({title:"登录中..."}),""==this.phone)this.$api.tip("手机号不能为空!");else if(this.$api.regPhone(this.phone))if(""==this.YZM)this.$api.tip("请输入验证码");else{var e={phone:this.phone,uid:this.uid,code:this.YZM,inverteCode:this.inverteCode};console.log(e),this._reqw.ipost(e,"bindPhone").then((function(e){0==e.result?(uni.hideLoading(),t.$api.tip(e.resultNote),getApp().globalData.uid=t.uid,uni.setStorageSync("uid",t.uid),t.toHome()):t.$api.tip(e.resultNote)})).catch((function(t){}))}else this.$api.tip("请输入正确的手机号!")}},onHide:function(){this.interval&&clearInterval(this.interval)}};e.default=n},"21e4":function(t,e,i){"use strict";i.r(e);var n=i("f515"),a=i("a374");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("5679");var o,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"c5a2087a",null,!1,n["a"],o);e["default"]=c.exports},3861:function(t,e,i){var n=i("6223");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("7a0704f3",n,!0,{sourceMap:!1,shadowMode:!1})},5679:function(t,e,i){"use strict";var n=i("3861"),a=i.n(n);a.a},6223:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.list-con[data-v-c5a2087a]{padding:0 %?60?%}.content[data-v-c5a2087a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%}.logo[data-v-c5a2087a]{height:%?163?%;width:%?210?%;margin:%?100?% auto}.d-border[data-v-c5a2087a]{position:relative;border-bottom:1px solid #f2f2f2;padding:%?40?% 0}.text-area[data-v-c5a2087a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.reg-img[data-v-c5a2087a]{width:%?35?%;height:%?43?%;position:absolute;top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.reg-input[data-v-c5a2087a]{padding-left:%?50?%}.y-z-m[data-v-c5a2087a]{font-weight:500;color:#ff9000;position:relative}.y-z-m[data-v-c5a2087a]::before{content:"";width:%?2?%;height:%?22?%;background-color:#e7e7e7;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:%?-30?%}.reg-btn[data-v-c5a2087a]{width:85%;height:%?88?%;background:#37c1bb;box-shadow:0 %?5?% %?8?% 0 rgba(55,193,187,.3);border-radius:%?10?%;margin:%?160?% auto 0;text-align:center;line-height:%?88?%;color:#fff;font-size:%?34?%;font-weight:700}',""]),t.exports=e},a374:function(t,e,i){"use strict";i.r(e);var n=i("19ec"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},f515:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-image",{staticClass:"logo",attrs:{src:"/static/logo.png"}}),t.showBind?i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticClass:"list-con"},[i("v-uni-view",{staticClass:"d-flex d-between d-items-center d-border"},[i("v-uni-image",{staticClass:"reg-img",attrs:{src:"/static/img/shoujihao.png",mode:""}}),i("v-uni-input",{staticClass:"reg-input",attrs:{type:"number",placeholder:"请输入手机号","placeholder-style":"color:#999999"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),i("v-uni-view",{staticClass:"d-flex d-between d-items-center d-border"},[i("v-uni-image",{staticClass:"reg-img",attrs:{src:"/static/img/yanzhengma.png",mode:""}}),i("v-uni-input",{staticClass:"reg-input",attrs:{type:"number",value:"",placeholder:"短信验证码","placeholder-style":"color:#999999"},model:{value:t.YZM,callback:function(e){t.YZM=e},expression:"YZM"}}),i("v-uni-text",{staticClass:"y-z-m",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getYZM.apply(void 0,arguments)}}},[t._v(t._s(t.rTime)),t.btnState?i("v-uni-text",[t._v("s后重发")]):t._e()],1)],1),i("v-uni-view",{staticClass:"d-flex d-between d-items-center d-border"},[i("v-uni-image",{staticClass:"reg-img",attrs:{src:"/static/img/yaoqingma.png",mode:""}}),i("v-uni-input",{staticClass:"reg-input",attrs:{type:"text",value:"",placeholder:"请输入邀请码(选填)","placeholder-style":"color:#999999"},model:{value:t.inverteCode,callback:function(e){t.inverteCode=e},expression:"inverteCode"}})],1)],1),i("v-uni-view",{staticClass:"reg-btn",attrs:{"hover-class":"btnHover"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.subOrder.apply(void 0,arguments)}}},[t._v("绑 定")])],1):t._e()],1)},r=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))}}]);