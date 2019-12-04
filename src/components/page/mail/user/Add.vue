<template>
    <div>
        <el-page-header @back="goBack" content="添加用户"></el-page-header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密信号" prop="uuid">
                <el-input v-model="ruleForm.uuid"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nick">
                <el-input v-model="ruleForm.nick"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="头像选择" prop="head_url">
                <el-input v-model="ruleForm.head_url"></el-input>
                <el-upload
                        id="uploadEl"
                        :multiple="false"
                        action="http://api.oyxin.cn/bootapi/upload.php"
                        :show-file-list="false"
                        accept=".jpg,.jpeg,.png"
                        :limit="1"
                        :on-success="success"
                        :file-list="fileList"
                        ref="elUpload"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	import {addUser} from '@/api/api'

	export default {
		data() {
			return {
				fileList: [],
				ruleForm: {
					uuid: '',
					nick: '',
					phone: '',
					sex: 1,
					head_url: ''
				},
				rules: {
					uuid: [
						{required: true, message: '请输入密信号', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			success(e) {
				if (e.result === 1) {
					this.ruleForm.head_url = e.url
				}
			},
			submitForm(formName) {
				const self = this
				self.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(self.ruleForm)
						addUser(self.ruleForm).then(response => {
							if (response.data.state === '1') {
								self.$message('添加成功')
								self.ruleForm = {
									uuid: '',
									nick: '',
									phone: '',
									sex: 1,
									head_url: ''
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
