import request from '../utils/request'
/**
 * 添加客户
 * @param data
 */

export function add(data) {
  return request({
    url: '/customer/add',
    method: 'post',
    data
  });
}
/**
 * 客户列表
 * @param data
 */

export function getAll() {
  return request({
    url: '/customer/getAll',
    method: 'get',
  });
}
/**
 * 添加客户
 * @param data
 */

export function customerPage(data) {
  return request({
    url: '/customer/customerPage',
    method: 'post',
    data
  });
}
