import request from "../utils/request";

/**
 * kk文件预览
 * @param id
 */

export function preview(id) {
  return request({
    url: `/kkFilePreview/preview/${id}`,
    method: 'get',
    id
  });
}
