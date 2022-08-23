/**
 * util.promisify 方法
 */
// 引入 util模塊
const util = require("util");
// 引入 fs模塊
const fs = require("fs");
// 返回一個新的函數
let mineReadFile = util.promisify(fs.readFile);

mineReadFile("./resource/content.txt").then(value => {
    console.log(value.toString());
});