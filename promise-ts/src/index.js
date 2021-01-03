Function.prototype.before=function (beforeFn) {
    return (...args)=>{
        beforeFn()
        this(...args)
    }
}

function fn1(...param) {
    console.log(`我是${param[0]} 我是初始函数`);
}
let fn2=fn1.before(function () {
    console.log('我是before func');
})
fn2('ldy')