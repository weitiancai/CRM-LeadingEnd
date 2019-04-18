import request from '../utils/request'


/**
 * 登录
 * @param data
 */
export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  });
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: '/login/logout',
    method: 'get'
  })
}
