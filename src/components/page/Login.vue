<template>
	<div>
		<div class="wrapper" v-show="haveUrl">
			<div @click="haveUrl=!haveUrl" class="qhServer">切换服务器</div>
			<div class="ms-title">蜜信运维管理系统</div>
			<div class="ms-login" v-loading="loading">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
					<el-form-item prop="username">
						<el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-form-item>
					<div class="login-btn">
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
					</div>
				</el-form>
			</div>
		</div>
		<div class="wrapper" v-show="!haveUrl">
			<div class="ms-title">选择服务器</div>
			<div class="ms-login" v-loading="loading">
				<el-form :model="serverForm" :rules="rules" ref="serverForm" label-width="0px" class="demo-ruleForm">
					<el-form-item prop="server_id">
						<el-input v-model="serverForm.server_id" placeholder="请输入服务器名称"></el-input>
					</el-form-item>
					<div class="login-btn">
						<el-button type="primary" @click="submitServer('serverForm')">登录</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { getLogin,getUrl } from '@/api/api'
export default {
	data() {
		return {
			haveUrl: true,
			loading: false,
			ruleForm: {
				username: '',
				password: ''
			},
			serverForm: {
				server_id: ''
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
				server_id: [
					{ required: true, message: '请输入服务器名称', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		submitForm(formName) {
			const self = this
			self.$refs[formName].validate((valid) => {
				if (valid) {
					let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
					getLogin({ username: self.ruleForm.username, password: sha256(self.ruleForm.password) }).then(response => {
						if(response.data.state === '1') {
							sessionStorage.setItem('userInfo',JSON.stringify(response.data.data))
							self.$router.push('/mail/userList')
						}
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		submitServer(formName) {
			const self = this
			self.$refs[formName].validate((valid) => {
				if (valid) {
					getUrl(self.serverForm).then(response => {
						console.log(response)
						if(response.data.state === '1') {
							localStorage.setItem('baseURL',response.data.config.baseurl_http)
							localStorage.setItem('serverId',self.serverForm.server_id)
							setTimeout(function() {
								self.$router.go(0)
							},1)
						}
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	},
	mounted(){
		const baseURL = localStorage.getItem('baseURL')
		if (baseURL === null) {
			this.haveUrl = false
		}
	}
}
</script>
<style lang="scss" scoped>
	.qhServer{
		position: fixed;
		top: 10px;
		right: 20px;
		color: white;
		cursor: pointer;
	}
	.ms-title{
		text-align: center;
		font-size:30px;
		color: #fff;
		margin-bottom: 40px;
	}
	.ms-login{
		width:300px;
		/*height:160px;*/
		padding:40px;
		border-radius: 5px;
		background: #fff;
	}
	.login-btn{
	}
	.login-btn button{
		width:100%;
		height:36px;
	}
	.app-login {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -270px;
		margin-left: -190px;
		height: 540px;
		width: 380px;
		border-radius: 5px;
		background-color: #fff;
		text-align: center;
		.login-scan {
			padding: 54px 38px;
			text-align: center;
			.scan-area{
				height: 266px;
				width: 266px;
				margin: auto;
				position: relative;
				.qr-content {
					height: 100%;
					width: 100%;
					position: relative;
					background-color: #e1e1e1;
				}
				.timeout{
					position: absolute;
					z-index: 1;
					background-color: rgba(0,0,0,0.6);
					display: flex;
					justify-content: center;
					align-items: center;
					.second{
						color: #fff;
						margin-right: 10px;
					}
				}
			}
			.title {
				font-size: 26px;
				text-align: left;
				margin-bottom: 48px;
			}
			.tips-content {
				margin-top: 44px;
				.tips-main {
					font-size: 20px;
					color: #888;
				}
			}
		}
	}
</style>
