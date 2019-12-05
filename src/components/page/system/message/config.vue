<template>
	<el-form label-width="100px">
		<el-form-item v-for="item in tableData" :key="item.value" :label="item.name">
			<el-input v-model="item.value" :disabled="true"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	import { serverInfo } from '@/api/api'
	export default {
		data() {
			return {
				tableData: [],
				loading: false
			}
		},
		mounted() {
			const that = this
			that.loading = true

			const serverId = localStorage.getItem('serverId')
			serverInfo({server_id: serverId}).then(response => {
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
