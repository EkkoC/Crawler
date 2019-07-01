
const request = require("request");//npm install request cheerio
const cheerio = require("cheerio");//npm install request cheerio
const ramda = require("ramda");//npm install ramda
const fs = require('fs');
const express = require('express');
const app = express();
const bank = require("./bank");//列舉
const enume = require("./enum");  //列舉幣別
const config = require('./config');//config

const dateFormat = require('moment');  //npm install moment
const dateS = dateFormat(new Date()).format('YYYY');//今日時間
console.log(dateS);
//跨網域用
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//http://localhost:3000/api/bank
/* app.get('/api/Bank',(req, res, params) => {
  res.send(bank);
  //console.log(bank)
}); */


//http://localhost:3000/api/參數
//http://localhost:3000/api/20190624bank
/* app.get('/api/:dateS', (req, res, params) => {
  //console.log(req.params.dateS);
  const date = req.params.dateS;//api上的參數
  const checkDir = fs.existsSync("./currency/" + date + ".json");//判斷資料夾是否有此json
  console.log(checkDir);
  if (checkDir) {
    //讀檔案
    const obj = JSON.parse(fs.readFileSync("./currency/" + date + ".json", 'utf8'));
    res.send(obj);
  }
}); */


//中國幣別各大銀行匯率
app.get('/api/Currency/:minorCur', (req, res, params) => {
    //console.log(req.params.dateS);
    const datevalue = req.params.minorCur;//api上的參數
    console.log(datevalue);

    //console.log(ar[0]);   銀行名字
    //console.log(ar[1]);   幣別
    request({
        url: config.urlCurrency + datevalue, // 中國牌价(新台幣)
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }



        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器

        const result_bank = []; // 建立一個儲存結果的容器
        const keys = Object.keys(bank);
        keys.forEach(function (item, index, array) {
            result_bank.push(bank[item].cn);

        });

        var Avgrate = check1(datevalue);
        console.log('123', Avgrate);
        const Avgkey = Object.keys(Avgrate);


        Avgkey.forEach(x => {

            //console.log(' Avgrate[x]', Avgrate[x]);
            const Mid = Avgrate[x]


            if (result_bank.includes(x) == true) {
                result.push(Object.assign({ Mid }));
            }

        })




        const div = "#bank_huilvtable_" + datevalue + " tr";
        const table_tr = $(div); // 爬最外層的 Table(class=BoxTable) 中的 tr

        for (let i = 1; i < table_tr.length; i++) { // 走訪 tr



            const table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)
            const Bankname = table_td.eq(0).text().trim();// 銀行名字

            const minorCur = table_td.eq(1).text();// 幣種
            const Current_purchase = (table_td.eq(2).text().trim() == '--') ? '--' : (1 / (parseFloat(table_td.eq(2).text()))).toFixed(5);//現匯買入
            const Cash_sale = (table_td.eq(4).text().trim() == '--') ? '--' : (1 / (parseFloat(table_td.eq(4).text()))).toFixed(5);// 現匯賣出
            const Middle_price = (table_td.eq(6).text().trim() == '--') ? '--' : (1 / (parseFloat(table_td.eq(6).text()))).toFixed(5);  //  平均匯率

            const date = table_td.eq(7).text().trim().replace(/月/, '-').replace(/日/, '');

            const dateString = dateS + '-' + date;



            //console.log(dateString);

            // 建立物件並(push)存入結果
            if (result_bank.includes(Bankname) == true) {
                result.push(Object.assign({ Bankname, minorCur, Current_purchase, Cash_sale, Middle_price, dateString }));
            }

        }
        // 在終端機(console)列出結果
        console.log(result);
        res.send(result);
    });
});

//port:3000
app.listen(config.apiPort, () => {
    console.log('Listening on port 3000...');
});
//偵測連線，並傳入一個callback function







function check1(datevalue) {
    const result2 = []; // 建立一個歷史儲存結果的容器
    console.log('Avgrate', 'Avgrate');
    for (let j = 0; j < 7; j++) {
        const date7 = dateFormat(new Date()).subtract(j, 'days').format('YYYYMMDD');//今日-7時間
        var checkDir1 = fs.existsSync("./value/" + date7 + datevalue + ".json");
        if (checkDir1) {
            var file_contents = fs.readFileSync("./value/" + date7 + datevalue + ".json", 'utf-8');
            result2.push(JSON.parse(file_contents))
            const result1 = ramda.flatten(result2)
            var Avgrate1 = check2(result1);

            console.log('Avgrate1', Avgrate1);
        }
    }

    return Avgrate1;
}



function check2(result1) {

    var sum = 0;
    var count = 1;
    let ratelobj = {};
    result1.forEach(item => {
        if (typeof (ratelobj[item.Bankname]) == "undefined") {
            ratelobj[item.Bankname] = 0;
        }

        ratelobj[item.Bankname] += (parseFloat(item.Middle_price)) / 2;

    });

    // console.log('ratelobj', ratelobj);


    return ratelobj;
}



