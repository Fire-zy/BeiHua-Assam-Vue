import request from '@/utils/request'
// 登陆
export function login(data) {
  return request({
    url: '/data-governance-multidatasource/account/loginWithPassword',
    method: 'post',
    data
  })
}
// 注册
export function regist(data) {
  return request({
    url: '/data-governance-multidatasource/account/registry',
    method: 'post',
    data
  })
}

//数据库连接测试
export function dataconnect(data) {
  return request({
    url: '/data-governance-multidatasource/datasource/datasource_connect_test',
    method: 'post',
    data
  })
}

// 添加数据源
export function addsource(data) {
  return request({
    url: '/data-governance-multidatasource/datasource/add',
    method: 'post',
    data
  })
}

//获取数据源
export function querysource() {
  return request({
    url: '/data-governance-multidatasource/datasource/get_all_db',
    method: 'get',
  })
}

// 删除数据源

export function remove(data) {
  return request({
    url: '/data-governance-multidatasource/datasource/remove',
    method: 'post',
    data
  })
}

//获取数据源表名列名

export function getSourceList(data) {
  return request({
    url: '/data-governance-multidatasource/datasource/table_info_with_source_id',
    method: 'post',
    data
  })
}

//SQL执行测试

export function sqlTest(data) {
  return request({
    url: '/data-governance-multidatasource/sql/sql_test',
    method: 'post',
    data
  })
}


export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
