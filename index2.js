
//npm install request cheerio
//利用cheerio 
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const enume = require("./enum");  //列舉幣別
var config = require('./config');//config

const dateFormat = require('moment');  //npm install moment
const dateS = dateFormat(new Date()).format('YYYYMMDD');//今日時間
const dateS7 = dateFormat(new Date()).subtract(7, 'days').format('YYYYMMDD');//今日-7時間

console.log(dateS7);
const currentDateTime = dateFormat(new Date()).format('HH:mm:ss');//現在時間
console.log(currentDateTime);

const earthquake_Bank_Icbc = function () {
    request({
        url: config.urlBank_Icbc, // 中國牌价(新台幣)
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
        //const table_tr = $("#bank_huilvtable_twd tr"); // 爬最外層的 Table(class=BoxTable) 中的 tr
        const table_tr = $(".market_tab_gold_add tr"); // 爬最外層的 Table(class=BoxTable) 中的 tr

 
        for (let i = 1; i < table_tr.length; i++) { // 走訪 tr
            const table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)
            const minorCur = table_td.eq(0).text();// 中文幣別
            var rate1 = "";// 英文幣別

            const keys = Object.keys(enume);
            keys.forEach(element => {
                if (element === minorCur) {
                    rate1 = enume[element].toLowerCase();
                  
                }
            });


            const Current_purchase = (table_td.eq(1).text().trim()== '---')?'--':(100 / (parseFloat(table_td.eq(1).text().trim()))).toFixed(3); // 現匯買入
 
            const Cash_sale = (table_td.eq(3).text().trim()== '---')?'--':(100 / (parseFloat(table_td.eq(3).text()))).toFixed(3); // 現匯賣出
      
            const Middle_price = (table_td.eq(5).text().trim()== '---')?'--':(100 / (parseFloat(table_td.eq(5).text()))).toFixed(3); // 平均匯率
            const time = table_td.eq(6).text().trim(); // 發布時間
            const Bankname = "Bank_Icbc";
            // 建立物件並(push)存入結果
            result.push(Object.assign({ Bankname, rate1, minorCur, Current_purchase, Cash_sale, Middle_price, time }));
        }
        // 在終端機(console)列出結果
        console.log(result);
        // 寫入 result.json 檔案
        //fs.writeFileSync("./currency/" + dateS + "Bank_Icbc" + ".json", JSON.stringify(result));
    });
};




earthquake_Bank_Icbc();//中國工商銀行

// 每半小時爬一次資料
setInterval(earthquake_Bank_Icbc, 30 * 60 * 1000);


