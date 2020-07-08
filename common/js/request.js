const bassUrl = require('./config.js').bass;
import axios from "axios";
const http = {
	iget(t = {}, e) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: encodeURI(bassUrl + '/works/api/' + e),
				data: t,
				method: "GET",
				header: {
					//   'X-Bmob-Application-Id': bmobConfig.applicationId,
					//   'X-Bmob-REST-API-Key': bmobConfig.restApiKey,
					'Content-Type': 'application/json;charset=UTF-8'
				},
				success: function(res) {
					if (res.statusCode == 200) {
						resolve(res.data)
					} else if (res.statusCode == 500) {
						uni.showToast({
							title: "系统异常",
							icon: "none"
						});
					} else {
						uni.showToast({
							title: "未知错误",
							icon: "none"
						});
					}
				},
				fail: function(res) {
					resolve(res)
					uni.showToast({
						title: "服务器无连接",
						icon: "none"
					});
				}
			});
		});
	},
	ipost(t = {}, e) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: encodeURI(bassUrl + '/works/api/' + e),
				data: t,
				method: "POST",
				header: {
					//   'X-Bmob-Application-Id': bmobConfig.applicationId,
					//   'X-Bmob-REST-API-Key': bmobConfig.restApiKey,
					'Content-Type': 'application/json;charset=UTF-8'
				},
				success: function(res) {
					if (res.statusCode == 200) {
						resolve(res.data)
					} else if (res.statusCode == 500) {
						uni.showToast({
							title: "系统异常",
							icon: "none"
						});
					} else {
						uni.showToast({
							title: "未知错误",
							icon: "none"
						});
					}
				},
				fail: function(res) {
					uni.showToast({
						title: "服务器无连接",
						icon: "none"
					});
				}
			});
		});
	},
	ilogin(t = {}, e) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: encodeURI(bassUrl + '/works/api/' + e),
				data: t,
				method: "POST",
				header: {
					//   'X-Bmob-Application-Id': bmobConfig.applicationId,
					//   'X-Bmob-REST-API-Key': bmobConfig.restApiKey,
					'Content-Type': 'application/json;charset=UTF-8'
				},
				success: function(res) {
					if (res.statusCode == 200) {
						resolve(res.data)
					} else if (res.statusCode == 500) {
						uni.showToast({
							title: "系统异常",
							icon: "none"
						});
					} else {
						uni.showToast({
							title: "未知错误",
							icon: "none"
						});
					}
				},
				fail: function(res) {
					uni.showToast({
						title: "服务器无连接",
						icon: "none"
					});
				}
			});
		});
	},
	iupfile(rUrl, file) {
		uni.showLoading({
			title: "上传中..."
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: encodeURI(bassUrl + '/works/api/uploadImage'),
				filePath: rUrl,
				name: 'file',
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				formData: {
					file: file
				},
				success: function(res) {
					uni.hideLoading();
					if (res.statusCode == 200) {
						resolve(res.data)
					} else if (res.statusCode == 500) {
						uni.showToast({
							title: "系统异常",
							icon: "none"
						});
					} else {
						uni.showToast({
							title: "未知错误",
							icon: "none"
						});
					}
				},
				fail: function(res) {
					uni.hideLoading();
					uni.showToast({
						title: "服务器无连接",
						icon: "none"
					});
				},
			})
		});
	},
	postFile(data) {
		uni.showLoading({
			title:'上传中...'
		})
		return new Promise((resolve, reject) => {
			axios({
					url: encodeURI('http://jiuyema.youkhui.cn/works/api/uploadImage'),
					data: data,
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then(res => {
					//成功
					uni.hideLoading()
					resolve(res.data)
				})
				.catch(res => {
					//失败
					uni.hideLoading()
					reject(res.data)
				})
		})
	}
}

export default http;
