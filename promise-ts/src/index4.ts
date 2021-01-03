// type ReturnFn = (val: unknown) => boolean
// let utils: Record<string, ReturnFn> = {}
// let utils: Record<'isString'|'isNumber'|'isBoolean', ReturnFn> = {} as any
function isType(typing:string) {
    return function (val: unknown) {
        return Object.prototype.toString.call(val)===`[object ${typing}]`
    }
}

const curring = (fn:Function) => {
    const exec = (sumArgs:number[]) => {
        return sumArgs.length >= fn.length ? fn(...sumArgs) : (...args) => exec([...sumArgs, ...args])
    }
    return exec([])
}

let isString=curring(isType)('String')
let isNumber=curring(isType)('Number')
let isBoolean=curring(isType)('Boolean')

console.log(isString('123'));
console.log(isNumber(123));
console.log(isNumber({}));
console.log(isBoolean(false));

// export {}
