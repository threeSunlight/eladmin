import http from '@/utils/httpRequest'

/**
 * 封装请求计算校验接口
 */
 const loginCode =  () => {
    return http.get<{
        img: string,
        uuid: string
    }>('/auth/code')
 }




 export {
    loginCode
 }