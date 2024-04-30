/**
 * 需求: 
 * 1. token过期处理, ✅
 * 2. 状态码,✅
 * 3. 请求超时时间,✅
 * 4. 配置一个loading加载
 * 5. 请求拦截里面封装token ✅
 * 6. 封装一个配置多环境代理标识 adurl ✅
 * 7. get post  delete put 封装请求方法 ✅
 * 8. 用class类来进行封装 ✅
 * 
 * 
 */
// 第一步: 引入
import axios, { type AxiosInstance, AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios"
import * as TS from './http'
/**引入获取token方法 */
import { getToken, removeToken } from './auth'
/**引入router跳转 */
import router from '@/router'
/**引入提示弹框 */
import { ElMessageBox } from 'element-plus'


console.log(' import.meta.env.MODE: ',  import.meta.env.VITE_APP_BASE_API);

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
  public constructor(config:TS.Config) {
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
     * 第一步:封装401过期状态码?判断401过期后,然后接下来跳转到登录页面
     */
    this.service.interceptors.response.use(
      /**一个是返回成功 */
      (response: AxiosResponse) => {
        console.log(response, 'response')
        const { data, config } = response // 解构
        if (data.status === TS.HttPRequest.UNAUTHORIZED) { // 401
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          removeToken()
          // 跳转到登录页面
          router.replace({ path: '/login' })
          return Promise.reject(data)
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        return data
      },
      /**一个是返回失败 */
      (error: AxiosError) => {
        const { response } = error
        let title: string = ''
        let message: string = ''

        if (error && response) {
          message = response.statusText
          // 401, token失效
          if (response.status === TS.HttPRequest.UNAUTHORIZED) {
            router.replace(
              {
                name: 'login'
              }
            )
          }
          switch (
          response.status // 跨域存在获取不到状态码的情况
          ) {
            case TS.HttPRequest.BADREQUEST:
              title = '错误请求'
              break
            case TS.HttPRequest.UNAUTHORIZED:
              title = '资源未授权'
              break
            case TS.HttPRequest.NOTFOUND:
              title = '未找到所请求的资源'
              break
            case TS.HttPRequest.ERROR:
              title = '内部服务器错误'
              break
            default:
              title = response.status.toString()
          }
          return ElMessageBox.alert(
            title,
            '提示',
            {
              confirmButtonText: 'OK',
              type: 'warning',
            }
          )
        } else {
          // 跨域获取不到状态码或者其他状态进行的处理
          return ElMessageBox.alert(
            '未知错误,请联系管理员',
            '提示',
            {
              confirmButtonText: 'OK',
              type: 'error',
            }
          )
        }
      }
    )
  }

  /**动态添加请求环境代理api标识
   * targetUrl: 实际中请求的url代理参数
   */
  public adurl(targetUrl: string) {
      return import.meta.env.VITE_APP_BASE_API + targetUrl
  }

  /**
   * 封装接口的请求方式,get,post,delete,put方法
   * 
   * 泛型 T
   * code
   * data: {  
   *  content: T
  *  totalElements: number
   * },\
   * msg: ""
   * 
   */
    // 常用方法封装
  /**
   * @param url 接口
   * @param params 传参
   */
  get<T>(url:string,params?: Object): Promise<TS.DateContent<T>> {
    return this.service.get(this.adurl(url),{params})
  }

  /**
   * post请求封装
   * @param url 
   * @param params 
   */
  post<T>(url:string,params?:Object): Promise<TS.DateContent<T>>{
    return this.service.post(this.adurl(url),params)
  }
  
  /**
   * put请求方法封装
   * @param url 
   * @param params 
   */
  put<T>(url: string, params?: object): Promise<TS.DateContent<T>> {
    return this.service.put(this.adurl(url), params)
  }
  
  /**
   * delete请求方法封装
   * @param url 
   * @param params 
   */
  delete<T>(url: string, params?: object): Promise<TS.DateContent<T>> {
    return this.service.delete(this.adurl(url), { params })
  }
}


//实例对象
const http = new Http(config)

export default http
