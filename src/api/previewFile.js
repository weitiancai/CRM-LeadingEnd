import request from "../utils/request";


/**
 * doc转换为html
 * @param id
 */

export function doc2Html(id) {
  return request({
    url: `/wordPreview/doc2Html/${id}`,
    method: 'get',
    id
  });
}


/**
 * docx转换为html
 * @param id
 */

export function docx2Html(id) {
  return request({
    url: `/wordPreview/docx2Html/${id}`,
    method: 'get',
    id
  });
}

/**
 * 读取excel的内容
 * @param id
 */

export function readExcelContent(id) {
  return request({
    url: `/excelPreview/readExcelContent/${id}`,
    method: 'get',
    id
  });
}

/**
 * pdf转换位image
 * @param id
 */

export function pdf2Image(id) {
  return request({
    url: `/pdfPreview/pdf2Image/${id}`,
    method: 'get',
    id
  });
}

/**
 * ppt转换位image
 * @param id
 */

export function ppt2Image(id) {
  return request({
    url: `/pptPreview/ppt2Image/${id}`,
    method: 'get',
    id
  });
}

/**
 * txt转换位html
 * @param id
 */

export function txt2Html(id) {
  return request({
    url: `/txtPreview/txt2Html/${id}`,
    method: 'get',
    id
  });
}

/**
 * html预览
 * @param id
 */

export function htmlPreview(id) {
  return request({
    url: `/htmlPreview/html/${id}`,
    method: 'get',
    id
  });
}

/**
 * txt content-type
 * @param id
 */

export function txtContentType(id) {
  return request({
    url: '/txtPreview/txtContentType',
    method: 'get',
    id
  });
}
