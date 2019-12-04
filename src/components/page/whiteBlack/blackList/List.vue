<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" @click="add">添加黑名单</el-button>
				<el-button type="primary" @click="del('',2)">批量删除</el-button>
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
					prop="phone"
					label="手机号">
				</el-table-column>
				<el-table-column
						prop="name"
						label="姓名">
				</el-table-column>
				<el-table-column
					prop="bz"
					label="备注">
				</el-table-column>
				<el-table-column
					prop="username"
					label="操作">
					<template slot-scope="scope">
						<!--<el-button type="primary" icon="el-icon-edit" circle></el-button>-->
						<el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.phone)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="pageCount"
				layout="total,prev, pager, next"
				prev-text="上一页"
				next-text="下一页"
				:current-page.sync="now_page"
				:total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { deleteBlackUser,blackList } from '@/api/api'
export default {
	data() {
		return {
			all_page: 0,
			now_page: 1,
			tableData: [],
			pageCount: 10,
			total: 0,
			loading: false,
			idList: ''
		}
	},
	methods: {
		add(){
			this.$router.push('/whiteBlack/blackAdd')
		},
		handleSelectionChange(e) {
			this.idList = e.map((e) => {
				return e.phone
			}).join(',')
		},
		del(e,type=1) {
			let uid = e
			let msg = '是否删除该用户?'
			if(type!==1){
				uid = this.idList
				msg = '是否删除所选用户?'
			}
			console.log(uid)
			const that = this
			this.$confirm(msg, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				that.loading = true
				deleteBlackUser({ phone: uid }).then(response => {
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
		handleCurrentChange(e) {
			this.getList(e)
		},
		getList(page) {
			const that = this
			that.loading = true
			const data = {
				page_count: that.pageCount,
				page: page
			}
			blackList(data).then(response => {
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
