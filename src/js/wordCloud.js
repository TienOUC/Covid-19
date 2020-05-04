import echarts from 'echarts'
require('echarts-wordcloud');
// 导入 Resize 函数（图表随着页面大小自动缩放）
const resizeChart = require('./resize');

(function () {
    const myChart = echarts.init(document.querySelector('.wordCloud .chart'));
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
            shape: 'square',
            left: 'center',
            top: '15%',
            width: '90%',
            height: '90%',
            sizeRange: [20, 50],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 15,
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
            data: [
                {
                    name: 'Authentication',
                    value: 100,
                    textStyle: {
                        normal: {
                            color: 'red'
                        },
                        emphasis: {
                            color: 'gray'
                        }
                    }
                },
                {
                    name: 'Streaming',
                    value: 6181
                },
                {
                    name: 'Amy Schumer',
                    value: 4386
                },
                {
                    name: 'Jurassic World',
                    value: 4055
                },
                {
                    name: 'Charter',
                    value: 2467
                },
                {
                    name: 'Chick Fil A',
                    value: 2244
                },
                {
                    name: 'Planet Fitness',
                    value: 1898
                },
                {
                    name: 'Pitch Perfect',
                    value: 1484
                },
                {
                    name: 'Express',
                    value: 1112
                },
                {
                    name: 'Home',
                    value: 965
                },
                {
                    name: 'Johnny Depp',
                    value: 847
                },
                {
                    name: 'Lena Dunham',
                    value: 582
                },
                {
                    name: 'Lewis Hamilton',
                    value: 555
                },
                {
                    name: 'KXAN',
                    value: 550
                },
                {
                    name: 'Mary Ellen Mark',
                    value: 462
                },
                {
                    name: 'Farrah Abraham',
                    value: 366
                },
                {
                    name: 'Rita Ora',
                    value: 360
                },
                {
                    name: 'Serena Williams',
                    value: 282
                },
                {
                    name: 'NCAA ',
                    value: 273
                },
                {
                    name: 'Point Break',
                    value: 265
                },
                {
                    name: 'Pitch Perfect',
                    value: 1484
                },
                {
                    name: 'Express',
                    value: 1112
                },
                {
                    name: 'Home',
                    value: 965
                },
                {
                    name: 'Johnny Depp',
                    value: 847
                },
                {
                    name: 'Lena Dunham',
                    value: 582
                },
                {
                    name: 'Lewis Hamilton',
                    value: 555
                },
                {
                    name: 'KXAN',
                    value: 550
                },
                {
                    name: 'Mary Ellen Mark',
                    value: 462
                },
                {
                    name: 'Farrah Abraham',
                    value: 366
                },
                {
                    name: 'Rita Ora',
                    value: 360
                },
                {
                    name: 'Serena Williams',
                    value: 282
                },
                {
                    name: 'baseball tournament',
                    value: 273
                },
                {
                    name: 'Point Break',
                    value: 265
                }
            ]
        }]
    }
    myChart.setOption(option);
    resizeChart(myChart);
})();
