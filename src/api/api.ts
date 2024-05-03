import http from '@/utils/httpRequest'
import * as TS from './type'

/**验证码 */
export const loginCode = () => {
   return http.get<{ img: string; uuid: string }>('/auth/code')
 }

/**登录密码 */
 export const login = (data: TS.Ilogin) => {
   return http.post<{ token: string; user: { username: string; avatar: string } }>(
     '/auth/login',
     data
   )
 }

