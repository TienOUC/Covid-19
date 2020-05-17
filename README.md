## Echarts 学习实践，赶在国内疫情末尾写了个疫情展示页面
::link [ 展示页面连接 ](http://139.129.222.60/covid/)

![](https://tva1.sinaimg.cn/large/007S8ZIlly1geqw7nzb2yj30xc0hfju5.jpg)

![](https://tva1.sinaimg.cn/large/007S8ZIlly1geqw7npy4ij30xc0hcq60.jpg)

## 1. 使用

> a. 安装依赖包  
> b. `server` 目录下先`node crawler.js`抓取数据，然后 `node app.js` 启动即可（首次启动需修改 `crawler.js` 中的抓取时间，不然要等好久才会有数据哒！）

## 2. 注意事项

### 1. flexible.js

修改了 `flexible.js` 默认的宽度分割

```js
 function setRemUnit () {
+    var rem = docEl.clientWidth / 32;
     docEl.style.fontSize = rem + "px";
  }
```

所以引入的是本地的 `flexible.js`，你可以根据自身需求来选择。  
**`flexible.js` 安装**

`npm i -S flexible.js` 安装 `npm` 包，然后用以下两种方式引入

```js
import flexible from 'flexible.js' // 1.引入页面适应模块 flexible
flexible()
```

或者

```js
require('flexible.js')() // 2.或者require引入
```

### 2. CleanWebpackPlugin 插件

我使用的 `webpack` 是 `4.43.0` 版本，在引入 `CleanWebpackPlugin` 插件时发现老版本的引入写法已经弃用了，新版本的引入方法是

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 这里必须这样引入，不然会报错，原写法改了
...

配置：
new CleanWebpackPlugin(),
```

### 3. 数据源及定时抓取

#### 3.1 丁香园

`https://ncov.dxy.cn/ncovh5/view/pneumonia`

#### 3.2 万矿

需注册万矿账号
[官方 Web API 使用说明](https://www.windquant.com/qntcloud/help/id-fdc2e335-7f50-4b63-b79c-07a2582cf15c)

#### 3.3 微博热搜词

`https://s.weibo.com/top/summary?cate=realtimehot`

> 以上数据均用 NodeJS nodeSchedule 定时抓取，数据的延迟取决于你的抓取时间设置，我们是练习使用，不要过度调用接口，让疫情数据及时更新到更有价值的地方去。

### 4.Node nodeSchedule 的用法

```js
const schedule = require('node-schedule')

const scheduleCronstyle = () => {
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('30 * * * * *', () => {
    console.log('scheduleCronstyle:' + new Date())
  })
}
scheduleCronstyle()
```

`*` 代表通配符

```js
*  *  *  *  *  *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │  |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

6 个占位符从左到右分别代表：秒、分、时、日、月、周几

`*` 表示通配符，匹配任意，当秒是 `*` 时，表示任意秒数都触发，其它类推

示例：

```js
每分钟的第30秒触发： '30 * * * * *'

每小时的1分30秒触发 ：'30 1 * * * *'

每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

每周1的1点1分30秒触发 ：'30 1 1 * * 1'
```

每个参数还可以传入数值范围:

```js
const task1 = () => {
  //每分钟的1-10秒都会触发，其它通配符依次类推
  schedule.scheduleJob('1-10 * * * * *', () => {
    console.log('scheduleCronstyle:' + new Date())
  })
}

task1()
```

## 3. 最后

代码写的很乱，后续有空了会抽离优化，或者考虑重构，多端适配也需要优化，目前就先这样吧。

<hr>

#### 努力让自己在前端的路上走的更远一点 :tada: :tada: :tada: :100: ， 最后，求个 :star: ， 我这前端小白的仓库太白啦~
