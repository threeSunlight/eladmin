/**
 * 第一步: 引入pinia
 */
 import { defineStore } from "pinia";

 // 需要一个独一无二的标识,id信息,确定我们当前的模块
 /**
  * 整个组合式api都是函数式编程思维,我们基本上所有的api都是函数式调用
  */
  type User = {
    name: string,
    age: number
  }
  // 模拟接口返回值
  const Login = (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'wjw',
          age: 22
        })
      }, 2000)
    })
  }
 export const useInfoStore  = defineStore('user', {
    state: () => {
        return {
            name: "徐良",
            age: 32,
            flag:  false
        }
    },
    getters: {
      newNameAndAge(): string {
        return this.name  + '33'
      },

      newAge(): number{
         return this.age++
      }
    },
    actions: {
        update(){
            this.name = "苏毅"
            this.age = 80
        },
        async getUser() {
            let  result = await Login()
            let {name,age} = result
            this.name = name
            this.age = age
            this.update()
            console.log(result, '*****39');
            
        }
    },
 })