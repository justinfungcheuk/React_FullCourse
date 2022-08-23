##3.2.1 axios 與 Axios 的關係？

1. 從語法上來說：axios 不是 Axios 的實例

2. 從功能上來說：axios 是 Axios 的實例

- 因為 axios 擁有 Axios 實例對象上的方法
- Axios 實例對象的方法包括：GET / POST 等等

3. axios 是 Axios.prototype.request 函數 bind() 返回的函數

4. axios 作為對象有 Axios 原型對象上的所有方法 - 所以 axios 可以調用 GET 方法，POST 方法，等等方法，有 Axios 對象上所有的屬性

##3.2.2. instance 與 axios 的區別？

1. 相同：
   （1）都是一個能發任意請求的函數：request(config)
   （2）都有發特定請求的各種方法：get() / post() / delete() 等等
   （3）都有默認配置和攔截器的屬性：defaults / interceptors
2. 不同：
   （1）默認配置很可能不一樣
   （2）instance 沒有 axios 後面添加的一些方法：create() / CancelToken() / all()

##3.2.3. axios 運行的整體流程？

1. 整體流程：
   request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)
2. request(config):

- 將請求攔截器 / dispatchRequest() / 響應攔截器 通過 promise 鏈串連起來，返回 promise

3. dispatchRequest(config):
   轉換請求數據 ===> 調用 xhrAdapter()發請求 ===> 請求返回後轉換響應數據，返回 promise
4. xhrAdapter(config):
   創建 XHR 對象，根據 config 進行相應設置，發送特定請求，並接收響應數據，返回 promise

##3.2.4 axios 的請求/響應攔截器是什麼？

1. 請求攔截器：
   在真正發送請求前執行的回調函數 - 例如：檢測參數，修改參數
   可以對請求進行檢查 或 配置進行特定處理
   成功的回調函數，傳遞的默認是 config（也必須是）
   失敗的回調函數，傳遞的默認是 error

2. 響應攔截器：
   在請求得到響應後執行的回調函數
   可以對響應數據進行特定處理
   成功的回調函數，傳遞的默認是 response - 響應的結果對象
   失敗的回調函數，傳遞的默認是 error

##3.2.5 axios 的請求 / 響應數據轉換器是什麼？

1. 請求轉換器： 對請求頭和請求體數據進行特定處理的函數
   if(utils.isObject(data)){
   setContentTypeIfUnset(headers, "application/json; charset=utf-8");
   return JSON.stringify(data);
   }

2. 響應轉換器：將響應體 json 字符串解析為 js 對象 或 數組的函數
   response.data = JSON.parse(response.data)

##3.2.6 response 的整體結構
{
data,
status,
statusText,
headers,
config,
request
}

##3.2.7 error 的整體結構
{
message,
response,
request,
}

##3.2.8. 如何取消未完成的請求？

1. 當配置了 cancelToken 對象時，保存 cancel 函數
   （1）創建一個用於將來中斷請求的 cancelPromise
   （2）並定義了一個用於取消請求的 cancel 函數
   （3）將 cancel 函數傳遞出來
2. 調用 cancel() 取消請求
   （1）執行 cancel 函數，傳入錯誤信息 message
   （2）內部會讓 cancelPromise 變為成功，且成功的值為一個 Cancel 對象
   （3）在 cancelPromise 的成功回調中中斷請求，並讓發請求的 promise 失敗，失敗的 reason 為 Cancel 對象
