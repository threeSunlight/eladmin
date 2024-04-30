<template>
<h1>{{ useInfo.name }}</h1>
<h1>{{ useInfo.age }}</h1>
<h1>拼接的新数据:{{ useInfo.newNameAndAge }}</h1>
<button @click="updatePiniaState">修改名字</button>
<button @click="handlerGetuser">请求接口</button>
<!-- pinia中的基本API方法 -->
<el-button type="button" @click="reset">重置</el-button>
</template>

<script lang="ts" setup>
/**
 * 第一步: 先需要引入
 */
import {useInfoStore} from  '../stores'
  // 导入storeToRefs
  import { storeToRefs } from 'pinia'
/**
 * 第二步: 声明调用函数
 */
const useInfo = useInfoStore()
console.log("***************");
console.log(useInfo);
console.log("***************");

// pinia的解构,解构出来的数据是非响应式是数据,不能直接进行修改
// let {name,age} = storeToRefs(useInfo)
// console.log('/////////////////');
// // 
// console.log(name,age);
// console.log('/////////////////');

/**第一种: 在页面中直接修改pinia中的state值 */
// const updatePiniaState = () => {
//     useInfo.name = "徐俊良"
//     useInfo.age = 33
// }

/**
 * 需求: 需要先判断flag参数是否为true,如果为true才能修改
 */

/**第二种: 通过$patch函数直接修改state中的值 */
// const updatePiniaState = () => {
//     useInfo.$patch({
//         name: '徐俊良',
//         age: 40
//     })
// }

/**第三种: 通过$patch函数直接修改state中的值,但是传参变成了一个函数--推荐 */
// const updatePiniaState = () => {
//     useInfo.$patch((state) => {
//         state.flag = true
//         if(state.flag) {
//             state.name = '徐俊良',
//             state.age = 40
//         }
//     })
// }

/**第四种: 通过$state的方式修改,弊端直接替换掉state数据---最不推荐的写法 */
// const updatePiniaState = () => {
//     useInfo.$state = {
//       name: '𝒆𝒅.',
//       age: 11,
//       flag: true
//     }
// }


/**第五种: 通过actions来修改state中的数据 */
const updatePiniaState = () => {
    useInfo.update()
}

// /**第六种: 非响应式数据进行修改 */
// const updatePiniaState = () => {
//     age++
// }
const handlerGetuser = () => {
    useInfo.getUser()
}

/**重置pinia初始值 */
const reset = () => { 
  useInfo.$reset()
}

/**监听state中数据变化 
 * args :里面包含了,当前的修改数据的新旧value值
 * state: 我们整个声明的state数据变化
 * 
 * 
*/
 // 监听 state 的变化，返回一个工厂函数
 useInfo.$subscribe((args, state) => {
  console.log("***************");
    console.log(args, state)
    console.log("***************");
  })

/**监听actions是否会被调用
 * 进行接口修改和数据变化
 */
useInfo.$onAction(args => {

  console.log('****-----------------');
  console.log(args);
  console.log('****-----------------');
})
</script>
<style>
</style>