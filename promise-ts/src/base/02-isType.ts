type ReturnFn = (val: unknown) => boolean
// let utils: Record<string, ReturnFn> = {}
let utils: Record<'isString'|'isNumber'|'isBoolean', ReturnFn> = {} as any
function isType(typing:string) {
    return function (val: unknown) {
        return Object.prototype.toString.call(val)===`[object ${typing}]`
    }
}

['String','Number','Boolean'].forEach(type=>{
    utils['is'+type]=isType(type)
})
console.log(utils.isString('123'));
console.log(utils.isNumber(123));
console.log(utils.isNumber({}));
console.log(utils.isBoolean(false));
export {}
