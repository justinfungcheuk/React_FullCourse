# AJAX 面試題

## AJAX 是什麼？

- AJAX 即（Asynchronous Javascript And XML） 一種異步請求數據的 web 開發技術。
- 無需重新更新當前頁面的情況下，AJAX 通過異步請求服務器數據，並在網頁上顯示瀏覽的內容。
- 例如：東網透過滑鼠向下拉瀏覽新聞！

## AJAX 的作用？

- 提升用戶體驗，減輕網絡數據的傳送量。

## AJAX 的原理？

- AJAX 相當於用戶和服務器之間加了一個中間層，使用戶操作與服務器響應異步化。
- AJAX 原理是通過 XMLHttpRequest 對象 來向服務器發送異步請求，從服務器獲得請求數據，再用 Javascript 來操作 DOM 而更新頁面。
  \*\* 最關鍵是從服務器獲得請求數據 - 該過程必須對 XMLHttpRequest 有所了解。
  \*\* 即是 JavaScript 可以及時向服務器提出請求和處理響應，達到無需更新頁面的效果。
- 瀏覽器令 xhr 去向服務器請求數據，服務器返回數據給 xhr，xhr 通知瀏覽器數據獲取了，瀏覽器收到 xhr 返回的數據來顯示到頁面。

## AJAX 的使用？

1. 創建 AJAX 核心對象 XMLHttpRequest
   \*\* let xhr = null;

2. 向服務器發送請求：
   ** xhr.open(method, url, async);
   ** send(string); // 重點！！！ POST 請求 時才使用字符串參數，否則不用帶參數。
   ** method: 請求類型；GET 或 POST
   ** url：文件在服務器上的位置
   \*\* async：true（異步） 或 false（同步）

- 注意！POST 請求 一定要設置請求頭的格式內容
  ** xhr.open("POST", "test.html", true);
  ** xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
  \*\* xhr.send("fname=Henry&lname=Ford"); //`POST`請求參數放在 send 里面，即請求體

- 用一個 Promise 對象 實現 AJAX 操作

3. 服務器響應處理（區分同步跟異步兩種情況）

- responseText 獲得 字符串形式 的響應數據。
- responseXML 獲得 XML 形式 的響應數據。

* 異步處理（推薦）：要在请求状态改变事件中处理。
  xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200){  
   document.`GET`ElementById("myDiv").innerHTML = xhr.responseText;  
   }
  }

* 什麼是 readyState？
  ** readyState 是 XMLHttpRequest 對象 的一個屬性，用來標識當前 XMLHttpRequest 對象 處於什麼狀態。
  ** readyState 總共有 5 個狀態值，分別為 0 - 4，每個值代表不同的含義：
  ** 0: 未初始化 - 尚未調用 .open()方法；
  ** 1: 啟動 - 已經調用.open()方法，但未調用.send()方法；
  ** 2: 發送 - 已經調用.send()方法，但未接收到響應；
  ** 3: 接收 - 已經接收到部分響應數據；
  \*\* 4: 完成 - 已經接收到全部響應數據，而且已經可以在客戶端使用！

* 什麼是 status？
  ** HTTP 狀態碼（status）由三個十進制數字組成，
  ** 第一個十進制數字定義了狀態碼類型，後面兩個數字沒有分類的作用。
  ** HTTP 狀態碼 共分為 5 種類型：
  ** 1xx(臨時響應)：表示臨時響應並需要請求者繼續執行操作的狀態碼。
  ** 2xx(成功)：表示成功處理了請求的狀態碼。
  ** 3xx(重定向)：表示要完成請求，需要進一步操作。通常，這些狀態代碼用來重定向。
  ** 4xx(請求錯誤)：這些狀態碼表示請求可能出錯，妨礙了服務器的處理。
  ** 5xx(服務器錯誤)：這些狀態碼表示服務器在嘗試處理請求時發送內部錯誤。這些錯誤可能是服務器本身的錯誤，而不是請求出錯。

  - JSON 字符串和 JSON 對象的相互轉換：
    \*\* 字符串轉對象

    - JSON.parse(json)

    \*\* 對象轉字符串

    - JSON.stringify(json)

    * 原生 JavaScript AJAX 請求 有幾個步驟？分別是什麼？
      \*\* 5 個步驟實現 原生 JavaScript AJAX 請求

    \*\* 1. 創建 XMLHttpRequest 對象

  - var xhr = new XMLHttpRequest();
    \*\* 2. 發送信息到服務器時內容編碼類型 - setRequestHeader
  - xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    \*\* 3. 接受服務器響應數據 - onreadystatechange
  - xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && (xhr.status == 200) {
    // let data = xhr.responseText; // responseText 获得字符串形式的响应数据。
    }
    };
    \*\* 4. 規定請求的類型，URL，以及是否異步處理請求。
    xhr.open('GET',url,true);
    \*\* 5. 發送請求
    xhr.send(null);

4. GET 和 POST 請求數據區別：
   ** GET 在瀏覽器返回時是無害的，而 POST 會再次提交請求。
   ** GET 產生的 URL 地址可以被 Bookmark，而 POST 不可以。
   ** GET 請求會被瀏覽器主動 cache 緩存，而 POST 不會，除非手動設置。
   ** GET 請求只能進行 url 編碼，而 POST 支持多種編碼方式。

   - 1
     \*\* GET 請求參數會被完整保留在瀏覽器歷史紀錄裡，而 POST 中的參數不會被保留。
   - 2
     ** GET 請求在 URL 中傳送的參數是有長度限制的，而 POST 沒有。
     ** 對參數的數據類型，GET 接受 ASCII 字符，而 POST 沒有限制。
   - 3
     \*\* GET 比 POST 更不安全，因為參數直接暴露在 URL 上，所以不能用來傳遞敏感信息。
   - 4
     \*\* GET 參數通過 URL 傳遞，POST 放在 Request body 中。

   - GET 和 POST 使用場景：
     ** 若符合下列任一情況，則推薦用 POST 方法：POST 是用來向服務器修改數據。請求參數放於 body 中，支持較大數據傳輸。
     ** 請求的結果有持續性的副作用。例如：數據庫內添加新的數據行。
     \*\* 例如：在論壇上回貼，在博客上評論

   ** 若符合下列任一情況，則推薦用 GET 方法：GET 請求的數據是放在 URL 之後。查詢數據，提交的數據最多 1024B。
   ** 例如：格式以？來分隔 URL 和數據，以&來分隔參數，
   \*\*

- 什麼情況造成跨域（什麼是同源策略）？
  ** 同源策略是瀏覽器的一個安全功能，不同源的客戶端腳本在沒有明確授權的情況，不能讀寫對方資源。
  ** 例如：xyz.com 的 js 腳本 採用 AJAX 讀取 abc.com 裡面的文件數據是會被拒絕的。
  ** 所以同源策略限制了從同一個源加載的文檔或腳本如何與來自另一個源的資源進行交互。用於隔離潛在惡意文件的重要安全機制。
  ** 例如：跨域失敗情況：不同協議(http/https)，不同端口(81/80)，不同域名(xyz 和 abc)

* 跨域解決方案有哪些？
  \*\* JSONP 只能解決 GET 跨域！！！
  ** 原理：利用 script 標籤 的 src 屬性 不受同源策略限制。
  ** 因為所有的 src 屬性 和 href 屬性 都不受同源策略限制。可以請求第三方服務器數據内容。

  - 1. 創建 script 標籤： const script = document.createElement("script");
  - 2. 設置標籤的 src 屬性的接口地址及定義一個 callback 回調函數名： script.src = "http://127.0.0.1:8000/check-username";
  - 3. 將 script 插入到文檔中：document.body.appendChild(script); // 把 script 標籤插入到 body 標籤的最後
       ** 通過定義函數名去接收後台返回數據 function jsonpCallback(data){}
       ** 注意！jsonp 返回的數據是 json 對象，可以直接使用。
       \*\* ajax 取得數據是 json 字符串，需要轉換成 json 對象才可使用！
       /_
       借助 script 標籤向遠端發送請求，
       服務端返回的結果是一個 handle 函數的調用
       成功請求後，瀏覽器就會把 handle({ "exist": 1, "msg": "用戶名已經存在" });
       該代碼作出解析和執行，再把數據處理，就可以實現跨域！
       _/

* CORS：跨域資源共享
  ** 例如： x.open("GET", "http://127.0.0.1:8000/cors-server");
  ** 原理：服務器設置 Access-Control-Allow-OriginHTTP 響應頭之後，瀏覽器將會允許跨域請求
  \*\* 例如：需要後台設置 - Access-Control-Allow-Origin: \* 允許所有域名訪問，或者 Access-Control-Allow-Origin: http://a.com //只允许該域名訪問
  \*\* x.open("GET", "http://127.0.0.1:8000/cors-server");

* 用 Apache 做轉發（逆向代理），讓跨域變成同域
