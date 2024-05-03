<template>
	<div>
		<!-- 柱状生日图 -->
		<div id="birthday" style="height: 400px; width: 100%"></div>
		<!-- 饼状图 -->
		<div id="pieChart"></div>
		<!-- 折线图 -->
		<ve-line :data="chartData" width="800px" ></ve-line>
		<ve-histogram :data="chartData" width="800px" ></ve-histogram>
		<ve-pie :data="chartData" width="800px" :settings="pieSetting"></ve-pie>
	</div>
</template>

<script>
import echarts from "echarts"

export default {
	components: {},
	data() {
		this.pieSetting = {
			label: {
				show: true,
				position: 'center'
			}
		}
		return{
			chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
		}
	},
	methods: {},
	mounted() {
		setTimeout(() => {
			let chartDom = document.getElementById("birthday")
			let myChart = echarts.init(chartDom)
			let option
			option = {
				title: {
					text: "某站点用户访问来源",
					subtext: "纯属虚构",
					left: "center"
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: "vertical",
					left: "left",
					data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: [
							{ value: 335, name: "直接访问" },
							{ value: 310, name: "邮件营销" },
							{ value: 234, name: "联盟广告" },
							{ value: 135, name: "视频广告" },
							{ value: 1548, name: "搜索引擎" }
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}
				]
			}

			option && myChart.setOption(option)
		})
	},
	methods: {}
}
</script>

<style scoped lang="scss">
#birthday {
	height: 300px;
}
</style>