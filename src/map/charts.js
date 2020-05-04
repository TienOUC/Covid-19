// 图一
(function () {
    const myChart = echarts.init(document.querySelector('.bar .chart'))
    const option = {
        title: {
            text: '',
            textStyle: {
                color: '#FFF'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        //     textStyle: {
        //         color: '#FFF'
        //     }
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            },
            // iconStyle: {
            //     color:'#fff'
            // }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
                color: '#fff'
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
                color: '#fff'
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
                name: '邮件营销',
                type: 'line',
                smooth: true,
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                smooth: true,
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                smooth: true,
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                smooth: true,
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                smooth: true,
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    })

})();


// 图二
(function () {
    const myChart = echarts.init(document.querySelector('.line .chart'))
    const option = {
        title: {
            text: '',
            textStyle: {
                color: '#FFF'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        // legend: {
        //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        // },
        toolbox: {
            feature: {
                saveAsImage: {}
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
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLabel: {
                    color: '#fff'
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
                        color: 'rgba(255,255,255,.2)'
                    }
                }
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                smooth: true,
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                smooth: true,
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                smooth: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(69, 31, 42,.6)"   // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(69, 31, 42,.3)"   // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.2)"
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                smooth: true,
                areaStyle: {     // 渐变色
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(48, 0, 47,.6)"   // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(48, 0, 47,.3)"   // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.2)"
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                smooth: true,
                // label: {
                //     normal: {
                //         show: true,
                //         position: 'top'
                //     }
                // },
                areaStyle: {
                    // 渐变色
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    })
})();

// 图三
(function () {
    const myChart = echarts.init(document.querySelector('.bar2 .chart'))
    const option = {
        color: ['#3398DB'],
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: '#fff'
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
                name: '直接访问',
                type: 'bar',
                barWidth: '40%',
                itemStyle: {
                    barBorderRadius: 5
                },
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    })
})()
