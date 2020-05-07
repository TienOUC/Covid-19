import echarts from 'echarts'
import 'echarts/map/js/china'
import axios from 'axios'
// 导入 Resize 函数（图表随着页面大小自动缩放）
const resizeChart = require('./resize');

// chinaMap chart
(function () {
    const myChart = echarts.init(document.querySelector('.map .china'));
    // 发送请求获取各省数据
    axios.get('http://localhost:3000/').then((res) => {
        const result = res.data.getAreaStat
        var filterArr = []
        // 过滤出合适的属性值
        result.forEach((item) => {
            filterArr.push({
                name: item.provinceShortName, // 省份
                value: item.confirmedCount, // 累计确诊
                deadCount: item.deadCount, // 死亡人数
                curedCount: item.curedCount, // 治愈人数
                suspectedCount: item.suspectedCount, //疑似感染人数
                currentConfirmedCount: item.currentConfirmedCount, // 当前确诊人数
            })
        })
        // console.log(filterArr[0]);
        let confirmed_Count = 0,
            suspected_Count = 0,
            cured_Count = 0,
            dead_Count = 0;

        for (let i = 0; i < filterArr.length; i++) {
            confirmed_Count += filterArr[i].value
            suspected_Count += filterArr[i].suspectedCount
            cured_Count += filterArr[i].curedCount
            dead_Count += filterArr[i].deadCount
        }
        document.querySelector('.confirmed_Count').innerHTML = confirmed_Count
        document.querySelector('.suspected_Count').innerHTML = suspected_Count
        document.querySelector('.cured_Count').innerHTML = cured_Count
        document.querySelector('.dead_Count').innerHTML = dead_Count

        // 使用刚指定的配置项和数据显示图表。
        const option = {
            visualMap: [
                {
                    type: 'piecewise', //piecewise分段   continuous连续
                    bottom: '20px',
                    // orient:'horizontal',
                    left: '50px',
                    pieces: [
                        { gte: 10000 }, // [10000, Infinity]
                        { gt: 1000, lte: 9999 }, // (1000, 9999]
                        { gt: 500, lte: 999 }, // (500, 999]
                        { gt: 100, lte: 499 }, // (100, 499]
                        { gt: 10, lte: 99 }, // (10, 99]
                        { gt: 0, lte: 9 }, // (0, 9)
                    ],
                    inRange: {
                        // 设置地图颜色
                        color: ['#ffccbc', '#f59e83', '#e55a4e', '#cb2a2f', '#ae233e', '#811c24']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
            ],
            tooltip: {
                formatter: function (params) {
                    // console.log( params);
                    return `
                    地区：${params.name} </br>
                    累计确诊：${(params.data && params.data.value) || 0} </br>
                    累计治愈：${(params.data && params.data.curedCount) || 0} </br>
                    累计死亡：${(params.data && params.data.deadCount) || 0} </br>
                    现存确诊：${(params.data && params.data.currentConfirmedCount) || 0}
                    `
                }
            },
            series: [
                {
                    type: 'map',
                    map: 'china',
                    label: {
                        // 显示各省名称
                        show: true,
                        textStyle: {
                            color: '#f5f5f5'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            "areaColor": "rgb(210, 253, 252)"  // 修改鼠标悬停时地图的背景色
                        }
                    },
                    data: filterArr // 数据数组
                }
            ]
        }
        myChart.setOption(option)
    })
    resizeChart(myChart);
})();
