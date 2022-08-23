// 1. 引入express
const express = require("express");

// 2. 創建應用對象
const app = express();

// 3. 創建路由
// request 是對請求報文的封裝
// response 是對響應報文的封裝
app.get("/", (request, response) => {
    //設置響應
    response.send("HELLO EXPRESS");
});

// 4. 監聽端口啟動服務
app.listen(8000, () => {
    console.log("服務已經啟動，8000 端口監聽中...");
})