/**
 * 需求: 
 * 1. token过期处理,
 * 2. 状态码,
 * 3. 请求超时时间,
 * 4. 配置一个loading加载
 * 5. 请求拦截里面封装token
 * 6. 封装一个配置多环境代理标识
 * 7. get post  delete put 封装请求方法
 * 8. 用class类来进行封装
 * 
 * 
 */
// 第一步: 引入
import axios, { type AxiosInstance, AxiosError } from "axios"
import * as TS from './http'
/**引入获取token方法 */
import {getToken} from './auth'
// 单独配置是否开启跨域凭证
const withCredentials: TS.Credentials = true

//  axios创建的时候配置项
const config = {
    // 配置根目录
    baseURL: TS.HttPRequest.BASEURL as string,
    //超时时间
    timeout: TS.HttPRequest.TIMEOUT as number,
    // 是否开启跨域凭证
    withCredentials: withCredentials,
    // 配置headers的请求头
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
 }


// 用class类声明我们当前一个类命  http
class Http {
    // 定义成员变量并指定类型
    service: AxiosInstance
    // 设置公共的类名放置传参  -- 构造器里面去实例化当前axios请求,配置请求拦截器,响应拦截器
    public constructor() {
        /**实例化axios */
         this.service = axios.create(config)
        /**
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 所以我们要从cookie中进行读取
         * */
         this.service.interceptors.request.use(
            // 请求成功
            (config) => {
                config.headers[TS.HttPRequest.TOKENKEY] = getToken()// 请求头带上token
                return config
            },
            (error: AxiosError) => {
              // 请求报错
              Promise.reject(error)
            }
          )
        /**响应拦截器
         * 服务器 -> [请求拦截器] -> 客户端发送请求
         * 封装状态,和token过期
         */
    }
}