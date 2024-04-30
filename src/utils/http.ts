
/**开启跨域凭证 */
type Credentials = boolean 


enum HttPRequest {
 /**超时时间 */
 TIMEOUT = 36 *100,
  /**请求成功 */
  SUCCESS = 200,
  /**请求失败 */
  ERROR = 500,
  /**baseURl根目录配置 */
  BASEURL = "",
  /**配置token请求头变化 */
  TOKENKEY = "Authorization"
}

export {
HttPRequest
}
export type { Credentials }
