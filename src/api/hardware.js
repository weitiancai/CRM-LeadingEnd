import request from '../utils/request'
/**
 * 返回所有硬件
 * @param data
 */

export function hardwarePage(data) {
  return request({
    url: '/hardware/hardwarePage',
    method: 'post',
    data
  });
}
/**
 * 添加硬件
 * @param data
 */

export function add(data) {
  return request({
    url: '/hardware/add',
    method: 'post',
    data
  });
}
/**
 * 根据id改变硬件状态
 * @param data
 */

export function changeValid(id) {
  return request({
    url: `/hardware/changeValid/${id}`,
    method: 'get',
    id
  });
}
/**
 * 根据id修改硬件信息
 * @param data
 */

export function update(data) {
  return request({
    url: '/hardware/update',
    method: 'post',
    data
  });
}
/**
 * 根据id删除硬件
 * @param data
 */

export function deleteIt(id) {
  return request({
    url: `/hardware/delete/${id}`,
    method: 'get',
    id
  });
}
