'use strict'
import axios from 'axios'
axios.defaults.withCredentials = true
import qs from 'qs'

axios.interceptors.request.use(config => {
	// loading
	return config
}, error => {
	return Promise.reject(error)
})
axios.interceptors.response.use(response => {
	return response
}, error => {
	return Promise.resolve(error.response)
})
// function checkStatus (response) {
//   // loading
//   // 如果http状态码正常，则直接返回数据
//   if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
//     return response
//     // 如果不需要除了data之外的数据，可以直接 return response.data
//   }
//   // 异常状态下，把错误信息返回去
//   return {
//     status: -404,
//     msg: '网络异常'
//   }
// }
function checkCode(res, callback) {
	if (res.code !== 403) {
		if (typeof callback === 'function') {
			callback(res)
		}
	}
}

export default {
	post(url, data, headers = {}, callback) {
		console.log('post')
		return axios({
			method: 'post',
			// baseURL: '/api/',
			url,
			data: qs.stringify(data),
			// timeout: 0,
			headers: headers,
			withCredentials: true
		}).then(
			(res) => {
				if (res.data !== undefined) {
					return checkCode(res.data, callback)
				}
			}
		)
	},
	get(url, params, callback, headers = {}) {
		return axios({
			method: 'get',
			// baseURL: 'http://test.cdlhzz.cn/mall',
			url,
			params, // get 请求时带的参数
			// timeout: 0,
			headers: headers,
			withCredentials: true
		}).then(
			(res) => {
				if (res.data !== undefined) {
					return checkCode(res.data, callback)
				}
			}
		)
	}
}
