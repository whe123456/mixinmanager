<template>
    <div class="home">
        <div class="header">
            <div class="headerTop">
                <div class="logo">后台管理系统</div>
                <div class="user-info">
			<span class="el-dropdown-link" @click="changePass">
			{{userName}}
			</span>
                    <span command="loginout" @click="handleCommand">退出</span>
                </div>
            </div>
            <div class="headerMenu">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                         background-color="#242f42" text-color="#fff" active-text-color="#ffd04b">
                    <template v-for="item in options">
                        <template v-if="item.child">
                            <el-submenu :index="item.path" :key="item.path">
                                <template slot="title"><i :class="item.icon"></i>{{ item.text }}</template>
                                <el-menu-item v-for="(subItem,i) in item.child" :key="i" :index="subItem.path">{{
                                    subItem.text }}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="item.path" :key="item.path">
                                <i :class="item.icon"></i>{{ item.text }}
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import {logOut} from '@/api/api'

	export default {
		data() {
			return {
				activeIndex: '1',
				userName: '',
				options: [{
					path: 'mail',
					text: '通讯录管理',
					child: [{
						path: '/mail/userList',
						text: '用户管理'
					},
						{
							path: '/mail/groupList',
							text: '群组管理'
						}]
				},
					{
						path: 'whiteBlack',
						text: '黑白名单管理',
						child: [{
							path: '/whiteBlack/whiteList',
							text: '白名单管理'
						},
							{
								path: '/whiteBlack/blackList',
								text: '黑名单管理'
							}]
					},
					{
						path: 'operate',
						text: '运营统计',
						child: [{
							path: '/operate/online',
							text: '在线用户列表'
						},
							{
								path: '/operate/activeUserToday',
								text: '今日活跃用户'
							},
							{
								path: '/operate/activeGroupToday',
								text: '今日活跃群组'
							},
							{
								path: '/operate/activeUser',
								text: '活跃用户统计'
							},
							{
								path: '/operate/keepUser',
								text: '留存用户统计'
							},
							{
								path: '/operate/registUser',
								text: '注册用户统计'
							}]
					},
					{
						path: 'system',
						text: '系统设置',
						child: [{
							path: '/system/message',
							text: '短信配置'
						}
						]
					}]
			}
		},
		methods: {
			handleSelect(key) {
				this.$router.push(key)
			},
			handleCommand() {
				const self = this
				logOut({
					username: self.userName
				}).then(response => {
					if (response.data.state === '1') {
						sessionStorage.removeItem('userInfo')
						self.$router.push('/login')
					}
				})
			},
			changePass() {
				this.$router.push('/changePass')
			}
		},
		mounted() {
			const user = sessionStorage.getItem('userInfo')
			if (user === null) {
				this.$router.push('/Login')
				return false
			}
			console.log(this.$route.path)
			this.userName = JSON.parse(user).name
			this.activeIndex = this.$route.path
			if (this.$route.path === '/') {
				this.activeIndex = this.options[0].child[0].path
				this.$router.push(this.options[0].child[0].path)
			}
		}
	}
</script>
<style lang="scss" scoped>
    .content {
        background: none repeat scroll 0 0 #fff;
        width: auto;
        padding: 20px 70px;
        box-sizing: border-box;
        overflow-y: scroll;
    }

    .el-menu {
        overflow-x: hidden;
    }

    .el-table th, .el-table td {
        text-align: center !important;
        padding: 5px 0 !important;
    }

    .add_button {
        display: inline-block
    }

    .add_button .disable {
        color: #c0c4cc;
        background-color: #fff;
        cursor: not-allowed;
    }

    .add_button .disable:hover {
        color: #c0c4cc
    }

    .add_button > button {
        background: center center no-repeat #fff;
        background-size: 16px;
        cursor: pointer;
        margin: 0;
        color: #303133;
    }

    .width200 {
        width: 200px !important;
    }

    .width100 {
        width: 100px !important;
    }

    .header {
        box-sizing: border-box;
        width: 100%;
        font-size: 22px;
        color: #fff;
        background-color: #242f42;
        display: flex;
        flex-direction: column;
        .headerTop {
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .headerMenu {
            padding: 0 50px;
        }
    }

    .header .logo {
        float: left;
        width: 250px;
        text-align: center;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info span {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
        font-size: 14px;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>
