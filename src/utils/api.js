import axios from 'axios'
axios.defaults.baseURL = 'http://bvvy.ngrok.xiaomiqiu.cn'
// axios.defaults.baseURL = 'http://192.168.31.197:8081'
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url,
      data: config.data,
      method: config.method,
      header: config.headers,
      success: function (data) {
        return resolve(data)
      },
      fail: function (data) {
        reject(data)
      }
    })
  })
}

export const Method = {
  POST: 'post',
  GET: 'get',
  DELETE: 'delete',
  PUT: 'put'
}

const Api = {
  post: (url, data, headers) => api(url, data, Method.POST, headers),
  get: (url, params, headers) => api(url, params, Method.GET, headers),
  delete: (url, data) => api(url, data, Method.DELETE),
  put: (url, data) => api(url, data, Method.PUT)
}

const api = (url, data, method = 'get', headers) => {
  return new Promise((resolve, reject) => {
    axios({method, url: url, data, params: method === 'get' ? data : {}, headers: headers}).then((res) => {
      if (res.status <= 200) {
        resolve(res.data)
      } else if (res.status > 200 && res.status < 300) {
        resolve(res.data)
      } else {
        resolve(res.data)
      }
    }).catch((error) => {
      const res = error.response
      if (res.status >= 400 && res.status < 500) {
        resolve(res.data)
      } else {
        resolve(res.data)
      }
    })
  })
}
export default Api
