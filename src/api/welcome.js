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
<<<<<<< HEAD
=======
/**
 * 添加客户
 * @param data
 */

export function customerList(data) {
  return request({
    url: '/customer/customerList',
    method: 'post',
    data
  });
}
>>>>>>> 062e872014baad1088c6de7f28c747979cee1545
