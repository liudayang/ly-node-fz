const enum STATUS {
    pending = 'PENDING',
    fulfilled = 'FULFILLED',
    rejected = 'REJECTED'
}
class Promise {
    status: STATUS
    value: any
    reason: any
    onFulfilledCbs: Function[]
    onRejectedCbs: Function[]
    constructor(executor: (reslove: (value: any) => void, reject: (reason: any) => void) => void) {
        this.status = STATUS.pending
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCbs = []
        this.onRejectedCbs = []
        const reslove = (value?: any) => {
            if (this.status === STATUS.pending) {
                this.status = STATUS.fulfilled
                this.value = value
                this.onFulfilledCbs.forEach(fn => fn())
            }
        }
        const reject = (reason?: any) => {
            if (this.status === STATUS.pending) {
                this.status = STATUS.rejected
                this.reason = reason
                this.onRejectedCbs.forEach(fn => fn())
            }
        }
        try {
            executor(reslove, reject)
        } catch (error) {
            reject(error)
        }
    }
    resolvePromise(promise2, x, reslove, reject) {
        if (promise2 === x) {
            reject(new TypeError('循环吊用promise 啦啦啦'))
        }
        if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
            let called = false
            try {
                let then = x.then
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return;
                        called = true
                        this.resolvePromise(promise2, y, reslove, reject)
                        // reslove(y)
                    }, r => {
                        if (called) return;
                        called = true
                        reject(r)
                    })
                }else {
                    reslove(x)
                }
            } catch (e) {
                console.log(e);
                if (called) return;
                called = true
                reject(e)
            }
        } else {
            reslove(x)
        }
    }

    then(onFulfilled?, onRejected?) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        let promise2 = new Promise((reslove, reject) => {
            if (this.status === STATUS.fulfilled) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        console.log(promise2, x, promise2 === x, '----');
                        this.resolvePromise(promise2, x, reslove, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === STATUS.rejected) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        this.resolvePromise(promise2, x, reslove, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);

            }
            if (this.status === STATUS.pending) {
                this.onFulfilledCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            this.resolvePromise(promise2, x, reslove, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                this.onRejectedCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            this.resolvePromise(promise2, x, reslove, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }

}


let p = new Promise((reslove, reject) => {
    reslove('ok')
})

p.then(null, err => {
    throw new Error("000");
}).then(null, err => {
    throw new Error("000");
}).then(data => {
    console.log(data);
}, err => {
    console.log(err);
})
// let obj1 = {
//     get then() {
//         throw new Error("get then Error");
//     }
// }
// let p1 = p.then((result: any) => {

// return obj1
// return p1
// return new Promise((reslove, reject) => {
//     setTimeout(() => {
//         reslove(new Promise((reslove, reject) => {
//             setTimeout(() => {
//                 reslove('1000')
//             }, 1000);
//         }))
//     }, 1000);
// })
// console.log('success1', result);
// }, (err) => {
//     // console.log('error1', err);
//     // return 1
//     throw new Error("gg");
// })
// let p2 = p1.then((result: any) => {
//     console.log('success2', result);
// }, (err) => {
//     console.log('error2', err);
// })
// .catch((err) => {
//     console.log('error', err);
// });

export default Promise
