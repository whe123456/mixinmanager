import request from '@/utils/request'

export function getLogin(query = {}) {
	return request({
		url: '/manager/api/login.php',
		method: 'post',
		data: query
	})
}
export function changePass(query = {}) {
	return request({
		url: '/manager/api/changepass.php',
		method: 'post',
		data: query
	})
}
export function logOut(query = {}) {
	return request({
		url: '/manager/api/logout.php',
		method: 'post',
		data: query
	})
}

export function addUser(query = {}) {
	return request({
		url: '/manager/api/user/adduser.php',
		method: 'post',
		data: query
	})
}
export function userList(query = {}) {
	return request({
		url: '/manager/api/user/userlist.php',
		method: 'post',
		data: query
	})
}
export function deleteUser(query = {}) {
	return request({
		url: '/manager/api/user/deleteuser.php',
		method: 'post',
		data: query
	})
}

export function deleteGroup(query = {}) {
	return request({
		url: '/manager/api/user/deletegroup.php',
		method: 'post',
		data: query
	})
}
export function groupList(query = {}) {
	return request({
		url: '/manager/api/user/grouplist.php',
		method: 'post',
		data: query
	})
}
export function createGroup(query = {}) {
	return request({
		url: '/manager/api/user/create_group.php',
		method: 'post',
		data: query
	})
}

export function whiteList(query = {}) {
	return request({
		url: '/manager/api/black_whitelist/whitelist.php',
		method: 'post',
		data: query
	})
}
export function addWhiteUser(query = {}) {
	return request({
		url: '/manager/api/black_whitelist/add_white_user.php',
		method: 'post',
		data: query
	})
}
export function deleteWhiteUser(query = {}) {
	return request({
		url: '/manager/api/black_whitelist/delete_white_user.php',
		method: 'post',
		data: query
	})
}

export function blackList(query = {}) {
	return request({
		url: '/manager/api/black_whitelist/blacklist.php',
		method: 'post',
		data: query
	})
}
export function deleteBlackUser(query = {}) {
	return request({
		url: '/manager/api/black_whitelist/delete_black_user.php',
		method: 'post',
		data: query
	})
}
export function addBlackUser(query = {}) {
	return request({
		url: '/manager/api/black_whitelist/add_black_user.php',
		method: 'post',
		data: query
	})
}

export function activeUserStatistics(query = {}) {
	return request({
		url: '/manager/api/statistics/active_user_statistics.php',
		method: 'post',
		data: query
	})
}
export function activeGroupToday(query = {}) {
	return request({
		url: '/manager/api/statistics/active_group_today.php',
		method: 'post',
		data: query
	})
}
export function registUserStatistics(query = {}) {
	return request({
		url: '/manager/api/statistics/regist_user_statistics.php',
		method: 'post',
		data: query
	})
}
export function onlineUser(query = {}) {
	return request({
		url: '/manager/api/statistics/online_user.php',
		method: 'post',
		data: query
	})
}
export function keepUserStatistics(query = {}) {
	return request({
		url: '/manager/api/statistics/keep_user_statistics.php',
		method: 'post',
		data: query
	})
}
export function activeUserToday(query = {}) {
	return request({
		url: '/manager/api/statistics/active_user_today.php',
		method: 'post',
		data: query
	})
}

export function serverInfo(query = {}) {
	return request({
		url: '/manager/api/system/server_info.php',
		method: 'post',
		data: query
	})
}


export function getUrl(query = {}) {
	return request({
		url: 'http://api.oyxin.cn/chaoxchat/api/server_config.php',
		method: 'post',
		data: query
	})
}