// let p = new Promise((reslove, reject) => {
//     // reslove('ok')
//     reject('gggg')
//     // setTimeout(() => {
//     //     reject('gggg')
//     // }, 1000);
//     // throw new Error("gg");
// })
// let p1 = p.then((result) => {
//     return 1
//     // console.log('success1', result);
// }, (err) => {
//     console.log('error1', err);
// })
// let p2 = p1.then((result) => {
//     console.log('success2', result);
// }, (err) => {
//     console.log('error2', err);
// })
// // .catch((err) => {
// //     console.log('error', err);
// // });


let p = new Promise((reslove, reject) => {
  reject('ok')
})

p.then(null, err => {
  console.log(1);
  throw err;
  // throw new Error("000");
}).then(null, err => {
  console.log(2);
  throw err;
  // throw new Error("000");
}).then(data => {
  console.log(3);
  console.log(data);
}, err => {
  console.log(4);
  console.log(err);
})