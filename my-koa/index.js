// const Koa = require('koa');
const Koa = require('./koa');
const app = new Koa();

function sleep(t) {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove()
    }, t)
  })
}

app.use(async (ctx, next) => {
  console.log(1)
 await next()
 await next()
    // next()
  console.log(2)
})
app.use(async(ctx, next) => {
  console.log(3)
  await sleep(3000)
  ctx.body = 'hahaha'
  await next()
  console.log(4)
})
app.use(async(ctx, next) => {
  console.log(5)
  await next()
  console.log(6)
})
app.on('error', error => {
  console.log(666, error);
});
// app.use(ctx => {
//   // console.log('Hello World123');
//   // console.log(ctx.req.url)
//   // console.log(ctx.request.req.url)
//   // console.log(ctx.request.url)
//   // console.log(ctx.url)
//   // console.log(ctx.path)
//   console.log(ctx.body,ctx.response.body)
//   // ctx.body='666'
//   console.log(ctx.body,ctx.response.body)
//
//   // ctx.res.end('Hello World')
//   // console.log(ctx.request.path)
//
// });
app.listen(3000);


// console.log(app);

// const Koa = require('koa');
// const app = new Koa();

// app.use(async ctx => {
//   ctx.body = 'Hello World 111';
//   // throw 1
// });

// const response = require('./response');
// const compose = require('koa-compose');
// const context = require('./context');
// const request = require('./request');
// app.listen(3001);

