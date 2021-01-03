const fs = require('fs')
const path = require('path')
interface Person {
    age: 18
    name: string
}
function after(times, cb) {
    let obj = {} as Person
    return function name(key: string, val: number | string) {
        obj[key] = val
        --times === 0 && cb(obj)
    }
}
let fn = after(2, (obj) => {
    console.log(obj, 'ok');
})
fs.readFile(path.resolve(__dirname, '../assets','name.txt'), 'utf-8', function (err, data) {
    if (err) return console.error(err);
    fn('name', data)
});
fs.readFile(path.resolve(__dirname,'../assets', 'age.txt'), 'utf-8', function (err, data) {
    if (err) return console.error(err);
    fn('age', data)
});

