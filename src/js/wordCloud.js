import echarts from 'echarts'
require('echarts-wordcloud')
import axios from 'axios'
// 导入 Resize 函数（图表随着页面大小自动缩放）
const resizeChart = require('./resize')

;(function () {
  axios
    .get('http://localhost:8080/api/weiboHotSearch')
    .then((res) => {
      // 获取历史数据
      let result = null
      result = res.data
      // console.log(res.data);
      var filterArr = []
      // 过滤出合适的属性值
      result.forEach((item) => {
        filterArr.push({
          name: item.text, // 人搜内容
          //value: item.hotValue, // 热搜热度  报错 index.bundle.js?9f41246f60db733021eb:8 Uncaught TypeError: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': Value is not of type 'long'.
          //修改如下
          value: Number(item.hotValue),
        })
      })
      //   console.log(filterArr)
      // wordCloud
      const myChart = echarts.init(document.querySelector('.wordCloud .chart'))
      // const maskImage = new Image();
      // maskImage.src = require('../images/line.png')
      const option = {
        // title: {
        //   text: ' ',
        //   x: 'center',
        //   textStyle: {
        //     color: 'red',
        //     fontSize: 24,
        //   },
        // },
        // tooltip: {
        //   show: true,
        // },
        // backgroundColor: 'rgba(255,255,255,0.1)',
        series: [
          {
            type: 'wordCloud',
            shape: 'diamond',
            // maskImage: maskImage,
            left: 'center',
            top: '10%',
            width: '80%',
            height: '80%',
            sizeRange: [20, 50],
            rotationRange: [-30, 30],
            rotationStep: 10,
            gridSize: 5,
            drawOutOfBound: false,
            // Global text style
            textStyle: {
              normal: {
                fontFamily: 'sans-serif',
                fontWeight: 'bolder',
                // Color can be a callback function or a color string
                color: function () {
                  // Random color
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                    ].join(',') +
                    ')'
                  )
                },
              },
              emphasis: {
                shadowBlur: 3,
                shadowColor: '#fff',
              },
            },
            // Data is an array. Each array item must have name and value property.
            data: filterArr,
          },
        ],
      }
      // maskImage.onload = function () {
      //     myChart.setOption(option);
      // }
      myChart.setOption(option)
      resizeChart(myChart)
    })
    .catch((err) => {
      console.log(err)
    })
})()
