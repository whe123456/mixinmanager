import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: resolve => require(['../components/common/Home.vue'], resolve),
			children: [
				{
					path: '/changePass',
					component: resolve => require(['../components/page/changePass.vue'], resolve),
					meta: {
						title: '修改密码',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/mail/userList',
					component: resolve => require(['../components/page/mail/user/List.vue'], resolve),
					meta: {
						title: '通讯录管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/mail/userAdd',
					component: resolve => require(['../components/page/mail/user/Add.vue'], resolve),
					meta: {
						title: '通讯录管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/mail/groupList',
					component: resolve => require(['../components/page/mail/group/List.vue'], resolve),
					meta: {
						title: '通讯录管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/mail/groupAdd',
					component: resolve => require(['../components/page/mail/group/Add.vue'], resolve),
					meta: {
						title: '通讯录管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/whiteBlack/whiteList',
					component: resolve => require(['../components/page/whiteBlack/whiteList/List.vue'], resolve),
					meta: {
						title: '黑白名单管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/whiteBlack/whiteAdd',
					component: resolve => require(['../components/page/whiteBlack/whiteList/Add.vue'], resolve),
					meta: {
						title: '黑白名单管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/whiteBlack/blackList',
					component: resolve => require(['../components/page/whiteBlack/blackList/List.vue'], resolve),
					meta: {
						title: '黑白名单管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/whiteBlack/blackAdd',
					component: resolve => require(['../components/page/whiteBlack/blackList/Add.vue'], resolve),
					meta: {
						title: '黑白名单管理',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/operate/online',
					component: resolve => require(['../components/page/operate/online.vue'], resolve),
					meta: {
						title: '运营统计',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/operate/activeGroupToday',
					component: resolve => require(['../components/page/operate/activeGroupToday.vue'], resolve),
					meta: {
						title: '运营统计',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/operate/activeUser',
					component: resolve => require(['../components/page/operate/activeUser.vue'], resolve),
					meta: {
						title: '运营统计',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/operate/activeUserToday',
					component: resolve => require(['../components/page/operate/activeUserToday.vue'], resolve),
					meta: {
						title: '运营统计',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/operate/keepUser',
					component: resolve => require(['../components/page/operate/keepUser.vue'], resolve),
					meta: {
						title: '运营统计',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/operate/registUser',
					component: resolve => require(['../components/page/operate/registUser.vue'], resolve),
					meta: {
						title: '运营统计',
						keepAlive: false // 需要缓存
					}
				},
				{
					path: '/system/message',
					component: resolve => require(['../components/page/system/message/config.vue'], resolve),
					meta: {
						title: '系统设置',
						keepAlive: false // 需要缓存
					}
				}
			]
		},
		{
			path: '/Login',
			component: resolve => require(['../components/page/Login.vue'], resolve)
		}
	]
})
