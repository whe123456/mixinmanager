<template>
    <div>
        <el-page-header @back="goBack" content="新增白名单"></el-page-header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="bz">
                <el-input v-model="ruleForm.bz"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	import {addWhiteUser} from '@/api/api'

	export default {
		data() {
			return {
				fileList: [],
				ruleForm: {
					phone: '',
					name: '',
					bz: ''
				},
				rules: {
					phone: [
						{required: true, message: '请输入手机号', trigger: 'blur'}
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
						addWhiteUser(self.ruleForm).then(response => {
							if (response.data.state === '1') {
								self.$message('添加成功')
								self.ruleForm = {
									phone: '',
									name: '',
									bz: ''
                                }
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

<style lang="scss" scoped>
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
