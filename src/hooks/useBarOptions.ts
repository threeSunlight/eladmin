
 const useBarOptions = () => {
    const classStyle = {
        height: '50vh',
        width: '50vw'
    }
    const zhuang = "zhuang"
    const options = {
        // 标题
        title: {
            text: '我是柱状图',
            show: true,
            textStyle: {
                color: 'yellowgreen'
            },
            subtext: '我是复标题',
            subtextStyle: {
                color: 'red'
            }
        },
        // 图例提示的配置
        legend: {
            type: 'plain',
            show: true,
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            tooltip: {
                show: true,
                formatter: 'dddddd'
            },
            data: [
                {
                    name: '徐徐'
                }
            ]
        },

        // 鼠标移上去弹框的一个展示
        tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            // formatter: '{c}', //折线图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
            axisPointer: {
                type: 'shadow' //line:直线指示器 || shadow:阴影指示器  || none 无指示器 || cross 十字准星指示器
            }
        },
        // 设置图标颜色
        color: ['#d48265'],

        xAxis: {
            type: 'category',
            data: ['Monssss', '徐良', '李洋', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                name: '徐徐',
                type: 'bar'
            }
        ]
    }


    return {
        classStyle,
        zhuang,
        options
    }
}
export default useBarOptions