type callBack = () => void
type returnFn = (...args: any[]) => void

declare global{
    interface Function {
        before(fn: callBack): returnFn
    }
}

Function.prototype.before = function (beforeFn) {
    return (...args) => {
        beforeFn()
        this(...args)
    }
}

function fn1(...param: any[]) {
    console.log(`我是${param[0]} 我是初始函数`);
}
let fn2 = fn1.before(function () {
    console.log('我是before func');
})
fn2('ldy')

export {}