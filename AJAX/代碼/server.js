// 1. 引入express
const express = require("express");
const cors = require("cors");


// 2. 創建應用對象
const app = express();

app.use(cors());

// 3. 創建路由規則
// request 是對請求報文的封裝
// response 是對響應報文的封裝
app.get("/server", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    //設置響應體
    response.send("HELLO AJAX - 2");
});

// app.all 代表可以接收任意類型的請求
app.all("/server", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 響應頭
    response.setHeader("Access-Control-Allow-Headers", "*"); // "*" 代表所有的頭信息都可以接受
    //設置響應體
    response.send("HELLO AJAX POST");
});

app.all("/json-server", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 響應頭
    response.setHeader("Access-Control-Allow-Headers", "*"); // "*" 代表所有的頭信息都可以接受
    // 響應一個數據
    const data = {
        name: "atguigu"
    };
    // 對對象進行字符串轉換
    let str = JSON.stringify(data);
    //設置響應體
    response.send(str); // send()方法裡面只能接收字符串類型，所以我們要對對象進行字符串轉換才能傳遞給send()方法
});

//針對 IE 緩存
app.get("/ie", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    //設置響應體
    response.send("HELLO IE - 4");
});

// 延時響應
app.all("/delay", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 響應頭
    response.setHeader("Access-Control-Allow-Headers", "*"); // "*" 代表所有的頭信息都可以接受
    setTimeout(() => {
        //設置響應體
        response.send("延時響應");
        
    }, 3000)
});

// jQuery服務
app.all("/jquery-server", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*"); // "*" 代表所有的頭信息都可以接受
    
    // response.send("Hello jQuery AJAX");
     const data = { name: "尚硅谷" };
    // response.send("Hello jQuery AJAX");
    response.send(JSON.stringify(data));
});

// axios 服務
app.all("/axios-server", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*"); // "*" 代表所有的頭信息都可以接受
    
    // response.send("Hello jQuery AJAX");
     const data = { name: "尚硅谷" };
    // response.send("Hello jQuery AJAX");
    response.send(JSON.stringify(data));
});

// fetch 服務
app.all("/fetch-server", (request, response) => {
    // 當客戶端瀏覽器向服務器發送請求時，如果 url 的路徑，是請求行的第二段內容的路徑是 /sever 就會執行該回調函數裡的代碼，並由 response 作出響應

    // 設置響應頭 - 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*"); // "*" 代表所有的頭信息都可以接受
    
    // response.send("Hello jQuery AJAX");
     const data = { name: "尚硅谷" };
    // response.send("Hello jQuery AJAX");
    response.send(JSON.stringify(data));
});

// jsonp 服務
app.all("/jsonp-server", (request, response) => {
    // response.send('console.log("hello jsonp")') // <script src> 請求服務器，要的是一個函數調用的內容，也就是要一段js代碼（例如：'console.log("hello jsonp")'），才可以讓瀏覽器引擎解析並執行裡面的內容
    const data = {
    name: "尚硅谷atguigu"
    };
    //將數據轉化為字符串
    let str = JSON.stringify(data);
    //返回結果
    response.end(`handle(${str})`) // end 不會加特殊響應頭
});// 以上的 jsonp服務是在服務端 響應js代碼

//用戶名檢測是否存在
app.all("/check-username", (request, response) => {
    // response.send('console.log("hello jsonp")') // <script src> 請求服務器，要的是一個函數調用的內容，也就是要一段js代碼（例如：'console.log("hello jsonp")'），才可以讓瀏覽器引擎解析並執行裡面的內容
    const data = {
        exist: 1,
        msg: "用戶名已經存在"
    };
    //將數據轉化為字符串
    let str = JSON.stringify(data);
    //返回結果
    response.end(`handle(${str})`) // end 不會加特殊響應頭
});// 以上的 jsonp服務是在服務端 響應js代碼

//用戶名檢測是否存在
app.all("/jquery-jsonp-server", (request, response) => {
    // response.send('console.log("hello jsonp")') // <script src> 請求服務器，要的是一個函數調用的內容，也就是要一段js代碼（例如：'console.log("hello jsonp")'），才可以讓瀏覽器引擎解析並執行裡面的內容
    const data = {
        name: "尚硅谷",
        city: ["北京", "上海", "深圳"]
    };
    //將數據轉化為字符串
    let str = JSON.stringify(data);
    // 接收 callback參數
    let cb = request.query.callback; // 把請求當中的 url參數當中的 callback參數的值取到 （例如：該參數就是callback的值 jQuery36003279986408891469_1657823304862
    //返回結果
    response.end(`${cb}(${str})`) // end 不會加特殊響應頭
});// 以上的 jsonp服務是在服務端 響應js代碼

app.all("/cors-server", (request, response) => {
    //設置響應頭
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Allow-Method", "*");
    // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    response.send("hello CORS");
})

// 4. 監聽端口啟動服務
app.listen(8000, () => {
    console.log("服務已經啟動，8000 端口監聽中..."); 
})