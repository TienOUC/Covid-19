import echarts from 'echarts'
import axios from 'axios'
// 导入 Resize 函数（图表随着页面大小自动缩放）
const resizeChart = require('./resize');

(function () {

    axios.get('http://localhost:3000/historyData').then((res) => {
        // 获取历史数据
        const result = res.data.data;
        // console.log('result=' + result);
        // 获取历史日期
        const time = res.data.times;
        // console.log('time=' + time);
        // 转换日期格式
        time.forEach((item, index, arr) => {
            // 重写toLocaleString
            Date.prototype.toLocaleString = function () {
                return (this.getMonth() + 1) + "." + this.getDate()
            };
            let unixTimestamp = new Date(item * 1);
            arr[index] = unixTimestamp.toLocaleString();
        })
        // 处理数据中的NaN
        for (let i = 0; i < result.length; i++) {
            result[i].forEach((item, index, arr) => {
                if (arr[index] == 'NaN') arr[index] = 0
            });
        }

        // 左图一
        const myChart = echarts.init(document.querySelector('.line_1 .chart'))
        const option = {
            title: {
                text: '',
                textStyle: {
                    color: '#FFF'
                }
            },
            color: ['#eb3d77', '#6cd3d6', '#acb9c9', '#f0923c'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {
            //             backgroundColor: '#262626',
            //             pixelRatio: '4'
            //         }
            //     }
            // },
            legend: {
                textStyle: {
                    color: '#fff'
                },
                left: '10',
                top: '20'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: time,
                axisLabel: {
                    color: '#fff',
                    margin: 10,
                    rotate: 30
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#fff',
                    formatter: function (value) {
                        return value = value / 1000 + 'k'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                }
            },

            series: [
                {
                    name: '累计确诊',
                    type: 'line',
                    smooth: true,
                    data: result[0],
                    smooth: true,
                    lineStyle: {
                        width: 3,
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(235, 61, 119.3)"   // 渐变色的起始颜色
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(235, 61, 119,.1)"   // 渐变线的结束颜色
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.2)"
                    }
                },
                {
                    name: '累计治愈',
                    type: 'line',
                    smooth: true,
                    data: result[1],
                    smooth: true,
                    lineStyle: {
                        width: 3,
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(108, 211, 214,.3)"   // 渐变色的起始颜色
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(108, 211, 214,.1)"   // 渐变线的结束颜色
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.2)"
                    }
                },
                {
                    name: '累计死亡',
                    type: 'line',
                    smooth: true,
                    data: result[2],
                    smooth: true,
                    lineStyle: {
                        width: 3,
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(172, 185, 201,.3)"   // 渐变色的起始颜色
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(172, 185, 201,.1)"   // 渐变线的结束颜色
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.2)"
                    }
                },
                {
                    name: '累计疑似',
                    type: 'line',
                    smooth: true,
                    data: result[3],
                    smooth: true,
                    lineStyle: {
                        width: 3,
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(240, 146, 60,.3)"   // 渐变色的起始颜色
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(240, 146, 60,.1)"   // 渐变线的结束颜色
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.2)"
                    }
                }
            ]
        };
        myChart.setOption(option);
        resizeChart(myChart);


        // 左图二
        const myChart_2 = echarts.init(document.querySelector('.line_2 .chart'))
        const option_2 = {
            title: {
                text: '',
                textStyle: {
                    color: '#FFF'
                }
            },
            color: ['#eb3d77', '#f0923c', '#6cd3d6', '#acb9c9'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {
            //             backgroundColor: '#262626',
            //             pixelRatio: '4'
            //         }
            //     }
            // },
            legend: {
                textStyle: {
                    color: '#fff'
                },
                left: '10',
                top: '20'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: time,
                    axisLabel: {
                        color: '#fff',
                        margin: 10,
                        // rotate: 30
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        color: '#fff',
                        formatter: function (value) {
                            return value = value / 1000 + 'k'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.2)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '新增确诊',
                    type: 'line',
                    smooth: true,
                    // areaStyle: {},
                    data: result[4]
                },
                {
                    name: '新增疑似',
                    type: 'line',
                    smooth: true,
                    // areaStyle: {},
                    data: result[5]
                },
                {
                    name: '新增治愈',
                    type: 'line',
                    smooth: true,
                    // areaStyle: {
                    //     color: new echarts.graphic.LinearGradient(
                    //         0,
                    //         0,
                    //         0,
                    //         1,
                    //         [
                    //             {
                    //                 offset: 0,
                    //                 color: "rgba(69, 31, 42,.6)"   // 渐变色的起始颜色
                    //             },
                    //             {
                    //                 offset: 0.8,
                    //                 color: "rgba(69, 31, 42,.3)"   // 渐变线的结束颜色
                    //             }
                    //         ],
                    //         false
                    //     ),
                    //     shadowColor: "rgba(0, 0, 0, 0.2)"
                    // },
                    data: result[6]
                },
                {
                    name: '新增死亡',
                    type: 'line',
                    smooth: true,
                    // areaStyle: {     // 渐变色
                    //     color: new echarts.graphic.LinearGradient(
                    //         0,
                    //         0,
                    //         0,
                    //         1,
                    //         [
                    //             {
                    //                 offset: 0,
                    //                 color: "rgba(48, 0, 47,.6)"   // 渐变色的起始颜色
                    //             },
                    //             {
                    //                 offset: 0.8,
                    //                 color: "rgba(48, 0, 47,.3)"   // 渐变线的结束颜色
                    //             }
                    //         ],
                    //         false
                    //     ),
                    //     shadowColor: "rgba(0, 0, 0, 0.2)"
                    // },
                    data: result[7]
                }
            ]
        };
        myChart_2.setOption(option_2);
        resizeChart(myChart_2);


        // 右图一
        const myChart_3 = echarts.init(document.querySelector('.bar .chart'))
        const option_3 = {
            color: ['#3355DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['香港', '澳门', '台湾'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        color: '#fff',
                        margin: 10,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(255,255,255,.3)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '累计确诊',
                    type: 'bar',
                    // showBackground: true,
                    // backgroundStyle: {
                    //     color: 'rgba(180, 180, 180, 0.1)'
                    // },
                    barWidth: '30%',
                    itemStyle: {
                        barBorderRadius: 5
                    },
                    data: [result[8][result[8].length - 1], result[9][result[9].length - 1], result[10][result[10].length - 1]]
                }
            ]
        };
        myChart_3.setOption(option_3);
        resizeChart(myChart_3);

    })
})();


// // 左图二
// (function () {
//     const myChart = echarts.init(document.querySelector('.line_2 .chart'))
//     const option = {
//         title: {
//             text: '',
//             textStyle: {
//                 color: '#FFF'
//             }
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'cross',
//                 label: {
//                     backgroundColor: '#6a7985'
//                 }
//             }
//         },
//         toolbox: {
//             feature: {
//                 saveAsImage: {}
//             }
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis: [
//             {
//                 type: 'category',
//                 boundaryGap: false,
//                 data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//                 axisLabel: {
//                     color: '#fff'
//                 },
//                 axisLine: {
//                     show: true,
//                     lineStyle: {
//                         color: '#fff'
//                     }
//                 }
//             }
//         ],
//         yAxis: [
//             {
//                 type: 'value',
//                 axisLabel: {
//                     color: '#fff'
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         color: '#fff'
//                     }
//                 },
//                 splitLine: {
//                     lineStyle: {
//                         color: 'rgba(255,255,255,.2)'
//                     }
//                 }
//             }
//         ],
//         series: [
//             {
//                 name: '邮件营销',
//                 type: 'line',
//                 smooth: true,
//                 areaStyle: {},
//                 data: [120, 132, 101, 134, 90, 230, 210]
//             },
//             {
//                 name: '联盟广告',
//                 type: 'line',
//                 smooth: true,
//                 areaStyle: {},
//                 data: [220, 182, 191, 234, 290, 330, 310]
//             },
//             {
//                 name: '视频广告',
//                 type: 'line',
//                 smooth: true,
//                 areaStyle: {
//                     color: new echarts.graphic.LinearGradient(
//                         0,
//                         0,
//                         0,
//                         1,
//                         [
//                             {
//                                 offset: 0,
//                                 color: "rgba(69, 31, 42,.6)"   // 渐变色的起始颜色
//                             },
//                             {
//                                 offset: 0.8,
//                                 color: "rgba(69, 31, 42,.3)"   // 渐变线的结束颜色
//                             }
//                         ],
//                         false
//                     ),
//                     shadowColor: "rgba(0, 0, 0, 0.2)"
//                 },
//                 data: [150, 232, 201, 154, 190, 330, 410]
//             },
//             {
//                 name: '直接访问',
//                 type: 'line',
//                 smooth: true,
//                 areaStyle: {     // 渐变色
//                     color: new echarts.graphic.LinearGradient(
//                         0,
//                         0,
//                         0,
//                         1,
//                         [
//                             {
//                                 offset: 0,
//                                 color: "rgba(48, 0, 47,.6)"   // 渐变色的起始颜色
//                             },
//                             {
//                                 offset: 0.8,
//                                 color: "rgba(48, 0, 47,.3)"   // 渐变线的结束颜色
//                             }
//                         ],
//                         false
//                     ),
//                     shadowColor: "rgba(0, 0, 0, 0.2)"
//                 },
//                 data: [320, 332, 301, 334, 390, 330, 320]
//             },
//             {
//                 name: '搜索引擎',
//                 type: 'line',
//                 smooth: true,
//                 // label: {
//                 //     normal: {
//                 //         show: true,
//                 //         position: 'top'
//                 //     }
//                 // },
//                 areaStyle: {
//                     // 渐变色
//                     color: new echarts.graphic.LinearGradient(
//                         0,
//                         0,
//                         0,
//                         1,
//                         [
//                             {
//                                 offset: 0,
//                                 color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
//                             },
//                             {
//                                 offset: 0.8,
//                                 color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
//                             }
//                         ],
//                         false
//                     ),
//                     shadowColor: "rgba(0, 0, 0, 0.1)"
//                 },
//                 data: [820, 932, 901, 934, 1290, 1330, 1320]
//             }
//         ]
//     };
//     myChart.setOption(option);
//     resizeChart(myChart);
// })();

// // 右图一
// (function () {
//     const myChart = echarts.init(document.querySelector('.bar .chart'))
//     const option = {
//         color: ['#3398DB'],
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis: [
//             {
//                 type: 'category',
//                 data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//                 axisTick: {
//                     alignWithLabel: true
//                 },
//                 axisLabel: {
//                     color: '#fff'
//                 },
//                 axisLine: {
//                     show: true,
//                     lineStyle: {
//                         color: '#fff'
//                     }
//                 }
//             }
//         ],
//         yAxis: [
//             {
//                 type: 'value',
//                 axisLabel: {
//                     color: '#fff'
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         color: '#fff'
//                     }
//                 },
//                 splitLine: {
//                     lineStyle: {
//                         type: 'dashed',
//                         color: 'rgba(255,255,255,.3)'
//                     }
//                 }
//             }
//         ],
//         series: [
//             {
//                 name: '直接访问',
//                 type: 'bar',
//                 barWidth: '40%',
//                 itemStyle: {
//                     barBorderRadius: 5
//                 },
//                 data: [10, 52, 200, 334, 390, 330, 220]
//             }
//         ]
//     };
//     myChart.setOption(option);
//     resizeChart(myChart);
// })();
