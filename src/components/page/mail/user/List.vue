<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>总注册人数{{total}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="密信号">
				<el-input v-model="formInline.uuid" placeholder="请输入密信号"></el-input>
			</el-form-item>
			<el-form-item label="昵称">
				<el-input v-model="formInline.nick" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
				<el-button type="primary" @click="add">添加用户</el-button>
				<!--<el-button type="primary" @click="del('',2)">批量删除</el-button>-->
			</el-form-item>
		</el-form>
		<div>
			<el-table
				:data="tableData"
				stripe
				v-loading="loading"
				@selection-change="handleSelectionChange"
				style="width: 100%;">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="uid"
					label="用户id">
				</el-table-column>
				<el-table-column
					prop="nick"
					label="昵称">
				</el-table-column>
				<el-table-column
					prop="head_url"
					label="头像">
					<template slot-scope="scope">
						<img :src="scope.row.head_url">
					</template>
				</el-table-column>
				<el-table-column
					prop="birthDay"
					label="生日">
				</el-table-column>
				<el-table-column
					prop="sex"
					label="性别">
					<template slot-scope="scope">
						{{scope.row.sex===1?'男':'女'}}
					</template>
				</el-table-column>
				<el-table-column
					prop="username"
					label="手机号">
				</el-table-column>
				<!--<el-table-column
					prop="username"
					label="操作">
					<template slot-scope="scope">
						&lt;!&ndash;<el-button type="primary" icon="el-icon-edit" circle></el-button>&ndash;&gt;
						<el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.uid)"></el-button>
					</template>
				</el-table-column>-->
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="pageCount"
				layout="total,prev, pager, next,slot "
				prev-text="上一页"
				next-text="下一页"
				:current-page.sync="now_page"
				:total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { deleteUser,userList } from '@/api/api'
export default {
	data() {
		return {
			all_page: 0,
			now_page: 1,
			tableData: [],
			pageCount: 10,
			total: 0,
			loading: false,
			formInline: {
				uuid: '',
				nick: '',
				phone: ''
			},
			idList: ''
		}
	},
	methods: {
		add(){
			this.$router.push('/mail/userAdd')
		},
		handleSelectionChange(e) {
			this.idList = e.map((e) => {
				return e.uid
			}).join(',')
		},
		del(e,type=1) {
			let uid = e
			let msg = '是否删除该用户?'
			if(type!==1){
				uid = this.idList
				msg = '是否删除所选用户?'
			}
			console.log(e)
			const that = this
			this.$confirm(msg, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				that.loading = true
				deleteUser({ uid: uid }).then(response => {
					that.loading = false
					if(response.data.state === '1') {
						that.$message({
							type: 'success',
							message: '删除成功!'
						})
						that.getList(1)
					}
				})
			})
		},
		onSubmit() {
			this.getList(1)
		},
		handleCurrentChange(e) {
			this.getList(e)
		},
		getList(page) {
			const that = this
			that.loading = true
			const data = that.formInline
			data.page_count = that.pageCount
			data.page = page
			userList(data).then(response => {
				console.log(response)
				that.loading = false
				if(response.data.state === '1') {
					that.tableData = response.data.data.list
					that.total = response.data.data.count
				}
			})
		}
	},
	mounted() {
		this.getList(1)
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
