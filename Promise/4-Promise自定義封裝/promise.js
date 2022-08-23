class Promise{
    constructor(executor) {
        //添加屬性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    //聲明屬性
    this.callbacks = [];
    //保存實例對象的 this 的值
    const self = this; // self _this that - 把變量定義為實例對象，而不是全局的 window對象
    // resolve 函數
    function resolve(data) { // resolve實参 - 因為它是一個獨立函數
        //判斷狀態是否被更改 - 如果被更改就可以保證 Promise 的狀態只能更改一次
        if (self.PromiseState !== "pending") return; // 不執行下面的代碼，直接 return

        //1. 修改對象的狀態（promiseState屬性 - 是屬於實例對象的）裝體的修改也就是對屬性的修改
        self.PromiseState = "fulfilled";// resolved
        //2. 設置對象結果值（promiseResult屬性）
        self.PromiseResult = data;
        //調用成功的回調函數
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onResolved(data);
            })
        })
    }
    // reject 函數
    function reject(data) {
        //判斷狀態
        if (self.PromiseState !== "pending") return; // 不執行下面的代碼，直接 return

        //1. 修改對象的狀態（promiseState屬性 - 是屬於實例對象的）裝體的修改也就是對屬性的修改
        self.PromiseState = "rejected";// 
        //2. 設置對象結果值（promiseResult屬性）
        self.PromiseResult = data; 
        //調用成功的回調函數 - 執行回調
        //執行失敗的回調
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onRejected(data);
            })
        })
    }
    try {
        // 同步調用【執行器函數】- executor() 
        executor(resolve, reject);
    } catch (e) {
        //修改 promise 對象狀態為【失敗】
        reject(e);
    }
    }

    //then方法封裝
    then(onResolved, onRejected) {
        const self = this;
    //判斷回調函數參數
    if (typeof onRejected !== "function") {
        onRejected = reason => {
            throw reason;
        }
    }
    if (typeof onResolved !== "function") {
        onResolved = value => value;
        //value => { return value};
    }
    return new Promise((resolve, reject) => {
        //封裝函數
        function callback(type) {
            try {
                let result = type(self.PromiseResult);
                // 該 result 就代表 return 的 new Prommise((resolve, reject) => {resolve("success")})
                //判斷
                if (result instanceof Promise) {
                    //如果是 Promise 類型的對象
                    result.then(v => {
                        resolve(v); // res 成功的結果傳入到 v
                    }, r => {
                        reject(r);
                    })
                } else {
                    //結果的對象狀態為【成功】
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        //調用回調函數 PromiseState
        if (this.PromiseState === "fulfilled") { // this 是指向實例對象 p（要獲取 p 該對象身上的 PromiseState屬性）
            setTimeout(() => {
                callback(onResolved);
            })
            // try {
            //     //獲取回調函數的執行結果
            //     let result = onResolved(this.PromiseResult);
            //     // 該 result 就代表 return 的 new Prommise((resolve, reject) => {resolve("success")})
            //     //判斷
            //     if (result instanceof Promise) {
            //         //如果是 Promise 類型的對象
            //         result.then(v => {
            //             resolve(v); // res 成功的結果傳入到 v
            //         }, r => {
            //             reject(r);
            //         })
            //     } else {
            //         //結果的對象狀態為【成功】
            //         resolve(result);
            //     }
            //     // 該函數 (value => {console.log(value);} 是傳給了 onResolved
            //     // 而由於該函數在聲明的時候是有一個形参的，所以在調用 onResolved()需要傳入一個實参
            //     // 該實参是：該函數最終處理的結果是成功的值
            //     // 所以該實参傳入的是 Promise 成功的結果值 - this.PromiseResult
            //     // this.PromiseResult 該結果是存放在了實例對象的 PromiseResult屬性當中
            //     // 因此我們要把成功的結果傳給 onResolved()
            // } catch (e) {
            //     reject(e);
            // }    
        }
        if (this.PromiseState === "rejected") {
            setTimeout(() => {
                callback(onRejected);
                // try {
                //     let result = onRejected(this.PromiseResult);
                //     if (result instanceof Promise) {
                //         result.then(v => {
                //             resolve(v);
                //         }, r => {
                //             reject(r);
                //         });
                //     } else {
                //         resolve(result);
                //     }
                // } catch (e) {
                //     reject(e);
                // }
            })
        }
        //判斷 pending 狀態
        if (this.PromiseState === "pending") {
            //保存回調函數
            this.callbacks.push({
                // onResolved: onResolved, //鍵名：鍵值
                onResolved: function () {
                    callback(onResolved);
                //     try{
                //     //執行成果的回調函數
                //     let result = onResolved(self.PromiseResult);
                //     // 根據該函數 - onResolved(self.PromiseResult); 的執行結果來決定狀態
                //     // 判斷
                //     if (result instanceof Promise) {
                //         result.then(v => {
                //             resolve(v); // 調用 resolve 的意思是把返回的 Promise對象的狀態設置為成功
                //         }, r => {
                //             reject(r);
                //         })
                //     } else {
                //         resolve(result); // 如果 res 不是 Promise 的實例，它的狀態就是成功的，並且把 return 的結果 result 傳到括號裡
                //     }
                //     } catch (e) {
                //         reject(e);
                // }
                },
                onRejected: function () {
                    callback(onRejected);
                    // try {
                    //     let result = onRejected(self.PromiseResult);
                    //     //判斷
                    //     if (result instanceof Promise) {
                    //         result.then(v => {
                    //             resolve(v);
                    //         }, r => {
                    //             reject(r);
                    //         })
                    //     } else {
                    //         resolve(result);
                    //     }
                    // } catch (e) {
                    //     reject(e);
                    // }
                }
            });
        }
    })
    }

    //catch方法
    catch(onRejected) {
    return this.then(undefined, onRejected);
    }
    
    //添加 resolve方法
    //該 resolve方法不是屬於實例對象，是屬於該類 class Promise，有自己的構造函數constructor
    static resolve(value) { // 狀態是由傳入的 value 來決定
        //static 可以表示 resolve方法是一個靜態成員，它屬於類，不屬於實例對象
        //返回 Promise對象
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v);
                }, r => {
                    reject(r);
                })
            } else {
                //狀態設置為成功
                resolve(value);
            }
        })
    }
        
        //添加 reject方法
    static reject(reason) {
            return new Promise((resolve, reject) => {
                reject(reason);
            })
    }
    
    //添加 all方法
    static all(promises) {
    //返回結果為 promise對象
    return new Promise((resolve, reject) => {
        let count = 0;
        let arr = [];
        // 遍歷
        for (let i = 0; i < promises.length; i++){
            //
            promises[i].then(v => {
                // 得知對象的狀態是成功
                // 每個 promise對象 都成功才能執行 resolve()函數
                count++;
                //將當前 promise 對象成功的結果，存入到數組中
                arr[i] = v;// i 是元素在數組當中的下標，所以在存取結果時也用i，來對數據做保存
                //判斷
                if (count === promises.length) {
                    //修改狀態
                    resolve(arr);
                }
            }, r => {
                reject(r);
            })
        }
    })
    }
    
    //添加 race方法
    static race(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++){
            promises[i].then(v => {
                //修改返回對象的狀態為 成功
                resolve(v);
            }, r => {
                //修改返回對象的狀態為 失敗
                reject(r);
            })
        }
    })
}
}

/**
 * 由於在 Promise 實例化的時候，接收了一個參數【一個實参】
 * (resolve, reject) => {
        resolve("OK");
      }
 * 所以在 function Promise() {} - Promise 聲明的時候，括號裡面也要一個形參 executor【執行器函數】
 */
// 聲明構造函數 - 執行實例化的時候，形參會傳給實参【也就是代表 executor 會拿到該函數 (resolve, reject) => { resolve("OK")} 】
// 拿到函數之後，Promise語法裡有該說明：執行器函數在內部是同步調用的
// function Promise(executor) {
//     //添加屬性
//     this.PromiseState = "pending";
//     this.PromiseResult = null;
//     //聲明屬性
//     this.callbacks = [];
//     //保存實例對象的 this 的值
//     const self = this; // self _this that - 把變量定義為實例對象，而不是全局的 window對象
//     // resolve 函數
//     function resolve(data) { // resolve實参 - 因為它是一個獨立函數
//         //判斷狀態是否被更改 - 如果被更改就可以保證 Promise 的狀態只能更改一次
//         if (self.PromiseState !== "pending") return; // 不執行下面的代碼，直接 return

//         //1. 修改對象的狀態（promiseState屬性 - 是屬於實例對象的）裝體的修改也就是對屬性的修改
//         self.PromiseState = "fulfilled";// resolved
//         //2. 設置對象結果值（promiseResult屬性）
//         self.PromiseResult = data;
//         //調用成功的回調函數
//         setTimeout(() => {
//             self.callbacks.forEach(item => {
//                 item.onResolved(data);
//             })
//         })
//     }
//     // reject 函數
//     function reject(data) {
//         //判斷狀態
//         if (self.PromiseState !== "pending") return; // 不執行下面的代碼，直接 return

//         //1. 修改對象的狀態（promiseState屬性 - 是屬於實例對象的）裝體的修改也就是對屬性的修改
//         self.PromiseState = "rejected";// 
//         //2. 設置對象結果值（promiseResult屬性）
//         self.PromiseResult = data; 
//         //調用成功的回調函數 - 執行回調
//         //執行失敗的回調
//         setTimeout(() => {
//             self.callbacks.forEach(item => {
//                 item.onRejected(data);
//             })
//         })
//     }
//     try {
//         // 同步調用【執行器函數】- executor() 
//         executor(resolve, reject);
//     } catch (e) {
//         //修改 promise 對象狀態為【失敗】
//         reject(e);
//     }
// }
// try catch 可以把 throw 拋出的值接收到
// 所以 throw 拋出的數據 "error"，就是 Promise對象失敗的結果值
// 因此我們需要把 "error" 該值傳遞給到 try catch 裡面的 e 形參
// 所以在設置結果值的時候，只需要把 e 交給 reject就可以

//添加 then方法
// Promise.prototype.then = function (onResolved, onRejected) {
//     const self = this;
//     //判斷回調函數參數
//     if (typeof onRejected !== "function") {
//         onRejected = reason => {
//             throw reason;
//         }
//     }
//     if (typeof onResolved !== "function") {
//         onResolved = value => value;
//         //value => { return value};
//     }
//     return new Promise((resolve, reject) => {
//         //封裝函數
//         function callback(type) {
//             try {
//                 let result = type(self.PromiseResult);
//                 // 該 result 就代表 return 的 new Prommise((resolve, reject) => {resolve("success")})
//                 //判斷
//                 if (result instanceof Promise) {
//                     //如果是 Promise 類型的對象
//                     result.then(v => {
//                         resolve(v); // res 成功的結果傳入到 v
//                     }, r => {
//                         reject(r);
//                     })
//                 } else {
//                     //結果的對象狀態為【成功】
//                     resolve(result);
//                 }
//             } catch (e) {
//                 reject(e);
//             }
//         }
//         //調用回調函數 PromiseState
//         if (this.PromiseState === "fulfilled") { // this 是指向實例對象 p（要獲取 p 該對象身上的 PromiseState屬性）
//             setTimeout(() => {
//                 callback(onResolved);
//             })
//             // try {
//             //     //獲取回調函數的執行結果
//             //     let result = onResolved(this.PromiseResult);
//             //     // 該 result 就代表 return 的 new Prommise((resolve, reject) => {resolve("success")})
//             //     //判斷
//             //     if (result instanceof Promise) {
//             //         //如果是 Promise 類型的對象
//             //         result.then(v => {
//             //             resolve(v); // res 成功的結果傳入到 v
//             //         }, r => {
//             //             reject(r);
//             //         })
//             //     } else {
//             //         //結果的對象狀態為【成功】
//             //         resolve(result);
//             //     }
//             //     // 該函數 (value => {console.log(value);} 是傳給了 onResolved
//             //     // 而由於該函數在聲明的時候是有一個形参的，所以在調用 onResolved()需要傳入一個實参
//             //     // 該實参是：該函數最終處理的結果是成功的值
//             //     // 所以該實参傳入的是 Promise 成功的結果值 - this.PromiseResult
//             //     // this.PromiseResult 該結果是存放在了實例對象的 PromiseResult屬性當中
//             //     // 因此我們要把成功的結果傳給 onResolved()
//             // } catch (e) {
//             //     reject(e);
//             // }    
//         }
//         if (this.PromiseState === "rejected") {
//             setTimeout(() => {
//                 callback(onRejected);
//                 // try {
//                 //     let result = onRejected(this.PromiseResult);
//                 //     if (result instanceof Promise) {
//                 //         result.then(v => {
//                 //             resolve(v);
//                 //         }, r => {
//                 //             reject(r);
//                 //         });
//                 //     } else {
//                 //         resolve(result);
//                 //     }
//                 // } catch (e) {
//                 //     reject(e);
//                 // }
//             })
//         }
//         //判斷 pending 狀態
//         if (this.PromiseState === "pending") {
//             //保存回調函數
//             this.callbacks.push({
//                 // onResolved: onResolved, //鍵名：鍵值
//                 onResolved: function () {
//                     callback(onResolved);
//                 //     try{
//                 //     //執行成果的回調函數
//                 //     let result = onResolved(self.PromiseResult);
//                 //     // 根據該函數 - onResolved(self.PromiseResult); 的執行結果來決定狀態
//                 //     // 判斷
//                 //     if (result instanceof Promise) {
//                 //         result.then(v => {
//                 //             resolve(v); // 調用 resolve 的意思是把返回的 Promise對象的狀態設置為成功
//                 //         }, r => {
//                 //             reject(r);
//                 //         })
//                 //     } else {
//                 //         resolve(result); // 如果 res 不是 Promise 的實例，它的狀態就是成功的，並且把 return 的結果 result 傳到括號裡
//                 //     }
//                 //     } catch (e) {
//                 //         reject(e);
//                 // }
//                 },
//                 onRejected: function () {
//                     callback(onRejected);
//                     // try {
//                     //     let result = onRejected(self.PromiseResult);
//                     //     //判斷
//                     //     if (result instanceof Promise) {
//                     //         result.then(v => {
//                     //             resolve(v);
//                     //         }, r => {
//                     //             reject(r);
//                     //         })
//                     //     } else {
//                     //         resolve(result);
//                     //     }
//                     // } catch (e) {
//                     //     reject(e);
//                     // }
//                 }
//             });
//         }
//     })
// }

/**
 * 當 res 的回調函數 (value => {throw "FAIL";}) 傳給了 添加的 then 方法的 onResolved
 * 而 onResolved 會在 try{裡面的 let result = onResolved()執行}，所以 try是可以接收到拋錯 throw
 * 而 catch 可以拿到拋出的結果 "FAIL"
 * 所以一旦拋出 throw，就要改變返回 new Promise 對象 的狀態為失敗
 * 所以要在 catch 裡面設置 reject(e)，並且把拋出的結果設置為失敗的結果值
 */


// 添加 catch 方法
// Promise.prototype.catch = function (onRejected) {
//     return this.then(undefined, onRejected);
// }

// 添加 resolve 方法
// Promise.resolve = function (value) { // 狀態是由傳入的 value 來決定
//     //返回 Promise對象
//     return new Promise((resolve, reject) => {
//         if (value instanceof Promise) {
//             value.then(v => {
//                 resolve(v);
//             }, r => {
//                 reject(r);
//             })
//         } else {
//             //狀態設置為成功
//             resolve(value);
//         }
//     })
// }

// 添加 reject 方法
// Promise.reject = function (reason) {
//     return new Promise((resolve, reject) => {
//         reject(reason);
//     })
// }

// 添加 all 方法
// Promise.all = function (promises) {
//     //返回結果為 promise對象
//     return new Promise((resolve, reject) => {
//         let count = 0;
//         let arr = [];
//         // 遍歷
//         for (let i = 0; i < promises.length; i++){
//             //
//             promises[i].then(v => {
//                 // 得知對象的狀態是成功
//                 // 每個 promise對象 都成功才能執行 resolve()函數
//                 count++;
//                 //將當前 promise 對象成功的結果，存入到數組中
//                 arr[i] = v;// i 是元素在數組當中的下標，所以在存取結果時也用i，來對數據做保存
//                 //判斷
//                 if (count === promises.length) {
//                     //修改狀態
//                     resolve(arr);
//                 }
//             }, r => {
//                 reject(r);
//             })
//         }
//     })
// }

// 添加 race 方法
// Promise.race = function (promises) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < promises.length; i++){
//             promises[i].then(v => {
//                 //修改返回對象的狀態為 成功
//                 resolve(v);
//             }, r => {
//                 //修改返回對象的狀態為 失敗
//                 reject(r);
//             })
//         }
//     })
// }