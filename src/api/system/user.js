import request from '@/utils/request'

const api_name = '/admin/system/sysUser'

export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  save(user) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: user
    })
  },
  getUserById(id) {
    return request({
      url: `${api_name}/getUser/${id}`,
      method: 'get'
    })
  },
  updateUser(user) {
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: user
    })
  },
  remove(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'get'
    })
  },
  updateStatus(id, status) {
    return request({
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: 'get'
    })
  }
}
