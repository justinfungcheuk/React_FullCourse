#筆記

## 異步編程

- fs 文件操作 （fs 是 node.js 下面的一個模塊，可以對計算機的磁盤作讀寫操作）

```

require("fs").readFile("./index.html", (err, data) => {})
```

- 數據庫操作
- AJAX

```

$.get("/server", (data) => {})
```

- 定時器

```

setTimeout(() => {}, 2000);
```

Promise 是 ES6 引入的異步編程新的解決方案
從語法上來說，Promise 是一個構造函數，可以實例化對象，封裝，異步操作獲取成功和失敗的結果。

- Promise 的優點是支持鏈式調用，可以解決回調地獄問題

1. 什麼是回調地獄？
   回調函數嵌套調用，外部回調函數異步執行的結果是嵌套的回調執行的條件
2. 回調地獄的缺點？
   不便於閱讀
   不便於異常處理
3. 解決方法？
   promise 鏈式調用

- 指定回調函數的方式更加靈活

1. promise：啟動異步任務 => 返回 promise 對象 => 給 promise 對象綁定回調函數（甚至可以在異步任務結束後指定/多個）

## Promise 的狀態

實例對象中的一個屬性 【PromiseState】

- pending 未決定的 - 初始化的默認值
- resolved / fulfiled 成功
- rejected 失敗
  說明：只有這兩種，且一個 promise 對象只能改變一次
  無論變為成功還是失敗，都會有一個結果數據
  成功的結果數據一般為 value，失敗的結果數據一般稱為 reason

## Promise 對象的值

實例對象中的另一個屬性 【PromiseResult】
保存著異步任務【成功或失敗】的結果

- result
- reject
