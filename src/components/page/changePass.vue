<template>
	<el-form :rules="rules" ref="ruleForm" label-width="80px" :model="ruleForm">
		<el-form-item label="原密码" prop="password">
			<el-input v-model="ruleForm.password" placeholder="请输入原密码" show-password></el-input>
		</el-form-item>
		<el-form-item label="新密码" prop="new_password">
			<el-input v-model="ruleForm.new_password" autocomplete="off" placeholder="请输入新密码" show-password></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="re_new_password">
			<el-input v-model="ruleForm.re_new_password" autocomplete="off" placeholder="请确认密码" show-password></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
			<el-button @click="goBack">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import { changePass } from '@/api/api'
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					if (this.ruleForm.re_new_password !== '') {
						this.$refs.ruleForm.validateField('checkPass')
					}
					callback()
				}
			}
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'))
				} else if (value !== this.ruleForm.new_password) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			}
			return {
				ruleForm: {
					password: '',
					new_password: '',
					re_new_password: '',
				},
				loading: false,
				rules: {
					new_password: [
						{ validator: validatePass, trigger: 'blur' }
					],
					re_new_password: [
						{ validator: validatePass2, trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			submitForm(formName) {
				const self = this
				self.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(self.ruleForm)
						let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
						changePass({ password: sha256(self.ruleForm.password), new_password: sha256(self.ruleForm.new_password), re_new_password: sha256(self.ruleForm.re_new_password) }).then(response => {
							if(response.data.state === '1') {
								sessionStorage.removeItem('userInfo')
								self.$router.push('/login')
							}
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}
		}
	}
</script>

<style scoped>
	.el-breadcrumb {
		font-size: 30px;
		margin-bottom: 22px;
	}

	.el-pagination {
		text-align: center;
	}

	.right {
		float: right;
	}

	.size20 {
		font-size: 20px;
	}
</style>
