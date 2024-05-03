<template>
  <!-- 
    需求: 传参: ref,style样式 options的配置
 -->
  <div :id="id" :ref="ref" :style="style"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartOption
const {id,ref,style,options} = defineProps<{
    id: string,
    ref: string,
    style: any,
    options: object
}>()

/**dom元素挂载以后,进行创建 */
onMounted(() => {

 const zhuang = document.getElementById(id) 
  console.log(zhuang)
  //@ts-ignore
  let myChart = echarts.init(zhuang)
  var option: EChartsOption
  option = options
  option && myChart.setOption(option)

  window.addEventListener('resize', function() {
    myChart.resize();
  });

})
</script>
<style></style>
