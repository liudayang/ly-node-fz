const EventEmiter = require('events');
const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');

class Application extends EventEmiter {
  constructor(props) {
    super(props)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.context = Object.create(context)
    this.port = 3003
    this.middlewares = []
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  compose(ctx) {
    let index = -1
    const dispatch = (i) => {
      if (index > i) return Promise.reject('next can not be called more than once')
      // console.log(index === i,index,i)
      index = i
      if (i === this.middlewares.length) return Promise.resolve()
      let middleware = this.middlewares[i]
      return Promise.resolve(middleware(ctx, () => dispatch(i + 1)))
    }
    return dispatch(0)
  }

  createContext(req, res) {
    let request = Object.create(this.request)
    let response = Object.create(this.response)
    let ctx = Object.create(this.context)
    ctx.request = request
    ctx.req = ctx.request.req = req
    ctx.response = response
    ctx.res = ctx.response.res = res
    return ctx
  }

  handleRequest(req, res) {
    let ctx = this.createContext(req, res)
    res.statusCode = 404
    this.compose(ctx).then(() => {
      if (ctx.body) {
        res.end(ctx.body)
      } else {
        res.end('Not Found')
      }
    },err=>{
      this.emit('error',err)
    })
  }

  listen(port) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(port || this.port, () => {
      console.log(port || this.port, 'is running');
    })
  }
}

module.exports = Application
