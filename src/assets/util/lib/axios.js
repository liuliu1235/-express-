import axios from 'axios'
import { Message, Loading } from 'element-ui'
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({

})
// 添加请求拦截器
Service.interceptors.request.use(config => {
    return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
    // console.log(response)
    return response
}, error => {
    const msg = error.Message !== undefined ? error.Message : ''
    Message({
        message: '网络错误' + msg,
        type: 'error',
        duration: 3 * 1000
    })
    loadingInstance.close()
    return Promise.reject(error)
})
