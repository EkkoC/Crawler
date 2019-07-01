
//npm install request cheerio ramda
//利用cheerio 
const request = require("request");
const cheerio = require("cheerio");
const ramda = require("ramda");
const fs = require("fs");
const enume = require("./enum");  //列舉幣別
var config = require('./config');//config

const dateFormat = require('moment');  //npm install moment
const dateS = dateFormat(new Date()).format('YYYYMMDD');//今日時間
const dateS7 = dateFormat(new Date()).subtract(7, 'days').format('YYYYMMDD');//今日-7時間

//console.log(dateS7);
const currentDateTime = dateFormat(new Date()).format('HH:mm:ss');//現在時間
//console.log(currentDateTime);

const earthquake_Bank_Icbc = function () {
    request({
        url: config.urlBank_Icbc, // 中國牌价
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
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


            const Current_purchase = (table_td.eq(1).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(1).text().trim()))).toFixed(3); // 現匯買入

            const Cash_sale = (table_td.eq(3).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(3).text()))).toFixed(3); // 現匯賣出

            const Middle_price = (table_td.eq(5).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(5).text()))).toFixed(3); // 平均匯率
            const time = table_td.eq(6).text().trim(); // 發布時間
            const Bankname = "中国工商银行";
            // 建立物件並(push)存入結果
            result.push(Object.assign({ Bankname, rate1, minorCur, Current_purchase, Cash_sale, Middle_price, time }));
        }
        // 在終端機(console)列出結果
        // console.log(result);
        // 寫入 result.json 檔案
        fs.writeFileSync("./currency/" + dateS + "Bank_Icbc" + ".json", JSON.stringify(result));
    });
};

const earthquake_Bank_cmbchina = function () {
    request({
        url: config.urlBank_cmbchina, // 中國牌价
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
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


            const Current_purchase = (table_td.eq(1).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(1).text().trim()))).toFixed(3); // 現匯買入

            const Cash_sale = (table_td.eq(3).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(3).text()))).toFixed(3); // 現匯賣出

            const Middle_price = (table_td.eq(5).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(5).text()))).toFixed(3); // 平均匯率
            const time = table_td.eq(6).text().trim(); // 發布時間
            const Bankname = "招商银行";
            // 建立物件並(push)存入結果
            result.push(Object.assign({ Bankname, rate1, minorCur, Current_purchase, Cash_sale, Middle_price, time }));
        }
        // 在終端機(console)列出結果
        //console.log(result);
        // 寫入 result.json 檔案
        fs.writeFileSync("./currency/" + dateS + "Bank_cmbchina" + ".json", JSON.stringify(result));
    });
};

const earthquake_Bank_abchina = function () {
    request({
        url: config.urlBank_abchina, // 中國牌价
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
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
            const Current_purchase = (table_td.eq(1).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(1).text().trim()))).toFixed(3); // 現匯買入

            const Cash_sale = (table_td.eq(3).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(3).text()))).toFixed(3); // 現匯賣出

            const Middle_price = (table_td.eq(5).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(5).text()))).toFixed(3); // 平均匯率
            const time = table_td.eq(6).text().trim(); // 發布時間
            const Bankname = "中国农业银行";
            // 建立物件並(push)存入結果
            result.push(Object.assign({ Bankname, rate1, minorCur, Current_purchase, Cash_sale, Middle_price, time }));
        }
        // 在終端機(console)列出結果
        // console.log(result);
        // 寫入 result.json 檔案
        fs.writeFileSync("./currency/" + dateS + "Bank_abchina" + ".json", JSON.stringify(result));
    });
};
const earthquake_Bank_bankcomm = function () {
    request({
        url: config.urlBank_bankcomm, // 中國牌价
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
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
            const Current_purchase = (table_td.eq(1).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(1).text().trim()))).toFixed(3); // 現匯買入

            const Cash_sale = (table_td.eq(3).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(3).text()))).toFixed(3); // 現匯賣出

            const Middle_price = (table_td.eq(5).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(5).text()))).toFixed(3); // 平均匯率
            const time = table_td.eq(6).text().trim(); // 發布時間
            const Bankname = "交通银行";
            // 建立物件並(push)存入結果
            result.push(Object.assign({ Bankname, rate1, minorCur, Current_purchase, Cash_sale, Middle_price, time }));
        }
        // 在終端機(console)列出結果
        //console.log(result);
        // 寫入 result.json 檔案
        fs.writeFileSync("./currency/" + dateS + "Bank_bankcomm" + ".json", JSON.stringify(result));
    });
};
const earthquake_Bank_ccb = function () {
    request({
        url: config.urlBank_ccb, // 中國牌价
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
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

            const Current_purchase = (table_td.eq(1).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(1).text().trim()))).toFixed(3); // 現匯買入

            const Cash_sale = (table_td.eq(3).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(3).text()))).toFixed(3); // 現匯賣出

            const Middle_price = (table_td.eq(5).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(5).text()))).toFixed(3); // 平均匯率
            const time = table_td.eq(6).text().trim(); // 發布時間
            const Bankname = "中国建设银行";
            // 建立物件並(push)存入結果
            result.push(Object.assign({ Bankname, rate1, minorCur, Current_purchase, Cash_sale, Middle_price, time }));
        }
        // 在終端機(console)列出結果
        //console.log(result);
        // 寫入 result.json 檔案
        fs.writeFileSync("./currency/" + dateS + "Bank_ccb" + ".json", JSON.stringify(result));
    });
};
const earthquake_Bank_boc = function () {
    request({
        url: config.urlBank_boc, // 中國牌价
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body); // 載入 body
        const result = []; // 建立一個儲存結果的容器
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

            const Current_purchase = (table_td.eq(1).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(1).text().trim()))).toFixed(3); // 現匯買入

            const Cash_sale = (table_td.eq(3).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(3).text()))).toFixed(3); // 現匯賣出

            const Middle_price = (table_td.eq(5).text().trim() == '---') ? '--' : (100 / (parseFloat(table_td.eq(5).text()))).toFixed(3); // 平均匯率
            const time = table_td.eq(6).text().trim(); // 發布時間

            const Bankname = "中国银行";
            // 建立物件並(push)存入結果
            result.push(Object.assign({ Bankname, rate1, minorCur, Current_purchase, Cash_sale, Middle_price, time }));
        }
        // 在終端機(console)列出結果
        // console.log(result);
        // 寫入 result.json 檔案
        fs.writeFileSync("./currency/" + dateS + "Bank_boc" + ".json", JSON.stringify(result));
    });
};
//earthquake_Bank_Icbc();//中國工商銀行
earthquake_Bank_cmbchina();//招商銀行
earthquake_Bank_abchina();//農業銀行
earthquake_Bank_bankcomm();//交通銀行
earthquake_Bank_ccb();//建設銀行
earthquake_Bank_boc();//中國銀行
// 每半小時爬一次資料
//setInterval(earthquake_Bank_Icbc, 30 * 60 * 1000);
setInterval(earthquake_Bank_cmbchina, 30 * 60 * 1000);
setInterval(earthquake_Bank_abchina, 30 * 60 * 1000);
setInterval(earthquake_Bank_bankcomm, 30 * 60 * 1000);
setInterval(earthquake_Bank_ccb, 30 * 60 * 1000);
setInterval(earthquake_Bank_boc, 30 * 60 * 1000);



const deletebank = function () {
    //判斷資料夾有沒有前第7天資料
    var checkDir1 = fs.existsSync("./currency/" + dateS7 + "Bank_Icbc" + ".json");
    var checkDir2 = fs.existsSync("./currency/" + dateS7 + "Bank_cmbchina" + ".json");
    var checkDir3 = fs.existsSync("./currency/" + dateS7 + "Bank_abchina" + ".json");
    var checkDir4 = fs.existsSync("./currency/" + dateS7 + "Bank_bankcomm" + ".json");
    var checkDir5 = fs.existsSync("./currency/" + dateS7 + "Bank_ccb" + ".json");
    var checkDir6 = fs.existsSync("./currency/" + dateS7 + "Bank_boc" + ".json");
    //console.log(checkDir);
    //if (currentDateTime == "23:59:00") {
    if (checkDir1) {
        //刪除檔案
        fs.unlink("./currency/" + dateS7 + "Bank_Icbc" + ".json", function () {
            // console.log('已經刪除檔案!');
        });
    }
    if (checkDir2) {
        //刪除檔案
        fs.unlink("./currency/" + dateS7 + "Bank_cmbchina" + ".json", function () {
            // console.log('已經刪除檔案!');
        });
    }
    if (checkDir3) {
        //刪除檔案
        fs.unlink("./currency/" + dateS7 + "Bank_abchina" + ".json", function () {
            // console.log('已經刪除檔案!');
        });
    }
    if (checkDir4) {
        //刪除檔案
        fs.unlink("./currency/" + dateS7 + "Bank_bankcomm" + ".json", function () {
            // console.log('已經刪除檔案!');
        });
    }
    if (checkDir5) {
        //刪除檔案
        fs.unlink("./currency/" + dateS7 + "Bank_ccb" + ".json", function () {
            // console.log('已經刪除檔案!');
        });
    }
    if (checkDir6) {
        //刪除檔案
        fs.unlink("./currency/" + dateS7 + "Bank_boc" + ".json", function () {
            // console.log('已經刪除檔案!');
        });
    }
}
//}
deletebank();//刪除第前7天的銀行
setInterval(deletebank, 1 * 1 * 1000);




const Calculation = function () {
    const result = [];

    for (let i = 0; i < 7; i++) {
        const date7 = dateFormat(new Date()).subtract(i, 'days').format('YYYYMMDD');//今日-7時間
        //console.log(date7)
        var checkDir1 = fs.existsSync("./currency/" + date7 + "Bank_Icbc" + ".json");
        var checkDir2 = fs.existsSync("./currency/" + date7 + "Bank_cmbchina" + ".json");
        var checkDir3 = fs.existsSync("./currency/" + date7 + "Bank_abchina" + ".json");
        var checkDir4 = fs.existsSync("./currency/" + date7 + "Bank_bankcomm" + ".json");
        var checkDir5 = fs.existsSync("./currency/" + date7 + "Bank_ccb" + ".json");
        var checkDir6 = fs.existsSync("./currency/" + date7 + "Bank_boc" + ".json");

        if (checkDir1) {
            //判斷資料夾內有幾個json 
            // sum += count;

            //讀檔案
            var file_contents = fs.readFileSync("./currency/" + date7 + "Bank_Icbc" + ".json", 'utf-8');
            result.push(JSON.parse(file_contents))
            const result1 = ramda.flatten(result)
            var Avgrate = check(result1);
            console.log('Avgrate', Avgrate);

        }
        // fs.writeFileSync("./currency/" + "Bank_Icbc" + ".json", JSON.stringify(Avgrate));
    }
}
Calculation();
setInterval(Calculation, 30 * 60 * 1000);

function check(result1) {
    /*
    情境一:每包json都有幣別的匯入匯出，3天加總起來可以除以6筆次數，得出結果
           ((匯入+匯出)+(匯入+匯出)+(匯入+匯出))/6筆
    
    情境二:當json裡面有匯入匯出，其中一個是nan，加總起來
     ((匯入+匯出)+(nan+匯出)+(匯入+匯出))/5筆
    [{
        "rate1":"usd","minorCur":"美元","Current_purchase":"Nan","Cash_sale":"0.145",
        "rate1":"usd","minorCur":"歐元","Current_purchase":"0.114","Cash_sale":"0.145",
        "rate1":"usd","minorCur":"英鎊","Current_purchase":"0.145","Cash_sale":"0.145",
    }]
    那我怎麼計算出Sum，因為  ratelobj[item.rate1] 是by幣別
    */

    var sum = 0;
    let ratelobj = {};
    result1.forEach(item => {
        if (typeof (ratelobj[item.rate1]) == "undefined") {
            ratelobj[item.rate1] = 0;
        }
        ratelobj[item.rate1] += (parseFloat(item.Current_purchase) + parseFloat(item.Cash_sale));

    });

    console.log('ratelobj', ratelobj);
    return ratelobj;
}

