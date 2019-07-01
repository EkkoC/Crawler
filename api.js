
const fs = require('fs');
const express = require('express');
const app = express();
const bank = require("./bank");//列舉
const config = require('./config');//config
/* const cors = require('cors') */
//跨網域用
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


//http://localhost:3000/api/bank
app.get('/api/Bank',(req, res, params) => {
  res.send(bank);
  //console.log(bank)
});


//http://localhost:3000/api/參數
//http://localhost:3000/api/20190624bank
app.get('/api/:dateS', (req, res, params) => {
  //console.log(req.params.dateS);
  const date = req.params.dateS;//api上的參數
  const checkDir = fs.existsSync("./currency/" + date + ".json");//判斷資料夾是否有此json
  console.log(checkDir);
  if (checkDir) {
    //讀檔案
    const obj = JSON.parse(fs.readFileSync("./currency/" + date + ".json", 'utf8'));
    res.send(obj);
  }
});

//port:3000
app.listen(config.apiPort, () => {
  console.log('Listening on port 3000...');
});
//偵測連線，並傳入一個callback function


