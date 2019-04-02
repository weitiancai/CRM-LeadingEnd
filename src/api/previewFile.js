import request from '../utils/request'
/**
 * 根据文件id获取base64
 * @param data
 */

export function preview(fileId) {
  return request({
    url: `/documenttree/preview/${fileId}`,
    method: 'get',
  });
}
