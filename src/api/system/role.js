import request from '@/utils/request'

const api_name = '/admin/system/sysRole'

export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  },
  updateRole(role) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  },
  getRoleById(id) {
    return request({
      url: `${api_name}/findById/${id}`,
      method: 'get'
    })
  },
  batchRemove(idlist) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idlist
    })
  }

}
