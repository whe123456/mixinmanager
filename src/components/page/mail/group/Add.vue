<template>
    <div>
        <el-page-header @back="goBack" content="添加群组"></el-page-header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="群标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="创建者uid" prop="create_user">
                <el-input v-model="ruleForm.create_user"></el-input>
            </el-form-item>
            <el-form-item label="成员列表uid" prop="uid">
                <el-input v-model="ruleForm.uid"></el-input>
                用户uid(多个用户之间用英文逗号（,）分隔，不含创建者)
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
	import {createGroup} from '@/api/api'

	export default {
		data() {
			return {
				fileList: [],
				ruleForm: {
					title: '',
					create_user: '',
					uid: '',
					head_url: ''
				},
				rules: {
					title: [
						{required: true, message: '请输入群昵称', trigger: 'blur'}
					],
					create_user: [
						{required: true, message: '请输入创建者uid', trigger: 'blur'}
					],
					uid: [
						{required: true, message: '请输入群成员uid', trigger: 'blur'}
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
						createGroup(self.ruleForm).then(response => {
							if (response.data.state === '1') {
								self.$message('添加成功')
								self.ruleForm = {
									title: '',
									create_user: '',
									uid: '',
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
