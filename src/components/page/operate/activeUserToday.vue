<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>今日活跃用户{{total}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-table
					:data="tableData"
					stripe
					v-loading="loading"
					style="width: 100%;">
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
	import { activeUserToday } from '@/api/api'
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
				activeUserToday(data).then(response => {
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
