import request from "../utils/request";

/**
 * 根据客户id查找详情
 * @param data
 */

export function selectById(id) {
  return request({
    url: `/customer/selectById/${id}`,
    method: 'get',
    id
  });
}
/**
 * 修改客户信息
 * @param data
 */

export function update(data) {
  return request({
    url: '/customer/update',
    method: 'post',
    data
  });
}
