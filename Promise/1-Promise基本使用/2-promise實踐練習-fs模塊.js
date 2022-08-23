//
const fs = require("fs");
const { resolve } = require("path");

// 回調函數 形式
// fs.readFile("./resource/content.txt", (err, data) => { // data 為讀取的結果
//     // 如果出錯，則拋出錯誤
//     if (err) throw err;
//     // data 輸出文件內容
//     console.log(data.toString());
// })

// Promise 形式
let p = new Promise((resolve, reject) => {
    fs.readFile("./resource/content.txt", (err, data) => {
        //如果出錯
        if (err) reject(err);
        //如果成功
        resolve(data);
    })
})

//調用 then方法
p.then(value => {
    console.log(value.toString())
}, reason => {
    console.log(reason);
})

