import axios from 'axios'
import vm from '@/main'
import qs from 'qs'
const baseURL = sessionStorage.getItem('baseURL')
//create an axios instance
const service = axios.create({
	baseURL: baseURL, //api 的 base_url
	timeout: 30000 //request timeout
})

//request interceptor
service.interceptors.request.use(
	config => {
		//Do something before request is sent  X-Requested-With: XMLHttpRequest
		// config.headers['X-Requested-With'] = 'XMLHttpRequest'
		let data = {}
		if (config.method === 'get') {
			data = config.params
		} else {
			data = config.data
		}
		// data.test=1
		if (data === undefined || data === '') {
			data = {}
		}
		let newData = data
		if (config.method === 'get') {
			config.params = newData
		} else {
			config.data = newData
		}
		if (config.method === 'post') {
			config.data = qs.stringify(config.data)
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
		}
		return config
	},
	error => {
		//Do something with request error
		vm.$alert('网络异常，请检查网络后重试', '提示', {
			confirmButtonText: '确定'
		})
		console.log(error) //for debug
		return Promise.reject(error)
	}
)

//response interceptor
service.interceptors.response.use(
	response => {
		const reqData = response.config.data.split('&')
		let o = {}
		reqData.forEach((value) => {
			o[value.split('=')[0]] = value.split('=')[1]
		})
		if (response.data.hasOwnProperty('state') && response.data.state !== '1') {
			vm.$alert(response.data.msg, '提示', {
				confirmButtonText: '确定'
			})
		}
		return response
	},
	error => {
		vm.$vux.loading.hide()
		// 当响应异常时做一些处理
		if (error && error.response) {
			switch (error.response.status) {
			case 400: error.message = '请求错误(400)'; break
			case 401: error.message = '未授权，请重新登录(401)'; break
			case 403: error.message = '拒绝访问(403)'; break
			case 404: error.message = '请求出错(404)'; break
			case 408: error.message = '请求超时(408)'; break
			case 500: error.message = '服务器错误(500)'; break
			case 501: error.message = '服务未实现(501)'; break
			case 502: error.message = '网络错误(502)'; break
			case 503: error.message = '服务不可用(503)'; break
			case 504: error.message = '网络超时(504)'; break
			case 505: error.message = 'HTTP版本不受支持(505)'; break
			default: error.message = `连接出错(${error.response.status})!`
			}
		} else {
			if (axios.isCancel(error)) {
				error.message = '取消请求'
			} else {
				error.message = '连接服务器失败!'
			}
		}
		//  判断请求超时
		if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
			error.message = '网络异常，请检查网络后重试'
			// return service.request(originalRequest);//例如再重复请求一次
		}
		if (!axios.isCancel(error)) {
			vm.$alert(error.message, '提示', {
				confirmButtonText: '确定'
			})
		}
		console.log('err' + error) //for debug
		return Promise.reject(error)
	}
)

export default service
