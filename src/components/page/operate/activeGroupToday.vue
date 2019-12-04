<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>今日活跃群组{{total}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-table
					:data="tableData"
					stripe
					v-loading="loading"
					style="width: 100%;">
				<el-table-column
						prop="group_id"
						label="群id">
				</el-table-column>
				<el-table-column
						prop="user_count"
						label="成员数量">
				</el-table-column>
				<el-table-column
						prop="title"
						label="群名称">
				</el-table-column>
				<el-table-column
						prop="head_url"
						label="群头像">
					<template slot-scope="scope">
						<img :src="scope.row.head_url">
					</template>
				</el-table-column>
				<el-table-column
						prop="create_by"
						label="创建者">
				</el-table-column>
				<el-table-column
						prop="all_no_speak"
						label="全体禁言">
					<template slot-scope="scope">
						{{scope.row.all_no_speak===1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column
						prop="delete_after_reading"
						label="阅后即焚">
					<template slot-scope="scope">
						{{scope.row.delete_after_reading===1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column
						prop="need_auth"
						label="群认证">
					<template slot-scope="scope">
						{{scope.row.need_auth===1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column
						prop="protected_mode"
						label="成员保护">
					<template slot-scope="scope">
						{{scope.row.protected_mode===1?'是':'否'}}
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
	import { activeGroupToday } from '@/api/api'
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
				activeGroupToday(data).then(response => {
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
