// import echarts from './echarts.min.js'
import 'jquery'
import echarts from 'echarts'
// import '../map/china.js'
import 'echarts/map/js/china';
import axios from 'axios'

// chinaMap chart

const myChart = echarts.init(document.querySelector('.map .china'));
// 发送请求获取各省数据
axios.get('http://localhost:3000/').then((res) => {
    const result = res.data.getAreaStat
    // console.log(result);
    var filterArr = []
    // 过滤出合适的属性值
    result.forEach((item) => {
        filterArr.push({
            name: item.provinceShortName, // 省份
            value: item.confirmedCount, // 累计确诊
            deadCount: item.deadCount, // 死亡人数
            curedCount: item.curedCount, // 治愈人数
            currentConfirmedCount: item.currentConfirmedCount, // 当前确诊人数
        })
    })
    // console.log(filterArr[0]);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption({
        title: {
            // 标题
            text: '',
            left: 'center', // 居中
            top: 10,
        },
        // 背景色
        // backgroundColor: ' ',
        visualMap: [
            {
                type: 'piecewise',
                left: '100px',//piecewise分段   continuous连续
                pieces: [
                    { gt: 10000 }, // (10000, Infinity]
                    { gt: 1000, lte: 9999 }, // (1000, 9999]
                    { gt: 100, lte: 999 }, // (100, 999]
                    { gt: 10, lte: 99 }, // (10, 99]
                    { gt: 0, lte: 9 }, // (0, 9)
                ],
                inRange: {
                    // 设置地图颜色
                    color: ['#fdebcf', '#f59e83', '#e55a4e', '#cb2a2f', '#811c24'],
                },
                textStyle: {
                    color: '#fff'
                }
            },
        ],
        tooltip: {
            // 鼠标移上去人数提示
            formatter: function (params) {
                // console.log(params);
                return `
                    地区：${params.name} </br>
                    累计确诊：${(params.data && params.data.value) || 0} </br>
                    累计死亡：${(params.data && params.data.deadCount) || 0} </br>
                    累计治愈：${(params.data && params.data.curedCount) || 0} </br>
                    现存确诊：${(params.data && params.data.currentConfirmedCount) || 0}
                    `
            }
        },
        series: [
            {
                type: 'map', // 设置类型为地图
                map: 'china', // 引入地图 js
                label: {
                    // 显示各省名称
                    show: true,
                    textStyle: {
                        color: '#616161'
                    }
                },
                itemStyle: {
                    emphasis: {     // 修改鼠标悬停时地图的背景色
                        "areaColor": "rgb(210, 253, 252)"
                    }
                },
                data: filterArr // 数据数组
            }
        ]
    })
})


