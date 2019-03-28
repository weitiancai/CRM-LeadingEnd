import request from '../utils/request'
/**
 * 返回所有软件
 * @param data
 */

export function softwarePage(data) {
  return request({
    url: '/software/softwarePage',
    method: 'post',
    data
  });
}
/**
 * 添加软件
 * @param data
 */

export function add(data) {
  return request({
    url: '/software/add',
    method: 'post',
    data
  });
}
/**
 * 根据id改变软件状态
 * @param data
 */

export function changeValid(id) {
  return request({
    url: `/software/changeValid/${id}`,
    method: 'get',
    id
  });
}
/**
 * 根据id修改软件信息
 * @param data
 */

export function update(data) {
  return request({
    url: '/software/update',
    method: 'post',
    data
  });
}
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
 * 根据id改变软件状态
 * @param data
 */

export function selectById(id) {
  return request({
    url: `/hardware/selectById/${id}`,
    method: 'get',
    id
  });
}
/**
 * 根据id删除软件
 * @param data
 */

export function deleteIt(id) {
  return request({
    url: `/software/delete/${id}`,
    method: 'get',
    id
  });
}
