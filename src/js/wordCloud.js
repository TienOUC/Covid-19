import echarts from 'echarts'
require('echarts-wordcloud');
import axios from 'axios'
// 导入 Resize 函数（图表随着页面大小自动缩放）
const resizeChart = require('./resize');

(function () {
    axios.get('http://localhost:3000/weiboHotSearch/').then((res) => {
        // 获取历史数据
        const result = res.data;
        // console.log(res.data);
        var filterArr = [];
        // 过滤出合适的属性值
        result.forEach((item) => {
            filterArr.push({
                name: item.text, // 人搜内容
                value: item.hotValue, // 热搜热度
            })
        })

        // wordCloud
        const myChart = echarts.init(document.querySelector('.wordCloud .chart'));
        // const maskImage = new Image();
        // maskImage.src = require('../images/line.png')
        const option = {
            // title: {
            //     text: ' ',
            //     x: 'center',
            //     textStyle: {
            //         color: 'red',
            //         fontSize: 24
            //     },
            // },
            // tooltip: {
            //     show: true,
            // },
            // backgroundColor: 'rgba(255,255,255,0.1)',
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                // maskImage: maskImage,
                left: 'center',
                top: '10%',
                width: '80%',
                height: '80%',
                sizeRange: [20, 50],
                rotationRange: [-90, 90],
                rotationStep: 30,
                gridSize: 0,
                drawOutOfBound: false,
                // Global text style
                textStyle: {
                    normal: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bolder',
                        // Color can be a callback function or a color string
                        color: function () {
                            // Random color
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 3,
                        shadowColor: '#fff'
                    }
                },
                // Data is an array. Each array item must have name and value property.
                data: filterArr
            }]
        }
        // maskImage.onload = function () {
        //     myChart.setOption(option);
        // }
        myChart.setOption(option);
        resizeChart(myChart);
    })
})();



