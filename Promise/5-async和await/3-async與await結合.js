/**
 * resource 1.html 2.html 3.html 文件內容
 */

const fs = require("fs");
const util = require("util");
// 在 util中有一個方法可以將一些 API 轉換成一個 Promise型態的函數
const mineReadFile = util.promisify(fs.readFile);

//使用回調函數的方式實現
fs.readFile("./resource/1.html", (err, data1) => {
    if (err) throw err;
    fs.readFile("./resource/2.html", (err, data2) => {
        if (err) throw err;
        fs.readFile("./resource/3.html", (err, data3) => {
            if (err) throw err;
            console.log(data1 + data2 + data3);
});
});
});

//async 與 await 實現
async function main() {
    try {
        //讀取第一個文件的內容
        let data1 = await mineReadFile("./resource/1.html");
        let data2 = await mineReadFile("./resource/1.html");
        let data3 = await mineReadFile("./resource/1.html");

        console.log(data1 + data2 + data3);
    } catch (e) {
        console.log(e);
    }
}

main();

/**
 * 在 async 和 await 的使用過程中，
 * 我們是看不到回調函數的，而在 Promise裡的then方法或catch方法，則可以看到有回調函數
 * 但是在 async 和 await 這塊是看不到回調函數的
 * 
 * async 和 await 是異步的
 */