const fs = require('fs');
const path = require('path');
// 定时
const nodeSchedule = require('node-schedule');
// 模拟浏览器向网站发送请求
const superagent = require("superagent");
// 服务器端的 jQuery
const cheerio = require("cheerio");

function writeData () {
// 爬取丁香园疫情数据
const url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia';
function getData () {
  superagent.get(url)
    .then(res => {
      // 解析 html字符串从里面提取对应的疫情数据
      const $ = cheerio.load(res.text);
      var $getAreaStat = $('#getAreaStat').html();
      var $getListByCountryTypeService2true = $('#getListByCountryTypeService2true').html();
      // console.log($getAreaStat);

      // 使用正则表达式，unescape()函数转编码,字符串切割或 eval函数将代码运行
      var dataObj = {};  // 定义dataObj对象换掉源码的 window
      eval($getAreaStat.replace(/window/g, 'dataObj'));
      eval($getListByCountryTypeService2true.replace(/window/g, 'dataObj'));

      // 4. 用 fs模块写入数据到本地
      fs.writeFile(path.join(__dirname, '../data/data.json'), JSON.stringify(dataObj), err => {
        if (err) throw err;
        console.log('data.json写入成功');
      })
    })
    .catch(err => {
      throw err
    });
}
// 每天的凌晨1点1分15秒触发
nodeSchedule.scheduleJob('* * * * * *', function () {
  getData();
});

// 爬取万矿疫情数据  需注册账号并登陆才能爬取数据，官方Web API使用说明 :（ https://www.windquant.com/qntcloud/help/id-fdc2e335-7f50-4b63-b79c-07a2582cf15c ）
// S6274770 全国累计确诊
// S6274772 全国累计治愈
// S6274771 全国累计死亡
// S6274773 全国累计疑似
// S6274775 当日新增确诊
// S6274778 当日新增疑似
// S6274777 当日新增治愈
// S6274776 当日新增死亡

function getTime () {
  let res = null
  const myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1 > 9 ? (myDate.getMonth() + 1).toString() : '0' + (myDate.getMonth() + 1);
  var day = myDate.getDate() > 9 ? myDate.getDate().toString() : '0' + myDate.getDate();
  res = `${year}-${month}-${day - 1}`
  return res
}
const baseURL = 'https://www.windquant.com/qntcloud/data/edb?userid=43a1bf78-8e78-48b7-bdff-65e041ffe268&'
const baseAPI = 'indicators=S6274770,S6274772,S6274771,S6274773,S6274775,S6274778,S6274777,S6274776,S6274780,S6274782,S6274784&'
const baseTime = 'startdate=2020-01-20&enddate=' + getTime()
// const dataUrl = 'https://www.windquant.com/qntcloud/data/edb?userid=43a1bf78-8e78-48b7-bdff-65e041ffe268&indicators=S6274770,S6274772,S6274771,S6274773,S6274775,S6274778,S6274777,S6274776,S6274780,S6274782,S6274784&startdate=2020-01-20&enddate=2020-05-05'
const dataUrl = baseURL + baseAPI + baseTime

function getHistorydata () {
  superagent.get(dataUrl)
    .then(res => {
      fs.writeFile(path.join(__dirname, '../data/historyData.json'), res.text, err => {
        if (err) throw err;
        console.log('historyData.json写入成功');
      })
    })
    .catch(err => {
      throw err
    });
}

const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example () {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.windquant.com/cas/login?service=https%3A%2F%2Fwww.windquant.com%2Fqntcloud%2Flogin%2Fcas.go');
    await driver.findElement(By.id('username')).sendKeys('dktianf@163.com', Key.TAB);
    await driver.findElement(By.id('password')).sendKeys('mengduonao123', Key.RETURN);
    await driver.wait(until.titleIs('万矿-高端量化分析云平台-Wind'), 1000);
  } finally {
    // 每天的凌晨1点1分30秒触发
    nodeSchedule.scheduleJob('* * * * * *', function () {
      getHistorydata();
    });
  }
})();


// 爬取微博热搜
const weiboURL = 'https://s.weibo.com';
const hotSearchURL = weiboURL + '/top/summary?cate=realtimehot';
function getHotSearchList () {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL, (err, res) => {
      if (err) reject('request error');
      const $ = cheerio.load(res.text);
      let hotList = [];
      $('#pl_top_realtimehot table tbody tr').each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1);
          const link = weiboURL + $td.find('a').attr('href');
          const text = $td.find('a').text();
          const hotValue = $td.find("span").text();
          const icon = $td.find('img').attr('src') ? 'https:' + $td.find('img').attr('src') : '';
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon,
          });
        }
      });
      hotList.length ? resolve(hotList) : reject('error');
    });
  });
}

// 每小时的1分30秒触发
nodeSchedule.scheduleJob('* * * * * *', async function () {
  try {
    const hotList = await getHotSearchList();
    await fs.writeFileSync(
      path.join(__dirname, '../data/weiboHotSearch.json'),
      JSON.stringify(hotList),
      'utf8'
    );
    console.log('weiboHotSearch.json 写入成功');
  } catch (error) {
    console.error(error);
  }
});
}

writeData();
