const url = require('url');

const request = {
 get path(){
   return url.parse(this.req.url).pathname
 },
  get url(){
    return this.req.url
  }
}
module.exports = request
