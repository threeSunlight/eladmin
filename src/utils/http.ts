
/**开启跨域凭证 */
type Credentials = boolean 

/**状态码和url的封装方式 */
enum HttPRequest {
 /**超时时间 */
 TIMEOUT = 36 *100,
  /**请求成功 */
  SUCCESS = 200,
  /**请求失败 */
  ERROR = 500,
  /**token过期 */
  UNAUTHORIZED = 401,
  /**错误请求 */
  BADREQUEST = 400,
  /**错误请求 */
  NOTFOUND = 404,
  /**baseURl根目录配置 */
  BASEURL = "",
  /**配置token请求头变化 */
  TOKENKEY = "Authorization"
}

/**对响应拦截器的接口进行定义 */
// interface Data<T> {
//     code: number,
//     msg: string
//     data: {
//         content: T,
//         totalElements: number
//     }
// }

/**每一个接口都返回的公共部分 */
interface Data {
    code: number,
    msg: string
}

/**私有部分data是私有的 */
interface DateContent<T>  extends  Data {
    data:{
        content: T,
        totalElements: number
    }
}


type Config = {
    baseURL:string,
    timeout: number,
    withCredentials: boolean,
    headers: any
}

export {
HttPRequest
}
export type { DateContent,Config,Credentials}
