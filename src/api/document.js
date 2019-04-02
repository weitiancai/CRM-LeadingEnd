import request from '../utils/request'
/**
 * 根据客户id返回文件夹
 * @param customer_id
 */

export function getTreeById(customer_id) {
  return request({
    url: `/documenttree/getTreeById/${customer_id}`,
    method: 'post',
    customer_id
  });
}

/**
 * 根据客户id返回文件夹
 * @param data
 */

export function uploadDocument(data) {
  return request({
    url: '/documenttree/uploadDocument',
    method: 'post',
    data
  });
}


/**
 * 添加文件夹
 * @param data
 */

export function addDirectory(data) {
  return request({
    url: '/documenttree/addDirectory',
    method: 'post',
    data
  });
}


/**
 * 删除文件夹
 * @param id
 */

export function deleteDirectoryById(id) {
  return request({
    url: `/documenttree/deleteDirectoryById/${id}`,
    method: 'post',
    id
  });
}

/**
 * 1、单击文件夹，在右侧显示的子文件 列表
 * @param data
 */

export function getDocumentChildren(id) {
  return request({
    url: `/documenttree/getDocumentChildren/${id}`,
    method: 'get',
    id
  });
}

/**
 * 2、单击文件夹，在右侧显示的子文件夹 列表
 * @param data
 */

export function getDocumentChildrens(id) {
  return request({
    url: `/documenttree/getDirectoryChildren/${id}`,
    method: 'get',
    id
  });
}

/**
 * 2、单击文件夹，在右侧显示的子文件夹 列表
 * @param data
 */

export function update(data) {
  return request({
    url: `/documenttree/update`,
    method: 'post',
    data
  });
}

/**
 * 下载单个文件 需要文件id为参数,返回的数据是一个文件下载的链接
 * @param fileId
 */

export function download(fileId) {
  return request({
    url: `/documenttree/download/${fileId}`,
    method: 'get',
    fileId
  });
}

/**
 *  对应software 修改 按钮 修改一个documenttree 传入的参数需要是一个documenttree对象，id 要和原来那个id,即id不变，其他属性改变
 * @param data
 */

export function updatefile(data) {
  return request({
    url: `/document/update`,
    method: 'post',
    data
  });
}
