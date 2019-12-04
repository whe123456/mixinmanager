<template>
	<el-form label-width="100px" :model="tableData">
		<el-form-item label="服务器id">
			<el-input v-model="tableData.server_id" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="服务器名称">
			<el-input v-model="tableData.server_name" :disabled="true"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	import { serverInfo } from '@/api/api'
	export default {
		data() {
			return {
				tableData: {},
				loading: false
			}
		},
		mounted() {
			const that = this
			that.loading = true
			serverInfo().then(response => {
				console.log(response)
				that.loading = false
				if(response.data.state === '1') {
					that.tableData = response.data.data
				}
			})
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
