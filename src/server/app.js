const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser'); 

// 解析request
app.use(bodyParser.urlencoded({ extended: false }));
// 处理跨域
app.use(require('cors')());

app.get('/api', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../data/data.json'), 'utf8', (err, data) => {
    if (err) res.send('data.json读取失败')
    res.send(data);
    next();
  });
});


app.get('/api/historyData', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../data/historyData.json'), 'utf8', (err, data) => {
    if (err) res.send('historyData.json读取失败')
    res.send(data);
    next();
  });
});

app.get('/api/weiboHotSearch', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../data/weiboHotSearch.json'), 'utf8', (err, data) => {
    if (err) res.send('weiboHotSearch.json读取失败')
    res.send(data);
    next();
  });
});

app.listen(8080, () => console.log('http://localhost:8080'));
