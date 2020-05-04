// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('../webpack.config');
// const complier = webpack(config);

// const webpack = require('webpack');
// const config = require('../webpack.config');

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


// 处理跨域
app.use(require('cors')());

app.get('/', (req, res, next) => {
  fs.readFile(path.join(__dirname, './data.json'), 'utf8', (err, data) => {
    //  console.log(data); 
    res.send(data);
    next();
  });
});


app.listen(3000, () => console.log('http://localhost:3000'));
