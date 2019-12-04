<template>
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-date-picker
					v-model="formInline.date"
					type="daterange"
					align="right"
					unlink-panels
					value-format="yyyy-MM-dd"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:picker-options="pickerOptions">
			</el-date-picker>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<div>
			<el-table
					:data="tableData"
					stripe
					v-loading="loading"
					style="width: 100%;">
				<el-table-column
						prop="date"
						label="日期">
				</el-table-column>
				<el-table-column
						prop="count"
						label="数量">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { keepUserStatistics } from '@/api/api'
	export default {
		data() {
			return {
				tableData: [],
				loading: false,
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				formInline: {
					date: []
				},
				idList: ''
			}
		},
		methods: {
			onSubmit() {
				this.getList(1)
			},
			getList() {
				const that = this
				that.loading = true
				console.log(this.formInline.date)
				const data = {
					start_date: this.formInline.date[0],
					end_date: this.formInline.date[1]
				}
				keepUserStatistics(data).then(response => {
					console.log(response)
					that.loading = false
					if(response.data.state === '1') {
						that.tableData = response.data.data
					}
				})
			}
		},
		mounted() {
			const end = new Date()
			const start = new Date(end.getTime() - (3600 * 1000 * 24 * 1))

			const endTs = end.getFullYear() + '-' + (end.getMonth()+1 < 10 ? '0'+(end.getMonth()+1) : end.getMonth()+1) + '-' + (end.getDate() < 10 ? '0'+(end.getDate()) : end.getDate())
			const startTs = start.getFullYear() + '-' + (start.getMonth()+1 < 10 ? '0'+(start.getMonth()+1) : start.getMonth()+1) + '-' + (start.getDate() < 10 ? '0'+(start.getDate()) : start.getDate())
			this.formInline.date = [startTs, endTs]
			this.getList()
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
