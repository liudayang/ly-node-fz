const curring = (fn:Function) => {
    const exec = (sumArgs:number[]) => {
        return sumArgs.length >= fn.length ? fn(...sumArgs) : (...args) => exec([...sumArgs, ...args])
    }
    return exec([])
}

const mulity = (a, b, c, d) => {
    return a * b * c * d
}

console.log(curring(mulity)(2)(3, 4)(5));
console.log(curring(mulity));
export {}
